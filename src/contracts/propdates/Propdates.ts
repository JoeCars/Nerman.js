import { ethers } from "ethers";
import { Account, EventData } from "../../types";
import { default as PropdatesABI } from "../abis/propdates/PropdatesABI.json";
import { SUPPORTED_PROPDATES_EVENTS } from "../../constants";

/**
 * A wrapper class around the Propdates contract.
 * Currently supports the `PostUpdate`, `PropUpdateAdminTransferStarted`, and `PropUpdateAdminTransfered` events.
 */
export class _Propdates {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<string, Function>;
	public supportedEvents: string[];

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract("0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1", PropdatesABI, this.provider);
		this.registeredListeners = new Map();
		this.supportedEvents = SUPPORTED_PROPDATES_EVENTS;
	}

	/**
	 * Assigns a listener function for the given event. Throws an error if the event is not supported.
	 * @param eventName The event being listened to.
	 * @param listener The listener function.
	 * @example
	 * propdates.on('PostUpdate', (data) => {
	 * 	console.log(data.propId);
	 * });
	 */
	public async on(eventType: string, listener: Function) {
		switch (eventType) {
			case "PostUpdate":
				this.Contract.on("PostUpdate", (propId: number, isCompleted: boolean, update: string, event: ethers.Event) => {
					const data: EventData.Propdates.PostUpdate = {
						propId: Number(propId),
						isCompleted: isCompleted,
						update: update,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "PropUpdateAdminTransferStarted":
				this.Contract.on(
					"PropUpdateAdminTransferStarted",
					(propId: number, oldAdmin: string, newAdmin: string, event: ethers.Event) => {
						const data: EventData.Propdates.PropUpdateAdminTransferStarted = {
							propId: propId,
							oldAdmin: { id: oldAdmin } as Account,
							newAdmin: { id: newAdmin } as Account,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "PropUpdateAdminTransfered":
				this.Contract.on(
					"PropUpdateAdminTransfered",
					(propId: number, oldAdmin: string, newAdmin: string, event: ethers.Event) => {
						const data: EventData.Propdates.PropUpdateAdminTransfered = {
							propId: propId,
							oldAdmin: { id: oldAdmin } as Account,
							newAdmin: { id: newAdmin } as Account,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			default:
				throw new Error(`${eventType} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes a listener.
	 * @param eventName the event listened to.
	 * @example
	 * propdates.off('PostUpdate');
	 */
	public off(eventName: string) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.providers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers the listener of the given event with the given data. Throws an error if the event did not have a listener.
	 * @param eventName The event to be triggered.
	 * @param data The data being passed to the listener.
	 * @example
	 * propdates.trigger('PostUpdate', {
	 * 	propId: 117,
	 * 	isCompleted: true,
	 * 	update: "It's done!",
	 * });
	 */
	public trigger(eventType: string, data: unknown) {
		const listener = this.registeredListeners.get(eventType);
		if (!listener) {
			throw new Error(`${eventType} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * @returns the name of the contract. 'Propdates'.
	 */
	public name() {
		return "Propdates";
	}
}
