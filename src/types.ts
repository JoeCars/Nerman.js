import { ethers, BigNumber } from "ethers";

//=========================================
// Configuration Options
//=========================================

/** Configuration options for the Nouns class. */
export interface NounsOptions {
	/** The polling time in milliseconds. */
	pollingTime?: number;
}

//=========================================
// General Types
//=========================================

/** An Ethereum account. */
export interface Account {
	/** The address id. */
	id: string;
}

/** Seed object for Nouns tokens. */
export interface NounsTokenSeed {
	/** 0 to 1. Cool or warm. */
	background: number;
	/** 0 to 29 */
	body: number;
	/** 0 to 136 */
	accessory: number;
	/** 0 to 233 */
	head: number;
	/** 0 to 20 */
	glasses: number;
}

/**
 * Vote options and their associated numbers.
 * @example
 * AGAINST = 0;
 * FOR = 1;
 * ABSTAIN = 2;
 */
export enum VoteDirection {
	AGAINST = 0,
	FOR = 1,
	ABSTAIN = 2
}

/** Possible proposal states.
 * @type {string}
 * @example
 * "ACTIVE" | "CANCELLED" | "EXECUTED" | "PENDING" | "QUEUED" | "VETOED"
 */
export type ProposalStatus =
	| typeof STATUS_ACTIVE
	| typeof STATUS_CANCELLED
	| typeof STATUS_EXECUTED
	| typeof STATUS_PENDING
	| typeof STATUS_QUEUED
	| typeof STATUS_VETOED;

import { STATUS_ACTIVE, STATUS_QUEUED, STATUS_PENDING, STATUS_EXECUTED, STATUS_CANCELLED, STATUS_VETOED } from "./constants";

/** Event data types for contract listeners. */
export namespace EventData {
	// ******************************************
	//
	// Contract - NounsDAO
	//
	// ******************************************

	/** DAOWithdrawNounsFromEscrow event data. */
	export interface DAOWithdrawNounsFromEscrow {
		/** List of tokens being withdrawn. */
		tokenIds: number[];
		/** Address withdrawing the tokens. */
		to: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ERC20TokensToIncludeInForkSet event data. */
	export interface ERC20TokensToIncludeInForkSet {
		/** ??? */
		oldErc20Tokens: string[];
		/** ??? */
		newErc20tokens: string[];
		/** Event meta data. */
		event: ethers.Event;
	}

