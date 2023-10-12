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

export async function fetchDelegateChangedEvents(query?: DelegateChangedQuery) {
	let events = await _fetchAllDelegateChanged();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DelegateChanged[];
	}

	if (query.delegator) {
		events = events.filter((event) => {
			return event.delegator === query.delegator;
		});
	}

	if (query.fromDelegate) {
		events = events.filter((event) => {
			return event.fromDelegate === query.fromDelegate;
		});
	}

	if (query.toDelegate) {
		events = events.filter((event) => {
			return event.toDelegate === query.toDelegate;
		});
	}

	if (query.involving) {
		events = events.filter((event) => {
			let isDelegator = event.delegator === query.involving;
			let isFromDelegate = event.fromDelegate === query.involving;
			let isToDelegate = event.toDelegate === query.involving;
			return isDelegator || isFromDelegate || isToDelegate;
		});
	}

	return events;
}

async function _fetchAllDelegateChanged() {
	let path = join(__dirname, "..", "data", "indexer", "DelegateChanged.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.DelegateChanged[] = JSON.parse(file);
	return events;
}

// ==================================
// DelegateVotesChanged
// ==================================

interface DelegateVotesChangedQuery {
	startBlock?: number;
	endBlock?: number;
	delegate?: string;
}

export async function fetchDelegateVotesChangedEvents(query?: DelegateVotesChangedQuery) {
	let events = await _fetchAllDelegateVotesChanged();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DelegateVotesChanged[];
	}

	if (query.delegate) {
		events = events.filter((event) => {
			return event.delegate === query.delegate;
		});
	}

	return events;
}

