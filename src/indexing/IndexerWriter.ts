import { ethers } from "ethers";

import * as indexer from "../utilities/indexer/indexer-logic";
import * as parsers from "../utilities/indexer/index-parsers";
import { _NounsAuctionHouse } from "../contracts/nouns-dao/NounsAuctionHouse";
import { _NounsDAO } from "../contracts/nouns-dao/NounsDAO";
import { _NounsDAOData } from "../contracts/nouns-dao/NounsDAOData";
import { _NounsToken } from "../contracts/nouns-dao/NounsToken";

/** A class that takes event data from on-chain and writes them to files. */
export class IndexerWriter {
	private path: string;
	private provider: ethers.JsonRpcProvider;
	private nounsAuctionHouse: _NounsAuctionHouse;
	private nounsDao: _NounsDAO;
	private nounsDaoData: _NounsDAOData;
	private nounsToken: _NounsToken;

	/**
	 * @param provider provider uses to create wrappers.
	 * @param path directory path to indexer directory, where all files will be stored.
	 */
	public constructor(provider: ethers.JsonRpcProvider | string, path: string) {
		this.path = path;
		this.nounsAuctionHouse = new _NounsAuctionHouse(provider);
		this.nounsDao = new _NounsDAO(provider);
		this.nounsDaoData = new _NounsDAOData(provider);
		this.nounsToken = new _NounsToken(provider);

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
		if (parsers.NOUNS_AUCTION_PARSERS.get(event)) {
			const parser = parsers.NOUNS_AUCTION_PARSERS.get(event) as Function;
			await indexer.indexEvent(this.nounsAuctionHouse.Contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DAO_PARSERS.get(event) as Function;
			await indexer.indexEvent(this.nounsDao.Contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_DATA_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DATA_PARSERS.get(event) as Function;
			await indexer.indexEvent(this.nounsDaoData.Contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_TOKEN_PARSERS.get(event)) {
			const parser = parsers.NOUNS_TOKEN_PARSERS.get(event) as Function;
			await indexer.indexEvent(this.nounsToken.Contract, this.provider, event, parser, this.path);
		} else {
			throw new Error(`${event} is not supported and cannot be indexed.`);
		}
	}

	/**
	 * Assigns a listener to the contract event, updating the index whenever the event is triggered on-chain.
	 * @param event the event name.
	 */
	public async listen(event: string) {
		if (parsers.NOUNS_AUCTION_PARSERS.get(event)) {
			const parser = parsers.NOUNS_AUCTION_PARSERS.get(event) as Function;
			indexer.listenForEvent(this.nounsAuctionHouse.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DAO_PARSERS.get(event) as Function;
			indexer.listenForEvent(this.nounsDao.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_DATA_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DATA_PARSERS.get(event) as Function;
			indexer.listenForEvent(this.nounsDaoData.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_TOKEN_PARSERS.get(event)) {
			const parser = parsers.NOUNS_TOKEN_PARSERS.get(event) as Function;
			indexer.listenForEvent(this.nounsToken.Contract, event, parser, this.path);
		} else {
			throw new Error(`${event} is not supported and cannot be indexed.`);
		}
	}

	/**
	 * Updates already existing event index. Uses the most recently indexed block number of the event to append more recent events.
	 * @param event the event name.
	 */
	public async update(event: string) {
		if (parsers.NOUNS_AUCTION_PARSERS.get(event)) {
			const parser = parsers.NOUNS_AUCTION_PARSERS.get(event) as Function;
			await indexer.updateIndexedEvent(this.nounsAuctionHouse.Contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DAO_PARSERS.get(event) as Function;
			await indexer.updateIndexedEvent(this.nounsDao.Contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_DATA_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DATA_PARSERS.get(event) as Function;
			await indexer.updateIndexedEvent(this.nounsDaoData.Contract, this.provider, event, parser, this.path);
		} else if (parsers.NOUNS_TOKEN_PARSERS.get(event)) {
			const parser = parsers.NOUNS_TOKEN_PARSERS.get(event) as Function;
			await indexer.updateIndexedEvent(this.nounsToken.Contract, this.provider, event, parser, this.path);
		} else {
			throw new Error(`${event} is not supported and cannot be indexed.`);
		}
	}

	/** Stores all event data from the starting block for nouns to the present. Does this for all events. */
	public async indexAll() {
		let nounsParsers = [...parsers.NOUNS_AUCTION_PARSERS.entries()];
		for (let [event, parser] of nounsParsers) {
			await this.index(event);
		}
		nounsParsers = [...parsers.NOUNS_DAO_PARSERS.entries()];
		for (let [event, parser] of nounsParsers) {
			await this.index(event);
		}
		nounsParsers = [...parsers.NOUNS_DATA_PARSERS.entries()];
		for (let [event, parser] of nounsParsers) {
			await this.index(event);
		}
		nounsParsers = [...parsers.NOUNS_TOKEN_PARSERS.entries()];
		for (let [event, parser] of nounsParsers) {
			await this.index(event);
		}
	}

	/** Assigns a listener to all contract events, updating the index whenever the event is triggered on-chain. */
	public listenAll() {
		parsers.NOUNS_AUCTION_PARSERS.forEach((parser, event) => {
			this.listen(event);
		});
		parsers.NOUNS_DAO_PARSERS.forEach((parser, event) => {
			this.listen(event);
		});
		parsers.NOUNS_DATA_PARSERS.forEach((parser, event) => {
			this.listen(event);
		});
		parsers.NOUNS_TOKEN_PARSERS.forEach((parser, event) => {
			this.listen(event);
		});
	}

	/** Updates already existing event index. Uses the most recently indexed block number of the event to append more recent events.
	 * Does this for all events.
	 */
	public async updateAll() {
		for (let event of parsers.NOUNS_AUCTION_PARSERS.keys()) {
			await this.update(event);
		}
		for (let event of parsers.NOUNS_DAO_PARSERS.keys()) {
			await this.update(event);
		}
		for (let event of parsers.NOUNS_DATA_PARSERS.keys()) {
			await this.update(event);
		}
		for (let event of parsers.NOUNS_TOKEN_PARSERS.keys()) {
			await this.update(event);
		}
	}
}
