import { ethers } from "ethers";

import * as indexer from "./indexer";
import * as parsers from "./index-parsers";
import { _NounsAuctionHouse } from "../contracts/NounsAuctionHouse";
import { _NounsDAO } from "../contracts/NounsDAO";
import { _NounsDAOData } from "../contracts/NounsDAOData";
import { _NounsToken } from "../contracts/NounsToken";

/** A class that takes event data from on-chain and writes them to files. */
export class IndexerWriter {
	private path: string;
	private nounsAuctionHouse: _NounsAuctionHouse;
	private nounsDao: _NounsDAO;
	private nounsDaoData: _NounsDAOData;
	private nounsToken: _NounsToken;

	/**
	 * @param provider provider uses to create wrappers.
	 * @param path directory path to indexer directory, where all files will be stored.
	 */
	public constructor(provider: ethers.providers.JsonRpcProvider, path: string) {
		this.path = path;
		this.nounsAuctionHouse = new _NounsAuctionHouse(provider);
		this.nounsDao = new _NounsDAO(provider);
		this.nounsDaoData = new _NounsDAOData(provider);
		this.nounsToken = new _NounsToken(provider);
	}

	/**
	 * Stores all event data from the starting block for nouns to the present.
	 * @param event the event name.
	 */
	public index(event: string) {
		if (parsers.NOUNS_AUCTION_PARSERS.get(event)) {
			const parser = parsers.NOUNS_AUCTION_PARSERS.get(event) as Function;
			indexer.indexEvent(this.nounsAuctionHouse.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DAO_PARSERS.get(event) as Function;
			indexer.indexEvent(this.nounsDao.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_DATA_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DATA_PARSERS.get(event) as Function;
			indexer.indexEvent(this.nounsDaoData.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_TOKEN_PARSERS.get(event)) {
			const parser = parsers.NOUNS_TOKEN_PARSERS.get(event) as Function;
			indexer.indexEvent(this.nounsToken.Contract, event, parser, this.path);
		} else {
			throw new Error(`${event} is not supported and cannot be indexed.`);
		}
	}

	/**
	 * Assigns a listener to the contract event, updating the index whenever the event is triggered on-chain.
	 * @param event the event name.
	 */
	public listen(event: string) {
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
	public update(event: string) {
		if (parsers.NOUNS_AUCTION_PARSERS.get(event)) {
			const parser = parsers.NOUNS_AUCTION_PARSERS.get(event) as Function;
			indexer.updateIndexedEvent(this.nounsAuctionHouse.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_DAO_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DAO_PARSERS.get(event) as Function;
			indexer.updateIndexedEvent(this.nounsDao.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_DATA_PARSERS.get(event)) {
			const parser = parsers.NOUNS_DATA_PARSERS.get(event) as Function;
			indexer.updateIndexedEvent(this.nounsDaoData.Contract, event, parser, this.path);
		} else if (parsers.NOUNS_TOKEN_PARSERS.get(event)) {
			const parser = parsers.NOUNS_TOKEN_PARSERS.get(event) as Function;
			indexer.updateIndexedEvent(this.nounsToken.Contract, event, parser, this.path);
		} else {
			throw new Error(`${event} is not supported and cannot be indexed.`);
		}
	}

	/** Stores all event data from the starting block for nouns to the present. Does this for all events. */
	public indexAll() {
		parsers.NOUNS_AUCTION_PARSERS.forEach((parser, event) => {
			this.index(event);
		});
		parsers.NOUNS_DAO_PARSERS.forEach((parser, event) => {
			this.index(event);
		});
		parsers.NOUNS_DATA_PARSERS.forEach((parser, event) => {
			this.index(event);
		});
		parsers.NOUNS_TOKEN_PARSERS.forEach((parser, event) => {
			this.index(event);
		});
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
	public updateAll() {
		parsers.NOUNS_AUCTION_PARSERS.forEach((parser, event) => {
			this.update(event);
		});
		parsers.NOUNS_DAO_PARSERS.forEach((parser, event) => {
			this.update(event);
		});
		parsers.NOUNS_DATA_PARSERS.forEach((parser, event) => {
			this.update(event);
		});
		parsers.NOUNS_TOKEN_PARSERS.forEach((parser, event) => {
			this.update(event);
		});
	}
}
