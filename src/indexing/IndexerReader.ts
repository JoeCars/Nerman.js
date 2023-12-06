import { NounsAuctionHouse, NounsDAOData, NounsDAO, NounsToken } from "../utilities/indexer/indexer-queries";
import { Indexer } from "../types";

/** A class that manages reading and querying indexed events in the file system. */
export class IndexerReader {
	private directoryPath: string;

	/**
	 * @param directoryPath Path to the directory holding indexed events.
	 */
	public constructor(directoryPath: string) {
		this.directoryPath = directoryPath;
	}

	/**
	 * Retrieves indexed event data, filtered by options. Throws an error if the event is not supported.
	 * @param eventName Name of the event.
	 * @param queryOptions Object with filter options for the indexed events.
	 * @returns List of filtered indexed events.
	 */
	public async query(eventName: string, queryOptions?: object): Promise<Indexer.FormattedEvent[]> {
		switch (eventName) {
			// Nouns Auction House.
			case "AuctionCreated":
				return NounsAuctionHouse.fetchAuctionCreated(this.directoryPath, queryOptions);
			case "AuctionBid":
				return NounsAuctionHouse.fetchAuctionBid(this.directoryPath, queryOptions);
			case "AuctionExtended":
				return NounsAuctionHouse.fetchAuctionExtended(this.directoryPath, queryOptions);
			case "AuctionSettled":
				return NounsAuctionHouse.fetchAuctionSettled(this.directoryPath, queryOptions);
			case "AuctionTimeBufferUpdated":
				return NounsAuctionHouse.fetchAuctionTimeBufferUpdated(this.directoryPath, queryOptions);
			case "AuctionReservePriceUpdated":
				return NounsAuctionHouse.fetchAuctionReservePriceUpdated(this.directoryPath, queryOptions);
			case "AuctionMinBidIncrementPercentageUpdated":
				return NounsAuctionHouse.fetchAuctionMinBidIncrementPercentageUpdated(this.directoryPath, queryOptions);
			case "OwnershipTransferred":
				return NounsAuctionHouse.fetchOwnershipTransferred(this.directoryPath, queryOptions);
			case "Paused":
				return NounsAuctionHouse.fetchPaused(this.directoryPath, queryOptions);
			case "Unpaused":
				return NounsAuctionHouse.fetchUnpaused(this.directoryPath, queryOptions);

			// Nouns DAO Data.
			case "AdminChanged":
				return NounsDAOData.fetchAdminChanged(this.directoryPath, queryOptions);
			case "BeaconUpgraded":
				return NounsDAOData.fetchBeaconUpgraded(this.directoryPath, queryOptions);
			case "CandidateFeedbackSent":
				return NounsDAOData.fetchCandidateFeedbackSent(this.directoryPath, queryOptions);
			case "CreateCandidateCostSet":
				return NounsDAOData.fetchCreateCandidateCostSet(this.directoryPath, queryOptions);
			case "ETHWithdrawn":
				return NounsDAOData.fetchETHWithdrawn(this.directoryPath, queryOptions);
			case "FeeRecipientSet":
				return NounsDAOData.fetchFeeRecipientSet(this.directoryPath, queryOptions);
			case "FeedbackSent":
				return NounsDAOData.fetchFeedbackSent(this.directoryPath, queryOptions);
			case "OwnershipTransferred":
				return NounsDAOData.fetchOwnershipTransferred(this.directoryPath, queryOptions);
			case "ProposalCandidateCanceled":
				return NounsDAOData.fetchProposalCandidateCanceled(this.directoryPath, queryOptions);
			case "ProposalCandidateCreated":
				return NounsDAOData.fetchProposalCandidateCreated(this.directoryPath, queryOptions);
			case "ProposalCandidateUpdated":
				return NounsDAOData.fetchProposalCandidateUpdated(this.directoryPath, queryOptions);
			case "SignatureAdded":
				return NounsDAOData.fetchSignatureAdded(this.directoryPath, queryOptions);
			case "UpdateCandidateCostSet":
				return NounsDAOData.fetchUpdateCandidateCostSet(this.directoryPath, queryOptions);
			case "Upgraded":
				return NounsDAOData.fetchUpgraded(this.directoryPath, queryOptions);

			// Nouns DAO.
			case "DAOWithdrawNounsFromEscrow":
				return NounsDAO.fetchDAOWithdrawNounsFromEscrow(this.directoryPath, queryOptions);
			case "ERC20TokensToIncludeInForkSet":
				return NounsDAO.fetchERC20TokensToIncludeInForkSet(this.directoryPath, queryOptions);
			case "EscrowedToFork":
				return NounsDAO.fetchEscrowedToFork(this.directoryPath, queryOptions);
			case "ExecuteFork":
				return NounsDAO.fetchExecutedFork(this.directoryPath, queryOptions);
			case "ForkDAODeployerSet":
				return NounsDAO.fetchForkDAODeployerSet(this.directoryPath, queryOptions);
			case "ForkPeriodSet":
				return NounsDAO.fetchForkPeriodSet(this.directoryPath, queryOptions);
			case "ForkThresholdSet":
				return NounsDAO.fetchForkThresholdSet(this.directoryPath, queryOptions);
			case "JoinFork":
				return NounsDAO.fetchJoinFork(this.directoryPath, queryOptions);
			case "LastMinuteWindowSet":
				return NounsDAO.fetchLastMinuteWindowSet(this.directoryPath, queryOptions);
			case "MaxQuorumVotesBPSSet":
				return NounsDAO.fetchMaxQuorumVotesBPSSet(this.directoryPath, queryOptions);
			case "MinQuorumVotesBPSSet":
				return NounsDAO.fetchMinQuorumVotesBPSSet(this.directoryPath, queryOptions);
			case "NewAdmin":
				return NounsDAO.fetchNewAdmin(this.directoryPath, queryOptions);
			case "NewImplementation":
				return NounsDAO.fetchNewImplementation(this.directoryPath, queryOptions);
			case "NewPendingAdmin":
				return NounsDAO.fetchNewPendingAdmin(this.directoryPath, queryOptions);
			case "NewPendingVetoer":
				return NounsDAO.fetchNewPendingVetoer(this.directoryPath, queryOptions);
			case "NewVetoer":
				return NounsDAO.fetchNewVetoer(this.directoryPath, queryOptions);
			case "ObjectionPeriodDurationSet":
				return NounsDAO.fetchObjectionPeriodDurationSet(this.directoryPath, queryOptions);
			case "ProposalCanceled":
				return NounsDAO.fetchProposalCanceled(this.directoryPath, queryOptions);
			case "ProposalCreated":
				return NounsDAO.fetchProposalCreated(this.directoryPath, queryOptions);
			case "ProposalCreatedOnTimelockV1":
				return NounsDAO.fetchProposalCreatedOnTimelockV1(this.directoryPath, queryOptions);
			case "ProposalCreatedWithRequirements":
				return NounsDAO.fetchProposalCreatedWithRequirements(this.directoryPath, queryOptions);
			case "ProposalDescriptionUpdated":
				return NounsDAO.fetchProposalDescriptionUpdated(this.directoryPath, queryOptions);
			case "ProposalExecuted":
				return NounsDAO.fetchProposalExecuted(this.directoryPath, queryOptions);
			case "ProposalObjectionPeriodSet":
				return NounsDAO.fetchProposalObjectionPeriodSet(this.directoryPath, queryOptions);
			case "ProposalQueued":
				return NounsDAO.fetchProposalQueued(this.directoryPath, queryOptions);
			case "ProposalThresholdBPSSet":
				return NounsDAO.fetchProposalThresholdBPSSet(this.directoryPath, queryOptions);
			case "ProposalTransactionsUpdated":
				return NounsDAO.fetchProposalTransactionsUpdated(this.directoryPath, queryOptions);
			case "ProposalUpdatablePeriodSet":
				return NounsDAO.fetchProposalUpdatablePeriodSet(this.directoryPath, queryOptions);
			case "ProposalUpdated":
				return NounsDAO.fetchProposalUpdated(this.directoryPath, queryOptions);
			case "ProposalVetoed":
				return NounsDAO.fetchProposalVetoed(this.directoryPath, queryOptions);
			case "QuorumCoefficientSet":
				return NounsDAO.fetchQuorumCoefficientSet(this.directoryPath, queryOptions);
			case "QuorumVotesBPSSet":
				return NounsDAO.fetchQuorumVotesBPSSet(this.directoryPath, queryOptions);
			case "RefundableVote":
				return NounsDAO.fetchRefundableVote(this.directoryPath, queryOptions);
			case "SignatureCancelled":
				return NounsDAO.fetchSignatureCancelled(this.directoryPath, queryOptions);
			case "TimelocksAndAdminSet":
				return NounsDAO.fetchTimelocksAndAdminSet(this.directoryPath, queryOptions);
			case "ProposalStatusChange":
				return NounsDAO.fetchProposalStatusChange(this.directoryPath, queryOptions);
			case "VoteCast":
				return NounsDAO.fetchVoteCast(this.directoryPath, queryOptions);
			case "VoteSnapshotBlockSwitchProposalIdSet":
				return NounsDAO.fetchVoteSnapshotBlockSwitchProposalIdSet(this.directoryPath, queryOptions);
			case "VotingDelaySet":
				return NounsDAO.fetchVotingDelaySet(this.directoryPath, queryOptions);
			case "VotingPeriodSet":
				return NounsDAO.fetchVotingPeriodSet(this.directoryPath, queryOptions);
			case "Withdraw":
				return NounsDAO.fetchWithdraw(this.directoryPath, queryOptions);
			case "WithdrawFromForkEscrow":
				return NounsDAO.fetchWithdrawFromForkEscrow(this.directoryPath, queryOptions);

			// Nouns Token.
			case "DelegateChanged":
				return NounsToken.fetchDelegateChanged(this.directoryPath, queryOptions);
			case "DelegateVotesChanged":
				return NounsToken.fetchDelegateVotesChanged(this.directoryPath, queryOptions);
			case "Transfer":
				return NounsToken.fetchTransfer(this.directoryPath, queryOptions);
			case "Approval":
				return NounsToken.fetchApproval(this.directoryPath, queryOptions);
			case "ApprovalForAll":
				return NounsToken.fetchApprovalForAll(this.directoryPath, queryOptions);
			case "NounCreated":
				return NounsToken.fetchNounCreated(this.directoryPath, queryOptions);
			case "DescriptorLocked":
				return NounsToken.fetchDescriptorLocked(this.directoryPath, queryOptions);
			case "DescriptorUpdated":
				return NounsToken.fetchDescriptorUpdated(this.directoryPath, queryOptions);
			case "MinterLocked":
				return NounsToken.fetchMinterLocked(this.directoryPath, queryOptions);
			case "MinterUpdated":
				return NounsToken.fetchMinterUpdated(this.directoryPath, queryOptions);
			case "NounBurned":
				return NounsToken.fetchNounBurned(this.directoryPath, queryOptions);
			case "NoundersDAOUpdated":
				return NounsToken.fetchNoundersDAOUpdated(this.directoryPath, queryOptions);
			case "OwnershipTransferred":
				return NounsToken.fetchOwnershipTransferred(this.directoryPath, queryOptions);
			case "SeederLocked":
				return NounsToken.fetchSeederLocked(this.directoryPath, queryOptions);
			case "SeederUpdated":
				return NounsToken.fetchSeederUpdated(this.directoryPath, queryOptions);

			// Errors.
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}
}
