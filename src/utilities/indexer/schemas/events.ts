import { Schema, model } from "mongoose";

const EventSchema = new Schema({
	transactionHash: {
		type: Schema.Types.String,
		required: true
	},
	blockHash: {
		type: Schema.Types.String,
		required: true
	},
	blockNumber: {
		type: Schema.Types.String,
		required: true
	}
});

// ================================
// Nouns DAO
// ================================

const DAOWithdrawNounsFromEscrowSchema = new Schema(
	{
		tokenIds: {
			type: [Schema.Types.Number],
			required: true
		},
		to: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const DAOWithdrawNounsFromEscrow = model("DAOWithdrawNounsFromEscrow", DAOWithdrawNounsFromEscrowSchema);

const ERC20TokensToIncludeInForkSetSchema = new Schema(
	{
		oldErc20Tokens: {
			type: [Schema.Types.String],
			required: true
		},
		newErc20tokens: {
			type: [Schema.Types.String],
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ERC20TokensToIncludeInForkSet = model("ERC20TokensToIncludeInForkSet", ERC20TokensToIncludeInForkSetSchema);

const EscrowedToForkSchema = new Schema(
	{
		forkId: {
			type: Schema.Types.Number,
			required: true
		},
		owner: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		tokenIds: {
			type: [Schema.Types.String],
			required: true
		},
		proposalIds: {
			type: [Schema.Types.String],
			required: true
		},
		reason: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const EscrowedToFork = model("EscrowedToFork", EscrowedToForkSchema);

const ExecuteForkSchema = new Schema(
	{
		forkId: {
			type: Schema.Types.Number,
			required: true
		},
		forkTreasury: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		forkToken: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		forkEndTimestamp: {
			type: Schema.Types.String,
			required: true
		},
		tokensInEscrow: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ExecuteFork = model("ExecuteFork", ExecuteForkSchema);

const ForkDAODeployerSetSchema = new Schema(
	{
		oldForkDAODeployer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newForkDAODeployer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ForkDAODeployerSet = model("ForkDAODeployerSet", ForkDAODeployerSetSchema);

const ForkPeriodSetSchema = new Schema(
	{
		oldForkPeriod: {
			type: Schema.Types.String,
			required: true
		},
		newForkPeriod: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ForkPeriodSet = model("ForkPeriodSet", ForkPeriodSetSchema);

const ForkThresholdSetSchema = new Schema(
	{
		oldForkThreshold: {
			type: Schema.Types.String,
			required: true
		},
		newForkThreshold: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ForkThresholdSet = model("ForkThresholdSet", ForkThresholdSetSchema);

const JoinForkSchema = new Schema(
	{
		forkId: {
			type: Schema.Types.Number,
			required: true
		},
		owner: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		tokenIds: {
			type: [Schema.Types.Number],
			required: true
		},
		proposalIds: {
			type: [Schema.Types.Number],
			required: true
		},
		reason: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const JoinFork = model("JoinFork", JoinForkSchema);

const LastMinuteWindowSetSchema = new Schema(
	{
		oldLastMinuteWindowInBlocks: {
			type: Schema.Types.String,
			required: true
		},
		newLastMinuteWindowInBlocks: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const LastMinuteWindowSet = model("LastMinuteWindowSet", LastMinuteWindowSetSchema);

const MaxQuorumVotesBPSSetSchema = new Schema(
	{
		oldMaxQuorumVotesBPS: {
			type: Schema.Types.Number,
			required: true
		},
		newMaxQuorumVotesBPS: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const MaxQuorumVotesBPSSet = model("MaxQuorumVotesBPSSet", MaxQuorumVotesBPSSetSchema);

const MinQuorumVotesBPSSetSchema = new Schema(
	{
		oldMinQuorumVotesBPS: {
			type: Schema.Types.Number,
			required: true
		},
		newMinQuorumVotesBPS: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const MinQuorumVotesBPSSet = model("MinQuorumVotesBPSSet", MinQuorumVotesBPSSetSchema);

const NewAdminSchema = new Schema(
	{
		oldAdmin: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newAdmin: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const NewAdmin = model("NewAdmin", NewAdminSchema);

const NewImplementationSchema = new Schema(
	{
		oldImplementation: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newImplementation: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const NewImplementation = model("NewImplementation", NewImplementationSchema);

const NewPendingAdminSchema = new Schema(
	{
		oldPendingAdmin: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newPendingAdmin: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const NewPendingAdmin = model("NewPendingAdmin", NewPendingAdminSchema);

const NewPendingVetoerSchema = new Schema(
	{
		oldPendingVetoer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newPendingVetoer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const NewPendingVetoer = model("NewPendingVetoer", NewPendingVetoerSchema);

const NewVetoerSchema = new Schema(
	{
		oldVetoer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newVetoer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const NewVetoer = model("NewVetoer", NewVetoerSchema);

const ObjectionPeriodDurationSetSchema = new Schema(
	{
		oldObjectionPeriodDurationInBlocks: {
			type: Schema.Types.String,
			required: true
		},
		newObjectionPeriodDurationInBlocks: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ObjectionPeriodDurationSet = model("ObjectionPeriodDurationSet", ObjectionPeriodDurationSetSchema);

const ProposalCanceledSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalCanceled = model("ProposalCanceled", ProposalCanceledSchema);

const ProposalCreatedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		proposer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		targets: {
			type: [Schema.Types.String],
			required: true
		},
		values: {
			type: [Schema.Types.String],
			required: true
		},
		signatures: {
			type: [Schema.Types.String],
			required: true
		},
		calldatas: {
			type: [Schema.Types.Mixed],
			required: true
		},
		startBlock: {
			type: Schema.Types.String,
			required: true
		},
		endBlock: {
			type: Schema.Types.String,
			required: true
		},
		description: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalCreated = model("ProposalCreated", ProposalCreatedSchema);

const ProposalCreatedOnTimelockV1Schema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalCreatedOnTimelockV1 = model("ProposalCreatedOnTimelockV1", ProposalCreatedOnTimelockV1Schema);

const ProposalCreatedWithRequirementsSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		proposer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		signers: {
			type: [Schema.Types.String],
			required: false
		},
		targets: {
			type: [Schema.Types.String],
			required: true
		},
		values: {
			type: [Schema.Types.String],
			required: true
		},
		signatures: {
			type: [Schema.Types.String],
			required: true
		},
		calldatas: {
			type: [Schema.Types.Mixed],
			required: true
		},
		startBlock: {
			type: Schema.Types.String,
			required: true
		},
		endBlock: {
			type: Schema.Types.String,
			required: true
		},
		updatePeriodEndBlock: {
			type: Schema.Types.String,
			required: false
		},
		proposalThreshold: {
			type: Schema.Types.Number,
			required: true
		},
		quorumVotes: {
			type: Schema.Types.Number,
			required: true
		},
		description: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalCreatedWithRequirements = model("ProposalCreatedWithRequirements", ProposalCreatedWithRequirementsSchema);

const ProposalDescriptionUpdatedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		proposer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		description: {
			type: Schema.Types.String,
			required: true
		},
		updatedMessage: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalDescriptionUpdated = model("ProposalDescriptionUpdated", ProposalDescriptionUpdatedSchema);

const ProposalExecutedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalExecuted = model("ProposalExecuted", ProposalExecutedSchema);

const ProposalObjectionPeriodSetSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		objectionPeriodEndBlock: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalObjectionPeriodSet = model("ProposalObjectionPeriodSet", ProposalObjectionPeriodSetSchema);

const ProposalQueuedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		eta: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalQueued = model("ProposalQueued", ProposalQueuedSchema);

const ProposalThresholdBPSSetSchema = new Schema(
	{
		oldProposalThresholdBPS: {
			type: Schema.Types.Number,
			required: true
		},
		newProposalThresholdBPS: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalThresholdBPSSet = model("ProposalThresholdBPSSet", ProposalThresholdBPSSetSchema);

const ProposalTransactionsUpdatedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		proposer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		targets: {
			type: [Schema.Types.String],
			required: true
		},
		values: {
			type: [Schema.Types.String],
			required: true
		},
		signatures: {
			type: [Schema.Types.String],
			required: true
		},
		calldatas: {
			type: [Schema.Types.Mixed],
			required: true
		},
		updateMessage: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalTransactionsUpdated = model("ProposalTransactionsUpdated", ProposalTransactionsUpdatedSchema);

const ProposalUpdatablePeriodSetSchema = new Schema(
	{
		oldProposalUpdatablePeriodInBlocks: {
			type: Schema.Types.String,
			required: true
		},
		newProposalUpdatablePeriodInBlocks: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalUpdatablePeriodSet = model("ProposalUpdatablePeriodSet", ProposalUpdatablePeriodSetSchema);

const ProposalUpdatedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		proposer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		targets: {
			type: [Schema.Types.String],
			required: true
		},
		values: {
			type: [Schema.Types.String],
			required: true
		},
		signatures: {
			type: [Schema.Types.String],
			required: true
		},
		calldatas: {
			type: [Schema.Types.Mixed],
			required: true
		},
		description: {
			type: Schema.Types.String,
			required: true
		},
		updateMessage: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalUpdated = model("ProposalUpdated", ProposalUpdatedSchema);

const ProposalVetoedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalVetoed = model("ProposalVetoed", ProposalVetoedSchema);

const QuitSchema = new Schema(
	{
		msgSender: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		tokenIds: {
			type: [Schema.Types.Number],
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const Quit = model("Quit", QuitSchema);

const QuorumCoefficientSetSchema = new Schema(
	{
		oldQuorumCoefficient: {
			type: Schema.Types.Number,
			required: true
		},
		newQuorumCoefficient: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const QuorumCoefficientSet = model("QuorumCoefficientSet", QuorumCoefficientSetSchema);

const QuorumVotesBPSSetSchema = new Schema(
	{
		oldQuorumVotesBPS: {
			type: Schema.Types.Number,
			required: true
		},
		newQuorumVotesBPS: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const QuorumVotesBPSSet = model("QuorumVotesBPSSet", QuorumVotesBPSSetSchema);

const RefundableVoteSchema = new Schema(
	{
		voter: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		refundAmount: {
			type: Schema.Types.String,
			required: true
		},
		refundSent: {
			type: Schema.Types.Boolean,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const RefundableVote = model("RefundableVote", RefundableVoteSchema);

const SignatureCancelledSchema = new Schema(
	{
		signer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		sig: {
			type: Schema.Types.Mixed,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const SignatureCancelled = model("SignatureCancelled", SignatureCancelledSchema);

const TimelocksAndAdminSetSchema = new Schema(
	{
		timelock: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		timelockV1: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		admin: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const TimelocksAndAdminSet = model("TimelocksAndAdminSet", TimelocksAndAdminSetSchema);

const VoteCastSchema = new Schema(
	{
		voter: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		proposalId: {
			type: Schema.Types.Number,
			required: true
		},
		supportDetailed: {
			type: Schema.Types.Number,
			required: true
		},
		votes: {
			type: Schema.Types.Number,
			required: true
		},
		reason: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const VoteCast = model("VoteCast", VoteCastSchema);

const VoteSnapshotBlockSwitchProposalIdSetSchema = new Schema(
	{
		oldVoteSnapshotBlockSwitchProposalId: {
			type: Schema.Types.Number,
			required: true
		},
		newVoteSnapshotBlockSwitchProposalId: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const VoteSnapshotBlockSwitchProposalIdSet = model(
	"VoteSnapshotBlockSwitchProposalIdSet",
	VoteSnapshotBlockSwitchProposalIdSetSchema
);

const VotingDelaySetSchema = new Schema(
	{
		oldVotingDelay: {
			type: Schema.Types.String,
			required: true
		},
		newVotingDelay: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const VotingDelaySet = model("VotingDelaySet", VotingDelaySetSchema);

const VotingPeriodSetSchema = new Schema(
	{
		oldVotingPeriod: {
			type: Schema.Types.String,
			required: true
		},
		newVotingPeriod: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const VotingPeriodSet = model("VotingPeriodSet", VotingPeriodSetSchema);

const WithdrawSchema = new Schema(
	{
		amount: {
			type: Schema.Types.String,
			required: true
		},
		sent: {
			type: Schema.Types.Boolean,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const Withdraw = model("Withdraw", WithdrawSchema);

const WithdrawFromForkEscrowSchema = new Schema(
	{
		forkId: {
			type: Schema.Types.Number,
			required: true
		},
		owner: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		sent: {
			type: [Schema.Types.Number],
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const WithdrawFromForkEscrow = model("WithdrawFromForkEscrow", WithdrawFromForkEscrowSchema);

// ================================
// Nouns Auction House
// ================================

const AuctionBidSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		amount: {
			type: Schema.Types.String,
			required: true
		},
		bidder: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		extended: {
			type: Schema.Types.Boolean,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const AuctionBid = model("AuctionBid", AuctionBidSchema);

const AuctionCreatedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		startTime: {
			type: Schema.Types.String,
			required: true
		},
		endTime: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const AuctionCreated = model("AuctionCreated", AuctionCreatedSchema);

const AuctionExtendedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		endTime: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const AuctionExtended = model("AuctionExtended", AuctionExtendedSchema);

const AuctionSettledSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		winner: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		amount: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const AuctionSettled = model("AuctionSettled", AuctionSettledSchema);

const AuctionTimeBufferUpdatedSchema = new Schema(
	{
		timeBuffer: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const AuctionTimeBufferUpdated = model("AuctionTimeBufferUpdated", AuctionTimeBufferUpdatedSchema);

const AuctionReservePriceUpdatedSchema = new Schema(
	{
		reservePrice: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const AuctionReservePriceUpdated = model("AuctionReservePriceUpdated", AuctionReservePriceUpdatedSchema);

const AuctionMinBidIncrementPercentageUpdatedSchema = new Schema(
	{
		minBidIncrementPercentage: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const AuctionMinBidIncrementPercentageUpdated = model(
	"AuctionMinBidIncrementPercentageUpdated",
	AuctionMinBidIncrementPercentageUpdatedSchema
);

const OwnershipTransferredSchema = new Schema(
	{
		previousOwner: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newOwner: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const OwnershipTransferred = model("OwnershipTransferred", OwnershipTransferredSchema);

const PausedSchema = new Schema(
	{
		address: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const Paused = model("Paused", PausedSchema);

const UnpausedSchema = new Schema(
	{
		address: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const Unpaused = model("Unpaused", UnpausedSchema);

// ================================
// Nouns Token
// ================================

const DelegateChangedSchema = new Schema(
	{
		delegator: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		fromDelegate: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		toDelegate: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		numOfVotesChanged: {
			type: Schema.Types.Number,
			required: false
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const DelegateChanged = model("DelegateChanged", DelegateChangedSchema);

const DelegateVotesChangedSchema = new Schema(
	{
		delegate: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		previousBalance: {
			type: Schema.Types.String,
			required: true
		},
		newBalance: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const DelegateVotesChanged = model("DelegateVotesChanged", DelegateVotesChangedSchema);

const TransferSchema = new Schema(
	{
		from: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		to: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		tokenId: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const Transfer = model("Transfer", TransferSchema);

const ApprovalSchema = new Schema(
	{
		owner: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		approved: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		tokenId: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const Approval = model("Approval", ApprovalSchema);

const ApprovalForAllSchema = new Schema(
	{
		owner: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		operator: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		approved: {
			type: Schema.Types.Boolean,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ApprovalForAll = model("ApprovalForAll", ApprovalForAllSchema);

const DescriptorLockedSchema = new Schema(
	{
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const DescriptorLocked = model("DescriptorLocked", DescriptorLockedSchema);

const DescriptorUpdatedSchema = new Schema(
	{
		descriptor: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const DescriptorUpdated = model("DescriptorUpdated", DescriptorUpdatedSchema);

const MinterLockedSchema = new Schema(
	{
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const MinterLocked = model("MinterLocked", MinterLockedSchema);

const MinterUpdatedSchema = new Schema(
	{
		minter: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const MinterUpdated = model("MinterUpdated", MinterUpdatedSchema);

const NounBurnedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const NounBurned = model("NounBurned", NounBurnedSchema);

const NounCreatedSchema = new Schema(
	{
		id: {
			type: Schema.Types.Number,
			required: true
		},
		seed: {
			background: {
				type: Schema.Types.Number,
				required: true
			},
			body: {
				type: Schema.Types.Number,
				required: true
			},
			accessory: {
				type: Schema.Types.Number,
				required: true
			},
			head: {
				type: Schema.Types.Number,
				required: true
			},
			glasses: {
				type: Schema.Types.Number,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const NounCreated = model("NounCreated", NounCreatedSchema);

const NoundersDAOUpdatedSchema = new Schema(
	{
		noundersDAO: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const NoundersDAOUpdated = model("NoundersDAOUpdated", NoundersDAOUpdatedSchema);

const SeederLockedSchema = new Schema(
	{
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const SeederLocked = model("SeederLocked", SeederLockedSchema);

const SeederUpdatedSchema = new Schema(
	{
		seeder: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const SeederUpdated = model("SeederUpdated", SeederUpdatedSchema);

const CreateCandidateCostSetSchema = new Schema(
	{
		oldCreateCandidateCost: {
			type: Schema.Types.String,
			required: true
		},
		newCreateCandidateCost: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const CreateCandidateCostSet = model("CreateCandidateCostSet", CreateCandidateCostSetSchema);

// ================================
// Nouns DAO Data
// ================================

const AdminChangedSchema = new Schema(
	{
		previousAdmin: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newAdmin: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const AdminChanged = model("AdminChanged", AdminChangedSchema);

const BeaconUpgradedSchema = new Schema(
	{
		beacon: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const BeaconUpgraded = model("BeaconUpgraded", BeaconUpgradedSchema);

const CandidateFeedbackSentSchema = new Schema(
	{
		msgSender: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		proposer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		slug: {
			type: Schema.Types.String,
			required: true
		},
		support: {
			type: Schema.Types.Number,
			required: true
		},
		reason: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const CandidateFeedbackSent = model("CandidateFeedbackSent", CandidateFeedbackSentSchema);

const ETHWithdrawnSchema = new Schema(
	{
		to: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		amount: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ETHWithdrawn = model("ETHWithdrawn", ETHWithdrawnSchema);

const FeeRecipientSetSchema = new Schema(
	{
		oldFeeRecipient: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		newFeeRecipient: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const FeeRecipientSet = model("FeeRecipientSet", FeeRecipientSetSchema);

const FeedbackSentSchema = new Schema(
	{
		msgSender: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		proposalId: {
			type: Schema.Types.Number,
			required: true
		},
		support: {
			type: Schema.Types.Number,
			required: true
		},
		reason: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const FeedbackSent = model("FeedbackSent", FeedbackSentSchema);

const ProposalCandidateCanceledSchema = new Schema(
	{
		msgSender: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		slug: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalCandidateCanceled = model("ProposalCandidateCanceled", ProposalCandidateCanceledSchema);

const ProposalCandidateCreatedSchema = new Schema(
	{
		msgSender: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		targets: {
			type: [Schema.Types.String],
			required: true
		},
		values: {
			type: [Schema.Types.String],
			required: true
		},
		signatures: {
			type: [Schema.Types.String],
			required: true
		},
		calldatas: {
			type: [Schema.Types.Mixed],
			required: true
		},
		description: {
			type: Schema.Types.String,
			required: true
		},
		slug: {
			type: Schema.Types.String,
			required: true
		},
		proposalIdToUpdate: {
			type: Schema.Types.Number,
			required: true
		},
		encodedProposalHash: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalCandidateCreated = model("ProposalCandidateCreated", ProposalCandidateCreatedSchema);

const ProposalCandidateUpdatedSchema = new Schema(
	{
		msgSender: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		targets: {
			type: [Schema.Types.String],
			required: true
		},
		values: {
			type: [Schema.Types.String],
			required: true
		},
		signatures: {
			type: [Schema.Types.String],
			required: true
		},
		calldatas: {
			type: [Schema.Types.Mixed],
			required: true
		},
		description: {
			type: Schema.Types.String,
			required: true
		},
		slug: {
			type: Schema.Types.String,
			required: true
		},
		proposalIdToUpdate: {
			type: Schema.Types.Number,
			required: true
		},
		encodedProposalHash: {
			type: Schema.Types.String,
			required: true
		},
		reason: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const ProposalCandidateUpdated = model("ProposalCandidateUpdated", ProposalCandidateUpdatedSchema);

const SignatureAddedSchema = new Schema(
	{
		signer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		sig: {
			type: Schema.Types.String,
			required: true
		},
		expirationTimestamp: {
			type: Schema.Types.String,
			required: true
		},
		proposer: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		slug: {
			type: Schema.Types.String,
			required: true
		},
		proposalIdToUpdate: {
			type: Schema.Types.Number,
			required: true
		},
		encodedPropHash: {
			type: Schema.Types.String,
			required: true
		},
		sigDigest: {
			type: Schema.Types.String,
			required: true
		},
		reason: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const SignatureAdded = model("SignatureAdded", SignatureAddedSchema);

const UpdateCandidateCostSetSchema = new Schema(
	{
		oldUpdateCandidateCost: {
			type: Schema.Types.String,
			required: true
		},
		newUpdateCandidateCost: {
			type: Schema.Types.String,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const UpdateCandidateCostSet = model("UpdateCandidateCostSet", UpdateCandidateCostSetSchema);

const UpgradedSchema = new Schema(
	{
		implementation: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);
export const Upgraded = model("Upgraded", UpgradedSchema);
