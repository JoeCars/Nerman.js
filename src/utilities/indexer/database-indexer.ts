import { JsonRpcProvider } from "ethers-v6";

import { NOUNS_STARTING_BLOCK } from "../../constants";
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
import { createAlchemyOrJsonRpcProvider } from "../providers";
import {
	ContractEventManager,
	NounsAuctionEventManager,
	NounsDaoDataEventManager,
	NounsDaoEventManager,
	NounsTokenEventManager
} from "./contract-event-manager";
import { BlockToDateConverter, DateFormatter } from "../dates";

const DELAY_IN_MS = 500;

type CoinbaseConversionResult = {
	data: {
		amount: string;
		base: string;
		currency: string;
	};
};

export class DatabaseIndexer {
	private provider: JsonRpcProvider;
	private nounsDao: _NounsDAO;
	private nounsDaoData: _NounsDAOData;
	private nounsAuctionHouse: _NounsAuctionHouse;
	private nounsToken: _NounsToken;
	private nounsDaoManager: NounsDaoEventManager;
	private nounsDaoDataManager: NounsDaoDataEventManager;
	private nounsAuctionManager: NounsAuctionEventManager;
	private nounsTokenManager: NounsTokenEventManager;

	public constructor(jsonRpcUrl: string) {
		this.provider = createAlchemyOrJsonRpcProvider(jsonRpcUrl);

		this.nounsDao = new _NounsDAO(this.provider);
		this.nounsDaoData = new _NounsDAOData(this.provider);
		this.nounsAuctionHouse = new _NounsAuctionHouse(this.provider);
		this.nounsToken = new _NounsToken(this.provider);

		this.nounsDaoManager = NounsDaoEventManager.create(this.provider);
		this.nounsDaoDataManager = NounsDaoDataEventManager.create(this.provider);
		this.nounsAuctionManager = NounsAuctionEventManager.create(this.provider);
		this.nounsTokenManager = NounsTokenEventManager.create(this.provider);
	}

	private async indexToDatabase(eventName: string) {
		const contractManager = this.getContractManager(eventName);

		const { hasBlockNumber, recentBlock } = await this.fetchPreviousMetaData(eventName);
		// -1 because the newest block can sometimes be unprocessed by the node provider.
		const endBlock = (await this.provider.getBlockNumber()) - 1;
		let startBlock = hasBlockNumber ? recentBlock! + 1 : NOUNS_STARTING_BLOCK;

		const indexedEvents = (await contractManager.fetchFormattedEvents(eventName, startBlock, endBlock)) as FormattedEvent[];

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

	private getContractManager(eventName: string): ContractEventManager {
		if (this.nounsDao.hasEvent(eventName)) {
			return this.nounsDaoManager;
		} else if (this.nounsDaoData.hasEvent(eventName)) {
			return this.nounsDaoDataManager;
		} else if (this.nounsAuctionHouse.hasEvent(eventName)) {
			return this.nounsAuctionManager;
		} else if (this.nounsToken.hasEvent(eventName)) {
			return this.nounsTokenManager;
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
			case "DAONounsSupplyIncreasedFromEscrow":
				return eventSchemas.DAONounsSupplyIncreasedFromEscrow.insertMany(indexedEvents);
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
			case "VoteCastWithClientId":
				return eventSchemas.VoteCastWithClientId.insertMany(indexedEvents);
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
			case "AuctionBidWithClientId":
				return eventSchemas.AuctionBidWithClientId.insertMany(indexedEvents);
			case "AuctionExtended":
				return eventSchemas.AuctionExtended.insertMany(indexedEvents);
			case "AuctionMinBidIncrementPercentageUpdated":
				return eventSchemas.AuctionMinBidIncrementPercentageUpdated.insertMany(indexedEvents);
			case "AuctionReservePriceUpdated":
				return eventSchemas.AuctionReservePriceUpdated.insertMany(indexedEvents);
			case "AuctionSettled":
				return eventSchemas.AuctionSettled.insertMany(indexedEvents);
			case "AuctionSettledWithClientId":
				return eventSchemas.AuctionSettledWithClientId.insertMany(indexedEvents);
			case "AuctionTimeBufferUpdated":
				return eventSchemas.AuctionTimeBufferUpdated.insertMany(indexedEvents);
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

export class ConversionRateManager {
	private provider: JsonRpcProvider;
	private blockToDateConverter: BlockToDateConverter;
	private dateFormatter: DateFormatter;

	public constructor(provider: JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = createAlchemyOrJsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this.dateFormatter = new DateFormatter();
		this.blockToDateConverter = new BlockToDateConverter(this.provider, this.dateFormatter);
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
			let date = this.dateFormatter.formatDate(newestConversionRate.date);
			return this.dateFormatter.incrementDate(date);
		} else {
			return this.blockToDateConverter.fetchDate(NOUNS_STARTING_BLOCK);
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

			date = this.dateFormatter.incrementDate(date);
		}, DELAY_IN_MS);
	}

	async convertEthToUsdByDate(ethAmount: number, date = new Date()) {
		const formattedDate = this.dateFormatter.formatDate(date);
		const conversionRate = await ETHConversionRate.findOne({ date: new Date(formattedDate) }).exec();
		if (!conversionRate) {
			throw new Error(`Unable to find conversion rate for ${date}`);
		}
		return conversionRate.usdPerEth * ethAmount;
	}

	async convertEthToUsdByBlockNumber(ethAmount: number, blockNumber: number) {
		const date = await this.blockToDateConverter.fetchDate(blockNumber);
		return this.convertEthToUsdByDate(ethAmount, new Date(date));
	}

	async fetchUsdPerEth(date = new Date()) {
		const formattedDate = this.dateFormatter.formatDate(date);
		const conversionRate = await ETHConversionRate.findOne({ date: new Date(formattedDate) }).exec();
		if (!conversionRate) {
			throw new Error(
				`Unable to find conversion rate for ${date}. Please ensure the conversion rate is properly indexed.`
			);
		}
		return conversionRate.usdPerEth;
	}
}
