import { _NounsDAO } from "../../../src/contracts/nouns-dao/NounsDAO";
import { ethers } from "ethers";

describe("NounsDAO tests", () => {
	test("should construct with string", () => {
		const nounsDAO = new _NounsDAO("JSON_RPC_URL");

		expect(nounsDAO).toBeDefined();
		expect(nounsDAO.provider).toBeDefined();
		expect(typeof nounsDAO.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsDAO = new _NounsDAO(provider);

		expect(nounsDAO).toBeDefined();
		expect(nounsDAO.provider).toBeDefined();
		expect(typeof nounsDAO.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const nounsDAO = new _NounsDAO(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of _NounsDAO.supportedEvents) {
				await nounsDAO.on(eventName, mockListener);
				nounsDAO.off(eventName); // Prevents alchemy error.
			}
			nounsDAO.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
