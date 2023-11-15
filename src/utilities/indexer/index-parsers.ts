import { ethers } from "ethers";

import { Indexer } from "../../types";

//=======================================
// NounsDAO
//=======================================

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DAOWithdrawNounsFromEscrow event.
 * @returns Formatted DAOWithdrawNounsFromEscrow event.
 */
export function parseDAOWithdrawNounsFromEscrowEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		tokenIds: event.args!.tokenIds,
		to: event.args!.to
	} as Indexer.NounsDAO.DAOWithdrawNounsFromEscrow;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ERC20TokensToIncludeInForkSet event.
 * @returns Formatted ERC20TokensToIncludeInForkSet event.
 */
export function parseERC20TokensToIncludeInForkSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldErc20Tokens: event.args!.oldErc20Tokens,
		newErc20tokens: event.args!.newErc20tokens
	} as Indexer.NounsDAO.ERC20TokensToIncludeInForkSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain EscrowedToFork event.
 * @returns Formatted EscrowedToFork event.
 */
export function parseEscrowedToForkEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		forkId: Number(event.args!.forkId),
		owner: event.args!.owner,
		tokenIds: event.args!.tokenIds,
		proposalIds: event.args!.proposalIds,
		reason: event.args!.reason
	} as Indexer.NounsDAO.EscrowedToFork;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ExecuteFork event.
 * @returns Formatted ExecuteFork event.
 */
export function parseExecuteForkEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		forkId: Number(event.args!.forkId),
		forkTreasury: event.args!.forkTreasury,
		forkToken: event.args!.forkToken,
		forkEndTimestamp: event.args!.forkEndTimestamp,
		tokensInEscrow: event.args!.tokensInEscrow
	} as Indexer.NounsDAO.ExecuteFork;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ForkDAODeployerSet event.
 * @returns Formatted ForkDAODeployerSet event.
 */
export function parseForkDAODeployerSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldForkDAODeployer: event.args!.oldForkDAODeployer,
		newForkDAODeployer: event.args!.newForkDAODeployer
	} as Indexer.NounsDAO.ForkDAODeployerSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ForkPeriodSet event.
 * @returns Formatted ForkPeriodSet event.
 */
export function parseForkPeriodSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldForkPeriod: event.args!.oldForkPeriod,
		newForkPeriod: event.args!.newForkPeriod
	} as Indexer.NounsDAO.ForkPeriodSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ForkThresholdSet event.
 * @returns Formatted ForkThresholdSet event.
 */
export function parseForkThresholdSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldForkThreshold: event.args!.oldForkThreshold,
		newForkThreshold: event.args!.newForkThreshold
	} as Indexer.NounsDAO.ForkThresholdSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain JoinFork event.
 * @returns Formatted JoinFork event.
 */
export function parseJoinForkEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		forkId: Number(event.args!.forkId),
		owner: event.args!.owner,
		tokenIds: event.args!.tokenIds,
		proposalIds: event.args!.proposalIds,
		reason: event.args!.reason
	} as Indexer.NounsDAO.JoinFork;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain LastMinuteWindowSet event.
 * @returns Formatted LastMinuteWindowSet event.
 */
export function parseLastMinuteWindowSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldLastMinuteWindowInBlocks: Number(event.args!.oldLastMinuteWindowInBlocks),
		newLastMinuteWindowInBlocks: Number(event.args!.newLastMinuteWindowInBlocks)
	} as Indexer.NounsDAO.LastMinuteWindowSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain MaxQuorumVotesBPSSet event.
 * @returns Formatted MaxQuorumVotesBPSSet event.
 */
export function parseMaxQuorumVotesBPSSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldMaxQuorumVotesBPS: Number(event.args!.oldMaxQuorumVotesBPS),
		newMaxQuorumVotesBPS: Number(event.args!.newMaxQuorumVotesBPS)
	} as Indexer.NounsDAO.MaxQuorumVotesBPSSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain MinQuorumVotesBPSSet event.
 * @returns Formatted MinQuorumVotesBPSSet event.
 */
export function parseMinQuorumVotesBPSSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldMinQuorumVotesBPS: Number(event.args!.oldMinQuorumVotesBPS),
		newMinQuorumVotesBPS: Number(event.args!.newMinQuorumVotesBPS)
	} as Indexer.NounsDAO.MinQuorumVotesBPSSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewAdmin event.
 * @returns Formatted NewAdmin event.
 */
