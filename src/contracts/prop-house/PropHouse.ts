import { ethers } from "ethers";
import { ChainId, OrderDirection, PropHouse as PropHouseSDK } from "@prophouse/sdk";
import { OrderByProposalFields, OrderByVoteFields } from "@prophouse/sdk/dist/gql/starknet/graphql";
import { Account, EventData } from "../../types";

const POLL_TIME = 60_000;

export interface SupportedEventMap {
	RoundCreated: EventData.PropHouse.RoundCreated;
	HouseCreated: EventData.PropHouse.HouseCreated;
	ProposalSubmitted: EventData.PropHouse.ProposalSubmitted;
	VoteCast: EventData.PropHouse.VoteCast;
}
const SUPPORTED_PROP_HOUSE_EVENTS = ["RoundCreated", "HouseCreated", "ProposalSubmitted", "VoteCast"] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class for PropHouse.
 */
export class PropHouse {
	public provider: ethers.providers.JsonRpcProvider;
	public prophouse: PropHouseSDK;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_PROP_HOUSE_EVENTS;
	private proposalSubmittedLastTime: number;
	private voteCastLastTime: number;
	private proposalSubmittedTask?: NodeJS.Timeout | undefined;
	private voteCastTask?: NodeJS.Timeout | undefined;

	constructor(provider: ethers.providers.JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = new ethers.providers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this.prophouse = new PropHouseSDK({
			evmChainId: ChainId.EthereumMainnet,
			evm: this.provider
		});
		this.registeredListeners = new Map();
		this.proposalSubmittedLastTime = Math.floor(Date.now() / 1000); // Needs seconds, not milliseconds.
		this.voteCastLastTime = Math.floor(Date.now() / 1000); // Needs seconds, not milliseconds.
	}

	/**
	 * Assigns a listener function for the given event. Throws an error if the event is not supported.
	 * @param eventName The event being listened to.
	 * @param listener The listener function.
	 * @example
	 * prophouse.on('RoundCreated', (data) => {
	 * 	console.log(data.creator);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "RoundCreated":
				this.prophouse.contract.on(
					"RoundCreated",
					async (
						creator: string,
						house: string,
						round: string,
						kind: any,
						title: string,
						description: string,
						event: ethers.Event
					) => {
						const houseObject = await this.prophouse.query.getHouse(house);

						const data: EventData.PropHouse.RoundCreated = {
							creator: { id: creator },
							house: { id: house, name: houseObject.name },
							round: { id: round },
							kind,
							title,
							description,
							event: event as any
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;
			case "HouseCreated":
				this.prophouse.contract.on("HouseCreated", (creator: string, house: string, kind: any, event: ethers.Event) => {
					const data: EventData.PropHouse.HouseCreated = {
						creator: { id: creator },
						house: { id: house },
						kind,
						event: event as any
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "ProposalSubmitted":
				this.proposalSubmittedTask = this.listenToProposalSubmittedEvent(listener as () => {});
				this.registeredListeners.set(eventName, listener);
				break;
			case "VoteCast":
				this.voteCastTask = this.listenToVoteCastEvent(listener as () => {});
				this.registeredListeners.set(eventName, listener);
				break;
			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes a listener.
	 * @param eventName the event listened to.
	 * @example
	 * prophouse.off('RoundCreated');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			if (eventName === "HouseCreated" || eventName === "RoundCreated") {
				this.prophouse.contract.off(eventName, listener as ethers.providers.Listener);
			} else if (eventName === "ProposalSubmitted") {
				clearInterval(this.proposalSubmittedTask);
			} else if (eventName === "VoteCast") {
				clearInterval(this.voteCastTask);
			}
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers the listener of the given event with the given data. Throws an error if the event did not have a listener.
	 * @param eventName The event to be triggered.
	 * @param data The data being passed to the listener.
	 */
	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * @returns the name of the contract. 'PropHouse'.
	 */
	public name() {
		return "PropHouse";
	}

	private listenToProposalSubmittedEvent(listener: (arg: EventData.PropHouse.ProposalSubmitted) => void) {
		return setInterval(async () => {
			const proposals = await this.prophouse.query.getProposals({
				where: {
					receivedAt_gt: this.proposalSubmittedLastTime
				},
				orderBy: OrderByProposalFields.ReceivedAt,
				orderDirection: OrderDirection.Asc
			});

			for (let i = 0; i < proposals.length; ++i) {
				if (i === proposals.length - 1) {
					this.proposalSubmittedLastTime = proposals[i].receivedAt;
				}

				const round = await this.prophouse.query.getRoundWithHouseInfo(proposals[i].round);
				const proposal: EventData.PropHouse.ProposalSubmitted = {
					proposalId: proposals[i].id,
					proposer: { id: proposals[i].proposer },
					round: { id: proposals[i].round, title: round.title },
					house: { id: round.house.address, name: round.house.name },
					metaDataURI: proposals[i].metadataURI,
					title: proposals[i].title,
					description: proposals[i].body,
					isCancelled: proposals[i].isCancelled,
					isWinner: proposals[i].isWinner,
					winningPosition: proposals[i].winningPosition,
					votingPower: proposals[i].votingPower,
					event: {
						createdAt: proposals[i].receivedAt,
						txHash: proposals[i].txHash
					}
				};
				listener(proposal);
			}
		}, POLL_TIME);
	}

	private listenToVoteCastEvent(listener: (arg: EventData.PropHouse.VoteCast) => void) {
		return setInterval(async () => {
			const votes = await this.prophouse.query.getVotes({
				where: {
					receivedAt_gt: this.voteCastLastTime
				},
				orderBy: OrderByVoteFields.ReceivedAt,
				orderDirection: OrderDirection.Asc
			});

			for (let i = 0; i < votes.length; ++i) {
				if (i === votes.length - 1) {
					this.voteCastLastTime = votes[i].receivedAt;
				}

				const proposal = await this.prophouse.query.getProposal(votes[i].round, votes[i].proposalId);
				const round = await this.prophouse.query.getRoundWithHouseInfo(votes[i].round);

				const vote: EventData.PropHouse.VoteCast = {
					voter: { id: votes[i].voter },
					round: { id: votes[i].round, title: round.title },
					house: { id: round.house.address, name: round.house.name },
					proposalTitle: proposal.title,
					proposalId: votes[i].proposalId,
					votingPower: votes[i].votingPower,
					event: {
						createdAt: votes[i].receivedAt,
						txHash: votes[i].txHash
					}
				};
				listener(vote);
			}
		}, POLL_TIME);
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return PropHouse.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
