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
export function formatDAOWithdrawNounsFromEscrow(event: ethers.EventLog): EventData.DAOWithdrawNounsFromEscrow {
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
export function formatERC20TokensToIncludeInForkSet(event: ethers.EventLog): EventData.ERC20TokensToIncludeInForkSet {
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
export function formatEscrowedToFork(event: ethers.EventLog): EventData.EscrowedToFork {
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
export function formatExecuteFork(event: ethers.EventLog): EventData.ExecuteFork {
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
export function formatForkDAODeployerSet(event: ethers.EventLog): EventData.ForkDAODeployerSet {
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
export function formatForkPeriodSet(event: ethers.EventLog): EventData.ForkPeriodSet {
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
export function formatForkThresholdSet(event: ethers.EventLog): EventData.ForkThresholdSet {
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
export function formatJoinFork(event: ethers.EventLog): EventData.JoinFork {
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
export function formatLastMinuteWindowSet(event: ethers.EventLog): EventData.LastMinuteWindowSet {
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
export function formatMaxQuorumVotesBPSSet(event: ethers.EventLog): EventData.MaxQuorumVotesBPSSet {
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
export function formatMinQuorumVotesBPSSet(event: ethers.EventLog): EventData.MinQuorumVotesBPSSet {
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
export function formatNewAdmin(event: ethers.EventLog): EventData.NewAdmin {
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
export function formatNewImplementation(event: ethers.EventLog): EventData.NewImplementation {
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
export function formatNewPendingAdmin(event: ethers.EventLog): EventData.NewPendingAdmin {
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
export function formatNewPendingVetoer(event: ethers.EventLog): EventData.NewPendingVetoer {
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
export function formatNewVetoer(event: ethers.EventLog): EventData.NewVetoer {
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
export function formatObjectionPeriodDurationSet(event: ethers.EventLog): EventData.ObjectionPeriodDurationSet {
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
export function formatProposalCanceled(event: ethers.EventLog): EventData.ProposalCanceled {
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
export function formatProposalCreated(event: ethers.EventLog): EventData.ProposalCreated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args.at(3).map((val: BigInt) => val.toString()),
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
export function formatProposalCreatedOnTimelockV1(event: ethers.EventLog): EventData.ProposalCreatedOnTimelockV1 {
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
export function formatProposalCreatedWithRequirements(event: ethers.EventLog): EventData.ProposalCreatedWithRequirements {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		signers: event.args!.signers,
		targets: event.args!.targets,
		values: event.args!.signers
			? event.args!.at(4).map((val: BigInt) => val.toString())
			: event.args!.at(3).map((val: BigInt) => val.toString()), // Verify this with examples.
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
export function formatProposalDescriptionUpdated(event: ethers.EventLog): EventData.ProposalDescriptionUpdated {
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
export function formatProposalExecuted(event: ethers.EventLog): EventData.ProposalExecuted {
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
export function formatProposalObjectionPeriodSet(event: ethers.EventLog): EventData.ProposalObjectionPeriodSet {
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
export function formatProposalQueued(event: ethers.EventLog): EventData.ProposalQueued {
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
export function formatProposalThresholdBPSSet(event: ethers.EventLog): EventData.ProposalThresholdBPSSet {
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
export function formatProposalTransactionsUpdated(event: ethers.EventLog): EventData.ProposalTransactionsUpdated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args!.at(3).map((val: BigInt) => val.toString()),
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
export function formatProposalUpdatablePeriodSet(event: ethers.EventLog): EventData.ProposalUpdatablePeriodSet {
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
export function formatProposalUpdated(event: ethers.EventLog): EventData.ProposalUpdated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args!.at(3).map((val: BigInt) => val.toString()),
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
export function formatProposalVetoed(event: ethers.EventLog): EventData.ProposalVetoed {
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
export function formatQuorumCoefficientSet(event: ethers.EventLog): EventData.QuorumCoefficientSet {
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
export function formatQuorumVotesBPSSet(event: ethers.EventLog): EventData.QuorumVotesBPSSet {
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
export function formatRefundableVote(event: ethers.EventLog): EventData.RefundableVote {
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
export function formatSignatureCancelled(event: ethers.EventLog): EventData.SignatureCancelled {
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
export function formatTimelocksAndAdminSet(event: ethers.EventLog): EventData.TimelocksAndAdminSet {
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
export function formatVoteCast(event: ethers.EventLog): EventData.VoteCast {
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
export function formatVoteSnapshotBlockSwitchProposalIdSet(
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
export function formatVotingDelaySet(event: ethers.EventLog): EventData.VotingDelaySet {
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
export function formatVotingPeriodSet(event: ethers.EventLog): EventData.VotingPeriodSet {
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
export function formatWithdraw(event: ethers.EventLog): EventData.Withdraw {
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
export function formatWithdrawFromForkEscrow(event: ethers.EventLog): EventData.WithdrawFromForkEscrow {
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
 * A map of supported events and their associated formatters.
 */
export const NOUNS_DAO_FORMATTERS = new Map<string, EventFormatter>();
NOUNS_DAO_FORMATTERS.set("DAOWithdrawNounsFromEscrow", formatDAOWithdrawNounsFromEscrow);
NOUNS_DAO_FORMATTERS.set("ERC20TokensToIncludeInForkSet", formatERC20TokensToIncludeInForkSet);
NOUNS_DAO_FORMATTERS.set("EscrowedToFork", formatEscrowedToFork);
NOUNS_DAO_FORMATTERS.set("ExecuteFork", formatExecuteFork);
NOUNS_DAO_FORMATTERS.set("ForkDAODeployerSet", formatForkDAODeployerSet);
NOUNS_DAO_FORMATTERS.set("ForkPeriodSet", formatForkPeriodSet);
NOUNS_DAO_FORMATTERS.set("ForkThresholdSet", formatForkThresholdSet);
NOUNS_DAO_FORMATTERS.set("JoinFork", formatJoinFork);
NOUNS_DAO_FORMATTERS.set("LastMinuteWindowSet", formatLastMinuteWindowSet);
NOUNS_DAO_FORMATTERS.set("MaxQuorumVotesBPSSet", formatMaxQuorumVotesBPSSet);
NOUNS_DAO_FORMATTERS.set("MinQuorumVotesBPSSet", formatMinQuorumVotesBPSSet);
NOUNS_DAO_FORMATTERS.set("NewAdmin", formatNewAdmin);
NOUNS_DAO_FORMATTERS.set("NewImplementation", formatNewImplementation);
NOUNS_DAO_FORMATTERS.set("NewPendingAdmin", formatNewPendingAdmin);
NOUNS_DAO_FORMATTERS.set("NewPendingVetoer", formatNewPendingVetoer);
NOUNS_DAO_FORMATTERS.set("NewVetoer", formatNewVetoer);
NOUNS_DAO_FORMATTERS.set("ObjectionPeriodDurationSet", formatObjectionPeriodDurationSet);
NOUNS_DAO_FORMATTERS.set("ProposalCanceled", formatProposalCanceled);
NOUNS_DAO_FORMATTERS.set("ProposalCreated", formatProposalCreated);
NOUNS_DAO_FORMATTERS.set("ProposalCreatedOnTimelockV1", formatProposalCreatedOnTimelockV1);
NOUNS_DAO_FORMATTERS.set("ProposalCreatedWithRequirements", formatProposalCreatedWithRequirements);
NOUNS_DAO_FORMATTERS.set("ProposalDescriptionUpdated", formatProposalDescriptionUpdated);
NOUNS_DAO_FORMATTERS.set("ProposalExecuted", formatProposalExecuted);
NOUNS_DAO_FORMATTERS.set("ProposalObjectionPeriodSet", formatProposalObjectionPeriodSet);
NOUNS_DAO_FORMATTERS.set("ProposalQueued", formatProposalQueued);
NOUNS_DAO_FORMATTERS.set("ProposalThresholdBPSSet", formatProposalThresholdBPSSet);
NOUNS_DAO_FORMATTERS.set("ProposalTransactionsUpdated", formatProposalTransactionsUpdated);
NOUNS_DAO_FORMATTERS.set("ProposalUpdatablePeriodSet", formatProposalUpdatablePeriodSet);
NOUNS_DAO_FORMATTERS.set("ProposalUpdated", formatProposalUpdated);
NOUNS_DAO_FORMATTERS.set("ProposalVetoed", formatProposalVetoed);
NOUNS_DAO_FORMATTERS.set("QuorumCoefficientSet", formatQuorumCoefficientSet);
NOUNS_DAO_FORMATTERS.set("QuorumVotesBPSSet", formatQuorumVotesBPSSet);
NOUNS_DAO_FORMATTERS.set("RefundableVote", formatRefundableVote);
NOUNS_DAO_FORMATTERS.set("SignatureCancelled", formatSignatureCancelled);
NOUNS_DAO_FORMATTERS.set("TimelocksAndAdminSet", formatTimelocksAndAdminSet);
NOUNS_DAO_FORMATTERS.set("VoteCast", formatVoteCast);
NOUNS_DAO_FORMATTERS.set("VoteSnapshotBlockSwitchProposalIdSet", formatVoteSnapshotBlockSwitchProposalIdSet);
NOUNS_DAO_FORMATTERS.set("VotingDelaySet", formatVotingDelaySet);
NOUNS_DAO_FORMATTERS.set("VotingPeriodSet", formatVotingPeriodSet);
NOUNS_DAO_FORMATTERS.set("Withdraw", formatWithdraw);
NOUNS_DAO_FORMATTERS.set("WithdrawFromForkEscrow", formatWithdrawFromForkEscrow);

//=======================================
// NounsAuction
//=======================================

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionCreated event.
 * @returns Formatted AuctionCreated event.
 */
export function formatAuctionCreated(event: ethers.EventLog): EventData.AuctionCreated {
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
export function formatAuctionBid(event: ethers.EventLog): EventData.AuctionBid {
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
export function formatAuctionExtended(event: ethers.EventLog): EventData.AuctionExtended {
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
export function formatAuctionSettled(event: ethers.EventLog): EventData.AuctionSettled {
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
export function formatAuctionTimeBufferUpdated(event: ethers.EventLog): EventData.AuctionTimeBufferUpdated {
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
export function formatAuctionReservePriceUpdated(event: ethers.EventLog): EventData.AuctionReservePriceUpdated {
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
export function formatAuctionMinBidIncrementPercentageUpdated(
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
export function formatOwnershipTransferred(event: ethers.EventLog): EventData.OwnershipTransferred {
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
export function formatPaused(event: ethers.EventLog): EventData.Paused {
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
export function formatUnpaused(event: ethers.EventLog): EventData.Unpaused {
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
 * A map of supported events and their associated formatters.
 */
export const NOUNS_AUCTION_HOUSE_FORMATTERS = new Map<string, EventFormatter>();
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionCreated", formatAuctionCreated);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionBid", formatAuctionBid);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionExtended", formatAuctionExtended);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionSettled", formatAuctionSettled);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionTimeBufferUpdated", formatAuctionTimeBufferUpdated);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionReservePriceUpdated", formatAuctionReservePriceUpdated);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionMinBidIncrementPercentageUpdated", formatAuctionMinBidIncrementPercentageUpdated);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("OwnershipTransferred", formatOwnershipTransferred);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("Paused", formatPaused);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("Unpaused", formatUnpaused);

//=======================================
// NounsToken
//=======================================

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DelegateChanged event.
 * @returns Formatted DelegateChanged event.
 */
export function formatDelegateChanged(event: ethers.EventLog): EventData.DelegateChanged {
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
export function formatDelegateVotesChanged(event: ethers.EventLog): EventData.DelegateVotesChanged {
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
export function formatTransfer(event: ethers.EventLog): EventData.Transfer {
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
export function formatApproval(event: ethers.EventLog): EventData.Approval {
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
export function formatApprovalForAll(event: ethers.EventLog): EventData.ApprovalForAll {
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
export function formatNounCreated(event: ethers.EventLog): EventData.NounCreated {
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
export function formatDescriptorLocked(event: ethers.EventLog): EventData.DescriptorLocked {
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
export function formatDescriptorUpdated(event: ethers.EventLog): EventData.DescriptorUpdated {
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
export function formatMinterLocked(event: ethers.EventLog): EventData.MinterLocked {
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
export function formatMinterUpdated(event: ethers.EventLog): EventData.MinterUpdated {
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
export function formatNounBurned(event: ethers.EventLog): EventData.NounBurned {
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
export function formatNoundersDAOUpdated(event: ethers.EventLog): EventData.NoundersDAOUpdated {
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
 * @param event The blockchain SeederLocked event.
 * @returns Formatted SeederLocked event.
 */
export function formatSeederLocked(event: ethers.EventLog): EventData.SeederLocked {
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
export function formatSeederUpdated(event: ethers.EventLog): EventData.SeederUpdated {
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
 * A map of supported events and their associated formatters.
 */
export const NOUNS_TOKEN_FORMATTERS = new Map<string, EventFormatter>();
NOUNS_TOKEN_FORMATTERS.set("DelegateChanged", formatDelegateChanged);
NOUNS_TOKEN_FORMATTERS.set("DelegateVotesChanged", formatDelegateVotesChanged);
NOUNS_TOKEN_FORMATTERS.set("Transfer", formatTransfer);
NOUNS_TOKEN_FORMATTERS.set("Approval", formatApproval);
NOUNS_TOKEN_FORMATTERS.set("ApprovalForAll", formatApprovalForAll);
NOUNS_TOKEN_FORMATTERS.set("NounCreated", formatNounCreated);
NOUNS_TOKEN_FORMATTERS.set("DescriptorLocked", formatDescriptorLocked);
NOUNS_TOKEN_FORMATTERS.set("DescriptorUpdated", formatDescriptorUpdated);
NOUNS_TOKEN_FORMATTERS.set("MinterLocked", formatMinterLocked);
NOUNS_TOKEN_FORMATTERS.set("MinterUpdated", formatMinterUpdated);
NOUNS_TOKEN_FORMATTERS.set("NounBurned", formatNounBurned);
NOUNS_TOKEN_FORMATTERS.set("NoundersDAOUpdated", formatNoundersDAOUpdated);
NOUNS_TOKEN_FORMATTERS.set("OwnershipTransferred", formatOwnershipTransferred);
NOUNS_TOKEN_FORMATTERS.set("SeederLocked", formatSeederLocked);
NOUNS_TOKEN_FORMATTERS.set("SeederUpdated", formatSeederUpdated);

//=======================================
// NounsDAOData
//=======================================

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AdminChanged event.
 * @returns Formatted AdminChanged event.
 */
export function formatAdminChanged(event: ethers.EventLog): EventData.AdminChanged {
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
export function formatBeaconUpgraded(event: ethers.EventLog): EventData.BeaconUpgraded {
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
export function formatCandidateFeedbackSent(event: ethers.EventLog): EventData.CandidateFeedbackSent {
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
export function formatCreateCandidateCostSet(event: ethers.EventLog): EventData.CreateCandidateCostSet {
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
export function formatETHWithdrawn(event: ethers.EventLog): EventData.ETHWithdrawn {
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
export function formatFeeRecipientSet(event: ethers.EventLog): EventData.FeeRecipientSet {
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
export function formatFeedbackSent(event: ethers.EventLog): EventData.FeedbackSent {
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
 * @param event The blockchain ProposalCandidateCanceled event.
 * @returns Formatted ProposalCandidateCanceled event.
 */
export function formatProposalCandidateCanceled(event: ethers.EventLog): EventData.ProposalCandidateCanceled {
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
export function formatProposalCandidateCreated(event: ethers.EventLog): EventData.ProposalCandidateCreated {
	return {
		msgSender: { id: event.args!.msgSender },
		targets: event.args!.targets,
		values: event.args!.at(2).map((val: BigInt) => val.toString()),
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
export function formatProposalCandidateUpdated(event: ethers.EventLog): EventData.ProposalCandidateUpdated {
	return {
		msgSender: { id: event.args!.msgSender },
		targets: event.args!.targets,
		values: event.args!.at(2).map((val: BigInt) => val.toString()),
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
export function formatSignatureAdded(event: ethers.EventLog): EventData.SignatureAdded {
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
export function formatUpdateCandidateCostSet(event: ethers.EventLog): EventData.UpdateCandidateCostSet {
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
export function formatUpgraded(event: ethers.EventLog): EventData.Upgraded {
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
 * A map of supported events and their associated formatters.
 */
export const NOUNS_DAO_DATA_FORMATTERS = new Map<string, EventFormatter>();
NOUNS_DAO_DATA_FORMATTERS.set("AdminChanged", formatAdminChanged);
NOUNS_DAO_DATA_FORMATTERS.set("BeaconUpgraded", formatBeaconUpgraded);
NOUNS_DAO_DATA_FORMATTERS.set("CandidateFeedbackSent", formatCandidateFeedbackSent);
NOUNS_DAO_DATA_FORMATTERS.set("CreateCandidateCostSet", formatCreateCandidateCostSet);
NOUNS_DAO_DATA_FORMATTERS.set("ETHWithdrawn", formatETHWithdrawn);
NOUNS_DAO_DATA_FORMATTERS.set("FeeRecipientSet", formatFeeRecipientSet);
NOUNS_DAO_DATA_FORMATTERS.set("FeedbackSent", formatFeedbackSent);
NOUNS_DAO_DATA_FORMATTERS.set("OwnershipTransferred", formatOwnershipTransferred);
NOUNS_DAO_DATA_FORMATTERS.set("ProposalCandidateCanceled", formatProposalCandidateCanceled);
NOUNS_DAO_DATA_FORMATTERS.set("ProposalCandidateCreated", formatProposalCandidateCreated);
NOUNS_DAO_DATA_FORMATTERS.set("ProposalCandidateUpdated", formatProposalCandidateUpdated);
NOUNS_DAO_DATA_FORMATTERS.set("SignatureAdded", formatSignatureAdded);
NOUNS_DAO_DATA_FORMATTERS.set("UpdateCandidateCostSet", formatUpdateCandidateCostSet);
NOUNS_DAO_DATA_FORMATTERS.set("Upgraded", formatUpgraded);