	/** EscrowedToFork event data. */
	export interface EscrowedToFork {
		/** Fork number. */
		forkId: number;
		/** Token owner who is escrowing to fork. */
		owner: Account;
		/** List of tokens being escrowed. */
		tokenIds: number[];
		/** Owner's currently active proposals being transferred to the fork. */
		proposalIds: number[];
		/** Optional reason. */
		reason: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ExecuteFork event data. */
	export interface ExecuteFork {
		/** Fork number. */
		forkId: number;
		/** Fork treasury account. */
		forkTreasury: Account;
		/** Fork token account. */
		forkToken: Account;
		/** ??? */
		forkEndTimestamp: number;
		/** Tokens in escrow at the moment of the escrow. These are lost from the main treasury. */
		tokensInEscrow: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ForkDAODeployerSet event data. */
	export interface ForkDAODeployerSet {
		/** ??? */
		oldForkDAODeployer: Account;
		/** ??? */
		newForkDAODeployer: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ForkDAODeployerSet event data. */
	export interface ForkPeriodSet {
		/** ??? */
		oldForkPeriod: number;
		/** ??? */
		newForkPeriod: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ForkThresholdSet event data. */
	export interface ForkThresholdSet {
		/** The old token amount needed to successfully fork the DAO. A percentage of the token supply. */
		oldForkThreshold: number;
		/** The new token amount needed to successfully fork the DAO. A percentage of the token supply. */
		newForkThreshold: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** JoinFork event data.
	 * Triggers after the fork is executed, but still has a chance to rejoin the main fork.
	 */
	export interface JoinFork {
		/** Fork number. */
		forkId: number;
		/** Token owner who is escrowing to fork. */
		owner: Account;
		/** List of tokens being escrowed. */
		tokenIds: number[];
		/** Owner's currently active proposals being transferred to the fork. */
		proposalIds: number[];
		/** Optional reason. */
		reason: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** LastMinuteWindowSet event data. */
	export interface LastMinuteWindowSet {
		/** ??? */
		oldLastMinuteWindowInBlocks: number;
		/** ??? */
		newLastMinuteWindowInBlocks: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** MaxQuorumVotesBPSSet event data. */
	export interface MaxQuorumVotesBPSSet {
		/** ??? */
		oldMaxQuorumVotesBPS: number;
		/** ??? */
		newMaxQuorumVotesBPS: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** MinQuorumVotesBPSSet event data. */
	export interface MinQuorumVotesBPSSet {
		/** ??? */
		oldMinQuorumVotesBPS: number;
		/** ??? */
		newMinQuorumVotesBPS: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewAdmin event data. */
	export interface NewAdmin {
		/** ??? */
		oldAdmin: Account;
		/** ??? */
		newAdmin: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewImplementation event data. */
	export interface NewImplementation {
		/** ??? */
		oldImplementation: Account;
		/** ??? */
		newImplementation: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewPendingAdmin event data. */
	export interface NewPendingAdmin {
		/** ??? */
		oldPendingAdmin: Account;
		/** ??? */
		newPendingAdmin: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewPendingVetoer event data. */
	export interface NewPendingVetoer {
		/** ??? */
		oldPendingVetoer: Account;
		/** ??? */
		newPendingVetoer: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewVetoer event data. */
	export interface NewVetoer {
		/** ??? */
		oldVetoer: Account;
		/** ??? */
		newVetoer: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ObjectionPeriodDurationSet event data. */
	export interface ObjectionPeriodDurationSet {
		/** ??? */
		oldObjectionPeriodDurationInBlocks: number;
		/** ??? */
		newObjectionPeriodDurationInBlocks: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCanceled event data. */
	export interface ProposalCanceled {
		/** id of the proposal being cancelled. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCreated event data. */
	export interface ProposalCreated {
		/** id of the proposal being created. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** ??? */
		targets: string[];
		/** ??? */
		values: BigNumber[];
		/** ??? */
		signatures: string[];
		/** ??? */
		calldatas: any[]; // type is bytes[]
		/** The block voting starts. */
		startBlock: number;
		/** The block voting ends. */
		endBlock: number;
		/**
		 * Proposal description.
		 * @example
		 * `
		 * # Proposal Title \n
		 * Proposal details go here.
		 * `
		 */
		description: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCreatedOnTimelockV1 event data. */
	export interface ProposalCreatedOnTimelockV1 {
		/** id of the proposal created. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCreatedWithRequirements event data. */
	export interface ProposalCreatedWithRequirements {
		/** id of the proposal created. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** ??? - Only in V3 contract. */
		signers?: string[];
		/** ??? */
		targets: string[];
		/** ??? */
		values: BigNumber[];
		/** ??? */
		signatures: string[];
		/** ??? */
		calldatas: any[];
		/** The block voting starts. */
		startBlock: number;
		/** The block voting ends. */
		endBlock: number;
		/** ??? - Only in V3 contract. */
		updatePeriodEndBlock?: number;
		/** ??? */
		proposalThreshold: number;
		/** ??? */
		quorumVotes: number;
		/**
		 * Proposal description.
		 * @example
		 * `
		 * # Proposal Title \n
		 * Proposal details go here.
		 * `
		 */
		description: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalDescriptionUpdated event data. */
	export interface ProposalDescriptionUpdated {
		/** id of the proposal updated. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** Proposal description. */
		description: string;
		/** Updated proposal description. */
		updatedMessage: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalExecuted event data. */
	export interface ProposalExecuted {
		/** id of the proposal executed. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalObjectionPeriodSet event data. */
	export interface ProposalObjectionPeriodSet {
		/** id of the proposal. */
		id: number;
		/** ??? */
		objectionPeriodEndBlock: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalQueued event data.
	 * The proposal has enough For votes to pass, and has entered a queued stage to be executed.
	 */
	export interface ProposalQueued {
		/** id of the proposal. */
		id: number;
		/** Block number signifying end of the queued period. */
		eta: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalThresholdBPSSet event data. */
	export interface ProposalThresholdBPSSet {
		/** ??? */
		oldProposalThresholdBPS: number;
		/** ??? */
		newProposalThresholdBPS: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalTransactionsUpdated event data. */
	export interface ProposalTransactionsUpdated {
		/** id of the proposal. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** ??? */
		targets: string[];
		/** ??? */
		values: number[];
		/** ??? */
		signatures: string[];
		/** ??? */
		calldatas: any[];
		/** ??? */
		updateMessage: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalUpdatablePeriodSet event data. */
	export interface ProposalUpdatablePeriodSet {
		/** The old contract constant. */
		oldProposalUpdatablePeriodInBlocks: number;
		/** The new contract constant. */
		newProposalUpdatablePeriodInBlocks: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalUpdated event data. */
	export interface ProposalUpdated {
		/** id of the proposal. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** ??? */
		targets: string[];
		/** ??? */
		values: number[];
		/** ??? */
		signatures: string[];
		/** ??? */
		calldatas: any[];
		/** Proposal description. */
		description: string;
		/** New proposal description. */
		updateMessage: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalVetoed event data. */
	export interface ProposalVetoed {
		/** id of the proposal. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Quit event data. */
	export interface Quit {
		/** The account quitting the Nouns DAO. */
		msgSender: Account;
		/** The tokens returned in exchange for eth. */
		tokenIds: number[];
		/** Event meta data. */
		event: ethers.Event;
	}

