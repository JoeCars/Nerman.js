import { default as Erc20Abi } from "../contracts/abis/ERC20.json";
import { ethers } from "ethers-v6";
import { createOrReturnProvider } from "./providers";
import { WEI_PER_ETH } from "../constants";

interface Erc20 {
	balanceOf: (address: string) => Promise<bigint>;
}

/**
 * Erc20 wrapper contract that abstracts away ABI details for a cleaner api.
 */
export class Erc20Contract implements Erc20 {
	private provider: ethers.JsonRpcProvider;
	private contract: ethers.Contract;

	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider, tokenAddress: string) {
		this.provider = createOrReturnProvider(providerOrRpcUrl);

		this.contract = new ethers.Contract(tokenAddress, Erc20Abi, this.provider);
	}

	public async balanceOf(address: string) {
		const balance: bigint = await this.contract.balanceOf(address);
		return balance;
	}
}

export class StEth extends Erc20Contract {
	public static smallestDenominationRate = WEI_PER_ETH;
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0xae7ab96520de3a18e5e111b5eaab095312d7fe84");
	}
}

export class REth extends Erc20Contract {
	public static smallestDenominationRate = WEI_PER_ETH;
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0xae78736cd615f374d3085123a210448e74fc6393");
	}
}

export class WEth extends Erc20Contract {
	public static smallestDenominationRate = WEI_PER_ETH;
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
	}
}
export class USDC extends Erc20Contract {
	public static smallestDenominationRate = 1_000_000;

	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
	}
}

export class WstEth extends Erc20Contract {
	public static smallestDenominationRate = WEI_PER_ETH;
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		super(providerOrRpcUrl, "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0");
	}
}

export class Eth implements Erc20 {
	public static smallestDenominationRate = WEI_PER_ETH;
	private provider: ethers.JsonRpcProvider;
	public constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		this.provider = createOrReturnProvider(providerOrRpcUrl);
	}

	public async balanceOf(address: string) {
		return this.provider.getBalance(address);
	}
}

type Token = {
	name: string;
	contract: Erc20;
	conversionRate: number;
};

type WalletToken = {
	tokenName: string;
	balance: {
		mainDenomination: number;
		smallestDenomination: bigint;
	};
};

export class WalletTokenFinder {
	private tokens: Token[];
	private provider: ethers.JsonRpcProvider;

	constructor(providerOrRpcUrl: string | ethers.JsonRpcProvider) {
		this.provider = createOrReturnProvider(providerOrRpcUrl);

		this.tokens = [];
		this.tokens.push({
			name: "Eth",
			contract: new Eth(this.provider),
			conversionRate: Eth.smallestDenominationRate
		});
		this.tokens.push({ name: "StEth", contract: new StEth(this.provider), conversionRate: StEth.smallestDenominationRate });
		this.tokens.push({ name: "REth", contract: new REth(this.provider), conversionRate: REth.smallestDenominationRate });
		this.tokens.push({ name: "WEth", contract: new WEth(this.provider), conversionRate: WEth.smallestDenominationRate });
		this.tokens.push({ name: "USDC", contract: new USDC(this.provider), conversionRate: USDC.smallestDenominationRate });
		this.tokens.push({
			name: "WstEth",
			contract: new WstEth(this.provider),
			conversionRate: WstEth.smallestDenominationRate
		});
	}

	public async fetchWalletTokens(address: string) {
		const walletContents: WalletToken[] = [];

		for (const { name, contract, conversionRate } of this.tokens) {
			const smallestDenomination = await contract.balanceOf(address);
			const mainDenomination = Number(smallestDenomination) / conversionRate;
			walletContents.push({ tokenName: name, balance: { smallestDenomination, mainDenomination } });
		}

		return walletContents;
	}
}
