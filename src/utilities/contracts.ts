import { Contract, JsonRpcProvider } from "ethers-v6";
import { default as nounsAuctionHouseAbiV1 } from "../contracts/abis/NounsAuctionHouse.json";
import { default as nounsAuctionHouseAbiV2 } from "../contracts/abis/NounsAuctionHouseV2.json";
import { default as nounsDaoLogicAbiV3 } from "../contracts/abis/NounsDAOLogicV3.json";
import { default as nounsDaoLogicAbiV4 } from "../contracts/abis/NounsDAOLogicV4.json";
import { default as nounsDaoDataAbi } from "../contracts/abis/NounsDAOData.json";
import { default as nounsDaoExecutorAbi } from "../contracts/abis/NounsDAOExecutorV2.json";
import { default as nounsTokenAbi } from "../contracts/abis/NounsToken.json";
import { default as payerAbi } from "../contracts/abis/Payer.json";
import { default as tokenBuyerAbi } from "../contracts/abis/TokenBuyer.json";
import { default as rewardsAbi } from "../contracts/abis/Rewards.json";

export const NOUNS_AUCTION_HOUSE_ADDRESS = "0x830BD73E4184ceF73443C15111a1DF14e495C706";
export function createNounsAuctionHouseV1Contract(provider: JsonRpcProvider) {
	return new Contract(NOUNS_AUCTION_HOUSE_ADDRESS, nounsAuctionHouseAbiV1, provider);
}
export function createNounsAuctionHouseV2Contract(provider: JsonRpcProvider) {
	return new Contract(NOUNS_AUCTION_HOUSE_ADDRESS, nounsAuctionHouseAbiV2, provider);
}

export const NOUNS_DAO_LOGIC_ADDRESS = "0x6f3E6272A167e8AcCb32072d08E0957F9c79223d";
export function createNounsDaoLogicV3Contract(provider: JsonRpcProvider) {
	return new Contract(NOUNS_DAO_LOGIC_ADDRESS, nounsDaoLogicAbiV3, provider);
}
export function createNounsDaoLogicV4Contract(provider: JsonRpcProvider) {
	return new Contract(NOUNS_DAO_LOGIC_ADDRESS, nounsDaoLogicAbiV4, provider);
}

export const NOUNS_DAO_DATA_ADDRESS = "0xf790A5f59678dd733fb3De93493A91f472ca1365";
export function createNounsDaoDataContract(provider: JsonRpcProvider) {
	return new Contract(NOUNS_DAO_DATA_ADDRESS, nounsDaoDataAbi, provider);
}

export const NOUNS_DAO_EXECUTOR_ADDRESS = "0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71";
export function createNounsDaoExecutorContract(provider: JsonRpcProvider) {
	return new Contract(NOUNS_DAO_EXECUTOR_ADDRESS, nounsDaoExecutorAbi, provider);
}

export const NOUNS_TOKEN_ADDRESS = "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03";
export function createNounsTokenContract(provider: JsonRpcProvider) {
	return new Contract(NOUNS_TOKEN_ADDRESS, nounsTokenAbi, provider);
}

export const PAYER_ADDRESS = "0xd97Bcd9f47cEe35c0a9ec1dc40C1269afc9E8E1D";
export function createPayerContract(provider: JsonRpcProvider) {
	return new Contract(PAYER_ADDRESS, payerAbi, provider);
}

export const TOKEN_BUYER_ADDRESS = "0x4f2aCdc74f6941390d9b1804faBc3E780388cfe5";
export function createTokenBuyerContract(provider: JsonRpcProvider) {
	return new Contract(TOKEN_BUYER_ADDRESS, tokenBuyerAbi, provider);
}

export const REWARDS_PROXY_ADDRESS = "0x883860178f95d0c82413edc1d6de530cb4771d55";
export function createRewardsProxyContract(provider: JsonRpcProvider) {
	return new Contract(REWARDS_PROXY_ADDRESS, rewardsAbi, provider);
}