	/** QuorumCoefficientSet event data. */
	export interface QuorumCoefficientSet {
		/** The old contract constant. */
		oldQuorumCoefficient: number;
		/** The new contract constant. */
		newQuorumCoefficient: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** QuorumVotesBPSSet event data. */
	export interface QuorumVotesBPSSet {
		/** The old contract constant. */
		oldQuorumVotesBPS: number;
		/** The new contract constant. */
		newQuorumVotesBPS: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** RefundableVote event data. */
	export interface RefundableVote {
		/** The voter account. */
		voter: Account;
		/** The refund amount. */
		refundAmount: number;
		/** Whether the refund was sent or not. */
		refundSent: boolean;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** SignatureCancelled event data. */
	export interface SignatureCancelled {
		/** The account cancelling the signature. */
		signer: Account;
		/** ??? */
		sig: any;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** TimelocksAndAdminSet event data. */
	export interface TimelocksAndAdminSet {
		/** ??? */
		timelock: Account;
		/** ??? */
		timelockV1: Account;
		/** ??? */
		admin: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** VoteCast event data. */
	export interface VoteCast {
		/** The voter account. */
		voter: Account;
		/** The proposal voted on. */
		proposalId: number;
		/** The side they are voting for. */
		supportDetailed: VoteDirection;
		/** The number of votes they are using. */
		votes: number;
		/** An optional reason explaining their decision. */
		reason: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** VoteSnapshotBlockSwitchProposalIdSet event data. */
	export interface VoteSnapshotBlockSwitchProposalIdSet {
		/** ??? */
		oldVoteSnapshotBlockSwitchProposalId: number;
		/** ??? */
		newVoteSnapshotBlockSwitchProposalId: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** VotingDelaySet event data. */
	export interface VotingDelaySet {
		/** The old contract constant. */
		oldVotingDelay: number;
		/** The new contract constant. */
		newVotingDelay: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** VotingPeriodSet event data. */
	export interface VotingPeriodSet {
		/** The old contract constant. */
		oldVotingPeriod: number;
		/** The new contract constant. */
		newVotingPeriod: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Withdraw event data. */
	export interface Withdraw {
		/** ??? */
		amount: number;
		/** ??? */
		sent: boolean;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** WithdrawFromForkEscrow event data. */
	export interface WithdrawFromForkEscrow {
		/** The fork escrow withdrawing from. */
		forkId: number;
		/** The account withdrawing. */
		owner: Account;
		/** The tokens withdrawing. */
		tokenIds: number[];
		/** Event meta data. */
		event: ethers.Event;
	}

	// ******************************************
	//
	// Contract - NounsAuctionHouse
	//
	// ******************************************

	// CUSTOM TYPES
	export interface AuctionComplete {
		id: number;
		endTime: number;
		// should add block
	}

	// EventData types from ABI

	export interface AuctionCreated {
		id: number;
		startTime: number;
		endTime: number;
		event: ethers.Event;
	}

	export interface AuctionBid {
		id: number;
		amount: number;
		bidder: Account;
		extended: boolean;
		event: ethers.Event;
	}

	export interface AuctionCreated {
		id: number;
		startTime: number;
		endTime: number;
		event: ethers.Event;
	}

	export interface AuctionExtended {
		id: number;
		endTime: number;
		event: ethers.Event;
	}

	export interface AuctionSettled {
		id: number;
		winner: Account;
		amount: number;
		event: ethers.Event;
	}

	export interface AuctionTimeBufferUpdated {
		timeBuffer: number;
		event: ethers.Event;
	}

	export interface AuctionReservePriceUpdated {
		reservePrice: number;
		event: ethers.Event;
	}

	export interface AuctionMinBidIncrementPercentageUpdated {
		minBidIncrementPercentage: number;
		event: ethers.Event;
	}

	export interface OwnershipTransferred {
		previousOwner: Account;
		newOwner: Account;
		event: ethers.Event;
	}

	export interface Paused {
		address: Account;
		event: ethers.Event;
	}

	export interface Unpaused {
		address: Account;
		event: ethers.Event;
	}

	// ******************************************
	//
	// Contract - NounsToken
	//
	// ******************************************
	// EventData types

	export interface DelegateChanged {
		delegator: Account;
		fromDelegate: Account;
		toDelegate: Account;
		event: ethers.Event;
	}

	export interface DelegateVotesChanged {
		delegate: Account;
		previousBalance: number;
		newBalance: number;
		event: ethers.Event;
	}

	export interface Transfer {
		from: Account;
		to: Account;
		tokenId: number;
		event: ethers.Event;
	}

	export interface Approval {
		owner: Account;
		approved: Account;
		tokenId: number;
		event: ethers.Event;
	}

	export interface ApprovalForAll {
		owner: Account;
		operator: Account;
		approved: boolean;
		event: ethers.Event;
	}

	export interface DescriptorLocked {
		event: ethers.Event;
	}

	export interface DescriptorUpdated {
		descriptor: Account;
		event: ethers.Event;
	}

	export interface MinterLocked {
		event: ethers.Event;
	}

	export interface MinterUpdated {
		minter: Account;
		event: ethers.Event;
	}

	export interface NounBurned {
		id: number;
		event: ethers.Event;
	}

