import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock, _fetchAllEvents } from "../utilities/indexer";

// ==================================
// AuctionCreated
// ==================================

/**
 * Fetches all AuctionCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAuctionCreatedEvents(query?: Indexer.NounsAuctionHouse.AuctionCreatedQuery) {
	let events = (await _fetchAllEvents("AuctionCreated")) as Indexer.NounsAuctionHouse.AuctionCreated[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsAuctionHouse.AuctionCreated[];
	}

	if (query.nounId !== undefined) {
		events = events.filter((event) => {
			return event.nounId === query.nounId;
		});
	}

	return events;
}

// ==================================
// AuctionBid
// ==================================

/**
 * Fetches all AuctionBid events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAuctionBidEvents(query?: Indexer.NounsAuctionHouse.AuctionBidQuery) {
	let events = (await _fetchAllEvents("AuctionBid")) as Indexer.NounsAuctionHouse.AuctionBid[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsAuctionHouse.AuctionBid[];
	}

	if (query.nounId !== undefined) {
		events = events.filter((event) => {
			return event.nounId === query.nounId;
		});
	}

	if (query.bidder) {
		events = events.filter((event) => {
			return event.bidderAddress === query.bidder;
		});
	}

	if (query.minBidAmount || query.maxBidAmount) {
		if (!query.minBidAmount) {
			query.minBidAmount = 0;
		}
		if (!query.maxBidAmount) {
			query.maxBidAmount = Infinity;
		}
		events = events.filter((event) => {
			return event.bidAmount <= (query.minBidAmount as number) && event.bidAmount >= (query.maxBidAmount as number);
		});
	}

	return events;
}

// ==================================
// AuctionExtended
// ==================================

/**
 * Fetches all AuctionExtended events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAuctionExtended(query?: Indexer.NounsAuctionHouse.AuctionExtendedQuery) {
	let events = (await _fetchAllEvents("AuctionExtended")) as Indexer.NounsAuctionHouse.AuctionExtended[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsAuctionHouse.AuctionExtended[];
	}

	if (query.nounId !== undefined) {
		events = events.filter((event) => {
			return event.nounId === query.nounId;
		});
	}

	return events;
}

// ==================================
// AuctionSettled
// ==================================

/**
 * Fetches all AuctionSettled events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAuctionSettledEvents(query?: Indexer.NounsAuctionHouse.AuctionSettledQuery) {
	let events = (await _fetchAllEvents("AuctionSettled")) as Indexer.NounsAuctionHouse.AuctionSettled[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsAuctionHouse.AuctionSettled[];
	}

	if (query.nounId !== undefined) {
		events = events.filter((event) => {
			return event.nounId === query.nounId;
		});
	}

	if (query.winner) {
		events = events.filter((event) => {
			return event.winnerAddress === query.winner;
		});
	}

	if (query.minBidAmount || query.maxBidAmount) {
		if (!query.minBidAmount) {
			query.minBidAmount = 0;
		}
		if (!query.maxBidAmount) {
			query.maxBidAmount = Infinity;
		}
		events = events.filter((event) => {
			return event.bidAmount <= (query.minBidAmount as number) && event.bidAmount >= (query.maxBidAmount as number);
		});
	}

	return events;
}

// ==================================
// AuctionTimeBufferUpdated
// ==================================

/**
 * Fetches all AuctionTimeBufferUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAuctionTimeBufferUpdated(query?: Indexer.NounsAuctionHouse.AuctionTimeBufferUpdatedQuery) {
	let events = (await _fetchAllEvents("AuctionTimeBufferUpdated")) as Indexer.NounsAuctionHouse.AuctionTimeBufferUpdated[];

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
		) as Indexer.NounsAuctionHouse.AuctionTimeBufferUpdated[];
	}

	return events;
}

// ==================================
// AuctionReservePriceUpdated
// ==================================

/**
 * Fetches all AuctionReservePriceUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAuctionReservePriceUpdated(query?: Indexer.NounsAuctionHouse.AuctionReservePriceUpdatedQuery) {
	let events = (await _fetchAllEvents(
		"AuctionReservePriceUpdated"
	)) as Indexer.NounsAuctionHouse.AuctionReservePriceUpdated[];

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
		) as Indexer.NounsAuctionHouse.AuctionReservePriceUpdated[];
	}

	return events;
}

// ==================================
// AuctionMinBidIncrementPercentageUpdated
// ==================================

/**
 * Fetches all AuctionMinBidIncrementPercentageUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAuctionMinBidIncrementPercentageUpdated(
	query?: Indexer.NounsAuctionHouse.AuctionMinBidIncrementPercentageUpdatedQuery
) {
	let events = (await _fetchAllEvents(
		"AuctionMinBidIncrementPercentageUpdated"
	)) as Indexer.NounsAuctionHouse.AuctionMinBidIncrementPercentageUpdated[];

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
		) as Indexer.NounsAuctionHouse.AuctionMinBidIncrementPercentageUpdated[];
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
export async function fetchOwnershipTransferred(query?: Indexer.NounsAuctionHouse.OwnershipTransferredQuery) {
	let events = (await _fetchAllEvents("OwnershipTransferred")) as Indexer.NounsAuctionHouse.OwnershipTransferred[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsAuctionHouse.OwnershipTransferred[];
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
// Paused
// ==================================

/**
 * Fetches all Paused events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchPaused(query?: Indexer.NounsAuctionHouse.PausedQuery) {
	let events = (await _fetchAllEvents("Paused")) as Indexer.NounsAuctionHouse.Paused[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsAuctionHouse.Paused[];
	}

	return events;
}

// ==================================
// Unpaused
// ==================================

/**
 * Fetches all Unpaused events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchUnpaused(query?: Indexer.NounsAuctionHouse.UnpausedQuery) {
	let events = (await _fetchAllEvents("Unpaused")) as Indexer.NounsAuctionHouse.Unpaused[];

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsAuctionHouse.Unpaused[];
	}

	return events;
}
