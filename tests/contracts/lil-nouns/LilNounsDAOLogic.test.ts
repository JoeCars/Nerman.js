import { LilNounsDAOLogic } from "../../../src/contracts/lil-nouns/LilNounsDAOLogic";
import { ethers } from "ethers-v6";

describe("LilNounsDAOLogic tests", () => {
	test("should construct with string", () => {
		const lilNounsDAOLogic = new LilNounsDAOLogic("JSON_RPC_URL");

		expect(lilNounsDAOLogic).toBeDefined();
		expect(lilNounsDAOLogic.provider).toBeDefined();
		expect(typeof lilNounsDAOLogic.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const lilNounsDAOLogic = new LilNounsDAOLogic(provider);

		expect(lilNounsDAOLogic).toBeDefined();
		expect(lilNounsDAOLogic.provider).toBeDefined();
		expect(typeof lilNounsDAOLogic.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const lilNouns = new LilNounsDAOLogic(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of LilNounsDAOLogic.supportedEvents) {
				await lilNouns.on(eventName, mockListener);
				lilNouns.off(eventName); // Prevents alchemy error.
			}
			lilNouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
