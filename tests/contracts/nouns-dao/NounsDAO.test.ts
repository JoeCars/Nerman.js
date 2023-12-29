import { _NounsDAO } from "../../../src/contracts/nouns-dao/NounsDAO";
import { ethers } from "ethers";

describe("NounsDAO tests", () => {
	test("should construct with string", () => {
		const nounsDAO = new _NounsDAO("JSON_RPC_URL");

		expect(nounsDAO).toBeDefined();
		expect(nounsDAO.Contract.provider).toBeDefined();
		expect(typeof nounsDAO.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const nounsDAO = new _NounsDAO(provider);

		expect(nounsDAO).toBeDefined();
		expect(nounsDAO.Contract.provider).toBeDefined();
		expect(typeof nounsDAO.Contract.provider).toBe("object");
	});
});
