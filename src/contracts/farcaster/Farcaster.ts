import { CastAdd, HubRestAPIClient } from "@standard-crypto/farcaster-js-hub-rest";
import { EventData } from "../../types";

const NOUNS_CAST_URL = "chain://eip155:1/erc721:0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03";
const POLL_TIME = 30_000;

const SUPPORTED_FARCASTER_EVENTS = ["NounsCast"] as const;
export type SupportedEventsType = (typeof SUPPORTED_FARCASTER_EVENTS)[number];

/**
 * A wrapper class for the Nouns Warpcast channel.
 */
export class Farcaster {
	private client: HubRestAPIClient;
	private interval: NodeJS.Timeout | undefined;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public previousCastTimestamp: number | undefined;

	constructor() {
		this.client = new HubRestAPIClient();
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
	public async on(eventName: SupportedEventsType, listener: Function) {
		switch (eventName) {
			case "NounsCast":
				this.previousCastTimestamp = await _getRecentTimestamp(this.client);

				this.interval = setInterval(async () => {
					this.previousCastTimestamp = await _listenToNounsCast(this.client, listener, this.previousCastTimestamp!);
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
	public trigger(eventName: SupportedEventsType, data: unknown) {
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
}

/**
 * Listens to Nouns Casts.
 * @param client Farcaster client.
 * @param listener Listener.
 * @param previousTimestamp Oldest timestamp
 * @returns Newest timestamp.
 */
export async function _listenToNounsCast(client: HubRestAPIClient, listener: Function, previousTimestamp: number) {
	const castsIterator = await client.listCastsByParent(
		{ url: NOUNS_CAST_URL },
		{
			pageSize: 1,
			reverse: true
		}
	);

	const casts: EventData.Farcaster.NounsCast[] = [];
	while (true) {
		const next = await castsIterator.next();
		if (!next) {
			break;
		}
		const data = _formatCastData(next);
		const timestamp = data.event.timestamp;
		if (timestamp <= previousTimestamp) {
			break;
		}
		casts.push(data);
	}

	for (let i = casts.length - 1; i >= 0; --i) {
		listener(casts[i]);
	}

	return casts[0]?.event.timestamp ?? previousTimestamp;
}

/**
 * Retrieves the most recent cast's timestamp.
 * @param client Farcaster client.
 * @returns Most recent cast's timestamp.
 */
export async function _getRecentTimestamp(client: HubRestAPIClient) {
	const castsIterator = await client.listCastsByParent(
		{ url: NOUNS_CAST_URL },
		{
			pageSize: 1,
			reverse: true
		}
	);
	const next = await castsIterator.next();
	return next.value!.data.timestamp;
}

/**
 * Formats cast data.
 * @param next Raw cast data.
 * @returns Formatted cast data.
 */
export function _formatCastData(next: IteratorResult<CastAdd, void>): EventData.Farcaster.NounsCast {
	return {
		embeds: next.value!.data.castAddBody.embeds,
		mentions: next.value!.data.castAddBody.mentions,
		mentionsPositions: next.value!.data.castAddBody.mentionsPositions,
		parentCastId: next.value!.data.castAddBody.parentCastId,
		parentUrl: next.value!.data.castAddBody.parentUrl,
		text: next.value!.data.castAddBody.text,
		event: {
			hash: next.value!.hash,
			signature: next.value!.signature,
			signer: next.value!.signer,
			fid: next.value!.data.fid,
			network: next.value!.data.network,
			timestamp: next.value!.data.timestamp,
			type: next.value!.data.type
		}
	};
}
