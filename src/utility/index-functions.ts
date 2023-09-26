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

export async function getProposals(query: ProposalQuery | undefined) {
	if (!query) {
		return _getAllProposals();
	} else if (query.startBlock || query.endBlock) {
		if (!query.startBlock) {
			query.startBlock = NOUNS_STARTING_BLOCK;
		}
		if (!query.endBlock) {
			query.endBlock = Infinity;
		}
		return _getProposalsByBlock(query.startBlock, query.endBlock);
	} else if (query.startId || query.endId) {
		if (!query.startId) {
			query.startId = 0;
		}
		if (!query.endId) {
			query.endId = Infinity;
		}
		return _getProposalsById(query.startId, query.endId);
	} else if (query.id) {
		return _getProposalsById(query.id);
	} else if (query.status) {
		return _getProposalsByStatus(query.status);
	} else if (query.proposer) {
		return _getProposalByProposer(query.proposer);
	} else {
		throw new Error("Really Helpful Error Message");
	}
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
async function _getProposalsByBlock(startBlock: number, endBlock: number) {
	let proposals = await _getAllProposals();
	let filteredProposals = proposals.filter((proposal) => {
		return proposal.blockNumber >= startBlock && proposal.blockNumber <= endBlock;
	});
	return filteredProposals;
}

/**
 * @param startId The starting block. Inclusive.
 * @param endId The final block. Inclusive.
 */
async function _getProposalsById(startId: number, endId?: number) {
	if (endId === undefined) {
		endId = startId;
	}

	let proposals = await _getAllProposals();
	let filteredProposals = proposals.filter((proposal) => {
		return proposal.id >= startId && proposal.id <= (endId as number);
	});
	return filteredProposals;
}

async function _getProposalByProposer(proposer: string) {
	let proposals = await _getAllProposals();
	let filteredProposals = proposals.filter((proposal) => {
		return proposal.proposer === proposer;
	});
	return filteredProposals;
}

async function _getProposalsByStatus(status: string) {
	let statuses = await _getAllStatusChange();
	let newestProposalStatuses = new Map<number, { blockNumber: number; status: string }>();
	for (let status of statuses) {
		let storedStatus = newestProposalStatuses.get(status.proposalId);
		if (!storedStatus || storedStatus.blockNumber < status.blockNumber) {
			newestProposalStatuses.set(Number(status.proposalId), { blockNumber: status.blockNumber, status: status.status });
		}
	}

	let proposals = await _getAllProposals();
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
