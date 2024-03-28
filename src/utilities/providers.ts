import { ethers } from "ethers-v6";

export function createProvider(jsonRpcUrl: string) {
	if (jsonRpcUrl.toLowerCase().includes("alchemy")) {
		const lastSlashIndex = jsonRpcUrl.lastIndexOf("/");
		const alchemyToken = jsonRpcUrl.substring(lastSlashIndex + 1);

		return new ethers.AlchemyProvider(undefined, alchemyToken);
	} else {
		return new ethers.JsonRpcProvider(jsonRpcUrl);
	}
}
