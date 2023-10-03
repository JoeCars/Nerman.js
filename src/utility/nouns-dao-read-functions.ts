import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";

const NOUNS_STARTING_BLOCK = 13072753;

// ==================================
// DAOWithdrawNounsFromEscrow
// ==================================

interface DAOWithdrawNounsFromEscrowQuery {
	startBlock?: number;
	endBlock?: number;
	tokenId?: number;
	to?: string;
}

export async function getDAOWithdrawNounsFromEscrow(query?: DAOWithdrawNounsFromEscrowQuery) {
	let events = await _getAllDAOWithdrawNounsFromEscrow();

	if (!query) {
		return events;
	}

	if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.DAOWithdrawNounsFromEscrow[];
	}

	if (query.tokenId) {
		events = _filterDAOWithdrawNounsFromEscrowByTokenId(events, query.tokenId);
	}

	if (query.to) {
		events = _filterDAOWithdrawNounsFromEscrowByTo(events, query.to);
	}

	return events;
}

async function _getAllDAOWithdrawNounsFromEscrow() {
	let path = join(__dirname, "..", "data", "index", "DAOWithdrawNounsFromEscrow.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.DAOWithdrawNounsFromEscrow[] = JSON.parse(proposalFile);
	return proposals;
}

/**
 * @param startBlock The starting block. Inclusive.
 * @param endBlock The final block. Inclusive.
 */
function _filterByBlock(events: Indexer.FormattedEvent[], startBlock: number, endBlock: number) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterDAOWithdrawNounsFromEscrowByTokenId(events: Indexer.NounsDAO.DAOWithdrawNounsFromEscrow[], tokenId: number) {
	let filteredEvents = events.filter((event) => {
		return event.tokenIds.includes(tokenId);
	});
	return filteredEvents;
}

function _filterDAOWithdrawNounsFromEscrowByTo(events: Indexer.NounsDAO.DAOWithdrawNounsFromEscrow[], to: string) {
	let filteredEvents = events.filter((event) => {
		return event.to === to;
	});
	return filteredEvents;
}

// ==================================
// ERC20TokensToIncludeInForkSet
// ==================================

interface ERC20TokensToIncludeInForkSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getERC20TokensToIncludeInForkSet(query?: ERC20TokensToIncludeInForkSetQuery) {
	let events = await _getAllERC20TokensToIncludeInForkSet();

	if (!query) {
		return events;
	}

	if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ERC20TokensToIncludeInForkSet[];
	}

	return events;
}

async function _getAllERC20TokensToIncludeInForkSet() {
	let path = join(__dirname, "..", "data", "index", "ERC20TokensToIncludeInForkSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ERC20TokensToIncludeInForkSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// EscrowedToFork
// ==================================

interface EscrowedToForkQuery {
	startBlock?: number;
	endBlock?: number;
	forkId?: number;
	owner?: string;
	tokenId?: number;
	proposalId?: number;
}

export async function getEscrowedToFork(query?: EscrowedToForkQuery) {
	let events = await _getAllEscrowedToFork();

	if (!query) {
		return events;
	}

	if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.EscrowedToFork[];
	}

	if (query.forkId) {
		events = events.filter((event) => {
			return event.forkId === query.forkId;
		});
	}

	if (query.owner) {
		events = events.filter((event) => {
			return event.owner === query.owner;
		});
	}

	if (query.tokenId !== undefined) {
		events = events.filter((event) => {
			return event.tokenIds.includes(query.tokenId as number);
		});
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalIds.includes(query.proposalId as number);
		});
	}

	return events;
}

