import { ethers } from "ethers";

import { Account, EventData } from "../../types";
import { createOrReturnProvider } from "../../utilities/providers";
import { WalletTokenFinder } from "../../utilities/tokens";
import { createNounsDaoExecutorContract } from "../../utilities/contracts";

export interface SupportedEventMap {
	AdminChanged: EventData.AdminChanged;
	BeaconUpgraded: EventData.BeaconUpgraded;
	CancelTransaction: EventData.CancelTransaction;
	ERC20Sent: EventData.ERC20Sent;
	ETHSent: EventData.ETHSent;
	ExecuteTransaction: EventData.ExecuteTransaction;
	NewAdmin: EventData.NewAdmin;
	NewDelay: EventData.NewDelay;
	NewPendingAdmin: EventData.NewPendingAdmin;
	QueueTransaction: EventData.QueueTransaction;
	Upgraded: EventData.Upgraded;
}
const SUPPORTED_NOUNS_DAO_EXECUTOR_EVENTS = [
	"AdminChanged",
	"BeaconUpgraded",
	"CancelTransaction",
	"ERC20Sent",
	"ETHSent",
	"ExecuteTransaction",
	"NewAdmin",
	"NewDelay",
	"NewPendingAdmin",
	"QueueTransaction",
	"Upgraded"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class around the NounsDaoExecutor contract.
 */
export class NounsDaoExecutor {
	public provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_DAO_EXECUTOR_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.Contract = createNounsDaoExecutorContract(this.provider);
		this.registeredListeners = new Map();
	}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The name of the event.
	 * @param listener The listener function.
	 * @example
	 * nounsDaoExecutor.on('AdminChanged', (data) => {
	 * 	console.log(data.newAdmin);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "AdminChanged":
				this.Contract.on(eventName, (previousAdmin: string, newAdmin: string, event: ethers.Log) => {
					const data: EventData.AdminChanged = {
						previousAdmin: { id: previousAdmin },
						newAdmin: { id: newAdmin },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "BeaconUpgraded":
				this.Contract.on(eventName, (beacon: string, event: ethers.Log) => {
					const data: EventData.BeaconUpgraded = {
						beacon: { id: beacon },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "CancelTransaction":
				this.Contract.on(
					eventName,
					(
						txHash: string,
						target: string,
						value: bigint,
						signature: string,
						data: string,
						eta: bigint,
						event: ethers.Log
					) => {
						const formattedData: EventData.CancelTransaction = {
							txHash,
							target: { id: target },
							value,
							signature,
							data,
							eta,
							event
						};

						listener(formattedData as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ERC20Sent":
				this.Contract.on(eventName, (to: string, erc20Token: string, amount: bigint, event: ethers.Log) => {
					const data: EventData.ERC20Sent = {
						to: { id: to },
						erc20Token: { id: erc20Token },
						amount,
						event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ETHSent":
				this.Contract.on(eventName, (to: string, amount: bigint, event: ethers.Log) => {
					const data: EventData.ETHSent = {
						to: { id: to },
						amount,
						event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ExecuteTransaction":
				this.Contract.on(
					eventName,
					(
						txHash: string,
						target: string,
						value: bigint,
						signature: string,
						data: string,
						eta: bigint,
						event: ethers.Log
					) => {
						const formattedData: EventData.ExecuteTransaction = {
							txHash,
							target: { id: target },
							value,
							signature,
							data,
							eta,
							event
						};

						listener(formattedData as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewAdmin":
				this.Contract.on(eventName, (newAdmin: string, event: ethers.Log) => {
					const data: EventData.NewAdmin = {
						newAdmin: { id: newAdmin },
						event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewDelay":
				this.Contract.on(eventName, (newDelay: bigint, event: ethers.Log) => {
					const data: EventData.NewDelay = {
						newDelay,
						event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewPendingAdmin":
				this.Contract.on(eventName, (newPendingAdmin: string, event: ethers.Log) => {
					const data: EventData.NewPendingAdmin = {
						newPendingAdmin: { id: newPendingAdmin },
						event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "QueueTransaction":
				this.Contract.on(
					eventName,
					(
						txHash: string,
						target: string,
						value: bigint,
						signature: string,
						data: string,
						eta: bigint,
						event: ethers.Log
					) => {
						const formattedData: EventData.QueueTransaction = {
							txHash,
							target: { id: target },
							value,
							signature,
							data,
							eta,
							event
						};

						listener(formattedData as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "Upgraded":
				this.Contract.on(eventName, (implementation: string, event: ethers.Log) => {
					const data: EventData.Upgraded = {
						implementation: { id: implementation } as Account,
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

	/**
	 * Removes an event listener.
	 * @param eventName the event listened to.
	 * @example
	 * nounsDaoExecutor.off('AdminChanged');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if there is no assigned listener.
	 * @param eventName the event name.
	 * @param data the event data.
	 * @example
	 * nounsDaoExecutor.trigger('AdminChanged', {
	 * 	previousAdmin: {id: '0x281eC184E704CE57570614C33B3477Ec7Ff07243'},
	 * 	newAdmin: {id: '0x281eC184E704CE57570614C33B3477Ec7Ff07243'}
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
	 * @returns The name of the contract.
	 */
	public name() {
		return "NounsDaoExecutor";
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return NounsDaoExecutor.supportedEvents.includes(eventName as SupportedEventsType);
	}

	public async fetchTreasuryContents() {
		const address = await this.Contract.getAddress();
		const walletTokenFinder = new WalletTokenFinder(this.provider);
		return walletTokenFinder.fetchWalletTokens(address);
	}
}
