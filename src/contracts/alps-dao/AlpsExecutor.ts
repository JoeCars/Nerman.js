import { ethers } from "ethers";
import { EventData } from "../../types";
import { default as AlpsExecutorABI } from "../abis/alps/AlpsExecutor.json";
import { createOrReturnProvider } from "../../utilities/providers";

export interface SupportedEventMap {
	CancelTransaction: EventData.Alps.Executor.CancelTransaction;
	ExecuteTransaction: EventData.Alps.Executor.ExecuteTransaction;
	NewAdmin: EventData.Alps.Executor.NewAdmin;
	NewDelay: EventData.Alps.Executor.NewDelay;
	NewPendingAdmin: EventData.Alps.Executor.NewPendingAdmin;
	QueueTransaction: EventData.Alps.Executor.QueueTransaction;
}
const SUPPORTED_ALPS_EXECUTOR_EVENTS = [
	"CancelTransaction",
	"ExecuteTransaction",
	"NewAdmin",
	"NewDelay",
	"NewPendingAdmin",
	"QueueTransaction"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

export class AlpsExecutor {
	private provider: ethers.JsonRpcProvider;
	public contract: ethers.Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_ALPS_EXECUTOR_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);

		this.contract = new ethers.Contract("0x4D4F73D111e43CF5864D18bc8E186DE8094962B2", AlpsExecutorABI, this.provider);
		this.registeredListeners = new Map();
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "CancelTransaction":
				this.contract.on(
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
						const eventData: EventData.Alps.Executor.CancelTransaction = {
							txHash,
							target: { id: target },
							value,
							signature,
							data,
							eta,
							event
						};

						listener(eventData as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ExecuteTransaction":
				this.contract.on(
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
						const eventData: EventData.Alps.Executor.ExecuteTransaction = {
							txHash,
							target: { id: target },
							value,
							signature,
							data,
							eta,
							event
						};

						listener(eventData as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewAdmin":
				this.contract.on(eventName, (newAdmin: string, event: ethers.Log) => {
					const data: EventData.Alps.Executor.NewAdmin = {
						newAdmin: { id: newAdmin },
						event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewDelay":
				this.contract.on(eventName, (newDelay: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Executor.NewDelay = {
						newDelay,
						event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewPendingAdmin":
				this.contract.on(eventName, (newPendingAdmin: string, event: ethers.Log) => {
					const data: EventData.Alps.Executor.NewPendingAdmin = {
						newPendingAdmin: { id: newPendingAdmin },
						event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "QueueTransaction":
				this.contract.on(
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
						const eventData: EventData.Alps.Executor.QueueTransaction = {
							txHash,
							target: { id: target },
							value,
							signature,
							data,
							eta,
							event
						};

						listener(eventData as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	public name() {
		return "AlpsExecutor";
	}

	public hasEvent(eventName: string) {
		return AlpsExecutor.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