async function _getAllEscrowedToFork() {
	let path = join(__dirname, "..", "data", "index", "EscrowedToFork.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.EscrowedToFork[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ExecuteFork
// ==================================

interface ExecuteForkQuery {
	startBlock?: number;
	endBlock?: number;
	startId?: number;
	endId?: number;
	id?: number;
}

export async function getExecutedFork(query?: ExecuteForkQuery) {
	let events = await _getAllExecutedForkEvents();

	if (!query) {
		return events;
	}

	if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		events = _filterExecutedForkByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.startId || query.endId) {
		if (!query.startId) {
			query.startId = 0;
		}
		if (!query.endId) {
			query.endId = Infinity;
		}
		events = _filterExecutedForkById(events, query.startId, query.endId);
	} else if (query.id) {
		events = _filterExecutedForkById(events, query.id);
	}

	return events;
}

async function _getAllExecutedForkEvents() {
	let path = join(__dirname, "..", "data", "index", "ExecuteFork.json");
	let forkFile = await readFile(path, { encoding: "utf8" });
	let forks: Indexer.NounsDAO.ExecuteFork[] = JSON.parse(forkFile);
	return forks;
}

/**
 * @param startBlock The starting block. Inclusive.
 * @param endBlock The final block. Inclusive.
 */
function _filterExecutedForkByBlock(forks: Indexer.NounsDAO.ExecuteFork[], startBlock: number, endBlock: number) {
	let filteredForks = forks.filter((fork) => {
		return fork.blockNumber >= startBlock && fork.blockNumber <= endBlock;
	});
	return filteredForks;
}

/**
 * @param startId The starting block. Inclusive.
 * @param endId The final block. Inclusive.
 */
function _filterExecutedForkById(forks: Indexer.NounsDAO.ExecuteFork[], startId: number, endId?: number) {
	if (endId === undefined) {
		endId = startId;
	}

	let filteredForks = forks.filter((fork) => {
		return fork.forkId >= startId && fork.forkId <= (endId as number);
	});
	return filteredForks;
}

// ==================================
// ProposalCreated
// ==================================

interface ProposalQuery {
	startBlock?: number;
	endBlock?: number;
	startId?: number;
	endId?: number;
	id?: number;
	status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
	proposer?: string;
}

export async function getProposals(query?: ProposalQuery) {
	let events = await _getAllProposals();

	if (!query) {
		return events;
	}

	if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		events = _filterProposalsByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.startId || query.endId) {
		if (!query.startId) {
			query.startId = 0;
		}
		if (!query.endId) {
			query.endId = Infinity;
		}
		events = _filterProposalsById(events, query.startId, query.endId);
	} else if (query.id) {
		events = _filterProposalsById(events, query.id);
	}

	if (query.proposer) {
		events = _filterProposalByProposer(events, query.proposer);
	}

	if (query.status) {
		events = await _filterProposalsByStatus(events, query.status);
	}

	return events;
}

async function _getAllProposals() {
	let path = join(__dirname, "..", "data", "index", "ProposalCreated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalCreated[] = JSON.parse(proposalFile);
	return proposals;
}

/**
 * @param startBlock The starting block. Inclusive.
 * @param endBlock The final block. Inclusive.
 */
function _filterProposalsByBlock(proposals: Indexer.NounsDAO.ProposalCreated[], startBlock: number, endBlock: number) {
	let filteredProposals = proposals.filter((proposal) => {
		return proposal.blockNumber >= startBlock && proposal.blockNumber <= endBlock;
	});
	return filteredProposals;
}

/**
 * @param startId The starting block. Inclusive.
 * @param endId The final block. Inclusive.
 */
function _filterProposalsById(proposals: Indexer.NounsDAO.ProposalCreated[], startId: number, endId?: number) {
	if (endId === undefined) {
		endId = startId;
	}

	let filteredProposals = proposals.filter((proposal) => {
		return proposal.id >= startId && proposal.id <= (endId as number);
	});
	return filteredProposals;
}

function _filterProposalByProposer(proposals: Indexer.NounsDAO.ProposalCreated[], proposer: string) {
	let filteredProposals = proposals.filter((proposal) => {
		return proposal.proposer === proposer;
	});
	return filteredProposals;
}

async function _filterProposalsByStatus(proposals: Indexer.NounsDAO.ProposalCreated[], status: string) {
	let statuses = await _getAllStatusChange();
	let newestProposalStatuses = new Map<number, { blockNumber: number; status: string }>();
	for (let status of statuses) {
		let storedStatus = newestProposalStatuses.get(status.proposalId);
		if (!storedStatus || storedStatus.blockNumber < status.blockNumber) {
			newestProposalStatuses.set(Number(status.proposalId), { blockNumber: status.blockNumber, status: status.status });
		}
	}

	let filteredProposals = proposals.filter((proposal) => {
		let newestStatus = newestProposalStatuses.get(proposal.id);
		let hasCorrectStatus = newestStatus !== undefined && newestStatus.status === status;
		return hasCorrectStatus;
	});
	return filteredProposals;
}

async function _getAllProposalCanceled() {
	let canceledPath = join(__dirname, "..", "data", "index", "ProposalCanceled.json");
	let canceledFile = await readFile(canceledPath, { encoding: "utf8" });
	let canceledProposals: Indexer.NounsDAO.ProposalCanceled[] = JSON.parse(canceledFile);
	return canceledProposals;
}

async function _getAllProposalExecuted() {
	let executedPath = join(__dirname, "..", "data", "index", "ProposalExecuted.json");
	let executedFile = await readFile(executedPath, { encoding: "utf8" });
	let executedProposals: Indexer.NounsDAO.ProposalExecuted[] = JSON.parse(executedFile);
	return executedProposals;
}

async function _getAllProposalQueued() {
	let queuedPath = join(__dirname, "..", "data", "index", "ProposalQueued.json");
	let queuedFile = await readFile(queuedPath, { encoding: "utf8" });
	let queuedProposals: Indexer.NounsDAO.ProposalQueued[] = JSON.parse(queuedFile);
	return queuedProposals;
}

async function _getAllProposalVetoed() {
	let vetoedPath = join(__dirname, "..", "data", "index", "ProposalVetoed.json");
	let vetoedFile = await readFile(vetoedPath, { encoding: "utf8" });
	let vetoedProposals: Indexer.NounsDAO.ProposalVetoed[] = JSON.parse(vetoedFile);
	return vetoedProposals;
}

async function _getAllStatusChange() {
	let proposals = await _getAllProposalCanceled();
	proposals = proposals.concat(await _getAllProposalExecuted());
	proposals = proposals.concat(await _getAllProposalQueued());
	proposals = proposals.concat(await _getAllProposalVetoed());
	proposals.sort((a, b) => {
		return a.blockNumber - b.blockNumber;
	});
	return proposals; // Proposals should probably be indexed together anyway.
}

// ==================================
// ProposalStatusChange
// ==================================

interface StatusChangeQuery {
	startBlock?: number;
	endBlock?: number;
	proposalId?: number;
	status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
}

export async function getStatusChangeEvents(query?: StatusChangeQuery) {
	let events: Indexer.NounsDAO.ProposalCanceled[] = [];

	if (!query) {
		return _getAllStatusChange();
	}

	if (query.status === "Cancelled") {
		events = await _getAllProposalCanceled();
	} else if (query.status === "Vetoed") {
		events = await _getAllProposalVetoed();
	} else if (query.status === "Queued") {
		events = await _getAllProposalQueued();
	} else if (query.status === "Executed") {
		events = await _getAllProposalExecuted();
	} else {
		events = await _getAllStatusChange();
	}

	if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		events = _filterStatusChangeByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.proposalId) {
		events = _filterStatusChangeByProposalId(events, query.proposalId);
	}

	return events;
}

