import { _NounsForkLogic } from "../../../src/contracts/nouns-fork/NounsForkLogic";
import { ethers } from "ethers";

describe("NounsForkLogic tests", () => {
	test("should construct with string", () => {
		const nounsForkLogic = new _NounsForkLogic("JSON_RPC_URL");

		expect(nounsForkLogic).toBeDefined();
		expect(nounsForkLogic.provider).toBeDefined();
		expect(typeof nounsForkLogic.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsForkLogic = new _NounsForkLogic(provider);

		expect(nounsForkLogic).toBeDefined();
		expect(nounsForkLogic.provider).toBeDefined();
		expect(typeof nounsForkLogic.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const nouns = new _NounsForkLogic(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of _NounsForkLogic.supportedEvents) {
				await nouns.on(eventName, mockListener);
				nouns.off(eventName); // Prevents alchemy error.
			}
			nouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
