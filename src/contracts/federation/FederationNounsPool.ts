import { ethers } from "ethers-v6";
import NounsPool from "../abis/federation/NounsPool";
import NounsPoolV2 from "../abis/federation/NounsPoolV2";
import { EventData } from "../../types";

export interface SupportedEventMap {
	BidPlaced: EventData.Federation.BidPlaced;
	VoteCast: EventData.Federation.VoteCast;
}
const SUPPORTED_FEDERATION_EVENTS = ["BidPlaced", "VoteCast"] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class that supports Federation NounsPool events.
 */
export class FederationNounsPool {
	public provider: ethers.JsonRpcProvider;
	public nounsPoolContractV2: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_FEDERATION_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this.nounsPoolContractV2 = new ethers.Contract(
			"0x0f722d69B3D8C292E85F2b1E5D9F4439edd58F1e",
			NounsPoolV2,
			this.provider
		);
		this.registeredListeners = new Map();
	}

	/**
	 * Assigns a listener to the federation event. Adds the listener to both V1 and V2 contracts. Throws an error if the event is not supported.
	 * @param eventName The event listened to.
	 * @param listener A listener function that takes in the appropriate data type for the event.
	 * @example
	 * federationNounsPool.on('BidPlaced', (data) => {
	 * 	console.log(data.propId);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		if (eventName === "BidPlaced") {
			this.nounsPoolContractV2.on(
				eventName,
				(
					dao: string,
					propId: BigInt,
					support: BigInt,
					amount: BigInt,
					bidder: string,
					reason: string,
					event: ethers.EventLog
				) => {
					const data: EventData.Federation.BidPlaced = {
						dao: { id: dao },
						propId: Number(propId),
						support: Number(support),
						amount,
						bidder: { id: bidder },
						reason,
						event
					};

					listener(data);
				}
			);
			this.registeredListeners.set(eventName, listener);
		} else if (eventName === "VoteCast") {
			this.nounsPoolContractV2.on(
				eventName,
				(dao: string, propId: BigInt, support: BigInt, amount: BigInt, bidder: string, event: ethers.EventLog) => {
					const data: EventData.Federation.VoteCast = {
						dao: { id: dao },
						propId: Number(propId),
						support: Number(support),
						amount,
						bidder: { id: bidder },
						event
					};

					listener(data);
				}
			);
			this.registeredListeners.set(eventName, listener);
		} else {
			throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes the listener of the given event. Does nothing if the event was not listened to in the first place.
	 * @param eventName The event being removed.
	 * @example
	 * federationNounsPool.off('BidPlaced');
	 */
	public off(eventName: SupportedEventsType) {
		const listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.nounsPoolContractV2.off(eventName, listener as ethers.Listener);
		}

		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event with the given data, which calls the assigned listener. Throws an error if the listener could not be found.
	 * @param eventName The event being triggered.
	 * @param data The data used to trigger the given event.
	 * @example
	 * federationNounsPool.trigger('BidPlaced', {
	 *		dao: "0x6f3E6272A167e8AcCb32072d08E0957F9c79223d",
	 *		propId: 346,
	 *		support: 1,
	 *		amount: 42000000000000001,
	 *		bidder: "0x2B0E9aA394209fa8D783C9e8cbFb08A15C019cdF",
	 *		reason: ""
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
	 * @returns the contract name. 'FederationNounsPool'.
	 */
	public name() {
		return "FederationNounsPool";
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return FederationNounsPool.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
