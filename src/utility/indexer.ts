import { ethers } from "ethers";
import * as nerman from "../index";
import { appendFile } from "fs/promises";

const NOUNS_STARTING_BLOCK = 13072753;

async function getEvents(eventName: string, parser: (event: ethers.Event) => object, startingBlock = NOUNS_STARTING_BLOCK) {
	const filePath = `${__dirname}/../data/index/${eventName}.json`;

	const nouns = new nerman.Nouns(process.env.ALCHEMY_URL);

	let currentBlock = await nouns.provider.getBlockNumber();

	const BLOCK_BATCH_SIZE = 1000;

	await appendFile(filePath, "[");
	let counter = 0;
	for (let block = startingBlock; block <= currentBlock; block += BLOCK_BATCH_SIZE) {
		let events = await nouns.NounsDAO.Contract.queryFilter(
			eventName,
			block,
			Math.min(block + BLOCK_BATCH_SIZE, currentBlock)
		);

		counter += events.length;

		for (let i = 0; i < events.length; ++i) {
			let event = events[i];

			const info = parser(event);

			await appendFile(filePath, JSON.stringify(info));
			await appendFile(filePath, ",");
		}

		printProgress(block, startingBlock, currentBlock, eventName);
	}

	await appendFile(filePath, "]");

	console.log("DONE!");
}

function printProgress(currentBlock: number, startingBlock: number, endingBlock: number, eventName: string) {
	let currentPercent = Math.round((100 * (currentBlock - startingBlock)) / (endingBlock - startingBlock));
	let output = `\r${eventName} |`;
	for (let i = 0; i < currentPercent; ++i) {
		output += "█";
	}
	for (let i = currentPercent; output.length < 101; ++i) {
		output += " ";
	}
	output += `| ${currentPercent}%`;
	console.clear();
	console.log(output);
}

function parseProposalCreatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		id: `${event.args!.id}`,
		proposer: event.args!.proposer,
		startBlock: `${event.args!.startBlock}`,
		endBlock: `${event.args!.endBlock}`,
		proposalThreshold: `${event.args!.proposalThreshold}`,
		quorumVotes: `${event.args!.quorumVotes}`,
		description: event.args!.description,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas
	};
}

function parseVoteCastEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		voterAddress: event.args!.voter,
		proposalId: `${event.args!.proposalId}`,
		support: event.args!.support,
		supportChoice: ["AGAINST", "FOR", "ABSTAIN"][event.args!.support],
		votes: `${event.args!.votes}`,
		reason: event.args!.reason
	};
}

function parseProposalCanceledEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: `${event.args!.id}`,
		status: "Cancelled"
	};
}

function parseProposalQueuedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: `${event.args!.id}`,
		eta: `${event.args!.eta}`,
		status: "Queued"
	};
}

function parseProposalExecutedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: `${event.args!.id}`,
		status: "Executed"
	};
}

function parseProposalVetoedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: `${event.args!.id}`,
		status: "Vetoed"
	};
}

function parseVotingDelaySetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldVotingDelay: `${event.args!.oldVotingDelay}`,
		newVotingDelay: `${event.args!.newVotingDelay}`
	};
}

function parseVotingPeriodSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldVotingPeriod: `${event.args!.oldVotingPeriod}`,
		newVotingPeriod: `${event.args!.newVotingPeriod}`
	};
}

function parseNewImplementationEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldImplementation: `${event.args!.oldImplementation}`,
		newImplementation: `${event.args!.newImplementation}`
	};
}

function parseNewPendingAdminEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldPendingAdmin: `${event.args!.oldPendingAdmin}`,
		newPendingAdmin: `${event.args!.newPendingAdmin}`
	};
}

function parseNewAdminEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldAdmin: `${event.args!.oldAdmin}`,
		newAdmin: `${event.args!.newAdmin}`
	};
}

getEvents("NewAdmin", parseNewAdminEvent).catch((error) => {
	console.error("Received an error.", error);
});
