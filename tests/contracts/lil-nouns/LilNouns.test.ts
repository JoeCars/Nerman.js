import { LilNouns } from "../../../src/contracts/lil-nouns/LilNouns";
import { ethers } from "ethers";

describe("LilNouns tests", () => {
	test("should construct with string", () => {
		const lilNouns = new LilNouns("JSON_RPC_URL");

		expect(lilNouns).toBeDefined();
		expect(lilNouns.provider).toBeDefined();
		expect(typeof lilNouns.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const lilNouns = new LilNouns(provider);

		expect(lilNouns).toBeDefined();
		expect(lilNouns.provider).toBeDefined();
		expect(typeof lilNouns.provider).toBe("object");
	});
});
