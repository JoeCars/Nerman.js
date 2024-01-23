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
	test("should listen to all supported events", async () => {
		const lilNouns = new LilNounsToken(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of LilNounsToken.supportedEvents) {
				await lilNouns.on(eventName, mockListener);
				lilNouns.off(eventName); // Prevents alchemy error.
			}
			lilNouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
