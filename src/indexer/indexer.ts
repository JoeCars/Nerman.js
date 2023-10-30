import { ethers } from "ethers";
import { writeFile, readFile } from "fs/promises";
import { NOUNS_STARTING_BLOCK } from "../constants";

//===================================
// Indexers.
//===================================

/**
 * Finds every instance of the event triggering on the blockchain until the present block, and saves the result to a file.
 * @param contract the contract the event is in.
 * @param eventName the name of the event being indexed.
 * @param parser a parsing function that takes the raw blockchain event object and formats it into the desired JavaScript object.
 * @param directoryPath The indexer directory.
 * @param [startBlock=NOUNS_STARTING_BLOCK] the starting block of the indexer.
 * @param [isUpdating=false] if true, appends results to the existing file.
 */
export async function indexEvent(
	contract: ethers.Contract,
	eventName: string,
	parser: Function,
	directoryPath: string,
	startBlock = NOUNS_STARTING_BLOCK,
	isUpdating = false
) {
	const BLOCK_BATCH_SIZE = 1000;
	const endBlock = await contract.provider.getBlockNumber();
	const filePath = `${directoryPath}/${eventName}.json`;

	let allEvents: ethers.Event[] = [];
	if (isUpdating) {
		const file = await readFile(filePath);
		allEvents = JSON.parse(file.toString());
	}
	for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += BLOCK_BATCH_SIZE) {
		let events = await contract.queryFilter(eventName, currentBlock, Math.min(currentBlock + BLOCK_BATCH_SIZE, endBlock));

		events = events.map((event) => {
			return parser(event);
		});

		allEvents.push(...events);
	}
	await writeFile(filePath, JSON.stringify(allEvents));
}

//===================================
// Persistent Listeners
//===================================

/**
 * Parses data, applying formatters, and saves it in the given file.
 * @param data a blockchain data object.
 * @param parser a formatter function.
 * @param directoryPath the path to the indexer directory.
 */
async function parseData(data: { event: ethers.Event }, parser: Function, directoryPath: string) {
	const filePath = `${directoryPath}/${data.event.event}.json`;
	const formattedData = parser(data);
	const file = await readFile(filePath);
	const events = JSON.parse(file.toString());
	events.push(formattedData);
	await writeFile(filePath, events);
}

/**
 * Creates a persistent listener which updates the index as events occur on chain.
 * @param contract the contract the event is in.
 * @param event the event name.
 * @param parser the parser that formats event data.
 * @param directoryPath the path to the indexer directory.
 */
export async function listenForEvent(contract: ethers.Contract, event: string, parser: Function, directoryPath: string) {
	contract.on(event, (data) => {
		parseData(data, parser, directoryPath);
	});
}

//===================================
// Update Functions
//===================================

/**
 * Finds the newest block that has been indexed for the event.
 * @param event the event name
 * @param directoryPath indexer directory path
 * @returns the newest block number
 */
async function retrieveLatestBlock(event: string, directoryPath: string) {
	const filePath = `${directoryPath}/${event}.json`;
	const file = await readFile(filePath);
	const events = JSON.parse(file.toString());

	if (events.length === 0) {
		return NOUNS_STARTING_BLOCK;
	}

	const newestEvent = events[events.length - 1];
	// The block has already been indexed, so we return the next one. Hence + 1.
	return (newestEvent.blockNumber + 1) as number;
}

/**
 * Updates the indexed events.
 * @param contract the event contract
 * @param event the event name
 * @param formatter the event formatter
 * @param directoryPath the directory path to the indexed data
 */
export async function updateIndexedEvent(contract: ethers.Contract, event: string, formatter: Function, directoryPath: string) {
	const latestBlockNumber = await retrieveLatestBlock(event, directoryPath);
	indexEvent(contract, event, formatter, directoryPath, latestBlockNumber, true);
}