	export interface NounCreated {
		id: number;
		seed: NounsTokenSeed;
		event: ethers.Event;
	}

	export interface NoundersDAOUpdated {
		noundersDAO: Account;
		event: ethers.Event;
	}

	export interface OwnershipTransferred {
		previousOwner: Account;
		newOwner: Account;
		event: ethers.Event;
	}

	export interface SeederLocked {
		event: ethers.Event;
	}

	export interface SeederUpdated {
		event: ethers.Event;
		seeder: Account;
	}

	// ******************************************
	//
	// Contract - NounsDAOData
	//
	// ******************************************

	export interface AdminChanged {
		previousAdmin: Account;
		newAdmin: Account;
		event: ethers.Event;
	}

	export interface BeaconUpgraded {
		beacon: Account;
		event: ethers.Event;
	}

	export interface CandidateFeedbackSent {
		msgSender: Account;
		proposer: Account;
		slug: string;
		support: number;
		reason: string;
		event: ethers.Event;
	}

	export interface CreateCandidateCostSet {
		oldCreateCandidateCost: number;
		newCreateCandidateCost: number;
		event: ethers.Event;
	}

	export interface ETHWithdrawn {
		to: Account;
		amount: number;
		event: ethers.Event;
	}

	export interface FeeRecipientSet {
		oldFeeRecipient: Account;
		newFeeRecipient: Account;
		event: ethers.Event;
	}

	export interface FeedbackSent {
		msgSender: Account;
		proposalId: number;
		support: number;
		reason: string;
		event: ethers.Event;
	}

	export interface OwnershipTransferred {
		previousOwner: Account;
		newOwner: Account;
		event: ethers.Event;
	}

	export interface ProposalCandidateCanceled {
		msgSender: Account;
		slug: string;
		event: ethers.Event;
	}

	export interface ProposalCandidateCreated {
		msgSender: Account;
		targets: string[];
		values: number[];
		signatures: string[];
		calldatas: any[];
		description: string;
		slug: string;
		proposalIdToUpdate: number;
		encodedProposalHash: string;
		event: ethers.Event;
	}

	export interface ProposalCandidateUpdated {
		msgSender: Account;
		targets: string[];
		values: number[];
		signatures: string[];
		calldatas: any[];
		description: string;
		slug: string;
		proposalIdToUpdate: number;
		encodedProposalHash: string;
		reason: string;
		event: ethers.Event;
	}

	export interface SignatureAdded {
		signer: Account;
		sig: string;
		expirationTimestamp: number;
		proposer: Account;
		slug: string;
		proposalIdToUpdate: number;
		encodedPropHash: string;
		sigDigest: string;
		reason: string;
		event: ethers.Event;
	}

	export interface UpdateCandidateCostSet {
		oldUpdateCandidateCost: number;
		newUpdateCandidateCost: number;
		event: ethers.Event;
	}

	export interface Upgraded {
		implementation: Account;
		event: ethers.Event;
	}

	// ******************************************
	//
	// NounsNymz
	//
	// ******************************************

	export namespace NounsNymz {
		export interface NewPost {
			id: string;
			title: string;
			body: string;
			timestamp: string;
			userId: string;
			parentId?: string;
			depth: number;
			upvotes: Upvote[];
			root?: RootPost;
			parent?: ParentPost;
			_count: {
				descendants: number;
			};
		}

		export interface RootPost {
			id: string;
			title: string;
			body: string;
			timestamp: string;
			userId: string;
			parentId?: string;
			depth: number;
			upvotes: Upvote[];
			_count: {
				descendants: number;
			};
		}

		export interface ParentPost {
			id: string;
			title: string;
			body: string;
			timestamp: string;
			userId: string;
			parentId?: string;
			depth: number;
			upvotes: Upvote[];
		}

		export interface Upvote {
			id: string;
			address: string;
			timestamp: string;
		}

		export interface User {
			userId: string;
			numPosts: number;
			numReplies: number;
			totalPosts: number;
			doxed: boolean;
			name: string;
			lastActive: string;
			upvotes: number;
		}
	}

	// ******************************************
	//
	// Federation
	//
	// ******************************************
	export namespace Federation {
		export namespace GovPool {
			export interface BidPlaced {
				dao: string;
				propId: number;
				support: number;
				amount: number;
				bidder: string;
				reason?: string;
			}

			export interface VoteCast {
				dao: string;
				propId: number;
				support: number;
				amount: number;
				bidder: string;
			}
		}
	}

	// ******************************************
	//
	// Propdates
	//
	// ******************************************
	export namespace Propdates {
		export interface PostUpdate {
			propId: number;
			isCompleted: boolean;
			update: string;
			event: ethers.Event;
		}

		export interface PropUpdateAdminTransferStarted {
			propId: number;
			oldAdmin: Account;
			newAdmin: Account;
			event: ethers.Event;
		}

		export interface PropUpdateAdminTransfered {
			propId: number;
			oldAdmin: Account;
			newAdmin: Account;
			event: ethers.Event;
		}
	}

