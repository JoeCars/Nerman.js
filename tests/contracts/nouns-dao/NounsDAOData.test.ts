import { _NounsDAOData } from "../../../src/contracts/nouns-dao/NounsDAOData";
import { ethers } from "ethers-v6";

describe("NounsDAOData tests", () => {
	test("should construct with string", () => {
		const nounsDAOData = new _NounsDAOData("JSON_RPC_URL");

		expect(nounsDAOData).toBeDefined();
		expect(nounsDAOData.provider).toBeDefined();
		expect(typeof nounsDAOData.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsDAOData = new _NounsDAOData(provider);

		expect(nounsDAOData).toBeDefined();
		expect(nounsDAOData.provider).toBeDefined();
		expect(typeof nounsDAOData.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const nouns = new _NounsDAOData(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of _NounsDAOData.supportedEvents) {
				await nouns.on(eventName, mockListener);
				nouns.off(eventName); // Prevents alchemy error.
			}
			nouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
