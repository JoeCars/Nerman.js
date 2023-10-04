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
// ForkDAODeployerSet
// ==================================

interface ForkDAODeployerSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getForkDAODeployerSet(query?: ForkDAODeployerSetQuery) {
	let events = await _getAllForkDAODeployerSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ForkDAODeployerSet[];
	}

	return events;
}

async function _getAllForkDAODeployerSet() {
	let path = join(__dirname, "..", "data", "index", "ForkDAODeployerSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ForkDAODeployerSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ForkPeriodSet
// ==================================

interface ForkPeriodSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getForkPeriodSet(query?: ForkPeriodSetQuery) {
	let events = await _getAllForkPeriodSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ForkPeriodSet[];
	}

	return events;
}

async function _getAllForkPeriodSet() {
	let path = join(__dirname, "..", "data", "index", "ForkPeriodSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ForkPeriodSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ForkThresholdSet
// ==================================

interface ForkThresholdSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getForkThresholdSet(query?: ForkThresholdSetQuery) {
	let events = await _getAllForkThresholdSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ForkThresholdSet[];
	}

	return events;
}

async function _getAllForkThresholdSet() {
	let path = join(__dirname, "..", "data", "index", "ForkThresholdSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ForkThresholdSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// JoinFork
// ==================================

interface JoinForkQuery {
	startBlock?: number;
	endBlock?: number;
	forkId?: number;
	owner?: string;
	tokenId?: number;
	proposalId?: number;
}

export async function getJoinFork(query?: JoinForkQuery) {
	let events = await _getAllJoinFork();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.JoinFork[];
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

async function _getAllJoinFork() {
	let path = join(__dirname, "..", "data", "index", "JoinFork.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.JoinFork[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// LastMinuteWindowSet
// ==================================

interface LastMinuteWindowSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getLastMinuteWindowSet(query?: LastMinuteWindowSetQuery) {
	let events = await _getAllLastMinuteWindowSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.LastMinuteWindowSet[];
	}

	return events;
}

async function _getAllLastMinuteWindowSet() {
	let path = join(__dirname, "..", "data", "index", "LastMinuteWindowSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.LastMinuteWindowSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// MaxQuorumVotesBPSSet
// ==================================

interface MaxQuorumVotesBPSSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getMaxQuorumVotesBPSSet(query?: MaxQuorumVotesBPSSetQuery) {
	let events = await _getAllMaxQuorumVotesBPSSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.MaxQuorumVotesBPSSet[];
	}

	return events;
}

async function _getAllMaxQuorumVotesBPSSet() {
	let path = join(__dirname, "..", "data", "index", "MaxQuorumVotesBPSSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.MaxQuorumVotesBPSSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// MinQuorumVotesBPSSet
// ==================================

interface MinQuorumVotesBPSSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getMinQuorumVotesBPSSet(query?: MinQuorumVotesBPSSetQuery) {
	let events = await _getAllMinQuorumVotesBPSSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.MinQuorumVotesBPSSet[];
	}

	return events;
}

async function _getAllMinQuorumVotesBPSSet() {
	let path = join(__dirname, "..", "data", "index", "MinQuorumVotesBPSSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.MinQuorumVotesBPSSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewAdmin
// ==================================

interface NewAdminQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getNewAdmin(query?: NewAdminQuery) {
	let events = await _getAllNewAdmin();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.NewAdmin[];
	}

	return events;
}

async function _getAllNewAdmin() {
	let path = join(__dirname, "..", "data", "index", "NewAdmin.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewAdmin[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewImplementation
// ==================================

interface NewImplementationQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getNewImplementation(query?: NewImplementationQuery) {
	let events = await _getAllNewImplementation();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.NewImplementation[];
	}

	return events;
}

async function _getAllNewImplementation() {
	let path = join(__dirname, "..", "data", "index", "NewImplementation.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewImplementation[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewPendingAdmin
// ==================================

interface NewPendingAdminQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getNewPendingAdmin(query?: NewPendingAdminQuery) {
	let events = await _getAllNewPendingAdmin();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.NewPendingAdmin[];
	}

	return events;
}

async function _getAllNewPendingAdmin() {
	let path = join(__dirname, "..", "data", "index", "NewPendingAdmin.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewPendingAdmin[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewPendingVetoer
// ==================================

interface NewPendingVetoerQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getNewPendingVetoer(query?: NewPendingVetoerQuery) {
	let events = await _getAllNewPendingVetoer();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.NewPendingVetoer[];
	}

	return events;
}

async function _getAllNewPendingVetoer() {
	let path = join(__dirname, "..", "data", "index", "NewPendingVetoer.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewPendingVetoer[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewVetoer
// ==================================

interface NewVetoerQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getNewVetoer(query?: NewVetoerQuery) {
	let events = await _getAllNewVetoer();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.NewVetoer[];
	}

	return events;
}

async function _getAllNewVetoer() {
	let path = join(__dirname, "..", "data", "index", "NewVetoer.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewVetoer[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ObjectionPeriodDurationSet
// ==================================

interface ObjectionPeriodDurationSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getObjectionPeriodDurationSet(query?: ObjectionPeriodDurationSetQuery) {
	let events = await _getAllObjectionPeriodDurationSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ObjectionPeriodDurationSet[];
	}

	return events;
}

async function _getAllObjectionPeriodDurationSet() {
	let path = join(__dirname, "..", "data", "index", "ObjectionPeriodDurationSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ObjectionPeriodDurationSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalCanceled
// ==================================

interface ProposalCanceledQuery {
	startBlock?: number;
	endBlock?: number;
	proposalId?: number;
}

export async function getProposalCanceled(query?: ProposalCanceledQuery) {
	let events = await _getAllProposalCanceled();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalCanceled[];
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalId === query.proposalId;
		});
	}

	return events;
}

async function _getAllProposalCanceled() {
	let path = join(__dirname, "..", "data", "index", "ProposalCanceled.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalCanceled[] = JSON.parse(proposalFile);
	return proposals;
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
// ProposalCreatedOnTimelockV1
// ==================================

interface ProposalCreatedOnTimelockV1Query {
	startBlock?: number;
	endBlock?: number;
}

export async function getProposalCreatedOnTimelockV1(query?: ProposalCreatedOnTimelockV1Query) {
	let events = await _getAllProposalCreatedOnTimelockV1();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalCreatedOnTimelockV1[];
	}

	return events;
}

async function _getAllProposalCreatedOnTimelockV1() {
	let path = join(__dirname, "..", "data", "index", "ProposalCreatedOnTimelockV1.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalCreatedOnTimelockV1[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalCreatedWithRequirements
// ==================================

interface ProposalCreatedWithRequirementsQuery {
	startBlock?: number;
	endBlock?: number;
	startId?: number;
	endId?: number;
	id?: number;
	status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
	proposer?: string;
}

export async function getProposalCreatedWithRequirements(query?: ProposalCreatedWithRequirementsQuery) {
	let events = await _getAllProposalCreatedWithRequirements();

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
		events = _filterProposalsByBlock(
			events,
			query.startBlock,
			query.endBlock
		) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	}

	if (query.startId || query.endId) {
		if (!query.startId) {
			query.startId = 0;
		}
		if (!query.endId) {
			query.endId = Infinity;
		}
		events = _filterProposalsById(events, query.startId, query.endId) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	} else if (query.id) {
		events = _filterProposalsById(events, query.id) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	}

	if (query.proposer) {
		events = _filterProposalByProposer(events, query.proposer) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	}

	if (query.status) {
		events = (await _filterProposalsByStatus(events, query.status)) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	}

	return events;
}

async function _getAllProposalCreatedWithRequirements() {
	let path = join(__dirname, "..", "data", "index", "ProposalCreatedWithRequirements.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalCreatedWithRequirements[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalDescriptionUpdated
// ==================================

interface ProposalDescriptionUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
	proposer?: string;
}

export async function getProposalDescriptionUpdated(query?: ProposalDescriptionUpdatedQuery) {
	let events = await _getAllProposalDescriptionUpdated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalDescriptionUpdated[];
	}

	if (query.proposer) {
		events = events.filter((event) => {
			return event.proposer === query.proposer;
		});
	}

	return events;
}

async function _getAllProposalDescriptionUpdated() {
	let path = join(__dirname, "..", "data", "index", "ProposalDescriptionUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalDescriptionUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalExecuted
// ==================================

interface ProposalExecutedQuery {
	startBlock?: number;
	endBlock?: number;
	proposalId?: number;
}

export async function getProposalExecuted(query?: ProposalExecutedQuery) {
	let events = await _getAllProposalExecuted();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalExecuted[];
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalId === query.proposalId;
		});
	}

	return events;
}

async function _getAllProposalExecuted() {
	let path = join(__dirname, "..", "data", "index", "ProposalExecuted.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalExecuted[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalObjectionPeriodSet
// ==================================

interface ProposalObjectionPeriodSetQuery {
	startBlock?: number;
	endBlock?: number;
	proposalId?: number;
}

export async function getProposalObjectionPeriodSet(query?: ProposalObjectionPeriodSetQuery) {
	let events = await _getAllProposalObjectionPeriodSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalObjectionPeriodSet[];
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalId === query.proposalId;
		});
	}

	return events;
}

async function _getAllProposalObjectionPeriodSet() {
	let path = join(__dirname, "..", "data", "index", "ProposalObjectionPeriodSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalObjectionPeriodSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalQueued
// ==================================

interface ProposalQueuedQuery {
	startBlock?: number;
	endBlock?: number;
	proposalId?: number;
}

export async function getProposalQueued(query?: ProposalQueuedQuery) {
	let events = await _getAllProposalQueued();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalQueued[];
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalId === query.proposalId;
		});
	}

	return events;
}

async function _getAllProposalQueued() {
	let path = join(__dirname, "..", "data", "index", "ProposalQueued.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalQueued[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalThresholdBPSSet
// ==================================

interface ProposalThresholdBPSSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getProposalThresholdBPSSet(query?: ProposalThresholdBPSSetQuery) {
	let events = await _getAllProposalThresholdBPSSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalThresholdBPSSet[];
	}

	return events;
}

async function _getAllProposalThresholdBPSSet() {
	let path = join(__dirname, "..", "data", "index", "ProposalThresholdBPSSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalThresholdBPSSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalTransactionsUpdated
// ==================================

interface ProposalTransactionsUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
	id?: number;
	proposer?: string;
}

export async function getProposalTransactionsUpdated(query?: ProposalTransactionsUpdatedQuery) {
	let events = await _getAllProposalTransactionsUpdated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalTransactionsUpdated[];
	}

	if (query.id !== undefined) {
		events = events.filter((event) => {
			return event.id === query.id;
		});
	}

	if (query.proposer) {
		events = events.filter((event) => {
			return event.proposer === query.proposer;
		});
	}

	return events;
}

async function _getAllProposalTransactionsUpdated() {
	let path = join(__dirname, "..", "data", "index", "ProposalTransactionsUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalTransactionsUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalUpdatablePeriodSet
// ==================================

interface ProposalUpdatablePeriodSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getProposalUpdatablePeriodSet(query?: ProposalUpdatablePeriodSetQuery) {
	let events = await _getAllProposalUpdatablePeriodSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalUpdatablePeriodSet[];
	}

	return events;
}

async function _getAllProposalUpdatablePeriodSet() {
	let path = join(__dirname, "..", "data", "index", "ProposalUpdatablePeriodSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalUpdatablePeriodSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalUpdated
// ==================================

interface ProposalUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
	id?: number;
	proposer?: string;
}

export async function getProposalUpdated(query?: ProposalUpdatedQuery) {
	let events = await _getAllProposalUpdated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalUpdated[];
	}

	if (query.id !== undefined) {
		events = events.filter((event) => {
			return event.id === query.id;
		});
	}

	if (query.proposer) {
		events = events.filter((event) => {
			return event.proposer === query.proposer;
		});
	}

	return events;
}

async function _getAllProposalUpdated() {
	let path = join(__dirname, "..", "data", "index", "ProposalUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalVetoed
// ==================================

interface ProposalVetoedQuery {
	startBlock?: number;
	endBlock?: number;
	proposalId?: number;
}

export async function getProposalVetoed(query?: ProposalVetoedQuery) {
	let events = await _getAllProposalVetoed();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalVetoed[];
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalId === query.proposalId;
		});
	}

	return events;
}

async function _getAllProposalVetoed() {
	let path = join(__dirname, "..", "data", "index", "ProposalVetoed.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalVetoed[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// QuorumCoefficientSet
// ==================================

interface QuorumCoefficientSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getQuorumCoefficientSet(query?: QuorumCoefficientSetQuery) {
	let events = await _getAllQuorumCoefficientSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.QuorumCoefficientSet[];
	}

	return events;
}

async function _getAllQuorumCoefficientSet() {
	let path = join(__dirname, "..", "data", "index", "QuorumCoefficientSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.QuorumCoefficientSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// QuorumVotesBPSSet
// ==================================

interface QuorumVotesBPSSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getQuorumVotesBPSSet(query?: QuorumVotesBPSSetQuery) {
	let events = await _getAllQuorumVotesBPSSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.QuorumVotesBPSSet[];
	}

	return events;
}

async function _getAllQuorumVotesBPSSet() {
	let path = join(__dirname, "..", "data", "index", "QuorumVotesBPSSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.QuorumVotesBPSSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// RefundableVote
// ==================================

interface RefundableVoteQuery {
	startBlock?: number;
	endBlock?: number;
	voter?: string;
}

export async function getRefundableVote(query?: RefundableVoteQuery) {
	let events = await _getAllRefundableVote();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.RefundableVote[];
	}

	if (query.voter) {
		events = events.filter((event) => {
			return event.voter === query.voter;
		});
	}

	return events;
}

async function _getAllRefundableVote() {
	let path = join(__dirname, "..", "data", "index", "RefundableVote.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.RefundableVote[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// SignatureCancelled
// ==================================

interface SignatureCancelledQuery {
	startBlock?: number;
	endBlock?: number;
	signer?: string;
}

export async function getSignatureCancelled(query?: SignatureCancelledQuery) {
	let events = await _getAllSignatureCancelled();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.SignatureCancelled[];
	}

	if (query.signer) {
		events = events.filter((event) => {
			return event.signer === query.signer;
		});
	}

	return events;
}

async function _getAllSignatureCancelled() {
	let path = join(__dirname, "..", "data", "index", "SignatureCancelled.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.SignatureCancelled[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// TimelocksAndAdminSet
// ==================================

interface TimelocksAndAdminSetQuery {
	startBlock?: number;
	endBlock?: number;
	admin?: string;
}

export async function getTimelocksAndAdminSet(query?: TimelocksAndAdminSetQuery) {
	let events = await _getAllTimelocksAndAdminSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.TimelocksAndAdminSet[];
	}

	if (query.admin) {
		events = events.filter((event) => {
			return event.admin === query.admin;
		});
	}

	return events;
}

async function _getAllTimelocksAndAdminSet() {
	let path = join(__dirname, "..", "data", "index", "TimelocksAndAdminSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.TimelocksAndAdminSet[] = JSON.parse(proposalFile);
	return proposals;
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

// ==================================
// VoteSnapshotBlockSwitchProposalIdSet
// ==================================

interface VoteSnapshotBlockSwitchProposalIdSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getVoteSnapshotBlockSwitchProposalIdSet(query?: VoteSnapshotBlockSwitchProposalIdSetQuery) {
	let events = await _getAllVoteSnapshotBlockSwitchProposalIdSet();

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
		events = _filterByBlock(
			events,
			query.startBlock,
			query.endBlock
		) as Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSet[];
	}

	return events;
}

async function _getAllVoteSnapshotBlockSwitchProposalIdSet() {
	let path = join(__dirname, "..", "data", "index", "VoteSnapshotBlockSwitchProposalIdSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSet[] = JSON.parse(proposalFile);
	return proposals;
}
