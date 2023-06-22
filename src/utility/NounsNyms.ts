import cron from "node-cron";
import fetch from "node-fetch";
import { EventData } from "../types";

export class NounsNyms {
	lastTime: Date;

	constructor() {
		this.lastTime = new Date();
	}

	on(eventName: string, listener: (data: EventData.NounsNyms.Post) => void) {
		if (eventName !== "NewPost") {
			return;
		}

		// Runs the task every 5 minutes.
		cron.schedule("*/5 * * * *", async () => {
			const response = await fetch("https://nouns.nymz.xyz/api/v1/posts?limit=5&sort=timestamp");
			const body = (await response.json()) as EventData.NounsNyms.Post[];

			if (body.length === 0) {
				return;
			}

			let newTime = new Date(body[0].timestamp);
			if (newTime <= this.lastTime) {
				return;
			}

			for (let i = body.length - 1; i >= 0; --i) {
				if (new Date(body[i].timestamp) <= this.lastTime) {
					continue;
				}

				listener(body[i]);
			}
			this.lastTime = newTime;
		});
	}
}
