import { ethers } from "ethers-v6";

import {
	_NounsAuctionHouse,
	SupportedEventsType as NounsAuctionHouseSupportedEventsType,
	SupportedEventMap as AuctionSupportedEventMap
} from "./NounsAuctionHouse";
import {
	_NounsToken,
	SupportedEventsType as NounsTokenSupportedEventsType,
	SupportedEventMap as TokenSupportedEventMap
} from "./NounsToken";
import {
	_NounsDAO,
	SupportedEventsType as NounsDAOSupportedEventsType,
	SupportedEventMap as LogicSupportedEventMap
} from "./NounsDAO";
import {
	_NounsDAOData,
	SupportedEventsType as NounsDAODataSupportedEventsType,
	SupportedEventMap as DataSupportedEventMap
} from "./NounsDAOData";
import { Indexer } from "../../indexing/Indexer";
import { EventData, NounsOptions } from "../../types";

export interface SupportedEventMap
	extends AuctionSupportedEventMap,
		LogicSupportedEventMap,
		TokenSupportedEventMap,
		DataSupportedEventMap {
	AuctionEnd: EventData.AuctionComplete;
}
type SupportedEventsType =
	| NounsAuctionHouseSupportedEventsType
	| NounsTokenSupportedEventsType
	| NounsDAOSupportedEventsType
	| NounsDAODataSupportedEventsType
	| "AuctionEnd";

/**
 * A wrapper for all Nouns DAO contracts, allowing you to access them from a single place without worrying about which contract has the information you need.
 */
export class Nouns {
	public provider: ethers.JsonRpcProvider;

	public NounsAuctionHouse: _NounsAuctionHouse; // @TODO refactor into NounishContract?
	public NounsToken: _NounsToken;
	public NounsDAO: _NounsDAO;
	public NounsDAOData: _NounsDAOData;
	public Indexer: Indexer;
	public static readonly supportedEvents = [
		..._NounsAuctionHouse.supportedEvents,
		..._NounsToken.supportedEvents,
		..._NounsDAO.supportedEvents,
		..._NounsDAOData.supportedEvents,
		"AuctionEnd"
	];

	public registeredListeners: Map<string, Function>;

	// this should eventually be part of on-chain indexed data
	public cache: { [key: string]: { [key: string]: number | string } };

	/**
	 * @param provider The JSON_RPC_URL needed to establish a connection to the Ethereum network. Typically retrieved through a provider like Alchemy.
	 * @param options An options object to configure the Nouns wrappers.
	 */
	constructor(provider: string | ethers.JsonRpcProvider, options?: NounsOptions) {
		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this.provider.pollingInterval = 10000;
		if (options && options.pollingTime) {
			this.provider.pollingInterval = options.pollingTime;
		}

		this.NounsAuctionHouse = new _NounsAuctionHouse(this.provider);
		this.NounsToken = new _NounsToken(this.provider);
		this.NounsDAO = new _NounsDAO(this.provider);
		this.NounsDAOData = new _NounsDAOData(this.provider);

		let indexerDirectoryPath = "./_nounsjs/data";
		if (options?.indexerDirectoryPath) {
			indexerDirectoryPath = options.indexerDirectoryPath;
		}
		this.Indexer = new Indexer(this.provider, indexerDirectoryPath);

		this.cache = {};
		if (!options?.shouldIgnoreCacheInit) {
			this.cacheInit();
		}

		this.pollForAuctionEnd = this.pollForAuctionEnd.bind(this);
		// this seems pretty hacky - needed to correctly get "this" in function

		this.registeredListeners = new Map();
	}

	// ACTIVE
	// EXTENDED
	// COMPLETE
	// SETTLED

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

		this.cache.auction.duration = Number(await this.NounsAuctionHouse.Contract.duration());
		this.cache.auction.timeBuffer = Number(await this.NounsAuctionHouse.Contract.timeBuffer());

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
		console.log("StateOfNouns.ts on(" + eventName + ") created");
		this.registeredListeners.set(eventName, listener);
		let errorCount = 0;

		//@todo use ABI to look up function signatures instead, try-catch feel ugly
		try {
			await this.NounsDAO.on(eventName as NounsDAOSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
			return;
		} catch (error) {
			//console.error(error);
		}

		try {
			await this.NounsAuctionHouse.on(eventName as NounsAuctionHouseSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
			return;
		} catch (error) {
			//console.error(error);
		}

		try {
			await this.NounsToken.on(eventName as NounsTokenSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
			return;
		} catch (error) {
			//console.error(error);
		}

		try {
			await this.NounsDAOData.on(eventName as NounsDAODataSupportedEventsType, (data: unknown) => {
				listener(data as any);
			});
			return;
		} catch (error) {
			//console.error(error);
		}

		if (eventName == "AuctionEnd") {
			console.log("Listening for AuctionEnd");

			this.pollForAuctionEnd(listener);

			await this.NounsAuctionHouse.on("AuctionExtended", (data: EventData.AuctionExtended) => {
				this.cache.auction.state = "EXTENDED";
				console.log("Auction Extended for Noun " + data.id + " - endTime: " + data.endTime);
				// check if nounId is correct - if not re-populate cache
				this.cache.auction.endTime = data.endTime;
			});

			await this.NounsAuctionHouse.on("AuctionSettled", (data: EventData.AuctionSettled) => {
				console.log("Auction Settled for Noun " + data.id);

				if (data.id % 10 == 9) {
					// Mint Nouner Noun, start action for 11
				}

				this.cacheInit();
			});

			return;
		}

		console.log("event name not found: " + eventName);
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

	// @todo functionType is only the following items: view pure payable
	public async call(fType: string, fName: string, fArgs: any[]) {
		switch (fType) {
			case "view":
				return await this.NounsToken.callView(fName, fArgs);

				break;
		}
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

	public async index(...eventNames: string[]) {
		if (eventNames.length === 0) {
			return this.Indexer.updateAll();
		}

		for (const eventName of eventNames) {
			this.Indexer.update(eventName);
		}
	}

	public async queryIndex(eventName: string, queryOptions?: object) {
		this.Indexer.query(eventName, queryOptions);
	}
}

// {
//   "blockNumber": 13116621,
//   "blockHash": "0x6897277f125153466684dbd27ac7fb845deb5cfd3d3c09c5fd850c980483c888",
//   "transactionIndex": 395,
//   "removed": false,
//   "address": "0x830BD73E4184ceF73443C15111a1DF14e495C706",
//   "data": "0x0000000000000000000000004ea324a72848f8a689110e41f891a512ef7bda7b000000000000000000000000000000000000000000000000002386f26fc100000000000000000000000000000000000000000000000000000000000000000000",
//   "topics": ["0x1159164c56f277e6fc99c11731bd380e0347deb969b75523398734c252706ea3", "0x0000000000000000000000000000000000000000000000000000000000000017"],
//   "transactionHash": "0x9da291f2b183cfd7e53fcd324a1e468449b8dcdd74c68731c952e471c12a771c",
//   "logIndex": 584,
//   "event": "AuctionBid",
//   "eventSignature": "AuctionBid(uint256,address,uint256,bool)",
//   "args": [{
//     "type": "BigInt",
//     "hex": "0x17"
//   }, "0x4ea324A72848F8A689110E41f891A512eF7BDA7b", {
//     "type": "BigInt",
//     "hex": "0x2386f26fc10000"
//   }, false]
// }
