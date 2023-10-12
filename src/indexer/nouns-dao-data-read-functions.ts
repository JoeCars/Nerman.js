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
// AdminChanged
// ==================================

interface AdminChangedQuery {
	startBlock?: number;
	endBlock?: number;
	previousAdmin?: string;
	newAdmin?: string;
	including?: string;
}

export async function fetchAdminChanged(query?: AdminChangedQuery) {
	let events = await _fetchAllAdminChanged();

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

async function _fetchAllAdminChanged() {
	let path = join(__dirname, "..", "data", "indexer", "AdminChanged.json");
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

export async function fetchBeaconUpgraded(query?: BeaconUpgradedQuery) {
	let events = await _fetchAllBeaconUpgraded();

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

async function _fetchAllBeaconUpgraded() {
	let path = join(__dirname, "..", "data", "indexer", "BeaconUpgraded.json");
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

export async function fetchCandidateFeedbackSentEvents(query?: CandidateFeedbackSentQuery) {
	let events = await _fetchAllCandidateFeedbackSent();

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

async function _fetchAllCandidateFeedbackSent() {
	let path = join(__dirname, "..", "data", "indexer", "CandidateFeedbackSent.json");
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

export async function fetchCreateCandidateCostSet(query?: CreateCandidateCostSetQuery) {
	let events = await _fetchAllCreateCandidateCostSet();

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

async function _fetchAllCreateCandidateCostSet() {
	let path = join(__dirname, "..", "data", "indexer", "CreateCandidateCostSet.json");
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

export async function fetchETHWithdrawn(query?: ETHWithdrawnQuery) {
	let events = await _fetchAllETHWithdrawn();

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

async function _fetchAllETHWithdrawn() {
	let path = join(__dirname, "..", "data", "indexer", "ETHWithdrawn.json");
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

export async function fetchFeeRecipientSet(query?: FeeRecipientSetQuery) {
	let events = await _fetchAllFeeRecipientSet();

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

async function _fetchAllFeeRecipientSet() {
	let path = join(__dirname, "..", "data", "indexer", "FeeRecipientSet.json");
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

export async function fetchFeedbackSentEvents(query?: FeedbackSentQuery) {
	let events = await _fetchAllFeedbackSent();

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

async function _fetchAllFeedbackSent() {
	let path = join(__dirname, "..", "data", "indexer", "FeedbackSent.json");
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

async function _fetchAllOwnershipTransferred() {
	let path = join(__dirname, "..", "data", "indexer", "OwnershipTransferred.json");
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

export async function fetchProposalCandidateCanceled(query?: ProposalCandidateCanceledQuery) {
	let events = await _fetchAllProposalCandidateCanceled();

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

async function _fetchAllProposalCandidateCanceled() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalCandidateCanceled.json");
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

export async function fetchProposalCandidateCreatedEvents(query?: ProposalCandidateCreatedQuery) {
	let events = await _fetchAllProposalCandidateCreated();

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

async function _fetchAllProposalCandidateCreated() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalCandidateCreated.json");
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

export async function fetchProposalCandidateUpdated(query?: ProposalCandidateUpdatedQuery) {
	let events = await _fetchAllProposalCandidateUpdated();

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

async function _fetchAllProposalCandidateUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "ProposalCandidateUpdated.json");
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

export async function fetchSignatureAddedEvents(query?: SignatureAddedQuery) {
	let events = await _fetchAllSignatureAdded();

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

async function _fetchAllSignatureAdded() {
	let path = join(__dirname, "..", "data", "indexer", "SignatureAdded.json");
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

export async function fetchUpdateCandidateCostSet(query?: UpdateCandidateCostSetQuery) {
	let events = await _fetchAllUpdateCandidateCostSet();

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

async function _fetchAllUpdateCandidateCostSet() {
	let path = join(__dirname, "..", "data", "indexer", "UpdateCandidateCostSet.json");
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

export async function fetchUpgraded(query?: UpgradedQuery) {
	let events = await _fetchAllUpgraded();

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

async function _fetchAllUpgraded() {
	let path = join(__dirname, "..", "data", "indexer", "Upgraded.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsDAOData.Upgraded[] = JSON.parse(proposalFile);
	return proposals;
}
