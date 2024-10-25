import { ethers } from "ethers";
import { Account, EventData } from "../../types";
import { default as AlpsAuctionHouseABI } from "../abis/alps/AlpsAuctionHouse.json";
import { createOrReturnProvider } from "../../utilities/providers";

export interface SupportedEventMap {
	AuctionCreated: EventData.Alps.AuctionHouse.AuctionCreated;
	AuctionBid: EventData.Alps.AuctionHouse.AuctionBid;
	AuctionExtended: EventData.Alps.AuctionHouse.AuctionExtended;
	AuctionSettled: EventData.Alps.AuctionHouse.AuctionSettled;
	AuctionTimeBufferUpdated: EventData.Alps.AuctionHouse.AuctionTimeBufferUpdated;
	AuctionReservePriceUpdated: EventData.Alps.AuctionHouse.AuctionReservePriceUpdated;
	AuctionMinBidIncrementPercentageUpdated: EventData.Alps.AuctionHouse.AuctionMinBidIncrementPercentageUpdated;
	OwnershipTransferred: EventData.Alps.AuctionHouse.OwnershipTransferred;
	Paused: EventData.Alps.AuctionHouse.Paused;
	Unpaused: EventData.Alps.AuctionHouse.Unpaused;
}
const SUPPORTED_ALPS_AUCTION_HOUSE_EVENTS = [
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
export type SupportedEventsType = (typeof SUPPORTED_ALPS_AUCTION_HOUSE_EVENTS)[number];

export class AlpsAuctionHouse {
	private provider: ethers.JsonRpcProvider;
	public contract: ethers.Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_ALPS_AUCTION_HOUSE_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);

		this.contract = new ethers.Contract("0xb2775e4de3eaCBd67dd5c5cfac03FDE464255beE", AlpsAuctionHouseABI, this.provider);
		this.registeredListeners = new Map();
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "AuctionBid":
				this.contract.on(
					"AuctionBid",
					(alpId: bigint, sender: string, value: bigint, extended: boolean, event: ethers.Log) => {
						const data: EventData.Alps.AuctionHouse.AuctionBid = {
							alpId: Number(alpId),
							value: value,
							sender: { id: sender } as Account,
							extended: extended,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionCreated":
				this.contract.on("AuctionCreated", (alpId: bigint, startTime: bigint, endTime: bigint, event: ethers.Log) => {
					const data: EventData.Alps.AuctionHouse.AuctionCreated = {
						alpId: Number(alpId),
						startTime: startTime,
						endTime: endTime,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionExtended":
				this.contract.on("AuctionExtended", (alpId: bigint, endTime: bigint, event: ethers.Log) => {
					const data: EventData.Alps.AuctionHouse.AuctionExtended = {
						alpId: Number(alpId),
						endTime: endTime,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionMinBidIncrementPercentageUpdated":
				this.contract.on(
					"AuctionMinBidIncrementPercentageUpdated",
					(minBidIncrementPercentage: bigint, event: ethers.Log) => {
						const data: EventData.Alps.AuctionHouse.AuctionMinBidIncrementPercentageUpdated = {
							minBidIncrementPercentage: Number(minBidIncrementPercentage),
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionReservePriceUpdated":
				this.contract.on("AuctionReservePriceUpdated", (reservePrice: bigint, event: ethers.Log) => {
					const data: EventData.Alps.AuctionHouse.AuctionReservePriceUpdated = {
						reservePrice: reservePrice,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionSettled":
				this.contract.on("AuctionSettled", (alpId: bigint, winner: string, amount: bigint, event: ethers.Log) => {
					const data: EventData.Alps.AuctionHouse.AuctionSettled = {
						alpId: Number(alpId),
						winner: { id: winner } as Account,
						amount: amount,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AuctionTimeBufferUpdated":
				this.contract.on("AuctionTimeBufferUpdated", (timeBuffer: bigint, event: ethers.Log) => {
					const data: EventData.Alps.AuctionHouse.AuctionTimeBufferUpdated = {
						timeBuffer: timeBuffer,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Log) => {
					const data: EventData.Alps.AuctionHouse.OwnershipTransferred = {
						previousOwner: { id: previousOwner },
						newOwner: { id: newOwner },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Paused":
				this.contract.on("Paused", (account: string, event: ethers.Log) => {
					const data: EventData.Alps.AuctionHouse.Paused = {
						account: { id: account },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Unpaused":
				this.contract.on("Unpaused", (account: string, event: ethers.Log) => {
					const data: EventData.Alps.AuctionHouse.Unpaused = {
						account: { id: account },
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

	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	public name() {
		return "AlpsAuctionHouse";
	}

	public hasEvent(eventName: string) {
		return AlpsAuctionHouse.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
