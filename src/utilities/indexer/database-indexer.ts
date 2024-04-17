import { ethers, JsonRpcProvider, WeiPerEther } from "ethers-v6";
import mongoose from "mongoose";

import {
	NOUNS_STARTING_BLOCK,
	BLOCK_BATCH_SIZE,
	NEW_PROPOSAL_CREATED_WITH_REQUIREMENTS_SIGNATURE,
	OLD_PROPOSAL_CREATED_WITH_REQUIREMENTS_SIGNATURE,
	PROPOSAL_WITH_REQUIREMENTS_UPGRADE_BLOCK
} from "../../constants";
import * as eventSchemas from "./schemas/events";
import { _NounsAuctionHouse } from "../../contracts/nouns-dao/NounsAuctionHouse";
import {
	NOUNS_AUCTION_HOUSE_FORMATTERS,
	NOUNS_DAO_FORMATTERS,
	NOUNS_DAO_DATA_FORMATTERS,
	NOUNS_TOKEN_FORMATTERS
} from "./event-formatters";
import { _NounsDAO } from "../../contracts/nouns-dao/NounsDAO";
import { _NounsDAOData } from "../../contracts/nouns-dao/NounsDAOData";
import { _NounsToken } from "../../contracts/nouns-dao/NounsToken";
import { EventFormatter, FormattedEvent } from "../../types";
import IndexerMetaData from "./schemas/IndexerMetaData";
import ETHConversionRate from "./schemas/ETHConversionRate";
import fetch from "node-fetch";
import { createProvider } from "../providers";

const MILLISECONDS_PER_SECOND = 1_000;
const DELAY_IN_MS = 500;

type CoinbaseConversionResult = {
	data: {
		amount: string;
		base: string;
		currency: string;
	};
};

/**
 * Finds every instance of the event triggering on the blockchain until the present block, and saves the result to a database.
 * @param contract the contract the event is in.
 * @param eventName the name of the event being indexed.
 * @param formatter a formatting function that takes the raw blockchain event object and formats it into the desired JavaScript object.
 */
export async function indexEvent(
	contract: ethers.Contract,
	eventName: string,
	formatter: EventFormatter,
	endBlock: number,
	startBlock = NOUNS_STARTING_BLOCK
) {
	const indexedEvents: FormattedEvent[] = [];

	// Adding BLOCK_BATCH_SIZE + 1 to currentBlock because contract.queryFilter() is inclusive.
	// This prevents duplicate indexes of events happening on multiples of BLOCK_BATCH_SIZE.
	for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += BLOCK_BATCH_SIZE + 1) {
		let events = (await contract.queryFilter(
			eventName,
			currentBlock,
			Math.min(currentBlock + BLOCK_BATCH_SIZE, endBlock)
		)) as ethers.EventLog[];

		events.forEach((event) => {
			const formattedEvent = formatter(event);
			indexedEvents.push(formattedEvent);
		});
	}

	return indexedEvents;
}

export async function connectToDatabase(mongoDBUrl: string) {
	return mongoose.connect(mongoDBUrl);
}

export class DatabaseIndexer {
	private provider: ethers.JsonRpcProvider;
	private nounsDao: _NounsDAO;
	private nounsDaoData: _NounsDAOData;
	private nounsAuctionHouse: _NounsAuctionHouse;
	private nounsToken: _NounsToken;

	public constructor(jsonRpcUrl: string) {
		this.provider = createProvider(jsonRpcUrl);

		this.nounsDao = new _NounsDAO(this.provider);
		this.nounsDaoData = new _NounsDAOData(this.provider);
		this.nounsAuctionHouse = new _NounsAuctionHouse(this.provider);
		this.nounsToken = new _NounsToken(this.provider);
	}

