import { _NounsAuctionHouse } from "../../../src/contracts/nouns-dao/NounsAuctionHouse";
import { ethers } from "ethers";

describe("NounsAuctionHouse tests", () => {
	test("should construct with string", () => {
		const nounsAuctionHouse = new _NounsAuctionHouse("JSON_RPC_URL");

		expect(nounsAuctionHouse).toBeDefined();
		expect(nounsAuctionHouse.provider).toBeDefined();
		expect(typeof nounsAuctionHouse.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsAuctionHouse = new _NounsAuctionHouse(provider);

		expect(nounsAuctionHouse).toBeDefined();
		expect(nounsAuctionHouse.provider).toBeDefined();
		expect(typeof nounsAuctionHouse.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const nouns = new _NounsAuctionHouse(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of _NounsAuctionHouse.supportedEvents) {
				await nouns.on(eventName, mockListener);
				nouns.off(eventName); // Prevents alchemy error.
			}
			nouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
