import { ethers } from "ethers";
import { writeFile, readFile } from "fs/promises";

import * as nerman from "../index";
import { _NounsAuctionHouse } from "../contracts/NounsAuctionHouse";
import { _NounsDAO } from "../contracts/NounsDAO";
import { _NounsToken } from "../contracts/NounsToken";
import { NOUNS_AUCTION_PARSERS, NOUNS_TOKEN_PARSERS, NOUNS_DAO_PARSERS } from "./index-parsers";

const NOUNS_STARTING_BLOCK = 13072753;

export async function getEvents(eventName: string, parser: (event: ethers.Event) => object, startingBlock = NOUNS_STARTING_BLOCK) {
	const filePath = `${__dirname}/../data/index/${eventName}.json`;

	const nouns = new nerman.Nouns(process.env.ALCHEMY_URL);

	let currentBlock = await nouns.provider.getBlockNumber();

	const BLOCK_BATCH_SIZE = 1000;

	let allEvents = [];
	for (let block = startingBlock; block <= currentBlock; block += BLOCK_BATCH_SIZE) {
		let events = await nouns.NounsDAO.Contract.queryFilter(
			eventName,
			block,
			Math.min(block + BLOCK_BATCH_SIZE, currentBlock)
		);

		for (let i = 0; i < events.length; ++i) {
			let event = events[i];

			const info = parser(event);
			allEvents.push(info);
		}

		printProgress(block, startingBlock, currentBlock, eventName);
	}

	await writeFile(filePath, JSON.stringify(allEvents));
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

async function parseData(data: { event: ethers.Event }, formatter: Function, path: string) {
	const formattedData = formatter(data);
	const file = await readFile(path + data.event.event);
	const events = JSON.parse(file.toString());
	events.push(formattedData);
	await writeFile(path + data.event.event, events);
	// TODO: Handle edge cases.
}

function listenForNounsAuctionEvents(JsonRPCUrl: string, path: string) {
	const provider = new ethers.providers.JsonRpcProvider(JsonRPCUrl);
	provider.pollingInterval = 30000;

	const nouns = new _NounsAuctionHouse(provider);

	NOUNS_AUCTION_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => formatter(data.event));
	});
}

function listenForNounsDAOEvents(JsonRPCUrl: string, path: string) {
	const provider = new ethers.providers.JsonRpcProvider(JsonRPCUrl);
	provider.pollingInterval = 30000;

	const nouns = new _NounsDAO(provider);

	NOUNS_DAO_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => formatter(data.event));
	});
}

function listenForNounsTokenEvents(JsonRPCUrl: string, path: string) {
	const provider = new ethers.providers.JsonRpcProvider(JsonRPCUrl);
	provider.pollingInterval = 30000;

	const nouns = new _NounsToken(provider);

	NOUNS_TOKEN_PARSERS.forEach((formatter, event) => {
		nouns.on(event, (data: { event: ethers.Event }) => {
			parseData(data, formatter, path);
		});
	});
}

export function listenForNounsEvents(JsonRpcUrl: string, path: string) {
	listenForNounsAuctionEvents(JsonRpcUrl, path);
	listenForNounsDAOEvents(JsonRpcUrl, path);
	listenForNounsTokenEvents(JsonRpcUrl, path);
}

