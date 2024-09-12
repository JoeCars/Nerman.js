import { AlchemyProvider, JsonRpcProvider } from "ethers";

function extractAlchemyToken(jsonRpcUrl: string) {
	const lastSlashIndex = jsonRpcUrl.lastIndexOf("/");
	const alchemyToken = jsonRpcUrl.substring(lastSlashIndex + 1);
	return alchemyToken;
}

function isAlchemyToken(jsonRpcUrl: string) {
	return jsonRpcUrl.toLowerCase().includes("alchemy");
}

export function createAlchemyOrJsonRpcProvider(jsonRpcUrl: string) {
	if (isAlchemyToken(jsonRpcUrl)) {
		const alchemyToken = extractAlchemyToken(jsonRpcUrl);
		return new AlchemyProvider(undefined, alchemyToken);
	} else {
		return new JsonRpcProvider(jsonRpcUrl);
	}
}

export function createOrReturnProvider(providerOrUrl: JsonRpcProvider | string) {
	if (typeof providerOrUrl === "string") {
		return createAlchemyOrJsonRpcProvider(providerOrUrl);
	} else {
		return providerOrUrl;
	}
}
