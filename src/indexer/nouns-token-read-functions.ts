import { readFile } from "fs/promises";
import { join } from "path";
import { Indexer } from "../types";
import { NOUNS_STARTING_BLOCK } from "../constants";
import { _filterByBlock } from "../utilities/indexer";

// ==================================
// DelegateChanged
// ==================================

export async function fetchDelegateChangedEvents(query?: Indexer.NounsToken.DelegateChangedQuery) {
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

export async function fetchDelegateVotesChangedEvents(query?: Indexer.NounsToken.DelegateVotesChangedQuery) {
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

export async function fetchTransferEvents(query?: Indexer.NounsToken.TransferQuery) {
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

export async function fetchApproval(query?: Indexer.NounsToken.ApprovalQuery) {
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

export async function fetchApprovalForAll(query?: Indexer.NounsToken.ApprovalForAllQuery) {
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

export async function fetchNounCreatedEvents(query?: Indexer.NounsToken.NounCreatedQuery) {
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

export async function fetchDescriptorLocked(query?: Indexer.NounsToken.DescriptorLockedQuery) {
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

export async function fetchDescriptorUpdated(query?: Indexer.NounsToken.DescriptorUpdatedQuery) {
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

export async function fetchMinterLocked(query?: Indexer.NounsToken.MinterLockedQuery) {
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

export async function fetchMinterUpdated(query?: Indexer.NounsToken.MinterUpdatedQuery) {
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

export async function fetchNounBurned(query?: Indexer.NounsToken.NounBurnedQuery) {
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

export async function fetchNoundersDAOUpdated(query?: Indexer.NounsToken.NoundersDAOUpdatedQuery) {
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

export async function fetchOwnershipTransferred(query?: Indexer.NounsToken.OwnershipTransferredQuery) {
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

export async function fetchSeederLocked(query?: Indexer.NounsToken.SeederLockedQuery) {
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

export async function fetchSeederUpdated(query?: Indexer.NounsToken.SeederUpdatedQuery) {
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
