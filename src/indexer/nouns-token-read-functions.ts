import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock, _fetchAllEvents } from "../utilities/indexer";

// ==================================
// DelegateChanged
// ==================================

/**
 * Fetches all DelegateChanged events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDelegateChangedEvents(directoryPath: string, query?: Indexer.NounsToken.DelegateChangedQuery) {
	let events = (await _fetchAllEvents("DelegateChanged", directoryPath)) as Indexer.NounsToken.DelegateChanged[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDelegateVotesChangedEvents(
	directoryPath: string,
	query?: Indexer.NounsToken.DelegateVotesChangedQuery
) {
	let events = (await _fetchAllEvents("DelegateVotesChanged", directoryPath)) as Indexer.NounsToken.DelegateVotesChanged[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchTransferEvents(directoryPath: string, query?: Indexer.NounsToken.TransferQuery) {
	let events = (await _fetchAllEvents("Transfer", directoryPath)) as Indexer.NounsToken.Transfer[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchApproval(directoryPath: string, query?: Indexer.NounsToken.ApprovalQuery) {
	let events = (await _fetchAllEvents("Approval", directoryPath)) as Indexer.NounsToken.Approval[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchApprovalForAll(directoryPath: string, query?: Indexer.NounsToken.ApprovalForAllQuery) {
	let events = (await _fetchAllEvents("ApprovalForAll", directoryPath)) as Indexer.NounsToken.ApprovalForAll[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNounCreatedEvents(directoryPath: string, query?: Indexer.NounsToken.NounCreatedQuery) {
	let events = (await _fetchAllEvents("NounCreated", directoryPath)) as Indexer.NounsToken.NounCreated[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDescriptorLocked(directoryPath: string, query?: Indexer.NounsToken.DescriptorLockedQuery) {
	let events = (await _fetchAllEvents("DescriptorLocked", directoryPath)) as Indexer.NounsToken.DescriptorLocked[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchDescriptorUpdated(directoryPath: string, query?: Indexer.NounsToken.DescriptorUpdatedQuery) {
	let events = (await _fetchAllEvents("DescriptorUpdated", directoryPath)) as Indexer.NounsToken.DescriptorUpdated[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchMinterLocked(directoryPath: string, query?: Indexer.NounsToken.MinterLockedQuery) {
	let events = (await _fetchAllEvents("MinterLocked", directoryPath)) as Indexer.NounsToken.MinterLocked[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchMinterUpdated(directoryPath: string, query?: Indexer.NounsToken.MinterUpdatedQuery) {
	let events = (await _fetchAllEvents("MinterUpdated", directoryPath)) as Indexer.NounsToken.MinterUpdated[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNounBurned(directoryPath: string, query?: Indexer.NounsToken.NounBurnedQuery) {
	let events = (await _fetchAllEvents("NounBurned", directoryPath)) as Indexer.NounsToken.NounBurned[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchNoundersDAOUpdated(directoryPath: string, query?: Indexer.NounsToken.NoundersDAOUpdatedQuery) {
	let events = (await _fetchAllEvents("NoundersDAOUpdated", directoryPath)) as Indexer.NounsToken.NoundersDAOUpdated[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchOwnershipTransferred(directoryPath: string, query?: Indexer.NounsToken.OwnershipTransferredQuery) {
	let events = (await _fetchAllEvents("OwnershipTransferred", directoryPath)) as Indexer.NounsToken.OwnershipTransferred[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchSeederLocked(directoryPath: string, query?: Indexer.NounsToken.SeederLockedQuery) {
	let events = (await _fetchAllEvents("SeederLocked", directoryPath)) as Indexer.NounsToken.SeederLocked[];

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
 * @param directoryPath Path to the indexer directory.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchSeederUpdated(directoryPath: string, query?: Indexer.NounsToken.SeederUpdatedQuery) {
	let events = (await _fetchAllEvents("SeederUpdated", directoryPath)) as Indexer.NounsToken.SeederUpdated[];

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
