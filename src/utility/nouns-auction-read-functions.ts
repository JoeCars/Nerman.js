import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";

const NOUNS_STARTING_BLOCK = 13072753;

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

export async function getAuctionCreatedEvents(query?: AuctionCreatedQuery) {
	let events = await _getAllAuctionCreated();

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

async function _getAllAuctionCreated() {
	let path = join(__dirname, "..", "data", "index", "AuctionCreated.json");
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

export async function getAuctionBidEvents(query?: AuctionBidQuery) {
	let events = await _getAllAuctionBid();

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

async function _getAllAuctionBid() {
	let path = join(__dirname, "..", "data", "index", "AuctionBid.json");
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

export async function getAuctionExtended(query?: AuctionExtendedQuery) {
	let events = await _getAllAuctionExtended();

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

async function _getAllAuctionExtended() {
	let path = join(__dirname, "..", "data", "index", "AuctionExtended.json");
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

export async function getAuctionSettledEvents(query?: AuctionSettledQuery) {
	let events = await _getAllAuctionSettled();

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

async function _getAllAuctionSettled() {
	let path = join(__dirname, "..", "data", "index", "AuctionSettled.json");
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

export async function getAuctionTimeBufferUpdated(query?: AuctionTimeBufferUpdatedQuery) {
	let events = await _getAllAuctionTimeBufferUpdated();

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

async function _getAllAuctionTimeBufferUpdated() {
	let path = join(__dirname, "..", "data", "index", "AuctionTimeBufferUpdated.json");
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

export async function getAuctionReservePriceUpdated(query?: AuctionReservePriceUpdatedQuery) {
	let events = await _getAllAuctionReservePriceUpdated();

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

async function _getAllAuctionReservePriceUpdated() {
	let path = join(__dirname, "..", "data", "index", "AuctionReservePriceUpdated.json");
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

export async function getAuctionMinBidIncrementPercentageUpdated(query?: AuctionMinBidIncrementPercentageUpdatedQuery) {
	let events = await _getAllAuctionMinBidIncrementPercentageUpdated();

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

async function _getAllAuctionMinBidIncrementPercentageUpdated() {
	let path = join(__dirname, "..", "data", "index", "AuctionMinBidIncrementPercentageUpdated.json");
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

export async function getOwnershipTransferred(query?: OwnershipTransferredQuery) {
	let events = await _getAllOwnershipTransferred();

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

async function _getAllOwnershipTransferred() {
	let path = join(__dirname, "..", "data", "index", "OwnershipTransferred.json");
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

export async function getPaused(query?: PausedQuery) {
	let events = await _getAllPaused();

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

async function _getAllPaused() {
	let path = join(__dirname, "..", "data", "index", "Paused.json");
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

export async function getUnpaused(query?: UnpausedQuery) {
	let events = await _getAllUnpaused();

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

async function _getAllUnpaused() {
	let path = join(__dirname, "..", "data", "index", "Unpaused.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsAuctionHouse.Unpaused[] = JSON.parse(proposalFile);
	return proposals;
}
