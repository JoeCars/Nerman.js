import { ethers } from "ethers";

import {
	_NounsForkAuctionHouse as NounsForkAuctionHouse,
	SupportedEventsType as ForkAuctionHouseEventTypes
} from "./NounsForkAuctionHouse";
import { _NounsForkLogic as NounsForkLogic, SupportedEventsType as ForkLogicEventTypes } from "./NounsForkLogic";
import { _NounsForkToken as NounsForkToken, SupportedEventsType as ForkTokenEventTypes } from "./NounsForkToken";

export type SupportedEventsType = ForkAuctionHouseEventTypes | ForkLogicEventTypes | ForkTokenEventTypes;

/**
 * A wrapper class for all LilNouns contracts.
 * Allows you to listen to events without worrying about which contract it's in.
 */
export class NounsFork {
	public provider: ethers.providers.JsonRpcProvider;
	public nounsForkAuctionHouse: NounsForkAuctionHouse;
	public nounsForkLogic: NounsForkLogic;
	public nounsForkToken: NounsForkToken;

	public static readonly supportedEvents = [
		...NounsForkAuctionHouse.supportedEvents,
		...NounsForkLogic.supportedEvents,
		...NounsForkToken.supportedEvents
	];

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.nounsForkAuctionHouse = new NounsForkAuctionHouse(provider);
		this.nounsForkLogic = new NounsForkLogic(provider);
		this.nounsForkToken = new NounsForkToken(provider);
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
	public on(eventName: SupportedEventsType, listener: Function) {
		if (NounsForkAuctionHouse.supportedEvents.includes(eventName as ForkAuctionHouseEventTypes)) {
			this.nounsForkAuctionHouse.on(eventName as ForkAuctionHouseEventTypes, listener);
		} else if (NounsForkLogic.supportedEvents.includes(eventName as ForkLogicEventTypes)) {
			this.nounsForkLogic.on(eventName as ForkLogicEventTypes, listener);
		} else if (NounsForkToken.supportedEvents.includes(eventName as ForkTokenEventTypes)) {
			this.nounsForkToken.on(eventName as ForkTokenEventTypes, listener);
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
	public trigger(eventName: SupportedEventsType, data: unknown) {
		if (NounsForkAuctionHouse.supportedEvents.includes(eventName as ForkAuctionHouseEventTypes)) {
			this.nounsForkAuctionHouse.trigger(eventName as ForkAuctionHouseEventTypes, data);
		} else if (NounsForkLogic.supportedEvents.includes(eventName as ForkLogicEventTypes)) {
			this.nounsForkLogic.trigger(eventName as ForkLogicEventTypes, data);
		} else if (NounsForkToken.supportedEvents.includes(eventName as ForkTokenEventTypes)) {
			this.nounsForkToken.trigger(eventName as ForkTokenEventTypes, data);
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