export function parseNewAdminEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldAdmin: event.args!.oldAdmin,
		newAdmin: event.args!.newAdmin
	} as Indexer.NounsDAO.NewAdmin;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewImplementation event.
 * @returns Formatted NewImplementation event.
 */
export function parseNewImplementationEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldImplementation: event.args!.oldImplementation,
		newImplementation: event.args!.newImplementation
	} as Indexer.NounsDAO.NewImplementation;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewPendingAdmin event.
 * @returns Formatted NewPendingAdmin event.
 */
export function parseNewPendingAdminEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldPendingAdmin: event.args!.oldPendingAdmin,
		newPendingAdmin: event.args!.newPendingAdmin
	} as Indexer.NounsDAO.NewPendingAdmin;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewPendingVetoer event.
 * @returns Formatted NewPendingVetoer event.
 */
export function parseNewPendingVetoerEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldPendingVetoer: event.args!.oldPendingVetoer,
		newPendingVetoer: event.args!.newPendingVetoer
	} as Indexer.NounsDAO.NewPendingVetoer;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewVetoer event.
 * @returns Formatted NewVetoer event.
 */
export function parseNewVetoerEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldVetoer: event.args!.oldVetoer,
		newVetoer: event.args!.newVetoer
	} as Indexer.NounsDAO.NewVetoer;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ObjectionPeriodDurationSet event.
 * @returns Formatted ObjectionPeriodDurationSet event.
 */
export function parseObjectionPeriodDurationSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldObjectionPeriodDurationInBlocks: Number(event.args!.oldObjectionPeriodDurationInBlocks),
		newObjectionPeriodDurationInBlocks: Number(event.args!.newObjectionPeriodDurationInBlocks)
	} as Indexer.NounsDAO.ObjectionPeriodDurationSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCanceled event.
 * @returns Formatted ProposalCanceled event.
 */
export function parseProposalCanceledEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: Number(event.args!.id),
		status: "Cancelled"
	} as Indexer.NounsDAO.ProposalCanceled;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCreated event.
 * @returns Formatted ProposalCreated event.
 */
export function parseProposalCreatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		id: Number(event.args!.id),
		proposer: event.args!.proposer,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		startBlock: Number(event.args!.startBlock),
		endBlock: Number(event.args!.endBlock),
		description: event.args!.description
	} as Indexer.NounsDAO.ProposalCreated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCreatedOnTimelockV1 event.
 * @returns Formatted ProposalCreatedOnTimelockV1 event.
 */
export function parseProposalCreatedOnTimelockV1Event(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		id: Number(event.args!.id)
	} as Indexer.NounsDAO.ProposalCreatedOnTimelockV1;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCreatedWithRequirements event.
 * @returns Formatted ProposalCreatedWithRequirements event.
 */
export function parseProposalCreatedWithRequirementsEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		id: Number(event.args!.id),
		proposer: event.args!.proposer,
		signers: event.args!.signers,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		startBlock: Number(event.args!.startBlock),
		endBlock: Number(event.args!.endBlock),
		updatePeriodEndBlock: Number(event.args!.updatePeriodEndBlock),
		proposalThreshold: Number(event.args!.proposalThreshold),
		quorumVotes: Number(event.args!.quorumVotes),
		description: event.args!.description
	} as Indexer.NounsDAO.ProposalCreatedWithRequirements;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalDescriptionUpdated event.
 * @returns Formatted ProposalDescriptionUpdated event.
 */
export function parseProposalDescriptionUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		id: Number(event.args!.id),
		proposer: event.args!.proposer,
		description: event.args!.description,
		updatedMessage: event.args!.updatedMessage
	} as Indexer.NounsDAO.ProposalDescriptionUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalExecuted event.
 * @returns Formatted ProposalExecuted event.
 */
export function parseProposalExecutedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: Number(event.args!.id),
		status: "Executed"
	} as Indexer.NounsDAO.ProposalExecuted;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalObjectionPeriodSet event.
 * @returns Formatted ProposalObjectionPeriodSet event.
 */
export function parseProposalObjectionPeriodSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: Number(event.args!.id),
		objectionPeriodEndBlock: event.args!.objectionPeriodEndBlock
	} as Indexer.NounsDAO.ProposalObjectionPeriodSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalQueued event.
 * @returns Formatted ProposalQueued event.
 */
export function parseProposalQueuedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: Number(event.args!.id),
		eta: Number(event.args!.eta),
		status: "Queued"
	} as Indexer.NounsDAO.ProposalQueued;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalThresholdBPSSet event.
 * @returns Formatted ProposalThresholdBPSSet event.
 */
export function parseProposalThresholdBPSSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldProposalThresholdBPS: Number(event.args!.oldProposalThresholdBPS),
		newProposalThresholdBPS: Number(event.args!.newProposalThresholdBPS)
	} as Indexer.NounsDAO.ProposalThresholdBPSSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalTransactionsUpdated event.
 * @returns Formatted ProposalTransactionsUpdated event.
 */
export function parseProposalTransactionsUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		id: Number(event.args!.id),
		proposer: event.args!.proposer,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		updateMessage: event.args!.updateMessage
	} as Indexer.NounsDAO.ProposalTransactionsUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalUpdatablePeriodSet event.
 * @returns Formatted ProposalUpdatablePeriodSet event.
 */
export function parseProposalUpdatablePeriodSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldProposalUpdatablePeriodInBlocks: Number(event.args!.oldProposalUpdatablePeriodInBlocks),
		newProposalUpdatablePeriodInBlocks: Number(event.args!.newProposalUpdatablePeriodInBlocks)
	} as Indexer.NounsDAO.ProposalUpdatablePeriodSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalUpdated event.
 * @returns Formatted ProposalUpdated event.
 */
export function parseProposalUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		id: Number(event.args!.id),
		proposer: event.args!.proposer,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		description: event.args!.description,
		updateMessage: event.args!.updateMessage
	} as Indexer.NounsDAO.ProposalUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalVetoed event.
 * @returns Formatted ProposalVetoed event.
 */
export function parseProposalVetoedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		proposalId: Number(event.args!.id),
		status: "Vetoed"
	} as Indexer.NounsDAO.ProposalVetoed;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain QuorumCoefficientSet event.
 * @returns Formatted QuorumCoefficientSet event.
 */
export function parseQuorumCoefficientSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldQuorumCoefficient: Number(event.args!.oldQuorumCoefficient),
		newQuorumCoefficient: Number(event.args!.newQuorumCoefficient)
	} as Indexer.NounsDAO.QuorumCoefficientSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain QuorumVotesBPSSet event.
 * @returns Formatted QuorumVotesBPSSet event.
 */
export function parseQuorumVotesBPSSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldQuorumVotesBPS: Number(event.args!.oldQuorumVotesBPS),
		newQuorumVotesBPS: Number(event.args!.newQuorumVotesBPS)
	} as Indexer.NounsDAO.QuorumVotesBPSSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain RefundableVote event.
 * @returns Formatted RefundableVote event.
 */
export function parseRefundableVoteEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		voter: event.args!.voter,
		refundAmount: Number(event.args!.refundAmount),
		refundSent: event.args!.refundSent
	} as Indexer.NounsDAO.RefundableVote;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain SignatureCancelled event.
 * @returns Formatted SignatureCancelled event.
 */
export function parseSignatureCancelledEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		signer: event.args!.signer,
		sig: event.args!.sig
	} as Indexer.NounsDAO.SignatureCancelled;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain TimelocksAndAdminSet event.
 * @returns Formatted TimelocksAndAdminSet event.
 */
export function parseTimelocksAndAdminSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		timelock: event.args!.timelock,
		timelockV1: event.args!.timelockV1,
		admin: event.args!.admin
	} as Indexer.NounsDAO.TimelocksAndAdminSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain VoteCast event.
 * @returns Formatted VoteCast event.
 */
export function parseVoteCastEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		voterAddress: event.args!.voter,
		proposalId: Number(event.args!.proposalId),
		support: Number(event.args!.support),
		supportChoice: ["AGAINST", "FOR", "ABSTAIN"][event.args!.support],
		votes: Number(event.args!.votes),
		reason: event.args!.reason
	} as Indexer.NounsDAO.VoteCast;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain VoteSnapshotBlockSwitchProposalIdSet event.
 * @returns Formatted VoteSnapshotBlockSwitchProposalIdSet event.
 */
export function parseVoteSnapshotBlockSwitchProposalIdSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldVoteSnapshotBlockSwitchProposalId: Number(event.args!.oldVoteSnapshotBlockSwitchProposalId),
		newVoteSnapshotBlockSwitchProposalId: Number(event.args!.newVoteSnapshotBlockSwitchProposalId)
	} as Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain VotingDelaySet event.
 * @returns Formatted VotingDelaySet event.
 */
export function parseVotingDelaySetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldVotingDelay: Number(event.args!.oldVotingDelay),
		newVotingDelay: Number(event.args!.newVotingDelay)
	} as Indexer.NounsDAO.VotingDelaySet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain VotingPeriodSet event.
 * @returns Formatted VotingPeriodSet event.
 */
