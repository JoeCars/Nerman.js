import { ethers } from "ethers";

//=========================================
// Configuration Options
//=========================================

/** Configuration options for the Nouns class. */
export interface NounsOptions {
	/** The polling time in milliseconds. */
	pollingTime?: number;
	shouldIgnoreCacheInit?: boolean;
	/** Path to the indexer directory. */
	indexerDirectoryPath?: string;
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

export interface Event {
	blockNumber: number;
	blockHash: string;
	transactionHash: string;
}

export interface FormattedEvent {
	event: Event;
}

export type EventFormatter = (event: ethers.EventLog) => FormattedEvent;

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

	/** Emitted when withdrawing nouns from escrow increases adjusted total supply.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/2b17f53606878330ada2a4fddd06e94b02ea3a0c/packages/nouns-contracts/contracts/governance/fork/NounsDAOFork.sol#L186 | Github}
	 */
	export interface DAONounsSupplyIncreasedFromEscrow {
		/** The number of tokens withdrawn from Escrow and moved to another address. */
		numTokens: number;
		/** The address receiving the tokens. */
		to: Account;
		/** Event meta data. */
		event: Event;
	}

	/** DAOWithdrawNounsFromEscrow event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L191C9-L191C9 | Github}
	 */
	export interface DAOWithdrawNounsFromEscrow {
		/** List of tokens being withdrawn. */
		tokenIds: number[];
		/** Address withdrawing the tokens. */
		to: Account;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		event: Event;
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
		forkEndTimestamp: bigint;
		/** Tokens in escrow at the moment of the escrow. These are lost from the main treasury. */
		tokensInEscrow: bigint;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** ForkPeriodSet event data. Sets how much time a fork has to rejoin the DAO after it has been executed.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L533 | Github}
	 */
	export interface ForkPeriodSet {
		/** Old fork period in seconds.*/
		oldForkPeriod: bigint;
		/** New fork period in seconds. */
		newForkPeriod: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** ForkThresholdSet event data. Sets the threshold of Nouns in escrow needed to execute a fork.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L551 | Github}
	 */
	export interface ForkThresholdSet {
		/** The old token amount needed to successfully fork the DAO. A percentage of the token supply. */
		oldForkThreshold: bigint;
		/** The new token amount needed to successfully fork the DAO. A percentage of the token supply. */
		newForkThreshold: bigint;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** LastMinuteWindowSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L229 | Github}
	 */
	export interface LastMinuteWindowSet {
		/** Old objection period last minute window. */
		oldLastMinuteWindowInBlocks: bigint;
		/** New objection period last minute window. */
		newLastMinuteWindowInBlocks: bigint;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		event: Event;
	}

	/** NewAdmin event data. Transfers admin rights. Emitted when pendingAdmin is accepted, which means admin is updated
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L276 | Github}
	 */
	export interface NewAdmin {
		/** Old admin address. */
		oldAdmin?: Account;
		/** New admin address. */
		newAdmin: Account;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** NewPendingAdmin event data. Offers the admin position to a new address. The new address must accept it to become an admin. Emitted when pendingAdmin is changed
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L261 | Github}
	 */
	export interface NewPendingAdmin {
		/** Old pending admin address. */
		oldPendingAdmin?: Account;
		/** New pending admin address. */
		newPendingAdmin: Account;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		event: Event;
	}

	/** ObjectionPeriodDurationSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L212 | Github}
	 */
	export interface ObjectionPeriodDurationSet {
		/** Old objection period in blocks. */
		oldObjectionPeriodDurationInBlocks: bigint;
		/** New objection period in blocks. */
		newObjectionPeriodDurationInBlocks: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** ProposalCanceled event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L571 | Github}
	 */
	export interface ProposalCanceled {
		/** id of the proposal being cancelled. */
		id: number;
		/** Event meta data. */
		event: Event;
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
		values: bigint[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
		calldatas: any[]; // type is bytes[]
		/** The block voting starts. */
		startBlock: bigint;
		/** The block voting ends. */
		endBlock: bigint;
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
		event: Event;
	}

