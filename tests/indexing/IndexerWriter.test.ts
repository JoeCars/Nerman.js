import { IndexerWriter } from "../../src/indexing/IndexerWriter";
import { ethers } from "ethers";

describe("IndexerWriter tests", () => {
	test("should construct with string", () => {
		const indexerWriter = new IndexerWriter("JSON_RPC_URL", "");

		expect(indexerWriter).toBeDefined();
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const indexerWriter = new IndexerWriter(provider, "");

		expect(indexerWriter).toBeDefined();
	});
});
