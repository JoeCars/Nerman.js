import { BlockchainEventFetcher } from "./blockchain-event-fetcher";
import { ContractEventFormatter } from "./contract-event-formatter";

export class ContractEventFetchAndFormatter {
	private fetcher: BlockchainEventFetcher;
	private formatter: ContractEventFormatter;

	constructor(fetcher: BlockchainEventFetcher, formatter: ContractEventFormatter) {
		this.fetcher = fetcher;
		this.formatter = formatter;
	}

	async fetchAndFormatEvent(eventName: string, startBlock: number, endBlock: number) {
		try {
			const events = await this.fetcher.fetchEvents(eventName, endBlock, startBlock);
			const formattedEvents = events.map((event) => this.formatter.formatEvent(eventName, event));
			return formattedEvents;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
