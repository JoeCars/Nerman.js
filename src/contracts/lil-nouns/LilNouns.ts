import { ethers } from "ethers";

import {
	LilNounsAuctionHouse,
	SupportedEventsType as LilNounsAuctionHouseSupportedEventsType,
	SupportedEventMap as AuctionSupportedEventMap
} from "./LilNounsAuctionHouse";
import {
	LilNounsDAOLogic,
	SupportedEventsType as LilNounsDAOLogicSupportedEventsType,
	SupportedEventMap as LogicSupportedEventMap
} from "./LilNounsDAOLogic";
import {
	LilNounsToken,
	SupportedEventsType as LilNounsTokenSupportedEventsType,
	SupportedEventMap as TokenSupportedEventMap
} from "./LilNounsToken";
import { createOrReturnProvider } from "../../utilities/providers";

export interface SupportedEventMap extends AuctionSupportedEventMap, LogicSupportedEventMap, TokenSupportedEventMap {}
export type SupportedEventsType =
	| LilNounsAuctionHouseSupportedEventsType
	| LilNounsDAOLogicSupportedEventsType
	| LilNounsTokenSupportedEventsType;

/**
 * A wrapper class for all LilNouns contracts.
 * Allows you to listen to events without worrying about which contract it's in.
 */
export class LilNouns {
	public provider: ethers.JsonRpcProvider;

	public lilNounsAuctionHouse: LilNounsAuctionHouse;
	public lilNounsDAOLogic: LilNounsDAOLogic;
	public lilNounsToken: LilNounsToken;
	public static readonly supportedEvents = [
		...LilNounsAuctionHouse.supportedEvents,
		...LilNounsDAOLogic.supportedEvents,
		...LilNounsToken.supportedEvents
	];

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);

		this.lilNounsAuctionHouse = new LilNounsAuctionHouse(this.provider);
		this.lilNounsDAOLogic = new LilNounsDAOLogic(this.provider);
		this.lilNounsToken = new LilNounsToken(this.provider);
	}

	/**
	 * Adds a listener to the event. The listener is triggered whenever the event occurs onchain, and event data is passed to the function.
	 * Throws an error if the event is not supported.
	 * @param eventName the event
	 * @param listener the listener function
	 * @example
	 * lilNouns.on('VoteCast', (data) => {
	 * 	console.log(data.proposalId);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		if (LilNounsAuctionHouse.supportedEvents.includes(eventName as LilNounsAuctionHouseSupportedEventsType)) {
			this.lilNounsAuctionHouse.on(eventName as LilNounsAuctionHouseSupportedEventsType, listener as any);
		} else if (LilNounsDAOLogic.supportedEvents.includes(eventName as LilNounsDAOLogicSupportedEventsType)) {
			this.lilNounsDAOLogic.on(eventName as LilNounsDAOLogicSupportedEventsType, listener as any);
		} else if (LilNounsToken.supportedEvents.includes(eventName as LilNounsTokenSupportedEventsType)) {
			this.lilNounsToken.on(eventName as LilNounsTokenSupportedEventsType, listener as any);
		} else {
			throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Triggers the event's listener with the data.
	 * Throws an error if there is no listener already assigned.
	 * @param eventName the name of the event you are triggering.
	 * @param data the data passed to the listener.
	 * @example
	 * lilNouns.trigger('ProposalExecuted', {id: 420});
	 */
	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		if (LilNounsAuctionHouse.supportedEvents.includes(eventName as LilNounsAuctionHouseSupportedEventsType)) {
			this.lilNounsAuctionHouse.trigger(eventName as LilNounsAuctionHouseSupportedEventsType, data as any);
		} else if (LilNounsDAOLogic.supportedEvents.includes(eventName as LilNounsDAOLogicSupportedEventsType)) {
			this.lilNounsDAOLogic.trigger(eventName as LilNounsDAOLogicSupportedEventsType, data as any);
		} else if (LilNounsToken.supportedEvents.includes(eventName as LilNounsTokenSupportedEventsType)) {
			this.lilNounsToken.trigger(eventName as LilNounsTokenSupportedEventsType, data as any);
		} else {
			throw new Error(`${eventName} does not have a listener.`);
		}
	}

	/**
	 * Removes any assigned listeners from the event.
	 * Does nothing if there was no listener.
	 * @param eventName the event whose listener you are removing.
	 * @example
	 * lilNouns.off('ProposalExecuted');
	 */
	public off(eventName: SupportedEventsType) {
		if (LilNounsAuctionHouse.supportedEvents.includes(eventName as LilNounsAuctionHouseSupportedEventsType)) {
			this.lilNounsAuctionHouse.off(eventName as LilNounsAuctionHouseSupportedEventsType);
		} else if (LilNounsDAOLogic.supportedEvents.includes(eventName as LilNounsDAOLogicSupportedEventsType)) {
			this.lilNounsDAOLogic.off(eventName as LilNounsDAOLogicSupportedEventsType);
		} else if (LilNounsToken.supportedEvents.includes(eventName as LilNounsTokenSupportedEventsType)) {
			this.lilNounsToken.off(eventName as LilNounsTokenSupportedEventsType);
		}
	}

	/**
	 * @returns the name of the contract. `LilNouns`.
	 */
	public name() {
		return "LilNouns";
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return LilNouns.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
