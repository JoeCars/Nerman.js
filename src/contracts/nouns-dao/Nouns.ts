import { Contract, ethers } from "ethers";

import {
	NounsAuctionHouse,
	SupportedEventsType as NounsAuctionHouseSupportedEventsType,
	SupportedEventMap as AuctionSupportedEventMap
} from "./NounsAuctionHouse";
import {
	NounsToken,
	SupportedEventsType as NounsTokenSupportedEventsType,
	SupportedEventMap as TokenSupportedEventMap
} from "./NounsToken";
import {
	NounsLogic,
	SupportedEventsType as NounsDAOSupportedEventsType,
	SupportedEventMap as LogicSupportedEventMap
} from "./NounsLogic";
import {
	NounsData,
	SupportedEventsType as NounsDAODataSupportedEventsType,
	SupportedEventMap as DataSupportedEventMap
} from "./NounsData";
import {
	NounsExecutor,
	SupportedEventsType as NounsDaoExecutorSupportedEventsType,
	SupportedEventMap as ExecutorSupportedEventMap
} from "./NounsExecutor";
import { EventData, NounsOptions } from "../../types";
import { createOrReturnProvider } from "../../utilities/providers";

export interface SupportedEventMap
	extends AuctionSupportedEventMap,
		LogicSupportedEventMap,
		TokenSupportedEventMap,
		DataSupportedEventMap,
		ExecutorSupportedEventMap {
	AuctionEnd: EventData.AuctionComplete;
}
type SupportedEventsType =
	| NounsAuctionHouseSupportedEventsType
	| NounsTokenSupportedEventsType
	| NounsDAOSupportedEventsType
	| NounsDAODataSupportedEventsType
	| NounsDaoExecutorSupportedEventsType
	| "AuctionEnd";

/**
 * A wrapper for all Nouns DAO contracts, allowing you to access them from a single place without worrying about which contract has the information you need.
 */
export class Nouns {
	public provider: ethers.JsonRpcProvider;

	public NounsAuctionHouse: NounsAuctionHouse; // @TODO refactor into NounishContract?
	public NounsToken: NounsToken;
	public NounsDAO: NounsLogic;
	public NounsDAOData: NounsData;
	public NounsDaoExecutor: NounsExecutor;

	public static readonly supportedEvents = [
		...NounsAuctionHouse.supportedEvents,
		...NounsToken.supportedEvents,
		...NounsLogic.supportedEvents,
		...NounsData.supportedEvents,
		...NounsExecutor.supportedEvents,
		"AuctionEnd"
	] as const;

	public registeredListeners: Map<string, Function>;

	// this should eventually be part of on-chain indexed data
	public cache: { [key: string]: { [key: string]: number | string } };

	/**
	 * @param provider The JSON_RPC_URL needed to establish a connection to the Ethereum network. Typically retrieved through a provider like Alchemy.
	 * @param options An options object to configure the Nouns wrappers.
	 */
	constructor(provider: string | ethers.JsonRpcProvider, options?: NounsOptions) {
		this.provider = createOrReturnProvider(provider);

		this.provider.pollingInterval = 10000;
		if (options && options.pollingTime) {
			this.provider.pollingInterval = options.pollingTime;
		}

		this.NounsAuctionHouse = new NounsAuctionHouse(this.provider);
		this.NounsToken = new NounsToken(this.provider);
		this.NounsDAO = new NounsLogic(this.provider);
		this.NounsDAOData = new NounsData(this.provider);
		this.NounsDaoExecutor = new NounsExecutor(this.provider);

		let indexerDirectoryPath = "./_nounsjs/data";
		if (options?.indexerDirectoryPath) {
			indexerDirectoryPath = options.indexerDirectoryPath;
		}

		this.cache = {};
		if (!options?.shouldIgnoreCacheInit) {
			this.cacheInit();
		}

		this.pollForAuctionEnd = this.pollForAuctionEnd.bind(this);
		// this seems pretty hacky - needed to correctly get "this" in function

		this.registeredListeners = new Map();
	}

	private async cacheInit() {
		console.log("calling cacheInit");

		const latestAuction = (await this.NounsAuctionHouse.getLatestAuctions()).pop();
		this.cache.auction = {};
		this.cache.auction.state = "";

		if (latestAuction && latestAuction.args) {
			this.cache.auction.startTime = Number(latestAuction.args.startTime);
			this.cache.auction.endTime = Number(latestAuction.args.endTime);
			this.cache.auction.nounId = Number(latestAuction.args.nounId);
			this.cache.auction.state = "ACTIVE";
		}

		const latestAuctionExtended = (await this.NounsAuctionHouse.getLatestAuctionExtended()).pop();

		if (
			latestAuctionExtended &&
			latestAuctionExtended.args &&
			latestAuctionExtended.args.nounId == this.cache.auction.nounId
		) {
			console.log("current auction is in extended period");

			this.cache.auction.endTime = latestAuctionExtended.args.endTime;
			this.cache.auction.state = "EXTENDED";
		}

		this.cache.auction.duration = Number(await this.NounsAuctionHouse.viewer.duration());
		this.cache.auction.timeBuffer = Number(await this.NounsAuctionHouse.viewer.timeBuffer());

		console.log("CACHE");
		console.log(this.cache);
	}

