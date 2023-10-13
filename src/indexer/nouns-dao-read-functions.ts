import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock } from "../utilities/indexer";

// ==================================
// DAOWithdrawNounsFromEscrow
// ==================================

export async function fetchDAOWithdrawNounsFromEscrow(query?: Indexer.NounsDAO.DAOWithdrawNounsFromEscrowQuery) {
	let events = await _fetchAllDAOWithdrawNounsFromEscrow();

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

	if (query.tokenId !== undefined) {
		events = events.filter((event) => {
			return event.tokenIds.includes(query.tokenId as number);
		});
	}

	if (query.to) {
		events = events.filter((event) => {
			return event.to === query.to;
		});
	}

	return events;
}

async function _fetchAllDAOWithdrawNounsFromEscrow() {
	let path = join(__dirname, "..", "data", "indexer", "DAOWithdrawNounsFromEscrow.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.DAOWithdrawNounsFromEscrow[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ERC20TokensToIncludeInForkSet
// ==================================

export async function fetchERC20TokensToIncludeInForkSet(query?: Indexer.NounsDAO.ERC20TokensToIncludeInForkSetQuery) {
	let events = await _fetchAllERC20TokensToIncludeInForkSet();

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

async function _fetchAllERC20TokensToIncludeInForkSet() {
	let path = join(__dirname, "..", "data", "indexer", "ERC20TokensToIncludeInForkSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ERC20TokensToIncludeInForkSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// EscrowedToFork
// ==================================

export async function fetchEscrowedToFork(query?: Indexer.NounsDAO.EscrowedToForkQuery) {
	let events = await _fetchAllEscrowedToFork();

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

async function _fetchAllEscrowedToFork() {
	let path = join(__dirname, "..", "data", "indexer", "EscrowedToFork.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.EscrowedToFork[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ExecuteFork
// ==================================

export async function fetchExecutedFork(query?: Indexer.NounsDAO.ExecuteForkQuery) {
	let events = await _fetchAllExecutedForkEvents();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ExecuteFork[];
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

async function _fetchAllExecutedForkEvents() {
	let path = join(__dirname, "..", "data", "indexer", "ExecuteFork.json");
	let forkFile = await readFile(path, { encoding: "utf8" });
	let forks: Indexer.NounsDAO.ExecuteFork[] = JSON.parse(forkFile);
	return forks;
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

export async function fetchForkDAODeployerSet(query?: Indexer.NounsDAO.ForkDAODeployerSetQuery) {
	let events = await _fetchAllForkDAODeployerSet();

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

async function _fetchAllForkDAODeployerSet() {
	let path = join(__dirname, "..", "data", "indexer", "ForkDAODeployerSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ForkDAODeployerSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ForkPeriodSet
// ==================================

export async function fetchForkPeriodSet(query?: Indexer.NounsDAO.ForkPeriodSetQuery) {
	let events = await _fetchAllForkPeriodSet();

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

async function _fetchAllForkPeriodSet() {
	let path = join(__dirname, "..", "data", "indexer", "ForkPeriodSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ForkPeriodSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ForkThresholdSet
// ==================================

export async function fetchForkThresholdSet(query?: Indexer.NounsDAO.ForkThresholdSetQuery) {
	let events = await _fetchAllForkThresholdSet();

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

async function _fetchAllForkThresholdSet() {
	let path = join(__dirname, "..", "data", "indexer", "ForkThresholdSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ForkThresholdSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// JoinFork
// ==================================

export async function fetchJoinFork(query?: Indexer.NounsDAO.JoinForkQuery) {
	let events = await _fetchAllJoinFork();

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

async function _fetchAllJoinFork() {
	let path = join(__dirname, "..", "data", "indexer", "JoinFork.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.JoinFork[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// LastMinuteWindowSet
// ==================================

export async function fetchLastMinuteWindowSet(query?: Indexer.NounsDAO.LastMinuteWindowSetQuery) {
	let events = await _fetchAllLastMinuteWindowSet();

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

async function _fetchAllLastMinuteWindowSet() {
	let path = join(__dirname, "..", "data", "indexer", "LastMinuteWindowSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.LastMinuteWindowSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// MaxQuorumVotesBPSSet
// ==================================

export async function fetchMaxQuorumVotesBPSSet(query?: Indexer.NounsDAO.MaxQuorumVotesBPSSetQuery) {
	let events = await _fetchAllMaxQuorumVotesBPSSet();

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

async function _fetchAllMaxQuorumVotesBPSSet() {
	let path = join(__dirname, "..", "data", "indexer", "MaxQuorumVotesBPSSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.MaxQuorumVotesBPSSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// MinQuorumVotesBPSSet
// ==================================

export async function fetchMinQuorumVotesBPSSet(query?: Indexer.NounsDAO.MinQuorumVotesBPSSetQuery) {
	let events = await _fetchAllMinQuorumVotesBPSSet();

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

async function _fetchAllMinQuorumVotesBPSSet() {
	let path = join(__dirname, "..", "data", "indexer", "MinQuorumVotesBPSSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.MinQuorumVotesBPSSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewAdmin
// ==================================

export async function fetchNewAdmin(query?: Indexer.NounsDAO.NewAdminQuery) {
	let events = await _fetchAllNewAdmin();

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

async function _fetchAllNewAdmin() {
	let path = join(__dirname, "..", "data", "indexer", "NewAdmin.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewAdmin[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewImplementation
// ==================================

export async function fetchNewImplementation(query?: Indexer.NounsDAO.NewImplementationQuery) {
	let events = await _fetchAllNewImplementation();

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

async function _fetchAllNewImplementation() {
	let path = join(__dirname, "..", "data", "indexer", "NewImplementation.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewImplementation[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewPendingAdmin
// ==================================

export async function fetchNewPendingAdmin(query?: Indexer.NounsDAO.NewPendingAdminQuery) {
	let events = await _fetchAllNewPendingAdmin();

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

async function _fetchAllNewPendingAdmin() {
	let path = join(__dirname, "..", "data", "indexer", "NewPendingAdmin.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewPendingAdmin[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewPendingVetoer
// ==================================

export async function fetchNewPendingVetoer(query?: Indexer.NounsDAO.NewPendingVetoerQuery) {
	let events = await _fetchAllNewPendingVetoer();

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

async function _fetchAllNewPendingVetoer() {
	let path = join(__dirname, "..", "data", "indexer", "NewPendingVetoer.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewPendingVetoer[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NewVetoer
// ==================================

export async function fetchNewVetoer(query?: Indexer.NounsDAO.NewVetoerQuery) {
	let events = await _fetchAllNewVetoer();

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

async function _fetchAllNewVetoer() {
	let path = join(__dirname, "..", "data", "indexer", "NewVetoer.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.NewVetoer[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ObjectionPeriodDurationSet
// ==================================

export async function fetchObjectionPeriodDurationSet(query?: Indexer.NounsDAO.ObjectionPeriodDurationSetQuery) {
	let events = await _fetchAllObjectionPeriodDurationSet();

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

async function _fetchAllObjectionPeriodDurationSet() {
	let path = join(__dirname, "..", "data", "indexer", "ObjectionPeriodDurationSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ObjectionPeriodDurationSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalCanceled
// ==================================

export async function fetchProposalCanceled(query?: Indexer.NounsDAO.ProposalCanceledQuery) {
	let events = await _fetchAllProposalCanceled();

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

async function _fetchAllProposalCanceled() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalCanceled.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalCanceled[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalCreated
// ==================================

export async function fetchProposals(query?: Indexer.NounsDAO.ProposalQuery) {
	let events = await _fetchAllProposals();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.ProposalCreated[];
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
		events = events.filter((event) => {
			return event.proposer === query.proposer;
		});
	}

	if (query.status) {
		events = await _filterProposalsByStatus(events, query.status);
	}

	return events;
}

async function _fetchAllProposals() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalCreated.json");
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
	let statuses = await _fetchAllStatusChange();
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

async function _fetchAllStatusChange() {
	let proposals = await _fetchAllProposalCanceled();
	proposals = proposals.concat(await _fetchAllProposalExecuted());
	proposals = proposals.concat(await _fetchAllProposalQueued());
	proposals = proposals.concat(await _fetchAllProposalVetoed());
	proposals.sort((a, b) => {
		return a.blockNumber - b.blockNumber;
	});
	return proposals; // Proposals should probably be indexed together anyway.
}

// ==================================
// ProposalCreatedOnTimelockV1
// ==================================

export async function fetchProposalCreatedOnTimelockV1(query?: Indexer.NounsDAO.ProposalCreatedOnTimelockV1Query) {
	let events = await _fetchAllProposalCreatedOnTimelockV1();

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

async function _fetchAllProposalCreatedOnTimelockV1() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalCreatedOnTimelockV1.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalCreatedOnTimelockV1[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalCreatedWithRequirements
// ==================================

export async function fetchProposalCreatedWithRequirements(query?: Indexer.NounsDAO.ProposalCreatedWithRequirementsQuery) {
	let events = await _fetchAllProposalCreatedWithRequirements();

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

async function _fetchAllProposalCreatedWithRequirements() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalCreatedWithRequirements.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalCreatedWithRequirements[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalDescriptionUpdated
// ==================================

export async function fetchProposalDescriptionUpdated(query?: Indexer.NounsDAO.ProposalDescriptionUpdatedQuery) {
	let events = await _fetchAllProposalDescriptionUpdated();

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

async function _fetchAllProposalDescriptionUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalDescriptionUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalDescriptionUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalExecuted
// ==================================

export async function fetchProposalExecuted(query?: Indexer.NounsDAO.ProposalExecutedQuery) {
	let events = await _fetchAllProposalExecuted();

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

async function _fetchAllProposalExecuted() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalExecuted.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalExecuted[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalObjectionPeriodSet
// ==================================

export async function fetchProposalObjectionPeriodSet(query?: Indexer.NounsDAO.ProposalObjectionPeriodSetQuery) {
	let events = await _fetchAllProposalObjectionPeriodSet();

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

async function _fetchAllProposalObjectionPeriodSet() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalObjectionPeriodSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalObjectionPeriodSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalQueued
// ==================================

export async function fetchProposalQueued(query?: Indexer.NounsDAO.ProposalQueuedQuery) {
	let events = await _fetchAllProposalQueued();

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

async function _fetchAllProposalQueued() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalQueued.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalQueued[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalThresholdBPSSet
// ==================================

export async function fetchProposalThresholdBPSSet(query?: Indexer.NounsDAO.ProposalThresholdBPSSetQuery) {
	let events = await _fetchAllProposalThresholdBPSSet();

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

async function _fetchAllProposalThresholdBPSSet() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalThresholdBPSSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalThresholdBPSSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalTransactionsUpdated
// ==================================

export async function fetchProposalTransactionsUpdated(query?: Indexer.NounsDAO.ProposalTransactionsUpdatedQuery) {
	let events = await _fetchAllProposalTransactionsUpdated();

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

async function _fetchAllProposalTransactionsUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalTransactionsUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalTransactionsUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalUpdatablePeriodSet
// ==================================

export async function fetchProposalUpdatablePeriodSet(query?: Indexer.NounsDAO.ProposalUpdatablePeriodSetQuery) {
	let events = await _fetchAllProposalUpdatablePeriodSet();

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

async function _fetchAllProposalUpdatablePeriodSet() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalUpdatablePeriodSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalUpdatablePeriodSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalUpdated
// ==================================

export async function fetchProposalUpdated(query?: Indexer.NounsDAO.ProposalUpdatedQuery) {
	let events = await _fetchAllProposalUpdated();

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

async function _fetchAllProposalUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalVetoed
// ==================================

export async function fetchProposalVetoed(query?: Indexer.NounsDAO.ProposalVetoedQuery) {
	let events = await _fetchAllProposalVetoed();

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

async function _fetchAllProposalVetoed() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalVetoed.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalVetoed[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// QuorumCoefficientSet
// ==================================

export async function fetchQuorumCoefficientSet(query?: Indexer.NounsDAO.QuorumCoefficientSetQuery) {
	let events = await _fetchAllQuorumCoefficientSet();

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

async function _fetchAllQuorumCoefficientSet() {
	let path = join(__dirname, "..", "data", "indexer", "QuorumCoefficientSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.QuorumCoefficientSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// QuorumVotesBPSSet
// ==================================

export async function fetchQuorumVotesBPSSet(query?: Indexer.NounsDAO.QuorumVotesBPSSetQuery) {
	let events = await _fetchAllQuorumVotesBPSSet();

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

async function _fetchAllQuorumVotesBPSSet() {
	let path = join(__dirname, "..", "data", "indexer", "QuorumVotesBPSSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.QuorumVotesBPSSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// RefundableVote
// ==================================

export async function fetchRefundableVote(query?: Indexer.NounsDAO.RefundableVoteQuery) {
	let events = await _fetchAllRefundableVote();

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

async function _fetchAllRefundableVote() {
	let path = join(__dirname, "..", "data", "indexer", "RefundableVote.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.RefundableVote[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// SignatureCancelled
// ==================================

export async function fetchSignatureCancelled(query?: Indexer.NounsDAO.SignatureCancelledQuery) {
	let events = await _fetchAllSignatureCancelled();

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

async function _fetchAllSignatureCancelled() {
	let path = join(__dirname, "..", "data", "indexer", "SignatureCancelled.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.SignatureCancelled[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// TimelocksAndAdminSet
// ==================================

export async function fetchTimelocksAndAdminSet(query?: Indexer.NounsDAO.TimelocksAndAdminSetQuery) {
	let events = await _fetchAllTimelocksAndAdminSet();

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

async function _fetchAllTimelocksAndAdminSet() {
	let path = join(__dirname, "..", "data", "indexer", "TimelocksAndAdminSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.TimelocksAndAdminSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalStatusChange
// ==================================

export async function fetchStatusChangeEvents(query?: Indexer.NounsDAO.StatusChangeQuery) {
	let events: Indexer.NounsDAO.ProposalCanceled[] = [];

	if (!query) {
		return _fetchAllStatusChange();
	}

	if (query.status === "Cancelled") {
		events = await _fetchAllProposalCanceled();
	} else if (query.status === "Vetoed") {
		events = await _fetchAllProposalVetoed();
	} else if (query.status === "Queued") {
		events = await _fetchAllProposalQueued();
	} else if (query.status === "Executed") {
		events = await _fetchAllProposalExecuted();
	} else {
		events = await _fetchAllStatusChange();
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

export async function fetchVoteCastEvents(query?: Indexer.NounsDAO.VoteCastQuery) {
	let events = await _fetchAllVoteCast();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.VoteCast[];
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalId === query.proposalId;
		});
	}

	if (query.voter) {
		events = events.filter((event) => {
			return event.voterAddress === query.voter;
		});
	}

	if (query.support) {
		events = events.filter((event) => {
			return event.supportChoice === query.support;
		});
	}

	return events;
}

async function _fetchAllVoteCast() {
	let path = join(__dirname, "..", "data", "indexer", "VoteCast.json");
	let file = await readFile(path, { encoding: "utf8" });
	let votes: Indexer.NounsDAO.VoteCast[] = JSON.parse(file);
	return votes;
}

// ==================================
// VoteSnapshotBlockSwitchProposalIdSet
// ==================================

export async function fetchVoteSnapshotBlockSwitchProposalIdSet(
	query?: Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSetQuery
) {
	let events = await _fetchAllVoteSnapshotBlockSwitchProposalIdSet();

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

async function _fetchAllVoteSnapshotBlockSwitchProposalIdSet() {
	let path = join(__dirname, "..", "data", "indexer", "VoteSnapshotBlockSwitchProposalIdSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// VotingDelaySet
// ==================================

export async function fetchVotingDelaySet(query?: Indexer.NounsDAO.VotingDelaySetQuery) {
	let events = await _fetchAllVotingDelaySet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.VotingDelaySet[];
	}

	return events;
}

async function _fetchAllVotingDelaySet() {
	let path = join(__dirname, "..", "data", "indexer", "VotingDelaySet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.VotingDelaySet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// VotingPeriodSet
// ==================================

export async function fetchVotingPeriodSet(query?: Indexer.NounsDAO.VotingPeriodSetQuery) {
	let events = await _fetchAllVotingPeriodSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.VotingPeriodSet[];
	}

	return events;
}

async function _fetchAllVotingPeriodSet() {
	let path = join(__dirname, "..", "data", "indexer", "VotingPeriodSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.VotingPeriodSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// Withdraw
// ==================================

export async function fetchWithdraw(query?: Indexer.NounsDAO.WithdrawQuery) {
	let events = await _fetchAllWithdraw();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.Withdraw[];
	}

	return events;
}

async function _fetchAllWithdraw() {
	let path = join(__dirname, "..", "data", "indexer", "Withdraw.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.Withdraw[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// WithdrawFromForkEscrow
// ==================================

export async function fetchWithdrawFromForkEscrow(query?: Indexer.NounsDAO.WithdrawFromForkEscrowQuery) {
	let events = await _fetchAllWithdrawFromForkEscrow();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAO.WithdrawFromForkEscrow[];
	}

	if (query.forkId !== undefined) {
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

	return events;
}

async function _fetchAllWithdrawFromForkEscrow() {
	let path = join(__dirname, "..", "data", "indexer", "WithdrawFromForkEscrow.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.WithdrawFromForkEscrow[] = JSON.parse(proposalFile);
	return proposals;
}
