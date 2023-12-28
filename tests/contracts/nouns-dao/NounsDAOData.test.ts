import { _NounsDAOData } from "../../../src/contracts/nouns-dao/NounsDAOData";
import { ethers } from "ethers";

describe("NounsDAOData tests", () => {
	test("should construct with string", () => {
		const nounsDAOData = new _NounsDAOData("JSON_RPC_URL");

		expect(nounsDAOData).toBeDefined();
		expect(nounsDAOData.Contract.provider).toBeDefined();
		expect(typeof nounsDAOData.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const nounsDAOData = new _NounsDAOData(provider);

		expect(nounsDAOData).toBeDefined();
		expect(nounsDAOData.Contract.provider).toBeDefined();
		expect(typeof nounsDAOData.Contract.provider).toBe("object");
	});
});
