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
		events = _filterAuctionCreatedByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.nounId) {
		events = _filterAuctionCreatedByNounId(events, query.nounId);
	}

	return events;
}

async function _getAllAuctionCreated() {
	let path = join(__dirname, "..", "data", "index", "AuctionCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let auctions: Indexer.NounsAuctionHouse.AuctionCreated[] = JSON.parse(file);
	return auctions;
}

function _filterAuctionCreatedByBlock(
	auctions: Indexer.NounsAuctionHouse.AuctionCreated[],
	startBlock: number,
	endBlock: number
) {
	let filteredAuctions = auctions.filter((auction) => {
		return auction.blockNumber >= startBlock && auction.blockNumber <= endBlock;
	});
	return filteredAuctions;
}

function _filterAuctionCreatedByNounId(auctions: Indexer.NounsAuctionHouse.AuctionCreated[], nounId: number) {
	let filteredAuctions = auctions.filter((auction) => {
		return auction.nounId === nounId;
	});
	return filteredAuctions;
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
		events = _filterAuctionBidByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.nounId) {
		events = _filterAuctionBidByNounId(events, query.nounId);
	}

	if (query.bidder) {
		events = _filterAuctionBidByBidder(events, query.bidder);
	}

	if (query.minBidAmount || query.maxBidAmount) {
		if (!query.minBidAmount) {
			query.minBidAmount = 0;
		}
		if (!query.maxBidAmount) {
			query.maxBidAmount = Infinity;
		}
		events = _filterAuctionBidByBidAmount(events, query.minBidAmount, query.maxBidAmount);
	}

	return events;
}

async function _getAllAuctionBid() {
	let path = join(__dirname, "..", "data", "index", "AuctionBid.json");
	let file = await readFile(path, { encoding: "utf8" });
	let bids: Indexer.NounsAuctionHouse.AuctionBid[] = JSON.parse(file);
	return bids;
}

function _filterAuctionBidByBlock(bids: Indexer.NounsAuctionHouse.AuctionBid[], startBlock: number, endBlock: number) {
	let filteredBids = bids.filter((bid) => {
		return bid.blockNumber >= startBlock && bid.blockNumber <= endBlock;
	});
	return filteredBids;
}

function _filterAuctionBidByNounId(bids: Indexer.NounsAuctionHouse.AuctionBid[], nounId: number) {
	let filteredBids = bids.filter((bid) => {
		return bid.nounId === nounId;
	});
	return filteredBids;
}

function _filterAuctionBidByBidder(bids: Indexer.NounsAuctionHouse.AuctionBid[], bidder: string) {
	let filteredBids = bids.filter((bid) => {
		return bid.bidderAddress === bidder;
	});
	return filteredBids;
}

function _filterAuctionBidByBidAmount(
	bids: Indexer.NounsAuctionHouse.AuctionBid[],
	minBidAmount: number,
	maxBidAmount: number
) {
	let filteredBids = bids.filter((bid) => {
		return bid.bidAmount <= minBidAmount && bid.bidAmount >= maxBidAmount;
	});
	return filteredBids;
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
		events = _filterAuctionSettledByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.nounId) {
		events = _filterAuctionSettledByNounId(events, query.nounId);
	}

	if (query.winner) {
		events = _filterAuctionSettledByWinner(events, query.winner);
	}

	if (query.minBidAmount || query.maxBidAmount) {
		if (!query.minBidAmount) {
			query.minBidAmount = 0;
		}
		if (!query.maxBidAmount) {
			query.maxBidAmount = Infinity;
		}
		events = _filterAuctionSettledByBidAmount(events, query.minBidAmount, query.maxBidAmount);
	}
}

async function _getAllAuctionSettled() {
	let path = join(__dirname, "..", "data", "index", "AuctionSettled.json");
	let file = await readFile(path, { encoding: "utf8" });
	let auctions: Indexer.NounsAuctionHouse.AuctionSettled[] = JSON.parse(file);
	return auctions;
}

function _filterAuctionSettledByBlock(
	auctions: Indexer.NounsAuctionHouse.AuctionSettled[],
	startBlock: number,
	endBlock: number
) {
	let filteredAuctions = auctions.filter((auction) => {
		return auction.blockNumber >= startBlock && auction.blockNumber <= endBlock;
	});
	return filteredAuctions;
}

function _filterAuctionSettledByNounId(auctions: Indexer.NounsAuctionHouse.AuctionSettled[], nounId: number) {
	let filteredAuctions = auctions.filter((auction) => {
		return auction.nounId === nounId;
	});
	return filteredAuctions;
}

function _filterAuctionSettledByWinner(auctions: Indexer.NounsAuctionHouse.AuctionSettled[], winner: string) {
	let filteredAuctions = auctions.filter((auction) => {
		return auction.winnerAddress === winner; // Should this be case insensitive?
	});
	return filteredAuctions;
}

function _filterAuctionSettledByBidAmount(
	auctions: Indexer.NounsAuctionHouse.AuctionSettled[],
	minBidAmount: number,
	maxBidAmount: number
) {
	let filteredAuctions = auctions.filter((auction) => {
		return auction.bidAmount <= minBidAmount && auction.bidAmount >= maxBidAmount;
	});
	return filteredAuctions;
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