	private async indexToDatabase(eventName: string) {
		const contract = this.getContract(eventName);
		let formatter = this.getFormatter(eventName);

		const { hasBlockNumber, recentBlock } = await this.fetchPreviousMetaData(eventName);
		const endBlock = await contract.provider.getBlockNumber();
		let startBlock = hasBlockNumber ? recentBlock! + 1 : NOUNS_STARTING_BLOCK;
		let eventSignature = eventName;

		// Different signatures need to be indexed independently, but stored together.
		if (eventName === "ProposalCreatedWithRequirements") {
			if (startBlock < PROPOSAL_WITH_REQUIREMENTS_UPGRADE_BLOCK) {
				eventSignature = OLD_PROPOSAL_CREATED_WITH_REQUIREMENTS_SIGNATURE;
				const proposalEvents = await indexEvent(
					contract.Contract,
					eventSignature,
					formatter,
					PROPOSAL_WITH_REQUIREMENTS_UPGRADE_BLOCK,
					startBlock
				);

				await this.writeToDatabase(eventName, proposalEvents);
				startBlock = PROPOSAL_WITH_REQUIREMENTS_UPGRADE_BLOCK + 1;
			}

			eventSignature = NEW_PROPOSAL_CREATED_WITH_REQUIREMENTS_SIGNATURE;
		}

		const indexedEvents = await indexEvent(contract.Contract, eventSignature, formatter, endBlock, startBlock);

		await this.writeToDatabase(eventName, indexedEvents);
		console.log(new Date(), eventName, "written to database");
		await this.updateMetaData(eventName, endBlock);
		console.log(new Date(), eventName, "meta-data updated");
	}

