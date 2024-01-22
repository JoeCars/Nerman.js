import { _NounsAuctionHouse } from "../../../src/contracts/nouns-dao/NounsAuctionHouse";
import { ethers } from "ethers";

describe("NounsAuctionHouse tests", () => {
	test("should construct with string", () => {
		const nounsAuctionHouse = new _NounsAuctionHouse("JSON_RPC_URL");

		expect(nounsAuctionHouse).toBeDefined();
		expect(nounsAuctionHouse.Contract.provider).toBeDefined();
		expect(typeof nounsAuctionHouse.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsAuctionHouse = new _NounsAuctionHouse(provider);

		expect(nounsAuctionHouse).toBeDefined();
		expect(nounsAuctionHouse.Contract.provider).toBeDefined();
		expect(typeof nounsAuctionHouse.Contract.provider).toBe("object");
	});
});
