import { LilNounsAuctionHouse } from "../../../src/contracts/lil-nouns/LilNounsAuctionHouse";
import { ethers } from "ethers-v6";

describe("LilNounsAuctionHouse tests", () => {
	test("should construct with string", () => {
		const lilNounsAuctions = new LilNounsAuctionHouse("JSON_RPC_URL");

		expect(lilNounsAuctions).toBeDefined();
		expect(lilNounsAuctions.provider).toBeDefined();
		expect(typeof lilNounsAuctions.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const lilNounsAuctions = new LilNounsAuctionHouse(provider);

		expect(lilNounsAuctions).toBeDefined();
		expect(lilNounsAuctions.provider).toBeDefined();
		expect(typeof lilNounsAuctions.provider).toBe("object");
	});
	test("should listen to all supported events", async () => {
		const lilNouns = new LilNounsAuctionHouse(process.env.ALCHEMY_URL as string);
		const mockListener = jest.fn();

		try {
			for (const eventName of LilNounsAuctionHouse.supportedEvents) {
				await lilNouns.on(eventName, mockListener);
				lilNouns.off(eventName); // Prevents alchemy error.
			}
			lilNouns.provider.pause(); // Terminate provider so the tests can end.
		} catch (error) {
			expect(error).not.toThrow();
		}
	});
});
