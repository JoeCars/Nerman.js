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

	/** DAOWithdrawNounsFromEscrow event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L191C9-L191C9 | Github}
	 */
	export interface DAOWithdrawNounsFromEscrow {
		/** List of tokens being withdrawn. */
		tokenIds: number[];
		/** Address withdrawing the tokens. */
		to: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ERC20TokensToIncludeInForkSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L513 | Github}
	 */
	export interface ERC20TokensToIncludeInForkSet {
		/** Old ERC20 tokens for splitting funds. */
		oldErc20Tokens: string[];
		/** New ERC20 tokens for splitting funds. */
		newErc20tokens: string[];
		/** Event meta data. */
		event: ethers.Event;
	}

	/** EscrowedToFork event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L74 | Github}
	 */
	export interface EscrowedToFork {
		/** Fork number. */
		forkId: number;
		/** Token owner who is escrowing to fork. */
		owner: Account;
		/** List of tokens being escrowed. */
		tokenIds: number[];
		/** Proposal IDs which are the reason for wanting to fork. */
		proposalIds: number[];
		/** Optional reason. */
		reason: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ExecuteFork event data. The fork escrow is closed.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L111 | Github}
	 */
	export interface ExecuteFork {
		/** Fork number. */
		forkId: number;
		/** New fork treasury address. */
		forkTreasury: Account;
		/** New fork token address. */
		forkToken: Account;
		/** The unix timestamp in seconds until which the fork can rejoin the DAO. */
		forkEndTimestamp: number;
		/** Tokens in escrow at the moment of the escrow. These are lost from the main treasury. */
		tokensInEscrow: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ForkDAODeployerSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L500 | Github}
	 */
	export interface ForkDAODeployerSet {
		/** Old fork DAO deployer contract. */
		oldForkDAODeployer: Account;
		/** New fork DAO deployer contract. */
		newForkDAODeployer: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ForkPeriodSet event data. Sets how much time a fork has to rejoin the DAO after it has been executed.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L533 | Github}
	 */
	export interface ForkPeriodSet {
		/** Old fork period in seconds.*/
		oldForkPeriod: number;
		/** New fork period in seconds. */
		newForkPeriod: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ForkThresholdSet event data. Sets the threshold of Nouns in escrow needed to execute a fork.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L551 | Github}
	 */
	export interface ForkThresholdSet {
		/** The old token amount needed to successfully fork the DAO. A percentage of the token supply. */
		oldForkThreshold: number;
		/** The new token amount needed to successfully fork the DAO. A percentage of the token supply. */
		newForkThreshold: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** JoinFork event data. Joins contract after the contract has been executed, but before the time to rejoin has ended.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L141 | Github}
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

	/** LastMinuteWindowSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L229 | Github}
	 */
	export interface LastMinuteWindowSet {
		/** Old objection period last minute window. */
		oldLastMinuteWindowInBlocks: number;
		/** New objection period last minute window. */
		newLastMinuteWindowInBlocks: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** MaxQuorumVotesBPSSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L381 | Github}
	 */
	export interface MaxQuorumVotesBPSSet {
		/** Old maximum quorum votes BPS. */
		oldMaxQuorumVotesBPS: number;
		/** New maximum quorum votes BPS. */
		newMaxQuorumVotesBPS: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** MinQuorumVotesBPSSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L351 | Github}
	 */
	export interface MinQuorumVotesBPSSet {
		/** Old minimum quorum votes BPS. */
		oldMinQuorumVotesBPS: number;
		/** New minimum quorum votes BPS. */
		newMinQuorumVotesBPS: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewAdmin event data. Transfers admin rights.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L276 | Github}
	 */
	export interface NewAdmin {
		/** Old admin address. */
		oldAdmin: Account;
		/** New admin address. */
		newAdmin: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewImplementation event data. Updates implementation of the delegator.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOProxyV3.sol#L81 | Github}
	 */
	export interface NewImplementation {
		/** Old delegator implementation. */
		oldImplementation: Account;
		/** New delegator implementation. */
		newImplementation: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewPendingAdmin event data. Offers the admin position to a new address. The new address must accept it to become an admin.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L261 | Github}
	 */
	export interface NewPendingAdmin {
		/** Old pending admin address. */
		oldPendingAdmin: Account;
		/** New pending admin address. */
		newPendingAdmin: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewPendingVetoer event data. Offers the vetoer position to a new address. The new address must accept it to become a vetoer.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L301 | Github}
	 */
	export interface NewPendingVetoer {
		/** Old pending vetoer. */
		oldPendingVetoer: Account;
		/** New pending vetoer. */
		newPendingVetoer: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NewVetoer event data. Transfers vetoer rights.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L314 | Github}
	 */
	export interface NewVetoer {
		/** Old vetoer. */
		oldVetoer: Account;
		/** New vetoer. */
		newVetoer: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ObjectionPeriodDurationSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L212 | Github}
	 */
	export interface ObjectionPeriodDurationSet {
		/** Old objection period in blocks. */
		oldObjectionPeriodDurationInBlocks: number;
		/** New objection period in blocks. */
		newObjectionPeriodDurationInBlocks: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCanceled event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L571 | Github}
	 */
	export interface ProposalCanceled {
		/** id of the proposal being cancelled. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCreated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L917 | Github}
	 */
	export interface ProposalCreated {
		/** id of the proposal being created. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** Target addresses for proposal calls. */
		targets: string[];
		/** Eth values for proposal calls. */
		values: BigNumber[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
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
		 * Proposal content.
		 * `
		 */
		description: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCreatedOnTimelockV1 event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L197 | Github}
	 */
	export interface ProposalCreatedOnTimelockV1 {
		/** id of the proposal created. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCreatedWithRequirements event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L917 | Github}
	 */
	export interface ProposalCreatedWithRequirements {
		/** id of the proposal created. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** List of signers. In V3. */
		signers?: string[];
		/** Target addresses for proposal calls. */
		targets: string[];
		/** Eth values for proposal calls. */
		values: BigNumber[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
		calldatas: any[];
		/** The block voting starts. */
		startBlock: number;
		/** The block voting ends. */
		endBlock: number;
		/** Period where the proposal is updatable. In V3. */
		updatePeriodEndBlock?: number;
		/** The proposal threshold. In V1. */
		proposalThreshold: number;
		/** The quorum votes. In V1. Renamed to minQuorumVotes in V2.*/
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

	/** ProposalDescriptionUpdated event data. The proposal description was updated during the updateable period.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L360 | Github}
	 */
	export interface ProposalDescriptionUpdated {
		/** id of the proposal updated. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** Updated proposal description. */
		description: string;
		/** A message explaining the update. */
		updatedMessage: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalExecuted event data. Executes a fork that is currently queued. Not possible during forking period.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L495 | Github}
	 */
	export interface ProposalExecuted {
		/** id of the proposal executed. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalObjectionPeriodSet event data. A last minute FOR vote that changes the proposal from defeated to succeeded will trigger this event. Extends voting time.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L210 | Github}
	 */
	export interface ProposalObjectionPeriodSet {
		/** id of the proposal. */
		id: number;
		/** Objection end block. */
		objectionPeriodEndBlock: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalQueued event data. A proposal that was successful during the voting period is queued.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L438 | Github }
	 */
	export interface ProposalQueued {
		/** id of the proposal. */
		id: number;
		/** Block number signifying end of the queued period. The proposal is executed once this is over. */
		eta: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalThresholdBPSSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L193 | Github}
	 */
	export interface ProposalThresholdBPSSet {
		/** Old proposal threshold basis points. */
		oldProposalThresholdBPS: number;
		/** New proposal threshold basis points. */
		newProposalThresholdBPS: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalTransactionsUpdated event data. Updates list of proposal transactions during the updateable period.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L321 | Github}
	 */
	export interface ProposalTransactionsUpdated {
		/** id of the proposal. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** Target addresses for proposal calls. */
		targets: string[];
		/** Eth values for proposal calls. */
		values: number[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
		calldatas: any[];
		/** The reason for the update. */
		updateMessage: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalUpdatablePeriodSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L243 | Github}
	 */
	export interface ProposalUpdatablePeriodSet {
		/** The old proposal updatable period in blocks. */
		oldProposalUpdatablePeriodInBlocks: number;
		/** The new proposal updatable period in blocks. */
		newProposalUpdatablePeriodInBlocks: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalUpdated event data. Updates both the description and transaction.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L288 | Github}
	 */
	export interface ProposalUpdated {
		/** id of the proposal. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** Updated target addresses for proposal calls. */
		targets: string[];
		/** Updated eth values for proposal calls. */
		values: number[];
		/** Updated function signatures for proposal calls. */
		signatures: string[];
		/** Updated calldatas for proposal calls. */
		calldatas: any[];
		/** Updated proposal description. */
		description: string;
		/** Message explaining the update. */
		updateMessage: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalVetoed event data. Vetoes a proposal that has not been executed.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L536 | Github}
	 */
	export interface ProposalVetoed {
		/** id of the proposal. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Quit event data. Token holders return their tokens in exchange for eth.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/newdao/governance/NounsDAOLogicV1Fork.sol#L222 | Github}
	 */
	export interface Quit {
		/** The account quitting the Nouns DAO. */
		msgSender: Account;
		/** The tokens returned in exchange for eth. */
		tokenIds: number[];
		/** Event meta data. */
		event: ethers.Event;
	}

	/** QuorumCoefficientSet event data. Sets a new fixed point integer with 6 decimals.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L408 | Github}
	 */
	export interface QuorumCoefficientSet {
		/** The old quorum coefficient. */
		oldQuorumCoefficient: number;
		/** The new quorum coefficient. */
		newQuorumCoefficient: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** QuorumVotesBPSSet event data. (Old)
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/newdao/governance/NounsDAOLogicV1Fork.sol#L709 | Github}
	 */
	export interface QuorumVotesBPSSet {
		/** The old quorum votes basis points. */
		oldQuorumVotesBPS: number;
		/** The new quorum votes basis points. */
		newQuorumVotesBPS: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** RefundableVote event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L295 | Github}
	 */
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

	/** SignatureCancelled event data. Invalidates a signature for signing a proposal.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L270 | Github}
	 */
	export interface SignatureCancelled {
		/** The account cancelling the signature. */
		signer: Account;
		/** The signature to cancel. */
		sig: any;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** TimelocksAndAdminSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L566 | Github}
	 */
	export interface TimelocksAndAdminSet {
		/** The new timelock contract. */
		timelock: Account;
		/** The new timelockV1 contract. */
		timelockV1: Account;
		/** The new admin address. */
		admin: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** VoteCast event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L70 | Github}
	 */
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

	/** VoteSnapshotBlockSwitchProposalIdSet event data. The proposal id after which the snapshot was taken the day voting started.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L482 | Github}
	 */
	export interface VoteSnapshotBlockSwitchProposalIdSet {
		/** 0. This event was only intended to ever be executed once. */
		oldVoteSnapshotBlockSwitchProposalId: number;
		/** The proposal id from which the snapshot became the starting day. */
		newVoteSnapshotBlockSwitchProposalId: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** VotingDelaySet event data. Voting delay is the time before voting begins, in blocks.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L162 | Github}
	 */
	export interface VotingDelaySet {
		/** The old voting delay in blocks. */
		oldVotingDelay: number;
		/** The new voting delay in blocks. */
		newVotingDelay: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** VotingPeriodSet event data. Voting period is how long voting lasts, in blocks.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L177 | Github}
	 */
	export interface VotingPeriodSet {
		/** The old voting period in blocks. */
		oldVotingPeriod: number;
		/** The new voting period in blocks. */
		newVotingPeriod: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Withdraw event data. Withdraws all the eth in the contract.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L468 | Github}
	 */
	export interface Withdraw {
		/** The amount withdrawn. */
		amount: number;
		/** Whether the withdrawn amount was sent. */
		sent: boolean;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** WithdrawFromForkEscrow event data. Withdraws nouns from the escrow if the fork has not been executed yet.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L95 | Github}
	 */
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

	/** AuctionComplete event data. Custom type. */
	export interface AuctionComplete {
		/** Noun token id. */
		id: number;
		/** The auction end time. */
		endTime: number;
		// should add block
	}

	// EventData types from ABI

	/** AuctionBid event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L104 | Github}
	 */
	export interface AuctionBid {
		/** Noun token id. */
		id: number;
		/** The bid amount in wei. */
		amount: number;
		/** Bidder account. */
		bidder: Account;
		/** Whether the bid was received within the end time buffer, thus extending the auction. */
		extended: boolean;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** AuctionCreated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L197 | Github}
	 */
	export interface AuctionCreated {
		/** Noun token id. */
		id: number;
		/** Auction starting time as seconds since unix epoch. */
		startTime: number;
		/** Auction ending time as seconds since unix epoch. */
		endTime: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** AuctionExtended event data. Happens whenever a bid comes in within the end buffer of the auction.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L104 | Github}
	 */
	export interface AuctionExtended {
		/** Noun token id. */
		id: number;
		/** New auction end time as seconds since unix epoch. */
		endTime: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** AuctionSettled event data. Triggers when the next auction begins.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L221 | Github}
	 */
	export interface AuctionSettled {
		/** Noun token id. */
		id: number;
		/** The winning bidder's account. */
		winner: Account;
		/** Winning bid amount in wei. */
		amount: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** AuctionTimeBufferUpdated event data. The time buffer that extends an auction.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L165 | Github}
	 */
	export interface AuctionTimeBufferUpdated {
		/** New time buffer. */
		timeBuffer: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** AuctionReservePriceUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L175 | Github}
	 */
	export interface AuctionReservePriceUpdated {
		/** New auction reserve price. */
		reservePrice: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** AuctionMinBidIncrementPercentageUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L185 | Github}
	 */
	export interface AuctionMinBidIncrementPercentageUpdated {
		/** New auction minimum bid increment percentage. */
		minBidIncrementPercentage: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** OwnershipTransferred event data.
	 * In ABI but not in contract.
	 */
	export interface OwnershipTransferred {
		/** Previous owner. */
		previousOwner: Account;
		/** New owner. */
		newOwner: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Paused event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L144 | Github}
	 */
	export interface Paused {
		/** Address paused. */
		address: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Unpaused event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L153 | Github}
	 */
	export interface Unpaused {
		/** Address unpaused. */
		address: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	// ******************************************
	//
	// Contract - NounsToken
	//
	// ******************************************
	// EventData types

	/** DelegateChanged event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721Checkpointable.sol#L197 | Github}
	 */
	export interface DelegateChanged {
		/** Token owner account. */
		delegator: Account;
		/** Old delegate account. */
		fromDelegate: Account;
		/** New delegate account. */
		toDelegate: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** DelegateVotesChanged event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721Checkpointable.sol#L232 | Github}
	 */
	export interface DelegateVotesChanged {
		/** Delegate account. */
		delegate: Account;
		/** Previous voting power. */
		previousBalance: number;
		/** New voting power. */
		newBalance: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Transfer event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L373 | Github}
	 */
	export interface Transfer {
		/** Old token owner. */
		from: Account;
		/** New token owner. */
		to: Account;
		/** Nouns token id. */
		tokenId: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Approval event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L398 | Github}
	 */
	export interface Approval {
		/** Owner of the token. */
		owner: Account;
		/** The person given permission to operate on the token. */
		approved: Account;
		/** Nouns token id. */
		tokenId: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ApprovalForAll event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L165 | Github}
	 */
	export interface ApprovalForAll {
		/** The token owner. */
		owner: Account;
		/** The person given permission to operate on the token. */
		operator: Account;
		/** Whether the operator has permission for the token. */
		approved: boolean;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** DescriptorLocked event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L226 | Github}
	 */
	export interface DescriptorLocked {
		/** Event meta data. */
		event: ethers.Event;
	}

	/** DescriptorUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L216 | Github}
	 */
	export interface DescriptorUpdated {
		/** New token URI descriptor. */
		descriptor: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** MinterLocked event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L206 | Github}
	 */
	export interface MinterLocked {
		/** Event meta data. */
		event: ethers.Event;
	}

	/** MinterUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L196 | Github}
	 */
	export interface MinterUpdated {
		/** Token minter. */
		minter: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NounBurned event data. Burns a noun. Happens when an auction has no bids.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L159 | Github}
	 */
	export interface NounBurned {
		/** Noun token id. */
		id: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NounCreated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L255 | Github}
	 */
	export interface NounCreated {
		/** Noun token id. */
		id: number;
		/** Noun token seed. */
		seed: NounsTokenSeed;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** NoundersDAOUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L186 | Github}
	 */
	export interface NoundersDAOUpdated {
		/** Nounders DAO. */
		noundersDAO: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** OwnershipTransferred event data.
	 *  In ABI but not in contract.
	 */
	export interface OwnershipTransferred {
		/** Previous owner. */
		previousOwner: Account;
		/** New owner. */
		newOwner: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** SeederLocked event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L246 | Github}
	 */
	export interface SeederLocked {
		/** Event meta data. */
		event: ethers.Event;
	}

	/** SeederUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L236 | Github}
	 */
	export interface SeederUpdated {
		/** Token seeder. */
		seeder: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	// ******************************************
	//
	// Contract - NounsDAOData
	//
	// ******************************************

	/** AdminChanged event data.
	 * In ABI but not in contract.
	 */
	export interface AdminChanged {
		/** Previous admin. */
		previousAdmin: Account;
		/** New admin. */
		newAdmin: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** BeaconUpgraded event data.
	 * In ABI but not in contract.
	 */
	export interface BeaconUpgraded {
		/** Beacon. */
		beacon: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** CandidateFeedbackSent event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L279 | Github}
	 */
	export interface CandidateFeedbackSent {
		/** Feedbacker account. */
		msgSender: Account;
		/** Candidate proposal creator account. */
		proposer: Account;
		/** Candidate proposal unique identifier. */
		slug: string;
		/** Feedback vote. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively). */
		support: number;
		/** Optional reason left by the feedbacker. */
		reason: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** CreateCandidateCostSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L297 | Github}
	 */
	export interface CreateCandidateCostSet {
		/** Old cost of creating candidate proposal. */
		oldCreateCandidateCost: number;
		/** New cost of creating candidate proposal. */
		newCreateCandidateCost: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ETHWithdrawn event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L323C9-L323C9 | Github}
	 */
	export interface ETHWithdrawn {
		/** Amount recipient. */
		to: Account;
		/** Amount of eth withdrawn in wei. */
		amount: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** FeeRecipientSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L311 | Github}
	 */
	export interface FeeRecipientSet {
		/** Old fee recipient. */
		oldFeeRecipient: Account;
		/** New fee recipient. */
		newFeeRecipient: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** FeedbackSent event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L261 | Github}
	 */
	export interface FeedbackSent {
		/** Feedbacker account. */
		msgSender: Account;
		/** Proposal receiving feedback. */
		proposalId: number;
		/** Feedback vote. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively). */
		support: number;
		/** Optional reason left by the feedbacker. */
		reason: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** OwnershipTransferred event data.
	 * In ABI but not in contract.
	 */
	export interface OwnershipTransferred {
		/** Previous owner. */
		previousOwner: Account;
		/** New owner. */
		newOwner: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCandidateCanceled event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L204 | Github}
	 */
	export interface ProposalCandidateCanceled {
		/** Proposal candidate creator account. */
		msgSender: Account;
		/** Proposal candidate unique identifier. */
		slug: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCandidateCreated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L111 | Github}
	 */
	export interface ProposalCandidateCreated {
		/** Proposal candidate creator account. */
		msgSender: Account;
		/** Target addresses for proposal calls. */
		targets: string[];
		/** Eth values for proposal calls. */
		values: number[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
		calldatas: any[];
		/** Proposal candidate's description. */
		description: string;
		/** Proposal candidate unique identifier. */
		slug: string;
		/** The id of the proposal to update if this is an update to an existing proposal. */
		proposalIdToUpdate: number;
		/** Hash of the proposal that this is an update for. */
		encodedProposalHash: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** ProposalCandidateUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L161 | Github}
	 */
	export interface ProposalCandidateUpdated {
		/** Proposal candidate creator account. */
		msgSender: Account;
		/** Target addresses for proposal calls. */
		targets: string[];
		/** Eth values for proposal calls. */
		values: number[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
		calldatas: any[];
		/** Proposal candidate's description. */
		description: string;
		/** Proposal candidate unique identifier. */
		slug: string;
		/** The id of the proposal to update if this is an update to an existing proposal.  */
		proposalIdToUpdate: number;
		/** Hash of the proposal that this is an update for. */
		encodedProposalHash: string;
		/** Optional reason for explaining the update. */
		reason: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** SignatureAdded event data. Token holders can sign proposal candidates to convert them into DAO proposals.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L222 | Github}
	 */
	export interface SignatureAdded {
		/** Signer account. */
		signer: Account;
		/** The signature bytes. */
		sig: string;
		/** The signature's expiration timestamp. As milliseconds since Unix epoch. */
		expirationTimestamp: number;
		/** Proposal candidate creator account. */
		proposer: Account;
		/** Proposal candidate unique identifier. */
		slug: string;
		/** The id of the proposal to update if this is an update to an existing proposal. */
		proposalIdToUpdate: number;
		/** Hash of the proposal that this is an update for. */
		encodedPropHash: string;
		/** The abi encoding of the candidate version signed. */
		sigDigest: string;
		/** Optional reason for signing proposal candidate. */
		reason: string;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** UpdateCandidateCostSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L304 | Github}
	 */
	export interface UpdateCandidateCostSet {
		/** Old update cost. */
		oldUpdateCandidateCost: number;
		/** New update cost. */
		newUpdateCandidateCost: number;
		/** Event meta data. */
		event: ethers.Event;
	}

	/** Upgraded event data.
	 * In ABI but not in contract.
	 */
	export interface Upgraded {
		/** Implementation. */
		implementation: Account;
		/** Event meta data. */
		event: ethers.Event;
	}

	// ******************************************
	//
	// NounsNymz
	//
	// ******************************************

	/** NounsNymz event data. */
	export namespace NounsNymz {
		/** NewPost event data. */
		export interface NewPost {
			/** Post id. */
			id: string;
			/** Post title. Empty if it is a reply. */
			title: string;
			/** Post body. */
			body: string;
			/** Post UTC timestamp. */
			timestamp: string;
			/** Poster id. */
			userId: string;
			/** Parent post id. */
			parentId?: string;
			/** Number of replies in chain. */
			depth: number;
			/** List of upvotes. */
			upvotes: Upvote[];
			/** Original post if the new post is a reply. */
			root?: RootPost;
			/** Parent post if the new post is a reply. */
			parent?: ParentPost;
			/** ??? */
			_count: {
				/** ??? */
				descendants: number;
			};
		}

		/** Root post data. */
		export interface RootPost {
			/** Post id. */
			id: string;
			/** Post title.  */
			title: string;
			/** Post body. */
			body: string;
			/** Post UTC timestamp. */
			timestamp: string;
			/** Poster id. */
			userId: string;
			/** Parent post if the new post is a reply. */
			parentId?: string;
			/** Number of replies in chain. */
			depth: number;
			/** List of upvotes. */
			upvotes: Upvote[];
			/** ??? */
			_count: {
				/** ??? */
				descendants: number;
			};
		}

		/** Parent post data. */
		export interface ParentPost {
			/** Post id. */
			id: string;
			/** Post title.  */
			title: string;
			/** Post body. */
			body: string;
			/** Post UTC timestamp. */
			timestamp: string;
			/** Poster id. */
			userId: string;
			/** Parent post if the new post is a reply. */
			parentId?: string;
			/** Number of replies in chain. */
			depth: number;
			/** List of upvotes. */
			upvotes: Upvote[];
		}

		/** Upvote data. */
		export interface Upvote {
			/** ??? */
			id: string;
			/** ??? */
			address: string;
			/** Upvote UTC timestamp. */
			timestamp: string;
		}

		/** User data. */
		export interface User {
			/** Poster id. */
			userId: string;
			/** Number of posts created. */
			numPosts: number;
			/** Number of replies they have left. */
			numReplies: number;
			/** Total posts, including original posts and replies. */
			totalPosts: number;
			/** True if they are using their real name. */
			doxed: boolean;
			/** Name. */
			name: string;
			/** Last time active, as UTC timestamp. */
			lastActive: string;
			/** Number of upvotes. */
			upvotes: number;
		}
	}

	// ******************************************
	//
	// Federation
	//
	// ******************************************

	/** Federation event data. */
	export namespace Federation {
		/** GovPool event data. */
		export namespace GovPool {
			/** BidPlaced event data.
			 * {@link https://github.com/nounish/federation/blob/6360984278f017f182290facb0dc665c2b7108ad/contracts/src/experimental/delegate-bid.sol#L138 | Github}
			 */
			export interface BidPlaced {
				/** The address of the DAO. */
				dao: string;
				/** Proposal being bid on. */
				propId: number;
				/** The bidder's stance on the proposal. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively). */
				support: number;
				/** The amount bid, in wei. */
				amount: number;
				/** The bidder account address. */
				bidder: string;
				/** The reason for the bid. */
				reason?: string;
			}

			/** VoteCast event data.
			 * {@link https://github.com/nounish/federation/blob/6360984278f017f182290facb0dc665c2b7108ad/contracts/src/experimental/delegate-bid.sol#L188C1-L188C1 | Github}
			 */
			export interface VoteCast {
				/** The address of the DAO. */
				dao: string;
				/** Proposal that Federation is voting on. */
				propId: number;
				/** The direction of the vote. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively). */
				support: number;
				/** The winning bid amount, in wei. */
				amount: number;
				/** The winning bidder account address. */
				bidder: string;
			}
		}
	}

	// ******************************************
	//
	// Propdates
	//
	// ******************************************

	/** Propdates event data. */
	export namespace Propdates {
		/** Initialized event data. */
		export interface Initialized {
			/** The version number. */
			version: number;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** OwnershipTransferStarted event data. */
		export interface OwnershipTransferStarted {
			/** Old owner. */
			previousOwner: Account;
			/** New owner. */
			newOwner: Account;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** OwnershipTransferred event data. */
		export interface OwnershipTransferred {
			/** Old owner. */
			previousOwner: Account;
			/** New owner. */
			newOwner: Account;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** PostUpdate event data. */
		export interface PostUpdate {
			/** Proposal being updated. */
			propId: number;
			/** Whether the proposal is complete. */
			isCompleted: boolean;
			/** Update description. */
			update: string;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** PropUpdateAdminMigrated event data. */
		export interface PropUpdateAdminMigrated {
			/** Proposal.  */
			propId: number;
			/** Old admin. */
			oldAdmin: Account;
			/** New admin. */
			newAdmin: Account;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** PropUpdateAdminRecovered event data. */
		export interface PropUpdateAdminRecovered {
			/** Proposal.  */
			propId: number;
			/** Old admin. */
			oldAdmin: Account;
			/** New admin. */
			newAdmin: Account;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** PropUpdateAdminTransferred event data. */
		export interface PropUpdateAdminTransferred {
			/** Proposal.  */
			propId: number;
			/** Old admin. */
			oldAdmin: Account;
			/** New admin. */
			newAdmin: Account;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** SuperAdminTransferred event data. */
		export interface SuperAdminTransferred {
			/** Old super admin. */
			oldSuperAdmin: Account;
			/** New super admin. */
			newSuperAdmin: Account;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** Upgraded event data. */
		export interface Upgraded {
			/** Upgraded implementation address. */
			implementation: Account;
			/** Event meta data. */
			event: ethers.Event;
		}
	}

	// ******************************************
	//
	// LilNouns
	//
	// ******************************************
	/** LilNouns event data. */
	export namespace LilNouns {
		/** LilNoundersDAOUpdated event data. */
		export interface LilNoundersDAOUpdated {
			/** LilNounders DAO. */
			lilnoundersDAO: Account;
			/** Event meta data. */
			event: ethers.Event;
		}

		/** NounsDAOUpdated event data. */
		export interface NounsDAOUpdated {
			/** Nouns DAO. */
			nounsDAO: Account;
			/** Event meta data. */
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
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Token to return. All tokens by default. */
			tokenId?: number;
			/** Address to return. All addressed by default. */
			to?: string;
		}

		export interface ERC20TokensToIncludeInForkSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface EscrowedToForkQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Fork id to return. All by default. */
			forkId?: number;
			/** Owner address to return. All by default. */
			owner?: string;
			/** Token id to return. All by default. */
			tokenId?: number;
			/** Proposal id to return. All by default. */
			proposalId?: number;
		}

		export interface ExecuteForkQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Starting fork number to return. 0 by default. */
			startId?: number;
			/** Ending fork number to return. Infinity by default. */
			endId?: number;
			/** To return a single fork id, use in place of startId and endId. */
			id?: number;
		}

		export interface ForkDAODeployerSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface ForkPeriodSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface ForkThresholdSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface JoinForkQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Fork id to return. All by default. */
			forkId?: number;
			/** Owner address to return. All by default. */
			owner?: string;
			/** Token id to return. All by default. */
			tokenId?: number;
			/** Proposal id to return. All by default. */
			proposalId?: number;
		}

		export interface LastMinuteWindowSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface MaxQuorumVotesBPSSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface MinQuorumVotesBPSSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface NewAdminQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface NewImplementationQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface NewPendingAdminQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface NewPendingVetoerQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface NewVetoerQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface ObjectionPeriodDurationSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface ProposalCanceledQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposal id to return. All by default. */
			proposalId?: number;
		}

		export interface ProposalCreatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** First proposal id to return. 0 by default. */
			startId?: number;
			/** Last proposal id to return. Infinity by default. */
			endId?: number;
			/** Used in place of startId and endId, to return only one proposal id. */
			id?: number;
			/** Latest proposal status to return. All by default. */
			status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
			/** Proposer address to return. All by default. */
			proposer?: string;
		}

		export interface ProposalCreatedOnTimelockV1Query {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface ProposalCreatedWithRequirementsQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** First proposal id to return. 0 by default. */
			startId?: number;
			/** Last proposal id to return. Infinity by default. */
			endId?: number;
			/** Used in place of startId and endId, to return only one proposal id. */
			id?: number;
			/** Latest proposal status to return. All by default. */
			status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
			/** Proposer address to return. All by default. */
			proposer?: string;
		}

		export interface ProposalDescriptionUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposer address to return. All by default. */
			proposer?: string;
		}

		export interface ProposalExecutedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposal id to return. All by default. */
			proposalId?: number;
		}

		export interface ProposalObjectionPeriodSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposal id to return. All by default. */
			proposalId?: number;
		}

		export interface ProposalQueuedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposal id to return. All by default. */
			proposalId?: number;
		}

		export interface ProposalThresholdBPSSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface ProposalTransactionsUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposal id to return. All by default. */
			id?: number;
			/** Proposer address to return. All by default. */
			proposer?: string;
		}

		export interface ProposalUpdatablePeriodSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface ProposalUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposal id to return. All by default. */
			id?: number;
			/** Proposer address to return. All by default. */
			proposer?: string;
		}

		export interface ProposalVetoedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposal id to return. All by default. */
			proposalId?: number;
		}

		export interface QuorumCoefficientSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface QuorumVotesBPSSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface RefundableVoteQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Voter address to return. All by default. */
			voter?: string;
		}

		export interface SignatureCancelledQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Signer address to return. All by default. */
			signer?: string;
		}

		export interface TimelocksAndAdminSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Admin address to return. All by default. */
			admin?: string;
		}

		export interface StatusChangeQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Proposal id to return. All by default. */
			proposalId?: number;
			/** Proposal status to return. All by default. */
			status?: "Cancelled" | "Vetoed" | "Executed" | "Queued";
		}

		export interface VoteCastQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Voter address to return. All by default. */
			voter?: string;
			/** Proposal id to return. All by default. */
			proposalId?: number;
			/** Vote stance to return. All by default. */
			support?: "AGAINST" | "FOR" | "ABSTAIN";
		}

		export interface VoteSnapshotBlockSwitchProposalIdSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface VotingDelaySetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface VotingPeriodSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface WithdrawQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface WithdrawFromForkEscrowQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Fork id to return. All by default. */
			forkId?: number;
			/** Owner address to return. All by default. */
			owner?: string;
			/** Token id to return. All by default. */
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
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Noun id to return. All by default. */
			nounId?: number;
		}

		export interface AuctionBidQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Noun id to return. All by default. */
			nounId?: number;
			/** Bidder address to return. All by default. */
			bidder?: string;
			/** Smallest bid to return. 0 by default. */
			minBidAmount?: number;
			/** Largest bid to return. Infinity by default. */
			maxBidAmount?: number;
		}

		export interface AuctionExtendedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Noun id to return. All by default. */
			nounId?: number;
		}

		export interface AuctionSettledQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Noun id to return. All by default. */
			nounId?: number;
			/** Winner address to return. All by default. */
			winner?: string;
			/** Smallest bid to return. 0 by default. */
			minBidAmount?: number;
			/** Largest bid to return. Infinity by default. */
			maxBidAmount?: number;
		}

		export interface AuctionTimeBufferUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface AuctionReservePriceUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface AuctionMinBidIncrementPercentageUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface OwnershipTransferredQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Previous owner address to return. All by default. */
			previousOwner?: string;
			/** New owner address to return. All by default. */
			newOwner?: string;
			/** An involved address to return, either the previousOwner or the newOwner. All by default. */
			involving?: string;
		}

		export interface PausedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface UnpausedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
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
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Delegator address to return. All by default. */
			delegator?: string;
			/** From delegate address to return. All by default. */
			fromDelegate?: string;
			/** To delegate address to return. All by default. */
			toDelegate?: string;
			/** An involved address to return, either the delegator, fromDelegate, or toDelegate. All by default. */
			involving?: string;
		}

		export interface DelegateVotesChangedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Delegate address to return. All by default. */
			delegate?: string;
		}

		export interface TransferQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** From address to return. All by default. */
			from?: string;
			/** To address to return. All by default. */
			to?: string;
			/** An involved address to return, either the delegator, fromDelegate, or toDelegate. All by default. */
			involving?: string;
			/** Token id to return. All by default. */
			tokenId?: number;
		}

		export interface ApprovalQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Owner address to return. All by default. */
			owner?: string;
			/** Token id to return. All by default. */
			tokenId?: number;
		}

		export interface ApprovalForAllQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Owner address to return. All by default. */
			owner?: string;
		}

		export interface NounCreatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Token id to return. All by default. */
			tokenId?: number;
			/** Background seed to return. All by default. */
			background?: number;
			/** Body seed to return. All by default. */
			body?: number;
			/** Accessory seed to return. All by default. */
			accessory?: number;
			/** Head seed to return. All by default. */
			head?: number;
			/** Glasses seed to return. All by default. */
			glasses?: number;
		}

		export interface DescriptorLockedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface DescriptorUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface MinterLockedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface MinterUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface NounBurnedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Noun id to return. All by default. */
			nounId?: number;
		}

		export interface NoundersDAOUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface OwnershipTransferredQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Previous owner address to return. All by default. */
			previousOwner?: string;
			/** New owner address to return. All by default. */
			newOwner?: string;
			/** An involved address to return, either the previousOwner, or newOwner. All by default. */
			involving?: string;
		}

		export interface SeederLockedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface SeederUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
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
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Previous admin address to return. All by default. */
			previousAdmin?: string;
			/** New admin address to return. All by default. */
			newAdmin?: string;
			/** An involved address to return, either the previousAdmin, or newAdmin. All by default. */
			involving?: string;
		}

		export interface BeaconUpgradedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface CandidateFeedbackSentQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Message sender address to return. All by default. */
			msgSender?: string;
			/** Proposer address to return. All by default. */
			proposer?: string;
			/** An involved address to return, either the msgSender, or proposer. All by default. */
			involving?: string;
			/** Slug to return. All by default. */
			slug?: string;
			/** Support choice to return. All by default. */
			supportChoice?: "AGAINST" | "FOR" | "ABSTAIN";
		}

		export interface CreateCandidateCostSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface ETHWithdrawnQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** To address to return. All by default. */
			to?: string;
		}

		export interface FeeRecipientSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface FeedbackSentQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Message sender address to return. All by default. */
			msgSender?: string;
			/** Proposal id to return. All by default. */
			proposalId?: number;
			/** Support choice to return. All by default. */
			supportChoice?: "AGAINST" | "FOR" | "ABSTAIN";
		}

		export interface OwnershipTransferredQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Previous owner address to return. All by default. */
			previousOwner?: string;
			/** New owner address to return. All by default. */
			newOwner?: string;
			/** An involved address to return, either the previousOwner, or newOwner. All by default. */
			involving?: string;
		}

		export interface ProposalCandidateCanceledQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Message sender address to return. All by default. */
			msgSender?: string;
			/** Slug to return. All by default. */
			slug?: string;
		}

		export interface ProposalCandidateCreatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Message sender address to return. All by default. */
			msgSender?: string;
			/** Slug to return. All by default. */
			slug?: string;
		}

		export interface ProposalCandidateUpdatedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Message sender address to return. All by default. */
			msgSender?: string;
			/** Slug to return. All by default. */
			slug?: string;
		}

		export interface SignatureAddedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
			/** Signer address to return. All by default. */
			signer?: string;
			/** Proposer address to return. All by default. */
			proposer?: string;
			/** An involved address to return, either the signer, or proposer. All by default. */
			involving?: string;
			/** Slug to return. All by default. */
			slug?: string;
		}

		export interface UpdateCandidateCostSetQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}

		export interface UpgradedQuery {
			/** Oldest block to return. Nouns starting block by default. */
			startBlock?: number;
			/** Newest block to return. Infinity by default. */
			endBlock?: number;
		}
	}
}
