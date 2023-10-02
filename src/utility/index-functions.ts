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

export async function getAuctionBidEvents(query: AuctionBidQuery | undefined) {
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
	let events = await _getAllDelegateChanged();

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
		events = _filterDelegateChangedByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.delegator) {
		events = _filterDelegateChangedByDelegator(events, query.delegator);
	}

	if (query.fromDelegate) {
		events = _filterDelegateChangedByFromDelegate(events, query.fromDelegate);
	}

	if (query.toDelegate) {
		events = _filterDelegateChangedByToDelegate(events, query.toDelegate);
	}

	if (query.involving) {
		events = _filterDelegateChangedByInvolved(events, query.involving);
	}

	return events;
}

async function _getAllDelegateChanged() {
	let path = join(__dirname, "..", "data", "index", "DelegateChanged.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.DelegateChanged[] = JSON.parse(file);
	return events;
}

function _filterDelegateChangedByBlock(events: Indexer.NounsToken.DelegateChanged[], startBlock: number, endBlock: number) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterDelegateChangedByDelegator(events: Indexer.NounsToken.DelegateChanged[], delegator: string) {
	let filteredEvents = events.filter((event) => {
		return event.delegator === delegator;
	});
	return filteredEvents;
}

function _filterDelegateChangedByFromDelegate(events: Indexer.NounsToken.DelegateChanged[], fromDelegate: string) {
	let filteredEvents = events.filter((event) => {
		return event.fromDelegate === fromDelegate;
	});
	return filteredEvents;
}

function _filterDelegateChangedByToDelegate(events: Indexer.NounsToken.DelegateChanged[], toDelegate: string) {
	let filteredEvents = events.filter((event) => {
		return event.toDelegate === toDelegate;
	});
	return filteredEvents;
}

function _filterDelegateChangedByInvolved(events: Indexer.NounsToken.DelegateChanged[], involved: string) {
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
	let events = await _getAllDelegateVotesChanged();

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
		events = _filterDelegateVotesChangedByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.delegate) {
		events = _filterDelegateVotesChangedByDelegate(events, query.delegate);
	}

	return events;
}

async function _getAllDelegateVotesChanged() {
	let path = join(__dirname, "..", "data", "index", "DelegateVotesChanged.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.DelegateVotesChanged[] = JSON.parse(file);
	return events;
}

function _filterDelegateVotesChangedByBlock(
	events: Indexer.NounsToken.DelegateVotesChanged[],
	startBlock: number,
	endBlock: number
) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterDelegateVotesChangedByDelegate(events: Indexer.NounsToken.DelegateVotesChanged[], delegate: string) {
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
	let events = await _getAllTransfer();

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
		events = _filterTransferByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.from) {
		events = _filterTransferByFrom(events, query.from);
	}

	if (query.to) {
		events = _filterTransferByTo(events, query.to);
	}

	if (query.involved) {
		events = _filterTransferByInvolved(events, query.involved);
	}

	if (query.tokenId) {
		events = _filterTransferByTokenId(events, query.tokenId);
	}

	return events;
}

async function _getAllTransfer() {
	let path = join(__dirname, "..", "data", "index", "Transfer.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.Transfer[] = JSON.parse(file);
	return events;
}

function _filterTransferByBlock(events: Indexer.NounsToken.Transfer[], startBlock: number, endBlock: number) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterTransferByFrom(events: Indexer.NounsToken.Transfer[], from: string) {
	let filteredEvents = events.filter((event) => {
		return event.from === from;
	});
	return filteredEvents;
}

function _filterTransferByTo(events: Indexer.NounsToken.Transfer[], to: string) {
	let filteredEvents = events.filter((event) => {
		return event.to === to;
	});
	return filteredEvents;
}

function _filterTransferByInvolved(events: Indexer.NounsToken.Transfer[], involved: string) {
	let filteredEvents = events.filter((event) => {
		let isFrom = event.from === involved;
		let isTo = event.to === involved;
		return isFrom || isTo;
	});
	return filteredEvents;
}

function _filterTransferByTokenId(events: Indexer.NounsToken.Transfer[], tokenId: number) {
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
	let events = await _getAllNounCreated();

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
		events = _filterNounCreatedByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.tokenId) {
		events = _filterNounCreatedByTokenId(events, query.tokenId);
	}

	if (query.background) {
		events = _filterNounCreatedByBackground(events, query.background);
	}

	if (query.body) {
		events = _filterNounCreatedByBody(events, query.body);
	}

	if (query.accessory) {
		events = _filterNounCreatedByAccessory(events, query.accessory);
	}

	if (query.head) {
		events = _filterNounCreatedByHead(events, query.head);
	}

	if (query.glasses) {
		events = _filterNounCreatedByGlasses(events, query.glasses);
	}

	return events;
}