export function parseVotingPeriodSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldVotingPeriod: Number(event.args!.oldVotingPeriod),
		newVotingPeriod: Number(event.args!.newVotingPeriod)
	} as Indexer.NounsDAO.VotingPeriodSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Withdraw event.
 * @returns Formatted Withdraw event.
 */
export function parseWithdrawEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		amount: Number(event.args!.amount),
		sent: event.args!.sent
	} as Indexer.NounsDAO.Withdraw;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain WithdrawFromForkEscrow event.
 * @returns Formatted WithdrawFromForkEscrow event.
 */
export function parseWithdrawFromForkEscrowEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		forkId: Number(event.args!.forkId),
		owner: event.args!.owner,
		tokenIds: event.args!.tokenIds
	} as Indexer.NounsDAO.WithdrawFromForkEscrow;
}

/**
 * A map of supported events and their associated parsers.
 */
export const NOUNS_DAO_PARSERS = new Map<string, Function>();
NOUNS_DAO_PARSERS.set("DAOWithdrawNounsFromEscrow", parseDAOWithdrawNounsFromEscrowEvent);
NOUNS_DAO_PARSERS.set("ERC20TokensToIncludeInForkSet", parseERC20TokensToIncludeInForkSetEvent);
NOUNS_DAO_PARSERS.set("EscrowedToFork", parseEscrowedToForkEvent);
NOUNS_DAO_PARSERS.set("ExecuteFork", parseExecuteForkEvent);
NOUNS_DAO_PARSERS.set("ForkDAODeployerSet", parseForkDAODeployerSetEvent);
NOUNS_DAO_PARSERS.set("ForkPeriodSet", parseForkPeriodSetEvent);
NOUNS_DAO_PARSERS.set("ForkThresholdSet", parseForkThresholdSetEvent);
NOUNS_DAO_PARSERS.set("JoinFork", parseJoinForkEvent);
NOUNS_DAO_PARSERS.set("LastMinuteWindowSet", parseLastMinuteWindowSetEvent);
NOUNS_DAO_PARSERS.set("MaxQuorumVotesBPSSet", parseMaxQuorumVotesBPSSetEvent);
NOUNS_DAO_PARSERS.set("MinQuorumVotesBPSSet", parseMinQuorumVotesBPSSetEvent);
NOUNS_DAO_PARSERS.set("NewAdmin", parseNewAdminEvent);
NOUNS_DAO_PARSERS.set("NewImplementation", parseNewImplementationEvent);
NOUNS_DAO_PARSERS.set("NewPendingAdmin", parseNewPendingAdminEvent);
NOUNS_DAO_PARSERS.set("NewPendingVetoer", parseNewPendingVetoerEvent);
NOUNS_DAO_PARSERS.set("NewVetoer", parseNewVetoerEvent);
NOUNS_DAO_PARSERS.set("ObjectionPeriodDurationSet", parseObjectionPeriodDurationSetEvent);
NOUNS_DAO_PARSERS.set("ProposalCanceled", parseProposalCanceledEvent);
NOUNS_DAO_PARSERS.set("ProposalCreated", parseProposalCreatedEvent);
NOUNS_DAO_PARSERS.set("ProposalCreatedOnTimelockV1", parseProposalCreatedOnTimelockV1Event);
NOUNS_DAO_PARSERS.set(
	"ProposalCreatedWithRequirements(uint256,address,address[],address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,uint256,string)",
	parseProposalCreatedWithRequirementsEvent
);
NOUNS_DAO_PARSERS.set(
	"ProposalCreatedWithRequirements(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,string)",
	parseProposalCreatedWithRequirementsEvent
);
NOUNS_DAO_PARSERS.set("ProposalDescriptionUpdated", parseProposalDescriptionUpdatedEvent);
NOUNS_DAO_PARSERS.set("ProposalExecuted", parseProposalExecutedEvent);
NOUNS_DAO_PARSERS.set("ProposalObjectionPeriodSet", parseProposalObjectionPeriodSetEvent);
NOUNS_DAO_PARSERS.set("ProposalQueued", parseProposalQueuedEvent);
NOUNS_DAO_PARSERS.set("ProposalThresholdBPSSet", parseProposalThresholdBPSSetEvent);
NOUNS_DAO_PARSERS.set("ProposalTransactionsUpdated", parseProposalTransactionsUpdatedEvent);
NOUNS_DAO_PARSERS.set("ProposalUpdatablePeriodSet", parseProposalUpdatablePeriodSetEvent);
NOUNS_DAO_PARSERS.set("ProposalUpdated", parseProposalUpdatedEvent);
NOUNS_DAO_PARSERS.set("ProposalVetoed", parseProposalVetoedEvent);
NOUNS_DAO_PARSERS.set("QuorumCoefficientSet", parseQuorumCoefficientSetEvent);
NOUNS_DAO_PARSERS.set("QuorumVotesBPSSet", parseQuorumVotesBPSSetEvent);
NOUNS_DAO_PARSERS.set("RefundableVote", parseRefundableVoteEvent);
NOUNS_DAO_PARSERS.set("SignatureCancelled", parseSignatureCancelledEvent);
NOUNS_DAO_PARSERS.set("TimelocksAndAdminSet", parseTimelocksAndAdminSetEvent);
NOUNS_DAO_PARSERS.set("VoteCast", parseVoteCastEvent);
NOUNS_DAO_PARSERS.set("VoteSnapshotBlockSwitchProposalIdSet", parseVoteSnapshotBlockSwitchProposalIdSetEvent);
NOUNS_DAO_PARSERS.set("VotingDelaySet", parseVotingDelaySetEvent);
NOUNS_DAO_PARSERS.set("VotingPeriodSet", parseVotingPeriodSetEvent);
NOUNS_DAO_PARSERS.set("Withdraw", parseWithdrawEvent);
NOUNS_DAO_PARSERS.set("WithdrawFromForkEscrow", parseWithdrawFromForkEscrowEvent);

