import { ethers } from "ethers";

import { LilNounsAuctionHouse } from "./LilNounsAuctionHouse";
import { LilNounsDAOLogic } from "./LilNounsDAOLogic";
import { LilNounsToken } from "./LilNounsToken";

/**
 * A wrapper class for all LilNouns contracts.
 * Allows you to listen to events without worrying about which contract it's in.
 */
export class LilNouns {
	public provider: ethers.providers.JsonRpcProvider;

	public lilNounsAuctionHouse: LilNounsAuctionHouse;
	public lilNounsDAOLogic: LilNounsDAOLogic;
	public lilNounsToken: LilNounsToken;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;

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
	public on(eventName: string, listener: Function) {
		if (this.lilNounsAuctionHouse.supportedEvents.includes(eventName)) {
			this.lilNounsAuctionHouse.on(eventName, listener);
		} else if (this.lilNounsDAOLogic.supportedEvents.includes(eventName)) {
			this.lilNounsDAOLogic.on(eventName, listener);
		} else if (this.lilNounsToken.supportedEvents.includes(eventName)) {
			this.lilNounsToken.on(eventName, listener);
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
	 * lilNouns.trigger('ProposalExecuted', {id: 420, event: {}});
	 */
	public trigger(eventName: string, data: unknown) {
		if (this.lilNounsAuctionHouse.supportedEvents.includes(eventName)) {
			this.lilNounsAuctionHouse.trigger(eventName, data);
		} else if (this.lilNounsDAOLogic.supportedEvents.includes(eventName)) {
			this.lilNounsDAOLogic.trigger(eventName, data);
		} else if (this.lilNounsToken.supportedEvents.includes(eventName)) {
			this.lilNounsToken.trigger(eventName, data);
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
	public off(eventName: string) {
		if (this.lilNounsAuctionHouse.supportedEvents.includes(eventName)) {
			this.lilNounsAuctionHouse.off(eventName);
		} else if (this.lilNounsDAOLogic.supportedEvents.includes(eventName)) {
			this.lilNounsDAOLogic.off(eventName);
		} else if (this.lilNounsToken.supportedEvents.includes(eventName)) {
			this.lilNounsToken.off(eventName);
		}
	}

	/**
	 * @returns the name of the contract. `LilNouns`.
	 */
	public name() {
		return "LilNouns";
	}
}
