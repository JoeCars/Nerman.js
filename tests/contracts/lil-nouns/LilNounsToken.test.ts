import { LilNounsToken } from "../../../src/contracts/lil-nouns/LilNounsToken";
import { ethers } from "ethers";

describe("LilNounsToken tests", () => {
	test("should construct with string", () => {
		const lilNounsToken = new LilNounsToken("JSON_RPC_URL");

		expect(lilNounsToken).toBeDefined();
		expect(lilNounsToken.provider).toBeDefined();
		expect(typeof lilNounsToken.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const lilNounsToken = new LilNounsToken(provider);

		expect(lilNounsToken).toBeDefined();
		expect(lilNounsToken.provider).toBeDefined();
		expect(typeof lilNounsToken.provider).toBe("object");
	});
});
