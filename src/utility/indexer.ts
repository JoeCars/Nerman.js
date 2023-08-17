import { ethers } from "ethers";
import * as nerman from "../index";
import { appendFile } from "fs/promises";

const NOUNS_STARTING_BLOCK = 13072753;

async function getEvents(eventName: string, parser: (event: ethers.Event) => object, startingBlock = NOUNS_STARTING_BLOCK) {
	const filePath = `../data/index/${eventName}.json`;

	const nouns = new nerman.Nouns(process.env.ALCHEMY_URL);

	let currentBlock = await nouns.provider.getBlockNumber();

	const BLOCK_BATCH_SIZE = 2000;

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
	}

	await appendFile(filePath, "]");

	console.log("DONE!");
}

getEvents(process.env.NOUNS_EVENT as string, (event) => {
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
}).catch((error) => {
	console.error("Received an error.", error);
});
