import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";

const NOUNS_STARTING_BLOCK = 13072753;

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

export async function getDelegateChangedEvents(query?: DelegateChangedQuery) {
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

export async function getDelegateVotesChangedEvents(query?: DelegateVotesChangedQuery) {
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

export async function getTransferEvents(query?: TransferQuery) {
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

export async function getNounCreatedEvents(query?: NounCreatedQuery) {
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

export async function getCandidateFeedbackSentEvents(query?: CandidateFeedbackSentQuery) {
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

export async function getFeedbackSentEvents(query?: FeedbackSentQuery) {
	let events = await _getAllFeedbackSent();

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
		events = _filterFeedbackSentByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.msgSender) {
		events = _filterFeedbackSentBySender(events, query.msgSender);
	}

	if (query.proposalId) {
		events = _filterFeedbackSentByProposalId(events, query.proposalId);
	}

	if (query.supportChoice) {
		events = _filterFeedbackSentBySupportChoice(events, query.supportChoice);
	}

	return events;
}

async function _getAllFeedbackSent() {
	let path = join(__dirname, "..", "data", "index", "FeedbackSent.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.FeedbackSent[] = JSON.parse(file);
	return events;
}

function _filterFeedbackSentByBlock(events: Indexer.NounsDAOData.FeedbackSent[], startBlock: number, endBlock: number) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterFeedbackSentBySender(events: Indexer.NounsDAOData.FeedbackSent[], msgSender: string) {
	let filteredEvents = events.filter((event) => {
		return event.msgSender === msgSender;
	});
	return filteredEvents;
}

function _filterFeedbackSentByProposalId(events: Indexer.NounsDAOData.FeedbackSent[], proposalId: number) {
	let filteredEvents = events.filter((event) => {
		return event.proposalId === proposalId;
	});
	return filteredEvents;
}

function _filterFeedbackSentBySupportChoice(events: Indexer.NounsDAOData.FeedbackSent[], supportChoice: string) {
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

export async function getProposalCandidateCreatedEvents(query?: ProposalCandidateCreatedQuery) {
	let events = await _getAllProposalCandidateCreated();

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
		events = _filterProposalCandidateCreatedByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.msgSender) {
		events = _filterProposalCandidateCreatedBySender(events, query.msgSender);
	}

	if (query.slug) {
		events = _filterProposalCandidateCreatedBySlug(events, query.slug);
	}

	return events;
}

async function _getAllProposalCandidateCreated() {
	let path = join(__dirname, "..", "data", "index", "ProposalCandidateCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.ProposalCandidateCreated[] = JSON.parse(file);
	return events;
}

function _filterProposalCandidateCreatedByBlock(
	events: Indexer.NounsDAOData.ProposalCandidateCreated[],
	startBlock: number,
	endBlock: number
) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterProposalCandidateCreatedBySender(events: Indexer.NounsDAOData.ProposalCandidateCreated[], msgSender: string) {
	let filteredEvents = events.filter((event) => {
		return event.msgSender === msgSender;
	});
	return filteredEvents;
}

function _filterProposalCandidateCreatedBySlug(events: Indexer.NounsDAOData.ProposalCandidateCreated[], slug: string) {
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

export async function getSignatureAddedEvents(query?: SignatureAddedQuery) {
	let events = await _getAllSignatureAdded();

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
		events = _filterSignatureAddedByBlock(events, query.startBlock, query.endBlock);
	}

	if (query.signer) {
		events = _filterSignatureAddedBySigner(events, query.signer);
	}

	if (query.proposer) {
		events = _filterSignatureAddedByProposer(events, query.proposer);
	}

	if (query.involved) {
		events = _filterSignatureAddedByInvolved(events, query.involved);
	}

	if (query.slug) {
		events = _filterSignatureAddedBySlug(events, query.slug);
	}

	return events;
}

async function _getAllSignatureAdded() {
	let path = join(__dirname, "..", "data", "index", "SignatureAdded.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.SignatureAdded[] = JSON.parse(file);
	return events;
}

function _filterSignatureAddedByBlock(events: Indexer.NounsDAOData.SignatureAdded[], startBlock: number, endBlock: number) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

function _filterSignatureAddedBySigner(events: Indexer.NounsDAOData.SignatureAdded[], signer: string) {
	let filteredEvents = events.filter((event) => {
		return event.signer === signer;
	});
	return filteredEvents;
}

function _filterSignatureAddedByProposer(events: Indexer.NounsDAOData.SignatureAdded[], proposer: string) {
	let filteredEvents = events.filter((event) => {
		return event.proposer === proposer;
	});
	return filteredEvents;
}

function _filterSignatureAddedByInvolved(events: Indexer.NounsDAOData.SignatureAdded[], involved: string) {
	let filteredEvents = events.filter((event) => {
		let isSigner = event.signer === involved;
		let isProposer = event.proposer === involved;
		return isSigner || isProposer;
	});
	return filteredEvents;
}

function _filterSignatureAddedBySlug(events: Indexer.NounsDAOData.SignatureAdded[], slug: string) {
	let filteredEvents = events.filter((event) => {
		return event.slug === slug;
	});
	return filteredEvents;
}
