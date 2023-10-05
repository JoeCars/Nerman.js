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

async function _getAllDelegateChanged() {
	let path = join(__dirname, "..", "data", "index", "DelegateChanged.json");
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
		events = _filterByBlock(events, query.startBlock, query.endBlock) as Indexer.NounsToken.DelegateVotesChanged[];
	}

	if (query.delegate) {
		events = events.filter((event) => {
			return event.delegate === query.delegate;
		});
	}

	return events;
}

async function _getAllDelegateVotesChanged() {
	let path = join(__dirname, "..", "data", "index", "DelegateVotesChanged.json");
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

async function _getAllTransfer() {
	let path = join(__dirname, "..", "data", "index", "Transfer.json");
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

export async function getApproval(query?: ApprovalQuery) {
	let events = await _getAllApproval();

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

async function _getAllApproval() {
	let path = join(__dirname, "..", "data", "index", "Approval.json");
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

export async function getApprovalForAll(query?: ApprovalForAllQuery) {
	let events = await _getAllApprovalForAll();

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

async function _getAllApprovalForAll() {
	let path = join(__dirname, "..", "data", "index", "ApprovalForAll.json");
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

async function _getAllNounCreated() {
	let path = join(__dirname, "..", "data", "index", "NounCreated.json");
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

export async function getDescriptorLocked(query?: DescriptorLockedQuery) {
	let events = await _getAllDescriptorLocked();

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

async function _getAllDescriptorLocked() {
	let path = join(__dirname, "..", "data", "index", "DescriptorLocked.json");
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

export async function getDescriptorUpdated(query?: DescriptorUpdatedQuery) {
	let events = await _getAllDescriptorUpdated();

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

async function _getAllDescriptorUpdated() {
	let path = join(__dirname, "..", "data", "index", "DescriptorUpdated.json");
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

export async function getMinterLocked(query?: MinterLockedQuery) {
	let events = await _getAllMinterLocked();

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

async function _getAllMinterLocked() {
	let path = join(__dirname, "..", "data", "index", "MinterLocked.json");
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

export async function getMinterUpdated(query?: MinterUpdatedQuery) {
	let events = await _getAllMinterUpdated();

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

async function _getAllMinterUpdated() {
	let path = join(__dirname, "..", "data", "index", "MinterUpdated.json");
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

export async function getNounBurned(query?: NounBurnedQuery) {
	let events = await _getAllNounBurned();

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

async function _getAllNounBurned() {
	let path = join(__dirname, "..", "data", "index", "NounBurned.json");
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

export async function getNoundersDAOUpdated(query?: NoundersDAOUpdatedQuery) {
	let events = await _getAllNoundersDAOUpdated();

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

async function _getAllNoundersDAOUpdated() {
	let path = join(__dirname, "..", "data", "index", "NoundersDAOUpdated.json");
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

async function _getAllOwnershipTransferred() {
	let path = join(__dirname, "..", "data", "index", "OwnershipTransferred.json");
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

export async function getSeederLocked(query?: SeederLockedQuery) {
	let events = await _getAllSeederLocked();

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

async function _getAllSeederLocked() {
	let path = join(__dirname, "..", "data", "index", "SeederLocked.json");
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

export async function getSeederUpdated(query?: SeederUpdatedQuery) {
	let events = await _getAllSeederUpdated();

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

async function _getAllSeederUpdated() {
	let path = join(__dirname, "..", "data", "index", "SeederUpdated.json");
	let proposalFile = await readFile(path, { encoding: "utf8" });
	let proposals: Indexer.NounsToken.SeederUpdated[] = JSON.parse(proposalFile);
	return proposals;
}
