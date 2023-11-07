import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock, _fetchAllEvents } from "../utilities/indexer";

// ==================================
// DAOWithdrawNounsFromEscrow
// ==================================

/**
 * Fetches all DAOWithdrawNounsFromEscrow events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDAOWithdrawNounsFromEscrow(query?: Indexer.NounsDAO.DAOWithdrawNounsFromEscrowQuery) {
	let events = (await _fetchAllEvents("DAOWithdrawNounsFromEscrow")) as Indexer.NounsDAO.DAOWithdrawNounsFromEscrow[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchERC20TokensToIncludeInForkSet(query?: Indexer.NounsDAO.ERC20TokensToIncludeInForkSetQuery) {
	let events = (await _fetchAllEvents("ERC20TokensToIncludeInForkSet")) as Indexer.NounsDAO.ERC20TokensToIncludeInForkSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchEscrowedToFork(query?: Indexer.NounsDAO.EscrowedToForkQuery) {
	let events = (await _fetchAllEvents("EscrowedToFork")) as Indexer.NounsDAO.EscrowedToFork[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchExecutedFork(query?: Indexer.NounsDAO.ExecuteForkQuery) {
	let events = (await _fetchAllEvents("ExecuteFork")) as Indexer.NounsDAO.ExecuteFork[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchForkDAODeployerSet(query?: Indexer.NounsDAO.ForkDAODeployerSetQuery) {
	let events = (await _fetchAllEvents("ForkDAODeployerSet")) as Indexer.NounsDAO.ForkDAODeployerSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchForkPeriodSet(query?: Indexer.NounsDAO.ForkPeriodSetQuery) {
	let events = (await _fetchAllEvents("ForkPeriodSet")) as Indexer.NounsDAO.ForkPeriodSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchForkThresholdSet(query?: Indexer.NounsDAO.ForkThresholdSetQuery) {
	let events = (await _fetchAllEvents("ForkThresholdSet")) as Indexer.NounsDAO.ForkThresholdSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchJoinFork(query?: Indexer.NounsDAO.JoinForkQuery) {
	let events = (await _fetchAllEvents("JoinFork")) as Indexer.NounsDAO.JoinFork[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchLastMinuteWindowSet(query?: Indexer.NounsDAO.LastMinuteWindowSetQuery) {
	let events = (await _fetchAllEvents("LastMinuteWindowSet")) as Indexer.NounsDAO.LastMinuteWindowSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchMaxQuorumVotesBPSSet(query?: Indexer.NounsDAO.MaxQuorumVotesBPSSetQuery) {
	let events = (await _fetchAllEvents("MaxQuorumVotesBPSSet")) as Indexer.NounsDAO.MaxQuorumVotesBPSSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchMinQuorumVotesBPSSet(query?: Indexer.NounsDAO.MinQuorumVotesBPSSetQuery) {
	let events = (await _fetchAllEvents("MinQuorumVotesBPSSet")) as Indexer.NounsDAO.MinQuorumVotesBPSSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewAdmin(query?: Indexer.NounsDAO.NewAdminQuery) {
	let events = (await _fetchAllEvents("NewAdmin")) as Indexer.NounsDAO.NewAdmin[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewImplementation(query?: Indexer.NounsDAO.NewImplementationQuery) {
	let events = (await _fetchAllEvents("NewImplementation")) as Indexer.NounsDAO.NewImplementation[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewPendingAdmin(query?: Indexer.NounsDAO.NewPendingAdminQuery) {
	let events = (await _fetchAllEvents("NewPendingAdmin")) as Indexer.NounsDAO.NewPendingAdmin[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewPendingVetoer(query?: Indexer.NounsDAO.NewPendingVetoerQuery) {
	let events = (await _fetchAllEvents("NewPendingVetoer")) as Indexer.NounsDAO.NewPendingVetoer[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNewVetoer(query?: Indexer.NounsDAO.NewVetoerQuery) {
	let events = (await _fetchAllEvents("NewVetoer")) as Indexer.NounsDAO.NewVetoer[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchObjectionPeriodDurationSet(query?: Indexer.NounsDAO.ObjectionPeriodDurationSetQuery) {
	let events = (await _fetchAllEvents("ObjectionPeriodDurationSet")) as Indexer.NounsDAO.ObjectionPeriodDurationSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCanceled(query?: Indexer.NounsDAO.ProposalCanceledQuery) {
	let events = (await _fetchAllEvents("ProposalCanceled")) as Indexer.NounsDAO.ProposalCanceled[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposals(query?: Indexer.NounsDAO.ProposalQuery) {
	let events = (await _fetchAllEvents("ProposalCreated")) as Indexer.NounsDAO.ProposalCreated[];

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
	let proposals = (await _fetchAllEvents("ProposalCanceled")) as Indexer.NounsDAO.ProposalCanceled[];
	proposals = proposals.concat((await _fetchAllEvents("ProposalExecuted")) as Indexer.NounsDAO.ProposalExecuted[]);
	proposals = proposals.concat((await _fetchAllEvents("ProposalQueued")) as Indexer.NounsDAO.ProposalQueued[]);
	proposals = proposals.concat((await _fetchAllEvents("ProposalVetoed")) as Indexer.NounsDAO.ProposalVetoed[]);
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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCreatedOnTimelockV1(query?: Indexer.NounsDAO.ProposalCreatedOnTimelockV1Query) {
	let events = (await _fetchAllEvents("ProposalCreatedOnTimelockV1")) as Indexer.NounsDAO.ProposalCreatedOnTimelockV1[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCreatedWithRequirements(query?: Indexer.NounsDAO.ProposalCreatedWithRequirementsQuery) {
	let events = (await _fetchAllEvents(
		"ProposalCreatedWithRequirements(uint256,address,address[],address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,uint256,string)"
	)) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	events = events.concat(
		(await _fetchAllEvents(
			"ProposalCreatedWithRequirements(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,string)"
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
		events = (await _filterProposalsByStatus(events, query.status)) as Indexer.NounsDAO.ProposalCreatedWithRequirements[];
	}

	return events;
}

// ==================================
// ProposalDescriptionUpdated
// ==================================

/**
 * Fetches all ProposalDescriptionUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalDescriptionUpdated(query?: Indexer.NounsDAO.ProposalDescriptionUpdatedQuery) {
	let events = (await _fetchAllEvents("ProposalDescriptionUpdated")) as Indexer.NounsDAO.ProposalDescriptionUpdated[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalExecuted(query?: Indexer.NounsDAO.ProposalExecutedQuery) {
	let events = (await _fetchAllEvents("ProposalExecuted")) as Indexer.NounsDAO.ProposalExecuted[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalObjectionPeriodSet(query?: Indexer.NounsDAO.ProposalObjectionPeriodSetQuery) {
	let events = (await _fetchAllEvents("ProposalObjectionPeriodSet")) as Indexer.NounsDAO.ProposalObjectionPeriodSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalQueued(query?: Indexer.NounsDAO.ProposalQueuedQuery) {
	let events = (await _fetchAllEvents("ProposalQueued")) as Indexer.NounsDAO.ProposalQueued[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalThresholdBPSSet(query?: Indexer.NounsDAO.ProposalThresholdBPSSetQuery) {
	let events = (await _fetchAllEvents("ProposalThresholdBPSSet")) as Indexer.NounsDAO.ProposalThresholdBPSSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalTransactionsUpdated(query?: Indexer.NounsDAO.ProposalTransactionsUpdatedQuery) {
	let events = (await _fetchAllEvents("ProposalTransactionsUpdated")) as Indexer.NounsDAO.ProposalTransactionsUpdated[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalUpdatablePeriodSet(query?: Indexer.NounsDAO.ProposalUpdatablePeriodSetQuery) {
	let events = (await _fetchAllEvents("ProposalUpdatablePeriodSet")) as Indexer.NounsDAO.ProposalUpdatablePeriodSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalUpdated(query?: Indexer.NounsDAO.ProposalUpdatedQuery) {
	let events = (await _fetchAllEvents("ProposalUpdated")) as Indexer.NounsDAO.ProposalUpdated[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalVetoed(query?: Indexer.NounsDAO.ProposalVetoedQuery) {
	let events = (await _fetchAllEvents("ProposalVetoed")) as Indexer.NounsDAO.ProposalVetoed[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchQuorumCoefficientSet(query?: Indexer.NounsDAO.QuorumCoefficientSetQuery) {
	let events = (await _fetchAllEvents("QuorumCoefficientSet")) as Indexer.NounsDAO.QuorumCoefficientSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchQuorumVotesBPSSet(query?: Indexer.NounsDAO.QuorumVotesBPSSetQuery) {
	let events = (await _fetchAllEvents("QuorumVotesBPSSet")) as Indexer.NounsDAO.QuorumVotesBPSSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchRefundableVote(query?: Indexer.NounsDAO.RefundableVoteQuery) {
	let events = (await _fetchAllEvents("RefundableVote")) as Indexer.NounsDAO.RefundableVote[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchSignatureCancelled(query?: Indexer.NounsDAO.SignatureCancelledQuery) {
	let events = (await _fetchAllEvents("SignatureCancelled")) as Indexer.NounsDAO.SignatureCancelled[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchTimelocksAndAdminSet(query?: Indexer.NounsDAO.TimelocksAndAdminSetQuery) {
	let events = (await _fetchAllEvents("TimelocksAndAdminSet")) as Indexer.NounsDAO.TimelocksAndAdminSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchStatusChangeEvents(query?: Indexer.NounsDAO.StatusChangeQuery) {
	let events: Indexer.NounsDAO.ProposalCanceled[] = [];

	if (!query) {
		return _fetchAllStatusChange();
	}

	if (query.status === "Cancelled") {
		events = (await _fetchAllEvents("ProposalCanceled")) as Indexer.NounsDAO.ProposalCanceled[];
	} else if (query.status === "Vetoed") {
		events = (await _fetchAllEvents("ProposalVetoed")) as Indexer.NounsDAO.ProposalVetoed[];
	} else if (query.status === "Queued") {
		events = (await _fetchAllEvents("ProposalQueued")) as Indexer.NounsDAO.ProposalQueued[];
	} else if (query.status === "Executed") {
		events = (await _fetchAllEvents("ProposalExecuted")) as Indexer.NounsDAO.ProposalExecuted[];
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

/**
 * Fetches all VoteCast events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchVoteCastEvents(query?: Indexer.NounsDAO.VoteCastQuery) {
	let events = (await _fetchAllEvents("VoteCast")) as Indexer.NounsDAO.VoteCast[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchVoteSnapshotBlockSwitchProposalIdSet(
	query?: Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSetQuery
) {
	let events = (await _fetchAllEvents(
		"VoteSnapshotBlockSwitchProposalIdSet"
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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchVotingDelaySet(query?: Indexer.NounsDAO.VotingDelaySetQuery) {
	let events = (await _fetchAllEvents("VotingDelaySet")) as Indexer.NounsDAO.VotingDelaySet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchVotingPeriodSet(query?: Indexer.NounsDAO.VotingPeriodSetQuery) {
	let events = (await _fetchAllEvents("VotingPeriodSet")) as Indexer.NounsDAO.VotingPeriodSet[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchWithdraw(query?: Indexer.NounsDAO.WithdrawQuery) {
	let events = (await _fetchAllEvents("Withdraw")) as Indexer.NounsDAO.Withdraw[];

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
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchWithdrawFromForkEscrow(query?: Indexer.NounsDAO.WithdrawFromForkEscrowQuery) {
	let events = (await _fetchAllEvents("WithdrawFromForkEscrow")) as Indexer.NounsDAO.WithdrawFromForkEscrow[];

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
