import * as cron from "node-cron";
import fetch from "node-fetch";
import { EventData } from "../../types";

export interface SupportedEventMap {
	NewPost: EventData.NounsNymz.NewPost;
}
const SUPPORTED_NOUNS_NYMZ_EVENTS = ["NewPost"] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class for NounsNymz events.
 */
export class NounsNymz {
	private lastTime: Date;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_NYMZ_EVENTS;

	constructor() {
		this.lastTime = new Date();
		this.registeredListeners = new Map();
	}

	/**
	 * Assigns a listener function for the given event. Throws an error if the event is not supported.
	 * @param eventName The event being listened to.
	 * @param listener The listener function.
	 * @example
	 * nounsNymz.on('NewPost', (data) => {
	 * 	console.log(data.body);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		this.registeredListeners.set(eventName, listener);

		if (eventName !== "NewPost") {
			throw new Error(`${eventName} is not supported. Please use a different event.`);
		}

		// Runs the task every 1 minute.
		cron.schedule("*/1 * * * *", async () => {
			let response = await fetch(
				`https://nouns.nymz.xyz/api/v1/posts?startTime=${this.lastTime.getTime()}&sort=timestamp&includeReplies=true`
			);
			let posts = (await response.json()) as EventData.NounsNymz.NewPost[];

			if (posts.length === 0 || this.isTooOld(posts[0])) {
				return;
			}
			const updatedTime = new Date(posts[0].timestamp);

			this.processPosts(posts, listener);

			this.lastTime = updatedTime;
		});
	}

	/**
	 * Removes an event listener.
	 * @param eventName the event listened to.
	 * @example
	 * nounsNymz.off('NewPost');
	 */
	public off(eventName: SupportedEventsType) {
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers the listener of the given event with the given data. Throws an error if the listener cannot be found.
	 * @param eventName The event to be triggered.
	 * @param data The data being passed to the listener.
	 * @example
	 * nounsNymz.trigger('NewPost', {
	 * 	id: "0xcbd6b65b7fd297dad4ea88eb789fed57ead1c1e49fa7f6e3dedaa2d10c42edab",
	 * 	title: "Do you re-use your nyms here? If not, why not?",
	 * 	body: "It's been fun seeing some life here in the past couple weeks! \n\nWe've noticed that most new nyms are randomly generated/single-use. For those posting from single-use nyms: do you see any value in re-using a name you've used in the past? ",
	 * 	timestamp: "2023-07-31T17:54:17.000Z",
	 * 	userId: "0x141b63d93daf55bfb7f396eee6114f3a5d4a90b2",
	 * 	parentId: null
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
	 * @returns the name of the contract. 'NounsNymz'.
	 */
	public name() {
		return "NounsNymz";
	}

	private processPosts(posts: EventData.NounsNymz.NewPost[], listener: (post: EventData.NounsNymz.NewPost) => void) {
		for (let i = posts.length - 1; i >= 0; --i) {
			if (this.isTooOld(posts[i])) {
				continue;
			}

			listener(posts[i]);
		}
	}

	private isTooOld(post: EventData.NounsNymz.NewPost) {
		const time = new Date(post.timestamp);
		return time <= this.lastTime;
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return NounsNymz.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
