import { _NounsToken } from "../../../src/contracts/nouns-dao/NounsToken";
import { ethers } from "ethers";

describe("NounsDAOData tests", () => {
	test("should construct with string", () => {
		const nounsToken = new _NounsToken("JSON_RPC_URL");

		expect(nounsToken).toBeDefined();
		expect(nounsToken.Contract.provider).toBeDefined();
		expect(typeof nounsToken.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const nounsToken = new _NounsToken(provider);

		expect(nounsToken).toBeDefined();
		expect(nounsToken.Contract.provider).toBeDefined();
		expect(typeof nounsToken.Contract.provider).toBe("object");
	});
});
