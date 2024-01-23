import { _NounsToken } from "../../../src/contracts/nouns-dao/NounsToken";
import { ethers } from "ethers";

describe("NounsDAOData tests", () => {
	test("should construct with string", () => {
		const nounsToken = new _NounsToken("JSON_RPC_URL");

		expect(nounsToken).toBeDefined();
		expect(nounsToken.provider).toBeDefined();
		expect(typeof nounsToken.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsToken = new _NounsToken(provider);

		expect(nounsToken).toBeDefined();
		expect(nounsToken.provider).toBeDefined();
		expect(typeof nounsToken.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const nouns = new _NounsToken(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of _NounsToken.supportedEvents) {
				await nouns.on(eventName, mockListener);
				nouns.off(eventName); // Prevents alchemy error.
			}
			nouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
