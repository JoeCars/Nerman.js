import * as cron from "node-cron";
import fetch from "node-fetch";
import { EventData } from "../types";

export class NounsNymz {
	lastTime: Date;

	constructor() {
		this.lastTime = new Date();
	}

	on(eventName: string, listener: (post: EventData.NounsNymz.NewPost) => void) {
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