//=======================================
// NounsAuction
//=======================================

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionCreated event.
 * @returns Formatted AuctionCreated event.
 */
export function parseAuctionCreatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(event.args!.nounId),
		startTime: Number(event.args!.startTime),
		endTime: Number(event.args!.endTime)
	} as Indexer.NounsAuctionHouse.AuctionCreated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionBid event.
 * @returns Formatted AuctionBid event.
 */
export function parseAuctionBidEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(event.args!.nounId),
		bidderAddress: event.args!.sender,
		bidAmount: Number(event.args!.value),
		extended: event.args!.extended
	} as Indexer.NounsAuctionHouse.AuctionBid;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionExtended event.
 * @returns Formatted AuctionExtended event.
 */
export function parseAuctionExtendedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(event.args!.nounId),
		endTime: Number(event.args!.endTime)
	} as Indexer.NounsAuctionHouse.AuctionExtended;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionSettled event.
 * @returns Formatted AuctionSettled event.
 */
export function parseAuctionSettledEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(event.args!.nounId),
		winnerAddress: event.args!.winner,
		bidAmount: Number(event.args!.amount)
	} as Indexer.NounsAuctionHouse.AuctionSettled;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionTimeBufferUpdated event.
 * @returns Formatted AuctionTimeBufferUpdated event.
 */
export function parseAuctionTimeBufferUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		timeBuffer: Number(event.args!.timeBuffer)
	} as Indexer.NounsAuctionHouse.AuctionTimeBufferUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionReservePriceUpdated event.
 * @returns Formatted AuctionReservePriceUpdated event.
 */
export function parseAuctionReservePriceUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		reservePrice: Number(event.args!.reservePrice)
	} as Indexer.NounsAuctionHouse.AuctionReservePriceUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionMinBidIncrementPercentageUpdated event.
 * @returns Formatted AuctionMinBidIncrementPercentageUpdated event.
 */
export function parseAuctionMinBidIncrementPercentageUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		minBidIncrementPercentage: Number(event.args!.minBidIncrementPercentage)
	} as Indexer.NounsAuctionHouse.AuctionMinBidIncrementPercentageUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain OwnershipTransferred event.
 * @returns Formatted OwnershipTransferred event.
 */
export function parseOwnershipTransferredEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		previousOwner: event.args!.previousOwner,
		newOwner: event.args!.newOwner
	} as Indexer.NounsAuctionHouse.OwnershipTransferred;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Paused event.
 * @returns Formatted Paused event.
 */
export function parsePausedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		pauseAddress: event.args!.address
	} as Indexer.NounsAuctionHouse.Paused;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Unpaused event.
 * @returns Formatted Unpaused event.
 */
export function parseUnpausedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		unpauseAddress: event.args!.address
	} as Indexer.NounsAuctionHouse.Unpaused;
}

/**
 * A map of supported events and their associated parsers.
 */
