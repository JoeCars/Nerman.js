import { ethers } from "ethers-v6";
import { Account, EventData } from "../../types";
import { createOrReturnProvider } from "../../utilities/providers";
import { createNounsAuctionHouseV2Contract } from "../../utilities/contracts";

export interface SupportedEventMap {
	AuctionBid: EventData.AuctionBid;
	AuctionBidWithClientId: EventData.AuctionBidWithClientId;
	AuctionCreated: EventData.AuctionCreated;
	AuctionExtended: EventData.AuctionExtended;
	AuctionMinBidIncrementPercentageUpdated: EventData.AuctionMinBidIncrementPercentageUpdated;
	AuctionReservePriceUpdated: EventData.AuctionReservePriceUpdated;
	AuctionSettled: EventData.AuctionSettled;
	AuctionSettledWithClientId: EventData.AuctionSettledWithClientId;
	AuctionTimeBufferUpdated: EventData.AuctionTimeBufferUpdated;
	OwnershipTransferred: EventData.OwnershipTransferred;
	Paused: EventData.Paused;
	Unpaused: EventData.Unpaused;
}
const SUPPORTED_NOUNS_AUCTION_HOUSE_EVENTS = [
	"AuctionBid",
	"AuctionBidWithClientId",
	"AuctionCreated",
	"AuctionExtended",
	"AuctionMinBidIncrementPercentageUpdated",
	"AuctionReservePriceUpdated",
	"AuctionSettled",
	"AuctionSettledWithClientId",
	"AuctionTimeBufferUpdated",
	"OwnershipTransferred",
	"Paused",
	"Unpaused"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class around the NounsAuctionHouse contract.
 */
export class _NounsAuctionHouse {
	public provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_AUCTION_HOUSE_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.Contract = createNounsAuctionHouseV2Contract(this.provider);
		this.registeredListeners = new Map();
	}

	/**
	 * Registers a listener to the given event, triggering the function with the appropriate event data whenever it triggers in the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The event name.
	 * @param listener The listener function.
	 * @example
	 * nounsAuctionHouse.on('AuctionCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "AuctionBid":
				this.Contract.on(
					eventName,
					(nounId: bigint, sender: string, value: bigint, extended: boolean, event: ethers.Log) => {
						const data: EventData.AuctionBid = {
							id: Number(nounId),
							amount: value,
							bidder: { id: sender } as Account,
							extended: extended,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionBidWithClientId":
				this.Contract.on(eventName, (nounId: bigint, value: bigint, clientId: bigint, event: ethers.Log) => {
					const data: EventData.AuctionBidWithClientId = {
						id: Number(nounId),
						amount: value,
						clientId: Number(clientId),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionCreated":
				this.Contract.on(eventName, (nounId: bigint, startTime: bigint, endTime: bigint, event: ethers.Log) => {
					const data: EventData.AuctionCreated = {
						id: Number(nounId),
						startTime: startTime,
						endTime: endTime,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionExtended":
				this.Contract.on(eventName, (nounId: bigint, endTime: bigint, event: ethers.Log) => {
					const data: EventData.AuctionExtended = {
						id: Number(nounId),
						endTime: endTime,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionMinBidIncrementPercentageUpdated":
				this.Contract.on(eventName, (minBidIncrementPercentage: bigint, event: ethers.Log) => {
					const data: EventData.AuctionMinBidIncrementPercentageUpdated = {
						minBidIncrementPercentage: Number(minBidIncrementPercentage),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionReservePriceUpdated":
				this.Contract.on(eventName, (reservePrice: bigint, event: ethers.Log) => {
					const data: EventData.AuctionReservePriceUpdated = {
						reservePrice: reservePrice,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionSettled":
				this.Contract.on(eventName, (nounId: bigint, winner: string, amount: bigint, event: ethers.Log) => {
					const data: EventData.AuctionSettled = {
						id: Number(nounId),
						winner: { id: winner } as Account,
						amount: amount,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionSettledWithClientId":
				this.Contract.on(eventName, (nounId: bigint, clientId: bigint, event: ethers.Log) => {
					const data: EventData.AuctionSettledWithClientId = {
						id: Number(nounId),
						clientId: Number(clientId),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionTimeBufferUpdated":
				this.Contract.on(eventName, (timeBuffer: bigint, event: ethers.Log) => {
					const data: EventData.AuctionTimeBufferUpdated = {
						timeBuffer: timeBuffer,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.Contract.on(eventName, (previousOwner: string, newOwner: string, event: ethers.Log) => {
					const data: EventData.OwnershipTransferred = {
						previousOwner: { id: previousOwner },
						newOwner: { id: newOwner },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Paused":
				this.Contract.on(eventName, (address: string, event: ethers.Log) => {
					const data: EventData.Paused = {
						address: { id: address },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Unpaused":
				this.Contract.on(eventName, (address: string, event: ethers.Log) => {
					const data: EventData.Unpaused = {
						address: { id: address },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes an event listener.
	 * @param eventName the event listened to.
	 * @example
	 * nounsAuctionHouse.off('AuctionCreated');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if the listener cannot be found.
	 * @param eventName the name of the event.
	 * @param data the event data.
	 * @example
	 * nounsAuctionHouse.trigger('AuctionCreated', {
	 * 	id: 420,
	 * 	startTime: 1689677183,
	 * 	endTime: 1689763583
	 * });
	 */
	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * Retrieves a list of auctions from the blockchain.
	 * @returns A list of recent AuctionCreated events.
	 */
	public async getLatestAuctions() {
		const filter = this.Contract.filters.AuctionCreated();
		const auctions = (await this.Contract.queryFilter(filter)) as ethers.EventLog[];
		return auctions;
	}

	/**
	 * Retrieves a list of AuctionExtended events from the blockchain.
	 * @returns A list of recent AuctionExtended events.
	 */
	public async getLatestAuctionExtended() {
		const filter = this.Contract.filters.AuctionExtended();
		const auctionExtendeds = (await this.Contract.queryFilter(filter)) as ethers.EventLog[];
		return auctionExtendeds;
	}

	/**
	 * Retrieves a list of AuctionBids events from the blockchain.
	 * @returns A list of recent AuctionBids events.
	 */
	public async getAuctionBids(nounId: number) {
		const filter = this.Contract.filters.AuctionBid(nounId);
		const bids = (await this.Contract.queryFilter(filter)) as ethers.EventLog[];
		return bids;
	}

	/**
	 * @returns The name of the contract. `NounsAuctionHouse`.
	 */
	public name() {
		return "NounsAuctionHouse";
	}

	//todo - cache this data
	/**
	 * Retrieves the most recent AuctionBid event for the given noun id.
	 * @param nounId The number of the noun whose bid you are looking for.
	 * @returns The AuctionBid event data.
	 */
	public async getAuctionLatestBid(nounId: number) {
		const bids = await this.getAuctionBids(nounId);
		const latestBid = bids.pop();

		return latestBid;
	}

	// Put this in a provider specific file
	/**
	 * @param blockNumber The block number on the Ethereum blockchain.
	 * @returns The information in the block.
	 */
	public async getBlock(blockNumber: number) {
		const block = await this.provider.getBlock(blockNumber);
		return block;
	}

	/**
	 * Formats and prints bid information.
	 * @param bid The bid event.
	 */
	public async tempFormatAuctionBid(bid: ethers.EventLog) {
		if (bid != undefined && bid.args != undefined) {
			const block = await this.getBlock(bid.blockNumber);
			const date = new Date(block!.timestamp * 1000);
			const bidPrice = ethers.formatEther(bid.args[2]);
			console.log("Bid on " + Number(bid.args[0]) + " for " + bidPrice + " on " + date.toLocaleDateString());
		}
	}

	/**
	 * Formats and prints the most recent bid for the given noun.
	 * @param nounId The noun being bid on.
	 */
	public async tempPrintAuctionBid(nounId: number) {
		const bid = await this.getAuctionLatestBid(nounId);

		if (bid != undefined && bid.args != undefined) {
			this.tempFormatAuctionBid(bid);
		}
	}

	/**
	 * Retrieves the most recent bid event for the given noun.
	 * @param nounId The noun being bid on.
	 * @returns The most recent bid.
	 */
	public async getLatestBidData(nounId: number) {
		const bid = await this.getAuctionLatestBid(nounId);
		if (bid != undefined && bid.args != undefined) {
			const block = await this.getBlock(bid.blockNumber);
			const ens = await this.provider.lookupAddress(bid.args[1]);
			// ethers.js automatically checks that the forward resolution matches.

			const latestBidData = {
				id: nounId,
				block: bid.blockNumber,
				date: new Date(block!.timestamp * 1000),
				amount: ethers.formatEther(bid.args[2]),
				address: bid.args[1],
				ens: ens
			};

			return latestBidData;
		}

		return null;
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return _NounsAuctionHouse.supportedEvents.includes(eventName as SupportedEventsType);
	}

	// IF ITS A NOUNDERS NOUNS, OR NO BIDS, NEED TO CHECK WHO IT WAS TRANSFERRED TO
}
