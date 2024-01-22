import { _Propdates } from "../../../src/contracts/propdates/Propdates";
import { ethers } from "ethers";

describe("Propdates tests", () => {
	test("should construct with string", () => {
		const propdates = new _Propdates("JSON_RPC_URL");

		expect(propdates).toBeDefined();
		expect(propdates.Contract.provider).toBeDefined();
		expect(typeof propdates.Contract.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const propdates = new _Propdates(provider);

		expect(propdates).toBeDefined();
		expect(propdates.Contract.provider).toBeDefined();
		expect(typeof propdates.Contract.provider).toBe("object");
	});
});
