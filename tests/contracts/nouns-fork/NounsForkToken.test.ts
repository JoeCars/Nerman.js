import { _NounsForkToken } from "../../../src/contracts/nouns-fork/NounsForkToken";
import { ethers } from "ethers";

describe("NounsForkToken tests", () => {
	test("should construct with string", () => {
		const nounsForkToken = new _NounsForkToken("JSON_RPC_URL");

		expect(nounsForkToken).toBeDefined();
		expect(nounsForkToken.Contract.provider).toBeDefined();
		expect(typeof nounsForkToken.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const nounsForkToken = new _NounsForkToken(provider);

		expect(nounsForkToken).toBeDefined();
		expect(nounsForkToken.Contract.provider).toBeDefined();
		expect(typeof nounsForkToken.Contract.provider).toBe("object");
	});
});
