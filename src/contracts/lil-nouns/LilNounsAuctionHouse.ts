import { ethers } from "ethers";
import { Account, EventData } from "../../types";
import { default as LilNounsAuctionHouseABI } from "../abis/lil-nouns/NounsAuctionHouse.json";
// The contract is identical, so using the same event list as NounsAuctionHouse.
import { SUPPORTED_NOUNS_AUCTION_HOUSE_EVENTS } from "../../constants"; 

/**
 * A wrapper class around the LilNounsAuctionHouse contract.
 */
export class LilNounsAuctionHouse {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public supportedEvents: string[];
	public registeredListeners: Map<string, Function>;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract(
			"0x55e0F7A3bB39a28Bd7Bcc458e04b3cF00Ad3219E",
			LilNounsAuctionHouseABI,
			this.provider
		);
		this.supportedEvents = SUPPORTED_NOUNS_AUCTION_HOUSE_EVENTS;
		this.registeredListeners = new Map();
	}

	/**
	 * Assigns a listener to the event, which triggers whenever the event happens onchain.
	 * Throws an error if the event is not supported.
	 * @param eventType The event name.
	 * @param listener The listener function.
	 * @example
	 * lilNounsAuctionHouse.on('AuctionCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on(eventType: string, listener: Function) {
		switch (eventType) {
			case "AuctionBid":
				this.Contract.on("AuctionBid", (nounId, sender: string, value, extended: boolean, event: ethers.Event) => {
					const data: EventData.AuctionBid = {
						id: nounId,
						amount: value,
						bidder: { id: sender } as Account,
						extended: extended,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "AuctionCreated":
				this.Contract.on(
					"AuctionCreated",
					(nounId: number, startTime: number, endTime: number, event: ethers.Event) => {
						const data: EventData.AuctionCreated = {
							id: nounId,
							startTime: startTime,
							endTime: endTime,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "AuctionExtended":
				this.Contract.on("AuctionExtended", (nounId: number, endTime: number, event: ethers.Event) => {
					const data: EventData.AuctionExtended = {
						id: nounId,
						endTime: endTime,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "AuctionMinBidIncrementPercentageUpdated":
				this.Contract.on(
					"AuctionMinBidIncrementPercentageUpdated",
					(minBidIncrementPercentage: number, event: ethers.Event) => {
						const data: EventData.AuctionMinBidIncrementPercentageUpdated = {
							minBidIncrementPercentage: minBidIncrementPercentage,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "AuctionReservePriceUpdated":
				this.Contract.on("AuctionReservePriceUpdated", (reservePrice: number, event: ethers.Event) => {
					const data: EventData.AuctionReservePriceUpdated = {
						reservePrice: reservePrice,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "AuctionSettled":
				this.Contract.on("AuctionSettled", (nounId: number, winner: string, amount: number, event: ethers.Event) => {
					const data: EventData.AuctionSettled = {
						id: nounId,
						winner: { id: winner } as Account,
						amount: amount,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "AuctionTimeBufferUpdated":
				this.Contract.on("AuctionTimeBufferUpdated", (timeBuffer: number, event: ethers.Event) => {
					const data: EventData.AuctionTimeBufferUpdated = {
						timeBuffer: timeBuffer,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "OwnershipTransferred":
				this.Contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Event) => {
					const data: EventData.OwnershipTransferred = {
						previousOwner: { id: previousOwner },
						newOwner: { id: newOwner },
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "Paused":
				this.Contract.on("Paused", (address: string, event: ethers.Event) => {
					const data: EventData.Paused = {
						address: { id: address },
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "Unpaused":
				this.Contract.on("Unpaused", (address: string, event: ethers.Event) => {
					const data: EventData.Unpaused = {
						address: { id: address },
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			default:
				throw new Error(`${eventType} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes an event listener.
	 * @param eventName the event listened to.
	 */
	public off(eventName: string) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.providers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if the listener cannot be found.
	 * @param eventType the name of the event.
	 * @param data the event data.
	 */
	public trigger(eventType: string, data: unknown) {
		const listener = this.registeredListeners.get(eventType);
		if (!listener) {
			throw new Error(`${eventType} does not have a listener.`);
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
