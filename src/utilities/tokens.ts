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

export class StEth extends Erc20 {
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0xae7ab96520de3a18e5e111b5eaab095312d7fe84");
	}
}

export class REth extends Erc20 {
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0xae78736cd615f374d3085123a210448e74fc6393");
	}
}

export class WEth extends Erc20 {
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
	}
}
export class Usdc extends Erc20 {
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
	}
}

export class WstEth extends Erc20 {
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0");
	}
}
