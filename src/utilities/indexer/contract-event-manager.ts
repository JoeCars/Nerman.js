import { JsonRpcProvider, Contract } from "ethers-v6";
import { EventData } from "../../types";
import { BlockchainEventFetcher } from "./blockchain-event-fetcher";
import {
	NounsAuctionFormatter,
	NounsDaoDataFormatter,
	NounsDaoFormatter,
	NounsTokenFormatter
} from "./contract-event-formatter";
import { ContractEventFetchAndFormatter } from "./contract-fetch-and-formatter";
import {
	createNounsAuctionHouseV2Contract,
	createNounsDaoDataContract,
	createNounsDaoLogicV3Contract,
	createNounsDaoLogicV4Contract,
	createNounsTokenContract
} from "../contracts";

export interface ContractEventManager {
	fetchFormattedEvents: (eventName: string, startBlock: number, endBlock: number) => Promise<unknown>;
}

export class NounsDaoEventManager implements ContractEventManager {
	private v4fetchAndFormatter: ContractEventFetchAndFormatter;
	private v3EventFetcher: BlockchainEventFetcher;
	private v4EventFetcher: BlockchainEventFetcher;
	private eventFormatter: NounsDaoFormatter;
	private static readonly V3_START_BLOCK = 17_990_000;
	private static readonly V4_START_BLOCK = 19_810_422;
	private static readonly V1_SIGNATURE =
		"ProposalCreatedWithRequirements(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,string)";
	private static readonly V3_SIGNATURE =
		"ProposalCreatedWithRequirements(uint256,address,address[],address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,uint256,string)";
	private static readonly V4_SIGNATURE = "ProposalCreatedWithRequirements(uint256,address[],uint256,uint256,uint256,uint32)";

	constructor(
		v3EventFetcher: BlockchainEventFetcher,
		v4EventFetcher: BlockchainEventFetcher,
		eventFormatter: NounsDaoFormatter
	) {
		this.v3EventFetcher = v3EventFetcher;
		this.v4EventFetcher = v4EventFetcher;
		this.eventFormatter = eventFormatter;
		this.v4fetchAndFormatter = new ContractEventFetchAndFormatter(v4EventFetcher, eventFormatter);
	}

	public static create(provider: JsonRpcProvider) {
		const v3EventFetcher = new BlockchainEventFetcher(createNounsDaoLogicV3Contract(provider));
		const v4EventFetcher = new BlockchainEventFetcher(createNounsDaoLogicV4Contract(provider));
		const nounsDaoEventFormatter = new NounsDaoFormatter();
		return new NounsDaoEventManager(v3EventFetcher, v4EventFetcher, nounsDaoEventFormatter);
	}

