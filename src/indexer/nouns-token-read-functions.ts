import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock, _fetchAllEvents } from "../utilities/indexer";

// ==================================
// DelegateChanged
// ==================================

/**
 * Fetches all DelegateChanged events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDelegateChangedEvents(query?: Indexer.NounsToken.DelegateChangedQuery) {
	let events = (await _fetchAllEvents("DelegateChanged")) as Indexer.NounsToken.DelegateChanged[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DelegateChanged[];
	}

	if (query.delegator) {
		events = events.filter((event) => {
			return event.delegator === query.delegator;
		});
	}

	if (query.fromDelegate) {
		events = events.filter((event) => {
			return event.fromDelegate === query.fromDelegate;
		});
	}

	if (query.toDelegate) {
		events = events.filter((event) => {
			return event.toDelegate === query.toDelegate;
		});
	}

	if (query.involving) {
		events = events.filter((event) => {
			let isDelegator = event.delegator === query.involving;
			let isFromDelegate = event.fromDelegate === query.involving;
			let isToDelegate = event.toDelegate === query.involving;
			return isDelegator || isFromDelegate || isToDelegate;
		});
	}

	return events;
}

// ==================================
// DelegateVotesChanged
// ==================================

/**
 * Fetches all DelegateVotesChanged events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDelegateVotesChangedEvents(query?: Indexer.NounsToken.DelegateVotesChangedQuery) {
	let events = (await _fetchAllEvents("DelegateVotesChanged")) as Indexer.NounsToken.DelegateVotesChanged[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DelegateVotesChanged[];
	}

	if (query.delegate) {
		events = events.filter((event) => {
			return event.delegate === query.delegate;
		});
	}

	return events;
}

// ==================================
// Transfer
// ==================================

/**
 * Fetches all Transfer events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchTransferEvents(query?: Indexer.NounsToken.TransferQuery) {
	let events = (await _fetchAllEvents("Transfer")) as Indexer.NounsToken.Transfer[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.Transfer[];
	}

	if (query.from) {
		events = events.filter((event) => {
			return event.from === query.from;
		});
	}

	if (query.to) {
		events = events.filter((event) => {
			return event.to === query.to;
		});
	}

	if (query.involved) {
		events = events.filter((event) => {
			let isFrom = event.from === query.involved;
			let isTo = event.to === query.involved;
			return isFrom || isTo;
		});
	}

	if (query.tokenId !== undefined) {
		events = events.filter((event) => {
			return event.tokenId === query.tokenId;
		});
	}

	return events;
}

// ==================================
// Approval
// ==================================

/**
 * Fetches all Approval events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchApproval(query?: Indexer.NounsToken.ApprovalQuery) {
	let events = (await _fetchAllEvents("Approval")) as Indexer.NounsToken.Approval[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.Approval[];
	}

	if (query.owner) {
		events = events.filter((event) => {
			return event.owner === query.owner;
		});
	}

	if (query.tokenId !== undefined) {
		events = events.filter((event) => {
			return event.tokenId === query.tokenId;
		});
	}

	return events;
}

// ==================================
// ApprovalForAll
// ==================================

/**
 * Fetches all ApprovalForAll events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchApprovalForAll(query?: Indexer.NounsToken.ApprovalForAllQuery) {
	let events = (await _fetchAllEvents("ApprovalForAll")) as Indexer.NounsToken.ApprovalForAll[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.ApprovalForAll[];
	}

	if (query.owner) {
		events = events.filter((event) => {
			return event.owner === query.owner;
		});
	}

	return events;
}

// ==================================
// NounCreated
// ==================================

/**
 * Fetches all NounCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNounCreatedEvents(query?: Indexer.NounsToken.NounCreatedQuery) {
	let events = (await _fetchAllEvents("NounCreated")) as Indexer.NounsToken.NounCreated[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.NounCreated[];
	}

	if (query.tokenId !== undefined) {
		events = events.filter((event) => {
			return event.tokenId === query.tokenId;
		});
	}

	if (query.background !== undefined) {
		events = events.filter((event) => {
			return event.seed.background === query.background;
		});
	}

	if (query.body !== undefined) {
		events = events.filter((event) => {
			return event.seed.body === query.body;
		});
	}

	if (query.accessory !== undefined) {
		events = events.filter((event) => {
			return event.seed.accessory === query.accessory;
		});
	}

	if (query.head !== undefined) {
		events = events.filter((event) => {
			return event.seed.head === query.head;
		});
	}

	if (query.glasses !== undefined) {
		events = events.filter((event) => {
			return event.seed.glasses === query.glasses;
		});
	}

	return events;
}

// ==================================
// DescriptorLocked
// ==================================

/**
 * Fetches all DescriptorLocked events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDescriptorLocked(query?: Indexer.NounsToken.DescriptorLockedQuery) {
	let events = (await _fetchAllEvents("DescriptorLocked")) as Indexer.NounsToken.DescriptorLocked[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DescriptorLocked[];
	}

	return events;
}

// ==================================
// DescriptorUpdated
// ==================================

/**
 * Fetches all DescriptorUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDescriptorUpdated(query?: Indexer.NounsToken.DescriptorUpdatedQuery) {
	let events = (await _fetchAllEvents("DescriptorUpdated")) as Indexer.NounsToken.DescriptorUpdated[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DescriptorUpdated[];
	}

	return events;
}

// ==================================
// MinterLocked
// ==================================

/**
 * Fetches all MinterLocked events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchMinterLocked(query?: Indexer.NounsToken.MinterLockedQuery) {
	let events = (await _fetchAllEvents("MinterLocked")) as Indexer.NounsToken.MinterLocked[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.MinterLocked[];
	}

	return events;
}

// ==================================
// MinterUpdated
// ==================================

/**
 * Fetches all MinterUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchMinterUpdated(query?: Indexer.NounsToken.MinterUpdatedQuery) {
	let events = (await _fetchAllEvents("MinterUpdated")) as Indexer.NounsToken.MinterUpdated[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.MinterUpdated[];
	}

	return events;
}

// ==================================
// NounBurned
// ==================================

/**
 * Fetches all NounBurned events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNounBurned(query?: Indexer.NounsToken.NounBurnedQuery) {
	let events = (await _fetchAllEvents("NounBurned")) as Indexer.NounsToken.NounBurned[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.NounBurned[];
	}

	if (query.nounId !== undefined) {
		events = events.filter((event) => {
			return event.nounId === query.nounId;
		});
	}

	return events;
}

// ==================================
// NoundersDAOUpdated
// ==================================

/**
 * Fetches all NoundersDAOUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNoundersDAOUpdated(query?: Indexer.NounsToken.NoundersDAOUpdatedQuery) {
	let events = (await _fetchAllEvents("NoundersDAOUpdated")) as Indexer.NounsToken.NoundersDAOUpdated[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.NoundersDAOUpdated[];
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
export async function fetchOwnershipTransferred(query?: Indexer.NounsToken.OwnershipTransferredQuery) {
	let events = (await _fetchAllEvents("OwnershipTransferred")) as Indexer.NounsToken.OwnershipTransferred[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.OwnershipTransferred[];
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
// SeederLocked
// ==================================

/**
 * Fetches all SeederLocked events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchSeederLocked(query?: Indexer.NounsToken.SeederLockedQuery) {
	let events = (await _fetchAllEvents("SeederLocked")) as Indexer.NounsToken.SeederLocked[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.SeederLocked[];
	}

	return events;
}

// ==================================
// SeederUpdated
// ==================================

/**
 * Fetches all SeederUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchSeederUpdated(query?: Indexer.NounsToken.SeederUpdatedQuery) {
	let events = (await _fetchAllEvents("SeederUpdated")) as Indexer.NounsToken.SeederUpdated[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.SeederUpdated[];
	}

	return events;
}
