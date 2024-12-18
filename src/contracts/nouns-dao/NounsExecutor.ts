import { Contract, ethers } from "ethers";

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
export class NounsExecutor {
	private _provider: ethers.JsonRpcProvider;
	private _contract: ethers.Contract;
	private _registeredListeners: Map<SupportedEventsType, Function>;
	private _nounsExecutorViewer: NounsExecutorViewer;
	public static readonly supportedEvents = SUPPORTED_NOUNS_DAO_EXECUTOR_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this._provider = createOrReturnProvider(provider);
		this._contract = createNounsDaoExecutorContract(this._provider);
		this._nounsExecutorViewer = new NounsExecutorViewer(this._contract);
		this._registeredListeners = new Map();
	}

	public get viewer() {
		return this._nounsExecutorViewer;
	}

	public get contract() {
		return this._contract;
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
				this._contract.on(eventName, (previousAdmin: string, newAdmin: string, event: ethers.Log) => {
					const data: EventData.AdminChanged = {
						previousAdmin: { id: previousAdmin },
						newAdmin: { id: newAdmin },
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "BeaconUpgraded":
				this._contract.on(eventName, (beacon: string, event: ethers.Log) => {
					const data: EventData.BeaconUpgraded = {
						beacon: { id: beacon },
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "CancelTransaction":
				this._contract.on(
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "ERC20Sent":
				this._contract.on(eventName, (to: string, erc20Token: string, amount: bigint, event: ethers.Log) => {
					const data: EventData.ERC20Sent = {
						to: { id: to },
						erc20Token: { id: erc20Token },
						amount,
						event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ETHSent":
				this._contract.on(eventName, (to: string, amount: bigint, event: ethers.Log) => {
					const data: EventData.ETHSent = {
						to: { id: to },
						amount,
						event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ExecuteTransaction":
				this._contract.on(
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "NewAdmin":
				this._contract.on(eventName, (newAdmin: string, event: ethers.Log) => {
					const data: EventData.NewAdmin = {
						newAdmin: { id: newAdmin },
						event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "NewDelay":
				this._contract.on(eventName, (newDelay: bigint, event: ethers.Log) => {
					const data: EventData.NewDelay = {
						newDelay,
						event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "NewPendingAdmin":
				this._contract.on(eventName, (newPendingAdmin: string, event: ethers.Log) => {
					const data: EventData.NewPendingAdmin = {
						newPendingAdmin: { id: newPendingAdmin },
						event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "QueueTransaction":
				this._contract.on(
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "Upgraded":
				this._contract.on(eventName, (implementation: string, event: ethers.Log) => {
					const data: EventData.Upgraded = {
						implementation: { id: implementation } as Account,
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
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
		let listener = this._registeredListeners.get(eventName);
		if (listener) {
			this._contract.off(eventName, listener as ethers.Listener);
		}
		this._registeredListeners.delete(eventName);
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
		const listener = this._registeredListeners.get(eventName);
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
		return NounsExecutor.supportedEvents.includes(eventName as SupportedEventsType);
	}

	public async fetchTreasuryContents() {
		const address = await this._contract.getAddress();
		const walletTokenFinder = new WalletTokenFinder(this._provider);
		return walletTokenFinder.fetchWalletTokens(address);
	}
}

class NounsExecutorViewer {
	private contract: Contract;
	constructor(contract: Contract) {
		this.contract = contract;
	}

	public async GRACE_PERIOD(): Promise<bigint> {
		return this.contract.GRACE_PERIOD();
	}

	public async MAXIMUM_DELAY(): Promise<bigint> {
		return this.contract.MAXIMUM_DELAY();
	}

	public async MINIMUM_DELAY(): Promise<bigint> {
		return this.contract.MINIMUM_DELAY();
	}

	public async NAME(): Promise<string> {
		return this.contract.NAME();
	}

	public async admin(): Promise<string> {
		return this.contract.admin();
	}

	public async delay(): Promise<bigint> {
		return this.contract.delay();
	}

	public async pendingAdmin(): Promise<string> {
		return this.contract.pendingAdmin();
	}
}
