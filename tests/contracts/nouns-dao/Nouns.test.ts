import { Nouns, calculateBookValue } from "../../../src/contracts/nouns-dao/Nouns";
import { ethers } from "ethers-v6";

describe("Nouns tests", () => {
	describe("calculateBookValue() tests", () => {
		it("should return return 2", async () => {
			const providerMock = {
				getBalance() {
					return 10n * ethers.WeiPerEther;
				}
			};
			const contractMock = {
				adjustedTotalSupply() {
					return 5n;
				}
			};

			const result = await calculateBookValue("address", providerMock as any, contractMock as any);
			expect(result).toEqual(2);
		});
	});
});
