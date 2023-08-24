import { ethers } from "ethers";
import { writeFile, readFile } from "fs/promises";

import * as nerman from "../index";
import { _NounsAuctionHouse } from "../contracts/NounsAuctionHouse";
import { _NounsDAO } from "../contracts/NounsDAO";
import { _NounsToken } from "../contracts/NounsToken";
import { NOUNS_AUCTION_PARSERS, NOUNS_TOKEN_PARSERS, NOUNS_DAO_PARSERS } from "./index-parsers";

const NOUNS_STARTING_BLOCK = 13072753;

//===================================
// Indexers.
//===================================

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
	process.stdout.write('\r' + output);
}

function printEnd(eventName: string) {
	process.stdout.clearLine(0); // 0 clears the entire line.
	process.stdout.write(`\rFinished indexing ${eventName}!\n`);
}

export async function indexEvent(contract: ethers.Contract, eventName: string, formatter: Function, path: string) {
	const BLOCK_BATCH_SIZE = 1000;
	const startBlock = NOUNS_STARTING_BLOCK;
	const endBlock = await contract.provider.getBlockNumber();

	let allEvents: ethers.Event[] = [];
	for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += BLOCK_BATCH_SIZE) {
		let events = await contract.queryFilter(
			eventName,
			currentBlock,
			Math.min(currentBlock + BLOCK_BATCH_SIZE, endBlock)
		);

		events = events.map(event => {return formatter(event)});
		
		allEvents.push(...events);
		printProgress(currentBlock, startBlock, endBlock, eventName);
	}
	await writeFile(path, JSON.stringify(allEvents));
	printEnd(eventName);
}


async function indexNounsAuctionEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	const nouns = new _NounsAuctionHouse(provider);

	const events = [...NOUNS_AUCTION_PARSERS.entries()];
	for (let i = 0; i < events.length; ++i) {
		const [eventName, formatter] = events[i];
		await indexEvent(nouns.Contract, eventName, formatter, `${directoryPath}/${eventName}.json`);
	}
}

async function indexNounsDaoEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	const nouns = new _NounsDAO(provider);

	const events = [...NOUNS_DAO_PARSERS.entries()];
	for (let i = 0; i < events.length; ++i) {
		const [eventName, formatter] = events[i];
		await indexEvent(nouns.Contract, eventName, formatter, `${directoryPath}/${eventName}.json`);
	}
}

async function indexNounsTokenEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	const nouns = new _NounsToken(provider);

	const events = [...NOUNS_TOKEN_PARSERS.entries()];
	for (let i = 0; i < events.length; ++i) {
		const [eventName, formatter] = events[i];
		await indexEvent(nouns.Contract, eventName, formatter, `${directoryPath}/${eventName}.json`);
	}
}

export async function indexNounsEvents(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
	await indexNounsAuctionEvents(provider, directoryPath);
	await indexNounsDaoEvents(provider, directoryPath);
	await indexNounsTokenEvents(provider, directoryPath);
}

//===================================
// Persistent Listeners
//===================================

async function parseData(data: { event: ethers.Event }, formatter: Function, path: string) {
	const formattedData = formatter(data);
	const file = await readFile(path + data.event.event);
	const events = JSON.parse(file.toString());
	events.push(formattedData);
	await writeFile(path + data.event.event, events);
	// TODO: Handle edge cases.
}

function listenForNounsAuctionEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	const nouns = new _NounsAuctionHouse(provider);

	NOUNS_AUCTION_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => {
			parseData(data, formatter, path);
		});
	});
}

function listenForNounsDAOEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	const nouns = new _NounsDAO(provider);

	NOUNS_DAO_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => {
			parseData(data, formatter, path);
		});
	});
}

function listenForNounsTokenEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	const nouns = new _NounsToken(provider);

	NOUNS_TOKEN_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => {
			parseData(data, formatter, path);
		});
	});
}

export function listenForNounsEvents(provider: ethers.providers.JsonRpcProvider, path: string) {
	listenForNounsAuctionEvents(provider, path);
	listenForNounsDAOEvents(provider, path);
	listenForNounsTokenEvents(provider, path);
}
