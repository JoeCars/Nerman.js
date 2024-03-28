import { createProvider } from "../../src/utilities/providers";

describe("createProvider tests", () => {
	it("should return an AlchemyProvider", () => {
		const provider = createProvider("alchemy/super-secret-token");
		expect((provider as any).apiKey).toBeDefined(); // apiKey is unique to alchemy.
	});

	it("should return a JsonRpcProvider", () => {
		const provider = createProvider("super-secret-token");
		expect((provider as any).apiKey).not.toBeDefined();
	});
});