	/** ProposalCreatedOnTimelockV1 event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L197 | Github}
	 */
	export interface ProposalCreatedOnTimelockV1 {
		/** id of the proposal created. */
		id: number;
		/** Event meta data. */
		event: Event;
	}

	export interface ProposalCreatedWithRequirementsV1 {
		/** id of the proposal created. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** Target addresses for proposal calls. */
		targets: string[];
		/** Eth values for proposal calls. */
		values: bigint[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
		calldatas: any[];
		/** The block voting starts. */
		startBlock: bigint;
		/** The block voting ends. */
		endBlock: bigint;
		/** The proposal threshold. */
		proposalThreshold: number;
		/** The quorum votes.*/
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
		event: Event;
	}

	export interface ProposalCreatedWithRequirementsV2 extends ProposalCreatedWithRequirementsV1 {}

	export interface ProposalCreatedWithRequirementsV3 {
		/** id of the proposal created. */
		id: number;
		/** Account of the proposer. */
		proposer: Account;
		/** List of signers. */
		signers: string[];
		/** Target addresses for proposal calls. */
		targets: string[];
		/** Eth values for proposal calls. */
		values: bigint[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
		calldatas: any[];
		/** The block voting starts. */
		startBlock: bigint;
		/** The block voting ends. */
		endBlock: bigint;
		/** Period where the proposal is updatable. */
		updatePeriodEndBlock: bigint;
		/** The proposal threshold. */
		proposalThreshold: number;
		/** The quorum votes. */
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
		event: Event;
	}

	/**
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/2b17f53606878330ada2a4fddd06e94b02ea3a0c/packages/nouns-contracts/contracts/governance/NounsDAOProposals.sol#L952 | Github}
	 */
	export interface ProposalCreatedWithRequirements {
		/** id of the proposal created. */
		id: number;
		/** List of signers. */
		signers: string[];
		/** Period where the proposal is updatable. */
		updatePeriodEndBlock: bigint;
		/** The proposal threshold. */
		proposalThreshold: number;
		/** The quorum votes.*/
		quorumVotes: number;
		/** The client id. */
		clientId: number;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** ProposalExecuted event data. Executes a fork that is currently queued. Not possible during forking period.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L495 | Github}
	 */
	export interface ProposalExecuted {
		/** id of the proposal executed. */
		id: number;
		/** Event meta data. */
		event: Event;
	}

	/** ProposalObjectionPeriodSet event data. A last minute FOR vote that changes the proposal from defeated to succeeded will trigger this event. Extends voting time.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L210 | Github}
	 */
	export interface ProposalObjectionPeriodSet {
		/** id of the proposal. */
		id: number;
		/** Objection end block. */
		objectionPeriodEndBlock: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** ProposalQueued event data. A proposal that was successful during the voting period is queued. An event emitted when a proposal has been queued in the NounsDAOExecutor.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L438 | Github }
	 */
	export interface ProposalQueued {
		/** id of the proposal. */
		id: number;
		/** Block number signifying end of the queued period. The proposal can be executed once this is over. */
		eta: bigint;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		values: bigint[];
		/** Function signatures for proposal calls. */
		signatures: string[];
		/** Calldatas for proposal calls. */
		calldatas: any[];
		/** The reason for the update. */
		updateMessage: string;
		/** Event meta data. */
		event: Event;
	}

	/** ProposalUpdatablePeriodSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L243 | Github}
	 */
	export interface ProposalUpdatablePeriodSet {
		/** The old proposal updatable period in blocks. */
		oldProposalUpdatablePeriodInBlocks: bigint;
		/** The new proposal updatable period in blocks. */
		newProposalUpdatablePeriodInBlocks: bigint;
		/** Event meta data. */
		event: Event;
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
		values: bigint[];
		/** Updated function signatures for proposal calls. */
		signatures: string[];
		/** Updated calldatas for proposal calls. */
		calldatas: any[];
		/** Updated proposal description. */
		description: string;
		/** Message explaining the update. */
		updateMessage: string;
		/** Event meta data. */
		event: Event;
	}

