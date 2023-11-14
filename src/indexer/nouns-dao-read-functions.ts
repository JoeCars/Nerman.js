import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock, _fetchAllEvents } from "../utilities/indexer";

// ==================================
// DAOWithdrawNounsFromEscrow
// ==================================

/**
 * Fetches all DAOWithdrawNounsFromEscrow events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDAOWithdrawNounsFromEscrow(
	directoryPath: string,
	query?: Indexer.NounsDAO.DAOWithdrawNounsFromEscrowQuery
) {
	let events = (await _fetchAllEvents(
		"DAOWithdrawNounsFromEscrow",
		directoryPath
	)) as Indexer.NounsDAO.DAOWithdrawNounsFromEscrow[];

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

// ==================================
// ERC20TokensToIncludeInForkSet
// ==================================

/**
 * Fetches all ERC20TokensToIncludeInForkSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchERC20TokensToIncludeInForkSet(
	directoryPath: string,
	query?: Indexer.NounsDAO.ERC20TokensToIncludeInForkSetQuery
) {
	let events = (await _fetchAllEvents(
		"ERC20TokensToIncludeInForkSet",
		directoryPath
	)) as Indexer.NounsDAO.ERC20TokensToIncludeInForkSet[];

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

// ==================================
// EscrowedToFork
// ==================================

/**
 * Fetches all EscrowedToFork events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchEscrowedToFork(directoryPath: string, query?: Indexer.NounsDAO.EscrowedToForkQuery) {
	let events = (await _fetchAllEvents("EscrowedToFork", directoryPath)) as Indexer.NounsDAO.EscrowedToFork[];

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

// ==================================
// ExecuteFork
// ==================================

/**
 * Fetches all ExecuteFork events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchExecutedFork(directoryPath: string, query?: Indexer.NounsDAO.ExecuteForkQuery) {
	let events = (await _fetchAllEvents("ExecuteFork", directoryPath)) as Indexer.NounsDAO.ExecuteFork[];

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

/**
 * Fetches all ForkDAODeployerSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchForkDAODeployerSet(directoryPath: string, query?: Indexer.NounsDAO.ForkDAODeployerSetQuery) {
	let events = (await _fetchAllEvents("ForkDAODeployerSet", directoryPath)) as Indexer.NounsDAO.ForkDAODeployerSet[];

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

// ==================================
// ForkPeriodSet
// ==================================

/**
 * Fetches all ForkPeriodSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchForkPeriodSet(directoryPath: string, query?: Indexer.NounsDAO.ForkPeriodSetQuery) {
	let events = (await _fetchAllEvents("ForkPeriodSet", directoryPath)) as Indexer.NounsDAO.ForkPeriodSet[];

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

// ==================================
// ForkThresholdSet
// ==================================

/**
 * Fetches all ForkThresholdSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchForkThresholdSet(directoryPath: string, query?: Indexer.NounsDAO.ForkThresholdSetQuery) {
	let events = (await _fetchAllEvents("ForkThresholdSet", directoryPath)) as Indexer.NounsDAO.ForkThresholdSet[];

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

// ==================================
// JoinFork
// ==================================

/**
 * Fetches all JoinFork events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchJoinFork(directoryPath: string, query?: Indexer.NounsDAO.JoinForkQuery) {
	let events = (await _fetchAllEvents("JoinFork", directoryPath)) as Indexer.NounsDAO.JoinFork[];

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

// ==================================
// LastMinuteWindowSet
// ==================================

/**
 * Fetches all LastMinuteWindowSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchLastMinuteWindowSet(directoryPath: string, query?: Indexer.NounsDAO.LastMinuteWindowSetQuery) {
	let events = (await _fetchAllEvents("LastMinuteWindowSet", directoryPath)) as Indexer.NounsDAO.LastMinuteWindowSet[];

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

// ==================================
// MaxQuorumVotesBPSSet
// ==================================

/**
 * Fetches all MaxQuorumVotesBPSSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchMaxQuorumVotesBPSSet(directoryPath: string, query?: Indexer.NounsDAO.MaxQuorumVotesBPSSetQuery) {
	let events = (await _fetchAllEvents("MaxQuorumVotesBPSSet", directoryPath)) as Indexer.NounsDAO.MaxQuorumVotesBPSSet[];

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

// ==================================
// MinQuorumVotesBPSSet
// ==================================

/**
 * Fetches all MinQuorumVotesBPSSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchMinQuorumVotesBPSSet(directoryPath: string, query?: Indexer.NounsDAO.MinQuorumVotesBPSSetQuery) {
	let events = (await _fetchAllEvents("MinQuorumVotesBPSSet", directoryPath)) as Indexer.NounsDAO.MinQuorumVotesBPSSet[];

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

// ==================================
// NewAdmin
// ==================================

/**
 * Fetches all NewAdmin events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewAdmin(directoryPath: string, query?: Indexer.NounsDAO.NewAdminQuery) {
	let events = (await _fetchAllEvents("NewAdmin", directoryPath)) as Indexer.NounsDAO.NewAdmin[];

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

// ==================================
// NewImplementation
// ==================================

/**
 * Fetches all NewImplementation events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewImplementation(directoryPath: string, query?: Indexer.NounsDAO.NewImplementationQuery) {
	let events = (await _fetchAllEvents("NewImplementation", directoryPath)) as Indexer.NounsDAO.NewImplementation[];

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

// ==================================
// NewPendingAdmin
// ==================================

/**
 * Fetches all NewPendingAdmin events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewPendingAdmin(directoryPath: string, query?: Indexer.NounsDAO.NewPendingAdminQuery) {
	let events = (await _fetchAllEvents("NewPendingAdmin", directoryPath)) as Indexer.NounsDAO.NewPendingAdmin[];

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

// ==================================
// NewPendingVetoer
// ==================================

/**
 * Fetches all NewPendingVetoer events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewPendingVetoer(directoryPath: string, query?: Indexer.NounsDAO.NewPendingVetoerQuery) {
	let events = (await _fetchAllEvents("NewPendingVetoer", directoryPath)) as Indexer.NounsDAO.NewPendingVetoer[];

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

// ==================================
// NewVetoer
// ==================================

/**
 * Fetches all NewVetoer events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewVetoer(directoryPath: string, query?: Indexer.NounsDAO.NewVetoerQuery) {
	let events = (await _fetchAllEvents("NewVetoer", directoryPath)) as Indexer.NounsDAO.NewVetoer[];

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

// ==================================
// ObjectionPeriodDurationSet
// ==================================

/**
 * Fetches all ObjectionPeriodDurationSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchObjectionPeriodDurationSet(
	directoryPath: string,
	query?: Indexer.NounsDAO.ObjectionPeriodDurationSetQuery
) {
	let events = (await _fetchAllEvents(
		"ObjectionPeriodDurationSet",
		directoryPath
	)) as Indexer.NounsDAO.ObjectionPeriodDurationSet[];

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

// ==================================
// ProposalCanceled
// ==================================

/**
 * Fetches all ProposalCanceled events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCanceled(directoryPath: string, query?: Indexer.NounsDAO.ProposalCanceledQuery) {
	let events = (await _fetchAllEvents("ProposalCanceled", directoryPath)) as Indexer.NounsDAO.ProposalCanceled[];

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

// ==================================
// ProposalCreated
// ==================================

/**
 * Fetches all ProposalCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposals(directoryPath: string, query?: Indexer.NounsDAO.ProposalQuery) {
	let events = (await _fetchAllEvents("ProposalCreated", directoryPath)) as Indexer.NounsDAO.ProposalCreated[];

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
		events = await _filterProposalsByStatus(events, query.status, directoryPath);
	}

	return events;
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

async function _filterProposalsByStatus(proposals: Indexer.NounsDAO.ProposalCreated[], status: string, directoryPath: string) {
	let statuses = await _fetchAllStatusChange(directoryPath);
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

/**
 * @param directoryPath Path to the indexer directory.
 */
