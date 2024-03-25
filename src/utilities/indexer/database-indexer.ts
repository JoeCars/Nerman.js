import { ethers } from "ethers-v6";
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

	for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += BLOCK_BATCH_SIZE) {
		const progress = ((currentBlock - startBlock) / (endBlock - startBlock)) * 100;
		console.log(eventName, "indexing block", currentBlock, "of", endBlock, `(${progress.toFixed(2)} %)`);

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

const MILLISECONDS_PER_SECOND = 1_000;

export class Indexer {
	private provider: ethers.JsonRpcProvider;
	private nounsDao: _NounsDAO;
	private nounsDaoData: _NounsDAOData;
	private nounsAuctionHouse: _NounsAuctionHouse;
	private nounsToken: _NounsToken;

	constructor(jsonRpcUrl: string) {
		if (jsonRpcUrl.toLowerCase().includes("alchemy")) {
			const lastSlashIndex = jsonRpcUrl.lastIndexOf("/");
			const alchemyToken = jsonRpcUrl.substring(lastSlashIndex + 1);

			this.provider = new ethers.AlchemyProvider(undefined, alchemyToken);
		} else {
			this.provider = new ethers.JsonRpcProvider(jsonRpcUrl);
		}

		this.nounsDao = new _NounsDAO(this.provider);
		this.nounsDaoData = new _NounsDAOData(this.provider);
		this.nounsAuctionHouse = new _NounsAuctionHouse(this.provider);
		this.nounsToken = new _NounsToken(this.provider);
	}

	public async connectToDB(mongoDBUrl: string) {
		return mongoose.connect(mongoDBUrl);
	}

	public async index(eventName: string) {
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

	// Create index all.
	public async indexAll() {
		for (const eventName of _NounsAuctionHouse.supportedEvents) {
			try {
				await this.index(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}

		for (const eventName of _NounsDAO.supportedEvents) {
			try {
				await this.index(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}

		for (const eventName of _NounsDAOData.supportedEvents) {
			try {
				await this.index(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}

		for (const eventName of _NounsToken.supportedEvents) {
			try {
				await this.index(eventName);
			} catch (error) {
				console.error("error", error);
				return;
			}
		}
	}

	public async indexSeveral(...eventNames: string[]) {
		for (const eventName of eventNames) {
			try {
				await this.index(eventName);
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

	async fetchBlockTimestamp(blockNum: number | string | bigint) {
		const block = await this.nounsDao.provider.getBlock(blockNum);
		console.log("block", block);
		return block ? block.timestamp : 0;
	}

	static formatDate(timestamp: number | Date) {
		let date: Date;
		if (typeof timestamp === "number") {
			date = new Date(timestamp * MILLISECONDS_PER_SECOND);
			console.log("date number", date);
		} else {
			date = timestamp;
			console.log("date date", date);
		}

		const year = date.getUTCFullYear();
		const month = date.getUTCMonth() + 1; // getUTCMonth is 0 indexed.
		const day = date.getUTCDate();

		const formattedDate = `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
		return formattedDate;
	}

	async fetchDate(blockNum: number | string | bigint) {
		const timestamp = await this.fetchBlockTimestamp(blockNum);
		console.log("timestamp", timestamp);
		const date = Indexer.formatDate(timestamp);
		return date;
	}

	static async fetchConversionRate(date: string) {
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

	static incrementDate(date: string) {
		const oldDate = new Date(date);
		const newDate = new Date(oldDate);
		console.log("oldDate", oldDate);
		newDate.setUTCDate(oldDate.getUTCDate() + 1);
		console.log("newDate", newDate);
		const formattedDate = this.formatDate(newDate);
		return formattedDate;
	}

	public async indexConversionRates() {
		let date = await this.fetchDate(NOUNS_STARTING_BLOCK);
		console.log("date", date);
		const DELAY_IN_MS = 500;

		const interval = setInterval(async () => {
			const conversionRate = await Indexer.fetchConversionRate(date);
			if (!conversionRate) {
				console.error("unable to fetch conversion rate", date);
				return;
			}
			await ETHConversionRate.create({
				usdPerEth: Number(conversionRate.data.amount),
				date: date
			});

			date = Indexer.incrementDate(date);

			if (new Date(date) > new Date()) {
				clearInterval(interval);
				console.log("done");
			}
		}, DELAY_IN_MS);
	}
}

