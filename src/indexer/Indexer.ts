import { ethers } from "ethers";

import { IndexerReader } from "./IndexerReader";
import { IndexerWriter } from "./IndexerWriter";

/** Indexer class responsible for storing and retrieved indexed events. */
export class Indexer {
	public reader: IndexerReader;
	public writer: IndexerWriter;

	/**
	 * @param provider The blockchain network connection needed to store data.
	 * @param directoryPath The indexer directory for storing events.
	 */
	public constructor(provider: ethers.providers.JsonRpcProvider, directoryPath: string) {
		this.reader = new IndexerReader(directoryPath);
		this.writer = new IndexerWriter(provider, directoryPath);
	}

	/*
	 * Retrieves indexed event data, filtered by options. Throws an error if the event is not supported.
	 * @param eventName Name of the event.
	 * @param queryOptions Object with filter options for the indexed events.
	 * @returns List of filtered indexed events.
	 */
	public async query(eventName: string, queryOptions: object) {
		return this.reader.query(eventName, queryOptions);
	}

	/**
	 * Stores all instances of the given event from the Nouns starting block to the present.
	 * Do not use this if the event is already indexed, as it will rewrite the existing data.
	 * @param eventName Name of the event.
	 */
	public async index(eventName: string) {
		this.writer.index(eventName);
	}

	/**
	 * Assigns a listener to the given event, appending new instances to the existing store of indexed events.
	 * @param eventName Name of the event.
	 */
	public async listen(eventName: string) {
		this.writer.listen(eventName);
	}

	/**
	 * Stores all instances of the given even from the most recent indexing efforts to the present.
	 * Appends all data, rather than overwriting. This will create the indexed event file if it does not already exist.
	 * @param eventName Name of the event.
	 */
	public async update(eventName: string) {
		this.writer.update(eventName);
	}

	/**
	 * Performs `index()` for all supported events.
	 */
	public async indexAll() {
		this.writer.indexAll();
	}

	/**
	 * Performs `listen()` for all supported events.
	 */
	public async listenAll() {
		this.writer.listenAll();
	}

	/**
	 * Performs `update()` for all supported events.
	 */
	public async updateAll() {
		this.writer.updateAll();
	}
}
