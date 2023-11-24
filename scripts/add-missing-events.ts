import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { ethers, Contract } from "ethers";

import * as parsers from "../src/utilities/indexer/index-parsers";
import { NOUNS_STARTING_BLOCK } from "../src/constants";
import { _NounsAuctionHouse } from "../src/contracts/NounsAuctionHouse";
import { _NounsDAO } from "../src/contracts/NounsDAO";
import { _NounsDAOData } from "../src/contracts/NounsDAOData";
import { _NounsToken } from "../src/contracts/NounsToken";

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
const nounsAuctionHouse = new _NounsAuctionHouse(provider);
const nounsDao = new _NounsDAO(provider);
const nounsDaoData = new _NounsDAOData(provider);
const nounsToken = new _NounsToken(provider);

const directoryPath = join(__dirname, "..", "src", "data", "indexer");

async function indexMissingEvent(
	contract: Contract,
	eventName: string,
	parser: Function,
	startBlock = NOUNS_STARTING_BLOCK,
	endBlock = 13072752 // 1 less than the previous start.
) {
	const BLOCK_BATCH_SIZE = 1000;
	const filePath = join(directoryPath, `${eventName}.json`);

	const file = await readFile(filePath);
	const data = JSON.parse(file.toString());

	let allEvents: ethers.Event[] = [];
	for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += BLOCK_BATCH_SIZE) {
		let events = await contract.queryFilter(eventName, currentBlock, Math.min(currentBlock + BLOCK_BATCH_SIZE, endBlock));

		events = events.map((event) => {
			return parser(event);
		});

		allEvents.push(...events);
	}

	data.events.unshift(...allEvents);
	
	await writeFile(filePath, JSON.stringify(data));
}

async function main() {
	let nounsParsers = [...parsers.NOUNS_AUCTION_PARSERS.entries()];
	for (let [event, parser] of nounsParsers) {
		await indexMissingEvent(nounsAuctionHouse.Contract, event, parser);
	}
	nounsParsers = [...parsers.NOUNS_DAO_PARSERS.entries()];
	for (let [event, parser] of nounsParsers) {
		await indexMissingEvent(nounsDao.Contract, event, parser);
	}
	nounsParsers = [...parsers.NOUNS_DATA_PARSERS.entries()];
	for (let [event, parser] of nounsParsers) {
		await indexMissingEvent(nounsDaoData.Contract, event, parser);
	}
	nounsParsers = [...parsers.NOUNS_TOKEN_PARSERS.entries()];
	for (let [event, parser] of nounsParsers) {
		await indexMissingEvent(nounsToken.Contract, event, parser);
	}
}

main();
