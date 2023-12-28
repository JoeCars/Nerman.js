import { _NounsForkLogic } from "../../../src/contracts/nouns-fork/NounsForkLogic";
import { ethers } from "ethers";

describe("NounsForkLogic tests", () => {
	test("should construct with string", () => {
		const nounsForkLogic = new _NounsForkLogic("JSON_RPC_URL");

		expect(nounsForkLogic).toBeDefined();
		expect(nounsForkLogic.Contract.provider).toBeDefined();
		expect(typeof nounsForkLogic.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const nounsForkLogic = new _NounsForkLogic(provider);

		expect(nounsForkLogic).toBeDefined();
		expect(nounsForkLogic.Contract.provider).toBeDefined();
		expect(typeof nounsForkLogic.Contract.provider).toBe("object");
	});
});
