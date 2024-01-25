import { ethers } from "ethers-v6";

import {
	_NounsForkAuctionHouse as NounsForkAuctionHouse,
	SupportedEventsType as ForkAuctionHouseEventTypes,
	SupportedEventMap as AuctionSupportedEventMap
} from "./NounsForkAuctionHouse";
import {
	_NounsForkLogic as NounsForkLogic,
	SupportedEventsType as ForkLogicEventTypes,
	SupportedEventMap as LogicSupportedEventMap
} from "./NounsForkLogic";
import {
	_NounsForkToken as NounsForkToken,
	SupportedEventsType as ForkTokenEventTypes,
	SupportedEventMap as TokenSupportedEventMap
} from "./NounsForkToken";

export interface SupportedEventMap extends AuctionSupportedEventMap, LogicSupportedEventMap, TokenSupportedEventMap {}
export type SupportedEventsType = ForkAuctionHouseEventTypes | ForkLogicEventTypes | ForkTokenEventTypes;

/**
 * A wrapper class for all LilNouns contracts.
 * Allows you to listen to events without worrying about which contract it's in.
 */
export class NounsFork {
	private _forkId: number;
	public provider: ethers.JsonRpcProvider;
	public nounsForkAuctionHouse: NounsForkAuctionHouse;
	public nounsForkLogic: NounsForkLogic;
	public nounsForkToken: NounsForkToken;

	public static readonly supportedEvents = [
		...NounsForkAuctionHouse.supportedEvents,
		...NounsForkLogic.supportedEvents,
		...NounsForkToken.supportedEvents
	];

	constructor(provider: ethers.JsonRpcProvider | string, forkId = 0) {
		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this._forkId = forkId;
		this.nounsForkAuctionHouse = new NounsForkAuctionHouse(this.provider, forkId);
		this.nounsForkLogic = new NounsForkLogic(this.provider, forkId);
		this.nounsForkToken = new NounsForkToken(this.provider, forkId);
	}

	get forkId() {
		return this._forkId;
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
		if (NounsForkAuctionHouse.supportedEvents.includes(eventName as ForkAuctionHouseEventTypes)) {
			this.nounsForkAuctionHouse.on(eventName as ForkAuctionHouseEventTypes, listener as any);
		} else if (NounsForkLogic.supportedEvents.includes(eventName as ForkLogicEventTypes)) {
			this.nounsForkLogic.on(eventName as ForkLogicEventTypes, listener as any);
		} else if (NounsForkToken.supportedEvents.includes(eventName as ForkTokenEventTypes)) {
			this.nounsForkToken.on(eventName as ForkTokenEventTypes, listener as any);
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
		if (NounsForkAuctionHouse.supportedEvents.includes(eventName as ForkAuctionHouseEventTypes)) {
			this.nounsForkAuctionHouse.trigger(eventName as ForkAuctionHouseEventTypes, data as any);
		} else if (NounsForkLogic.supportedEvents.includes(eventName as ForkLogicEventTypes)) {
			this.nounsForkLogic.trigger(eventName as ForkLogicEventTypes, data as any);
		} else if (NounsForkToken.supportedEvents.includes(eventName as ForkTokenEventTypes)) {
			this.nounsForkToken.trigger(eventName as ForkTokenEventTypes, data as any);
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
		if (NounsForkAuctionHouse.supportedEvents.includes(eventName as ForkAuctionHouseEventTypes)) {
			this.nounsForkAuctionHouse.off(eventName as ForkAuctionHouseEventTypes);
		} else if (NounsForkLogic.supportedEvents.includes(eventName as ForkLogicEventTypes)) {
			this.nounsForkLogic.off(eventName as ForkLogicEventTypes);
		} else if (NounsForkToken.supportedEvents.includes(eventName as ForkTokenEventTypes)) {
			this.nounsForkToken.off(eventName as ForkTokenEventTypes);
		}
	}

	/**
	 * @returns the name of the contract. `NounsFork`.
	 */
	public name() {
		return "NounsFork";
	}
}
