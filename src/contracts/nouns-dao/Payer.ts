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
	private payerViewer: PayerViewer;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_PAYER_EVENTS;

	constructor(provider: JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.contract = createPayerContract(this.provider);
		this.payerViewer = new PayerViewer(this.contract);
		this.registeredListeners = new Map();
	}

	public get viewer() {
		return this.payerViewer;
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

interface Queue {
	_begin: bigint;
	_end: bigint;
}

interface QueueAt {
	account: string;
	amount: bigint;
}

class PayerViewer {
	private contract: Contract;
	constructor(contract: Contract) {
		this.contract = contract;
	}

	public async debtOf(account: string): Promise<bigint> {
		return this.contract.debtOf(account);
	}

	public async owner(): Promise<string> {
		return this.contract.owner();
	}

	public async paymentToken(): Promise<string> {
		return this.contract.paymentToken();
	}

	public async queue(): Promise<Queue> {
		return this.contract.queue();
	}

	public async queueAt(index: number): Promise<QueueAt> {
		return this.contract.queueAt(index);
	}

	public async totalDebt(): Promise<bigint> {
		return this.contract.totalDebt();
	}
}
