import { LilNounsAuctionHouse } from "../../../src/contracts/lil-nouns/LilNounsAuctionHouse";
import { ethers } from "ethers";

describe("LilNounsAuctionHouse tests", () => {
	test("should construct with string", () => {
		const lilNounsAuctions = new LilNounsAuctionHouse("JSON_RPC_URL");

		expect(lilNounsAuctions).toBeDefined();
		expect(lilNounsAuctions.Contract.provider).toBeDefined();
		expect(typeof lilNounsAuctions.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const lilNounsAuctions = new LilNounsAuctionHouse(provider);

		expect(lilNounsAuctions).toBeDefined();
		expect(lilNounsAuctions.Contract.provider).toBeDefined();
		expect(typeof lilNounsAuctions.Contract.provider).toBe("object");
	});
});