	private async updateCache() {}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * @param eventName The name of the event.
	 * @param listener The listener function.
	 * @example
	 * nouns.on('NounCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		this.registeredListeners.set(eventName, listener);

		if (this.NounsDAO.hasEvent(eventName)) {
			this.NounsDAO.on(eventName as NounsDAOSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
		} else if (this.NounsAuctionHouse.hasEvent(eventName)) {
			this.NounsAuctionHouse.on(eventName as NounsAuctionHouseSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
		} else if (this.NounsToken.hasEvent(eventName)) {
			this.NounsToken.on(eventName as NounsTokenSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
		} else if (this.NounsDAOData.hasEvent(eventName)) {
			this.NounsDAOData.on(eventName as NounsDAODataSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
		} else if (this.NounsDaoExecutor.hasEvent(eventName)) {
			this.NounsDaoExecutor.on(eventName as NounsDaoExecutorSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
		} else if (eventName == "AuctionEnd") {
			console.log("Listening for AuctionEnd");

			this.pollForAuctionEnd(listener);

			await this.NounsAuctionHouse.on("AuctionExtended", (data: EventData.AuctionExtended) => {
				this.cache.auction.state = "EXTENDED";
				console.log("Auction Extended for Noun " + data.id + " - endTime: " + data.endTime);
				// check if nounId is correct - if not re-populate cache
				this.cache.auction.endTime = Number(data.endTime);
			});

			await this.NounsAuctionHouse.on("AuctionSettled", (data: EventData.AuctionSettled) => {
				console.log("Auction Settled for Noun " + data.id);

				if (data.id % 10 == 9) {
					// Mint Nouner Noun, start action for 11
				}

				this.cacheInit();
			});

			return;
		} else {
			throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	public async pollForAuctionEnd(listener: Function) {
		let pollingTime = 10000;

		if (this.cache.auction && (this.cache.auction.state == "ACTIVE" || this.cache.auction.state == "EXTENDED")) {
			const blockNumber = await this.provider.getBlockNumber();
			const block = await this.provider.getBlock(blockNumber);
			const timestamp = block!.timestamp;

			if (timestamp > (this.cache.auction.endTime as number)) {
				this.cache.auction.state = "COMPLETE";
				console.log("this.cache.endTime has passed - AuctionEnd"); // doesn't account for block reorganization
				listener(this.cache.auction.nounId, this.cache.auction.endTime /*block*/);
			}

			if (!this.cache.auction.endTime || !timestamp || !this.cache.auction.timeBuffer) {
				pollingTime = 100;

				// @TODO properly type the cache data and remove all this casting
			} else if (
				(this.cache.auction.endTime as number) - (timestamp as number) <
				(this.cache.auction.timeBuffer as number)
			) {
				pollingTime = 4000;
			} else {
				pollingTime =
					((this.cache.auction.endTime as number) -
						(timestamp as number) -
						(this.cache.auction.timeBuffer as number)) *
					1000;
				if (pollingTime <= 0) {
					pollingTime = 1000;
				}
			}
		}

		const that = this;
		setTimeout(function () {
			that.pollForAuctionEnd(listener);
		}, pollingTime);
	}

	/**
	 * Triggers an event.
	 * @param eventName the event name.
	 * @param data the event data.
	 * @example
	 * nouns.trigger('NounCreated', {
	 * 	id: 420,
	 * 	seed: {
	 * 		background: 0,
	 * 		body: 0,
	 * 		accessory: 0,
	 * 		head: 0,
	 * 		glasses: 0
	 * 	}
	 * });
	 */
	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this.registeredListeners.get(eventName);
		if (listener) {
			listener(data);
		} else {
			console.log(`No listeners are registered with ${eventName}.`);
		}
	}

	/**
	 * @param eventName the event name.
	 * @example
	 * nouns.off('NounCreated');
	 */
	public off(eventName: SupportedEventsType) {
		console.log("StateOfNouns off " + eventName);
	}

	/**
	 * Returns the ens name of the address if available.
	 * @param address the wallet address.
	 * @returns the ens name as a string if it exists, or undefined.
	 * @example
	 * const ens = await nouns.ensReverseLookup('0x281ec184e704ce57570614c33b3477ec7ff07243');
	 */
	public async ensReverseLookup(address: string) {
		const ens = await this.provider.lookupAddress(address);
		return ens;
	}

	public async getAddress(address: string) {
		// is this a proper address
		if (ethers.isAddress(address)) {
			return address;
		}

		// is this an ENS that resolves?
		const resultENS = await this.provider.resolveName(address);

		if (resultENS) {
			return resultENS;
		}

		return null;
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return Nouns.supportedEvents.includes(eventName as SupportedEventsType);
	}

	public async calculateBookValue() {
		const treasuryContents = await this.NounsDaoExecutor.fetchTreasuryContents();
		const totalNouns = Number(await this.NounsDAO.viewer.adjustedTotalSupply());

		let ethSum = 0;
		for (const tokenContent of treasuryContents) {
			// Simplifying problem by taking book value as eth / total nouns.
			// Treating all eth wrappers as equal to eth.
			// Should change this behaviour in the future.

			if (tokenContent.tokenName === "USDC") {
				continue;
			}

			ethSum += tokenContent.balance.mainDenomination;
		}

		return ethSum / totalNouns;
	}
}
