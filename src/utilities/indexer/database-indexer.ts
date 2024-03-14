import { ethers } from "ethers-v6";
import mongoose from "mongoose";

import { NOUNS_STARTING_BLOCK, BLOCK_BATCH_SIZE } from "../../constants";
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
	startBlock = NOUNS_STARTING_BLOCK,
	indexedEvents: FormattedEvent[] = []
) {
	for (let currentBlock = startBlock; currentBlock <= endBlock; currentBlock += BLOCK_BATCH_SIZE) {
		const progress = ((currentBlock - startBlock) / (endBlock - startBlock)) * 100;
		console.log("\rindexing block", currentBlock, "of", endBlock, `(${progress.toFixed(2)} %)`);

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

		const endBlock = await contract.provider.getBlockNumber();

		const indexedEvents = await indexEvent(contract.Contract, eventName, formatter, endBlock);

		await this.writeToDatabase(eventName, indexedEvents);
		await this.updateMetaData(eventName, endBlock);

		// TODO: Figure out the start block. Worry about update later.
		// TODO: Figure out the indexed data. Worry about update later.
		// TODO: Figure out special proposal created with requirements later.
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
				return eventSchemas.DAOWithdrawNounsFromEscrow.create(indexedEvents);
			case "ERC20TokensToIncludeInForkSet":
				return eventSchemas.ERC20TokensToIncludeInForkSet.create(indexedEvents);
			case "EscrowedToFork":
				return eventSchemas.EscrowedToFork.create(indexedEvents);
			case "ExecuteFork":
				return eventSchemas.ExecuteFork.create(indexedEvents);
			case "ForkDAODeployerSet":
				return eventSchemas.ForkDAODeployerSet.create(indexedEvents);
			case "ForkPeriodSet":
				return eventSchemas.ForkPeriodSet.create(indexedEvents);
			case "ForkThresholdSet":
				return eventSchemas.ForkThresholdSet.create(indexedEvents);
			case "JoinFork":
				return eventSchemas.JoinFork.create(indexedEvents);
			case "LastMinuteWindowSet":
				return eventSchemas.LastMinuteWindowSet.create(indexedEvents);
			case "MaxQuorumVotesBPSSet":
				return eventSchemas.MaxQuorumVotesBPSSet.create(indexedEvents);
			case "MinQuorumVotesBPSSet":
				return eventSchemas.MinQuorumVotesBPSSet.create(indexedEvents);
			case "NewAdmin":
				return eventSchemas.NewAdmin.create(indexedEvents);
			case "NewImplementation":
				return eventSchemas.NewImplementation.create(indexedEvents);
			case "NewPendingAdmin":
				return eventSchemas.NewPendingAdmin.create(indexedEvents);
			case "NewPendingVetoer":
				return eventSchemas.NewPendingVetoer.create(indexedEvents);
			case "NewVetoer":
				return eventSchemas.NewVetoer.create(indexedEvents);
			case "ObjectionPeriodDurationSet":
				return eventSchemas.ObjectionPeriodDurationSet.create(indexedEvents);
			case "ProposalCanceled":
				return eventSchemas.ProposalCanceled.create(indexedEvents);
			case "ProposalCreated":
				return eventSchemas.ProposalCreated.create(indexedEvents);
			case "ProposalCreatedOnTimelockV1":
				return eventSchemas.ProposalCreatedOnTimelockV1.create(indexedEvents);
			case "ProposalCreatedWithRequirements":
				return eventSchemas.ProposalCreatedWithRequirements.create(indexedEvents);
			case "ProposalDescriptionUpdated":
				return eventSchemas.ProposalDescriptionUpdated.create(indexedEvents);
			case "ProposalExecuted":
				return eventSchemas.ProposalExecuted.create(indexedEvents);
			case "ProposalObjectionPeriodSet":
				return eventSchemas.ProposalObjectionPeriodSet.create(indexedEvents);
			case "ProposalQueued":
				return eventSchemas.ProposalQueued.create(indexedEvents);
			case "ProposalThresholdBPSSet":
				return eventSchemas.ProposalThresholdBPSSet.create(indexedEvents);
			case "ProposalTransactionsUpdated":
				return eventSchemas.ProposalTransactionsUpdated.create(indexedEvents);
			case "ProposalUpdatablePeriodSet":
				return eventSchemas.ProposalUpdatablePeriodSet.create(indexedEvents);
			case "ProposalUpdated":
				return eventSchemas.ProposalUpdated.create(indexedEvents);
			case "ProposalVetoed":
				return eventSchemas.ProposalVetoed.create(indexedEvents);
			case "QuorumCoefficientSet":
				return eventSchemas.QuorumCoefficientSet.create(indexedEvents);
			case "QuorumVotesBPSSet":
				return eventSchemas.QuorumVotesBPSSet.create(indexedEvents);
			case "RefundableVote":
				return eventSchemas.RefundableVote.create(indexedEvents);
			case "SignatureCancelled":
				return eventSchemas.SignatureCancelled.create(indexedEvents);
			case "TimelocksAndAdminSet":
				return eventSchemas.TimelocksAndAdminSet.create(indexedEvents);
			case "VoteCast":
				return eventSchemas.VoteCast.create(indexedEvents);
			case "VoteSnapshotBlockSwitchProposalIdSet":
				return eventSchemas.VoteSnapshotBlockSwitchProposalIdSet.create(indexedEvents);
			case "VotingDelaySet":
				return eventSchemas.VotingDelaySet.create(indexedEvents);
			case "VotingPeriodSet":
				return eventSchemas.VotingPeriodSet.create(indexedEvents);
			case "Withdraw":
				return eventSchemas.Withdraw.create(indexedEvents);
			case "WithdrawFromForkEscrow":
				return eventSchemas.WithdrawFromForkEscrow.create(indexedEvents);

			// Nouns Auction House
			case "AuctionCreated":
				return eventSchemas.AuctionCreated.create(indexedEvents);
			case "AuctionBid":
				return eventSchemas.AuctionBid.create(indexedEvents);
			case "AuctionExtended":
				return eventSchemas.AuctionExtended.create(indexedEvents);
			case "AuctionSettled":
				return eventSchemas.AuctionSettled.create(indexedEvents);
			case "AuctionTimeBufferUpdated":
				return eventSchemas.AuctionTimeBufferUpdated.create(indexedEvents);
			case "AuctionReservePriceUpdated":
				return eventSchemas.AuctionReservePriceUpdated.create(indexedEvents);
			case "AuctionMinBidIncrementPercentageUpdated":
				return eventSchemas.AuctionMinBidIncrementPercentageUpdated.create(indexedEvents);
			case "OwnershipTransferred":
				return eventSchemas.OwnershipTransferred.create(indexedEvents);
			case "Paused":
				return eventSchemas.Paused.create(indexedEvents);
			case "Unpaused":
				return eventSchemas.Unpaused.create(indexedEvents);

			// Nouns Token
			case "DelegateChanged":
				return eventSchemas.DelegateChanged.create(indexedEvents);
			case "DelegateVotesChanged":
				return eventSchemas.DelegateVotesChanged.create(indexedEvents);
			case "Transfer":
				return eventSchemas.Transfer.create(indexedEvents);
			case "Approval":
				return eventSchemas.Approval.create(indexedEvents);
			case "ApprovalForAll":
				return eventSchemas.ApprovalForAll.create(indexedEvents);
			case "NounCreated":
				return eventSchemas.NounCreated.create(indexedEvents);
			case "DescriptorLocked":
				return eventSchemas.DescriptorLocked.create(indexedEvents);
			case "DescriptorUpdated":
				return eventSchemas.DescriptorUpdated.create(indexedEvents);
			case "MinterLocked":
				return eventSchemas.MinterLocked.create(indexedEvents);
			case "MinterUpdated":
				return eventSchemas.MinterUpdated.create(indexedEvents);
			case "NounBurned":
				return eventSchemas.NounBurned.create(indexedEvents);
			case "NoundersDAOUpdated":
				return eventSchemas.NoundersDAOUpdated.create(indexedEvents);
			case "OwnershipTransferred":
				return eventSchemas.OwnershipTransferred.create(indexedEvents);
			case "SeederLocked":
				return eventSchemas.SeederLocked.create(indexedEvents);
			case "SeederUpdated":
				return eventSchemas.SeederUpdated.create(indexedEvents);

			// Nouns DAO Data
			case "AdminChanged":
				return eventSchemas.AdminChanged.create(indexedEvents);
			case "BeaconUpgraded":
				return eventSchemas.BeaconUpgraded.create(indexedEvents);
			case "CandidateFeedbackSent":
				return eventSchemas.CandidateFeedbackSent.create(indexedEvents);
			case "CreateCandidateCostSet":
				return eventSchemas.CreateCandidateCostSet.create(indexedEvents);
			case "ETHWithdrawn":
				return eventSchemas.ETHWithdrawn.create(indexedEvents);
			case "FeeRecipientSet":
				return eventSchemas.FeeRecipientSet.create(indexedEvents);
			case "FeedbackSent":
				return eventSchemas.FeedbackSent.create(indexedEvents);
			case "OwnershipTransferred":
				return eventSchemas.OwnershipTransferred.create(indexedEvents);
			case "ProposalCandidateCanceled":
				return eventSchemas.ProposalCandidateCanceled.create(indexedEvents);
			case "ProposalCandidateCreated":
				return eventSchemas.ProposalCandidateCreated.create(indexedEvents);
			case "ProposalCandidateUpdated":
				return eventSchemas.ProposalCandidateUpdated.create(indexedEvents);
			case "SignatureAdded":
				return eventSchemas.SignatureAdded.create(indexedEvents);
			case "UpdateCandidateCostSet":
				return eventSchemas.UpdateCandidateCostSet.create(indexedEvents);
			case "Upgraded":
				return eventSchemas.Upgraded.create(indexedEvents);

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
}
