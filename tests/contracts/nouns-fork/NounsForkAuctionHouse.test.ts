import { _NounsForkAuctionHouse } from "../../../src/contracts/nouns-fork/NounsForkAuctionHouse";
import { ethers } from "ethers-v6";

describe("NounsForkAuctionHouse tests", () => {
	test("should construct with string", () => {
		const nounsForkAuctionHouse = new _NounsForkAuctionHouse("JSON_RPC_URL");

		expect(nounsForkAuctionHouse).toBeDefined();
		expect(nounsForkAuctionHouse.provider).toBeDefined();
		expect(typeof nounsForkAuctionHouse.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsForkAuctionHouse = new _NounsForkAuctionHouse(provider);

		expect(nounsForkAuctionHouse).toBeDefined();
		expect(nounsForkAuctionHouse.provider).toBeDefined();
		expect(typeof nounsForkAuctionHouse.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const nouns = new _NounsForkAuctionHouse(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of _NounsForkAuctionHouse.supportedEvents) {
				await nouns.on(eventName, mockListener);
				nouns.off(eventName); // Prevents alchemy error.
			}
			nouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
