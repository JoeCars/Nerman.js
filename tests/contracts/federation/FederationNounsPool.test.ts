import { FederationNounsPool } from "../../../src/contracts/federation/FederationNounsPool";
import { ethers } from "ethers-v6";

describe("FederationNounsPool tests", () => {
	test("should construct with string", () => {
		const federation = new FederationNounsPool("JSON_RPC_URL");

		expect(federation).toBeDefined();
		expect(federation.provider).toBeDefined();
		expect(typeof federation.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const federation = new FederationNounsPool(provider);

		expect(federation).toBeDefined();
		expect(federation.provider).toBeDefined();
		expect(typeof federation.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const federation = new FederationNounsPool(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of FederationNounsPool.supportedEvents) {
				await federation.on(eventName, mockListener);
				federation.off(eventName); // Prevents alchemy error.
			}
			federation.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
