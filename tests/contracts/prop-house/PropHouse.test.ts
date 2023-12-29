import { PropHouse } from "../../../src/contracts/prop-house/PropHouse";
import { ethers } from "ethers";

describe("PropHouse tests", () => {
	test("should construct with string", () => {
		const prophouse = new PropHouse("JSON_RPC_URL");

		expect(prophouse).toBeDefined();
		expect(prophouse.prophouse.provider).toBeDefined();
		expect(typeof prophouse.prophouse.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL");
		const prophouse = new PropHouse(provider);

		expect(prophouse).toBeDefined();
		expect(prophouse.prophouse.provider).toBeDefined();
		expect(typeof prophouse.prophouse.provider).toBe("object");
	});
});
