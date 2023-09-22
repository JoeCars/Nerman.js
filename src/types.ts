import { ethers, BigNumber } from "ethers";

// ETHEREUM
export interface Account {
	id: string;
}

export interface NounsTokenSeed {
	background: number;
	body: number;
	accessory: number;
	head: number;
	glasses: number;
}

// NounsAuctionHouse
export interface Auction {
	id: number; //Noun ID
	startTime: number;
	endTime: number;
}

export interface Bid {
	id: string;
	amount: string;
	bidder: Account;
	extended: boolean;
}

export interface AuctionBids {
	id: number;
	endTime: number;
	bids: Bid[];
}

export interface TokenMetadata {
	name: string;
	description: string;
	image: string;
}

export enum VoteDirection {
	AGAINST = 0,
	FOR = 1,
	ABSTAIN = 2
}

export interface Vote {
	id: string;
	voter: Account;
	votes: number;
	supportDetailed: VoteDirection;
	reason: string | null;
}

export interface NounsContractData {
	address: string;
	abi: ethers.ContractInterface;
	provider: ethers.providers.JsonRpcProvider;
}

export interface EventWrapper {
	event: ethers.Event;
}

export type ProposalStatus =
	| typeof STATUS_ACTIVE
	| typeof STATUS_CANCELLED
	| typeof STATUS_EXECUTED
	| typeof STATUS_PENDING
	| typeof STATUS_QUEUED
	| typeof STATUS_VETOED;

import { STATUS_ACTIVE, STATUS_QUEUED, STATUS_PENDING, STATUS_EXECUTED, STATUS_CANCELLED, STATUS_VETOED } from "./constants";

// THIS IS OLD, moved to EVENT DATA
export interface Proposal {
	id: number;
	proposer: Account;
	description: string;
	status: ProposalStatus;
	quorumVotes: number;
	proposalThreshold: number;
	startBlock: number;
	endBlock: number;
	executionETA: number;
	votes: Vote[];
}

export namespace EventData {
	// ******************************************
	//
	// Contract - NounsDAO
	//
	// ******************************************
	// EventData types

	export interface DAOWithdrawNounsFromEscrow {
		tokenIds: number[];
		to: Account;
		event: ethers.Event;
	}

	export interface ERC20TokensToIncludeInForkSet {
		oldErc20Tokens: string[];
		newErc20tokens: string[];
		event: ethers.Event;
	}

	export interface EscrowedToFork {
		forkId: number;
		owner: Account;
		tokenIds: number[];
		proposalIds: number[];
		reason: string;
		event: ethers.Event;
	}

	export interface ExecuteFork {
		forkId: number;
		forkTreasury: Account;
		forkToken: Account;
		forkEndTimestamp: number;
		tokensInEscrow: number;
		event: ethers.Event;
	}

	export interface ForkDAODeployerSet {
		oldForkDAODeployer: Account;
		newForkDAODeployer: Account;
		event: ethers.Event;
	}

	export interface ForkPeriodSet {
		oldForkPeriod: number;
		newForkPeriod: number;
		event: ethers.Event;
	}

	export interface ForkThresholdSet {
		oldForkThreshold: number;
		newForkThreshold: number;
		event: ethers.Event;
	}

	export interface JoinFork {
		forkId: number;
		owner: Account;
		tokenIds: number[];
		proposalIds: number[];
		reason: string;
		event: ethers.Event;
	}

	export interface LastMinuteWindowSet {
		oldLastMinuteWindowInBlocks: number;
		newLastMinuteWindowInBlocks: number;
		event: ethers.Event;
	}

	export interface MaxQuorumVotesBPSSet {
		oldMaxQuorumVotesBPS: number;
		newMaxQuorumVotesBPS: number;
		event: ethers.Event;
	}

	export interface MinQuorumVotesBPSSet {
		oldMinQuorumVotesBPS: number;
		newMinQuorumVotesBPS: number;
		event: ethers.Event;
	}

	export interface NewAdmin {
		oldAdmin: Account;
		newAdmin: Account;
		event: ethers.Event;
	}

	export interface NewImplementation {
		oldImplementation: Account;
		newImplementation: Account;
		event: ethers.Event;
	}

	export interface NewPendingAdmin {
		oldPendingAdmin: Account;
		newPendingAdmin: Account;
		event: ethers.Event;
	}

	export interface NewPendingVetoer {
		oldPendingVetoer: Account;
		newPendingVetoer: Account;
		event: ethers.Event;
	}

	export interface NewVetoer {
		oldVetoer: Account;
		newVetoer: Account;
		event: ethers.Event;
	}

	export interface ObjectionPeriodDurationSet {
		oldObjectionPeriodDurationInBlocks: number;
		newObjectionPeriodDurationInBlocks: number;
		event: ethers.Event;
	}

	export interface ProposalCanceled {
		id: number;
		event: ethers.Event;
	}

	export interface ProposalCreated {
		id: number;
		proposer: Account;
		targets: string[];
		values: BigNumber[];
		signatures: string[];
		calldatas: any[]; // type is bytes[]
		startBlock: number;
		endBlock: number;
		description: string;
		event: ethers.Event;
	}

	export interface ProposalCreatedOnTimelockV1 {
		id: number;
		event: ethers.Event;
	}

	export interface ProposalCreatedWithRequirements {
		id: number;
		proposer: Account;
		signers?: string[];
		targets: string[];
		values: BigNumber[];
		signatures: string[];
		calldatas: any[];
		startBlock: number;
		endBlock: number;
		updatePeriodEndBlock?: number;
		proposalThreshold: number;
		quorumVotes: number;
		description: string;
		event: ethers.Event;
	}