async function _getAllNounCreated() {
	let path = join(__dirname, "..", "data", "index", "NounCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.NounCreated[] = JSON.parse(file);
	return events;
}

function _filterNounCreatedByBlock(events: Indexer.NounsToken.NounCreated[], startBlock: number, endBlock: number) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterNounCreatedByTokenId(events: Indexer.NounsToken.NounCreated[], tokenId: number) {
	let filteredEvents = events.filter((event) => {
		return event.tokenId === tokenId;
	});
	return filteredEvents;
}

function _filterNounCreatedByBackground(events: Indexer.NounsToken.NounCreated[], background: number) {
	let filteredEvents = events.filter((event) => {
		return event.seed.background === background;
	});
	return filteredEvents;
}

function _filterNounCreatedByBody(events: Indexer.NounsToken.NounCreated[], body: number) {
	let filteredEvents = events.filter((event) => {
		return event.seed.body === body;
	});
	return filteredEvents;
}

function _filterNounCreatedByAccessory(events: Indexer.NounsToken.NounCreated[], accessory: number) {
	let filteredEvents = events.filter((event) => {
		return event.seed.accessory === accessory;
	});
	return filteredEvents;
}

function _filterNounCreatedByHead(events: Indexer.NounsToken.NounCreated[], head: number) {
	let filteredEvents = events.filter((event) => {
		return event.seed.head === head;
	});
	return filteredEvents;
}

function _filterNounCreatedByGlasses(events: Indexer.NounsToken.NounCreated[], glasses: number) {
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
	let events = await _getAllCandidateFeedbackSent();

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
		events = _filterCandidateFeedbackSentByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.msgSender) {
		events = _filterCandidateFeedbackSentBySender(events, query.msgSender);
	}

	if (query.proposer) {
		events = _filterCandidateFeedbackSentByProposer(events, query.proposer);
	}

	if (query.involved) {
		events = _filterCandidateFeedbackSentByInvolved(events, query.involved);
	}

	if (query.slug) {
		events = _filterCandidateFeedbackSentBySlug(events, query.slug);
	}

	if (query.supportChoice) {
		events = _filterCandidateFeedbackSentBySupportChoice(events, query.supportChoice);
	}

	return events;
}

async function _getAllCandidateFeedbackSent() {
	let path = join(__dirname, "..", "data", "index", "CandidateFeedbackSent.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.CandidateFeedbackSent[] = JSON.parse(file);
	return events;
}

function _filterCandidateFeedbackSentByBlock(
	events: Indexer.NounsDAOData.CandidateFeedbackSent[],
	startBlock: number,
	endBlock: number
) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterCandidateFeedbackSentBySender(events: Indexer.NounsDAOData.CandidateFeedbackSent[], msgSender: string) {
	let filteredEvents = events.filter((event) => {
		return event.msgSender === msgSender;
	});
	return filteredEvents;
}

function _filterCandidateFeedbackSentByProposer(events: Indexer.NounsDAOData.CandidateFeedbackSent[], proposer: string) {
	let filteredEvents = events.filter((event) => {
		return event.proposer === proposer;
	});
	return filteredEvents;
}

function _filterCandidateFeedbackSentByInvolved(events: Indexer.NounsDAOData.CandidateFeedbackSent[], involved: string) {
	let filteredEvents = events.filter((event) => {
		let isSender = event.msgSender === involved;
		let isProposer = event.proposer === involved;
		return isSender || isProposer;
	});
	return filteredEvents;
}

function _filterCandidateFeedbackSentBySlug(events: Indexer.NounsDAOData.CandidateFeedbackSent[], slug: string) {
	let filteredEvents = events.filter((event) => {
		return event.slug === slug;
	});
	return filteredEvents;
}

function _filterCandidateFeedbackSentBySupportChoice(
	events: Indexer.NounsDAOData.CandidateFeedbackSent[],
	supportChoice: string
) {
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
