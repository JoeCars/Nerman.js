import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";

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

// ==================================
// AuctionCreated
// ==================================

interface AuctionCreatedQuery {
	startBlock?: number;
	endBlock?: number;
	nounId?: number;
}

export async function fetchAuctionCreatedEvents(query?: AuctionCreatedQuery) {
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
	let auctions: Indexer.NounsAuctionHouse.AuctionCreated[] = JSON.parse(file);
	return auctions;
}

// ==================================
// AuctionBid
// ==================================

interface AuctionBidQuery {
	startBlock?: number;
	endBlock?: number;
	nounId?: number;
	bidder?: string;
	minBidAmount?: number;
	maxBidAmount?: number;
}

export async function fetchAuctionBidEvents(query?: AuctionBidQuery) {
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
	let bids: Indexer.NounsAuctionHouse.AuctionBid[] = JSON.parse(file);
	return bids;
}

// ==================================
// AuctionExtended
// ==================================

interface AuctionExtendedQuery {
	startBlock?: number;
	endBlock?: number;
	nounId?: number;
}

export async function fetchAuctionExtended(query?: AuctionExtendedQuery) {
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
	let proposals: Indexer.NounsAuctionHouse.AuctionExtended[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// AuctionSettled
// ==================================

interface AuctionSettledQuery {
	startBlock?: number;
	endBlock?: number;
	nounId?: number;
	winner?: string;
	minBidAmount?: number;
	maxBidAmount?: number;
}

export async function fetchAuctionSettledEvents(query?: AuctionSettledQuery) {
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
	let auctions: Indexer.NounsAuctionHouse.AuctionSettled[] = JSON.parse(file);
	return auctions;
}

// ==================================
// AuctionTimeBufferUpdated
// ==================================

interface AuctionTimeBufferUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchAuctionTimeBufferUpdated(query?: AuctionTimeBufferUpdatedQuery) {
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
	let proposals: Indexer.NounsAuctionHouse.AuctionTimeBufferUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// AuctionReservePriceUpdated
// ==================================

interface AuctionReservePriceUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchAuctionReservePriceUpdated(query?: AuctionReservePriceUpdatedQuery) {
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
	let proposals: Indexer.NounsAuctionHouse.AuctionReservePriceUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// AuctionMinBidIncrementPercentageUpdated
// ==================================

interface AuctionMinBidIncrementPercentageUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchAuctionMinBidIncrementPercentageUpdated(query?: AuctionMinBidIncrementPercentageUpdatedQuery) {
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
	let proposals: Indexer.NounsAuctionHouse.AuctionMinBidIncrementPercentageUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// OwnershipTransferred
// ==================================

interface OwnershipTransferredQuery {
	startBlock?: number;
	endBlock?: number;
	previousOwner?: string;
	newOwner?: string;
	including?: string;
}

export async function fetchOwnershipTransferred(query?: OwnershipTransferredQuery) {
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
	let proposals: Indexer.NounsAuctionHouse.OwnershipTransferred[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// Paused
// ==================================

interface PausedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchPaused(query?: PausedQuery) {
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
	let proposals: Indexer.NounsAuctionHouse.Paused[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// Unpaused
// ==================================

interface UnpausedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchUnpaused(query?: UnpausedQuery) {
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
	let proposals: Indexer.NounsAuctionHouse.Unpaused[] = JSON.parse(proposalFile);
	return proposals;
}
