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
// AdminChanged
// ==================================

interface AdminChangedQuery {
	startBlock?: number;
	endBlock?: number;
	previousAdmin?: string;
	newAdmin?: string;
	including?: string;
}

export async function getAdminChanged(query?: AdminChangedQuery) {
	let events = await _getAllAdminChanged();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.AdminChanged[];
	}

	if (query.previousAdmin) {
		events = events.filter((event) => {
			return event.previousAdmin === query.previousAdmin;
		});
	}

	if (query.newAdmin) {
		events = events.filter((event) => {
			return event.newAdmin === query.newAdmin;
		});
	}

	if (query.including) {
		events = events.filter((event) => {
			let isPreviousAdmin = event.previousAdmin === query.including;
			let isNewAdmin = event.newAdmin === query.including;
			return isPreviousAdmin || isNewAdmin;
		});
	}

	return events;
}

async function _getAllAdminChanged() {
	let path = join(__dirname, "..", "data", "index", "AdminChanged.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.AdminChanged[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// BeaconUpgraded
// ==================================

interface BeaconUpgradedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getBeaconUpgraded(query?: BeaconUpgradedQuery) {
	let events = await _getAllBeaconUpgraded();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.BeaconUpgraded[];
	}

	return events;
}

async function _getAllBeaconUpgraded() {
	let path = join(__dirname, "..", "data", "index", "BeaconUpgraded.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.BeaconUpgraded[] = JSON.parse(proposalFile);
	return proposals;
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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.CandidateFeedbackSent[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.proposer) {
		events = events.filter((event) => {
			return event.proposer === query.proposer;
		});
	}

	if (query.involved) {
		events = events.filter((event) => {
			let isMsgSender = event.msgSender === query.msgSender;
			let isProposer = event.proposer === query.proposer;
			return isMsgSender || isProposer;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	if (query.supportChoice) {
		events = events.filter((event) => {
			return event.supportChoice === query.supportChoice;
		});
	}

	return events;
}

async function _getAllCandidateFeedbackSent() {
	let path = join(__dirname, "..", "data", "index", "CandidateFeedbackSent.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.CandidateFeedbackSent[] = JSON.parse(file);
	return events;
}

// ==================================
// CreateCandidateCostSet
// ==================================

interface CreateCandidateCostSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getCreateCandidateCostSet(query?: CreateCandidateCostSetQuery) {
	let events = await _getAllCreateCandidateCostSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.CreateCandidateCostSet[];
	}

	return events;
}

async function _getAllCreateCandidateCostSet() {
	let path = join(__dirname, "..", "data", "index", "CreateCandidateCostSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.CreateCandidateCostSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ETHWithdrawn
// ==================================

interface ETHWithdrawnQuery {
	startBlock?: number;
	endBlock?: number;
	to?: string;
}

export async function getETHWithdrawn(query?: ETHWithdrawnQuery) {
	let events = await _getAllETHWithdrawn();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.ETHWithdrawn[];
	}

	if (query.to) {
		events = events.filter((event) => {
			return event.to === query.to;
		});
	}

	return events;
}

async function _getAllETHWithdrawn() {
	let path = join(__dirname, "..", "data", "index", "ETHWithdrawn.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.ETHWithdrawn[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// FeeRecipientSet
// ==================================

interface FeeRecipientSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getFeeRecipientSet(query?: FeeRecipientSetQuery) {
	let events = await _getAllFeeRecipientSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.FeeRecipientSet[];
	}

	return events;
}

async function _getAllFeeRecipientSet() {
	let path = join(__dirname, "..", "data", "index", "FeeRecipientSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.FeeRecipientSet[] = JSON.parse(proposalFile);
	return proposals;
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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.FeedbackSent[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.proposalId !== undefined) {
		events = events.filter((event) => {
			return event.proposalId === query.proposalId;
		});
	}

	if (query.supportChoice) {
		events = events.filter((event) => {
			return event.supportChoice === query.supportChoice;
		});
	}

	return events;
}

async function _getAllFeedbackSent() {
	let path = join(__dirname, "..", "data", "index", "FeedbackSent.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.FeedbackSent[] = JSON.parse(file);
	return events;
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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.OwnershipTransferred[];
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
	let proposals: Indexer.NounsDAOData.OwnershipTransferred[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ProposalCandidateCanceled
// ==================================

interface ProposalCandidateCanceledQuery {
	startBlock?: number;
	endBlock?: number;
	msgSender?: string;
	slug?: string;
}

export async function getProposalCandidateCanceled(query?: ProposalCandidateCanceledQuery) {
	let events = await _getAllProposalCandidateCanceled();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.ProposalCandidateCanceled[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	return events;
}

async function _getAllProposalCandidateCanceled() {
	let path = join(__dirname, "..", "data", "index", "ProposalCandidateCanceled.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.ProposalCandidateCanceled[] = JSON.parse(proposalFile);
	return proposals;
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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.ProposalCandidateCreated[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	return events;
}

async function _getAllProposalCandidateCreated() {
	let path = join(__dirname, "..", "data", "index", "ProposalCandidateCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.ProposalCandidateCreated[] = JSON.parse(file);
	return events;
}

// ==================================
// ProposalCandidateUpdated
// ==================================

interface ProposalCandidateUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
	msgSender?: string;
	slug?: string;
}

export async function getProposalCandidateUpdated(query?: ProposalCandidateUpdatedQuery) {
	let events = await _getAllProposalCandidateUpdated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.ProposalCandidateUpdated[];
	}

	if (query.msgSender) {
		events = events.filter((event) => {
			return event.msgSender === query.msgSender;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	return events;
}

async function _getAllProposalCandidateUpdated() {
	let path = join(__dirname, "..", "data", "index", "ProposalCandidateUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.ProposalCandidateUpdated[] = JSON.parse(proposalFile);
	return proposals;
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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.SignatureAdded[];
	}

	if (query.signer) {
		events = events.filter((event) => {
			return event.signer === query.signer;
		});
	}

	if (query.proposer) {
		events = events.filter((event) => {
			return event.proposer === query.proposer;
		});
	}

	if (query.involved) {
		events = events.filter((event) => {
			let isSigner = event.signer === query.signer;
			let isProposer = event.proposer === query.proposer;
			return isSigner || isProposer;
		});
	}

	if (query.slug) {
		events = events.filter((event) => {
			return event.slug === query.slug;
		});
	}

	return events;
}

async function _getAllSignatureAdded() {
	let path = join(__dirname, "..", "data", "index", "SignatureAdded.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsDAOData.SignatureAdded[] = JSON.parse(file);
	return events;
}

// ==================================
// UpdateCandidateCostSet
// ==================================

interface UpdateCandidateCostSetQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getUpdateCandidateCostSet(query?: UpdateCandidateCostSetQuery) {
	let events = await _getAllUpdateCandidateCostSet();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.UpdateCandidateCostSet[];
	}

	return events;
}

async function _getAllUpdateCandidateCostSet() {
	let path = join(__dirname, "..", "data", "index", "UpdateCandidateCostSet.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.UpdateCandidateCostSet[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// Upgraded
// ==================================

interface UpgradedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function getUpgraded(query?: UpgradedQuery) {
	let events = await _getAllUpgraded();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsDAOData.Upgraded[];
	}

	return events;
}

async function _getAllUpgraded() {
	let path = join(__dirname, "..", "data", "index", "Upgraded.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.Upgraded[] = JSON.parse(proposalFile);
	return proposals;
}
