import { JsonRpcProvider, Contract, Log, Listener } from "ethers";

import { createOrReturnProvider } from "../../utilities/providers";
import { EventData } from "../../types";
import { createPayerContract } from "../../utilities/contracts";

export interface SupportedEventMap {
	PaidBackDebt: EventData.PaidBackDebt;
	RegisteredDebt: EventData.RegisteredDebt;
	TokensWithdrawn: EventData.TokensWithdrawn;
}
const SUPPORTED_PAYER_EVENTS = ["PaidBackDebt", "RegisteredDebt", "TokensWithdrawn"] as const;
export type SupportedEventsType = keyof SupportedEventMap;

export default class Payer {
	private provider: JsonRpcProvider;
	private contract: Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_PAYER_EVENTS;

	constructor(provider: JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.contract = createPayerContract(this.provider);
		this.registeredListeners = new Map();
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "PaidBackDebt":
				this.contract.on(eventName, (account: string, amount: bigint, remainingDebt: bigint, event: Log) => {
					const data: EventData.PaidBackDebt = {
						account: { id: account },
						amount,
						remainingDebt,
						event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "RegisteredDebt":
				this.contract.on(eventName, (account: string, amount: bigint, event: Log) => {
					const data: EventData.RegisteredDebt = {
						account: { id: account },
						amount,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "TokensWithdrawn":
				this.contract.on(eventName, (account: string, amount: bigint, event: Log) => {
					const data: EventData.TokensWithdrawn = {
						account: { id: account },
						amount,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.contract.off(eventName, listener as Listener);
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
}