	/** ProposalVetoed event data. Vetoes a proposal that has not been executed.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L536 | Github}
	 */
	export interface ProposalVetoed {
		/** id of the proposal. */
		id: number;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		event: Event;
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
		event: Event;
	}

	/** RefundableVote event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L295 | Github}
	 */
	export interface RefundableVote {
		/** The voter account. */
		voter: Account;
		/** The refund amount. */
		refundAmount: bigint;
		/** Whether the refund was sent or not. */
		refundSent: boolean;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		event: Event;
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
		event: Event;
	}

	/**
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/2b17f53606878330ada2a4fddd06e94b02ea3a0c/packages/nouns-contracts/contracts/governance/NounsDAOVotes.sol#L133 | Github}
	 */
	export interface VoteCastWithClientId {
		/** Voter address. */
		voter: Account;
		/** Proposal voted on. */
		proposalId: number;
		/** Client id voted from. */
		clientId: number;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** VotingDelaySet event data. Voting delay is the time before voting begins, in blocks.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L162 | Github}
	 */
	export interface VotingDelaySet {
		/** The old voting delay in blocks. */
		oldVotingDelay: bigint;
		/** The new voting delay in blocks. */
		newVotingDelay: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** VotingPeriodSet event data. Voting period is how long voting lasts, in blocks.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L177 | Github}
	 */
	export interface VotingPeriodSet {
		/** The old voting period in blocks. */
		oldVotingPeriod: bigint;
		/** The new voting period in blocks. */
		newVotingPeriod: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** Withdraw event data. Withdraws all the eth in the contract.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L468 | Github}
	 */
	export interface Withdraw {
		/** The amount withdrawn. */
		amount: bigint;
		/** Whether the withdrawn amount was sent. */
		sent: boolean;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		amount: bigint;
		/** Bidder account. */
		bidder: Account;
		/** Whether the bid was received within the end time buffer, thus extending the auction. */
		extended: boolean;
		/** Event meta data. */
		event: Event;
	}

	/**
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/2b17f53606878330ada2a4fddd06e94b02ea3a0c/packages/nouns-contracts/contracts/NounsAuctionHouseV2.sol#L154 | Github}
	 */
	export interface AuctionBidWithClientId {
		/** Noun token id. */
		id: number;
		/** The bid amount in wei. */
		amount: bigint;
		/** The client id. */
		clientId: number;
		/** Event meta data. */
		event: Event;
	}

	/** AuctionCreated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L197 | Github}
	 */
	export interface AuctionCreated {
		/** Noun token id. */
		id: number;
		/** Auction starting time as seconds since unix epoch. */
		startTime: bigint;
		/** Auction ending time as seconds since unix epoch. */
		endTime: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** AuctionExtended event data. Happens whenever a bid comes in within the end buffer of the auction.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L104 | Github}
	 */
	export interface AuctionExtended {
		/** Noun token id. */
		id: number;
		/** New auction end time as seconds since unix epoch. */
		endTime: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** AuctionMinBidIncrementPercentageUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L185 | Github}
	 */
	export interface AuctionMinBidIncrementPercentageUpdated {
		/** New auction minimum bid increment percentage. */
		minBidIncrementPercentage: number;
		/** Event meta data. */
		event: Event;
	}

	/** AuctionReservePriceUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L175 | Github}
	 */
	export interface AuctionReservePriceUpdated {
		/** New auction reserve price. */
		reservePrice: bigint;
		/** Event meta data. */
		event: Event;
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
		amount: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/nouns-monorepo/blob/2b17f53606878330ada2a4fddd06e94b02ea3a0c/packages/nouns-contracts/contracts/NounsAuctionHouseV2.sol#L298 | Github} */
	export interface AuctionSettledWithClientId {
		/** Noun token id. */
		id: number;
		/** Client id. */
		clientId: number;
		/** Event meta data. */
		event: Event;
	}

