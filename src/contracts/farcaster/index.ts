import { _fetchNewestTimestamp, _fetchNewCasts } from "../../utilities/farcaster/rest-api";
import { EventData } from "../../types";

const POLL_TIME = 30_000;

export interface SupportedEventMap {
	NounsCast: EventData.Farcaster.NounsCast;
}
const SUPPORTED_FARCASTER_EVENTS = ["NounsCast"] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class for the Nouns Warpcast channel.
 */
export class Farcaster {
	private interval: NodeJS.Timeout | undefined;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public previousCastTimestamp: number | undefined;
	public static readonly supportedEvents = SUPPORTED_FARCASTER_EVENTS;

	constructor() {
		this.registeredListeners = new Map();
	}

	/**
	 * Assigns a listener to the event, which triggers whenever the event happens onchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The event name.
	 * @param listener The listener function.
	 * @example
	 * farcaster.on('NounsCast', (data) => {
	 * 	console.log(data.text);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "NounsCast":
				this.previousCastTimestamp = await _fetchNewestTimestamp();

				this.interval = setInterval(async () => {
					const { newestTimestamp, casts } = await _fetchNewCasts(this.previousCastTimestamp!);
					this.previousCastTimestamp = newestTimestamp;
					casts.forEach((cast) => {
						listener(cast);
					});
				}, POLL_TIME);

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
	 * farcaster.off('NounsCast');
	 */
	public off(eventName: SupportedEventsType) {
		if (eventName === "NounsCast") {
			clearInterval(this.interval);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if the listener cannot be found.
	 * @param eventName the name of the event.
	 * @param data the event data.
	 * @example
	 * farcaster.trigger('NounsCast', {
	 * 	text: 'Nouns are cool!'
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
	 * @returns The name of the contract. `Farcaster`.
	 */
	public name() {
		return "Farcaster";
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return Farcaster.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
