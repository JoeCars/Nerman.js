import { _NounsToken } from "../../../src/contracts/nouns-dao/NounsToken";
import { ethers } from "ethers";

describe("NounsDAOData tests", () => {
	test("should construct with string", () => {
		const nounsToken = new _NounsToken("JSON_RPC_URL");

		expect(nounsToken).toBeDefined();
		expect(nounsToken.provider).toBeDefined();
		expect(typeof nounsToken.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsToken = new _NounsToken(provider);

		expect(nounsToken).toBeDefined();
		expect(nounsToken.provider).toBeDefined();
		expect(typeof nounsToken.provider).toBe("object");
	});
});
