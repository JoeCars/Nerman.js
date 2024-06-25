import { EventLog } from "ethers-v6";
import { EventData } from "../../types";

export interface ContractEventFormatter {
	formatEvent: (eventName: string, event: EventLog) => unknown;
}

export class NounsDaoFormatter implements ContractEventFormatter {
	formatEvent(eventName: string, event: EventLog) {
		switch (eventName) {
			case "DAONounsSupplyIncreasedFromEscrow":
				return this.formatDAONounsSupplyIncreasedFromEscrow(event);
			case "DAOWithdrawNounsFromEscrow":
				return this.formatDAOWithdrawNounsFromEscrow(event);
			case "ERC20TokensToIncludeInForkSet":
				return this.formatERC20TokensToIncludeInForkSet(event);
			case "EscrowedToFork":
				return this.formatEscrowedToFork(event);
			case "ExecuteFork":
				return this.formatExecuteFork(event);
			case "ForkDAODeployerSet":
				return this.formatForkDAODeployerSet(event);
			case "ForkPeriodSet":
				return this.formatForkPeriodSet(event);
			case "ForkThresholdSet":
				return this.formatForkThresholdSet(event);
			case "JoinFork":
				return this.formatJoinFork(event);
			case "LastMinuteWindowSet":
				return this.formatLastMinuteWindowSet(event);
			case "MaxQuorumVotesBPSSet":
				return this.formatMaxQuorumVotesBPSSet(event);
			case "MinQuorumVotesBPSSet":
				return this.formatMinQuorumVotesBPSSet(event);
			case "NewAdmin":
				return this.formatNewAdmin(event);
			case "NewImplementation":
				return this.formatNewImplementation(event);
			case "NewPendingAdmin":
				return this.formatNewPendingAdmin(event);
			case "NewPendingVetoer":
				return this.formatNewPendingVetoer(event);
			case "NewVetoer":
				return this.formatNewVetoer(event);
			case "ObjectionPeriodDurationSet":
				return this.formatObjectionPeriodDurationSet(event);
			case "ProposalCanceled":
				return this.formatProposalCanceled(event);
			case "ProposalCreated":
				return this.formatProposalCreated(event);
			case "ProposalCreatedOnTimelockV1":
				return this.formatProposalCreatedOnTimelockV1(event);
			case "ProposalCreatedWithRequirements":
				return this.formatProposalCreatedWithRequirements(event);
			case "ProposalCreatedWithRequirementsV1":
				return this.formatProposalCreatedWithRequirementsV1(event);
			case "ProposalCreatedWithRequirementsV3":
				return this.formatProposalCreatedWithRequirementsV3(event);
			case "ProposalDescriptionUpdated":
				return this.formatProposalDescriptionUpdated(event);
			case "ProposalExecuted":
				return this.formatProposalExecuted(event);
			case "ProposalObjectionPeriodSet":
				return this.formatProposalObjectionPeriodSet(event);
			case "ProposalQueued":
				return this.formatProposalQueued(event);
			case "ProposalThresholdBPSSet":
				return this.formatProposalThresholdBPSSet(event);
			case "ProposalTransactionsUpdated":
				return this.formatProposalTransactionsUpdated(event);
			case "ProposalUpdatablePeriodSet":
				return this.formatProposalUpdatablePeriodSet(event);
			case "ProposalUpdated":
				return this.formatProposalUpdated(event);
			case "ProposalVetoed":
				return this.formatProposalVetoed(event);
			case "QuorumCoefficientSet":
				return this.formatQuorumCoefficientSet(event);
			case "QuorumVotesBPSSet":
				return this.formatQuorumVotesBPSSet(event);
			case "RefundableVote":
				return this.formatRefundableVote(event);
			case "SignatureCancelled":
				return this.formatSignatureCancelled(event);
			case "TimelocksAndAdminSet":
				return this.formatTimelocksAndAdminSet(event);
			case "VoteCast":
				return this.formatVoteCast(event);
			case "VoteCastWithClientId":
				return this.formatVoteCastWithClientId(event);
			case "VoteSnapshotBlockSwitchProposalIdSet":
				return this.formatVoteSnapshotBlockSwitchProposalIdSet(event);
			case "VotingDelaySet":
				return this.formatVotingDelaySet(event);
			case "VotingPeriodSet":
				return this.formatVotingPeriodSet(event);
			case "Withdraw":
				return this.formatWithdraw(event);
			case "WithdrawFromForkEscrow":
				return this.formatWithdrawFromForkEscrow(event);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}

	formatDAONounsSupplyIncreasedFromEscrow(event: EventLog): EventData.DAONounsSupplyIncreasedFromEscrow {
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

	formatDAOWithdrawNounsFromEscrow(event: EventLog): EventData.DAOWithdrawNounsFromEscrow {
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

	formatERC20TokensToIncludeInForkSet(event: EventLog): EventData.ERC20TokensToIncludeInForkSet {
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

	formatEscrowedToFork(event: EventLog): EventData.EscrowedToFork {
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

	formatExecuteFork(event: EventLog): EventData.ExecuteFork {
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

	formatForkDAODeployerSet(event: EventLog): EventData.ForkDAODeployerSet {
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

	formatForkPeriodSet(event: EventLog): EventData.ForkPeriodSet {
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

	formatForkThresholdSet(event: EventLog): EventData.ForkThresholdSet {
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

	formatJoinFork(event: EventLog): EventData.JoinFork {
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

	formatLastMinuteWindowSet(event: EventLog): EventData.LastMinuteWindowSet {
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

	formatMaxQuorumVotesBPSSet(event: EventLog): EventData.MaxQuorumVotesBPSSet {
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

	formatMinQuorumVotesBPSSet(event: EventLog): EventData.MinQuorumVotesBPSSet {
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

	formatNewAdmin(event: EventLog): EventData.NewAdmin {
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

	formatNewImplementation(event: EventLog): EventData.NewImplementation {
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

	formatNewPendingAdmin(event: EventLog): EventData.NewPendingAdmin {
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

	formatNewPendingVetoer(event: EventLog): EventData.NewPendingVetoer {
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

	formatNewVetoer(event: EventLog): EventData.NewVetoer {
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

	formatObjectionPeriodDurationSet(event: EventLog): EventData.ObjectionPeriodDurationSet {
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

	formatProposalCanceled(event: EventLog): EventData.ProposalCanceled {
		return {
			id: Number(event.args!.id),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatProposalCreated(event: EventLog): EventData.ProposalCreated {
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

	formatProposalCreatedOnTimelockV1(event: EventLog): EventData.ProposalCreatedOnTimelockV1 {
		return {
			id: Number(event.args!.id),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatProposalCreatedWithRequirements(event: EventLog): EventData.ProposalCreatedWithRequirements {
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

	formatProposalCreatedWithRequirementsV1(event: EventLog): EventData.ProposalCreatedWithRequirementsV1 {
		return {
			id: Number(event.args.id),
			proposer: { id: event.args.proposer },
			targets: event.args.targets,
			values: event.args.at(3).map((value: bigint) => value.toString()),
			signatures: event.args.signatures,
			calldatas: event.args.calldatas,
			startBlock: event.args.startBlock.toString(),
			endBlock: event.args.endBlock.toString(),
			proposalThreshold: Number(event.args!.proposalThreshold),
			quorumVotes: Number(event.args!.quorumVotes),
			description: event.args.description,
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatProposalCreatedWithRequirementsV3(event: EventLog): EventData.ProposalCreatedWithRequirementsV3 {
		return {
			id: Number(event.args.id),
			proposer: { id: event.args.proposer },
			signers: event.args.signers,
			targets: event.args.targets,
			values: event.args.at(4).map((value: bigint) => value.toString()),
			signatures: event.args.signatures,
			calldatas: event.args.calldatas,
			startBlock: event.args.startBlock.toString(),
			endBlock: event.args.endBlock.toString(),
			updatePeriodEndBlock: event.args.updatePeriodEndBlock.toString(),
			proposalThreshold: Number(event.args!.proposalThreshold),
			quorumVotes: Number(event.args!.quorumVotes),
			description: event.args.description,
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatProposalDescriptionUpdated(event: EventLog): EventData.ProposalDescriptionUpdated {
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

	formatProposalExecuted(event: EventLog): EventData.ProposalExecuted {
		return {
			id: Number(event.args!.id),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatProposalObjectionPeriodSet(event: EventLog): EventData.ProposalObjectionPeriodSet {
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

	formatProposalQueued(event: EventLog): EventData.ProposalQueued {
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

	formatProposalThresholdBPSSet(event: EventLog): EventData.ProposalThresholdBPSSet {
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

	formatProposalTransactionsUpdated(event: EventLog): EventData.ProposalTransactionsUpdated {
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

	formatProposalUpdatablePeriodSet(event: EventLog): EventData.ProposalUpdatablePeriodSet {
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

	formatProposalUpdated(event: EventLog): EventData.ProposalUpdated {
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

	formatProposalVetoed(event: EventLog): EventData.ProposalVetoed {
		return {
			id: Number(event.args!.id),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatQuorumCoefficientSet(event: EventLog): EventData.QuorumCoefficientSet {
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

	formatQuorumVotesBPSSet(event: EventLog): EventData.QuorumVotesBPSSet {
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

	formatRefundableVote(event: EventLog): EventData.RefundableVote {
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

	formatSignatureCancelled(event: EventLog): EventData.SignatureCancelled {
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

	formatTimelocksAndAdminSet(event: EventLog): EventData.TimelocksAndAdminSet {
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

	formatVoteCast(event: EventLog): EventData.VoteCast {
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

	formatVoteCastWithClientId(event: EventLog): EventData.VoteCastWithClientId {
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

	formatVoteSnapshotBlockSwitchProposalIdSet(event: EventLog): EventData.VoteSnapshotBlockSwitchProposalIdSet {
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

	formatVotingDelaySet(event: EventLog): EventData.VotingDelaySet {
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

	formatVotingPeriodSet(event: EventLog): EventData.VotingPeriodSet {
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

	formatWithdraw(event: EventLog): EventData.Withdraw {
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

	formatWithdrawFromForkEscrow(event: EventLog): EventData.WithdrawFromForkEscrow {
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
}

export class NounsAuctionFormatter implements ContractEventFormatter {
	formatEvent(eventName: string, event: EventLog) {
		switch (eventName) {
			case "AuctionBid":
				return this.formatAuctionBid(event);
			case "AuctionBidWithClientId":
				return this.formatAuctionBidWithClientId(event);
			case "AuctionCreated":
				return this.formatAuctionCreated(event);
			case "AuctionExtended":
				return this.formatAuctionExtended(event);
			case "AuctionMinBidIncrementPercentageUpdated":
				return this.formatAuctionMinBidIncrementPercentageUpdated(event);
			case "AuctionReservePriceUpdated":
				return this.formatAuctionReservePriceUpdated(event);
			case "AuctionSettled":
				return this.formatAuctionSettled(event);
			case "AuctionSettledWithClientId":
				return this.formatAuctionSettledWithClientId(event);
			case "AuctionTimeBufferUpdated":
				return this.formatAuctionTimeBufferUpdated(event);
			case "OwnershipTransferred":
				return this.formatOwnershipTransferred(event);
			case "Paused":
				return this.formatPaused(event);
			case "Unpaused":
				return this.formatUnpaused(event);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}

	formatAuctionBid(event: EventLog): EventData.AuctionBid {
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

	formatAuctionBidWithClientId(event: EventLog): EventData.AuctionBidWithClientId {
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

	formatAuctionCreated(event: EventLog): EventData.AuctionCreated {
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

	formatAuctionExtended(event: EventLog): EventData.AuctionExtended {
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

	formatAuctionMinBidIncrementPercentageUpdated(event: EventLog): EventData.AuctionMinBidIncrementPercentageUpdated {
		return {
			minBidIncrementPercentage: Number(event.args!.minBidIncrementPercentage),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatAuctionReservePriceUpdated(event: EventLog): EventData.AuctionReservePriceUpdated {
		return {
			reservePrice: event.args!.reservePrice.toString(),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatAuctionSettled(event: EventLog): EventData.AuctionSettled {
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

	formatAuctionSettledWithClientId(event: EventLog): EventData.AuctionSettledWithClientId {
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

	formatAuctionTimeBufferUpdated(event: EventLog): EventData.AuctionTimeBufferUpdated {
		return {
			timeBuffer: event.args!.timeBuffer.toString(),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatOwnershipTransferred(event: EventLog): EventData.OwnershipTransferred {
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

	formatPaused(event: EventLog): EventData.Paused {
		return {
			address: { id: event.args!.account },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatUnpaused(event: EventLog): EventData.Unpaused {
		return {
			address: { id: event.args!.account },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}
}

export class NounsTokenFormatter implements ContractEventFormatter {
	formatEvent(eventName: string, event: EventLog) {
		switch (eventName) {
			case "DelegateChanged":
				return this.formatDelegateChanged(event);
			case "DelegateVotesChanged":
				return this.formatDelegateVotesChanged(event);
			case "Transfer":
				return this.formatTransfer(event);
			case "Approval":
				return this.formatApproval(event);
			case "ApprovalForAll":
				return this.formatApprovalForAll(event);
			case "NounCreated":
				return this.formatNounCreated(event);
			case "DescriptorLocked":
				return this.formatDescriptorLocked(event);
			case "DescriptorUpdated":
				return this.formatDescriptorUpdated(event);
			case "MinterLocked":
				return this.formatMinterLocked(event);
			case "MinterUpdated":
				return this.formatMinterUpdated(event);
			case "NounBurned":
				return this.formatNounBurned(event);
			case "NoundersDAOUpdated":
				return this.formatNoundersDAOUpdated(event);
			case "OwnershipTransferred":
				return this.formatOwnershipTransferred(event);
			case "SeederLocked":
				return this.formatSeederLocked(event);
			case "SeederUpdated":
				return this.formatSeederUpdated(event);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}

	formatDelegateChanged(event: EventLog): EventData.DelegateChanged {
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

	formatDelegateVotesChanged(event: EventLog): EventData.DelegateVotesChanged {
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

	formatTransfer(event: EventLog): EventData.Transfer {
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

	formatApproval(event: EventLog): EventData.Approval {
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

	formatApprovalForAll(event: EventLog): EventData.ApprovalForAll {
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

	formatNounCreated(event: EventLog): EventData.NounCreated {
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

	formatDescriptorLocked(event: EventLog): EventData.DescriptorLocked {
		return {
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatDescriptorUpdated(event: EventLog): EventData.DescriptorUpdated {
		return {
			descriptor: { id: event.args!._descriptor },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatMinterLocked(event: EventLog): EventData.MinterLocked {
		return {
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatMinterUpdated(event: EventLog): EventData.MinterUpdated {
		return {
			minter: { id: event.args!._minter },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatNounBurned(event: EventLog): EventData.NounBurned {
		return {
			id: Number(event.args!.nounId),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatNoundersDAOUpdated(event: EventLog): EventData.NoundersDAOUpdated {
		return {
			noundersDAO: { id: event.args!._noundersDAO },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatOwnershipTransferred(event: EventLog): EventData.OwnershipTransferred {
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

	formatSeederLocked(event: EventLog): EventData.SeederLocked {
		return {
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatSeederUpdated(event: EventLog): EventData.SeederUpdated {
		return {
			seeder: { id: event.args!._seeder },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}
}

export class NounsDaoDataFormatter implements ContractEventFormatter {
	formatEvent(eventName: string, event: EventLog) {
		switch (eventName) {
			case "AdminChanged":
				return this.formatAdminChanged(event);
			case "BeaconUpgraded":
				return this.formatBeaconUpgraded(event);
			case "CandidateFeedbackSent":
				return this.formatCandidateFeedbackSent(event);
			case "CreateCandidateCostSet":
				return this.formatCreateCandidateCostSet(event);
			case "ETHWithdrawn":
				return this.formatETHWithdrawn(event);
			case "FeeRecipientSet":
				return this.formatFeeRecipientSet(event);
			case "FeedbackSent":
				return this.formatFeedbackSent(event);
			case "OwnershipTransferred":
				return this.formatOwnershipTransferred(event);
			case "ProposalCandidateCanceled":
				return this.formatProposalCandidateCanceled(event);
			case "ProposalCandidateCreated":
				return this.formatProposalCandidateCreated(event);
			case "ProposalCandidateUpdated":
				return this.formatProposalCandidateUpdated(event);
			case "SignatureAdded":
				return this.formatSignatureAdded(event);
			case "UpdateCandidateCostSet":
				return this.formatUpdateCandidateCostSet(event);
			case "Upgraded":
				return this.formatUpgraded(event);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}

	formatAdminChanged(event: EventLog): EventData.AdminChanged {
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

	formatBeaconUpgraded(event: EventLog): EventData.BeaconUpgraded {
		return {
			beacon: { id: event.args!.beacon },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatCandidateFeedbackSent(event: EventLog): EventData.CandidateFeedbackSent {
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

	formatCreateCandidateCostSet(event: EventLog): EventData.CreateCandidateCostSet {
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

	formatETHWithdrawn(event: EventLog): EventData.ETHWithdrawn {
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

	formatFeeRecipientSet(event: EventLog): EventData.FeeRecipientSet {
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

	formatFeedbackSent(event: EventLog): EventData.FeedbackSent {
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

	formatOwnershipTransferred(event: EventLog): EventData.OwnershipTransferred {
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

	formatProposalCandidateCanceled(event: EventLog): EventData.ProposalCandidateCanceled {
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

	formatProposalCandidateCreated(event: EventLog): EventData.ProposalCandidateCreated {
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

	formatProposalCandidateUpdated(event: EventLog): EventData.ProposalCandidateUpdated {
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

	formatSignatureAdded(event: EventLog): EventData.SignatureAdded {
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

	formatUpdateCandidateCostSet(event: EventLog): EventData.UpdateCandidateCostSet {
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

	formatUpgraded(event: EventLog): EventData.Upgraded {
		return {
			implementation: { id: event.args!.implementation },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}
}

export class NounsExecutorFormatter implements ContractEventFormatter {
	formatEvent(eventName: string, event: EventLog) {
		switch (eventName) {
			case "AdminChanged":
				return this.formatAdminChanged(event);
			case "BeaconUpgraded":
				return this.formatBeaconUpgraded(event);
			case "CancelTransaction":
				return this.formatCancelTransaction(event);
			case "ERC20Sent":
				return this.formatErc20Sent(event);
			case "ETHSent":
				return this.formatEthSent(event);
			case "ExecuteTransaction":
				return this.formatExecuteTransaction(event);
			case "NewAdmin":
				return this.formatNewAdmin(event);
			case "NewDelay":
				return this.formatNewDelay(event);
			case "NewPendingAdmin":
				return this.formatNewPendingAdmin(event);
			case "QueueTransaction":
				return this.formatQueueTransaction(event);
			case "Upgraded":
				return this.formatUpgraded(event);
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}

	formatAdminChanged(event: EventLog): EventData.AdminChanged {
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

	formatBeaconUpgraded(event: EventLog): EventData.BeaconUpgraded {
		return {
			beacon: { id: event.args!.beacon },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatCancelTransaction(event: EventLog): EventData.CancelTransaction {
		return {
			txHash: event.args!.txHash,
			target: { id: event.args!.target },
			value: event.args!.value.toString(),
			signature: event.args!.signature,
			data: event.args!.data,
			eta: event.args!.eta.toString(),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatErc20Sent(event: EventLog): EventData.ERC20Sent {
		return {
			to: { id: event.args!.to },
			erc20Token: { id: event.args!.erc20Token },
			amount: event.args!.amount.toString(),
			success: event.args!.success,
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatEthSent(event: EventLog): EventData.ETHSent {
		return {
			to: { id: event.args!.to },
			amount: event.args!.amount.toString(),
			success: event.args!.success,
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatExecuteTransaction(event: EventLog): EventData.ExecuteTransaction {
		return {
			txHash: event.args!.txHash,
			target: { id: event.args!.target },
			value: event.args!.value.toString(),
			signature: event.args!.signature,
			data: event.args!.data,
			eta: event.args!.eta.toString(),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatNewAdmin(event: EventLog): EventData.NewAdmin {
		return {
			newAdmin: { id: event.args!.newAdmin },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatNewDelay(event: EventLog): EventData.NewDelay {
		return {
			newDelay: event.args!.newDelay,
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatNewPendingAdmin(event: EventLog): EventData.NewPendingAdmin {
		return {
			newPendingAdmin: { id: event.args!.newPendingAdmin },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatQueueTransaction(event: EventLog): EventData.QueueTransaction {
		return {
			txHash: event.args!.txHash,
			target: { id: event.args!.target },
			value: event.args!.value.toString(),
			signature: event.args!.signature,
			data: event.args!.data,
			eta: event.args!.eta.toString(),
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}

	formatUpgraded(event: EventLog): EventData.Upgraded {
		return {
			implementation: { id: event.args!.implementation },
			event: {
				blockNumber: event.blockNumber,
				blockHash: event.blockHash,
				transactionHash: event.transactionHash
			}
		};
	}
}