	async fetchFormattedEvents(eventName: string, startBlock: number, endBlock: number) {
		switch (eventName) {
			case "DAOWithdrawNounsFromEscrow":
			case "ERC20TokensToIncludeInForkSet":
			case "EscrowedToFork":
			case "ExecuteFork":
			case "ForkDAODeployerSet":
			case "ForkPeriodSet":
			case "ForkThresholdSet":
			case "JoinFork":
			case "LastMinuteWindowSet":
			case "MaxQuorumVotesBPSSet":
			case "MinQuorumVotesBPSSet":
			case "NewAdmin":
			case "NewImplementation":
			case "NewPendingAdmin":
			case "NewPendingVetoer":
			case "NewVetoer":
			case "ObjectionPeriodDurationSet":
			case "ProposalCanceled":
			case "ProposalCreated":
			case "ProposalCreatedOnTimelockV1":
			case "ProposalDescriptionUpdated":
			case "ProposalExecuted":
			case "ProposalObjectionPeriodSet":
			case "ProposalQueued":
			case "ProposalThresholdBPSSet":
			case "ProposalTransactionsUpdated":
			case "ProposalUpdatablePeriodSet":
			case "ProposalUpdated":
			case "ProposalVetoed":
			case "QuorumCoefficientSet":
			case "QuorumVotesBPSSet":
			case "RefundableVote":
			case "SignatureCancelled":
			case "TimelocksAndAdminSet":
			case "VoteCast":
			case "VoteSnapshotBlockSwitchProposalIdSet":
			case "VotingDelaySet":
			case "VotingPeriodSet":
			case "Withdraw":
			case "WithdrawFromForkEscrow":
				return this.v4fetchAndFormatter.fetchAndFormatEvent(eventName, startBlock, endBlock);
			case "DAONounsSupplyIncreasedFromEscrow":
			case "VoteCastWithClientId":
				return this.v4fetchAndFormatter.fetchAndFormatEvent(
					eventName,
					Math.max(startBlock, NounsDaoEventManager.V4_START_BLOCK), // Optimization to save time when indexing from scratch.
					endBlock
				);
			case "ProposalCreatedWithRequirements":
				return this.fetchAndFormatProposalCreatedWithRequirements(startBlock, endBlock);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}

	private async fetchAndFormatProposalCreatedWithRequirements(startBlock: number, endBlock: number) {
		const proposalsV1 = await this.fetchAndFormatProposalCreatedWithRequirementsV1(startBlock, endBlock);
		const proposalsV3 = await this.fetchAndFormatProposalCreatedWithRequirementsV3(startBlock, endBlock);
		const proposalsV4 = await this.fetchAndFormatProposalCreatedWithRequirementsV4(startBlock, endBlock);
		const proposals = [...proposalsV1, ...proposalsV3, ...proposalsV4];
		return proposals;
	}

	private async fetchAndFormatProposalCreatedWithRequirementsV1(startBlock: number, endBlock: number) {
		if (startBlock >= NounsDaoEventManager.V3_START_BLOCK) {
			return [];
		}
		const actualEndBlock = Math.min(endBlock, NounsDaoEventManager.V3_START_BLOCK - 1);
		try {
			const events = await this.v3EventFetcher.fetchEvents(NounsDaoEventManager.V1_SIGNATURE, actualEndBlock, startBlock);
			const formattedEvents = events.map((event) =>
				this.eventFormatter.formatProposalCreatedWithRequirementsV1(event)
			) as EventData.ProposalCreatedWithRequirementsV1[];
			return formattedEvents;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	private async fetchAndFormatProposalCreatedWithRequirementsV3(startBlock: number, endBlock: number) {
		if (startBlock >= NounsDaoEventManager.V4_START_BLOCK) {
			return [];
		}
		const actualStartBlock = Math.max(startBlock, NounsDaoEventManager.V3_START_BLOCK);
		const actualEndBlock = Math.min(endBlock, NounsDaoEventManager.V4_START_BLOCK - 1);
		try {
			const events = await this.v3EventFetcher.fetchEvents(
				NounsDaoEventManager.V3_SIGNATURE,
				actualEndBlock,
				actualStartBlock
			);
			const formattedEvents = events.map((event) =>
				this.eventFormatter.formatProposalCreatedWithRequirementsV3(event)
			) as EventData.ProposalCreatedWithRequirementsV3[];
			return formattedEvents;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	private async fetchAndFormatProposalCreatedWithRequirementsV4(startBlock: number, endBlock: number) {
		const actualStartBlock = Math.max(startBlock, NounsDaoEventManager.V4_START_BLOCK);
		const actualEndBlock = endBlock;
		try {
			const events = await this.v4EventFetcher.fetchEvents(
				NounsDaoEventManager.V4_SIGNATURE,
				actualEndBlock,
				actualStartBlock
			);
			const formattedEvents = events.map((event) =>
				this.eventFormatter.formatProposalCreatedWithRequirements(event)
			) as EventData.ProposalCreatedWithRequirements[];
			return formattedEvents;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

export class NounsAuctionEventManager implements ContractEventManager {
	private fetcherAndFormatter: ContractEventFetchAndFormatter;
	private static readonly V2_START_BLOCK = 19_810_422;

	constructor(eventFetcher: BlockchainEventFetcher, eventFormatter: NounsAuctionFormatter) {
		this.fetcherAndFormatter = new ContractEventFetchAndFormatter(eventFetcher, eventFormatter);
	}

	public static create(provider: JsonRpcProvider) {
		const fetcher = new BlockchainEventFetcher(createNounsAuctionHouseV2Contract(provider));
		const formatter = new NounsAuctionFormatter();
		return new NounsAuctionEventManager(fetcher, formatter);
	}

	async fetchFormattedEvents(eventName: string, startBlock: number, endBlock: number) {
		switch (eventName) {
			case "AuctionBid":
			case "AuctionCreated":
			case "AuctionExtended":
			case "AuctionMinBidIncrementPercentageUpdated":
			case "AuctionReservePriceUpdated":
			case "AuctionSettled":
			case "AuctionTimeBufferUpdated":
			case "OwnershipTransferred":
			case "Paused":
			case "Unpaused":
				return this.fetcherAndFormatter.fetchAndFormatEvent(eventName, startBlock, endBlock);
			case "AuctionSettledWithClientId":
			case "AuctionBidWithClientId":
				return this.fetcherAndFormatter.fetchAndFormatEvent(
					eventName,
					Math.max(startBlock, NounsAuctionEventManager.V2_START_BLOCK), // Optimization to save time when indexing from scratch.
					endBlock
				);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}
}

export class NounsTokenEventManager implements ContractEventManager {
	private fetcherAndFormatter: ContractEventFetchAndFormatter;

	constructor(eventFetcher: BlockchainEventFetcher, eventFormatter: NounsTokenFormatter) {
		this.fetcherAndFormatter = new ContractEventFetchAndFormatter(eventFetcher, eventFormatter);
	}

	public static create(provider: JsonRpcProvider) {
		const fetcher = new BlockchainEventFetcher(createNounsTokenContract(provider));
		const formatter = new NounsTokenFormatter();
		return new NounsTokenEventManager(fetcher, formatter);
	}

	async fetchFormattedEvents(eventName: string, startBlock: number, endBlock: number) {
		switch (eventName) {
			case "DelegateChanged":
			case "DelegateVotesChanged":
			case "Transfer":
			case "Approval":
			case "ApprovalForAll":
			case "NounCreated":
			case "DescriptorLocked":
			case "DescriptorUpdated":
			case "MinterLocked":
			case "MinterUpdated":
			case "NounBurned":
			case "NoundersDAOUpdated":
			case "OwnershipTransferred":
			case "SeederLocked":
			case "SeederUpdated":
				return this.fetcherAndFormatter.fetchAndFormatEvent(eventName, startBlock, endBlock);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}
}

export class NounsDaoDataEventManager implements ContractEventManager {
	private fetcherAndFormatter: ContractEventFetchAndFormatter;

	constructor(eventFetcher: BlockchainEventFetcher, eventFormatter: NounsDaoDataFormatter) {
		this.fetcherAndFormatter = new ContractEventFetchAndFormatter(eventFetcher, eventFormatter);
	}

	public static create(provider: JsonRpcProvider) {
		const fetcher = new BlockchainEventFetcher(createNounsDaoDataContract(provider));
		const formatter = new NounsDaoDataFormatter();
		return new NounsDaoDataEventManager(fetcher, formatter);
	}

	async fetchFormattedEvents(eventName: string, startBlock: number, endBlock: number) {
		switch (eventName) {
			case "AdminChanged":
			case "BeaconUpgraded":
			case "CandidateFeedbackSent":
			case "CreateCandidateCostSet":
			case "ETHWithdrawn":
			case "FeeRecipientSet":
			case "FeedbackSent":
			case "OwnershipTransferred":
			case "ProposalCandidateCanceled":
			case "ProposalCandidateCreated":
			case "ProposalCandidateUpdated":
			case "SignatureAdded":
			case "UpdateCandidateCostSet":
			case "Upgraded":
				return this.fetcherAndFormatter.fetchAndFormatEvent(eventName, startBlock, endBlock);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}
}