	private async indexAll() {
		for (const eventName of _NounsAuctionHouse.supportedEvents) {
			try {
				await this.indexToDatabase(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}

		for (const eventName of _NounsDAO.supportedEvents) {
			try {
				await this.indexToDatabase(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}

		for (const eventName of _NounsDAOData.supportedEvents) {
			try {
				await this.indexToDatabase(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}

		for (const eventName of _NounsToken.supportedEvents) {
			try {
				await this.indexToDatabase(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}
	}

	public async index(...eventNames: string[]) {
		if (eventNames.length === 0) {
			return this.indexAll();
		}

		for (const eventName of eventNames) {
			try {
				await this.indexToDatabase(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}
	}

	private getContract(eventName: string): _NounsAuctionHouse | _NounsDAO | _NounsDAOData | _NounsToken {
		if (this.nounsDao.hasEvent(eventName)) {
			return this.nounsDao;
		} else if (this.nounsDaoData.hasEvent(eventName)) {
			return this.nounsDaoData;
		} else if (this.nounsAuctionHouse.hasEvent(eventName)) {
			return this.nounsAuctionHouse;
		} else if (this.nounsToken.hasEvent(eventName)) {
			return this.nounsToken;
		} else {
			throw new Error(`${eventName} is not supported.`);
		}
	}

	private getFormatter(eventName: string): EventFormatter {
		if (NOUNS_DAO_FORMATTERS.has(eventName)) {
			return NOUNS_DAO_FORMATTERS.get(eventName)!;
		} else if (NOUNS_DAO_DATA_FORMATTERS.has(eventName)) {
			return NOUNS_DAO_DATA_FORMATTERS.get(eventName)!;
		} else if (NOUNS_AUCTION_HOUSE_FORMATTERS.has(eventName)) {
			return NOUNS_AUCTION_HOUSE_FORMATTERS.get(eventName)!;
		} else if (NOUNS_TOKEN_FORMATTERS.has(eventName)) {
			return NOUNS_TOKEN_FORMATTERS.get(eventName)!;
		} else {
			throw new Error(`${eventName} is not supported.`);
		}
	}

	private async writeToDatabase(eventName: string, indexedEvents: FormattedEvent[]) {
		switch (eventName) {
			// Nouns DAO Logic
			case "DAOWithdrawNounsFromEscrow":
				return eventSchemas.DAOWithdrawNounsFromEscrow.insertMany(indexedEvents);
			case "ERC20TokensToIncludeInForkSet":
				return eventSchemas.ERC20TokensToIncludeInForkSet.insertMany(indexedEvents);
			case "EscrowedToFork":
				return eventSchemas.EscrowedToFork.insertMany(indexedEvents);
			case "ExecuteFork":
				return eventSchemas.ExecuteFork.insertMany(indexedEvents);
			case "ForkDAODeployerSet":
				return eventSchemas.ForkDAODeployerSet.insertMany(indexedEvents);
			case "ForkPeriodSet":
				return eventSchemas.ForkPeriodSet.insertMany(indexedEvents);
			case "ForkThresholdSet":
				return eventSchemas.ForkThresholdSet.insertMany(indexedEvents);
			case "JoinFork":
				return eventSchemas.JoinFork.insertMany(indexedEvents);
			case "LastMinuteWindowSet":
				return eventSchemas.LastMinuteWindowSet.insertMany(indexedEvents);
			case "MaxQuorumVotesBPSSet":
				return eventSchemas.MaxQuorumVotesBPSSet.insertMany(indexedEvents);
			case "MinQuorumVotesBPSSet":
				return eventSchemas.MinQuorumVotesBPSSet.insertMany(indexedEvents);
			case "NewAdmin":
				return eventSchemas.NewAdmin.insertMany(indexedEvents);
			case "NewImplementation":
				return eventSchemas.NewImplementation.insertMany(indexedEvents);
			case "NewPendingAdmin":
				return eventSchemas.NewPendingAdmin.insertMany(indexedEvents);
			case "NewPendingVetoer":
				return eventSchemas.NewPendingVetoer.insertMany(indexedEvents);
			case "NewVetoer":
				return eventSchemas.NewVetoer.insertMany(indexedEvents);
			case "ObjectionPeriodDurationSet":
				return eventSchemas.ObjectionPeriodDurationSet.insertMany(indexedEvents);
			case "ProposalCanceled":
				return eventSchemas.ProposalCanceled.insertMany(indexedEvents);
			case "ProposalCreated":
				return eventSchemas.ProposalCreated.insertMany(indexedEvents);
			case "ProposalCreatedOnTimelockV1":
				return eventSchemas.ProposalCreatedOnTimelockV1.insertMany(indexedEvents);
			case "ProposalCreatedWithRequirements":
				return eventSchemas.ProposalCreatedWithRequirements.insertMany(indexedEvents);
			case "ProposalDescriptionUpdated":
				return eventSchemas.ProposalDescriptionUpdated.insertMany(indexedEvents);
			case "ProposalExecuted":
				return eventSchemas.ProposalExecuted.insertMany(indexedEvents);
			case "ProposalObjectionPeriodSet":
				return eventSchemas.ProposalObjectionPeriodSet.insertMany(indexedEvents);
			case "ProposalQueued":
				return eventSchemas.ProposalQueued.insertMany(indexedEvents);
			case "ProposalThresholdBPSSet":
				return eventSchemas.ProposalThresholdBPSSet.insertMany(indexedEvents);
			case "ProposalTransactionsUpdated":
				return eventSchemas.ProposalTransactionsUpdated.insertMany(indexedEvents);
			case "ProposalUpdatablePeriodSet":
				return eventSchemas.ProposalUpdatablePeriodSet.insertMany(indexedEvents);
			case "ProposalUpdated":
				return eventSchemas.ProposalUpdated.insertMany(indexedEvents);
			case "ProposalVetoed":
				return eventSchemas.ProposalVetoed.insertMany(indexedEvents);
			case "QuorumCoefficientSet":
				return eventSchemas.QuorumCoefficientSet.insertMany(indexedEvents);
			case "QuorumVotesBPSSet":
				return eventSchemas.QuorumVotesBPSSet.insertMany(indexedEvents);
			case "RefundableVote":
				return eventSchemas.RefundableVote.insertMany(indexedEvents);
			case "SignatureCancelled":
				return eventSchemas.SignatureCancelled.insertMany(indexedEvents);
			case "TimelocksAndAdminSet":
				return eventSchemas.TimelocksAndAdminSet.insertMany(indexedEvents);
			case "VoteCast":
				return eventSchemas.VoteCast.insertMany(indexedEvents);
			case "VoteSnapshotBlockSwitchProposalIdSet":
				return eventSchemas.VoteSnapshotBlockSwitchProposalIdSet.insertMany(indexedEvents);
			case "VotingDelaySet":
				return eventSchemas.VotingDelaySet.insertMany(indexedEvents);
			case "VotingPeriodSet":
				return eventSchemas.VotingPeriodSet.insertMany(indexedEvents);
			case "Withdraw":
				return eventSchemas.Withdraw.insertMany(indexedEvents);
			case "WithdrawFromForkEscrow":
				return eventSchemas.WithdrawFromForkEscrow.insertMany(indexedEvents);

			// Nouns Auction House
			case "AuctionCreated":
				return eventSchemas.AuctionCreated.insertMany(indexedEvents);
			case "AuctionBid":
				return eventSchemas.AuctionBid.insertMany(indexedEvents);
			case "AuctionExtended":
				return eventSchemas.AuctionExtended.insertMany(indexedEvents);
			case "AuctionSettled":
				return eventSchemas.AuctionSettled.insertMany(indexedEvents);
			case "AuctionTimeBufferUpdated":
				return eventSchemas.AuctionTimeBufferUpdated.insertMany(indexedEvents);
			case "AuctionReservePriceUpdated":
				return eventSchemas.AuctionReservePriceUpdated.insertMany(indexedEvents);
			case "AuctionMinBidIncrementPercentageUpdated":
				return eventSchemas.AuctionMinBidIncrementPercentageUpdated.insertMany(indexedEvents);
			case "OwnershipTransferred":
				return eventSchemas.OwnershipTransferred.insertMany(indexedEvents);
			case "Paused":
				return eventSchemas.Paused.insertMany(indexedEvents);
			case "Unpaused":
				return eventSchemas.Unpaused.insertMany(indexedEvents);

			// Nouns Token
			case "DelegateChanged":
				return eventSchemas.DelegateChanged.insertMany(indexedEvents);
			case "DelegateVotesChanged":
				return eventSchemas.DelegateVotesChanged.insertMany(indexedEvents);
			case "Transfer":
				return eventSchemas.Transfer.insertMany(indexedEvents);
			case "Approval":
				return eventSchemas.Approval.insertMany(indexedEvents);
			case "ApprovalForAll":
				return eventSchemas.ApprovalForAll.insertMany(indexedEvents);
			case "NounCreated":
				return eventSchemas.NounCreated.insertMany(indexedEvents);
			case "DescriptorLocked":
				return eventSchemas.DescriptorLocked.insertMany(indexedEvents);
			case "DescriptorUpdated":
				return eventSchemas.DescriptorUpdated.insertMany(indexedEvents);
			case "MinterLocked":
				return eventSchemas.MinterLocked.insertMany(indexedEvents);
			case "MinterUpdated":
				return eventSchemas.MinterUpdated.insertMany(indexedEvents);
			case "NounBurned":
				return eventSchemas.NounBurned.insertMany(indexedEvents);
			case "NoundersDAOUpdated":
				return eventSchemas.NoundersDAOUpdated.insertMany(indexedEvents);
			case "OwnershipTransferred":
				return eventSchemas.OwnershipTransferred.insertMany(indexedEvents);
			case "SeederLocked":
				return eventSchemas.SeederLocked.insertMany(indexedEvents);
			case "SeederUpdated":
				return eventSchemas.SeederUpdated.insertMany(indexedEvents);

			// Nouns DAO Data
			case "AdminChanged":
				return eventSchemas.AdminChanged.insertMany(indexedEvents);
			case "BeaconUpgraded":
				return eventSchemas.BeaconUpgraded.insertMany(indexedEvents);
			case "CandidateFeedbackSent":
				return eventSchemas.CandidateFeedbackSent.insertMany(indexedEvents);
			case "CreateCandidateCostSet":
				return eventSchemas.CreateCandidateCostSet.insertMany(indexedEvents);
			case "ETHWithdrawn":
				return eventSchemas.ETHWithdrawn.insertMany(indexedEvents);
			case "FeeRecipientSet":
				return eventSchemas.FeeRecipientSet.insertMany(indexedEvents);
			case "FeedbackSent":
				return eventSchemas.FeedbackSent.insertMany(indexedEvents);
			case "OwnershipTransferred":
				return eventSchemas.OwnershipTransferred.insertMany(indexedEvents);
			case "ProposalCandidateCanceled":
				return eventSchemas.ProposalCandidateCanceled.insertMany(indexedEvents);
			case "ProposalCandidateCreated":
				return eventSchemas.ProposalCandidateCreated.insertMany(indexedEvents);
			case "ProposalCandidateUpdated":
				return eventSchemas.ProposalCandidateUpdated.insertMany(indexedEvents);
			case "SignatureAdded":
				return eventSchemas.SignatureAdded.insertMany(indexedEvents);
			case "UpdateCandidateCostSet":
				return eventSchemas.UpdateCandidateCostSet.insertMany(indexedEvents);
			case "Upgraded":
				return eventSchemas.Upgraded.insertMany(indexedEvents);

			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}

	private async updateMetaData(eventName: string, blockNumber: number) {
		const metaData = await IndexerMetaData.findOne({ eventName: eventName }).exec();
		if (metaData) {
			metaData.recentBlock = blockNumber;
			await metaData.save();
		} else {
			await IndexerMetaData.create({ eventName: eventName, recentBlock: blockNumber });
		}
	}

	/**
	 * @param eventName
	 * @returns The block number if it was previously indexed. Must be incremented before indexing.
	 */
	private async fetchPreviousMetaData(eventName: string) {
		const metaData = await IndexerMetaData.findOne({ eventName: eventName }).exec();

		if (!metaData) {
			return {
				hasBlockNumber: false
			};
		}

		return {
			hasBlockNumber: true,
			recentBlock: metaData.recentBlock
		};
	}
}

export async function fetchBlockTimestamp(provider: ethers.JsonRpcProvider, blockNum: number | string | bigint) {
	const block = await provider.getBlock(blockNum);
	return block ? block.timestamp : 0;
}

export async function fetchDate(provider: ethers.JsonRpcProvider, blockNum: number | string | bigint) {
	const timestamp = await fetchBlockTimestamp(provider, blockNum);
	const date = formatDate(timestamp);
	return date;
}

/**
 * @param timestamp either the seconds since unix time, a string date, or a date object
 * @returns a date string formatted as "yyyy-mm-dd"
 */
export function formatDate(timestamp: number | string | Date) {
	let date: Date;
	if (typeof timestamp === "number") {
		date = new Date(timestamp * MILLISECONDS_PER_SECOND);
	} else if (typeof timestamp === "string") {
		date = new Date(timestamp);
	} else {
		date = timestamp;
	}

	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1; // getUTCMonth is 0 indexed.
	const day = date.getUTCDate();

	const formattedDate = `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
	return formattedDate;
}

export function incrementDate(date: string) {
	const oldDate = new Date(date);
	const newDate = new Date(oldDate);
	newDate.setUTCDate(oldDate.getUTCDate() + 1);
	const formattedDate = formatDate(newDate);
	return formattedDate;
}

export class ConversionRateManager {
	private provider: JsonRpcProvider;

	public constructor(provider: JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = createProvider(provider);
		} else {
			this.provider = provider;
		}
	}

	private async fetchConversionRate(date: string) {
		try {
			const response = await fetch(`https://api.coinbase.com/v2/prices/ETH-USD/spot?date=${date}`);
			if (!response.ok) {
				throw new Error(`unable to fetch conversion rate ${response.status} ${response.statusText}`);
			}
			const result: CoinbaseConversionResult = await response.json();
			return result;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	private async fetchInitialDate() {
		const newestConversionRate = await ETHConversionRate.findOne().sort({ date: -1 }).exec();
		if (newestConversionRate) {
			let date = formatDate(newestConversionRate.date);
			return incrementDate(date);
		} else {
			return fetchDate(this.provider, NOUNS_STARTING_BLOCK);
		}
	}

	public async indexConversionRates() {
		let date = await this.fetchInitialDate();

		const interval = setInterval(async () => {
			if (new Date(date) > new Date()) {
				clearInterval(interval);
				console.log("finished indexing conversion rates");
				return;
			}

			const conversionRate = await this.fetchConversionRate(date);
			if (!conversionRate) {
				console.error("unable to fetch conversion rate", date);
				clearInterval(interval);
				return;
			}
			await ETHConversionRate.create({
				usdPerEth: Number(conversionRate.data.amount),
				date: date
			});

			date = incrementDate(date);
		}, DELAY_IN_MS);
	}

	static async convertEthToUsd(ethAmount: number, date = new Date()) {
		const formattedDate = formatDate(date);
		const conversionRate = await ETHConversionRate.findOne({ date: new Date(formattedDate) }).exec();
		if (!conversionRate) {
			throw new Error(`Unable to find conversion rate for ${date}`);
		}
		return conversionRate.usdPerEth * ethAmount;
	}

	static async fetchUsdPerEth(date = new Date()) {
		const formattedDate = formatDate(date);
		const conversionRate = await ETHConversionRate.findOne({ date: new Date(formattedDate) }).exec();
		if (!conversionRate) {
			throw new Error(
				`Unable to find conversion rate for ${date}. Please ensure the conversion rate is properly indexed.`
			);
		}
		return conversionRate.usdPerEth;
	}
}

export async function calculateAuctionsSummary() {
	let totalWeiSpent = 0n;
	let totalBids = 0;
	const weiPerBidder = new Map<string, bigint>();

	for await (const bid of eventSchemas.AuctionBid.find()) {
		totalBids++;
		totalWeiSpent += BigInt(bid.amount);

		const prevBidTotal = weiPerBidder.get(bid.bidder.id) || 0n;
		const bidAmount = BigInt(bid.amount);
		weiPerBidder.set(bid.bidder.id, prevBidTotal + bidAmount);
	}

	const usdPerEth = await ConversionRateManager.fetchUsdPerEth();

	return formatAuctionSummary(totalWeiSpent, totalBids, weiPerBidder, usdPerEth);
}

export function formatAuctionSummary(
	totalWeiSpent: bigint,
	totalBids: number,
	weiPerBidder: Map<string, bigint>,
	usdPerEth: number
) {
	let totalEthSpent = Number(totalWeiSpent) / Number(WeiPerEther);
	let totalUniqueBidders = 0;
	const totalBidPerBidder: { eth: number; usd: number; bidder: string }[] = [];
	weiPerBidder.forEach((weiBid, bidder) => {
		totalUniqueBidders++;

		const ethBid = Number(weiBid) / Number(WeiPerEther);

		totalBidPerBidder.push({
			eth: ethBid,
			usd: ethBid * usdPerEth,
			bidder: bidder
		});
	});

	return {
		totalSpent: {
			eth: totalEthSpent,
			usd: totalEthSpent * usdPerEth
		},
		totalBids,
		totalUniqueBidders,
		totalBidPerBidder,
		usdPerEth
	};
}

export class IndexerReader {
	static async totalEthSpentOnBids() {
		let total = 0n;
		for await (const bid of eventSchemas.AuctionBid.find()) {
			total = total + BigInt(bid.amount);
		}
		return total;
	}

	static async totalBids() {
		return eventSchemas.AuctionBid.countDocuments().exec();
	}

	static async totalUniqueBidders() {
		return (await eventSchemas.AuctionBid.distinct("bidder.id")).length;
	}

	static async totalETHBidPerWalletAddress() {
		const ethPerWallet = new Map<string, bigint>();
		for await (const bid of eventSchemas.AuctionBid.find()) {
			const prevBidTotal = ethPerWallet.get(bid.bidder.id) || 0n;
			const bidAmount = BigInt(bid.amount);
			ethPerWallet.set(bid.bidder.id, prevBidTotal + bidAmount);
		}
		return ethPerWallet;
	}
}
