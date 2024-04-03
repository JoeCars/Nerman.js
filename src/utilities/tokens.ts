import { default as Erc20Abi } from "../contracts/abis/ERC20.json";
import { ethers } from "ethers-v6";
import { createProvider } from "./providers";

/**
 * Erc20 wrapper contract that abstracts away ABI details for a cleaner api.
 */
export class Erc20 {
	public provider: ethers.JsonRpcProvider;
	public contract: ethers.Contract;

	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider, tokenAddress: string) {
		if (typeof providerOrRpcUrl === "string") {
			this.provider = createProvider(providerOrRpcUrl);
		} else {
			this.provider = providerOrRpcUrl;
		}

		this.contract = new ethers.Contract(tokenAddress, Erc20Abi, this.provider);
	}

	public async balanceOf(address: string) {
		const balance: bigint = await this.contract.balanceOf(address);
		return balance;
	}
}