export const NOUNS_AUCTION_PARSERS = new Map<string, Function>();
NOUNS_AUCTION_PARSERS.set("AuctionCreated", parseAuctionCreatedEvent);
NOUNS_AUCTION_PARSERS.set("AuctionBid", parseAuctionBidEvent);
NOUNS_AUCTION_PARSERS.set("AuctionExtended", parseAuctionExtendedEvent);
NOUNS_AUCTION_PARSERS.set("AuctionSettled", parseAuctionSettledEvent);
NOUNS_AUCTION_PARSERS.set("AuctionTimeBufferUpdated", parseAuctionTimeBufferUpdatedEvent);
NOUNS_AUCTION_PARSERS.set("AuctionReservePriceUpdated", parseAuctionReservePriceUpdatedEvent);
NOUNS_AUCTION_PARSERS.set("AuctionMinBidIncrementPercentageUpdated", parseAuctionMinBidIncrementPercentageUpdatedEvent);
NOUNS_AUCTION_PARSERS.set("OwnershipTransferred", parseOwnershipTransferredEvent);
NOUNS_AUCTION_PARSERS.set("Paused", parsePausedEvent);
NOUNS_AUCTION_PARSERS.set("Unpaused", parseUnpausedEvent);

//=======================================
// NounsToken
//=======================================

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DelegateChanged event.
 * @returns Formatted DelegateChanged event.
 */
export function parseDelegateChangedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		delegator: event.args!.delegator,
		fromDelegate: event.args!.fromDelegate,
		toDelegate: event.args!.toDelegate
	} as Indexer.NounsToken.DelegateChanged;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DelegateVotesChanged event.
 * @returns Formatted DelegateVotesChanged event.
 */
export function parseDelegateVotesChangedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		delegate: event.args!.delegate,
		previousBalance: Number(event.args!.previousBalance),
		newBalance: Number(event.args!.newBalance)
	} as Indexer.NounsToken.DelegateVotesChanged;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Transfer event.
 * @returns Formatted Transfer event.
 */
export function parseTransferEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		from: event.args!.from,
		to: event.args!.to,
		tokenId: Number(event.args!.tokenId)
	} as Indexer.NounsToken.Transfer;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Approval event.
 * @returns Formatted Approval event.
 */
export function parseApprovalEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		owner: event.args!.owner,
		approved: event.args!.approved,
		tokenId: Number(event.args!.tokenId)
	} as Indexer.NounsToken.Approval;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ApprovalForAll event.
 * @returns Formatted ApprovalForAll event.
 */
export function parseApprovalForAllEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		owner: event.args!.owner,
		operator: event.args!.operator,
		approved: event.args!.approved
	} as Indexer.NounsToken.ApprovalForAll;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NounCreated event.
 * @returns Formatted NounCreated event.
 */
export function parseNounCreatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		tokenId: Number(event.args!.tokenId),
		seed: {
			background: Number(event.args!.seed.background),
			body: Number(event.args!.seed.body),
			accessory: Number(event.args!.seed.accessory),
			head: Number(event.args!.seed.head),
			glasses: Number(event.args!.seed.glasses)
		}
	} as Indexer.NounsToken.NounCreated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DescriptorLocked event.
 * @returns Formatted DescriptorLocked event.
 */
export function parseDescriptorLockedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature
	} as Indexer.NounsToken.DescriptorLocked;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DescriptorUpdated event.
 * @returns Formatted DescriptorUpdated event.
 */
export function parseDescriptorUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		descriptor: event.args!._descriptor
	} as Indexer.NounsToken.DescriptorUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain MinterLocked event.
 * @returns Formatted MinterLocked event.
 */
export function parseMinterLockedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature
	} as Indexer.NounsToken.MinterLocked;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain MinterUpdated event.
 * @returns Formatted MinterUpdated event.
 */
export function parseMinterUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		minter: event.args!._minter
	} as Indexer.NounsToken.MinterUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NounBurned event.
 * @returns Formatted NounBurned event.
 */
export function parseNounBurnedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		nounId: Number(event.args!.nounId)
	} as Indexer.NounsToken.NounBurned;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NoundersDAOUpdated event.
 * @returns Formatted NoundersDAOUpdated event.
 */
export function parseNoundersDAOUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		noundersDAO: event.args!._noundersDAO
	} as Indexer.NounsToken.NoundersDAOUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain OwnershipTransferred event.
 * @returns Formatted OwnershipTransferred event.
 */
export function parseOwnershipTransferredEvent2(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		previousOwner: event.args!.previousOwner,
		newOwner: event.args!.newOwner
	} as Indexer.NounsAuctionHouse.OwnershipTransferred;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain SeederLocked event.
 * @returns Formatted SeederLocked event.
 */