	/** AuctionTimeBufferUpdated event data. The time buffer that extends an auction.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L165 | Github}
	 */
	export interface AuctionTimeBufferUpdated {
		/** New time buffer. */
		timeBuffer: bigint;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** Paused event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L144 | Github}
	 */
	export interface Paused {
		/** Address paused. */
		address: Account;
		/** Event meta data. */
		event: Event;
	}

	/** Unpaused event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L153 | Github}
	 */
	export interface Unpaused {
		/** Address unpaused. */
		address: Account;
		/** Event meta data. */
		event: Event;
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
		/** Number of votes delegated. */
		numOfVotesChanged?: number;
		/** Event meta data. */
		event: Event;
	}

	/** DelegateVotesChanged event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721Checkpointable.sol#L232 | Github}
	 */
	export interface DelegateVotesChanged {
		/** Delegate account. */
		delegate: Account;
		/** Previous voting power. */
		previousBalance: bigint;
		/** New voting power. */
		newBalance: bigint;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		event: Event;
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
		event: Event;
	}

	/** DescriptorLocked event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L226 | Github}
	 */
	export interface DescriptorLocked {
		/** Event meta data. */
		event: Event;
	}

	/** DescriptorUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L216 | Github}
	 */
	export interface DescriptorUpdated {
		/** New token URI descriptor. */
		descriptor: Account;
		/** Event meta data. */
		event: Event;
	}

	/** MinterLocked event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L206 | Github}
	 */
	export interface MinterLocked {
		/** Event meta data. */
		event: Event;
	}

	/** MinterUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L196 | Github}
	 */
	export interface MinterUpdated {
		/** Token minter. */
		minter: Account;
		/** Event meta data. */
		event: Event;
	}

	/** NounBurned event data. Burns a noun. Happens when an auction has no bids.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L159 | Github}
	 */
	export interface NounBurned {
		/** Noun token id. */
		id: number;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** NoundersDAOUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L186 | Github}
	 */
	export interface NoundersDAOUpdated {
		/** Nounders DAO. */
		noundersDAO: Account;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** SeederLocked event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L246 | Github}
	 */
	export interface SeederLocked {
		/** Event meta data. */
		event: Event;
	}

	/** SeederUpdated event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L236 | Github}
	 */
	export interface SeederUpdated {
		/** Token seeder. */
		seeder: Account;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** BeaconUpgraded event data.
	 * In ABI but not in contract.
	 */
	export interface BeaconUpgraded {
		/** Beacon. */
		beacon: Account;
		/** Event meta data. */
		event: Event;
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
		event: Event;
	}

	/** CreateCandidateCostSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L297 | Github}
	 */
	export interface CreateCandidateCostSet {
		/** Old cost of creating candidate proposal. */
		oldCreateCandidateCost: bigint;
		/** New cost of creating candidate proposal. */
		newCreateCandidateCost: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** ETHWithdrawn event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L323C9-L323C9 | Github}
	 */
	export interface ETHWithdrawn {
		/** Amount recipient. */
		to: Account;
		/** Amount of eth withdrawn in wei. */
		amount: bigint;
		/** Event meta data. */
		event: Event;
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
		event: Event;
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
		event: Event;
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
		event: Event;
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
		event: Event;
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
		values: bigint[];
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
		event: Event;
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
		values: bigint[];
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
		event: Event;
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
		expirationTimestamp: bigint;
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
		event: Event;
	}

	/** UpdateCandidateCostSet event data.
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L304 | Github}
	 */
	export interface UpdateCandidateCostSet {
		/** Old update cost. */
		oldUpdateCandidateCost: bigint;
		/** New update cost. */
		newUpdateCandidateCost: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** Upgraded event data.
	 * In ABI but not in contract.
	 */
	export interface Upgraded {
		/** Implementation. */
		implementation: Account;
		/** Event meta data. */
		event: Event;
	}

	// ******************************************
	//
	// Contract - NounsDaoExecutor
	//
	// ******************************************

