import { _NounsForkAuctionHouse } from "../../../src/contracts/nouns-fork/NounsForkAuctionHouse";
import { ethers } from "ethers";

describe("NounsForkAuctionHouse tests", () => {
	test("should construct with string", () => {
		const nounsForkAuctionHouse = new _NounsForkAuctionHouse("JSON_RPC_URL");

		expect(nounsForkAuctionHouse).toBeDefined();
		expect(nounsForkAuctionHouse.Contract.provider).toBeDefined();
		expect(typeof nounsForkAuctionHouse.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const nounsForkAuctionHouse = new _NounsForkAuctionHouse(provider);

		expect(nounsForkAuctionHouse).toBeDefined();
		expect(nounsForkAuctionHouse.Contract.provider).toBeDefined();
		expect(typeof nounsForkAuctionHouse.Contract.provider).toBe("object");
	});
});