	export interface ProposalDescriptionUpdated {
		id: number;
		proposer: Account;
		description: string;
		updatedMessage: string;
	}

	export interface ProposalExecuted {
		id: number;
		event: ethers.Event;
	}

	export interface ProposalObjectionPeriodSet {
		id: number;
		objectionPeriodEndBlock: number;
		event: ethers.Event;
	}

	export interface ProposalQueued {
		id: number;
		eta: number;
		event: ethers.Event;
	}

	export interface ProposalThresholdBPSSet {
		oldProposalThresholdBPS: number;
		newProposalThresholdBPS: number;
		event: ethers.Event;
	}

	export interface ProposalTransactionsUpdated {
		id: number;
		proposer: Account;
		targets: string[];
		values: number[];
		signatures: string[];
		calldatas: any[];
		updateMessage: string;
		event: ethers.Event;
	}

	export interface ProposalUpdatablePeriodSet {
		oldProposalUpdatablePeriodInBlocks: number;
		newProposalUpdatablePeriodInBlocks: number;
		event: ethers.Event;
	}

	export interface ProposalUpdated {
		id: number;
		proposer: Account;
		targets: string[];
		values: number[];
		signatures: string[];
		calldatas: any[];
		description: string;
		updateMessage: string;
		event: ethers.Event;
	}

	export interface ProposalVetoed {
		id: number;
		event: ethers.Event;
	}

	export interface Quit {
		msgSender: Account;
		tokenIds: number[];
		event: ethers.Event;
	}

	export interface QuorumCoefficientSet {
		oldQuorumCoefficient: number;
		newQuorumCoefficient: number;
		event: ethers.Event;
	}

	export interface QuorumVotesBPSSet {
		oldQuorumVotesBPS: number;
		newQuorumVotesBPS: number;
		event: ethers.Event;
	}

	export interface RefundableVote {
		voter: Account;
		refundAmount: number;
		refundSent: boolean;
		event: ethers.Event;
	}

	export interface SignatureCancelled {
		signer: Account;
		sig: any;
		event: ethers.Event;
	}

	export interface TimelocksAndAdminSet {
		timelock: Account;
		timelockV1: Account;
		admin: Account;
		event: ethers.Event;
	}

	export interface VoteCast {
		voter: Account;
		proposalId: number;
		supportDetailed: VoteDirection;
		votes: number;
		reason: string;
		event: ethers.Event;
	}

	export interface VoteSnapshotBlockSwitchProposalIdSet {
		oldVoteSnapshotBlockSwitchProposalId: number;
		newVoteSnapshotBlockSwitchProposalId: number;
		event: ethers.Event;
	}

	export interface VotingDelaySet {
		oldVotingDelay: number;
		newVotingDelay: number;
		event: ethers.Event;
	}

	export interface VotingPeriodSet {
		oldVotingPeriod: number;
		newVotingPeriod: number;
		event: ethers.Event;
	}

	export interface Withdraw {
		amount: number;
		sent: boolean;
		event: ethers.Event;
	}

	export interface WithdrawFromForkEscrow {
		forkId: number;
		owner: Account;
		tokenIds: number[];
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
}

//=========================================
// Index Types
//=========================================

export namespace Indexer {
	export interface FormattedEvent {
		blockNumber: number;
		blockHash: string;
		transactionIndex: number;
		address: string;
		transactionHash: string;
		eventName: string;
		eventSignature: string;
	}

	export namespace NounsDAO {
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

		export interface ProposalCreatedWithRequirements extends ProposalCreated {
			signers: string[];
			updatePeriodEndBlock: number;
			proposalThreshold: number;
			quorumVotes: number;
		}

		export interface VoteCast extends FormattedEvent {
			voterAddress: string;
			proposalId: number;
			support: number;
			supportChoice: string;
			votes: number;
			reason: string;
		}

		export interface ProposalCanceled extends FormattedEvent {
			proposalId: number;
			status: string;
		}

		export interface ProposalQueued extends FormattedEvent {
			proposalId: number;
			eta: number;
			status: string;
		}

		export interface ProposalExecuted extends FormattedEvent {
			proposalId: number;
			status: string;
		}

		export interface ProposalVetoed extends FormattedEvent {
			proposalId: number;
			status: string;
		}

		export interface VotingDelaySet extends FormattedEvent {
			oldVotingDelay: number;
			newVotingDelay: number;
		}

		export interface VotingPeriodSet extends FormattedEvent {
			oldVotingPeriod: number;
			newVotingPeriod: number;
		}

		export interface NewImplementation extends FormattedEvent {
			oldImplementation: string;
			newImplementation: string;
		}

		export interface ProposalThresholdBPSSet extends FormattedEvent {
			oldProposalThresholdBPS: number;
			newProposalThresholdBPS: number;
		}

		export interface QuorumVotesBPSSet extends FormattedEvent {
			oldQuorumVotesBPS: number;
			newQuorumVotesBPS: number;
		}

		export interface NewPendingAdmin extends FormattedEvent {
			oldPendingAdmin: string;
			newPendingAdmin: string;
		}

		export interface NewAdmin extends FormattedEvent {
			oldAdmin: string;
			newAdmin: string;
		}

		export interface NewVetoer extends FormattedEvent {
			oldVetoer: string;
			newVetoer: string;
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
	}
}
