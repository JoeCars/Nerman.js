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

const AdminChangedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const ApprovalSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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

const OwnershipTransferredSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const AuctionCreatedSchema = new Schema(
	{
		_id: Schema.ObjectId,
		id: {
			type: Schema.Types.Number,
			required: true
		},
		startTime: {
			type: Schema.Types.BigInt,
			required: true
		},
		endTime: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
		id: {
			type: Schema.Types.Number,
			required: true
		},
		endTime: {
			type: Schema.Types.BigInt,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const AuctionExtended = model("AuctionExtended", AuctionExtendedSchema);

const AuctionMinBidIncrementPercentageUpdatedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const AuctionReservePriceUpdatedSchema = new Schema(
	{
		_id: Schema.ObjectId,
		reservePrice: {
			type: Schema.Types.BigInt,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const AuctionReservePriceUpdated = model("AuctionReservePriceUpdated", AuctionReservePriceUpdatedSchema);

const AuctionSettledSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
		timeBuffer: {
			type: Schema.Types.BigInt,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const AuctionTimeBufferUpdated = model("AuctionTimeBufferUpdated", AuctionTimeBufferUpdatedSchema);

const BeaconUpgradedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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

const CreateCandidateCostSetSchema = new Schema(
	{
		_id: Schema.ObjectId,
		oldCreateCandidateCost: {
			type: Schema.Types.BigInt,
			required: true
		},
		newCreateCandidateCost: {
			type: Schema.Types.BigInt,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const CreateCandidateCostSet = model("CreateCandidateCostSet", CreateCandidateCostSetSchema);

const DAOWithdrawNounsFromEscrowSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const DelegateChangedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
		delegate: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		previousBalance: {
			type: Schema.Types.BigInt,
			required: true
		},
		newBalance: {
			type: Schema.Types.BigInt,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const DelegateVotesChanged = model("DelegateVotesChanged", DelegateVotesChangedSchema);

const DescriptorLockedSchema = new Schema(
	{
		_id: Schema.ObjectId,
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const DescriptorLocked = model("DescriptorLocked", DescriptorLockedSchema);

const DescriptorUpdatedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const ERC20TokensToIncludeInForkSetSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
			type: [Schema.Types.BigInt],
			required: true
		},
		proposalIds: {
			type: [Schema.Types.BigInt],
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

const ETHWithdrawnSchema = new Schema(
	{
		_id: Schema.ObjectId,
		to: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		amount: {
			type: Schema.Types.BigInt,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const ETHWithdrawn = model("ETHWithdrawn", ETHWithdrawnSchema);

const ExecuteForkSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
			type: Schema.Types.BigInt,
			required: true
		},
		tokensInEscrow: {
			type: Schema.Types.BigInt,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const ExecuteFork = model("ExecuteFork", ExecuteForkSchema);

const FeedbackSentSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const FeeRecipientSetSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const ForkDAODeployerSetSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
		oldForkPeriod: {
			type: Schema.Types.BigInt,
			required: true
		},
		newForkPeriod: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
		oldForkThreshold: {
			type: Schema.Types.BigInt,
			required: true
		},
		newForkThreshold: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
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
			type: [Schema.Types.BigInt],
			required: true
		},
		proposalIds: {
			type: [Schema.Types.BigInt],
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
		_id: Schema.ObjectId,
		oldLastMinuteWindowInBlocks: {
			type: Schema.Types.BigInt,
			required: true
		},
		newLastMinuteWindowInBlocks: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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

const MinterLockedSchema = new Schema(
	{
		_id: Schema.ObjectId,
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const MinterLocked = model("MinterLocked", MinterLockedSchema);

const MinterUpdatedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const NewAdminSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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

const NounBurnedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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

const ObjectionPeriodDurationSetSchema = new Schema(
	{
		_id: Schema.ObjectId,
		oldObjectionPeriodDurationInBlocks: {
			type: Schema.Types.BigInt,
			required: true
		},
		newObjectionPeriodDurationInBlocks: {
			type: Schema.Types.BigInt,
			required: true
		},
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const ObjectionPeriodDurationSet = model("ObjectionPeriodDurationSet", ObjectionPeriodDurationSetSchema);

const AuctionBidSchema = new Schema(
	{
		_id: Schema.ObjectId,
		id: {
			type: Schema.Types.Number,
			required: true
		},
		amount: {
			type: Schema.Types.BigInt,
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

const PausedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const ProposalCanceledSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const ProposalCandidateCanceledSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
			type: [Schema.Types.BigInt],
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
		_id: Schema.ObjectId,
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
			type: [Schema.Types.BigInt],
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

const ProposalCreatedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
			type: [Schema.Types.BigInt],
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
			type: Schema.Types.BigInt,
			required: true
		},
		endBlock: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
			type: [Schema.Types.BigInt],
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
			type: Schema.Types.BigInt,
			required: true
		},
		endBlock: {
			type: Schema.Types.BigInt,
			required: true
		},
		updatePeriodEndBlock: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
		id: {
			type: Schema.Types.Number,
			required: true
		},
		objectionPeriodEndBlock: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
		id: {
			type: Schema.Types.Number,
			required: true
		},
		eta: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
			type: [Schema.Types.BigInt],
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
		_id: Schema.ObjectId,
		oldProposalUpdatablePeriodInBlocks: {
			type: Schema.Types.BigInt,
			required: true
		},
		newProposalUpdatablePeriodInBlocks: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
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
			type: [Schema.Types.BigInt],
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
		voter: {
			id: {
				type: Schema.Types.String,
				required: true
			}
		},
		refundAmount: {
			type: Schema.Types.BigInt,
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

const SeederLockedSchema = new Schema(
	{
		_id: Schema.ObjectId,
		event: EventSchema
	},
	{
		timestamps: true
	}
);

export const SeederLocked = model("SeederLocked", SeederLockedSchema);

const SeederUpdatedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const SignatureAddedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
			type: Schema.Types.BigInt,
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

const SignatureCancelledSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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

const TransferSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const UnpausedSchema = new Schema(
	{
		_id: Schema.ObjectId,
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

const UpdateCandidateCostSetSchema = new Schema(
	{
		_id: Schema.ObjectId,
		oldUpdateCandidateCost: {
			type: Schema.Types.BigInt,
			required: true
		},
		newUpdateCandidateCost: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
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

const VoteCastSchema = new Schema(
	{
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
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
		_id: Schema.ObjectId,
		oldVotingDelay: {
			type: Schema.Types.BigInt,
			required: true
		},
		newVotingDelay: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
		oldVotingPeriod: {
			type: Schema.Types.BigInt,
			required: true
		},
		newVotingPeriod: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
		amount: {
			type: Schema.Types.BigInt,
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
		_id: Schema.ObjectId,
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
