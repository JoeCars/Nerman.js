import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock, _fetchAllEvents } from "../utilities/indexer";

// ==================================
// AdminChanged
// ==================================

/**
 * Fetches all AdminChanged events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAdminChanged(query?: Indexer.NounsDAOData.AdminChangedQuery) {
	let events = (await _fetchAllEvents("AdminChanged")) as Indexer.NounsDAOData.AdminChanged[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.AdminChanged[];
	}

	if (query.previousAdmin) {
		events = events.filter((event) => {
			return event.previousAdmin === query.previousAdmin;
		});
	}

	if (query.newAdmin) {
		events = events.filter((event) => {
			return event.newAdmin === query.newAdmin;
		});
	}

	if (query.including) {
		events = events.filter((event) => {
			let isPreviousAdmin = event.previousAdmin === query.including;
			let isNewAdmin = event.newAdmin === query.including;
			return isPreviousAdmin || isNewAdmin;
		});
	}

	return events;
}

// ==================================
// BeaconUpgraded
// ==================================

/**
 * Fetches all BeaconUpgraded events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchBeaconUpgraded(query?: Indexer.NounsDAOData.BeaconUpgradedQuery) {
	let events = (await _fetchAllEvents("BeaconUpgraded")) as Indexer.NounsDAOData.BeaconUpgraded[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.BeaconUpgraded[];
	}

	return events;
}

// ==================================
// CandidateFeedbackSent
// ==================================

/**
 * Fetches all CandidateFeedbackSent events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchCandidateFeedbackSentEvents(query?: Indexer.NounsDAOData.CandidateFeedbackSentQuery) {
	let events = (await _fetchAllEvents("CandidateFeedbackSent")) as Indexer.NounsDAOData.CandidateFeedbackSent[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.CandidateFeedbackSent[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.proposer) {
		events = events.filter((event) => {
			return event.proposer === query.proposer;
		});
	}

	if (query.involved) {
		events = events.filter((event) => {
			let isMsgSender = event.msgSender === query.msgSender;
			let isProposer = event.proposer === query.proposer;
			return isMsgSender || isProposer;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	if (query.supportChoice) {
		events = events.filter((event) => {
			return event.supportChoice === query.supportChoice;
		});
	}

	return events;
}

// ==================================
// CreateCandidateCostSet
// ==================================

/**
 * Fetches all CreateCandidateCostSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchCreateCandidateCostSet(query?: Indexer.NounsDAOData.CreateCandidateCostSetQuery) {
	let events = (await _fetchAllEvents("CreateCandidateCostSet")) as Indexer.NounsDAOData.CreateCandidateCostSet[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.CreateCandidateCostSet[];
	}

	return events;
}

// ==================================
// ETHWithdrawn
// ==================================

/**
 * Fetches all ETHWithdrawn events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchETHWithdrawn(query?: Indexer.NounsDAOData.ETHWithdrawnQuery) {
	let events = (await _fetchAllEvents("ETHWithdrawn")) as Indexer.NounsDAOData.ETHWithdrawn[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.ETHWithdrawn[];
	}

	if (query.to) {
		events = events.filter((event) => {
			return event.to === query.to;
		});
	}

	return events;
}

// ==================================
// FeeRecipientSet
// ==================================

/**
 * Fetches all FeeRecipientSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchFeeRecipientSet(query?: Indexer.NounsDAOData.FeeRecipientSetQuery) {
	let events = (await _fetchAllEvents("FeeRecipientSet")) as Indexer.NounsDAOData.FeeRecipientSet[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.FeeRecipientSet[];
	}

	return events;
}

// ==================================
// FeedbackSent
// ==================================

/**
 * Fetches all FeedbackSent events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchFeedbackSentEvents(query?: Indexer.NounsDAOData.FeedbackSentQuery) {
	let events = (await _fetchAllEvents("FeedbackSent")) as Indexer.NounsDAOData.FeedbackSent[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.FeedbackSent[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalId === query.proposalId;
		});
	}

	if (query.supportChoice) {
		events = events.filter((event) => {
			return event.supportChoice === query.supportChoice;
		});
	}

	return events;
}

// ==================================
// OwnershipTransferred
// ==================================

/**
 * Fetches all OwnershipTransferred events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchOwnershipTransferred(query?: Indexer.NounsDAOData.OwnershipTransferredQuery) {
	let events = (await _fetchAllEvents("OwnershipTransferred")) as Indexer.NounsDAOData.OwnershipTransferred[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.OwnershipTransferred[];
	}

	if (query.previousOwner) {
		events = events.filter((event) => {
			return event.previousOwner === query.previousOwner;
		});
	}

	if (query.newOwner) {
		events = events.filter((event) => {
			return event.newOwner === query.newOwner;
		});
	}

	if (query.including) {
		events = events.filter((event) => {
			let isPreviousOwner = event.previousOwner === query.including;
			let isNewOwner = event.newOwner === query.including;
			return isPreviousOwner || isNewOwner;
		});
	}

	return events;
}

// ==================================
// ProposalCandidateCanceled
// ==================================

/**
 * Fetches all ProposalCandidateCanceled events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCandidateCanceled(query?: Indexer.NounsDAOData.ProposalCandidateCanceledQuery) {
	let events = (await _fetchAllEvents("ProposalCandidateCanceled")) as Indexer.NounsDAOData.ProposalCandidateCanceled[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.ProposalCandidateCanceled[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	return events;
}

// ==================================
// ProposalCandidateCreated
// ==================================

/**
 * Fetches all ProposalCandidateCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCandidateCreatedEvents(query?: Indexer.NounsDAOData.ProposalCandidateCreatedQuery) {
	let events = (await _fetchAllEvents("ProposalCandidateCreated")) as Indexer.NounsDAOData.ProposalCandidateCreated[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.ProposalCandidateCreated[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	return events;
}

// ==================================
// ProposalCandidateUpdated
// ==================================

/**
 * Fetches all ProposalCandidateUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchProposalCandidateUpdated(query?: Indexer.NounsDAOData.ProposalCandidateUpdatedQuery) {
	let events = (await _fetchAllEvents("ProposalCandidateUpdated")) as Indexer.NounsDAOData.ProposalCandidateUpdated[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.ProposalCandidateUpdated[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	return events;
}

// ==================================
// SignatureAdded
// ==================================

/**
 * Fetches all SignatureAdded events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchSignatureAddedEvents(query?: Indexer.NounsDAOData.SignatureAddedQuery) {
	let events = (await _fetchAllEvents("SignatureAdded")) as Indexer.NounsDAOData.SignatureAdded[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.SignatureAdded[];
	}

	if (query.signer) {
		events = events.filter((event) => {
			return event.signer === query.signer;
		});
	}

	if (query.proposer) {
		events = events.filter((event) => {
			return event.proposer === query.proposer;
		});
	}

	if (query.involved) {
		events = events.filter((event) => {
			let isSigner = event.signer === query.signer;
			let isProposer = event.proposer === query.proposer;
			return isSigner || isProposer;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	return events;
}

// ==================================
// UpdateCandidateCostSet
// ==================================

/**
 * Fetches all UpdateCandidateCostSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchUpdateCandidateCostSet(query?: Indexer.NounsDAOData.UpdateCandidateCostSetQuery) {
	let events = (await _fetchAllEvents("UpdateCandidateCostSet")) as Indexer.NounsDAOData.UpdateCandidateCostSet[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.UpdateCandidateCostSet[];
	}

	return events;
}

// ==================================
// Upgraded
// ==================================

/**
 * Fetches all Upgraded events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchUpgraded(query?: Indexer.NounsDAOData.UpgradedQuery) {
	let events = (await _fetchAllEvents("Upgraded")) as Indexer.NounsDAOData.Upgraded[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.Upgraded[];
	}

	return events;
}
