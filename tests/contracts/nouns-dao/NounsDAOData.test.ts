import { _NounsDAOData } from "../../../src/contracts/nouns-dao/NounsDAOData";
import { ethers } from "ethers";

describe("NounsDAOData tests", () => {
	test("should construct with string", () => {
		const nounsDAOData = new _NounsDAOData("JSON_RPC_URL");

		expect(nounsDAOData).toBeDefined();
		expect(nounsDAOData.provider).toBeDefined();
		expect(typeof nounsDAOData.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsDAOData = new _NounsDAOData(provider);

		expect(nounsDAOData).toBeDefined();
		expect(nounsDAOData.provider).toBeDefined();
		expect(typeof nounsDAOData.provider).toBe("object");
	});
});
