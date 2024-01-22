import { ethers } from "ethers";
import { Account, EventData } from "../../types";
import { default as LilNounsAuctionHouseABI } from "../abis/lil-nouns/NounsAuctionHouse.json";

const SUPPORTED_LIL_NOUNS_AUCTION_HOUSE_EVENTS = [
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

export type SupportedEventsType = (typeof SUPPORTED_LIL_NOUNS_AUCTION_HOUSE_EVENTS)[number];

/**
 * A wrapper class around the LilNounsAuctionHouse contract.
 */
export class LilNounsAuctionHouse {
	private provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_LIL_NOUNS_AUCTION_HOUSE_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this.Contract = new ethers.Contract(
			"0x55e0F7A3bB39a28Bd7Bcc458e04b3cF00Ad3219E",
			LilNounsAuctionHouseABI,
			this.provider
		);
		this.registeredListeners = new Map();
	}

	/**
	 * Assigns a listener to the event, which triggers whenever the event happens onchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The event name.
	 * @param listener The listener function.
	 * @example
	 * lilNounsAuctionHouse.on('AuctionCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on(eventName: SupportedEventsType, listener: Function) {
		switch (eventName) {
			case "AuctionBid":
				this.Contract.on("AuctionBid", (nounId, sender: string, value, extended: boolean, event: ethers.Log) => {
					const data: EventData.AuctionBid = {
						id: nounId,
						amount: value,
						bidder: { id: sender } as Account,
						extended: extended,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionCreated":
				this.Contract.on(
					"AuctionCreated",
					(nounId: number, startTime: number, endTime: number, event: ethers.Log) => {
						const data: EventData.AuctionCreated = {
							id: nounId,
							startTime: startTime,
							endTime: endTime,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionExtended":
				this.Contract.on("AuctionExtended", (nounId: number, endTime: number, event: ethers.Log) => {
					const data: EventData.AuctionExtended = {
						id: nounId,
						endTime: endTime,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionMinBidIncrementPercentageUpdated":
				this.Contract.on(
					"AuctionMinBidIncrementPercentageUpdated",
					(minBidIncrementPercentage: number, event: ethers.Log) => {
						const data: EventData.AuctionMinBidIncrementPercentageUpdated = {
							minBidIncrementPercentage: minBidIncrementPercentage,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionReservePriceUpdated":
				this.Contract.on("AuctionReservePriceUpdated", (reservePrice: number, event: ethers.Log) => {
					const data: EventData.AuctionReservePriceUpdated = {
						reservePrice: reservePrice,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionSettled":
				this.Contract.on("AuctionSettled", (nounId: number, winner: string, amount: number, event: ethers.Log) => {
					const data: EventData.AuctionSettled = {
						id: nounId,
						winner: { id: winner } as Account,
						amount: amount,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionTimeBufferUpdated":
				this.Contract.on("AuctionTimeBufferUpdated", (timeBuffer: number, event: ethers.Log) => {
					const data: EventData.AuctionTimeBufferUpdated = {
						timeBuffer: timeBuffer,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.Contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Log) => {
					const data: EventData.OwnershipTransferred = {
						previousOwner: { id: previousOwner },
						newOwner: { id: newOwner },
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Paused":
				this.Contract.on("Paused", (address: string, event: ethers.Log) => {
					const data: EventData.Paused = {
						address: { id: address },
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Unpaused":
				this.Contract.on("Unpaused", (address: string, event: ethers.Log) => {
					const data: EventData.Unpaused = {
						address: { id: address },
						event: event
					};

					listener(data);
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
	 * lilNounsAuctionHouse.off('AuctionCreated');
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
	 * lilNounsAuctionHouse.trigger('AuctionCreated', {
	 * 	id: 420,
	 * 	startTime: 1689677183,
	 * 	endTime: 1689763583
	 * });
	 */
	public trigger(eventName: SupportedEventsType, data: unknown) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * @returns The name of the contract. `LilNounsAuctionHouse`.
	 */
	public name() {
		return "LilNounsAuctionHouse";
	}
}
