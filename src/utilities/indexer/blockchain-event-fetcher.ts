import { Contract, EventLog } from "ethers";
import { NOUNS_STARTING_BLOCK, BLOCK_BATCH_SIZE } from "../../constants";

export class BlockchainEventFetcher {
	private contract: Contract;
	constructor(contract: Contract) {
		this.contract = contract;
	}
	public async fetchEvents(eventName: string, endBlock: number, startBlock = NOUNS_STARTING_BLOCK) {
		const allEvents: EventLog[] = [];

		// Adding BLOCK_BATCH_SIZE + 1 to currentBlock because contract.queryFilter() is inclusive.
		// This prevents duplicate indexes of events happening on multiples of BLOCK_BATCH_SIZE.
		for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += BLOCK_BATCH_SIZE + 1) {
			let events = (await this.contract.queryFilter(
				eventName,
				currentBlock,
				Math.min(currentBlock + BLOCK_BATCH_SIZE, endBlock)
			)) as EventLog[];

			allEvents.push(...events);
		}

		return allEvents;
	}
}
