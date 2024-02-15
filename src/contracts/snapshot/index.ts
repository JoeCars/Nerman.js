import fetch from "node-fetch";
import { EventData } from "../../types";

const MILLISECONDS_PER_SECOND = 1000;
const POLLING_MILLISECONDS = 60_000;

export interface SupportedEventMap {
	ProposalCreated: EventData.Snapshot.Proposal;
	ProposalCompleted: EventData.Snapshot.Proposal;
	VoteCast: EventData.Snapshot.Vote;
}
export type SupportedEventsType = keyof SupportedEventMap;

/** Snapshot wrapper class. */
export default class Snapshot {
	private _previousProposalCreatedTime: number;
	private _proposalCreatedInterval: NodeJS.Timeout | undefined;

	private _previousProposalCompletedTime: number;
	private _proposalCompletedInterval: NodeJS.Timeout | undefined;

	private _previousVoteCastTime: number;
	private _voteCastInterval: NodeJS.Timeout | undefined;

	private _registeredListeners: Map<string, (data: any) => void>;

	/** Spaces listening to. */
	public spaceIds: string[];

	constructor(...spaceIds: string[]) {
		this._previousProposalCreatedTime = Date.now() / MILLISECONDS_PER_SECOND;
		this._proposalCreatedInterval = undefined;

		this._previousProposalCompletedTime = Date.now() / MILLISECONDS_PER_SECOND;
		this._proposalCompletedInterval = undefined;

		this._previousVoteCastTime = Date.now() / MILLISECONDS_PER_SECOND;
		this._voteCastInterval = undefined;

		this._registeredListeners = new Map();

		this.spaceIds = spaceIds;
	}

	/**
	 * Assigns a listener function for the given event. Throws an error if the event is not supported.
	 * @param eventName The event being listened to.
	 * @param listener The listener function.
	 * @example
	 * snapshot.on('VoteCast', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "ProposalCreated":
				this._proposalCreatedInterval = setInterval(() => {
					this._listenToProposalCreated(listener as (data: EventData.Snapshot.Proposal) => void);
				}, POLLING_MILLISECONDS);

				this._registeredListeners.set(eventName, listener);
				break;
			case "ProposalCompleted":
				this._proposalCompletedInterval = setInterval(() => {
					this._listenToProposalCompleted(listener as (data: EventData.Snapshot.Proposal) => void);
				}, POLLING_MILLISECONDS);

				this._registeredListeners.set(eventName, listener);
				break;
			case "VoteCast":
				this._voteCastInterval = setInterval(() => {
					this._listenToVoteCast(listener as (data: EventData.Snapshot.Vote) => void);
				}, POLLING_MILLISECONDS);

				this._registeredListeners.set(eventName, listener);
				break;
			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes a listener.
	 * @param eventName the event listened to.
	 * @example
	 * snapshot.off('VoteCast');
	 */
	public off(eventName: SupportedEventsType) {
		if (eventName === "ProposalCreated") {
			clearInterval(this._proposalCreatedInterval);
		} else if (eventName === "ProposalCompleted") {
			clearInterval(this._proposalCompletedInterval);
		} else if (eventName === "VoteCast") {
			clearInterval(this._voteCastInterval);
		}
		this._registeredListeners.delete(eventName);
	}

	/**
	 * Triggers the listener of the given event with the given data. Throws an error if the event did not have a listener.
	 * @param eventName The event to be triggered.
	 * @param data The data being passed to the listener.
	 * @example
	 * snapshot.trigger('VoteCast', {
	 * 	id: "123456789",
	 * 	voter: { id: "0x0000000000000000000000000000000000000000"},
	 * 	votingPower: 9999,
	 * 	//...
	 * });
	 */
	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this._registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * @returns The name of the contract. `Snapshot`.
	 */
	public name() {
		return "Snapshot";
	}

