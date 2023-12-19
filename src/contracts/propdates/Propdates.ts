import { ethers } from "ethers";
import { Account, EventData } from "../../types";
import { default as PropdatesABI } from "../abis/propdates/PropdatesV2.json";
import { SUPPORTED_PROPDATES_EVENTS } from "../../constants";

export type SupportedEventsType = (typeof SUPPORTED_PROPDATES_EVENTS)[number];

/**
 * A wrapper class around the Propdates contract.
 * Currently supports the `PostUpdate`, `PropUpdateAdminTransferStarted`, and `PropUpdateAdminTransfered` events.
 */
export class _Propdates {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_PROPDATES_EVENTS;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract("0xa5Bf9A9b8f60CFD98b1cCB592f2F9F37Bb0033a4", PropdatesABI, this.provider);
		this.registeredListeners = new Map();
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
	public async on(eventName: SupportedEventsType, listener: Function) {
		switch (eventName) {
			case "Initialized":
				this.Contract.on("Initialized", (version: number, event: ethers.Event) => {
					const data: EventData.Propdates.Initialized = {
						version: Number(version),
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferStarted":
				this.Contract.on("OwnershipTransferStarted", (previousOwner: string, newOwner: string, event: ethers.Event) => {
					const data: EventData.Propdates.OwnershipTransferStarted = {
						previousOwner: { id: previousOwner },
						newOwner: { id: newOwner },
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.Contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Event) => {
					const data: EventData.Propdates.OwnershipTransferred = {
						previousOwner: { id: previousOwner },
						newOwner: { id: newOwner },
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

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
				this.registeredListeners.set(eventName, listener);
				break;

			case "PropUpdateAdminMigrated":
				this.Contract.on(
					"PropUpdateAdminMigrated",
					(propId: number, oldAdmin: string, newAdmin: string, event: ethers.Event) => {
						const data: EventData.Propdates.PropUpdateAdminMigrated = {
							propId: Number(propId),
							oldAdmin: { id: oldAdmin } as Account,
							newAdmin: { id: newAdmin } as Account,
							event: event
						};
						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "PropUpdateAdminRecovered":
				this.Contract.on(
					"PropUpdateAdminRecovered",
					(propId: number, oldAdmin: string, newAdmin: string, event: ethers.Event) => {
						const data: EventData.Propdates.PropUpdateAdminRecovered = {
							propId: Number(propId),
							oldAdmin: { id: oldAdmin } as Account,
							newAdmin: { id: newAdmin } as Account,
							event: event
						};
						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "PropUpdateAdminTransferred":
				this.Contract.on(
					"PropUpdateAdminTransferred",
					(propId: number, oldAdmin: string, newAdmin: string, event: ethers.Event) => {
						const data: EventData.Propdates.PropUpdateAdminTransferred = {
							propId: propId,
							oldAdmin: { id: oldAdmin } as Account,
							newAdmin: { id: newAdmin } as Account,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "SuperAdminTransferred":
				this.Contract.on(
					"SuperAdminTransferred",
					(oldSuperAdmin: string, newSuperAdmin: string, event: ethers.Event) => {
						const data: EventData.Propdates.SuperAdminTransferred = {
							oldSuperAdmin: { id: oldSuperAdmin } as Account,
							newSuperAdmin: { id: newSuperAdmin } as Account,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "Upgraded":
				this.Contract.on("Upgraded", (implementation: string, event: ethers.Event) => {
					const data: EventData.Propdates.Upgraded = {
						implementation: { id: implementation } as Account,
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
	 * Removes a listener.
	 * @param eventName the event listened to.
	 * @example
	 * propdates.off('PostUpdate');
	 */
	public off(eventName: SupportedEventsType) {
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
	 * 	update: "It's done!"
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
	 * @returns the name of the contract. 'Propdates'.
	 */
	public name() {
		return "Propdates";
	}
}
