import { LilNounsDAOLogic } from "../../../src/contracts/lil-nouns/LilNounsDAOLogic";
import { ethers } from "ethers";

describe("LilNounsDAOLogic tests", () => {
	test("should construct with string", () => {
		const lilNounsDAOLogic = new LilNounsDAOLogic("JSON_RPC_URL");

		expect(lilNounsDAOLogic).toBeDefined();
		expect(lilNounsDAOLogic.provider).toBeDefined();
		expect(typeof lilNounsDAOLogic.provider).toBe("object");
	});
	test("should construct with provider", () => {
		const provider = new ethers.JsonRpcProvider("JSON_RPC_URL");
		const lilNounsDAOLogic = new LilNounsDAOLogic(provider);

		expect(lilNounsDAOLogic).toBeDefined();
		expect(lilNounsDAOLogic.provider).toBeDefined();
		expect(typeof lilNounsDAOLogic.provider).toBe("object");
	});
});
