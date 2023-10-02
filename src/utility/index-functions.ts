import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";

interface ProposalQuery {
	startBlock?: number;
	endBlock?: number;
	startId?: number;
	endId?: number;
	id?: number;
	status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
	proposer?: string;
}

const NOUNS_STARTING_BLOCK = 13072753;

// ==================================
// ProposalCreated
// ==================================

export async function getProposals(query: ProposalQuery | undefined) {
	let events = await _getAllProposals();

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
		events = _filterProposalsByBlock(events, query.startBlock, query.endBlock);
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
		events = _filterProposalByProposer(events, query.proposer);
	}

	if (query.status) {
		events = await _filterProposalsByStatus(events, query.status);
	}

	return events;
}

async function _getAllProposals() {
	let path = join(__dirname, "..", "data", "index", "ProposalCreated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAO.ProposalCreated[] = JSON.parse(proposalFile);
	return proposals;
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
	let statuses = await _getAllStatusChange();
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

async function _getAllProposalCanceled() {
	let canceledPath = join(__dirname, "..", "data", "index", "ProposalCanceled.json");
	let canceledFile = await readFile(canceledPath, { encoding: "utf8" });
	let canceledProposals: Indexer.NounsDAO.ProposalCanceled[] = JSON.parse(canceledFile);
	return canceledProposals;
}

async function _getAllProposalExecuted() {
	let executedPath = join(__dirname, "..", "data", "index", "ProposalExecuted.json");
	let executedFile = await readFile(executedPath, { encoding: "utf8" });
	let executedProposals: Indexer.NounsDAO.ProposalExecuted[] = JSON.parse(executedFile);
	return executedProposals;
}

async function _getAllProposalQueued() {
	let queuedPath = join(__dirname, "..", "data", "index", "ProposalQueued.json");
	let queuedFile = await readFile(queuedPath, { encoding: "utf8" });
	let queuedProposals: Indexer.NounsDAO.ProposalQueued[] = JSON.parse(queuedFile);
	return queuedProposals;
}

async function _getAllProposalVetoed() {
	let vetoedPath = join(__dirname, "..", "data", "index", "ProposalVetoed.json");
	let vetoedFile = await readFile(vetoedPath, { encoding: "utf8" });
	let vetoedProposals: Indexer.NounsDAO.ProposalVetoed[] = JSON.parse(vetoedFile);
	return vetoedProposals;
}

async function _getAllStatusChange() {
	let proposals = await _getAllProposalCanceled();
	proposals = proposals.concat(await _getAllProposalExecuted());
	proposals = proposals.concat(await _getAllProposalQueued());
	proposals = proposals.concat(await _getAllProposalVetoed());
	proposals.sort((a, b) => {
		return a.blockNumber - b.blockNumber;
	});
	return proposals; // Proposals should probably be indexed together anyway.
}

// ==================================
// ExecuteFork
// ==================================

interface ExecuteForkQuery {
	startBlock?: number;
	endBlock?: number;
	startId?: number;
	endId?: number;
	id?: number;
}

export async function getExecutedFork(query: ExecuteForkQuery | undefined) {
	let events = await _getAllExecutedForkEvents();

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
		events = _filterExecutedForkByBlock(events, query.startBlock, query.endBlock);
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

async function _getAllExecutedForkEvents() {
	let path = join(__dirname, "..", "data", "index", "ExecuteFork.json");
	let forkFile = await readFile(path, { encoding: "utf8" });
	let forks: Indexer.NounsDAO.ExecuteFork[] = JSON.parse(forkFile);
	return forks;
}

/**
 * @param startBlock The starting block. Inclusive.
 * @param endBlock The final block. Inclusive.
 */
function _filterExecutedForkByBlock(forks: Indexer.NounsDAO.ExecuteFork[], startBlock: number, endBlock: number) {
	let filteredForks = forks.filter((fork) => {
		return fork.blockNumber >= startBlock && fork.blockNumber <= endBlock;
	});
	return filteredForks;
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
// ProposalStatusChange
// ==================================

interface StatusChangeQuery {
	startBlock?: number;
	endBlock?: number;
	proposalId?: number;
	status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
}

export async function getStatusChangeEvents(query: StatusChangeQuery | undefined) {
	let events: Indexer.NounsDAO.ProposalCanceled[] = [];

	if (!query) {
		return _getAllStatusChange();
	}

	if (query.status === "Cancelled") {
		events = await _getAllProposalCanceled();
	} else if (query.status === "Vetoed") {
		events = await _getAllProposalVetoed();
	} else if (query.status === "Queued") {
		events = await _getAllProposalQueued();
	} else if (query.status === "Executed") {
		events = await _getAllProposalExecuted();
	} else {
		events = await _getAllStatusChange();
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

interface VoteCastQuery {
	startBlock?: number;
	endBlock?: number;
	voter?: string;
	proposalId?: number;
	support?: "AGAINST" | "FOR" | "ABSTAIN";
}

export async function getVoteCastEvents(query: VoteCastQuery | undefined) {
	let events = await _getAllVoteCast();

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
		events = _filterVoteCastByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.proposalId) {
		events = _filterVoteCastByProposalId(events, query.proposalId);
	}

	if (query.voter) {
		events = _filterVoteCastByVoter(events, query.voter);
	}

	if (query.support) {
		events = _filterVoteCastBySupport(events, query.support);
	}

	return events;
}

async function _getAllVoteCast() {
	let path = join(__dirname, "..", "data", "index", "VoteCast.json");
	let file = await readFile(path, { encoding: "utf8" });
	let votes: Indexer.NounsDAO.VoteCast[] = JSON.parse(file);
	return votes;
}

function _filterVoteCastByBlock(votes: Indexer.NounsDAO.VoteCast[], startBlock: number, endBlock: number) {
	let filteredVotes = votes.filter((vote) => {
		return vote.blockNumber >= startBlock && vote.blockNumber <= endBlock;
	});
	return filteredVotes;
}

function _filterVoteCastByProposalId(votes: Indexer.NounsDAO.VoteCast[], proposalId: number) {
	let filteredVotes = votes.filter((vote) => {
		return vote.proposalId === proposalId;
	});
	return filteredVotes;
}

function _filterVoteCastByVoter(votes: Indexer.NounsDAO.VoteCast[], voter: string) {
	let filteredVotes = votes.filter((vote) => {
		return vote.voterAddress === voter;
	});
	return filteredVotes;
}

function _filterVoteCastBySupport(votes: Indexer.NounsDAO.VoteCast[], support: string) {
	let filteredVotes = votes.filter((vote) => {
		return vote.supportChoice === support;
	});
	return filteredVotes;
}

// ==================================
// AuctionCreated
// ==================================

interface AuctionCreatedQuery {
	startBlock?: number;
	endBlock?: number;
	nounId?: number;
}

export async function getAuctionCreatedEvents(query: AuctionCreatedQuery | undefined) {
	if (!query) {
		return _getAllAuctionCreated();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getAuctionCreatedByBlock(query.startBlock, query.endBlock);
	} else if (query.nounId) {
		return _getAuctionCreatedByNounId(query.nounId);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllAuctionCreated() {
	let path = join(__dirname, "..", "data", "index", "AuctionCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let auctions: Indexer.NounsAuctionHouse.AuctionCreated[] = JSON.parse(file);
	return auctions;
}

async function _getAuctionCreatedByBlock(startBlock: number, endBlock: number) {
	let auctions = await _getAllAuctionCreated();
	let filteredAuctions = auctions.filter((auction) => {
		return auction.blockNumber >= startBlock && auction.blockNumber <= endBlock;
	});
	return filteredAuctions;
}

async function _getAuctionCreatedByNounId(nounId: number) {
	let auctions = await _getAllAuctionCreated();
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

export async function getAuctionBidEvents(query: AuctionBidQuery | undefined) {
	if (!query) {
		return _getAllAuctionBid();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getAuctionBidByBlock(query.startBlock, query.endBlock);
	} else if (query.nounId) {
		return _getAuctionBidByNounId(query.nounId);
	} else if (query.bidder) {
		return _getAuctionBidByBidder(query.bidder);
	} else if (query.minBidAmount || query.maxBidAmount) {
		if (!query.minBidAmount) {
			query.minBidAmount = 0;
		}
		if (!query.maxBidAmount) {
			query.maxBidAmount = Infinity;
		}
		return _getAuctionBidByBidAmount(query.minBidAmount, query.maxBidAmount);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllAuctionBid() {
	let path = join(__dirname, "..", "data", "index", "AuctionBid.json");
	let file = await readFile(path, { encoding: "utf8" });
	let bids: Indexer.NounsAuctionHouse.AuctionBid[] = JSON.parse(file);
	return bids;
}

async function _getAuctionBidByBlock(startBlock: number, endBlock: number) {
	let bids = await _getAllAuctionBid();
	let filteredBids = bids.filter((bid) => {
		return bid.blockNumber >= startBlock && bid.blockNumber <= endBlock;
	});
	return filteredBids;
}

async function _getAuctionBidByNounId(nounId: number) {
	let bids = await _getAllAuctionBid();
	let filteredBids = bids.filter((bid) => {
		return bid.nounId === nounId;
	});
	return filteredBids;
}

async function _getAuctionBidByBidder(bidder: string) {
	let bids = await _getAllAuctionBid();
	let filteredBids = bids.filter((bid) => {
		return bid.bidderAddress === bidder; // Should this be case insensitive?
	});
	return filteredBids;
}

async function _getAuctionBidByBidAmount(minBidAmount: number, maxBidAmount: number) {
	let bids = await _getAllAuctionBid();
	let filteredBids = bids.filter((bid) => {
		return bid.bidAmount <= minBidAmount && bid.bidAmount >= maxBidAmount;
	});
	return filteredBids;
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

export async function getAuctionSettledEvents(query: AuctionSettledQuery | undefined) {
	if (!query) {
		return _getAllAuctionSettled();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getAuctionSettledByBlock(query.startBlock, query.endBlock);
	} else if (query.nounId) {
		return _getAuctionSettledByNounId(query.nounId);
	} else if (query.winner) {
		return _getAuctionSettledByWinner(query.winner);
	} else if (query.minBidAmount || query.maxBidAmount) {
		if (!query.minBidAmount) {
			query.minBidAmount = 0;
		}
		if (!query.maxBidAmount) {
			query.maxBidAmount = Infinity;
		}
		return _getAuctionSettledByBidAmount(query.minBidAmount, query.maxBidAmount);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllAuctionSettled() {
	let path = join(__dirname, "..", "data", "index", "AuctionSettled.json");
	let file = await readFile(path, { encoding: "utf8" });
	let auctions: Indexer.NounsAuctionHouse.AuctionSettled[] = JSON.parse(file);
	return auctions;
}

async function _getAuctionSettledByBlock(startBlock: number, endBlock: number) {
	let auctions = await _getAllAuctionSettled();
	let filteredAuctions = auctions.filter((auction) => {
		return auction.blockNumber >= startBlock && auction.blockNumber <= endBlock;
	});
	return filteredAuctions;
}

async function _getAuctionSettledByNounId(nounId: number) {
	let auctions = await _getAllAuctionSettled();
	let filteredAuctions = auctions.filter((auction) => {
		return auction.nounId === nounId;
	});
	return filteredAuctions;
}

async function _getAuctionSettledByWinner(winner: string) {
	let auctions = await _getAllAuctionSettled();
	let filteredAuctions = auctions.filter((auction) => {
		return auction.winnerAddress === winner; // Should this be case insensitive?
	});
	return filteredAuctions;
}

async function _getAuctionSettledByBidAmount(minBidAmount: number, maxBidAmount: number) {
	let auctions = await _getAllAuctionSettled();
	let filteredAuctions = auctions.filter((auction) => {
		return auction.bidAmount <= minBidAmount && auction.bidAmount >= maxBidAmount;
	});
	return filteredAuctions;
}

// ==================================
// DelegateChanged
// ==================================

interface DelegateChangedQuery {
	startBlock?: number;
	endBlock?: number;
	delegator?: string;
	fromDelegate?: string;
	toDelegate?: string;
	involving?: string;
}

export async function getDelegateChangedEvents(query: DelegateChangedQuery | undefined) {
	if (!query) {
		return _getAllDelegateChanged();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getDelegateChangedByBlock(query.startBlock, query.endBlock);
	} else if (query.delegator) {
		return _getDelegateChangedByDelegator(query.delegator);
	} else if (query.fromDelegate) {
		return _getDelegateChangedByFromDelegate(query.fromDelegate);
	} else if (query.toDelegate) {
		return _getDelegateChangedByToDelegate(query.toDelegate);
	} else if (query.involving) {
		return _getDelegateChangedByInvolved(query.involving);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllDelegateChanged() {
	let path = join(__dirname, "..", "data", "index", "DelegateChanged.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.DelegateChanged[] = JSON.parse(file);
	return events;
}

async function _getDelegateChangedByBlock(startBlock: number, endBlock: number) {
	let events = await _getAllDelegateChanged();
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

async function _getDelegateChangedByDelegator(delegator: string) {
	let events = await _getAllDelegateChanged();
	let filteredEvents = events.filter((event) => {
		return event.delegator === delegator;
	});
	return filteredEvents;
}

async function _getDelegateChangedByFromDelegate(fromDelegate: string) {
	let events = await _getAllDelegateChanged();
	let filteredEvents = events.filter((event) => {
		return event.fromDelegate === fromDelegate;
	});
	return filteredEvents;
}

async function _getDelegateChangedByToDelegate(toDelegate: string) {
	let events = await _getAllDelegateChanged();
	let filteredEvents = events.filter((event) => {
		return event.toDelegate === toDelegate;
	});
	return filteredEvents;
}

async function _getDelegateChangedByInvolved(involved: string) {
	let events = await _getAllDelegateChanged();

	let filteredEvents = events.filter((event) => {
		let isDelegator = event.delegator === involved;
		let isToDelegate = event.toDelegate === involved;
		let isFromDelegate = event.fromDelegate === involved;
		return isDelegator || isToDelegate || isFromDelegate;
	});
	return filteredEvents;
}

// ==================================
// DelegateVotesChanged
// ==================================

interface DelegateVotesChangedQuery {
	startBlock?: number;
	endBlock?: number;
	delegate?: string;
}

export async function getDelegateVotesChangedEvents(query: DelegateVotesChangedQuery | undefined) {
	if (!query) {
		return _getAllDelegateVotesChanged();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getDelegateVotesChangedByBlock(query.startBlock, query.endBlock);
	} else if (query.delegate) {
		return _getDelegateVotesChangedByDelegate(query.delegate);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllDelegateVotesChanged() {
	let path = join(__dirname, "..", "data", "index", "DelegateVotesChanged.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.DelegateVotesChanged[] = JSON.parse(file);
	return events;
}

async function _getDelegateVotesChangedByBlock(startBlock: number, endBlock: number) {
	let events = await _getAllDelegateVotesChanged();
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

async function _getDelegateVotesChangedByDelegate(delegate: string) {
	let events = await _getAllDelegateVotesChanged();
	let filteredEvents = events.filter((event) => {
		return event.delegate === delegate;
	});
	return filteredEvents;
}

// ==================================
// Transfer
// ==================================

interface TransferQuery {
	startBlock?: number;
	endBlock?: number;
	from?: string;
	to?: string;
	involved?: string;
	tokenId?: number;
}

export async function getTransferEvents(query: TransferQuery | undefined) {
	if (!query) {
		return _getAllTransfer();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getTransferByBlock(query.startBlock, query.endBlock);
	} else if (query.from) {
		return _getTransferByFrom(query.from);
	} else if (query.to) {
		return _getTransferByTo(query.to);
	} else if (query.involved) {
		return _getTransferByInvolved(query.involved);
	} else if (query.tokenId) {
		return _getTransferByTokenId(query.tokenId);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllTransfer() {
	let path = join(__dirname, "..", "data", "index", "Transfer.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.Transfer[] = JSON.parse(file);
	return events;
}

async function _getTransferByBlock(startBlock: number, endBlock: number) {
	let events = await _getAllTransfer();
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

async function _getTransferByFrom(from: string) {
	let events = await _getAllTransfer();
	let filteredEvents = events.filter((event) => {
		return event.from === from;
	});
	return filteredEvents;
}

async function _getTransferByTo(to: string) {
	let events = await _getAllTransfer();
	let filteredEvents = events.filter((event) => {
		return event.to === to;
	});
	return filteredEvents;
}

async function _getTransferByInvolved(involved: string) {
	let events = await _getAllTransfer();
	let filteredEvents = events.filter((event) => {
		let isFrom = event.from === involved;
		let isTo = event.to === involved;
		return isFrom || isTo;
	});
	return filteredEvents;
}

async function _getTransferByTokenId(tokenId: number) {
	let events = await _getAllTransfer();
	let filteredEvents = events.filter((event) => {
		return event.tokenId === tokenId;
	});
	return filteredEvents;
}

// ==================================
// NounCreated
// ==================================

interface NounCreatedQuery {
	startBlock?: number;
	endBlock?: number;
	tokenId?: number;
	background?: number;
	body?: number;
	accessory?: number;
	head?: number;
	glasses?: number;
}

export async function getNounCreatedEvents(query: NounCreatedQuery | undefined) {
	if (!query) {
		return _getAllNounCreated();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getNounCreatedByBlock(query.startBlock, query.endBlock);
	} else if (query.tokenId) {
		return _getNounCreatedByTokenId(query.tokenId);
	} else if (query.background) {
		return _getNounCreatedByBackground(query.background);
	} else if (query.body) {
		return _getNounCreatedByBody(query.body);
	} else if (query.accessory) {
		return _getNounCreatedByAccessory(query.accessory);
	} else if (query.head) {
		return _getNounCreatedByHead(query.head);
	} else if (query.glasses) {
		return _getNounCreatedByGlasses(query.glasses);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllNounCreated() {
	let path = join(__dirname, "..", "data", "index", "NounCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.NounCreated[] = JSON.parse(file);
	return events;
}

async function _getNounCreatedByBlock(startBlock: number, endBlock: number) {
	let events = await _getAllNounCreated();
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

async function _getNounCreatedByTokenId(tokenId: number) {
	let events = await _getAllNounCreated();
	let filteredEvents = events.filter((event) => {
		return event.tokenId === tokenId;
	});
	return filteredEvents;
}

async function _getNounCreatedByBackground(background: number) {
	let events = await _getAllNounCreated();
	let filteredEvents = events.filter((event) => {
		return event.seed.background === background;
	});
	return filteredEvents;
}

async function _getNounCreatedByBody(body: number) {
	let events = await _getAllNounCreated();
	let filteredEvents = events.filter((event) => {
		return event.seed.body === body;
	});
	return filteredEvents;
}

async function _getNounCreatedByAccessory(accessory: number) {
	let events = await _getAllNounCreated();
	let filteredEvents = events.filter((event) => {
		return event.seed.accessory === accessory;
	});
	return filteredEvents;
}

async function _getNounCreatedByHead(head: number) {
	let events = await _getAllNounCreated();
	let filteredEvents = events.filter((event) => {
		return event.seed.head === head;
	});
	return filteredEvents;
}

async function _getNounCreatedByGlasses(glasses: number) {
	let events = await _getAllNounCreated();
	let filteredEvents = events.filter((event) => {
		return event.seed.glasses === glasses;
	});
	return filteredEvents;
}

// ==================================
// CandidateFeedbackSent
// ==================================

interface CandidateFeedbackSentQuery {
	startBlock?: number;
	endBlock?: number;
	msgSender?: string;
	proposer?: string;
	involved?: string;
	slug?: string;
	supportChoice?: "AGAINST" | "FOR" | "ABSTAIN";
}

export async function getCandidateFeedbackSentEvents(query: CandidateFeedbackSentQuery | undefined) {
	if (!query) {
		return _getAllCandidateFeedbackSent();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getCandidateFeedbackSentByBlock(query.startBlock, query.endBlock);
	} else if (query.msgSender) {
		return _getCandidateFeedbackSentBySender(query.msgSender);
	} else if (query.proposer) {
		return _getCandidateFeedbackSentByProposer(query.proposer);
	} else if (query.involved) {
		return _getCandidateFeedbackSentByInvolved(query.involved);
	} else if (query.slug) {
		return _getCandidateFeedbackSentBySlug(query.slug);
	} else if (query.supportChoice) {
		return _getCandidateFeedbackSentBySupportChoice(query.supportChoice);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllCandidateFeedbackSent() {
	let path = join(__dirname, "..", "data", "index", "CandidateFeedbackSent.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.CandidateFeedbackSent[] = JSON.parse(file);
	return events;
}

async function _getCandidateFeedbackSentByBlock(startBlock: number, endBlock: number) {
	let events = await _getAllCandidateFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

async function _getCandidateFeedbackSentBySender(msgSender: string) {
	let events = await _getAllCandidateFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.msgSender === msgSender;
	});
	return filteredEvents;
}

async function _getCandidateFeedbackSentByProposer(proposer: string) {
	let events = await _getAllCandidateFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.proposer === proposer;
	});
	return filteredEvents;
}

async function _getCandidateFeedbackSentByInvolved(involved: string) {
	let events = await _getAllCandidateFeedbackSent();
	let filteredEvents = events.filter((event) => {
		let isSender = event.msgSender === involved;
		let isProposer = event.proposer === involved;
		return isSender || isProposer;
	});
	return filteredEvents;
}

async function _getCandidateFeedbackSentBySlug(slug: string) {
	let events = await _getAllCandidateFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.slug === slug;
	});
	return filteredEvents;
}

async function _getCandidateFeedbackSentBySupportChoice(supportChoice: string) {
	let events = await _getAllCandidateFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.supportChoice === supportChoice;
	});
	return filteredEvents;
}

// ==================================
// FeedbackSent
// ==================================

interface FeedbackSentQuery {
	startBlock?: number;
	endBlock?: number;
	msgSender?: string;
	proposalId?: number;
	supportChoice?: "AGAINST" | "FOR" | "ABSTAIN";
}

export async function getFeedbackSentEvents(query: FeedbackSentQuery | undefined) {
	if (!query) {
		return _getAllFeedbackSent();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getFeedbackSentByBlock(query.startBlock, query.endBlock);
	} else if (query.msgSender) {
		return _getFeedbackSentBySender(query.msgSender);
	} else if (query.proposalId) {
		return _getFeedbackSentByProposalId(query.proposalId);
	} else if (query.supportChoice) {
		return _getFeedbackSentBySupportChoice(query.supportChoice);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllFeedbackSent() {
	let path = join(__dirname, "..", "data", "index", "FeedbackSent.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.FeedbackSent[] = JSON.parse(file);
	return events;
}

async function _getFeedbackSentByBlock(startBlock: number, endBlock: number) {
	let events = await _getAllFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

async function _getFeedbackSentBySender(msgSender: string) {
	let events = await _getAllFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.msgSender === msgSender;
	});
	return filteredEvents;
}

async function _getFeedbackSentByProposalId(proposalId: number) {
	let events = await _getAllFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.proposalId === proposalId;
	});
	return filteredEvents;
}

async function _getFeedbackSentBySupportChoice(supportChoice: string) {
	let events = await _getAllFeedbackSent();
	let filteredEvents = events.filter((event) => {
		return event.supportChoice === supportChoice;
	});
	return filteredEvents;
}

// ==================================
// ProposalCandidateCreated
// ==================================

interface ProposalCandidateCreatedQuery {
	startBlock?: number;
	endBlock?: number;
	msgSender?: string;
	slug?: string;
}

export async function getProposalCandidateCreatedEvents(query: ProposalCandidateCreatedQuery | undefined) {
	if (!query) {
		return _getAllProposalCandidateCreated();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getProposalCandidateCreatedByBlock(query.startBlock, query.endBlock);
	} else if (query.msgSender) {
		return _getProposalCandidateCreatedBySender(query.msgSender);
	} else if (query.slug) {
		return _getProposalCandidateCreatedBySlug(query.slug);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllProposalCandidateCreated() {
	let path = join(__dirname, "..", "data", "index", "ProposalCandidateCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.ProposalCandidateCreated[] = JSON.parse(file);
	return events;
}

async function _getProposalCandidateCreatedByBlock(startBlock: number, endBlock: number) {
	let events = await _getAllProposalCandidateCreated();
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

async function _getProposalCandidateCreatedBySender(msgSender: string) {
	let events = await _getAllProposalCandidateCreated();
	let filteredEvents = events.filter((event) => {
		return event.msgSender === msgSender;
	});
	return filteredEvents;
}

async function _getProposalCandidateCreatedBySlug(slug: string) {
	let events = await _getAllProposalCandidateCreated();
	let filteredEvents = events.filter((event) => {
		return event.slug === slug;
	});
	return filteredEvents;
}

// ==================================
// SignatureAdded
// ==================================

interface SignatureAddedQuery {
	startBlock?: number;
	endBlock?: number;
	signer?: string;
	proposer?: string;
	involved?: string;
	slug?: string;
}

export async function getSignatureAddedEvents(query: SignatureAddedQuery | undefined) {
	if (!query) {
		return _getAllSignatureAdded();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getSignatureAddedByBlock(query.startBlock, query.endBlock);
	} else if (query.signer) {
		return _getSignatureAddedBySigner(query.signer);
	} else if (query.proposer) {
		return _getSignatureAddedByProposer(query.proposer);
	} else if (query.involved) {
		return _getSignatureAddedByInvolved(query.involved);
	} else if (query.slug) {
		return _getSignatureAddedBySlug(query.slug);
	} else {
		throw new Error("Really Helpful Error Message");
	}
}

async function _getAllSignatureAdded() {
	let path = join(__dirname, "..", "data", "index", "SignatureAdded.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.SignatureAdded[] = JSON.parse(file);
	return events;
}

async function _getSignatureAddedByBlock(startBlock: number, endBlock: number) {
	let events = await _getAllSignatureAdded();
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

async function _getSignatureAddedBySigner(signer: string) {
	let events = await _getAllSignatureAdded();
	let filteredEvents = events.filter((event) => {
		return event.signer === signer;
	});
	return filteredEvents;
}

async function _getSignatureAddedByProposer(proposer: string) {
	let events = await _getAllSignatureAdded();
	let filteredEvents = events.filter((event) => {
		return event.proposer === proposer;
	});
	return filteredEvents;
}

async function _getSignatureAddedByInvolved(involved: string) {
	let events = await _getAllSignatureAdded();
	let filteredEvents = events.filter((event) => {
		let isSigner = event.signer === involved;
		let isProposer = event.proposer === involved;
		return isSigner || isProposer;
	});
	return filteredEvents;
}

async function _getSignatureAddedBySlug(slug: string) {
	let events = await _getAllSignatureAdded();
	let filteredEvents = events.filter((event) => {
		return event.slug === slug;
	});
	return filteredEvents;
}
