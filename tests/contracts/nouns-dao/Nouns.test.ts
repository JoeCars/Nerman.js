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
});
