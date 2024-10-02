import { JsonRpcProvider, Contract, Log, Listener } from "ethers";

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

export class TokenBuyer {
	private _provider: JsonRpcProvider;
	private _contract: Contract;
	private _registeredListeners: Map<SupportedEventsType, Function>;
	private _tokenBuyerViewer: TokenBuyerViewer;
	public static readonly supportedEvents = SUPPORTED_TOKEN_BUYER_EVENTS;

	constructor(provider: JsonRpcProvider | string) {
		this._provider = createOrReturnProvider(provider);
		this._contract = createTokenBuyerContract(this._provider);
		this._tokenBuyerViewer = new TokenBuyerViewer(this._contract);
		this._registeredListeners = new Map();
	}

	public get viewer() {
		return this._tokenBuyerViewer;
	}

	public get contract() {
		return this._contract;
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "AdminSet":
				this._contract.on(eventName, (oldAdmin: string, newAdmin: string, event: Log) => {
					const data: EventData.AdminSet = {
						oldAdmin: { id: oldAdmin },
						newAdmin: { id: newAdmin },
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "BaselinePaymentTokenAmountSet":
				this._contract.on(eventName, (oldAmount: bigint, newAmount: bigint, event: Log) => {
					const data: EventData.BaselinePaymentTokenAmountSet = {
						oldAmount,
						newAmount,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "BotDiscountBPsSet":
				this._contract.on(eventName, (oldBPs: bigint, newBPs: bigint, event: Log) => {
					const data: EventData.BotDiscountBPsSet = {
						oldBPs: Number(oldBPs),
						newBPs: Number(newBPs),
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ETHWithdrawn":
				this._contract.on(eventName, (to: string, amount: bigint, event: Log) => {
					const data: EventData.ETHWithdrawn = {
						to: { id: to },
						amount,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "MaxAdminBaselinePaymentTokenAmountSet":
				this._contract.on(eventName, (oldAmount: bigint, newAmount: bigint, event: Log) => {
					const data: EventData.MaxAdminBaselinePaymentTokenAmountSet = {
						oldAmount,
						newAmount,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "MaxAdminBotDiscountBPsSet":
				this._contract.on(eventName, (oldBPs: bigint, newBPs: bigint, event: Log) => {
					const data: EventData.MaxAdminBotDiscountBPsSet = {
						oldBPs: Number(oldBPs),
						newBPs: Number(newBPs),
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "MinAdminBaselinePaymentTokenAmountSet":
				this._contract.on(eventName, (oldAmount: bigint, newAmount: bigint, event: Log) => {
					const data: EventData.MinAdminBaselinePaymentTokenAmountSet = {
						oldAmount,
						newAmount,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "MinAdminBotDiscountBPsSet":
				this._contract.on(eventName, (oldBPs: bigint, newBPs: bigint, event: Log) => {
					const data: EventData.MinAdminBotDiscountBPsSet = {
						oldBPs: Number(oldBPs),
						newBPs: Number(newBPs),
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "PayerSet":
				this._contract.on(eventName, (oldPayer: string, newPayer: string, event: Log) => {
					const data: EventData.PayerSet = {
						oldPayer: { id: oldPayer },
						newPayer: { id: newPayer },
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "PriceFeedSet":
				this._contract.on(eventName, (oldFeed: string, newFeed: string, event: Log) => {
					const data: EventData.PriceFeedSet = {
						oldFeed: { id: oldFeed },
						newFeed: { id: newFeed },
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "SoldETH":
				this._contract.on(eventName, (to: string, ethOut: bigint, tokenIn: bigint, event: Log) => {
					const data: EventData.SoldETH = {
						to: { id: to },
						ethOut,
						tokenIn,
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

interface TokenAmountNeededAndETHPayout {
	tokenAmountNeeded: bigint;
	ethPayout: bigint;
}

class TokenBuyerViewer {
	private contract: Contract;
	constructor(contract: Contract) {
		this.contract = contract;
	}

	public async MAX_BPS(): Promise<bigint> {
		return this.contract.MAX_BPS();
	}

	public async admin(): Promise<string> {
		return this.contract.admin();
	}

	public async baselinePaymentTokenAmount(): Promise<bigint> {
		return this.contract.baselinePaymentTokenAmount();
	}

	public async botDiscountBPs(): Promise<bigint> {
		return this.contract.botDiscountBPs();
	}

	public async ethAmountPerTokenAmount(tokenAmount: number): Promise<bigint> {
		return this.contract.ethAmountPerTokenAmount(tokenAmount);
	}

	public async ethNeeded(additionalTokens: number, bufferBPs: number): Promise<bigint> {
		return this.contract.ethNeeded(additionalTokens, bufferBPs);
	}

	public async maxAdminBaselinePaymentTokenAmount(): Promise<bigint> {
		return this.contract.maxAdminBaselinePaymentTokenAmount();
	}

	public async maxAdminBotDiscountBPs(): Promise<bigint> {
		return this.contract.maxAdminBotDiscountBPs();
	}

	public async minAdminBaselinePaymentTokenAmount(): Promise<bigint> {
		return this.contract.minAdminBaselinePaymentTokenAmount();
	}

	public async minAdminBotDiscountBPs(): Promise<bigint> {
		return this.contract.minAdminBotDiscountBPs();
	}

	public async owner(): Promise<string> {
		return this.contract.owner();
	}

	public async paused(): Promise<boolean> {
		return this.contract.paused();
	}

	public async payer(): Promise<string> {
		return this.contract.payer();
	}

	public async paymentToken(): Promise<string> {
		return this.contract.paymentToken();
	}

	public async paymentTokenDecimalsDigits(): Promise<bigint> {
		return this.contract.paymentTokenDecimalsDigits();
	}

	public async price(): Promise<bigint> {
		return this.contract.price();
	}

	public async priceFeed(): Promise<string> {
		return this.contract.priceFeed();
	}

	public async tokenAmountNeeded(): Promise<bigint> {
		return this.contract.tokenAmountNeeded();
	}

	public async tokenAmountNeededAndETHPayout(): Promise<TokenAmountNeededAndETHPayout> {
		const [tokenAmountNeeded, ethPayout] = await this.contract.tokenAmountNeededAndETHPayout();
		return { tokenAmountNeeded, ethPayout };
	}

	public async tokenAmountPerEthAmount(ethAmount: number): Promise<bigint> {
		return this.contract.tokenAmountPerEthAmount(ethAmount);
	}
}
