import { _NounsForkToken } from "../../../src/contracts/nouns-fork/NounsForkToken";
import { ethers } from "ethers-v6";

describe("NounsForkToken tests", () => {
	test("should construct with string", () => {
		const nounsForkToken = new _NounsForkToken("JSON_RPC_URL");

		expect(nounsForkToken).toBeDefined();
		expect(nounsForkToken.provider).toBeDefined();
		expect(typeof nounsForkToken.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsForkToken = new _NounsForkToken(provider);

		expect(nounsForkToken).toBeDefined();
		expect(nounsForkToken.provider).toBeDefined();
		expect(typeof nounsForkToken.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const nouns = new _NounsForkToken(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of _NounsForkToken.supportedEvents) {
				await nouns.on(eventName, mockListener);
				nouns.off(eventName); // Prevents alchemy error.
			}
			nouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
