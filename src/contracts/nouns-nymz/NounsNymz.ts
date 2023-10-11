import * as cron from "node-cron";
import fetch from "node-fetch";
import { EventData } from "../../types";

export class NounsNymz {
	lastTime: Date;
	registeredListeners: Map<string, Function>;

	constructor() {
		this.lastTime = new Date();
		this.registeredListeners = new Map();
	}

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

	trigger(eventName: string, data: unknown) {
		const listener = this.registeredListeners.get(eventName);
		if (listener) {
			listener(data);
		} else {
			console.log(`No listeners are registered with ${eventName}.`);
		}
	}

	processPosts(posts: EventData.NounsNymz.NewPost[], listener: (post: EventData.NounsNymz.NewPost) => void) {
		for (let i = posts.length - 1; i >= 0; --i) {
			if (this.isTooOld(posts[i])) {
				continue;
			}

			listener(posts[i]);
		}
	}

	isTooOld(post: EventData.NounsNymz.NewPost) {
		const time = new Date(post.timestamp);
		return time <= this.lastTime;
	}
}