	// ******************************************
	//
	// LilNouns
	//
	// ******************************************
	export namespace LilNouns {
		export interface LilNoundersDAOUpdated {
			lilnoundersDAO: Account;
			event: ethers.Event;
		}

		export interface NounsDAOUpdated {
			nounsDAO: Account;
			event: ethers.Event;
		}
	}
}

//=========================================
// Index Types
//=========================================

/** Types related to the indexer. Including events and queries. */
export namespace Indexer {
	/** Basic event details. */
	export interface FormattedEvent {
		blockNumber: number;
		blockHash: string;
		transactionIndex: number;
		address: string;
		transactionHash: string;
		eventName: string;
		eventSignature: string;
	}

	/** NounsDAO Indexer types. */
	export namespace NounsDAO {
		export interface DAOWithdrawNounsFromEscrow extends FormattedEvent {
			tokenIds: number[];
			to: string;
		}

		export interface ERC20TokensToIncludeInForkSet extends FormattedEvent {
			oldErc20Tokens: string[];
			newErc20tokens: string[];
		}

		export interface EscrowedToFork extends FormattedEvent {
			forkId: number;
			owner: string;
			tokenIds: number[];
			proposalIds: number[];
			reason: string;
		}

		export interface ExecuteFork extends FormattedEvent {
			forkId: number;
			forkTreasury: string;
			forkToken: string;
			forkEndTimestamp: number;
			tokensInEscrow: number;
		}

		export interface ForkDAODeployerSet extends FormattedEvent {
			oldForkDAODeployer: string;
			newForkDAODeployer: string;
		}

		export interface ForkPeriodSet extends FormattedEvent {
			oldForkPeriod: number;
			newForkPeriod: number;
		}

		export interface ForkThresholdSet extends FormattedEvent {
			oldForkThreshold: number;
			newForkThreshold: number;
		}

		export interface JoinFork extends FormattedEvent {
			forkId: number;
			owner: string;
			tokenIds: number[];
			proposalIds: number[];
			reason: string;
		}

		export interface LastMinuteWindowSet extends FormattedEvent {
			oldLastMinuteWindowInBlocks: number;
			newLastMinuteWindowInBlocks: number;
		}

		export interface MaxQuorumVotesBPSSet extends FormattedEvent {
			oldMaxQuorumVotesBPS: number;
			newMaxQuorumVotesBPS: number;
		}

		export interface MinQuorumVotesBPSSet extends FormattedEvent {
			oldMinQuorumVotesBPS: number;
			newMinQuorumVotesBPS: number;
		}

		export interface NewAdmin extends FormattedEvent {
			oldAdmin: string;
			newAdmin: string;
		}

		export interface NewImplementation extends FormattedEvent {
			oldImplementation: string;
			newImplementation: string;
		}

		export interface NewPendingAdmin extends FormattedEvent {
			oldPendingAdmin: string;
			newPendingAdmin: string;
		}

		export interface NewPendingVetoer extends FormattedEvent {
			oldPendingVetoer: string;
			newPendingVetoer: string;
		}

		export interface NewVetoer extends FormattedEvent {
			oldVetoer: string;
			newVetoer: string;
		}

		export interface ObjectionPeriodDurationSet extends FormattedEvent {
			oldObjectionPeriodDurationInBlocks: number;
			newObjectionPeriodDurationInBlocks: number;
		}

		export interface ProposalCanceled extends FormattedEvent {
			proposalId: number;
			status: string;
		}

		export interface ProposalCreated extends FormattedEvent {
			id: number;
			proposer: string;
			targets: string[];
			// values: BigNumber[]; Values is a function, not a variable.
			signatures: string[];
			calldatas: any[];
			startBlock: number;
			endBlock: number;
			description: string;
		}

		export interface ProposalCreatedOnTimelockV1 extends FormattedEvent {
			id: number;
		}

		export interface ProposalCreatedWithRequirements extends ProposalCreated {
			signers: string[];
			updatePeriodEndBlock: number;
			proposalThreshold: number;
			quorumVotes: number;
		}

		export interface ProposalDescriptionUpdated extends FormattedEvent {
			id: number;
			proposer: string;
			description: string;
			updatedMessage: string;
		}

		export interface ProposalExecuted extends FormattedEvent {
			proposalId: number;
			status: string;
		}

		export interface ProposalObjectionPeriodSet extends FormattedEvent {
			proposalId: number;
			objectionPeriodEndBlock: number;
		}

		export interface ProposalQueued extends FormattedEvent {
			proposalId: number;
			eta: number;
			status: string;
		}

		export interface ProposalThresholdBPSSet extends FormattedEvent {
			oldProposalThresholdBPS: number;
			newProposalThresholdBPS: number;
		}

		export interface ProposalTransactionsUpdated extends FormattedEvent {
			id: number;
			proposer: string;
			targets: string[];
			values: number[];
			signatures: string[];
			calldatas: any[];
			updateMessage: string;
		}

		export interface ProposalUpdatablePeriodSet extends FormattedEvent {
			oldProposalUpdatablePeriodInBlocks: number;
			newProposalUpdatablePeriodInBlocks: number;
		}