	/**
	 * {@link https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L164 | Github}
	 */
	export interface CancelTransaction {
		/** Transaction hash. */
		txHash: string;
		/** Transaction target. */
		target: Account;
		/** Transaction value. */
		value: bigint;
		/** Transaction signature. */
		signature: string;
		/** Transaction data. */
		data: string;
		/** Transaction eta. */
		eta: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L232 | Github} */
	export interface ERC20Sent {
		/** Token recipient. */
		to: Account;
		/** Contract address of token being sent. */
		erc20Token: Account;
		/** Amount of tokens sent. */
		amount: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L220 | Github} */
	export interface ETHSent {
		/** Eth recipient. */
		to: Account;
		/** Eth amount. */
		amount: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L201 | Github} */
	export interface ExecuteTransaction {
		/** Transaction hash. */
		txHash: string;
		/** Transaction target. */
		target: Account;
		/** Transaction value. */
		value: bigint;
		/** Transaction signature. */
		signature: string;
		/** Transaction data. */
		data: string;
		/** Transaction eta. */
		eta: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L111 | Github} */
	export interface NewDelay {
		/** Delay as a timestamp between 2 to 30 days, indicating when a queued transaction will be executed. */
		newDelay: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L148 | Github} */
	export interface QueueTransaction {
		/** Transaction hash. */
		txHash: string;
		/** Transaction target. */
		target: Account;
		/** Transaction value. */
		value: bigint;
		/** Transaction signature. */
		signature: string;
		/** Transaction data. */
		data: string;
		/** Transaction eta. */
		eta: bigint;
		/** Event meta data. */
		event: Event;
	}

	// ******************************************
	//
	// Contract - Payer
	//
	// ******************************************

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/Payer.sol#L139 | Github} */
	export interface PaidBackDebt {
		/** Account owed debt. */
		account: Account;
		/** Amount of debt paid. */
		amount: bigint;
		/** Remaining debt amount. */
		remainingDebt: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/Payer.sol#L233 | Github} */
	export interface RegisteredDebt {
		/** Account owed debt. */
		account: Account;
		/** Amount of debt owed. */
		amount: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/Payer.sol#L122 | Github} */
	export interface TokensWithdrawn {
		/** Payer contract owner address. */
		account: Account;
		/** Total amount of tokens withdrawn to the owner. */
		amount: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L393 | Github} */
	export interface AdminSet {
		/** Old admin. */
		oldAdmin: Account;
		/** New admin. */
		newAdmin: Account;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L354 | Github} */
	export interface BaselinePaymentTokenAmountSet {
		/** Old token baseline in token decimals. */
		oldAmount: bigint;
		/** New token baseline in token decimals. */
		newAmount: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L338 | Github} */
	export interface BotDiscountBPsSet {
		/** Old bot discount bps. */
		oldBPs: number;
		/** New bot discount bps. */
		newBPs: number;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L430 | Github} */
	export interface MaxAdminBaselinePaymentTokenAmountSet {
		/** Old maximum permitted token baseline. */
		oldAmount: bigint;
		/** New maximum permitted token baseline. */
		newAmount: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L413 | Github} */
	export interface MaxAdminBotDiscountBPsSet {
		/** Old maximum bot discount bps. */
		oldBPs: number;
		/** New maximum bot discount bps. */
		newBPs: number;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L420 | Github} */
	export interface MinAdminBaselinePaymentTokenAmountSet {
		/** Old minimum permitted token baseline. */
		oldAmount: bigint;
		/** New minimum permitted token baseline. */
		newAmount: bigint;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L406 | Github} */
	export interface MinAdminBotDiscountBPsSet {
		/** Old minimum bot discount bps. */
		oldBPs: number;
		/** New minimum bot discount bps. */
		newBPs: number;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L447 | Github} */
	export interface PayerSet {
		/** Old payer contract address. */
		oldPayer: Account;
		/** New payer contract address. */
		newPayer: Account;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L440 | Github} */
	export interface PriceFeedSet {
		/** Old price feed address. */
		oldFeed: Account;
		/** New price feed address. */
		newFeed: Account;
		/** Event meta data. */
		event: Event;
	}

