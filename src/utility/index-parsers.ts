import { ethers } from "ethers";

import { Indexer } from "../types";

//=======================================
// NounsDAO
//=======================================

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
	};
}

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
NOUNS_DAO_PARSERS.set("ProposalCreatedWithRequirements", parseProposalCreatedWithRequirementsEvent);
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

export const NOUNS_DATA_PARSERS = new Map<string, Function>();
NOUNS_DAO_PARSERS.set("AdminChanged", parseAdminChangedEvent);
NOUNS_DAO_PARSERS.set("BeaconUpgraded", parseBeaconUpgradedEvent);
NOUNS_DAO_PARSERS.set("CandidateFeedbackSent", parseCandidateFeedbackSentEvent);
NOUNS_DAO_PARSERS.set("CreateCandidateCostSet", parseCreateCandidateCostSetEvent);
NOUNS_DAO_PARSERS.set("ETHWithdrawn", parseETHWithdrawnEvent);
NOUNS_DAO_PARSERS.set("FeeRecipientSet", parseFeeRecipientSetEvent);
NOUNS_DAO_PARSERS.set("FeedbackSent", parseFeedbackSentEvent);
NOUNS_DAO_PARSERS.set("OwnershipTransferred", parseOwnershipTransferredEvent3);
NOUNS_DAO_PARSERS.set("ProposalCandidateCanceled", parseProposalCandidateCanceledEvent);
NOUNS_DAO_PARSERS.set("ProposalCandidateCreated", parseProposalCandidateCreatedEvent);
NOUNS_DAO_PARSERS.set("ProposalCandidateUpdated", parseProposalCandidateUpdatedEvent);
NOUNS_DAO_PARSERS.set("SignatureAdded", parseSignatureAddedEvent);
NOUNS_DAO_PARSERS.set("UpdateCandidateCostSet", parseUpdateCandidateCostSetEvent);
NOUNS_DAO_PARSERS.set("Upgraded", parseUpgradedEvent);
