import { ethers } from "ethers";
import { writeFile, readFile } from "fs/promises";

import { _NounsAuctionHouse } from "../contracts/NounsAuctionHouse";
import { _NounsDAO } from "../contracts/NounsDAO";
import { _NounsToken } from "../contracts/NounsToken";
import { _NounsDAOData } from "../contracts/NounsDAOData";
import { NOUNS_AUCTION_PARSERS, NOUNS_TOKEN_PARSERS, NOUNS_DAO_PARSERS, NOUNS_DATA_PARSERS } from "./index-parsers";
import { NOUNS_STARTING_BLOCK } from "../constants";

//===================================
// Indexers.
//===================================

/**
 * Prints a progress bar to `stdout` to show the state of indexing.
 */
function printProgress(currentBlock: number, startBlock: number, endBlock: number, eventName: string) {
	let currentPercent = Math.round((100 * (currentBlock - startBlock)) / (endBlock - startBlock));
	let output = `${eventName} |`;
	let bar = "";
	for (let i = 0; i < currentPercent; ++i) {
		bar += "█";
	}
	for (let i = currentPercent; bar.length < 100; ++i) {
		bar += " ";
	}
	output += `${bar}| ${currentPercent}%`;
	process.stdout.write("\r" + output);
}

/**
 * Prints a message to `stdout`, indicating that it has finished indexing an event.
 */
function printEnd(eventName: string) {
	process.stdout.clearLine(0); // 0 clears the entire line.
	process.stdout.write(`\rFinished indexing ${eventName}!\n`);
}

/**
 * Indexes the given event from the start block of Nouns until the current block. Then saves the results as a JSON file.
 * @param contract The contract the event is in.
 * @param eventName The name of the event being indexed.
 * @param formatter A formatting function that takes the raw blockchain event object and formats it into the desired JavaScript object.
 * @param path The file to write the JSON content to.
 */
export async function indexEvent(contract: ethers.Contract, eventName: string, formatter: Function, path: string) {
	const BLOCK_BATCH_SIZE = 1000;
	const startBlock = NOUNS_STARTING_BLOCK;
	const endBlock = await contract.provider.getBlockNumber();

	let allEvents: ethers.Event[] = [];
	for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += BLOCK_BATCH_SIZE) {
		let events = await contract.queryFilter(eventName, currentBlock, Math.min(currentBlock + BLOCK_BATCH_SIZE, endBlock));

		events = events.map((event) => {
			return formatter(event);
		});

		allEvents.push(...events);
		printProgress(currentBlock, startBlock, endBlock, eventName);
	}
	await writeFile(path, JSON.stringify(allEvents));
	printEnd(eventName);
}

/**
 * Indexes all NounsAuction events.
 * @param provider The provider used for indexing.
 * @param directoryPath The directory path where all this information is saved.
 */
async function indexNounsAuctionEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	const nouns = new _NounsAuctionHouse(provider);

	const events = [...NOUNS_AUCTION_PARSERS.entries()];
	for (let i = 0; i < events.length; ++i) {
		const [eventName, formatter] = events[i];
		await indexEvent(nouns.Contract, eventName, formatter, `${directoryPath}/${eventName}.json`);
	}
}

/**
 * Indexes all NounsDAO events.
 * @param provider The provider used for indexing.
 * @param directoryPath The directory path where all this information is saved.
 */
async function indexNounsDaoEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	const nouns = new _NounsDAO(provider);

	const events = [...NOUNS_DAO_PARSERS.entries()];
	for (let i = 0; i < events.length; ++i) {
		const [eventName, formatter] = events[i];
		await indexEvent(nouns.Contract, eventName, formatter, `${directoryPath}/${eventName}.json`);
	}
}

/**
 * Indexes all NounsToken events.
 * @param provider The provider used for indexing.
 * @param directoryPath The directory path where all this information is saved.
 */
async function indexNounsTokenEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	const nouns = new _NounsToken(provider);

	const events = [...NOUNS_TOKEN_PARSERS.entries()];
	for (let i = 0; i < events.length; ++i) {
		const [eventName, formatter] = events[i];
		await indexEvent(nouns.Contract, eventName, formatter, `${directoryPath}/${eventName}.json`);
	}
}

/**
 * Indexes all NounsDAOData events.
 * @param provider The provider used for indexing.
 * @param directoryPath The directory path where all this information is saved.
 */
async function indexNounsDaoDataEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	const nouns = new _NounsDAOData(provider);

	const events = [...NOUNS_DATA_PARSERS.entries()];
	for (let i = 0; i < events.length; ++i) {
		const [eventName, formatter] = events[i];
		await indexEvent(nouns.Contract, eventName, formatter, `${directoryPath}/${eventName}.json`);
	}
}

/**
 * Indexes all nouns events from the NounsAuction, NounsDAO, NounsToken, and NounsDAOData contracts.
 * @param provider The provider used for indexing.
 * @param directoryPath The directory path where all this information is saved.
 */
export async function indexNounsEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	await indexNounsAuctionEvents(provider, directoryPath);
	await indexNounsDaoEvents(provider, directoryPath);
	await indexNounsTokenEvents(provider, directoryPath);
	await indexNounsDaoDataEvents(provider, directoryPath);
}

//===================================
// Persistent Listeners
//===================================

/**
 * Parses data, applying formatters, and saves it in the given file.
 * @param data A blockchain data object.
 * @param formatter A formatter function.
 * @param path The path to the file.
 */
async function parseData(data: { event: ethers.Event }, formatter: Function, path: string) {
	const formattedData = formatter(data);
	const file = await readFile(path + data.event.event);
	const events = JSON.parse(file.toString());
	events.push(formattedData);
	await writeFile(path + data.event.event, events);
}

/**
 * Assigns listeners to all NounsAuction events, updating the index data accordingly.
 * @param provider The provider.
 * @param path The path to the data.
 */
function listenForNounsAuctionEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	const nouns = new _NounsAuctionHouse(provider);

	NOUNS_AUCTION_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => {
			parseData(data, formatter, path);
		});
	});
}

/**
 * Assigns listeners to all NounsDAO events, updating the index data accordingly.
 * @param provider The provider.
 * @param path The path to the data.
 */
function listenForNounsDAOEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	const nouns = new _NounsDAO(provider);

	NOUNS_DAO_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => {
			parseData(data, formatter, path);
		});
	});
}

/**
 * Assigns listeners to all NounsToken events, updating the index data accordingly.
 * @param provider The provider.
 * @param path The path to the data.
 */
function listenForNounsTokenEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	const nouns = new _NounsToken(provider);

	NOUNS_TOKEN_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => {
			parseData(data, formatter, path);
		});
	});
}

/**
 * Assigns listeners to all NounsDAOData events, updating the index data accordingly.
 * @param provider The provider.
 * @param path The path to the data.
 */
function listenForNounsDaoDataEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	const nouns = new _NounsDAOData(provider);

	NOUNS_DATA_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => {
			parseData(data, formatter, path);
		});
	});
}

/**
 * Assigns listeners to all nouns events in the NounsAuction, NounsDAO, NounsToken, and NounsDAOData contracts.
 * @param provider The provider.
 * @param path The path to the data.
 */
export function listenForNounsEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	listenForNounsAuctionEvents(provider, path);
	listenForNounsDAOEvents(provider, path);
	listenForNounsTokenEvents(provider, path);
	listenForNounsDaoDataEvents(provider, path);
}
