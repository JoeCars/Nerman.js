import { readFile } from "fs/promises";
import { join } from "path";

import { Indexer } from "../types";

/**
 * @param startBlock The starting block. Inclusive.
 * @param endBlock The final block. Inclusive.
 */
export function _filterByBlock(events: Indexer.FormattedEvent[], startBlock: number, endBlock: number) {
	let filteredEvents = events.filter((event) => {
		return event.blockNumber >= startBlock && event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

/**
 * @param event the event name
 * @returns An array of indexed events of the given type.
 */
export async function _fetchAllEvents(event: string) {
	let path = join(__dirname, "..", "data", "indexer", `${event}.json`);
	let file = await readFile(path, { encoding: "utf8" });
	let auctions: Indexer.FormattedEvent[] = JSON.parse(file).events;
	return auctions;
}
