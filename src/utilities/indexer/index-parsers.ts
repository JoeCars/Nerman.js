import { ethers } from "ethers-v6";

import { EventData, EventFormatter } from "../../types";

//=======================================
// NounsDAO
//=======================================

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DAOWithdrawNounsFromEscrow event.
 * @returns Formatted DAOWithdrawNounsFromEscrow event.
 */
export function parseDAOWithdrawNounsFromEscrowEvent(event: ethers.EventLog): EventData.DAOWithdrawNounsFromEscrow {
	return {
		tokenIds: event.args!.tokenIds.map((tokenId: BigInt) => {
			return Number(tokenId);
		}),
		to: { id: event.args!.to },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ERC20TokensToIncludeInForkSet event.
 * @returns Formatted ERC20TokensToIncludeInForkSet event.
 */
export function parseERC20TokensToIncludeInForkSetEvent(event: ethers.EventLog): EventData.ERC20TokensToIncludeInForkSet {
	return {
		oldErc20Tokens: event.args!.oldErc20Tokens,
		newErc20tokens: event.args!.newErc20tokens,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain EscrowedToFork event.
 * @returns Formatted EscrowedToFork event.
 */
export function parseEscrowedToForkEvent(event: ethers.EventLog): EventData.EscrowedToFork {
	return {
		forkId: Number(event.args!.forkId),
		owner: { id: event.args!.owner },
		tokenIds: event.args!.tokenIds.map((tokenId: BigInt) => {
			return Number(tokenId);
		}),
		proposalIds: event.args!.proposalIds.map((proposalId: BigInt) => {
			return Number(proposalId);
		}),
		reason: event.args!.reason,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ExecuteFork event.
 * @returns Formatted ExecuteFork event.
 */
export function parseExecuteForkEvent(event: ethers.EventLog): EventData.ExecuteFork {
	return {
		forkId: Number(event.args!.forkId),
		forkTreasury: { id: event.args!.forkTreasury },
		forkToken: { id: event.args!.forkToken },
		forkEndTimestamp: event.args!.forkEndTimestamp,
		tokensInEscrow: event.args!.tokensInEscrow,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ForkDAODeployerSet event.
 * @returns Formatted ForkDAODeployerSet event.
 */
export function parseForkDAODeployerSetEvent(event: ethers.EventLog): EventData.ForkDAODeployerSet {
	return {
		oldForkDAODeployer: { id: event.args!.oldForkDAODeployer },
		newForkDAODeployer: { id: event.args!.newForkDAODeployer },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ForkPeriodSet event.
 * @returns Formatted ForkPeriodSet event.
 */
export function parseForkPeriodSetEvent(event: ethers.EventLog): EventData.ForkPeriodSet {
	return {
		oldForkPeriod: event.args!.oldForkPeriod,
		newForkPeriod: event.args!.newForkPeriod,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ForkThresholdSet event.
 * @returns Formatted ForkThresholdSet event.
 */
export function parseForkThresholdSetEvent(event: ethers.EventLog): EventData.ForkThresholdSet {
	return {
		oldForkThreshold: event.args!.oldForkThreshold,
		newForkThreshold: event.args!.newForkThreshold,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain JoinFork event.
 * @returns Formatted JoinFork event.
 */
export function parseJoinForkEvent(event: ethers.EventLog): EventData.JoinFork {
	return {
		forkId: Number(event.args!.forkId),
		owner: { id: event.args!.owner },
		tokenIds: event.args!.tokenIds.map((tokenId: BigInt) => {
			return Number(tokenId);
		}),
		proposalIds: event.args!.proposalIds.map((proposalId: BigInt) => {
			return Number(proposalId);
		}),
		reason: event.args!.reason,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain LastMinuteWindowSet event.
 * @returns Formatted LastMinuteWindowSet event.
 */
export function parseLastMinuteWindowSetEvent(event: ethers.EventLog): EventData.LastMinuteWindowSet {
	return {
		oldLastMinuteWindowInBlocks: event.args!.oldLastMinuteWindowInBlocks,
		newLastMinuteWindowInBlocks: event.args!.newLastMinuteWindowInBlocks,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain MaxQuorumVotesBPSSet event.
 * @returns Formatted MaxQuorumVotesBPSSet event.
 */
export function parseMaxQuorumVotesBPSSetEvent(event: ethers.EventLog): EventData.MaxQuorumVotesBPSSet {
	return {
		oldMaxQuorumVotesBPS: Number(event.args!.oldMaxQuorumVotesBPS),
		newMaxQuorumVotesBPS: Number(event.args!.newMaxQuorumVotesBPS),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain MinQuorumVotesBPSSet event.
 * @returns Formatted MinQuorumVotesBPSSet event.
 */
export function parseMinQuorumVotesBPSSetEvent(event: ethers.EventLog): EventData.MinQuorumVotesBPSSet {
	return {
		oldMinQuorumVotesBPS: Number(event.args!.oldMinQuorumVotesBPS),
		newMinQuorumVotesBPS: Number(event.args!.newMinQuorumVotesBPS),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewAdmin event.
 * @returns Formatted NewAdmin event.
 */
export function parseNewAdminEvent(event: ethers.EventLog): EventData.NewAdmin {
	return {
		oldAdmin: { id: event.args!.oldAdmin },
		newAdmin: { id: event.args!.newAdmin },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewImplementation event.
 * @returns Formatted NewImplementation event.
 */
export function parseNewImplementationEvent(event: ethers.EventLog): EventData.NewImplementation {
	return {
		oldImplementation: { id: event.args!.oldImplementation },
		newImplementation: { id: event.args!.newImplementation },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewPendingAdmin event.
 * @returns Formatted NewPendingAdmin event.
 */
export function parseNewPendingAdminEvent(event: ethers.EventLog): EventData.NewPendingAdmin {
	return {
		oldPendingAdmin: { id: event.args!.oldPendingAdmin },
		newPendingAdmin: { id: event.args!.newPendingAdmin },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewPendingVetoer event.
 * @returns Formatted NewPendingVetoer event.
 */
export function parseNewPendingVetoerEvent(event: ethers.EventLog): EventData.NewPendingVetoer {
	return {
		oldPendingVetoer: { id: event.args!.oldPendingVetoer },
		newPendingVetoer: { id: event.args!.newPendingVetoer },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NewVetoer event.
 * @returns Formatted NewVetoer event.
 */
export function parseNewVetoerEvent(event: ethers.EventLog): EventData.NewVetoer {
	return {
		oldVetoer: { id: event.args!.oldVetoer },
		newVetoer: { id: event.args!.newVetoer },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ObjectionPeriodDurationSet event.
 * @returns Formatted ObjectionPeriodDurationSet event.
 */
export function parseObjectionPeriodDurationSetEvent(event: ethers.EventLog): EventData.ObjectionPeriodDurationSet {
	return {
		oldObjectionPeriodDurationInBlocks: event.args!.oldObjectionPeriodDurationInBlocks,
		newObjectionPeriodDurationInBlocks: event.args!.newObjectionPeriodDurationInBlocks,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCanceled event.
 * @returns Formatted ProposalCanceled event.
 */
export function parseProposalCanceledEvent(event: ethers.EventLog): EventData.ProposalCanceled {
	return {
		id: Number(event.args!.id),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCreated event.
 * @returns Formatted ProposalCreated event.
 */
export function parseProposalCreatedEvent(event: ethers.EventLog): EventData.ProposalCreated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args.at(3),
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		startBlock: event.args!.startBlock,
		endBlock: event.args!.endBlock,
		description: event.args!.description,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCreatedOnTimelockV1 event.
 * @returns Formatted ProposalCreatedOnTimelockV1 event.
 */
export function parseProposalCreatedOnTimelockV1Event(event: ethers.EventLog): EventData.ProposalCreatedOnTimelockV1 {
	return {
		id: Number(event.args!.id),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCreatedWithRequirements event.
 * @returns Formatted ProposalCreatedWithRequirements event.
 */
export function parseProposalCreatedWithRequirementsEvent(event: ethers.EventLog): EventData.ProposalCreatedWithRequirements {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		signers: event.args!.signers,
		targets: event.args!.targets,
		values: event.args!.at(4), // Verify this with examples.
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		startBlock: event.args!.startBlock,
		endBlock: event.args!.endBlock,
		updatePeriodEndBlock: event.args!.updatePeriodEndBlock,
		proposalThreshold: Number(event.args!.proposalThreshold),
		quorumVotes: Number(event.args!.quorumVotes),
		description: event.args!.description,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalDescriptionUpdated event.
 * @returns Formatted ProposalDescriptionUpdated event.
 */
export function parseProposalDescriptionUpdatedEvent(event: ethers.EventLog): EventData.ProposalDescriptionUpdated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		description: event.args!.description,
		updatedMessage: event.args!.updatedMessage,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalExecuted event.
 * @returns Formatted ProposalExecuted event.
 */
export function parseProposalExecutedEvent(event: ethers.EventLog): EventData.ProposalExecuted {
	return {
		id: Number(event.args!.id),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalObjectionPeriodSet event.
 * @returns Formatted ProposalObjectionPeriodSet event.
 */
export function parseProposalObjectionPeriodSetEvent(event: ethers.EventLog): EventData.ProposalObjectionPeriodSet {
	return {
		id: Number(event.args!.id),
		objectionPeriodEndBlock: event.args!.objectionPeriodEndBlock,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalQueued event.
 * @returns Formatted ProposalQueued event.
 */
export function parseProposalQueuedEvent(event: ethers.EventLog): EventData.ProposalQueued {
	return {
		id: Number(event.args!.id),
		eta: event.args!.eta,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalThresholdBPSSet event.
 * @returns Formatted ProposalThresholdBPSSet event.
 */
export function parseProposalThresholdBPSSetEvent(event: ethers.EventLog): EventData.ProposalThresholdBPSSet {
	return {
		oldProposalThresholdBPS: Number(event.args!.oldProposalThresholdBPS),
		newProposalThresholdBPS: Number(event.args!.newProposalThresholdBPS),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalTransactionsUpdated event.
 * @returns Formatted ProposalTransactionsUpdated event.
 */
export function parseProposalTransactionsUpdatedEvent(event: ethers.EventLog): EventData.ProposalTransactionsUpdated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args!.at(3),
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		updateMessage: event.args!.updateMessage,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalUpdatablePeriodSet event.
 * @returns Formatted ProposalUpdatablePeriodSet event.
 */
export function parseProposalUpdatablePeriodSetEvent(event: ethers.EventLog): EventData.ProposalUpdatablePeriodSet {
	return {
		oldProposalUpdatablePeriodInBlocks: event.args!.oldProposalUpdatablePeriodInBlocks,
		newProposalUpdatablePeriodInBlocks: event.args!.newProposalUpdatablePeriodInBlocks,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalUpdated event.
 * @returns Formatted ProposalUpdated event.
 */
export function parseProposalUpdatedEvent(event: ethers.EventLog): EventData.ProposalUpdated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args!.at(3),
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		description: event.args!.description,
		updateMessage: event.args!.updateMessage,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalVetoed event.
 * @returns Formatted ProposalVetoed event.
 */
export function parseProposalVetoedEvent(event: ethers.EventLog): EventData.ProposalVetoed {
	return {
		id: Number(event.args!.id),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain QuorumCoefficientSet event.
 * @returns Formatted QuorumCoefficientSet event.
 */
export function parseQuorumCoefficientSetEvent(event: ethers.EventLog): EventData.QuorumCoefficientSet {
	return {
		oldQuorumCoefficient: Number(event.args!.oldQuorumCoefficient),
		newQuorumCoefficient: Number(event.args!.newQuorumCoefficient),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain QuorumVotesBPSSet event.
 * @returns Formatted QuorumVotesBPSSet event.
 */
export function parseQuorumVotesBPSSetEvent(event: ethers.EventLog): EventData.QuorumVotesBPSSet {
	return {
		oldQuorumVotesBPS: Number(event.args!.oldQuorumVotesBPS),
		newQuorumVotesBPS: Number(event.args!.newQuorumVotesBPS),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain RefundableVote event.
 * @returns Formatted RefundableVote event.
 */
export function parseRefundableVoteEvent(event: ethers.EventLog): EventData.RefundableVote {
	return {
		voter: { id: event.args!.voter },
		refundAmount: event.args!.refundAmount,
		refundSent: event.args!.refundSent,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain SignatureCancelled event.
 * @returns Formatted SignatureCancelled event.
 */
export function parseSignatureCancelledEvent(event: ethers.EventLog): EventData.SignatureCancelled {
	return {
		signer: { id: event.args!.signer },
		sig: event.args!.sig,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain TimelocksAndAdminSet event.
 * @returns Formatted TimelocksAndAdminSet event.
 */
export function parseTimelocksAndAdminSetEvent(event: ethers.EventLog): EventData.TimelocksAndAdminSet {
	return {
		timelock: { id: event.args!.timelock },
		timelockV1: { id: event.args!.timelockV1 },
		admin: { id: event.args!.admin },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain VoteCast event.
 * @returns Formatted VoteCast event.
 */
export function parseVoteCastEvent(event: ethers.EventLog): EventData.VoteCast {
	return {
		voter: { id: event.args!.voter },
		proposalId: Number(event.args!.proposalId),
		supportDetailed: Number(event.args!.support),
		votes: Number(event.args!.votes),
		reason: event.args!.reason,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain VoteSnapshotBlockSwitchProposalIdSet event.
 * @returns Formatted VoteSnapshotBlockSwitchProposalIdSet event.
 */
export function parseVoteSnapshotBlockSwitchProposalIdSetEvent(
	event: ethers.EventLog
): EventData.VoteSnapshotBlockSwitchProposalIdSet {
	return {
		oldVoteSnapshotBlockSwitchProposalId: Number(event.args!.oldVoteSnapshotBlockSwitchProposalId),
		newVoteSnapshotBlockSwitchProposalId: Number(event.args!.newVoteSnapshotBlockSwitchProposalId),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain VotingDelaySet event.
 * @returns Formatted VotingDelaySet event.
 */
export function parseVotingDelaySetEvent(event: ethers.EventLog): EventData.VotingDelaySet {
	return {
		oldVotingDelay: event.args!.oldVotingDelay,
		newVotingDelay: event.args!.newVotingDelay,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain VotingPeriodSet event.
 * @returns Formatted VotingPeriodSet event.
 */
export function parseVotingPeriodSetEvent(event: ethers.EventLog): EventData.VotingPeriodSet {
	return {
		oldVotingPeriod: event.args!.oldVotingPeriod,
		newVotingPeriod: event.args!.newVotingPeriod,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Withdraw event.
 * @returns Formatted Withdraw event.
 */
export function parseWithdrawEvent(event: ethers.EventLog): EventData.Withdraw {
	return {
		amount: event.args!.amount,
		sent: event.args!.sent,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain WithdrawFromForkEscrow event.
 * @returns Formatted WithdrawFromForkEscrow event.
 */
export function parseWithdrawFromForkEscrowEvent(event: ethers.EventLog): EventData.WithdrawFromForkEscrow {
	return {
		forkId: Number(event.args!.forkId),
		owner: { id: event.args!.owner },
		tokenIds: event.args!.tokenIds,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * A map of supported events and their associated parsers.
 */
export const NOUNS_DAO_PARSERS = new Map<string, EventFormatter>();
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
export function parseAuctionCreatedEvent(event: ethers.EventLog): EventData.AuctionCreated {
	return {
		id: Number(event.args!.nounId),
		startTime: event.args!.startTime,
		endTime: event.args!.endTime,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionBid event.
 * @returns Formatted AuctionBid event.
 */
export function parseAuctionBidEvent(event: ethers.EventLog): EventData.AuctionBid {
	return {
		id: Number(event.args!.nounId),
		bidder: { id: event.args!.sender },
		amount: event.args!.value,
		extended: event.args!.extended,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionExtended event.
 * @returns Formatted AuctionExtended event.
 */
export function parseAuctionExtendedEvent(event: ethers.EventLog): EventData.AuctionExtended {
	return {
		id: Number(event.args!.nounId),
		endTime: event.args!.endTime,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionSettled event.
 * @returns Formatted AuctionSettled event.
 */
export function parseAuctionSettledEvent(event: ethers.EventLog): EventData.AuctionSettled {
	return {
		id: Number(event.args!.nounId),
		winner: { id: event.args!.winner },
		amount: event.args!.amount,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionTimeBufferUpdated event.
 * @returns Formatted AuctionTimeBufferUpdated event.
 */
export function parseAuctionTimeBufferUpdatedEvent(event: ethers.EventLog): EventData.AuctionTimeBufferUpdated {
	return {
		timeBuffer: event.args!.timeBuffer,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionReservePriceUpdated event.
 * @returns Formatted AuctionReservePriceUpdated event.
 */
export function parseAuctionReservePriceUpdatedEvent(event: ethers.EventLog): EventData.AuctionReservePriceUpdated {
	return {
		reservePrice: event.args!.reservePrice,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionMinBidIncrementPercentageUpdated event.
 * @returns Formatted AuctionMinBidIncrementPercentageUpdated event.
 */
export function parseAuctionMinBidIncrementPercentageUpdatedEvent(
	event: ethers.EventLog
): EventData.AuctionMinBidIncrementPercentageUpdated {
	return {
		minBidIncrementPercentage: Number(event.args!.minBidIncrementPercentage),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain OwnershipTransferred event.
 * @returns Formatted OwnershipTransferred event.
 */
export function parseOwnershipTransferredEvent(event: ethers.EventLog): EventData.OwnershipTransferred {
	return {
		previousOwner: { id: event.args!.previousOwner },
		newOwner: { id: event.args!.newOwner },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Paused event.
 * @returns Formatted Paused event.
 */
export function parsePausedEvent(event: ethers.EventLog): EventData.Paused {
	return {
		address: { id: event.args!.address },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Unpaused event.
 * @returns Formatted Unpaused event.
 */
export function parseUnpausedEvent(event: ethers.EventLog): EventData.Unpaused {
	return {
		address: { id: event.args!.address },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * A map of supported events and their associated parsers.
 */
export const NOUNS_AUCTION_PARSERS = new Map<string, EventFormatter>();
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
export function parseDelegateChangedEvent(event: ethers.EventLog): EventData.DelegateChanged {
	return {
		delegator: { id: event.args!.delegator },
		fromDelegate: { id: event.args!.fromDelegate },
		toDelegate: { id: event.args!.toDelegate },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DelegateVotesChanged event.
 * @returns Formatted DelegateVotesChanged event.
 */
export function parseDelegateVotesChangedEvent(event: ethers.EventLog): EventData.DelegateVotesChanged {
	return {
		delegate: { id: event.args!.delegate },
		previousBalance: event.args!.previousBalance,
		newBalance: event.args!.newBalance,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Transfer event.
 * @returns Formatted Transfer event.
 */
export function parseTransferEvent(event: ethers.EventLog): EventData.Transfer {
	return {
		from: { id: event.args!.from },
		to: { id: event.args!.to },
		tokenId: Number(event.args!.tokenId),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Approval event.
 * @returns Formatted Approval event.
 */
export function parseApprovalEvent(event: ethers.EventLog): EventData.Approval {
	return {
		owner: { id: event.args!.owner },
		approved: { id: event.args!.approved },
		tokenId: Number(event.args!.tokenId),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ApprovalForAll event.
 * @returns Formatted ApprovalForAll event.
 */
export function parseApprovalForAllEvent(event: ethers.EventLog): EventData.ApprovalForAll {
	return {
		owner: { id: event.args!.owner },
		operator: { id: event.args!.operator },
		approved: event.args!.approved,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NounCreated event.
 * @returns Formatted NounCreated event.
 */
export function parseNounCreatedEvent(event: ethers.EventLog): EventData.NounCreated {
	return {
		id: Number(event.args!.tokenId),
		seed: {
			background: Number(event.args!.seed.background),
			body: Number(event.args!.seed.body),
			accessory: Number(event.args!.seed.accessory),
			head: Number(event.args!.seed.head),
			glasses: Number(event.args!.seed.glasses)
		},
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DescriptorLocked event.
 * @returns Formatted DescriptorLocked event.
 */
export function parseDescriptorLockedEvent(event: ethers.EventLog): EventData.DescriptorLocked {
	return {
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DescriptorUpdated event.
 * @returns Formatted DescriptorUpdated event.
 */
export function parseDescriptorUpdatedEvent(event: ethers.EventLog): EventData.DescriptorUpdated {
	return {
		descriptor: { id: event.args!._descriptor },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain MinterLocked event.
 * @returns Formatted MinterLocked event.
 */
export function parseMinterLockedEvent(event: ethers.EventLog): EventData.MinterLocked {
	return {
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain MinterUpdated event.
 * @returns Formatted MinterUpdated event.
 */
export function parseMinterUpdatedEvent(event: ethers.EventLog): EventData.MinterUpdated {
	return {
		minter: { id: event.args!._minter },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NounBurned event.
 * @returns Formatted NounBurned event.
 */
export function parseNounBurnedEvent(event: ethers.EventLog): EventData.NounBurned {
	return {
		id: Number(event.args!.nounId),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain NoundersDAOUpdated event.
 * @returns Formatted NoundersDAOUpdated event.
 */
export function parseNoundersDAOUpdatedEvent(event: ethers.EventLog): EventData.NoundersDAOUpdated {
	return {
		noundersDAO: { id: event.args!._noundersDAO },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain OwnershipTransferred event.
 * @returns Formatted OwnershipTransferred event.
 */
export function parseOwnershipTransferredEvent2(event: ethers.EventLog): EventData.OwnershipTransferred {
	return {
		previousOwner: { id: event.args!.previousOwner },
		newOwner: { id: event.args!.newOwner },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain SeederLocked event.
 * @returns Formatted SeederLocked event.
 */
export function parseSeederLockedEvent(event: ethers.EventLog): EventData.SeederLocked {
	return {
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain SeederUpdated event.
 * @returns Formatted SeederUpdated event.
 */
export function parseSeederUpdatedEvent(event: ethers.EventLog): EventData.SeederUpdated {
	return {
		seeder: { id: event.args!._seeder },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * A map of supported events and their associated parsers.
 */
export const NOUNS_TOKEN_PARSERS = new Map<string, EventFormatter>();
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
export function parseAdminChangedEvent(event: ethers.EventLog): EventData.AdminChanged {
	return {
		previousAdmin: { id: event.args!.previousAdmin },
		newAdmin: { id: event.args!.newAdmin },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain BeaconUpgraded event.
 * @returns Formatted BeaconUpgraded event.
 */
export function parseBeaconUpgradedEvent(event: ethers.EventLog): EventData.BeaconUpgraded {
	return {
		beacon: { id: event.args!.beacon },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain CandidateFeedbackSent event.
 * @returns Formatted CandidateFeedbackSent event.
 */
export function parseCandidateFeedbackSentEvent(event: ethers.EventLog): EventData.CandidateFeedbackSent {
	return {
		msgSender: { id: event.args!.msgSender },
		proposer: { id: event.args!.proposer },
		slug: event.args!.slug,
		support: Number(event.args!.support),
		reason: event.args!.reason,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain CreateCandidateCostSet event.
 * @returns Formatted CreateCandidateCostSet event.
 */
export function parseCreateCandidateCostSetEvent(event: ethers.EventLog): EventData.CreateCandidateCostSet {
	return {
		oldCreateCandidateCost: event.args!.oldCreateCandidateCost,
		newCreateCandidateCost: event.args!.newCreateCandidateCost,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ETHWithdrawn event.
 * @returns Formatted ETHWithdrawn event.
 */
export function parseETHWithdrawnEvent(event: ethers.EventLog): EventData.ETHWithdrawn {
	return {
		to: { id: event.args!.to },
		amount: event.args!.amount,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain FeeRecipientSet event.
 * @returns Formatted FeeRecipientSet event.
 */
export function parseFeeRecipientSetEvent(event: ethers.EventLog): EventData.FeeRecipientSet {
	return {
		oldFeeRecipient: { id: event.args!.oldFeeRecipient },
		newFeeRecipient: { id: event.args!.newFeeRecipient },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain FeedbackSent event.
 * @returns Formatted FeedbackSent event.
 */
export function parseFeedbackSentEvent(event: ethers.EventLog): EventData.FeedbackSent {
	return {
		msgSender: { id: event.args!.msgSender },
		proposalId: Number(event.args!.proposalId),
		support: Number(event.args!.support),
		reason: event.args!.reason,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain OwnershipTransferred event.
 * @returns Formatted OwnershipTransferred event.
 */
export function parseOwnershipTransferredEvent3(event: ethers.EventLog): EventData.OwnershipTransferred {
	return {
		previousOwner: { id: event.args!.previousOwner },
		newOwner: { id: event.args!.newOwner },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCandidateCanceled event.
 * @returns Formatted ProposalCandidateCanceled event.
 */
export function parseProposalCandidateCanceledEvent(event: ethers.EventLog): EventData.ProposalCandidateCanceled {
	return {
		msgSender: { id: event.args!.msgSender },
		slug: event.args!.slug,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCandidateCreated event.
 * @returns Formatted ProposalCandidateCreated event.
 */
export function parseProposalCandidateCreatedEvent(event: ethers.EventLog): EventData.ProposalCandidateCreated {
	return {
		msgSender: { id: event.args!.msgSender },
		targets: event.args!.targets,
		values: event.args!.at(2),
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		description: event.args!.description,
		slug: event.args!.slug,
		proposalIdToUpdate: Number(event.args!.proposalIdToUpdate),
		encodedProposalHash: event.args!.encodedProposalHash,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain ProposalCandidateUpdated event.
 * @returns Formatted ProposalCandidateUpdated event.
 */
export function parseProposalCandidateUpdatedEvent(event: ethers.EventLog): EventData.ProposalCandidateUpdated {
	return {
		msgSender: { id: event.args!.msgSender },
		targets: event.args!.targets,
		values: event.args!.at(2),
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		description: event.args!.description,
		slug: event.args!.slug,
		proposalIdToUpdate: Number(event.args!.proposalIdToUpdate),
		encodedProposalHash: event.args!.encodedProposalHash,
		reason: event.args!.reason,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain SignatureAdded event.
 * @returns Formatted SignatureAdded event.
 */
export function parseSignatureAddedEvent(event: ethers.EventLog): EventData.SignatureAdded {
	return {
		signer: { id: event.args!.signer },
		sig: event.args!.sig,
		expirationTimestamp: event.args!.expirationTimestamp,
		proposer: { id: event.args!.proposer },
		slug: event.args!.slug,
		proposalIdToUpdate: Number(event.args!.proposalIdToUpdate),
		encodedPropHash: event.args!.encodedPropHash,
		sigDigest: event.args!.sigDigest,
		reason: event.args!.reason,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain UpdateCandidateCostSet event.
 * @returns Formatted UpdateCandidateCostSet event.
 */
export function parseUpdateCandidateCostSetEvent(event: ethers.EventLog): EventData.UpdateCandidateCostSet {
	return {
		oldUpdateCandidateCost: event.args!.oldUpdateCandidateCost,
		newUpdateCandidateCost: event.args!.newUpdateCandidateCost,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain Upgraded event.
 * @returns Formatted Upgraded event.
 */
export function parseUpgradedEvent(event: ethers.EventLog): EventData.Upgraded {
	return {
		implementation: { id: event.args!.implementation },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * A map of supported events and their associated parsers.
 */
export const NOUNS_DATA_PARSERS = new Map<string, EventFormatter>();
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
