import { Nouns } from "../../../src/contracts/nouns-dao/Nouns";
import { ethers } from "ethers-v6";

describe("Nouns tests", () => {
	test("should construct with string", () => {
		const nouns = new Nouns("JSON_RPC_URL", { shouldIgnoreCacheInit: true });

		expect(nouns).toBeDefined();
		expect(nouns.provider).toBeDefined();
		expect(typeof nouns.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nouns = new Nouns(provider, { shouldIgnoreCacheInit: true });

		expect(nouns).toBeDefined();
		expect(nouns.provider).toBeDefined();
		expect(typeof nouns.provider).toBe("object");
	});
	test("should change polling time with option", () => {
		const nouns1 = new Nouns("JSON_RPC_URL", { shouldIgnoreCacheInit: true, pollingTime: 1 });
		const nouns2 = new Nouns("JSON_RPC_URL", { shouldIgnoreCacheInit: true });

		expect(nouns1.provider.pollingInterval).toBe(1);
		expect(nouns2.provider.pollingInterval).toBe(10_000);
	});
	test("should listen to all supported events", async () => {
		const nouns = new Nouns(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of Nouns.supportedEvents) {
				await nouns.on(eventName, mockListener);
				nouns.off(eventName); // Prevents alchemy error.
			}
			nouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});

	test("should instantiate with cache", () => {
		const nouns = new Nouns(process.env.ALCHEMY_URL!);

		expect(nouns.cache).toBeDefined();
	});
});