export function parseSeederLockedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature
	} as Indexer.NounsToken.SeederLocked;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain SeederUpdated event.
 * @returns Formatted SeederUpdated event.
 */
export function parseSeederUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		seeder: event.args!._seeder
	} as Indexer.NounsToken.SeederUpdated;
}

/**
 * A map of supported events and their associated parsers.
 */
export const NOUNS_TOKEN_PARSERS = new Map<string, Function>();
NOUNS_TOKEN_PARSERS.set("DelegateChanged", parseDelegateChangedEvent);
NOUNS_TOKEN_PARSERS.set("DelegateVotesChanged", parseDelegateVotesChangedEvent);
NOUNS_TOKEN_PARSERS.set("Transfer", parseTransferEvent);
NOUNS_TOKEN_PARSERS.set("Approval", parseApprovalEvent);
NOUNS_TOKEN_PARSERS.set("ApprovalForAll", parseApprovalForAllEvent);
NOUNS_TOKEN_PARSERS.set("NounCreated", parseNounCreatedEvent);
NOUNS_TOKEN_PARSERS.set("DescriptorLocked", parseDescriptorLockedEvent);
NOUNS_TOKEN_PARSERS.set("DescriptorUpdated", parseDescriptorUpdatedEvent);
NOUNS_TOKEN_PARSERS.set("MinterLocked", parseMinterLockedEvent);
NOUNS_TOKEN_PARSERS.set("MinterUpdated", parseMinterUpdatedEvent);
NOUNS_TOKEN_PARSERS.set("NounBurned", parseNounBurnedEvent);
NOUNS_TOKEN_PARSERS.set("NoundersDAOUpdated", parseNoundersDAOUpdatedEvent);
NOUNS_TOKEN_PARSERS.set("OwnershipTransferred", parseOwnershipTransferredEvent2);
NOUNS_TOKEN_PARSERS.set("SeederLocked", parseSeederLockedEvent);
NOUNS_TOKEN_PARSERS.set("SeederUpdated", parseSeederUpdatedEvent);

//=======================================
// NounsDAOData
//=======================================

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AdminChanged event.
 * @returns Formatted AdminChanged event.
 */
export function parseAdminChangedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		previousAdmin: event.args!.previousAdmin,
		newAdmin: event.args!.newAdmin
	} as Indexer.NounsDAOData.AdminChanged;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain BeaconUpgraded event.
 * @returns Formatted BeaconUpgraded event.
 */
export function parseBeaconUpgradedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		beacon: event.args!.beacon
	} as Indexer.NounsDAOData.BeaconUpgraded;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain CandidateFeedbackSent event.
 * @returns Formatted CandidateFeedbackSent event.
 */
export function parseCandidateFeedbackSentEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		msgSender: event.args!.msgSender,
		proposer: event.args!.proposer,
		slug: event.args!.slug,
		support: Number(event.args!.support),
		supportChoice: ["AGAINST", "FOR", "ABSTAIN"][event.args!.support],
		reason: event.args!.reason
	} as Indexer.NounsDAOData.CandidateFeedbackSent;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain CreateCandidateCostSet event.
 * @returns Formatted CreateCandidateCostSet event.
 */
export function parseCreateCandidateCostSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldCreateCandidateCost: Number(event.args!.oldCreateCandidateCost),
		newCreateCandidateCost: Number(event.args!.newCreateCandidateCost)
	} as Indexer.NounsDAOData.CreateCandidateCostSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ETHWithdrawn event.
 * @returns Formatted ETHWithdrawn event.
 */
export function parseETHWithdrawnEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		to: event.args!.to,
		amount: Number(event.args!.amount)
	} as Indexer.NounsDAOData.ETHWithdrawn;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain FeeRecipientSet event.
 * @returns Formatted FeeRecipientSet event.
 */
export function parseFeeRecipientSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldFeeRecipient: event.args!.oldFeeRecipient,
		newFeeRecipient: event.args!.newFeeRecipient
	} as Indexer.NounsDAOData.FeeRecipientSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain FeedbackSent event.
 * @returns Formatted FeedbackSent event.
 */
export function parseFeedbackSentEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		msgSender: event.args!.msgSender,
		proposalId: Number(event.args!.proposalId),
		support: Number(event.args!.support),
		supportChoice: ["AGAINST", "FOR", "ABSTAIN"][event.args!.support],
		reason: event.args!.reason
	} as Indexer.NounsDAOData.FeedbackSent;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain OwnershipTransferred event.
 * @returns Formatted OwnershipTransferred event.
 */
