export const STATUS_PENDING = "PENDING";
export const STATUS_CANCELLED = "CANCELLED";
export const STATUS_VETOED = "VETOED";
export const STATUS_EXECUTED = "EXECUTED";
export const STATUS_QUEUED = "QUEUED";
export const STATUS_ACTIVE = "ACTIVE";

export const NOUNS_STARTING_BLOCK = 13072753;

//=========================================
// Supported Events
//=========================================

export const SUPPORTED_FEDERATION_EVENTS = ["BidPlaced", "VoteCast"];

export const SUPPORTED_NOUNS_NYMZ_EVENTS = ["NewPost"];

export const SUPPORTED_PROPDATES_EVENTS = ["PostUpdate", "PropUpdateAdminTransferStarted", "PropUpdateAdminTransfered"];

export const SUPPORTED_NOUNS_AUCTION_HOUSE_EVENTS = [
	"AuctionCreated",
	"AuctionBid",
	"AuctionExtended",
	"AuctionSettled",
	"AuctionTimeBufferUpdated",
	"AuctionReservePriceUpdated",
	"AuctionMinBidIncrementPercentageUpdated",
	"OwnershipTransferred",
	"Paused",
	"Unpaused"
];

export const SUPPORTED_NOUNS_DAO_EVENTS = [
	"DAOWithdrawNounsFromEscrow",
	"ERC20TokensToIncludeInForkSet",
	"EscrowedToFork",
	"ExecuteFork",
	"ForkDAODeployerSet",
	"ForkPeriodSet",
	"ForkThresholdSet",
	"JoinFork",
	"LastMinuteWindowSet",
	"MaxQuorumVotesBPSSet",
	"MinQuorumVotesBPSSet",
	"NewAdmin",
	"NewImplementation",
	"NewPendingAdmin",
	"NewPendingVetoer",
	"NewVetoer",
	"ObjectionPeriodDurationSet",
	"ProposalCanceled",
	"ProposalCreated",
	"ProposalCreatedOnTimelockV1",
	"ProposalCreatedWithRequirements",
	"ProposalDescriptionUpdated",
	"ProposalExecuted",
	"ProposalObjectionPeriodSet",
	"ProposalQueued",
	"ProposalThresholdBPSSet",
	"ProposalTransactionsUpdated",
	"ProposalUpdatablePeriodSet",
	"ProposalUpdated",
	"ProposalVetoed",
	"QuorumCoefficientSet",
	"QuorumVotesBPSSet",
	"RefundableVote",
	"SignatureCancelled",
	"TimelocksAndAdminSet",
	"VoteCast",
	"VoteSnapshotBlockSwitchProposalIdSet",
	"VotingDelaySet",
	"VotingPeriodSet",
	"Withdraw",
	"WithdrawFromForkEscrow"
];

export const SUPPORTED_NOUNS_DAO_DATA_EVENTS = [
	"AdminChanged",
	"BeaconUpgraded",
	"CandidateFeedbackSent",
	"CreateCandidateCostSet",
	"ETHWithdrawn",
	"FeeRecipientSet",
	"FeedbackSent",
	"OwnershipTransferred",
	"ProposalCandidateCanceled",
	"ProposalCandidateCreated",
	"ProposalCandidateUpdated",
	"SignatureAdded",
	"UpdateCandidateCostSet",
	"Upgraded"
];

export const SUPPORTED_NOUNS_FORK_EVENTS = [
	"NewAdmin",
	"NewImplementation",
	"NewPendingAdmin",
	"ProposalCanceled",
	"ProposalCreated",
	"ProposalCreatedWithRequirements",
	"ProposalExecuted",
	"ProposalQueued",
	"ProposalThresholdBPSSet",
	"Quit",
	"QuorumVotesBPSSet",
	"VoteCast",
	"VotingDelaySet",
	"VotingPeriodSet"
];

export const SUPPORTED_NOUNS_FORK_AUCTION_HOUSE_EVENTS = [
	"AuctionCreated",
	"AuctionBid",
	"AuctionExtended",
	"AuctionSettled",
	"AuctionTimeBufferUpdated",
	"AuctionReservePriceUpdated",
	"AuctionMinBidIncrementPercentageUpdated",
	"OwnershipTransferred",
	"Paused",
	"Unpaused"
];

export const SUPPORTED_NOUNS_FORK_TOKEN_EVENTS = [
	"DelegateChanged",
	"DelegateVotesChanged",
	"Transfer",
	"Approval",
	"ApprovalForAll",
	"NounCreated",
	"DescriptorLocked",
	"DescriptorUpdated",
	"MinterLocked",
	"MinterUpdated",
	"NounBurned",
	"NoundersDAOUpdated",
	"OwnershipTransferred",
	"SeederLocked",
	"SeederUpdated"
];

export const SUPPORTED_NOUNS_TOKEN_EVENTS = [
	"DelegateChanged",
	"DelegateVotesChanged",
	"Transfer",
	"Approval",
	"ApprovalForAll",
	"NounCreated",
	"DescriptorLocked",
	"DescriptorUpdated",
	"MinterLocked",
	"MinterUpdated",
	"NounBurned",
	"NoundersDAOUpdated",
	"OwnershipTransferred",
	"SeederLocked",
	"SeederUpdated"
];

export const SUPPORTED_LIL_NOUNS_DAO_LOGIC_EVENTS = [
	"NewAdmin",
	"NewImplementation",
	"NewPendingAdmin",
	"NewVetoer",
	"ProposalCanceled",
	"ProposalCreated",
	"ProposalCreatedWithRequirements",
	"ProposalExecuted",
	"ProposalQueued",
	"ProposalThresholdBPSSet",
	"ProposalVetoed",
	"QuorumVotesBPSSet",
	"VoteCast",
	"VotingDelaySet",
	"VotingPeriodSet"
];

export const SUPPORTED_LIL_NOUNS_TOKEN_EVENTS = [
	"Approval",
	"ApprovalForAll",
	"DelegateChanged",
	"DelegateVotesChanged",
	"DescriptorLocked",
	"DescriptorUpdated",
	"LilNoundersDAOUpdated",
	"MinterLocked",
	"MinterUpdated",
	"NounBurned",
	"NounCreated",
	"NounsDAOUpdated",
	"OwnershipTransferred",
	"SeederLocked",
	"SeederUpdated",
	"Transfer"
];
