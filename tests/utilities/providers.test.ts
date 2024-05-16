import { createAlchemyOrJsonRpcProvider } from "../../src/utilities/providers";

describe("createAlchemyOrJsonRpcProvider() tests", () => {
	it("should return an AlchemyProvider", () => {
		const provider = createAlchemyOrJsonRpcProvider("alchemy/super-secret-token");
		expect((provider as any).apiKey).toBeDefined(); // apiKey is unique to alchemy.
	});

	it("should return a JsonRpcProvider", () => {
		const provider = createAlchemyOrJsonRpcProvider("super-secret-token");
		expect((provider as any).apiKey).not.toBeDefined();
	});
});
