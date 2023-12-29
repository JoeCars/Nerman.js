import { FederationNounsPool } from "../../../src/contracts/federation/FederationNounsPool";
import { ethers } from "ethers";

describe("FederationNounsPool tests", () => {
	test("should construct with string", () => {
		const federation = new FederationNounsPool("JSON_RPC_URL");
		
		expect(federation).toBeDefined();
		expect(federation.nounsPoolContractV1.provider).toBeDefined();
		expect(federation.nounsPoolContractV2.provider).toBeDefined();
		expect(typeof federation.nounsPoolContractV1.provider).toBe("object");
		expect(typeof federation.nounsPoolContractV2.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const federation = new FederationNounsPool(provider);

		expect(federation).toBeDefined();
		expect(federation.nounsPoolContractV1.provider).toBeDefined();
		expect(federation.nounsPoolContractV2.provider).toBeDefined();
		expect(typeof federation.nounsPoolContractV1.provider).toBe("object");
		expect(typeof federation.nounsPoolContractV2.provider).toBe("object");
	});
});