	/** {@link https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/TokenBuyer.sol#L186 | Github} */
	export interface SoldETH {
		/** Eth recipient. */
		to: Account;
		/** Amount of eth being sent to the recipients. */
		ethOut: bigint;
		/** The amount of ERC20 tokens being sold to the token buyer contract. */
		tokenIn: bigint;
		/** Event meta data. */
		event: Event;
	}

	// ******************************************
	//
	// Contract - Rewards
	//
	// ******************************************\

	export interface ClientRegistered {
		clientId: number;
		name: string;
		description: string;
		event: Event;
	}

	export interface ClientUpdated {
		clientId: number;
		name: string;
		description: string;
		event: Event;
	}

	export interface ClientRewarded {
		clientId: number;
		amount: bigint;
		event: Event;
	}

	export interface ClientBalanceWithdrawal {
		clientId: number;
		amount: bigint;
		to: Account;
		event: Event;
	}

	export interface AuctionRewardsUpdated {
		firstAuctionId: number;
		lastAuctionId: number;
		event: Event;
	}

	export interface ProposalRewardsUpdated {
		firstProposalId: number;
		lastProposalId: number;
		firstAuctionIdForRevenue: number;
		lastAuctionIdForRevenue: number;
		auctionRevenue: bigint;
		rewardPerProposal: bigint;
		rewardPerVote: bigint;
		event: Event;
	}

	export interface ClientApprovalSet {
		clientId: number;
		approved: boolean;
		event: Event;
	}

	export interface AuctionRewardsEnabled {
		nextAuctionIdToReward: number;
		event: Event;
	}

	export interface AuctionRewardsDisabled {
		event: Event;
	}

	export interface ProposalRewardsEnabled {
		nextProposalIdToReward: number;
		nextProposalRewardFirstAuctionId: number;
		event: Event;
	}

	export interface ProposalRewardsDisabled {
		event: Event;
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
			/** User's real address if true. */
			doxed: boolean;
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
		/** BidPlaced event data.
		 * {@link https://github.com/nounish/federation/blob/6360984278f017f182290facb0dc665c2b7108ad/contracts/src/experimental/delegate-bid.sol#L138 | Github}
		 */
		export interface BidPlaced {
			/** The address of the DAO. */
			dao: Account;
			/** Proposal being bid on. */
			propId: number;
			/** The bidder's stance on the proposal. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively). */
			support: number;
			/** The amount bid, in wei. */
			amount: bigint;
			/** The bidder account address. */
			bidder: Account;
			/** The reason for the bid. */
			reason?: string;
			/** Event meta data. */
			event: Event;
		}

		/** VoteCast event data.
		 * {@link https://github.com/nounish/federation/blob/6360984278f017f182290facb0dc665c2b7108ad/contracts/src/experimental/delegate-bid.sol#L188C1-L188C1 | Github}
		 */
		export interface VoteCast {
			/** The address of the DAO. */
			dao: Account;
			/** Proposal that Federation is voting on. */
			propId: number;
			/** The direction of the vote. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively). */
			support: number;
			/** The winning bid amount, in wei. */
			amount: bigint;
			/** The winning bidder account address. */
			bidder: Account;
			/** Event meta data. */
			event: Event;
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
			event: Event;
		}

		/** OwnershipTransferStarted event data. */
		export interface OwnershipTransferStarted {
			/** Old owner. */
			previousOwner: Account;
			/** New owner. */
			newOwner: Account;
			/** Event meta data. */
			event: Event;
		}

		/** OwnershipTransferred event data. */
		export interface OwnershipTransferred {
			/** Old owner. */
			previousOwner: Account;
			/** New owner. */
			newOwner: Account;
			/** Event meta data. */
			event: Event;
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
			event: Event;
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
			event: Event;
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
			event: Event;
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
			event: Event;
		}

		/** SuperAdminTransferred event data. */
		export interface SuperAdminTransferred {
			/** Old super admin. */
			oldSuperAdmin: Account;
			/** New super admin. */
			newSuperAdmin: Account;
			/** Event meta data. */
			event: Event;
		}

