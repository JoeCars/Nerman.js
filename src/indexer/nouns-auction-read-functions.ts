import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock } from "../utilities/indexer";

// ==================================
// AuctionCreated
// ==================================

/**
 * Fetches all AuctionCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
 * @param query A query object.
 * @returns An array of events.
 */
export async function fetchAuctionCreatedEvents(query?: Indexer.NounsAuctionHouse.AuctionCreatedQuery) {
	let events = await _fetchAllAuctionCreated();

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

async function _fetchAllAuctionCreated() {
	let path = join(__dirname, "..", "data", "indexer", "AuctionCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let auctions: Indexer.NounsAuctionHouse.AuctionCreated[] = JSON.parse(file).events;
	return auctions;
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
	let events = await _fetchAllAuctionBid();

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

async function _fetchAllAuctionBid() {
	let path = join(__dirname, "..", "data", "indexer", "AuctionBid.json");
	let file = await readFile(path, { encoding: "utf8" });
	let bids: Indexer.NounsAuctionHouse.AuctionBid[] = JSON.parse(file).events;
	return bids;
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
	let events = await _fetchAllAuctionExtended();

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

async function _fetchAllAuctionExtended() {
	let path = join(__dirname, "..", "data", "indexer", "AuctionExtended.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsAuctionHouse.AuctionExtended[] = JSON.parse(proposalFile).events;
	return proposals;
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
	let events = await _fetchAllAuctionSettled();

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

async function _fetchAllAuctionSettled() {
	let path = join(__dirname, "..", "data", "indexer", "AuctionSettled.json");
	let file = await readFile(path, { encoding: "utf8" });
	let auctions: Indexer.NounsAuctionHouse.AuctionSettled[] = JSON.parse(file).events;
	return auctions;
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
	let events = await _fetchAllAuctionTimeBufferUpdated();

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

async function _fetchAllAuctionTimeBufferUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "AuctionTimeBufferUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsAuctionHouse.AuctionTimeBufferUpdated[] = JSON.parse(proposalFile).events;
	return proposals;
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
	let events = await _fetchAllAuctionReservePriceUpdated();

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

async function _fetchAllAuctionReservePriceUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "AuctionReservePriceUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsAuctionHouse.AuctionReservePriceUpdated[] = JSON.parse(proposalFile).events;
	return proposals;
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
	let events = await _fetchAllAuctionMinBidIncrementPercentageUpdated();

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

async function _fetchAllAuctionMinBidIncrementPercentageUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "AuctionMinBidIncrementPercentageUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsAuctionHouse.AuctionMinBidIncrementPercentageUpdated[] = JSON.parse(proposalFile).events;
	return proposals;
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
	let events = await _fetchAllOwnershipTransferred();

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

async function _fetchAllOwnershipTransferred() {
	let path = join(__dirname, "..", "data", "indexer", "OwnershipTransferred.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsAuctionHouse.OwnershipTransferred[] = JSON.parse(proposalFile).events;
	return proposals;
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
	let events = await _fetchAllPaused();

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

async function _fetchAllPaused() {
	let path = join(__dirname, "..", "data", "indexer", "Paused.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsAuctionHouse.Paused[] = JSON.parse(proposalFile).events;
	return proposals;
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
	let events = await _fetchAllUnpaused();

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

async function _fetchAllUnpaused() {
	let path = join(__dirname, "..", "data", "indexer", "Unpaused.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsAuctionHouse.Unpaused[] = JSON.parse(proposalFile).events;
	return proposals;
}