		export interface ProposalUpdated extends FormattedEvent {
			id: number;
			proposer: string;
			targets: string[];
			values: number[];
			signatures: string[];
			calldatas: any[];
			description: string;
			updateMessage: string;
		}

		export interface ProposalVetoed extends FormattedEvent {
			proposalId: number;
			status: string;
		}

		export interface QuorumCoefficientSet extends FormattedEvent {
			oldQuorumCoefficient: number;
			newQuorumCoefficient: number;
		}

		export interface QuorumVotesBPSSet extends FormattedEvent {
			oldQuorumVotesBPS: number;
			newQuorumVotesBPS: number;
		}

		export interface RefundableVote extends FormattedEvent {
			voter: string;
			refundAmount: number;
			refundSent: boolean;
		}

		export interface SignatureCancelled extends FormattedEvent {
			signer: string;
			sig: any;
		}

		export interface TimelocksAndAdminSet extends FormattedEvent {
			timelock: string;
			timelockV1: string;
			admin: string;
		}

		export interface VoteCast extends FormattedEvent {
			voterAddress: string;
			proposalId: number;
			support: number;
			supportChoice: string;
			votes: number;
			reason: string;
		}

		export interface VoteSnapshotBlockSwitchProposalIdSet extends FormattedEvent {
			oldVoteSnapshotBlockSwitchProposalId: number;
			newVoteSnapshotBlockSwitchProposalId: number;
		}

		export interface VotingDelaySet extends FormattedEvent {
			oldVotingDelay: number;
			newVotingDelay: number;
		}

		export interface VotingPeriodSet extends FormattedEvent {
			oldVotingPeriod: number;
			newVotingPeriod: number;
		}

		export interface Withdraw extends FormattedEvent {
			amount: number;
			sent: boolean;
		}

		export interface WithdrawFromForkEscrow extends FormattedEvent {
			forkId: number;
			owner: string;
			tokenIds: number[];
		}

		// Queries.

		export interface DAOWithdrawNounsFromEscrowQuery {
			startBlock?: number;
			endBlock?: number;
			tokenId?: number;
			to?: string;
		}

		export interface ERC20TokensToIncludeInForkSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface EscrowedToForkQuery {
			startBlock?: number;
			endBlock?: number;
			forkId?: number;
			owner?: string;
			tokenId?: number;
			proposalId?: number;
		}

		export interface ExecuteForkQuery {
			startBlock?: number;
			endBlock?: number;
			startId?: number;
			endId?: number;
			id?: number;
		}

		export interface ForkDAODeployerSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface ForkPeriodSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface ForkThresholdSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface JoinForkQuery {
			startBlock?: number;
			endBlock?: number;
			forkId?: number;
			owner?: string;
			tokenId?: number;
			proposalId?: number;
		}

		export interface LastMinuteWindowSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface MaxQuorumVotesBPSSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface MinQuorumVotesBPSSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface NewAdminQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface NewImplementationQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface NewPendingAdminQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface NewPendingVetoerQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface NewVetoerQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface ObjectionPeriodDurationSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface ProposalCanceledQuery {
			startBlock?: number;
			endBlock?: number;
			proposalId?: number;
		}

		export interface ProposalQuery {
			startBlock?: number;
			endBlock?: number;
			startId?: number;
			endId?: number;
			id?: number;
			status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
			proposer?: string;
		}

		export interface ProposalCreatedOnTimelockV1Query {
			startBlock?: number;
			endBlock?: number;
		}

		export interface ProposalCreatedWithRequirementsQuery {
			startBlock?: number;
			endBlock?: number;
			startId?: number;
			endId?: number;
			id?: number;
			status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
			proposer?: string;
		}

		export interface ProposalDescriptionUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
			proposer?: string;
		}

		export interface ProposalExecutedQuery {
			startBlock?: number;
			endBlock?: number;
			proposalId?: number;
		}

		export interface ProposalObjectionPeriodSetQuery {
			startBlock?: number;
			endBlock?: number;
			proposalId?: number;
		}

		export interface ProposalQueuedQuery {
			startBlock?: number;
			endBlock?: number;
			proposalId?: number;
		}

		export interface ProposalThresholdBPSSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface ProposalTransactionsUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
			id?: number;
			proposer?: string;
		}

		export interface ProposalUpdatablePeriodSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface ProposalUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
			id?: number;
			proposer?: string;
		}

		export interface ProposalVetoedQuery {
			startBlock?: number;
			endBlock?: number;
			proposalId?: number;
		}

		export interface QuorumCoefficientSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface QuorumVotesBPSSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface RefundableVoteQuery {
			startBlock?: number;
			endBlock?: number;
			voter?: string;
		}

		export interface SignatureCancelledQuery {
			startBlock?: number;
			endBlock?: number;
			signer?: string;
		}

		export interface TimelocksAndAdminSetQuery {
			startBlock?: number;
			endBlock?: number;
			admin?: string;
		}

