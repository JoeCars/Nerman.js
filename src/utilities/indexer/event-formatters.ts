import { EventLog } from "ethers-v6";

import { EventData, EventFormatter } from "../../types";

//=======================================
// NounsDAO
//=======================================

export function formatDAONounsSupplyIncreasedFromEscrow(event: EventLog): EventData.DAONounsSupplyIncreasedFromEscrow {
	return {
		numTokens: Number(event.args.numTokens),
		to: { id: event.args.to },
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain DAOWithdrawNounsFromEscrow event.
 * @returns Formatted DAOWithdrawNounsFromEscrow event.
 */
export function formatDAOWithdrawNounsFromEscrow(event: EventLog): EventData.DAOWithdrawNounsFromEscrow {
	return {
		tokenIds: event.args!.tokenIds.map((tokenId: bigint) => {
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
export function formatERC20TokensToIncludeInForkSet(event: EventLog): EventData.ERC20TokensToIncludeInForkSet {
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
export function formatEscrowedToFork(event: EventLog): EventData.EscrowedToFork {
	return {
		forkId: Number(event.args!.forkId),
		owner: { id: event.args!.owner },
		tokenIds: event.args!.tokenIds.map((tokenId: bigint) => {
			return Number(tokenId);
		}),
		proposalIds: event.args!.proposalIds.map((proposalId: bigint) => {
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
export function formatExecuteFork(event: EventLog): EventData.ExecuteFork {
	return {
		forkId: Number(event.args!.forkId),
		forkTreasury: { id: event.args!.forkTreasury },
		forkToken: { id: event.args!.forkToken },
		forkEndTimestamp: event.args!.forkEndTimestamp.toString(),
		tokensInEscrow: event.args!.tokensInEscrow.toString(),
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
export function formatForkDAODeployerSet(event: EventLog): EventData.ForkDAODeployerSet {
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
export function formatForkPeriodSet(event: EventLog): EventData.ForkPeriodSet {
	return {
		oldForkPeriod: event.args!.oldForkPeriod.toString(),
		newForkPeriod: event.args!.newForkPeriod.toString(),
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
export function formatForkThresholdSet(event: EventLog): EventData.ForkThresholdSet {
	return {
		oldForkThreshold: event.args!.oldForkThreshold.toString(),
		newForkThreshold: event.args!.newForkThreshold.toString(),
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
export function formatJoinFork(event: EventLog): EventData.JoinFork {
	return {
		forkId: Number(event.args!.forkId),
		owner: { id: event.args!.owner },
		tokenIds: event.args!.tokenIds.map((tokenId: bigint) => {
			return Number(tokenId);
		}),
		proposalIds: event.args!.proposalIds.map((proposalId: bigint) => {
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
export function formatLastMinuteWindowSet(event: EventLog): EventData.LastMinuteWindowSet {
	return {
		oldLastMinuteWindowInBlocks: event.args!.oldLastMinuteWindowInBlocks.toString(),
		newLastMinuteWindowInBlocks: event.args!.newLastMinuteWindowInBlocks.toString(),
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
export function formatMaxQuorumVotesBPSSet(event: EventLog): EventData.MaxQuorumVotesBPSSet {
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
export function formatMinQuorumVotesBPSSet(event: EventLog): EventData.MinQuorumVotesBPSSet {
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
export function formatNewAdmin(event: EventLog): EventData.NewAdmin {
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
export function formatNewImplementation(event: EventLog): EventData.NewImplementation {
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
export function formatNewPendingAdmin(event: EventLog): EventData.NewPendingAdmin {
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
export function formatNewPendingVetoer(event: EventLog): EventData.NewPendingVetoer {
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
export function formatNewVetoer(event: EventLog): EventData.NewVetoer {
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
export function formatObjectionPeriodDurationSet(event: EventLog): EventData.ObjectionPeriodDurationSet {
	return {
		oldObjectionPeriodDurationInBlocks: event.args!.oldObjectionPeriodDurationInBlocks.toString(),
		newObjectionPeriodDurationInBlocks: event.args!.newObjectionPeriodDurationInBlocks.toString(),
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
export function formatProposalCanceled(event: EventLog): EventData.ProposalCanceled {
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
export function formatProposalCreated(event: EventLog): EventData.ProposalCreated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args.at(3).map((val: bigint) => val.toString()),
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		startBlock: event.args!.startBlock.toString(),
		endBlock: event.args!.endBlock.toString(),
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
export function formatProposalCreatedOnTimelockV1(event: EventLog): EventData.ProposalCreatedOnTimelockV1 {
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
export function formatProposalCreatedWithRequirements(event: EventLog): EventData.ProposalCreatedWithRequirements {
	return {
		id: Number(event.args!.id),
		signers: event.args!.signers,
		updatePeriodEndBlock: event.args!.updatePeriodEndBlock?.toString(),
		proposalThreshold: Number(event.args!.proposalThreshold),
		quorumVotes: Number(event.args!.quorumVotes),
		clientId: Number(event.args!.clientId),
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
export function formatProposalDescriptionUpdated(event: EventLog): EventData.ProposalDescriptionUpdated {
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
export function formatProposalExecuted(event: EventLog): EventData.ProposalExecuted {
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
export function formatProposalObjectionPeriodSet(event: EventLog): EventData.ProposalObjectionPeriodSet {
	return {
		id: Number(event.args!.id),
		objectionPeriodEndBlock: event.args!.objectionPeriodEndBlock.toString(),
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
export function formatProposalQueued(event: EventLog): EventData.ProposalQueued {
	return {
		id: Number(event.args!.id),
		eta: event.args!.eta.toString(),
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
export function formatProposalThresholdBPSSet(event: EventLog): EventData.ProposalThresholdBPSSet {
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
export function formatProposalTransactionsUpdated(event: EventLog): EventData.ProposalTransactionsUpdated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args!.at(3).map((val: bigint) => val.toString()),
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
export function formatProposalUpdatablePeriodSet(event: EventLog): EventData.ProposalUpdatablePeriodSet {
	return {
		oldProposalUpdatablePeriodInBlocks: event.args!.oldProposalUpdatablePeriodInBlocks.toString(),
		newProposalUpdatablePeriodInBlocks: event.args!.newProposalUpdatablePeriodInBlocks.toString(),
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
export function formatProposalUpdated(event: EventLog): EventData.ProposalUpdated {
	return {
		id: Number(event.args!.id),
		proposer: { id: event.args!.proposer },
		targets: event.args!.targets,
		values: event.args!.at(3).map((val: bigint) => val.toString()),
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
export function formatProposalVetoed(event: EventLog): EventData.ProposalVetoed {
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
export function formatQuorumCoefficientSet(event: EventLog): EventData.QuorumCoefficientSet {
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
export function formatQuorumVotesBPSSet(event: EventLog): EventData.QuorumVotesBPSSet {
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
export function formatRefundableVote(event: EventLog): EventData.RefundableVote {
	return {
		voter: { id: event.args!.voter },
		refundAmount: event.args!.refundAmount.toString(),
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
export function formatSignatureCancelled(event: EventLog): EventData.SignatureCancelled {
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
export function formatTimelocksAndAdminSet(event: EventLog): EventData.TimelocksAndAdminSet {
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
export function formatVoteCast(event: EventLog): EventData.VoteCast {
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

export function formatVoteCastWithClientId(event: EventLog): EventData.VoteCastWithClientId {
	return {
		voter: { id: event.args!.voter },
		proposalId: Number(event.args!.proposalId),
		clientId: Number(event.args!.clientId),
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
export function formatVoteSnapshotBlockSwitchProposalIdSet(event: EventLog): EventData.VoteSnapshotBlockSwitchProposalIdSet {
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
export function formatVotingDelaySet(event: EventLog): EventData.VotingDelaySet {
	return {
		oldVotingDelay: event.args!.oldVotingDelay.toString(),
		newVotingDelay: event.args!.newVotingDelay.toString(),
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
export function formatVotingPeriodSet(event: EventLog): EventData.VotingPeriodSet {
	return {
		oldVotingPeriod: event.args!.oldVotingPeriod.toString(),
		newVotingPeriod: event.args!.newVotingPeriod.toString(),
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
export function formatWithdraw(event: EventLog): EventData.Withdraw {
	return {
		amount: event.args!.amount.toString(),
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
export function formatWithdrawFromForkEscrow(event: EventLog): EventData.WithdrawFromForkEscrow {
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
NOUNS_DAO_FORMATTERS.set("DAONounsSupplyIncreasedFromEscrow", formatDAONounsSupplyIncreasedFromEscrow);
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
NOUNS_DAO_FORMATTERS.set("VoteCastWithClientId", formatVoteCastWithClientId);
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
 * @param event The blockchain AuctionBid event.
 * @returns Formatted AuctionBid event.
 */
export function formatAuctionBid(event: EventLog): EventData.AuctionBid {
	return {
		id: Number(event.args!.nounId),
		bidder: { id: event.args!.sender },
		amount: event.args!.value.toString(),
		extended: event.args!.extended,
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

export function formatAuctionBidWithClientId(event: EventLog): EventData.AuctionBidWithClientId {
	return {
		id: Number(event.args!.nounId),
		amount: event.args!.value.toString(),
		clientId: Number(event.args!.clientId),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

/**
 * Formats blockchain event data into an object.
 * @param event The blockchain AuctionCreated event.
 * @returns Formatted AuctionCreated event.
 */
export function formatAuctionCreated(event: EventLog): EventData.AuctionCreated {
	return {
		id: Number(event.args!.nounId),
		startTime: event.args!.startTime.toString(),
		endTime: event.args!.endTime.toString(),
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
export function formatAuctionExtended(event: EventLog): EventData.AuctionExtended {
	return {
		id: Number(event.args!.nounId),
		endTime: event.args!.endTime.toString(),
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
	event: EventLog
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
 * @param event The blockchain AuctionReservePriceUpdated event.
 * @returns Formatted AuctionReservePriceUpdated event.
 */
export function formatAuctionReservePriceUpdated(event: EventLog): EventData.AuctionReservePriceUpdated {
	return {
		reservePrice: event.args!.reservePrice.toString(),
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
export function formatAuctionSettled(event: EventLog): EventData.AuctionSettled {
	return {
		id: Number(event.args!.nounId),
		winner: { id: event.args!.winner },
		amount: event.args!.amount.toString(),
		event: {
			blockNumber: event.blockNumber,
			blockHash: event.blockHash,
			transactionHash: event.transactionHash
		}
	};
}

export function formatAuctionSettledWithClientId(event: EventLog): EventData.AuctionSettledWithClientId {
	return {
		id: Number(event.args!.nounId),
		clientId: Number(event.args!.clientId),
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
export function formatAuctionTimeBufferUpdated(event: EventLog): EventData.AuctionTimeBufferUpdated {
	return {
		timeBuffer: event.args!.timeBuffer.toString(),
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
export function formatOwnershipTransferred(event: EventLog): EventData.OwnershipTransferred {
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
export function formatPaused(event: EventLog): EventData.Paused {
	return {
		address: { id: event.args!.account },
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
export function formatUnpaused(event: EventLog): EventData.Unpaused {
	return {
		address: { id: event.args!.account },
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
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionBid", formatAuctionBid);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionBidWithClientId", formatAuctionBidWithClientId);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionCreated", formatAuctionCreated);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionExtended", formatAuctionExtended);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionMinBidIncrementPercentageUpdated", formatAuctionMinBidIncrementPercentageUpdated);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionReservePriceUpdated", formatAuctionReservePriceUpdated);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionSettled", formatAuctionSettled);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionSettledWithClientId", formatAuctionSettledWithClientId);
NOUNS_AUCTION_HOUSE_FORMATTERS.set("AuctionTimeBufferUpdated", formatAuctionTimeBufferUpdated);
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
export function formatDelegateChanged(event: EventLog): EventData.DelegateChanged {
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
export function formatDelegateVotesChanged(event: EventLog): EventData.DelegateVotesChanged {
	return {
		delegate: { id: event.args!.delegate },
		previousBalance: event.args!.previousBalance.toString(),
		newBalance: event.args!.newBalance.toString(),
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
export function formatTransfer(event: EventLog): EventData.Transfer {
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
export function formatApproval(event: EventLog): EventData.Approval {
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
export function formatApprovalForAll(event: EventLog): EventData.ApprovalForAll {
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
export function formatNounCreated(event: EventLog): EventData.NounCreated {
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
export function formatDescriptorLocked(event: EventLog): EventData.DescriptorLocked {
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
export function formatDescriptorUpdated(event: EventLog): EventData.DescriptorUpdated {
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
export function formatMinterLocked(event: EventLog): EventData.MinterLocked {
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
export function formatMinterUpdated(event: EventLog): EventData.MinterUpdated {
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
export function formatNounBurned(event: EventLog): EventData.NounBurned {
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
export function formatNoundersDAOUpdated(event: EventLog): EventData.NoundersDAOUpdated {
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
export function formatSeederLocked(event: EventLog): EventData.SeederLocked {
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
export function formatSeederUpdated(event: EventLog): EventData.SeederUpdated {
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
export function formatAdminChanged(event: EventLog): EventData.AdminChanged {
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
export function formatBeaconUpgraded(event: EventLog): EventData.BeaconUpgraded {
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
export function formatCandidateFeedbackSent(event: EventLog): EventData.CandidateFeedbackSent {
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
export function formatCreateCandidateCostSet(event: EventLog): EventData.CreateCandidateCostSet {
	return {
		oldCreateCandidateCost: event.args!.oldCreateCandidateCost.toString(),
		newCreateCandidateCost: event.args!.newCreateCandidateCost.toString(),
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
export function formatETHWithdrawn(event: EventLog): EventData.ETHWithdrawn {
	return {
		to: { id: event.args!.to },
		amount: event.args!.amount.toString(),
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
export function formatFeeRecipientSet(event: EventLog): EventData.FeeRecipientSet {
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
export function formatFeedbackSent(event: EventLog): EventData.FeedbackSent {
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
export function formatProposalCandidateCanceled(event: EventLog): EventData.ProposalCandidateCanceled {
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
export function formatProposalCandidateCreated(event: EventLog): EventData.ProposalCandidateCreated {
	return {
		msgSender: { id: event.args!.msgSender },
		targets: event.args!.targets,
		values: event.args!.at(2).map((val: bigint) => val.toString()),
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
export function formatProposalCandidateUpdated(event: EventLog): EventData.ProposalCandidateUpdated {
	return {
		msgSender: { id: event.args!.msgSender },
		targets: event.args!.targets,
		values: event.args!.at(2).map((val: bigint) => val.toString()),
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
export function formatSignatureAdded(event: EventLog): EventData.SignatureAdded {
	return {
		signer: { id: event.args!.signer },
		sig: event.args!.sig,
		expirationTimestamp: event.args!.expirationTimestamp.toString(),
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
export function formatUpdateCandidateCostSet(event: EventLog): EventData.UpdateCandidateCostSet {
	return {
		oldUpdateCandidateCost: event.args!.oldUpdateCandidateCost.toString(),
		newUpdateCandidateCost: event.args!.newUpdateCandidateCost.toString(),
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
export function formatUpgraded(event: EventLog): EventData.Upgraded {
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
