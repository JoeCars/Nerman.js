import * as cron from "node-cron";
import fetch from "node-fetch";
import { EventData } from "../../types";

/**
 * A wrapper class for NounsNymz events.
 */
export class NounsNymz {
	lastTime: Date;
	registeredListeners: Map<string, Function>;

	constructor() {
		this.lastTime = new Date();
		this.registeredListeners = new Map();
	}

	/**
	 * Assigns a listener function for the given event.
	 * @param eventName The event being listened to. At the moment, only the `NewPost` event is supported.
	 * @param listener The listener function.
	 */
	on(eventName: string, listener: (post: EventData.NounsNymz.NewPost) => void) {
		this.registeredListeners.set(eventName, listener);

		if (eventName !== "NewPost") {
			return;
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
	 * Triggers the listener of the given event with the given data.
	 * @param eventName The event to be triggered. Currently only supports `NewPost`.
	 * @param data The data being passed to the listener.
	 */
	trigger(eventName: string, data: unknown) {
		const listener = this.registeredListeners.get(eventName);
		if (listener) {
			listener(data);
		} else {
			console.log(`No listeners are registered with ${eventName}.`);
		}
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
}