		export interface StatusChangeQuery {
			startBlock?: number;
			endBlock?: number;
			proposalId?: number;
			status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
		}

		export interface VoteCastQuery {
			startBlock?: number;
			endBlock?: number;
			voter?: string;
			proposalId?: number;
			support?: "AGAINST" | "FOR" | "ABSTAIN";
		}

		export interface VoteSnapshotBlockSwitchProposalIdSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface VotingDelaySetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface VotingPeriodSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface WithdrawQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface WithdrawFromForkEscrowQuery {
			startBlock?: number;
			endBlock?: number;
			forkId?: number;
			owner?: string;
			tokenId?: number;
		}
	}

	export namespace NounsAuctionHouse {
		export interface AuctionCreated extends FormattedEvent {
			nounId: number;
			startTime: number;
			endTime: number;
		}

		export interface AuctionBid extends FormattedEvent {
			nounId: number;
			bidderAddress: string;
			bidAmount: number;
			extended: boolean;
		}

		export interface AuctionExtended extends FormattedEvent {
			nounId: number;
			endTime: number;
		}

		export interface AuctionSettled extends FormattedEvent {
			nounId: number;
			winnerAddress: string;
			bidAmount: number;
		}

		export interface AuctionTimeBufferUpdated extends FormattedEvent {
			timeBuffer: number;
		}

		export interface AuctionReservePriceUpdated extends FormattedEvent {
			reservePrice: number;
		}

		export interface AuctionMinBidIncrementPercentageUpdated extends FormattedEvent {
			minBidIncrementPercentage: number;
		}

		export interface OwnershipTransferred extends FormattedEvent {
			previousOwner: string;
			newOwner: string;
		}

		export interface Paused extends FormattedEvent {
			pauseAddress: string;
		}

		export interface Unpaused extends FormattedEvent {
			unpauseAddress: string;
		}

		// Queries.

		export interface AuctionCreatedQuery {
			startBlock?: number;
			endBlock?: number;
			nounId?: number;
		}

		export interface AuctionBidQuery {
			startBlock?: number;
			endBlock?: number;
			nounId?: number;
			bidder?: string;
			minBidAmount?: number;
			maxBidAmount?: number;
		}

		export interface AuctionExtendedQuery {
			startBlock?: number;
			endBlock?: number;
			nounId?: number;
		}

		export interface AuctionSettledQuery {
			startBlock?: number;
			endBlock?: number;
			nounId?: number;
			winner?: string;
			minBidAmount?: number;
			maxBidAmount?: number;
		}

		export interface AuctionTimeBufferUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface AuctionReservePriceUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface AuctionMinBidIncrementPercentageUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface OwnershipTransferredQuery {
			startBlock?: number;
			endBlock?: number;
			previousOwner?: string;
			newOwner?: string;
			including?: string;
		}

		export interface PausedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface UnpausedQuery {
			startBlock?: number;
			endBlock?: number;
		}
	}

	export namespace NounsToken {
		export interface DelegateChanged extends FormattedEvent {
			delegator: string;
			fromDelegate: string;
			toDelegate: string;
		}

		export interface DelegateVotesChanged extends FormattedEvent {
			delegate: string;
			previousBalance: number;
			newBalance: number;
		}

		export interface Transfer extends FormattedEvent {
			from: string;
			to: string;
			tokenId: number;
		}

		export interface Approval extends FormattedEvent {
			owner: string;
			approved: string;
			tokenId: number;
		}

		export interface ApprovalForAll extends FormattedEvent {
			owner: string;
			operator: string;
			approved: boolean;
		}

		export interface NounCreated extends FormattedEvent {
			tokenId: number;
			seed: NounsTokenSeed;
		}

		export interface DescriptorLocked extends FormattedEvent {}

		export interface DescriptorUpdated extends FormattedEvent {
			descriptor: string;
		}

		export interface MinterLocked extends FormattedEvent {}

		export interface MinterUpdated extends FormattedEvent {
			minter: string;
		}

		export interface NounBurned extends FormattedEvent {
			nounId: number;
		}

		export interface NoundersDAOUpdated extends FormattedEvent {
			noundersDAO: string;
		}

		export interface OwnershipTransferred extends FormattedEvent {
			previousOwner: string;
			newOwner: string;
		}

		export interface SeederLocked extends FormattedEvent {}

		export interface SeederUpdated extends FormattedEvent {
			seeder: string;
		}

		// Queries.

		export interface DelegateChangedQuery {
			startBlock?: number;
			endBlock?: number;
			delegator?: string;
			fromDelegate?: string;
			toDelegate?: string;
			involving?: string;
		}

		export interface DelegateVotesChangedQuery {
			startBlock?: number;
			endBlock?: number;
			delegate?: string;
		}

		export interface TransferQuery {
			startBlock?: number;
			endBlock?: number;
			from?: string;
			to?: string;
			involved?: string;
			tokenId?: number;
		}

		export interface ApprovalQuery {
			startBlock?: number;
			endBlock?: number;
			owner?: string;
			tokenId?: number;
		}

