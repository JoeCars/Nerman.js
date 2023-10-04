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