		/** Upgraded event data. */
		export interface Upgraded {
			/** Upgraded implementation address. */
			implementation: Account;
			/** Event meta data. */
			event: Event;
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
			event: Event;
		}

		/** NounsDAOUpdated event data. */
		export interface NounsDAOUpdated {
			/** Nouns DAO. */
			nounsDAO: Account;
			/** Event meta data. */
			event: Event;
		}
	}

	// ******************************************
	//
	// Farcaster
	//
	// ******************************************
	export namespace Farcaster {
		type CastId = {
			/** User id. */
			fid: number;
			/** Cast hash. */
			hash: string;
		};

		type Embed = {
			/** Embed URL */
			url: string;
			/** Cast id embedded. */
			castId?: CastId;
		};

		/** NounsCast event data. */
		export interface NounsCast {
			/** List of embeds within the cast. */
			embeds: Embed[];
			/** User ids mentioned. */
			mentions: number[];
			/** Position of mentions. */
			mentionsPositions: number[];
			/** Parent cast id. */
			parentCastId?: CastId;
			/** Parent url. Used for channels. */
			parentUrl?: string;
			/** Cast text. */
			text: string;
			/** Author username. */
			author: string;
			/** Event meta data. */
			event: {
				/** Cast hash. */
				hash: string;
				/** Signature. */
				signature: string;
				/** Signer. */
				signer: string;
				/** User id. */
				fid: number;
				/** Network. */
				network: string;
				/** Timestamp. Order of the casts. Does not convert to actual time. */
				timestamp: number;
				/** Event type. */
				type: string;
			};
		}
	}

	// ******************************************
	//
	// Snapshot
	//
	// ******************************************
	export namespace Snapshot {
		/** Snapshot Proposal object. */
		export interface Proposal {
			/** The unique ID for the proposal. */
			id: string;
			/** Proposal's title. */
			title: string;
			/** Proposal's body. */
			body: string;
			/** Voting choices available in proposal. */
			choices: string[];
			/** Proposal voting start time, in seconds since unix epoch. */
			startTime: number;
			/** Proposal voting end time, in seconds since unix epoch. */
			endTime: number;
			/** The time at which the proposal was created, in seconds since unix epoch. */
			createdTime: number;
			/** Ethereum block number when the voting power snapshot was taken. */
			snapshot: string;
			/** Proposal's current state. */
			state: "pending" | "active" | "closed";
			/** Proposer's wallet. */
			author: Account;
			/** Proposal's quorum. */
			quorum: number;
			/** Proposal's scores for each choice. */
			scores: number[];
			/** Total number of votes cast (different from the total score). The number of unique voters. */
			votes: number;
			/** The Snapshot space the proposal is a part of. */
			space: {
				/** The space id. An ENS. */
				id: string;
				/** The space name. */
				name: string;
			};
		}

		/** Snapshot Vote object. */
		export interface Vote {
			/** Unique vote ID. */
			id: string;
			/** Voter wallet address. */
			voter: Account;
			/** Voter voting power. Is based on the voting strategy used. */
			votingPower: number;
			/** The time the vote was cast, in seconds since unix epoch. */
			created: number;
			/** Which proposal choice was selected. This is the associated index number. 0 based. */
			choice: number;
			/** Reason for the vote. */
			reason: string;
			/** The Snapshot space the proposal voted on is a part of. */
			space: {
				/** The space id. An ENS. */
				id: string;
				/** The space name. */
				name: string;
			};
			/** The proposal being voted on. */
			proposal: {
				/** The unique ID for the proposal. */
				id: string;
				/** Proposal's title. */
				title: string;
				/** Voting choices available in proposal. */
				choices: string[];
				/** Proposal's quorum. */
				quorum: number;
				/** Proposal's scores for each choice. */
				scores: number[];
				/** Total number of votes cast (different from the total score). The number of unique voters. */
				votes: number;
			};
		}
	}
}

//=========================================
// Index Types
//=========================================

/** Types related to the indexer. Including events and queries. */
export namespace Indexer {
	/** NounsDAO Indexer types. */
	export namespace NounsDAO {
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
