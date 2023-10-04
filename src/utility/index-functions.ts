import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";

const NOUNS_STARTING_BLOCK = 13072753;

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
