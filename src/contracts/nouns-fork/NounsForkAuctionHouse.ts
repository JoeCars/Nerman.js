import { ethers } from "ethers";
import { Account, EventData } from "../../types";
import { default as NounsAuctionHouseABI } from "../abis/NounsAuctionHouse.json";
import { createOrReturnProvider } from "../../utilities/providers";

export interface SupportedEventMap {
	AuctionCreated: EventData.AuctionCreated;
	AuctionBid: EventData.AuctionBid;
	AuctionExtended: EventData.AuctionExtended;
	AuctionSettled: EventData.AuctionSettled;
	AuctionTimeBufferUpdated: EventData.AuctionTimeBufferUpdated;
	AuctionReservePriceUpdated: EventData.AuctionReservePriceUpdated;
	AuctionMinBidIncrementPercentageUpdated: EventData.AuctionMinBidIncrementPercentageUpdated;
	OwnershipTransferred: EventData.OwnershipTransferred;
	Paused: EventData.Paused;
	Unpaused: EventData.Unpaused;
}
const SUPPORTED_NOUNS_FORK_AUCTION_HOUSE_EVENTS = [
	"AuctionCreated",
	"AuctionBid",
	"AuctionExtended",
	"AuctionSettled",
	"AuctionTimeBufferUpdated",
	"AuctionReservePriceUpdated",
	"AuctionMinBidIncrementPercentageUpdated",
	"OwnershipTransferred",
	"Paused",
	"Unpaused"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class around the NounsForkAuctionHouse contract.
 */
export class _NounsForkAuctionHouse {
	private _forkId: number;
	public provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_FORK_AUCTION_HOUSE_EVENTS;
	public static readonly forkAddress = [
		"0xd5c122b40823e467bc6e3c859cb530b105cae22e",
		"0xb350beda0210fae7a179809fb0ae0ecd565164b0",
		"0xd5d4c3863c320bc9f5fe9ee0d3da6f7b214449ef"
	];

	constructor(provider: ethers.JsonRpcProvider | string, forkId = 0) {
		this.provider = createOrReturnProvider(provider);

		this._forkId = forkId;
		this.Contract = new ethers.Contract(_NounsForkAuctionHouse.forkAddress[forkId], NounsAuctionHouseABI, this.provider);
		this.registeredListeners = new Map<SupportedEventsType, Function>();
	}

	get forkId() {
		return this._forkId;
	}

	get address() {
		return _NounsForkAuctionHouse.forkAddress[this._forkId];
	}

	/**
	 * Registers a listener to the given event, triggering the function with the appropriate event data whenever it triggers in the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The event name.
	 * @param listener The listener function.
	 * @example
	 * nounsForkAuctionHouse.on('AuctionCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "AuctionCreated": // FUNCTIONING CORRECTLY
				this.Contract.on("AuctionCreated", (nounId: bigint, startTime: bigint, endTime: bigint, event: ethers.Log) => {
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

			case "AuctionBid": // FUNCTIONING CORRECTLY
				this.Contract.on(
					"AuctionBid",
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

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "AuctionExtended":
				this.Contract.on("AuctionExtended", (nounId: bigint, endTime: bigint, event: ethers.Log) => {
					const data: EventData.AuctionExtended = {
						id: Number(nounId),
						endTime: endTime,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionSettled": // FUNCTIONING CORRECTLY
				this.Contract.on("AuctionSettled", (nounId: bigint, winner: string, amount: bigint, event: ethers.Log) => {
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

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "AuctionTimeBufferUpdated":
				this.Contract.on("AuctionTimeBufferUpdated", (timeBuffer: bigint, event: ethers.Log) => {
					const data: EventData.AuctionTimeBufferUpdated = {
						timeBuffer: timeBuffer,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "AuctionReservePriceUpdated":
				this.Contract.on("AuctionReservePriceUpdated", (reservePrice: bigint, event: ethers.Log) => {
					const data: EventData.AuctionReservePriceUpdated = {
						reservePrice: reservePrice,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "AuctionMinBidIncrementPercentageUpdated":
				this.Contract.on(
					"AuctionMinBidIncrementPercentageUpdated",
					(minBidIncrementPercentage: bigint, event: ethers.Log) => {
						const data: EventData.AuctionMinBidIncrementPercentageUpdated = {
							minBidIncrementPercentage: Number(minBidIncrementPercentage),
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.Contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Log) => {
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
				this.Contract.on("Paused", (address: string, event: ethers.Log) => {
					const data: EventData.Paused = {
						address: { id: address },
						event: event
					};

					listener(data as any);
				});
				break;

			case "Unpaused":
				this.Contract.on("Unpaused", (address: string, event: ethers.Log) => {
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
	 * @param eventName the event name.
	 * @example
	 * nounsForkAuctionHouse.off('AuctionCreated');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers the listener of the given event with the given data.
	 * Throws an error if the event is not supported.
	 * @param eventName The event to be triggered.
	 * @param data The data being passed to the listener.
	 * @example
	 * nounsForkAuctionHouse.trigger('AuctionCreated', {
	 * 	id: 420,
	 * 	startTime: 1689677183,
	 * 	endTime: 1689763583,
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
		return "NounsForkAuctionHouse";
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

	// IF ITS A NOUNDERS NOUNS, OR NO BIDS, NEED TO CHECK WHO IT WAS TRANSFERRED TO

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return _NounsForkAuctionHouse.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
