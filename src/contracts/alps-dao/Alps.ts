import { ethers } from "ethers";

import {
	AlpsAuctionHouse,
	SupportedEventsType as AlpsAuctionHouseEvents,
	SupportedEventMap as AuctionSupportedEventMap
} from "./AlpsAuctionHouse";
import {
	AlpsGovernor,
	SupportedEventsType as AlpsGovernorEvents,
	SupportedEventMap as LogicSupportedEventMap
} from "./AlpsGovernor";
import { AlpsToken, SupportedEventsType as AlpsTokenEvents, SupportedEventMap as TokenSupportedEventMap } from "./AlpsToken";
import {
	AlpsExecutor,
	SupportedEventsType as AlpsExecutorEvents,
	SupportedEventMap as ExecutorSupportedEventMap
} from "./AlpsExecutor";
import { createOrReturnProvider } from "../../utilities/providers";

export type SupportedEventMap = AuctionSupportedEventMap &
	LogicSupportedEventMap &
	TokenSupportedEventMap &
	ExecutorSupportedEventMap;
export type SupportedEventsType = AlpsAuctionHouseEvents | AlpsGovernorEvents | AlpsTokenEvents | AlpsExecutorEvents;

export class Alps {
	public provider: ethers.JsonRpcProvider;

	public alpsAuctionHouse: AlpsAuctionHouse;
	public alpsGovernor: AlpsGovernor;
	public alpsToken: AlpsToken;
	public alpsExecutor: AlpsExecutor;
	public static readonly supportedEvents = [
		...AlpsAuctionHouse.supportedEvents,
		...AlpsGovernor.supportedEvents,
		...AlpsToken.supportedEvents,
		...AlpsExecutor.supportedEvents
	];

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);

		this.alpsAuctionHouse = new AlpsAuctionHouse(this.provider);
		this.alpsGovernor = new AlpsGovernor(this.provider);
		this.alpsToken = new AlpsToken(this.provider);
		this.alpsExecutor = new AlpsExecutor(this.provider);
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		if (AlpsAuctionHouse.supportedEvents.includes(eventName as AlpsAuctionHouseEvents)) {
			this.alpsAuctionHouse.on(eventName as AlpsAuctionHouseEvents, listener as any);
		} else if (AlpsGovernor.supportedEvents.includes(eventName as AlpsGovernorEvents)) {
			this.alpsGovernor.on(eventName as AlpsGovernorEvents, listener as any);
		} else if (AlpsToken.supportedEvents.includes(eventName as AlpsTokenEvents)) {
			this.alpsToken.on(eventName as AlpsTokenEvents, listener as any);
		} else if (AlpsExecutor.supportedEvents.includes(eventName as AlpsExecutorEvents)) {
			this.alpsExecutor.on(eventName as AlpsExecutorEvents, listener as any);
		} else {
			throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		if (AlpsAuctionHouse.supportedEvents.includes(eventName as AlpsAuctionHouseEvents)) {
			this.alpsAuctionHouse.trigger(eventName as AlpsAuctionHouseEvents, data as any);
		} else if (AlpsGovernor.supportedEvents.includes(eventName as AlpsGovernorEvents)) {
			this.alpsGovernor.trigger(eventName as AlpsGovernorEvents, data as any);
		} else if (AlpsToken.supportedEvents.includes(eventName as AlpsTokenEvents)) {
			this.alpsToken.trigger(eventName as AlpsTokenEvents, data as any);
		} else if (AlpsExecutor.supportedEvents.includes(eventName as AlpsExecutorEvents)) {
			this.alpsExecutor.trigger(eventName as AlpsExecutorEvents, data as any);
		} else {
			throw new Error(`${eventName} does not have a listener.`);
		}
	}

	public off(eventName: SupportedEventsType) {
		if (AlpsAuctionHouse.supportedEvents.includes(eventName as AlpsAuctionHouseEvents)) {
			this.alpsAuctionHouse.off(eventName as AlpsAuctionHouseEvents);
		} else if (AlpsGovernor.supportedEvents.includes(eventName as AlpsGovernorEvents)) {
			this.alpsGovernor.off(eventName as AlpsGovernorEvents);
		} else if (AlpsToken.supportedEvents.includes(eventName as AlpsTokenEvents)) {
			this.alpsToken.off(eventName as AlpsTokenEvents);
		} else if (AlpsExecutor.supportedEvents.includes(eventName as AlpsExecutorEvents)) {
			this.alpsExecutor.off(eventName as AlpsExecutorEvents);
		}
	}

	public name() {
		return "Alps";
	}

	public hasEvent(eventName: string) {
		return Alps.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
