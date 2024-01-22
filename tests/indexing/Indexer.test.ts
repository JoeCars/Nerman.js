import { Indexer } from "../../src/indexing/Indexer";
import { ethers } from "ethers";

describe("Indexer tests", () => {
	test("should construct with string", () => {
		const indexer = new Indexer("JSON_RPC_URL", "");

		expect(indexer).toBeDefined();
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const indexer = new Indexer(provider, "");

		expect(indexer).toBeDefined();
	});
});