	/**
	 * Add more spaces to listen to. Ignores duplicates.
	 * @param spaceIds ENS of the Snapshot spaces.
	 */
	public addSpace(...spaceIds: string[]) {
		for (const spaceId of spaceIds) {
			if (this.spaceIds.includes(spaceId)) {
				continue;
			}

			this.spaceIds.push(spaceId);
		}
	}

	/**
	 * Remove spaces listened to.
	 * @param spaceIds ENS of the Snapshot spaces.
	 */
	public removeSpace(...spaceIds: string[]) {
		this.spaceIds = this.spaceIds.filter((spaceId) => {
			return !spaceIds.includes(spaceId);
		});
	}

	private async _listenToProposalCreated(listener: (data: EventData.Snapshot.Proposal) => void) {
		const query = createProposalCreatedQuery(this.spaceIds);
		const proposals = await _fetchProposals(query);
		if (proposals.length <= 0) {
			return;
		}
		const newCreatedTime = proposals[0].created;
		if (newCreatedTime <= this._previousProposalCreatedTime) {
			return;
		}

		const proposalsToListenTo: EventData.Snapshot.Proposal[] = [];
		for (const proposal of proposals) {
			if (proposal.created <= this._previousProposalCreatedTime) {
				break;
			}

			proposalsToListenTo.unshift(_formatProposal(proposal));
		}

		this._previousProposalCreatedTime = newCreatedTime;

		for (const proposal of proposalsToListenTo) {
			listener(proposal);
		}
	}

	private async _listenToProposalCompleted(listener: (data: EventData.Snapshot.Proposal) => void) {
		const query = createProposalCompletedQuery(this.spaceIds);
		const proposals = await _fetchProposals(query);
		if (proposals.length <= 0) {
			return;
		}
		const newCompleteTime = proposals[0].end;
		if (newCompleteTime <= this._previousProposalCompletedTime) {
			return;
		}

		const proposalsToListenTo: EventData.Snapshot.Proposal[] = [];
		for (const proposal of proposals) {
			if (proposal.end <= this._previousProposalCompletedTime) {
				break;
			}

			proposalsToListenTo.unshift(_formatProposal(proposal));
		}

		this._previousProposalCompletedTime = newCompleteTime;

		for (const proposal of proposalsToListenTo) {
			listener(proposal);
		}
	}

	private async _listenToVoteCast(listener: (data: EventData.Snapshot.Vote) => void) {
		const query = createVoteCastQuery(this.spaceIds);
		const votes = await _fetchVotes(query);
		if (votes.length <= 0) {
			return;
		}
		const newCastTime = votes[0].created;
		if (newCastTime <= this._previousVoteCastTime) {
			return;
		}

		const votesToListenTo: EventData.Snapshot.Vote[] = [];
		for (const vote of votes) {
			if (vote.created <= this._previousVoteCastTime) {
				break;
			}

			votesToListenTo.unshift(_formatVote(vote));
		}

		this._previousVoteCastTime = newCastTime;

		for (const vote of votesToListenTo) {
			listener(vote);
		}
	}
}

type Proposal = {
	id: string;
	title: string;
	body: string;
	choices: string[];
	start: number;
	end: number;
	created: number;
	snapshot: string;
	state: "pending" | "active" | "closed";
	author: string;
	quorum: number;
	scores: number[];
	votes: number;
	space: {
		id: string;
		name: string;
	};
};

type Vote = {
	id: string;
	voter: string;
	vp: number;
	created: number;
	// GraphQL docs say choice is an any type but current examples are all numbers.
	// Didn't find anything in code. Keep an eye out for this.
	choice: number;
	reason: string;
	space: {
		id: string;
		name: string;
	};
	proposal: {
		id: string;
		title: string;
		choices: string[];
		quorum: number;
		scores: number[];
		votes: number;
	};
};

type ProposalsResponse = {
	data: {
		proposals: Proposal[];
	};
};

type VotesResponse = {
	data: {
		votes: Vote[];
	};
};