async function _fetchAllDelegateVotesChanged() {
	let path = join(__dirname, "..", "data", "indexer", "DelegateVotesChanged.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.DelegateVotesChanged[] = JSON.parse(file);
	return events;
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

export async function fetchTransferEvents(query?: TransferQuery) {
	let events = await _fetchAllTransfer();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.Transfer[];
	}

	if (query.from) {
		events = events.filter((event) => {
			return event.from === query.from;
		});
	}

	if (query.to) {
		events = events.filter((event) => {
			return event.to === query.to;
		});
	}

	if (query.involved) {
		events = events.filter((event) => {
			let isFrom = event.from === query.involved;
			let isTo = event.to === query.involved;
			return isFrom || isTo;
		});
	}

	if (query.tokenId !== undefined) {
		events = events.filter((event) => {
			return event.tokenId === query.tokenId;
		});
	}

	return events;
}

async function _fetchAllTransfer() {
	let path = join(__dirname, "..", "data", "indexer", "Transfer.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.Transfer[] = JSON.parse(file);
	return events;
}

// ==================================
// Approval
// ==================================

interface ApprovalQuery {
	startBlock?: number;
	endBlock?: number;
	owner?: string;
	tokenId?: number;
}

export async function fetchApproval(query?: ApprovalQuery) {
	let events = await _fetchAllApproval();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.Approval[];
	}

	if (query.owner) {
		events = events.filter((event) => {
			return event.owner === query.owner;
		});
	}

	if (query.tokenId !== undefined) {
		events = events.filter((event) => {
			return event.tokenId === query.tokenId;
		});
	}

	return events;
}

async function _fetchAllApproval() {
	let path = join(__dirname, "..", "data", "indexer", "Approval.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.Approval[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// ApprovalForAll
// ==================================

interface ApprovalForAllQuery {
	startBlock?: number;
	endBlock?: number;
	owner?: string;
}

export async function fetchApprovalForAll(query?: ApprovalForAllQuery) {
	let events = await _fetchAllApprovalForAll();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.ApprovalForAll[];
	}

	if (query.owner) {
		events = events.filter((event) => {
			return event.owner === query.owner;
		});
	}

	return events;
}

async function _fetchAllApprovalForAll() {
	let path = join(__dirname, "..", "data", "indexer", "ApprovalForAll.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.ApprovalForAll[] = JSON.parse(proposalFile);
	return proposals;
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

export async function fetchNounCreatedEvents(query?: NounCreatedQuery) {
	let events = await _fetchAllNounCreated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.NounCreated[];
	}

	if (query.tokenId !== undefined) {
		events = events.filter((event) => {
			return event.tokenId === query.tokenId;
		});
	}

	if (query.background !== undefined) {
		events = events.filter((event) => {
			return event.seed.background === query.background;
		});
	}

	if (query.body !== undefined) {
		events = events.filter((event) => {
			return event.seed.body === query.body;
		});
	}

	if (query.accessory !== undefined) {
		events = events.filter((event) => {
			return event.seed.accessory === query.accessory;
		});
	}

	if (query.head !== undefined) {
		events = events.filter((event) => {
			return event.seed.head === query.head;
		});
	}

	if (query.glasses !== undefined) {
		events = events.filter((event) => {
			return event.seed.glasses === query.glasses;
		});
	}

	return events;
}

async function _fetchAllNounCreated() {
	let path = join(__dirname, "..", "data", "indexer", "NounCreated.json");
	let file = await readFile(path, { encoding: "utf8" });
	let events: Indexer.NounsToken.NounCreated[] = JSON.parse(file);
	return events;
}

// ==================================
// DescriptorLocked
// ==================================

interface DescriptorLockedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchDescriptorLocked(query?: DescriptorLockedQuery) {
	let events = await _fetchAllDescriptorLocked();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DescriptorLocked[];
	}

	return events;
}

async function _fetchAllDescriptorLocked() {
	let path = join(__dirname, "..", "data", "indexer", "DescriptorLocked.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.DescriptorLocked[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// DescriptorUpdated
// ==================================

interface DescriptorUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchDescriptorUpdated(query?: DescriptorUpdatedQuery) {
	let events = await _fetchAllDescriptorUpdated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DescriptorUpdated[];
	}

	return events;
}

async function _fetchAllDescriptorUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "DescriptorUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.DescriptorUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// MinterLocked
// ==================================

interface MinterLockedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchMinterLocked(query?: MinterLockedQuery) {
	let events = await _fetchAllMinterLocked();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.MinterLocked[];
	}

	return events;
}

async function _fetchAllMinterLocked() {
	let path = join(__dirname, "..", "data", "indexer", "MinterLocked.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.MinterLocked[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// MinterUpdated
// ==================================

interface MinterUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchMinterUpdated(query?: MinterUpdatedQuery) {
	let events = await _fetchAllMinterUpdated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.MinterUpdated[];
	}

	return events;
}

async function _fetchAllMinterUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "MinterUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.MinterUpdated[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NounBurned
// ==================================

interface NounBurnedQuery {
	startBlock?: number;
	endBlock?: number;
	nounId?: number;
}

export async function fetchNounBurned(query?: NounBurnedQuery) {
	let events = await _fetchAllNounBurned();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.NounBurned[];
	}

	if (query.nounId !== undefined) {
		events = events.filter((event) => {
			return event.nounId === query.nounId;
		});
	}

	return events;
}

async function _fetchAllNounBurned() {
	let path = join(__dirname, "..", "data", "indexer", "NounBurned.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.NounBurned[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// NoundersDAOUpdated
// ==================================

interface NoundersDAOUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchNoundersDAOUpdated(query?: NoundersDAOUpdatedQuery) {
	let events = await _fetchAllNoundersDAOUpdated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.NoundersDAOUpdated[];
	}

	return events;
}

async function _fetchAllNoundersDAOUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "NoundersDAOUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.NoundersDAOUpdated[] = JSON.parse(proposalFile);
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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.OwnershipTransferred[];
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
	let proposals: Indexer.NounsToken.OwnershipTransferred[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// SeederLocked
// ==================================

interface SeederLockedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchSeederLocked(query?: SeederLockedQuery) {
	let events = await _fetchAllSeederLocked();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.SeederLocked[];
	}

	return events;
}

async function _fetchAllSeederLocked() {
	let path = join(__dirname, "..", "data", "indexer", "SeederLocked.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.SeederLocked[] = JSON.parse(proposalFile);
	return proposals;
}

// ==================================
// SeederUpdated
// ==================================

interface SeederUpdatedQuery {
	startBlock?: number;
	endBlock?: number;
}

export async function fetchSeederUpdated(query?: SeederUpdatedQuery) {
	let events = await _fetchAllSeederUpdated();

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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.SeederUpdated[];
	}

	return events;
}

async function _fetchAllSeederUpdated() {
	let path = join(__dirname, "..", "data", "indexer", "SeederUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.SeederUpdated[] = JSON.parse(proposalFile);
	return proposals;
}
