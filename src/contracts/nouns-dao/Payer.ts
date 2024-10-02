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

export class Payer {
	private _provider: JsonRpcProvider;
	private _contract: Contract;
	private _payerViewer: PayerViewer;
	private _registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_PAYER_EVENTS;

	constructor(provider: JsonRpcProvider | string) {
		this._provider = createOrReturnProvider(provider);
		this._contract = createPayerContract(this._provider);
		this._payerViewer = new PayerViewer(this._contract);
		this._registeredListeners = new Map();
	}

	public get viewer() {
		return this._payerViewer;
	}

	public get contract() {
		return this._contract;
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "PaidBackDebt":
				this._contract.on(eventName, (account: string, amount: bigint, remainingDebt: bigint, event: Log) => {
					const data: EventData.PaidBackDebt = {
						account: { id: account },
						amount,
						remainingDebt,
						event
					};
					listener(data);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "RegisteredDebt":
				this._contract.on(eventName, (account: string, amount: bigint, event: Log) => {
					const data: EventData.RegisteredDebt = {
						account: { id: account },
						amount,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "TokensWithdrawn":
				this._contract.on(eventName, (account: string, amount: bigint, event: Log) => {
					const data: EventData.TokensWithdrawn = {
						account: { id: account },
						amount,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	public off(eventName: SupportedEventsType) {
		let listener = this._registeredListeners.get(eventName);
		if (listener) {
			this._contract.off(eventName, listener as Listener);
		}
		this._registeredListeners.delete(eventName);
	}

	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this._registeredListeners.get(eventName);
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
		const [_begin, _end] = await this.contract.queue();
		return {
			_begin,
			_end
		};
	}

	public async queueAt(index: number): Promise<QueueAt> {
		return this.contract.queueAt(index);
	}

	public async totalDebt(): Promise<bigint> {
		return this.contract.totalDebt();
	}
}
