import { JsonRpcProvider, Contract, Log, Listener } from "ethers-v6";

import { createOrReturnProvider } from "../../utilities/providers";
import { EventData } from "../../types";
import { createTokenBuyerContract } from "../../utilities/contracts";

export interface SupportedEventMap {
	AdminSet: EventData.AdminSet;
	BaselinePaymentTokenAmountSet: EventData.BaselinePaymentTokenAmountSet;
	BotDiscountBPsSet: EventData.BotDiscountBPsSet;
	ETHWithdrawn: EventData.ETHWithdrawn;
	MaxAdminBaselinePaymentTokenAmountSet: EventData.MaxAdminBaselinePaymentTokenAmountSet;
	MaxAdminBotDiscountBPsSet: EventData.MaxAdminBotDiscountBPsSet;
	MinAdminBaselinePaymentTokenAmountSet: EventData.MinAdminBaselinePaymentTokenAmountSet;
	MinAdminBotDiscountBPsSet: EventData.MinAdminBotDiscountBPsSet;
	PayerSet: EventData.PayerSet;
	PriceFeedSet: EventData.PriceFeedSet;
	SoldETH: EventData.SoldETH;
}
const SUPPORTED_TOKEN_BUYER_EVENTS = [
	"AdminSet",
	"BaselinePaymentTokenAmountSet",
	"BotDiscountBPsSet",
	"ETHWithdrawn",
	"MaxAdminBaselinePaymentTokenAmountSet",
	"MaxAdminBotDiscountBPsSet",
	"MinAdminBaselinePaymentTokenAmountSet",
	"MinAdminBotDiscountBPsSet",
	"PayerSet",
	"PriceFeedSet",
	"SoldETH"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

export default class TokenBuyer {
	private provider: JsonRpcProvider;
	private contract: Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_TOKEN_BUYER_EVENTS;

	constructor(provider: JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.contract = createTokenBuyerContract(this.provider);
		this.registeredListeners = new Map();
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "AdminSet":
				this.contract.on(eventName, (oldAdmin: string, newAdmin: string, event: Log) => {
					const data: EventData.AdminSet = {
						oldAdmin: { id: oldAdmin },
						newAdmin: { id: newAdmin },
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "BaselinePaymentTokenAmountSet":
				this.contract.on(eventName, (oldAmount: bigint, newAmount: bigint, event: Log) => {
					const data: EventData.BaselinePaymentTokenAmountSet = {
						oldAmount,
						newAmount,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "BotDiscountBPsSet":
				this.contract.on(eventName, (oldBPs: bigint, newBPs: bigint, event: Log) => {
					const data: EventData.BotDiscountBPsSet = {
						oldBPs: Number(oldBPs),
						newBPs: Number(newBPs),
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ETHWithdrawn":
				this.contract.on(eventName, (to: string, amount: bigint, event: Log) => {
					const data: EventData.ETHWithdrawn = {
						to: { id: to },
						amount,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "MaxAdminBaselinePaymentTokenAmountSet":
				this.contract.on(eventName, (oldAmount: bigint, newAmount: bigint, event: Log) => {
					const data: EventData.MaxAdminBaselinePaymentTokenAmountSet = {
						oldAmount,
						newAmount,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "MaxAdminBotDiscountBPsSet":
				this.contract.on(eventName, (oldBPs: bigint, newBPs: bigint, event: Log) => {
					const data: EventData.MaxAdminBotDiscountBPsSet = {
						oldBPs: Number(oldBPs),
						newBPs: Number(newBPs),
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "MinAdminBaselinePaymentTokenAmountSet":
				this.contract.on(eventName, (oldAmount: bigint, newAmount: bigint, event: Log) => {
					const data: EventData.MinAdminBaselinePaymentTokenAmountSet = {
						oldAmount,
						newAmount,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "MinAdminBotDiscountBPsSet":
				this.contract.on(eventName, (oldBPs: bigint, newBPs: bigint, event: Log) => {
					const data: EventData.MinAdminBotDiscountBPsSet = {
						oldBPs: Number(oldBPs),
						newBPs: Number(newBPs),
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "PayerSet":
				this.contract.on(eventName, (oldPayer: string, newPayer: string, event: Log) => {
					const data: EventData.PayerSet = {
						oldPayer: { id: oldPayer },
						newPayer: { id: newPayer },
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "PriceFeedSet":
				this.contract.on(eventName, (oldFeed: string, newFeed: string, event: Log) => {
					const data: EventData.PriceFeedSet = {
						oldFeed: { id: oldFeed },
						newFeed: { id: newFeed },
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "SoldETH":
				this.contract.on(eventName, (to: string, ethOut: bigint, tokenIn: bigint, event: Log) => {
					const data: EventData.SoldETH = {
						to: { id: to },
						ethOut,
						tokenIn,
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