/**
 * @param startBlock The starting block. Inclusive.
 * @param endBlock The final block. Inclusive.
 */
function _filterStatusChangeByBlock(statuses: Indexer.NounsDAO.ProposalCanceled[], startBlock: number, endBlock: number) {
	let filteredStatuses = statuses.filter((status) => {
		return status.blockNumber >= startBlock && status.blockNumber <= endBlock;
	});
	return filteredStatuses;
}

function _filterStatusChangeByProposalId(statuses: Indexer.NounsDAO.ProposalCanceled[], proposalId: number) {
	let filteredStatuses = statuses.filter((status) => {
		return status.proposalId === proposalId;
	});
	return filteredStatuses;
}

// ==================================
// VoteCast
// ==================================

interface VoteCastQuery {
	startBlock?: number;
	endBlock?: number;
	voter?: string;
	proposalId?: number;
	support?: "AGAINST" | "FOR" | "ABSTAIN";
}

export async function getVoteCastEvents(query?: VoteCastQuery) {
	let events = await _getAllVoteCast();

	if (!query) {
		return events;
	}

	if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		events = _filterVoteCastByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.proposalId) {
		events = _filterVoteCastByProposalId(events, query.proposalId);
	}

	if (query.voter) {
		events = _filterVoteCastByVoter(events, query.voter);
	}

	if (query.support) {
		events = _filterVoteCastBySupport(events, query.support);
	}

	return events;
}

async function _getAllVoteCast() {
	let path = join(__dirname, "..", "data", "index", "VoteCast.json");
	let file = await readFile(path, { encoding: "utf8" });
	let votes: Indexer.NounsDAO.VoteCast[] = JSON.parse(file);
	return votes;
}

function _filterVoteCastByBlock(votes: Indexer.NounsDAO.VoteCast[], startBlock: number, endBlock: number) {
	let filteredVotes = votes.filter((vote) => {
		return vote.blockNumber >= startBlock && vote.blockNumber <= endBlock;
	});
	return filteredVotes;
}

function _filterVoteCastByProposalId(votes: Indexer.NounsDAO.VoteCast[], proposalId: number) {
	let filteredVotes = votes.filter((vote) => {
		return vote.proposalId === proposalId;
	});
	return filteredVotes;
}

function _filterVoteCastByVoter(votes: Indexer.NounsDAO.VoteCast[], voter: string) {
	let filteredVotes = votes.filter((vote) => {
		return vote.voterAddress === voter;
	});
	return filteredVotes;
}

function _filterVoteCastBySupport(votes: Indexer.NounsDAO.VoteCast[], support: string) {
	let filteredVotes = votes.filter((vote) => {
		return vote.supportChoice === support;
	});
	return filteredVotes;
}