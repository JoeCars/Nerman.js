import { ethers } from "ethers";

import * as indexer from "../utilities/indexer/indexer-logic";
import * as parsers from "../utilities/indexer/event-formatters";
import { NounsAuctionHouse } from "../contracts/nouns-dao/NounsAuctionHouse";
import { NounsLogic } from "../contracts/nouns-dao/NounsLogic";
import { NounsData } from "../contracts/nouns-dao/NounsData";
import { NounsToken } from "../contracts/nouns-dao/NounsToken";

/** A class that takes event data from on-chain and writes them to files. */
export class IndexerWriter {
	private path: string;
	private provider: ethers.JsonRpcProvider;
	private nounsAuctionHouse: NounsAuctionHouse;
	private nounsDao: NounsLogic;
	private nounsDaoData: NounsData;
	private nounsToken: NounsToken;

	/**
	 * @param provider provider uses to create wrappers.
	 * @param path directory path to indexer directory, where all files will be stored.
	 */
	public constructor(provider: ethers.JsonRpcProvider | string, path: string) {
		this.path = path;
		this.nounsAuctionHouse = new NounsAuctionHouse(provider);
		this.nounsDao = new NounsLogic(provider);
		this.nounsDaoData = new NounsData(provider);
		this.nounsToken = new NounsToken(provider);

		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}
	}

	/**
	 * Stores all event data from the starting block for nouns to the present.
	 * @param event the event name.
	 */
	public async index(event: string) {
		if (parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.get(event) as Function;
			await indexer.indexEvent(this.nounsAuctionHouse.contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_DAO_FORMATTERS.get(event) as Function;
			await indexer.indexEvent(this.nounsDao.contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_DATA_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_DAO_DATA_FORMATTERS.get(event) as Function;
			await indexer.indexEvent(this.nounsDaoData.contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_TOKEN_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_TOKEN_FORMATTERS.get(event) as Function;
			await indexer.indexEvent(this.nounsToken.contract, this.provider, event, parser, this.path);
		} else {
			throw new Error(`${event} is not supported and cannot be indexed.`);
		}
	}

	/**
	 * Assigns a listener to the contract event, updating the index whenever the event is triggered on-chain.
	 * @param event the event name.
	 */
	public async listen(event: string) {
		if (parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.get(event) as Function;
			indexer.listenForEvent(this.nounsAuctionHouse.contract, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_DAO_FORMATTERS.get(event) as Function;
			indexer.listenForEvent(this.nounsDao.contract, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_DATA_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_DAO_DATA_FORMATTERS.get(event) as Function;
			indexer.listenForEvent(this.nounsDaoData.contract, event, parser, this.path);
		} else if (parsers.NOUNS_TOKEN_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_TOKEN_FORMATTERS.get(event) as Function;
			indexer.listenForEvent(this.nounsToken.contract, event, parser, this.path);
		} else {
			throw new Error(`${event} is not supported and cannot be indexed.`);
		}
	}

	/**
	 * Updates already existing event index. Uses the most recently indexed block number of the event to append more recent events.
	 * @param event the event name.
	 */
	public async update(event: string) {
		if (parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.get(event) as Function;
			await indexer.updateIndexedEvent(this.nounsAuctionHouse.contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_DAO_FORMATTERS.get(event) as Function;
			await indexer.updateIndexedEvent(this.nounsDao.contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_DATA_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_DAO_DATA_FORMATTERS.get(event) as Function;
			await indexer.updateIndexedEvent(this.nounsDaoData.contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_TOKEN_FORMATTERS.get(event)) {
			const parser = parsers.NOUNS_TOKEN_FORMATTERS.get(event) as Function;
			await indexer.updateIndexedEvent(this.nounsToken.contract, this.provider, event, parser, this.path);
		} else {
			throw new Error(`${event} is not supported and cannot be indexed.`);
		}
	}

	/** Stores all event data from the starting block for nouns to the present. Does this for all events. */
	public async indexAll() {
		let nounsParsers = [...parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.entries()];
		for (let [event, parser] of nounsParsers) {
			await this.index(event);
		}
		nounsParsers = [...parsers.NOUNS_DAO_FORMATTERS.entries()];
		for (let [event, parser] of nounsParsers) {
			await this.index(event);
		}
		nounsParsers = [...parsers.NOUNS_DAO_DATA_FORMATTERS.entries()];
		for (let [event, parser] of nounsParsers) {
			await this.index(event);
		}
		nounsParsers = [...parsers.NOUNS_TOKEN_FORMATTERS.entries()];
		for (let [event, parser] of nounsParsers) {
			await this.index(event);
		}
	}

	/** Assigns a listener to all contract events, updating the index whenever the event is triggered on-chain. */
	public listenAll() {
		parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.forEach((parser, event) => {
			this.listen(event);
		});
		parsers.NOUNS_DAO_FORMATTERS.forEach((parser, event) => {
			this.listen(event);
		});
		parsers.NOUNS_DAO_DATA_FORMATTERS.forEach((parser, event) => {
			this.listen(event);
		});
		parsers.NOUNS_TOKEN_FORMATTERS.forEach((parser, event) => {
			this.listen(event);
		});
	}

	/** Updates already existing event index. Uses the most recently indexed block number of the event to append more recent events.
	 * Does this for all events.
	 */
	public async updateAll() {
		for (let event of parsers.NOUNS_AUCTION_HOUSE_FORMATTERS.keys()) {
			await this.update(event);
		}
		for (let event of parsers.NOUNS_DAO_FORMATTERS.keys()) {
			await this.update(event);
		}
		for (let event of parsers.NOUNS_DAO_DATA_FORMATTERS.keys()) {
			await this.update(event);
		}
		for (let event of parsers.NOUNS_TOKEN_FORMATTERS.keys()) {
			await this.update(event);
		}
	}
}
