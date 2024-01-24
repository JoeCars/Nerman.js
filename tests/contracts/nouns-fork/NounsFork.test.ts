import { NounsFork } from "../../../src/contracts/nouns-fork/NounsFork";
import { ethers } from "ethers-v6";

describe("NounsFork tests", () => {
	test("should construct with string", () => {
		const nounsFork = new NounsFork("JSON_RPC_URL");

		expect(nounsFork).toBeDefined();
		expect(nounsFork.provider).toBeDefined();
		expect(typeof nounsFork.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsFork = new NounsFork(provider);

		expect(nounsFork).toBeDefined();
		expect(nounsFork.provider).toBeDefined();
		expect(typeof nounsFork.provider).toBe("object");
	});
});
