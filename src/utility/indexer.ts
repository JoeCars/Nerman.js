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
		let events = await nouns.NounsToken.Contract.queryFilter(
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
	let output = `${eventName} |`;
	let bar = "";
	for (let i = 0; i < currentPercent; ++i) {
		bar += "█";
	}
	for (let i = currentPercent; bar.length < 100; ++i) {
		bar += " ";
	}
	output += `${bar}| ${currentPercent}%`;
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

function parseAuctionCreatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(`${event.args!.nounId}`),
		startTime: Number(`${event.args!.startTime}`),
		endTime: Number(`${event.args!.endTime}`)
	};
}

function parseAuctionBidEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(`${event.args!.nounId}`),
		bidderAddress: event.args!.sender,
		bidAmount: Number(`${event.args!.value}`),
		extended: event.args!.extended
	};
}

function parseAuctionExtendedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(`${event.args!.nounId}`),
		endTime: Number(`${event.args!.endTime}`)
	};
}

function parseAuctionSettledEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(`${event.args!.nounId}`),
		winnerAddress: `${event.args!.winner}`,
		bidAmount: Number(`${event.args!.amount}`)
	};
}

function parseAuctionTimeBufferUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		timeBuffer: Number(`${event.args!.timeBuffer}`)
	};
}

function parseAuctionReservePriceUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		reservePrice: Number(`${event.args!.reservePrice}`)
	};
}

function parseAuctionMinBidIncrementPercentageUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		minBidIncrementPercentage: Number(`${event.args!.minBidIncrementPercentage}`)
	};
}

function parseDelegateChangedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		delegator: event.args!.delegator,
		fromDelegate: event.args!.fromDelegate,
		toDelegate: event.args!.toDelegate
	};
}

function parseDelegateVotesChangedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		delegate: event.args!.delegate,
		previousBalance: Number(`${event.args!.previousBalance}`),
		newBalance: Number(`${event.args!.newBalance}`)
	};
}

function parseTransferEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		from: event.args!.from,
		to: event.args!.to,
		tokenId: Number(`${event.args!.tokenId}`)
	};
}

function parseApprovalEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		owner: event.args!.owner,
		approved: event.args!.approved,
		tokenId: Number(`${event.args!.tokenId}`)
	};
}

function parseApprovalForAllEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		owner: event.args!.owner,
		operator: event.args!.operator,
		approved: event.args!.approved
	};
}

function parseNounCreatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		tokenId: Number(`${event.args!.tokenId}`),
		seed: {
			background: Number(event.args!.seed.background),
			body: Number(event.args!.seed.body),
			accessory: Number(event.args!.seed.accessory),
			head: Number(event.args!.seed.head),
			glasses: Number(event.args!.seed.glasses)
		}
	};
}

function parseDescriptorLockedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature
	};
}

function parseDescriptorUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		descriptor: event.args!._descriptor
	};
}

function parseMinterLockedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature
	};
}

function parseMinterUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		minter: event.args!._minter
	};
}

getEvents("MinterUpdated", parseMinterUpdatedEvent).catch((error) => {
	console.error("Received an error.", error);
});
