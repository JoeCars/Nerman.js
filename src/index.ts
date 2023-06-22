import { ethers } from "ethers";
import * as NounsDAO from "./contracts/NounsDAO";

import { _NounsAuctionHouse } from "./contracts/NounsAuctionHouse";
import { _NounsToken } from "./contracts/NounsToken";
import { _NounsDAO } from "./contracts/NounsDAO";
import { EventData } from "./types";

export { EventData } from "./types";
export { NounsNyms } from "./utility/NounsNyms";

export class Nouns {
	public provider: ethers.providers.JsonRpcProvider;

	public NounsAuctionHouse: _NounsAuctionHouse; // @TODO refactor into NounishContract?
	public NounsToken: _NounsToken;
	public NounsDAO: _NounsDAO;

	// this should eventually be part of on-chain indexed data
	public cache: { [key: string]: { [key: string]: number | string } };

	constructor(apiUrl: string | undefined) {
		if (apiUrl === undefined) {
			console.log("need to define process.env.JSON_RPC_API_URL");
			process.exit();
			return;
		}
		this.provider = new ethers.providers.JsonRpcProvider(apiUrl);
		this.provider.pollingInterval = 10000;

		this.NounsAuctionHouse = new _NounsAuctionHouse(this.provider);
		this.NounsToken = new _NounsToken(this.provider);
		this.NounsDAO = new _NounsDAO(this.provider);

		this.cache = {};
		this.cacheInit();

		this.pollForAuctionEnd = this.pollForAuctionEnd.bind(this);
		// this seems pretty hacky - needed to correctly get "this" in function
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
			this.cache.auction.startTime = latestAuction.args.startTime.toNumber();
			this.cache.auction.endTime = latestAuction.args.endTime.toNumber();
			this.cache.auction.nounId = latestAuction.args.nounId.toNumber();
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

		this.cache.auction.duration = (await this.NounsAuctionHouse.Contract.duration()).toNumber();
		this.cache.auction.timeBuffer = (await this.NounsAuctionHouse.Contract.timeBuffer()).toNumber();

		console.log("CACHE");
		console.log(this.cache);
	}

	private async updateCache() {}

	public async on(eventName: string, listener: Function) {
		console.log("StateOfNouns.ts on(" + eventName + ") created");
		let errorCount = 0;

		//@todo use ABI to look up function signatures instead, try-catch feel ugly
		try {
			this.NounsDAO.Contract.interface.getEvent(eventName);
			await this.NounsDAO.on(eventName, (data: unknown) => {
				listener(data);
			});
			return;
		} catch (error) {
			//console.error(error);
		}

		try {
			this.NounsAuctionHouse.Contract.interface.getEvent(eventName);
			await this.NounsAuctionHouse.on(eventName, (data: unknown) => {
				listener(data);
			});
			return;
		} catch (error) {
			//console.error(error);
		}

		try {
			this.NounsToken.Contract.interface.getEvent(eventName);
			await this.NounsToken.on(eventName, (data: unknown) => {
				listener(data);
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
			const timestamp = block.timestamp;

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

		console.log("pollingTime " + pollingTime);
		const that = this;
		setTimeout(function () {
			that.pollForAuctionEnd(listener);
		}, pollingTime);
	}

	public off(eventName: string) {
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

	public async ensReverseLookup(address: string) {
		const ens = await this.provider.lookupAddress(address);
		return ens;
	}

	public async getAddress(address: string) {
		// is this a proper address
		if (ethers.utils.isAddress(address)) {
			return address;
		}

		// is this an ENS that resolves?
		const resultENS = await this.provider.resolveName(address);

		if (resultENS) {
			return resultENS;
		}

		return null;
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
//     "type": "BigNumber",
//     "hex": "0x17"
//   }, "0x4ea324A72848F8A689110E41f891A512eF7BDA7b", {
//     "type": "BigNumber",
//     "hex": "0x2386f26fc10000"
//   }, false]
// }
