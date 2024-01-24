import { PropHouse } from "../../../src/contracts/prop-house/PropHouse";
import { ethers } from "ethers";

describe("PropHouse tests", () => {
	test("should construct with string", () => {
		const prophouse = new PropHouse("JSON_RPC_URL");

		expect(prophouse).toBeDefined();
		expect(prophouse.provider).toBeDefined();
		expect(typeof prophouse.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const prophouse = new PropHouse(provider);

		expect(prophouse).toBeDefined();
		expect(prophouse.provider).toBeDefined();
		expect(typeof prophouse.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const prophouse = new PropHouse(process.env.ALCHEMY_URL as string);
		prophouse.provider.polling = false;
		const mockListener = jest.fn();

		try {
			for (const eventName of PropHouse.supportedEvents) {
				await prophouse.on(eventName, mockListener);
				prophouse.off(eventName); // Prevents alchemy error.
			}
			prophouse.provider.removeAllListeners(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