export function createProposalCreatedQuery(spaceIds: string[]) {
	const formattedSpaceIds = spaceIds.map((spaceId) => `\"${spaceId}\"`).join(",");

	const query = `
		query Proposals {
			proposals(
			first: 10,
			skip: 0,
			where: {
				state: "pending"
				space_in: [${formattedSpaceIds}]
			},
			orderBy: "created",
			orderDirection: desc
			) {
			id
			title
			body
			choices
			start
			end
			created
			snapshot
			state
			author
			quorum
			scores
			votes
			space {
				id
				name
			}
			}
		}
	`;
	return query;
}

export function createProposalCompletedQuery(spaceIds: string[]) {
	const formattedSpaceIds = spaceIds.map((spaceId) => `\"${spaceId}\"`).join(",");

	const query = `
		query Proposals {
			proposals(
			first: 20,
			skip: 0,
			where: {
				state: "closed"
				space_in: [${formattedSpaceIds}]
			},
			orderBy: "end",
			orderDirection: desc
			) {
			id
			title
			body
			choices
			start
			end
			created
			snapshot
			state
			author
			quorum
			scores
			votes
			space {
				id
				name
			}
			}
		}
	`;
	return query;
}

export function createVoteCastQuery(spaceIds: string[]) {
	const formattedSpaceIds = spaceIds.map((spaceId) => `\"${spaceId}\"`).join(",");

	const query = `
		query Votes {
			votes (
			first: 20
			orderBy: "created"
			orderDirection: desc
			where: {
				space_in: [${formattedSpaceIds}]
			}
			) {
			id
			voter
			vp
			created
			choice
			reason
			space {
				id
				name
			}
			proposal {
				id
				title
				choices
				quorum
				scores
				votes
			}
			}
		}
		`;
	return query;
}

async function _fetchProposals(query: string) {
	try {
		const response = await fetch("https://hub.snapshot.org/graphql", {
			method: "post",
			body: JSON.stringify({ query }),
			headers: { "Content-Type": "application/json" }
		});

		if (!response.ok) {
			const error = new Error(`HTTP Error: ${response.status} ${response.statusText} ${await response.text()}`);
			throw error;
		}

		const jsonResponse: ProposalsResponse = await response.json();

		return jsonResponse.data.proposals;
	} catch (error) {
		console.warn("Unable to fetch proposals from Snapshot.", error);
		return [];
	}
}

async function _fetchVotes(query: string) {
	try {
		const response = await fetch("https://hub.snapshot.org/graphql", {
			method: "post",
			body: JSON.stringify({ query }),
			headers: { "Content-Type": "application/json" }
		});

		if (!response.ok) {
			const error = new Error(`HTTP Error: ${response.status} ${response.statusText} ${await response.text()}`);
			throw error;
		}

		const jsonResponse: VotesResponse = await response.json();

		return jsonResponse.data.votes;
	} catch (error) {
		console.warn("Unable to fetch votes from Snapshot.", error);
		return [];
	}
}

function _formatProposal(proposal: Proposal) {
	const formattedResponse: EventData.Snapshot.Proposal = {
		id: proposal.id,
		title: proposal.title,
		body: proposal.body,
		choices: proposal.choices,
		startTime: proposal.start,
		endTime: proposal.end,
		createdTime: proposal.created,
		snapshot: proposal.snapshot,
		state: proposal.state,
		author: { id: proposal.author },
		quorum: proposal.quorum,
		scores: proposal.scores,
		votes: proposal.votes,
		space: proposal.space
	};

	return formattedResponse;
}

function _formatVote(vote: Vote) {
	const formattedResponse: EventData.Snapshot.Vote = {
		id: vote.id,
		voter: { id: vote.voter },
		votingPower: vote.vp,
		created: vote.created,
		// The GraphQL choice is index-1 based (so first choice is index 1).
		// Subtracting 1 to make it consistent with the proposal choices.
		choice: vote.choice - 1,
		reason: vote.reason,
		space: vote.space,
		proposal: vote.proposal
	};

	return formattedResponse;
}
