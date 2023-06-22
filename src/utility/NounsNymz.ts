import cron from "node-cron";
import fetch from "node-fetch";
import { EventData } from "../types";

const POST_LIMIT = 5;

export class NounsNymz {
	lastTime: Date;

	constructor() {
		this.lastTime = new Date();
	}

	on(eventName: string, listener: (data: EventData.NounsNymz.NewPost) => void) {
		if (eventName !== "NewPost") {
			return;
		}

		// Runs the task every 5 minutes.
		cron.schedule("*/5 * * * *", async () => {
			// Processing the first batch.
			let offset = 0;
			let response = await fetch(
				`https://nouns.nymz.xyz/api/v1/posts?offset=${offset}&limit=${POST_LIMIT}&sort=timestamp`
			);
			let body = (await response.json()) as EventData.NounsNymz.NewPost[];

			if (body.length === 0 || this.isTooOld(body[0])) {
				return;
			}
			const updatedTime = new Date(body[0].timestamp);

			this.processPosts(body, listener);

			// Continuing to process more batches until we reach the last task's time.
			while (!this.isTooOld(body[body.length - 1])) {
				offset += POST_LIMIT;
				response = await fetch(
					`https://nouns.nymz.xyz/api/v1/posts?offset=${offset}&limit=${POST_LIMIT}&sort=timestamp`
				);
				body = (await response.json()) as EventData.NounsNymz.NewPost[];

				if (body.length === 0) {
					break;
				}

				this.processPosts(body, listener);
			}

			this.lastTime = updatedTime;
		});
	}

	processPosts(posts: EventData.NounsNymz.NewPost[], listener: (data: EventData.NounsNymz.NewPost) => void) {
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