export function parseOwnershipTransferredEvent3(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		previousOwner: event.args!.previousOwner,
		newOwner: event.args!.newOwner
	} as Indexer.NounsDAOData.OwnershipTransferred;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCandidateCanceled event.
 * @returns Formatted ProposalCandidateCanceled event.
 */
export function parseProposalCandidateCanceledEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		msgSender: event.args!.msgSender,
		slug: event.args!.slug
	} as Indexer.NounsDAOData.ProposalCandidateCanceled;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCandidateCreated event.
 * @returns Formatted ProposalCandidateCreated event.
 */
export function parseProposalCandidateCreatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		msgSender: event.args!.msgSender,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		description: event.args!.description,
		slug: event.args!.slug,
		proposalIdToUpdate: Number(event.args!.proposalIdToUpdate),
		encodedProposalHash: event.args!.encodedProposalHash
	} as Indexer.NounsDAOData.ProposalCandidateCreated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCandidateUpdated event.
 * @returns Formatted ProposalCandidateUpdated event.
 */
export function parseProposalCandidateUpdatedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		msgSender: event.args!.msgSender,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		description: event.args!.description,
		slug: event.args!.slug,
		proposalIdToUpdate: Number(event.args!.proposalIdToUpdate),
		encodedProposalHash: event.args!.encodedProposalHash,
		reason: event.args!.reason
	} as Indexer.NounsDAOData.ProposalCandidateUpdated;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain SignatureAdded event.
 * @returns Formatted SignatureAdded event.
 */
export function parseSignatureAddedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		signer: event.args!.signer,
		sig: event.args!.sig,
		expirationTimestamp: Number(event.args!.expirationTimestamp),
		proposer: event.args!.proposer,
		slug: event.args!.slug,
		proposalIdToUpdate: Number(event.args!.proposalIdToUpdate),
		encodedPropHash: event.args!.encodedPropHash,
		sigDigest: event.args!.sigDigest,
		reason: event.args!.reason
	} as Indexer.NounsDAOData.SignatureAdded;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain UpdateCandidateCostSet event.
 * @returns Formatted UpdateCandidateCostSet event.
 */
export function parseUpdateCandidateCostSetEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		oldUpdateCandidateCost: Number(event.args!.oldUpdateCandidateCost),
		newUpdateCandidateCost: Number(event.args!.newUpdateCandidateCost)
	} as Indexer.NounsDAOData.UpdateCandidateCostSet;
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Upgraded event.
 * @returns Formatted Upgraded event.
 */
export function parseUpgradedEvent(event: ethers.Event) {
	return {
		blockNumber: event.blockNumber,
		blockHash: event.blockHash,
		transactionIndex: event.transactionIndex,
		address: event.address,
		transactionHash: event.transactionHash,
		eventName: event.event,
		eventSignature: event.eventSignature,
		implementation: event.args!.implementation
	} as Indexer.NounsDAOData.Upgraded;
}

/**
 * A map of supported events and their associated parsers.
 */
export const NOUNS_DATA_PARSERS = new Map<string, Function>();
NOUNS_DATA_PARSERS.set("AdminChanged", parseAdminChangedEvent);
NOUNS_DATA_PARSERS.set("BeaconUpgraded", parseBeaconUpgradedEvent);
NOUNS_DATA_PARSERS.set("CandidateFeedbackSent", parseCandidateFeedbackSentEvent);
NOUNS_DATA_PARSERS.set("CreateCandidateCostSet", parseCreateCandidateCostSetEvent);
NOUNS_DATA_PARSERS.set("ETHWithdrawn", parseETHWithdrawnEvent);
NOUNS_DATA_PARSERS.set("FeeRecipientSet", parseFeeRecipientSetEvent);
NOUNS_DATA_PARSERS.set("FeedbackSent", parseFeedbackSentEvent);
NOUNS_DATA_PARSERS.set("OwnershipTransferred", parseOwnershipTransferredEvent3);
NOUNS_DATA_PARSERS.set("ProposalCandidateCanceled", parseProposalCandidateCanceledEvent);
NOUNS_DATA_PARSERS.set("ProposalCandidateCreated", parseProposalCandidateCreatedEvent);
NOUNS_DATA_PARSERS.set("ProposalCandidateUpdated", parseProposalCandidateUpdatedEvent);
NOUNS_DATA_PARSERS.set("SignatureAdded", parseSignatureAddedEvent);
NOUNS_DATA_PARSERS.set("UpdateCandidateCostSet", parseUpdateCandidateCostSetEvent);
NOUNS_DATA_PARSERS.set("Upgraded", parseUpgradedEvent);