		export interface ApprovalForAllQuery {
			startBlock?: number;
			endBlock?: number;
			owner?: string;
		}

		export interface NounCreatedQuery {
			startBlock?: number;
			endBlock?: number;
			tokenId?: number;
			background?: number;
			body?: number;
			accessory?: number;
			head?: number;
			glasses?: number;
		}

		export interface DescriptorLockedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface DescriptorUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface MinterLockedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface MinterUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface NounBurnedQuery {
			startBlock?: number;
			endBlock?: number;
			nounId?: number;
		}

		export interface NoundersDAOUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface OwnershipTransferredQuery {
			startBlock?: number;
			endBlock?: number;
			previousOwner?: string;
			newOwner?: string;
			including?: string;
		}

		export interface SeederLockedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface SeederUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
		}
	}

	export namespace NounsDAOData {
		export interface AdminChanged extends FormattedEvent {
			previousAdmin: string;
			newAdmin: string;
		}

		export interface BeaconUpgraded extends FormattedEvent {
			beacon: string;
		}

		export interface CandidateFeedbackSent extends FormattedEvent {
			msgSender: string;
			proposer: string;
			slug: string;
			support: number;
			supportChoice: string;
			reason: string;
		}

		export interface CreateCandidateCostSet extends FormattedEvent {
			oldCreateCandidateCost: number;
			newCreateCandidateCost: number;
		}

		export interface ETHWithdrawn extends FormattedEvent {
			to: string;
			amount: number;
		}

		export interface FeeRecipientSet extends FormattedEvent {
			oldFeeRecipient: string;
			newFeeRecipient: string;
		}

		export interface FeedbackSent extends FormattedEvent {
			msgSender: string;
			proposalId: number;
			support: number;
			supportChoice: string;
			reason: string;
		}

		export interface OwnershipTransferred extends FormattedEvent {
			previousOwner: string;
			newOwner: string;
		}

		export interface ProposalCandidateCanceled extends FormattedEvent {
			msgSender: string;
			slug: string;
		}

		export interface ProposalCandidateCreated extends FormattedEvent {
			msgSender: string;
			targets: string[];
			signatures: string[];
			calldatas: any[];
			description: string;
			slug: string;
			proposalIdToUpdate: number;
			encodedProposalHash: string;
		}

		export interface ProposalCandidateUpdated extends FormattedEvent {
			msgSender: string;
			targets: string[];
			signatures: string[];
			calldatas: any[];
			description: string;
			slug: string;
			proposalIdToUpdate: number;
			encodedProposalHash: string;
			reason: string;
		}

		export interface SignatureAdded extends FormattedEvent {
			signer: string;
			sig: string;
			expirationTimestamp: number;
			proposer: string;
			slug: string;
			proposalIdToUpdate: number;
			encodedPropHash: string;
			sigDigest: string;
			reason: string;
		}

		export interface UpdateCandidateCostSet extends FormattedEvent {
			oldUpdateCandidateCost: number;
			newUpdateCandidateCost: number;
		}

		export interface Upgraded extends FormattedEvent {
			implementation: string;
		}

		// Queries.

		export interface AdminChangedQuery {
			startBlock?: number;
			endBlock?: number;
			previousAdmin?: string;
			newAdmin?: string;
			including?: string;
		}

		export interface BeaconUpgradedQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface CandidateFeedbackSentQuery {
			startBlock?: number;
			endBlock?: number;
			msgSender?: string;
			proposer?: string;
			involved?: string;
			slug?: string;
			supportChoice?: "AGAINST" | "FOR" | "ABSTAIN";
		}

		export interface CreateCandidateCostSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface ETHWithdrawnQuery {
			startBlock?: number;
			endBlock?: number;
			to?: string;
		}

		export interface FeeRecipientSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface FeedbackSentQuery {
			startBlock?: number;
			endBlock?: number;
			msgSender?: string;
			proposalId?: number;
			supportChoice?: "AGAINST" | "FOR" | "ABSTAIN";
		}

		export interface OwnershipTransferredQuery {
			startBlock?: number;
			endBlock?: number;
			previousOwner?: string;
			newOwner?: string;
			including?: string;
		}

		export interface ProposalCandidateCanceledQuery {
			startBlock?: number;
			endBlock?: number;
			msgSender?: string;
			slug?: string;
		}

		export interface ProposalCandidateCreatedQuery {
			startBlock?: number;
			endBlock?: number;
			msgSender?: string;
			slug?: string;
		}

		export interface ProposalCandidateUpdatedQuery {
			startBlock?: number;
			endBlock?: number;
			msgSender?: string;
			slug?: string;
		}

		export interface SignatureAddedQuery {
			startBlock?: number;
			endBlock?: number;
			signer?: string;
			proposer?: string;
			involved?: string;
			slug?: string;
		}

		export interface UpdateCandidateCostSetQuery {
			startBlock?: number;
			endBlock?: number;
		}

		export interface UpgradedQuery {
			startBlock?: number;
			endBlock?: number;
		}
	}
}
