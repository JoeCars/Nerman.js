import { ethers } from "ethers";

import { LilNounsAuctionHouse, SupportedEventsType as LilNounsAuctionHouseSupportedEventsType } from "./LilNounsAuctionHouse";
import { LilNounsDAOLogic, SupportedEventsType as LilNounsDAOLogicSupportedEventsType } from "./LilNounsDAOLogic";
import { LilNounsToken, SupportedEventsType as LilNounsTokenSupportedEventsType } from "./LilNounsToken";

export type SupportedEventsType =
	| LilNounsAuctionHouseSupportedEventsType
	| LilNounsDAOLogicSupportedEventsType
	| LilNounsTokenSupportedEventsType;

/**
 * A wrapper class for all LilNouns contracts.
 * Allows you to listen to events without worrying about which contract it's in.
 */
export class LilNouns {
	public provider: ethers.providers.JsonRpcProvider;

	public lilNounsAuctionHouse: LilNounsAuctionHouse;
	public lilNounsDAOLogic: LilNounsDAOLogic;
	public lilNounsToken: LilNounsToken;
	public static readonly supportedEvents = [
		...LilNounsAuctionHouse.supportedEvents,
		...LilNounsDAOLogic.supportedEvents,
		...LilNounsToken.supportedEvents
	];

	constructor(provider: ethers.providers.JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = new ethers.providers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

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
	public on(eventName: SupportedEventsType, listener: Function) {
		if (LilNounsAuctionHouse.supportedEvents.includes(eventName as LilNounsAuctionHouseSupportedEventsType)) {
			this.lilNounsAuctionHouse.on(eventName as LilNounsAuctionHouseSupportedEventsType, listener);
		} else if (LilNounsDAOLogic.supportedEvents.includes(eventName as LilNounsDAOLogicSupportedEventsType)) {
			this.lilNounsDAOLogic.on(eventName as LilNounsDAOLogicSupportedEventsType, listener);
		} else if (LilNounsToken.supportedEvents.includes(eventName as LilNounsTokenSupportedEventsType)) {
			this.lilNounsToken.on(eventName as LilNounsTokenSupportedEventsType, listener);
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
		if (LilNounsAuctionHouse.supportedEvents.includes(eventName as LilNounsAuctionHouseSupportedEventsType)) {
			this.lilNounsAuctionHouse.trigger(eventName as LilNounsAuctionHouseSupportedEventsType, data);
		} else if (LilNounsDAOLogic.supportedEvents.includes(eventName as LilNounsDAOLogicSupportedEventsType)) {
			this.lilNounsDAOLogic.trigger(eventName as LilNounsDAOLogicSupportedEventsType, data);
		} else if (LilNounsToken.supportedEvents.includes(eventName as LilNounsTokenSupportedEventsType)) {
			this.lilNounsToken.trigger(eventName as LilNounsTokenSupportedEventsType, data);
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
}