async function _fetchAllStatusChange(directoryPath: string) {
	let proposals = (await _fetchAllEvents("ProposalCanceled", directoryPath)) as Indexer.NounsDAO.ProposalCanceled[];
	proposals = proposals.concat(
		(await _fetchAllEvents("ProposalExecuted", directoryPath)) as Indexer.NounsDAO.ProposalExecuted[]
	);
	proposals = proposals.concat((await _fetchAllEvents("ProposalQueued", directoryPath)) as Indexer.NounsDAO.ProposalQueued[]);
	proposals = proposals.concat((await _fetchAllEvents("ProposalVetoed", directoryPath)) as Indexer.NounsDAO.ProposalVetoed[]);
	proposals.sort((a, b) => {
		return a.blockNumber - b.blockNumber;
	});
	return proposals; // Proposals should probably be indexed together anyway.
}

// ==================================
// ProposalCreatedOnTimelockV1
// ==================================

/**
 * Fetches all ProposalCreatedOnTimelockV1 events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCreatedOnTimelockV1(
	directoryPath: string,
	query?: Indexer.NounsDAO.ProposalCreatedOnTimelockV1Query
) {
	let events = (await _fetchAllEvents(
		"ProposalCreatedOnTimelockV1",
		directoryPath
	)) as Indexer.NounsDAO.ProposalCreatedOnTimelockV1[];

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

// ==================================
// ProposalCreatedWithRequirements
// ==================================

/**
 * Fetches all ProposalCreatedWithRequirements events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCreatedWithRequirements(
	directoryPath: string,
	query?: Indexer.NounsDAO.ProposalCreatedWithRequirementsQuery
) {
	let events = (await _fetchAllEvents(
		"ProposalCreatedWithRequirements(uint256,address,address[],address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,uint256,string)",
		directoryPath
	)) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	events = events.concat(
		(await _fetchAllEvents(
			"ProposalCreatedWithRequirements(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,string)",
			directoryPath
		)) as Indexer.NounsDAO.ProposalCreatedWithRequirements[]
	);

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
		events = (await _filterProposalsByStatus(
			events,
			query.status,
			directoryPath
		)) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	}

	return events;
}

// ==================================
// ProposalDescriptionUpdated
// ==================================

/**
 * Fetches all ProposalDescriptionUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalDescriptionUpdated(
	directoryPath: string,
	query?: Indexer.NounsDAO.ProposalDescriptionUpdatedQuery
) {
	let events = (await _fetchAllEvents(
		"ProposalDescriptionUpdated",
		directoryPath
	)) as Indexer.NounsDAO.ProposalDescriptionUpdated[];

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

// ==================================
// ProposalExecuted
// ==================================

/**
 * Fetches all ProposalExecuted events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalExecuted(directoryPath: string, query?: Indexer.NounsDAO.ProposalExecutedQuery) {
	let events = (await _fetchAllEvents("ProposalExecuted", directoryPath)) as Indexer.NounsDAO.ProposalExecuted[];

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

// ==================================
// ProposalObjectionPeriodSet
// ==================================

/**
 * Fetches all ProposalObjectionPeriodSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalObjectionPeriodSet(
	directoryPath: string,
	query?: Indexer.NounsDAO.ProposalObjectionPeriodSetQuery
) {
	let events = (await _fetchAllEvents(
		"ProposalObjectionPeriodSet",
		directoryPath
	)) as Indexer.NounsDAO.ProposalObjectionPeriodSet[];

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

// ==================================
// ProposalQueued
// ==================================

/**
 * Fetches all ProposalQueued events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalQueued(directoryPath: string, query?: Indexer.NounsDAO.ProposalQueuedQuery) {
	let events = (await _fetchAllEvents("ProposalQueued", directoryPath)) as Indexer.NounsDAO.ProposalQueued[];

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

// ==================================
// ProposalThresholdBPSSet
// ==================================

/**
 * Fetches all ProposalThresholdBPSSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalThresholdBPSSet(
	directoryPath: string,
	query?: Indexer.NounsDAO.ProposalThresholdBPSSetQuery
) {
	let events = (await _fetchAllEvents(
		"ProposalThresholdBPSSet",
		directoryPath
	)) as Indexer.NounsDAO.ProposalThresholdBPSSet[];

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

// ==================================
// ProposalTransactionsUpdated
// ==================================

/**
 * Fetches all ProposalTransactionsUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalTransactionsUpdated(
	directoryPath: string,
	query?: Indexer.NounsDAO.ProposalTransactionsUpdatedQuery
) {
	let events = (await _fetchAllEvents(
		"ProposalTransactionsUpdated",
		directoryPath
	)) as Indexer.NounsDAO.ProposalTransactionsUpdated[];

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

// ==================================
// ProposalUpdatablePeriodSet
// ==================================

/**
 * Fetches all ProposalUpdatablePeriodSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalUpdatablePeriodSet(
	directoryPath: string,
	query?: Indexer.NounsDAO.ProposalUpdatablePeriodSetQuery
) {
	let events = (await _fetchAllEvents(
		"ProposalUpdatablePeriodSet",
		directoryPath
	)) as Indexer.NounsDAO.ProposalUpdatablePeriodSet[];

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

// ==================================
// ProposalUpdated
// ==================================

/**
 * Fetches all ProposalUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalUpdated(directoryPath: string, query?: Indexer.NounsDAO.ProposalUpdatedQuery) {
	let events = (await _fetchAllEvents("ProposalUpdated", directoryPath)) as Indexer.NounsDAO.ProposalUpdated[];

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

// ==================================
// ProposalVetoed
// ==================================

/**
 * Fetches all ProposalVetoed events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalVetoed(directoryPath: string, query?: Indexer.NounsDAO.ProposalVetoedQuery) {
	let events = (await _fetchAllEvents("ProposalVetoed", directoryPath)) as Indexer.NounsDAO.ProposalVetoed[];

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

// ==================================
// QuorumCoefficientSet
// ==================================

/**
 * Fetches all QuorumCoefficientSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchQuorumCoefficientSet(directoryPath: string, query?: Indexer.NounsDAO.QuorumCoefficientSetQuery) {
	let events = (await _fetchAllEvents("QuorumCoefficientSet", directoryPath)) as Indexer.NounsDAO.QuorumCoefficientSet[];

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

// ==================================
// QuorumVotesBPSSet
// ==================================

/**
 * Fetches all QuorumVotesBPSSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchQuorumVotesBPSSet(directoryPath: string, query?: Indexer.NounsDAO.QuorumVotesBPSSetQuery) {
	let events = (await _fetchAllEvents("QuorumVotesBPSSet", directoryPath)) as Indexer.NounsDAO.QuorumVotesBPSSet[];

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

// ==================================
// RefundableVote
// ==================================

/**
 * Fetches all RefundableVote events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchRefundableVote(directoryPath: string, query?: Indexer.NounsDAO.RefundableVoteQuery) {
	let events = (await _fetchAllEvents("RefundableVote", directoryPath)) as Indexer.NounsDAO.RefundableVote[];

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

// ==================================
// SignatureCancelled
// ==================================

/**
 * Fetches all SignatureCancelled events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchSignatureCancelled(directoryPath: string, query?: Indexer.NounsDAO.SignatureCancelledQuery) {
	let events = (await _fetchAllEvents("SignatureCancelled", directoryPath)) as Indexer.NounsDAO.SignatureCancelled[];

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

// ==================================
// TimelocksAndAdminSet
// ==================================

/**
 * Fetches all TimelocksAndAdminSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchTimelocksAndAdminSet(directoryPath: string, query?: Indexer.NounsDAO.TimelocksAndAdminSetQuery) {
	let events = (await _fetchAllEvents("TimelocksAndAdminSet", directoryPath)) as Indexer.NounsDAO.TimelocksAndAdminSet[];

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

// ==================================
// ProposalStatusChange
// ==================================

/**
 * Fetches all ProposalStatusChange events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchStatusChangeEvents(directoryPath: string, query?: Indexer.NounsDAO.StatusChangeQuery) {
	let events: Indexer.NounsDAO.ProposalCanceled[] = [];

	if (!query) {
		return _fetchAllStatusChange(directoryPath);
	}

	if (query.status === "Cancelled") {
		events = (await _fetchAllEvents("ProposalCanceled", directoryPath)) as Indexer.NounsDAO.ProposalCanceled[];
	} else if (query.status === "Vetoed") {
		events = (await _fetchAllEvents("ProposalVetoed", directoryPath)) as Indexer.NounsDAO.ProposalVetoed[];
	} else if (query.status === "Queued") {
		events = (await _fetchAllEvents("ProposalQueued", directoryPath)) as Indexer.NounsDAO.ProposalQueued[];
	} else if (query.status === "Executed") {
		events = (await _fetchAllEvents("ProposalExecuted", directoryPath)) as Indexer.NounsDAO.ProposalExecuted[];
	} else {
		events = await _fetchAllStatusChange(directoryPath);
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

/**
 * Fetches all VoteCast events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchVoteCastEvents(directoryPath: string, query?: Indexer.NounsDAO.VoteCastQuery) {
	let events = (await _fetchAllEvents("VoteCast", directoryPath)) as Indexer.NounsDAO.VoteCast[];

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

// ==================================
// VoteSnapshotBlockSwitchProposalIdSet
// ==================================

/**
 * Fetches all VoteSnapshotBlockSwitchProposalIdSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchVoteSnapshotBlockSwitchProposalIdSet(
	directoryPath: string,
	query?: Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSetQuery
) {
	let events = (await _fetchAllEvents(
		"VoteSnapshotBlockSwitchProposalIdSet",
		directoryPath
	)) as Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSet[];

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

// ==================================
// VotingDelaySet
// ==================================

/**
 * Fetches all VotingDelaySet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchVotingDelaySet(directoryPath: string, query?: Indexer.NounsDAO.VotingDelaySetQuery) {
	let events = (await _fetchAllEvents("VotingDelaySet", directoryPath)) as Indexer.NounsDAO.VotingDelaySet[];

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

// ==================================
// VotingPeriodSet
// ==================================

/**
 * Fetches all VotingPeriodSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchVotingPeriodSet(directoryPath: string, query?: Indexer.NounsDAO.VotingPeriodSetQuery) {
	let events = (await _fetchAllEvents("VotingPeriodSet", directoryPath)) as Indexer.NounsDAO.VotingPeriodSet[];

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

// ==================================
// Withdraw
// ==================================

/**
 * Fetches all Withdraw events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchWithdraw(directoryPath: string, query?: Indexer.NounsDAO.WithdrawQuery) {
	let events = (await _fetchAllEvents("Withdraw", directoryPath)) as Indexer.NounsDAO.Withdraw[];

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

// ==================================
// WithdrawFromForkEscrow
// ==================================

/**
 * Fetches all WithdrawFromForkEscrow events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchWithdrawFromForkEscrow(directoryPath: string, query?: Indexer.NounsDAO.WithdrawFromForkEscrowQuery) {
	let events = (await _fetchAllEvents("WithdrawFromForkEscrow", directoryPath)) as Indexer.NounsDAO.WithdrawFromForkEscrow[];

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
