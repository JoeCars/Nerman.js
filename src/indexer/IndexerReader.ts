import * as auctionReaders from "./nouns-auction-read-functions";
import * as dataReaders from "./nouns-dao-data-read-functions";
import * as daoReaders from "./nouns-dao-read-functions";
import * as tokenReaders from "./nouns-token-read-functions";
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
				return auctionReaders.fetchAuctionCreated(this.directoryPath, queryOptions);
			case "AuctionBid":
				return auctionReaders.fetchAuctionBid(this.directoryPath, queryOptions);
			case "AuctionExtended":
				return auctionReaders.fetchAuctionExtended(this.directoryPath, queryOptions);
			case "AuctionSettled":
				return auctionReaders.fetchAuctionSettled(this.directoryPath, queryOptions);
			case "AuctionTimeBufferUpdated":
				return auctionReaders.fetchAuctionTimeBufferUpdated(this.directoryPath, queryOptions);
			case "AuctionReservePriceUpdated":
				return auctionReaders.fetchAuctionReservePriceUpdated(this.directoryPath, queryOptions);
			case "AuctionMinBidIncrementPercentageUpdated":
				return auctionReaders.fetchAuctionMinBidIncrementPercentageUpdated(this.directoryPath, queryOptions);
			case "OwnershipTransferred":
				return auctionReaders.fetchOwnershipTransferred(this.directoryPath, queryOptions);
			case "Paused":
				return auctionReaders.fetchPaused(this.directoryPath, queryOptions);
			case "Unpaused":
				return auctionReaders.fetchUnpaused(this.directoryPath, queryOptions);

			// Nouns DAO Data.
			case "AdminChanged":
				return dataReaders.fetchAdminChanged(this.directoryPath, queryOptions);
			case "BeaconUpgraded":
				return dataReaders.fetchBeaconUpgraded(this.directoryPath, queryOptions);
			case "CandidateFeedbackSent":
				return dataReaders.fetchCandidateFeedbackSent(this.directoryPath, queryOptions);
			case "CreateCandidateCostSet":
				return dataReaders.fetchCreateCandidateCostSet(this.directoryPath, queryOptions);
			case "ETHWithdrawn":
				return dataReaders.fetchETHWithdrawn(this.directoryPath, queryOptions);
			case "FeeRecipientSet":
				return dataReaders.fetchFeeRecipientSet(this.directoryPath, queryOptions);
			case "FeedbackSent":
				return dataReaders.fetchFeedbackSent(this.directoryPath, queryOptions);
			case "OwnershipTransferred":
				return dataReaders.fetchOwnershipTransferred(this.directoryPath, queryOptions);
			case "ProposalCandidateCanceled":
				return dataReaders.fetchProposalCandidateCanceled(this.directoryPath, queryOptions);
			case "ProposalCandidateCreated":
				return dataReaders.fetchProposalCandidateCreated(this.directoryPath, queryOptions);
			case "ProposalCandidateUpdated":
				return dataReaders.fetchProposalCandidateUpdated(this.directoryPath, queryOptions);
			case "SignatureAdded":
				return dataReaders.fetchSignatureAdded(this.directoryPath, queryOptions);
			case "UpdateCandidateCostSet":
				return dataReaders.fetchUpdateCandidateCostSet(this.directoryPath, queryOptions);
			case "Upgraded":
				return dataReaders.fetchUpgraded(this.directoryPath, queryOptions);

			// Nouns DAO.
			case "DAOWithdrawNounsFromEscrow":
				return daoReaders.fetchDAOWithdrawNounsFromEscrow(this.directoryPath, queryOptions);
			case "ERC20TokensToIncludeInForkSet":
				return daoReaders.fetchERC20TokensToIncludeInForkSet(this.directoryPath, queryOptions);
			case "EscrowedToFork":
				return daoReaders.fetchEscrowedToFork(this.directoryPath, queryOptions);
			case "ExecuteFork":
				return daoReaders.fetchExecutedFork(this.directoryPath, queryOptions);
			case "ForkDAODeployerSet":
				return daoReaders.fetchForkDAODeployerSet(this.directoryPath, queryOptions);
			case "ForkPeriodSet":
				return daoReaders.fetchForkPeriodSet(this.directoryPath, queryOptions);
			case "ForkThresholdSet":
				return daoReaders.fetchForkThresholdSet(this.directoryPath, queryOptions);
			case "JoinFork":
				return daoReaders.fetchJoinFork(this.directoryPath, queryOptions);
			case "LastMinuteWindowSet":
				return daoReaders.fetchLastMinuteWindowSet(this.directoryPath, queryOptions);
			case "MaxQuorumVotesBPSSet":
				return daoReaders.fetchMaxQuorumVotesBPSSet(this.directoryPath, queryOptions);
			case "MinQuorumVotesBPSSet":
				return daoReaders.fetchMinQuorumVotesBPSSet(this.directoryPath, queryOptions);
			case "NewAdmin":
				return daoReaders.fetchNewAdmin(this.directoryPath, queryOptions);
			case "NewImplementation":
				return daoReaders.fetchNewImplementation(this.directoryPath, queryOptions);
			case "NewPendingAdmin":
				return daoReaders.fetchNewPendingAdmin(this.directoryPath, queryOptions);
			case "NewPendingVetoer":
				return daoReaders.fetchNewPendingVetoer(this.directoryPath, queryOptions);
			case "NewVetoer":
				return daoReaders.fetchNewVetoer(this.directoryPath, queryOptions);
			case "ObjectionPeriodDurationSet":
				return daoReaders.fetchObjectionPeriodDurationSet(this.directoryPath, queryOptions);
			case "ProposalCanceled":
				return daoReaders.fetchProposalCanceled(this.directoryPath, queryOptions);
			case "ProposalCreated":
				return daoReaders.fetchProposals(this.directoryPath, queryOptions);
			case "ProposalCreatedOnTimelockV1":
				return daoReaders.fetchProposalCreatedOnTimelockV1(this.directoryPath, queryOptions);
			case "ProposalCreatedWithRequirements":
				return daoReaders.fetchProposalCreatedWithRequirements(this.directoryPath, queryOptions);
			case "ProposalDescriptionUpdated":
				return daoReaders.fetchProposalDescriptionUpdated(this.directoryPath, queryOptions);
			case "ProposalExecuted":
				return daoReaders.fetchProposalExecuted(this.directoryPath, queryOptions);
			case "ProposalObjectionPeriodSet":
				return daoReaders.fetchProposalObjectionPeriodSet(this.directoryPath, queryOptions);
			case "ProposalQueued":
				return daoReaders.fetchProposalQueued(this.directoryPath, queryOptions);
			case "ProposalThresholdBPSSet":
				return daoReaders.fetchProposalThresholdBPSSet(this.directoryPath, queryOptions);
			case "ProposalTransactionsUpdated":
				return daoReaders.fetchProposalTransactionsUpdated(this.directoryPath, queryOptions);
			case "ProposalUpdatablePeriodSet":
				return daoReaders.fetchProposalUpdatablePeriodSet(this.directoryPath, queryOptions);
			case "ProposalUpdated":
				return daoReaders.fetchProposalUpdated(this.directoryPath, queryOptions);
			case "ProposalVetoed":
				return daoReaders.fetchProposalVetoed(this.directoryPath, queryOptions);
			case "QuorumCoefficientSet":
				return daoReaders.fetchQuorumCoefficientSet(this.directoryPath, queryOptions);
			case "QuorumVotesBPSSet":
				return daoReaders.fetchQuorumVotesBPSSet(this.directoryPath, queryOptions);
			case "RefundableVote":
				return daoReaders.fetchRefundableVote(this.directoryPath, queryOptions);
			case "SignatureCancelled":
				return daoReaders.fetchSignatureCancelled(this.directoryPath, queryOptions);
			case "TimelocksAndAdminSet":
				return daoReaders.fetchTimelocksAndAdminSet(this.directoryPath, queryOptions);
			case "ProposalStatusChange":
				return daoReaders.fetchProposalStatusChange(this.directoryPath, queryOptions);
			case "VoteCast":
				return daoReaders.fetchVoteCast(this.directoryPath, queryOptions);
			case "VoteSnapshotBlockSwitchProposalIdSet":
				return daoReaders.fetchVoteSnapshotBlockSwitchProposalIdSet(this.directoryPath, queryOptions);
			case "VotingDelaySet":
				return daoReaders.fetchVotingDelaySet(this.directoryPath, queryOptions);
			case "VotingPeriodSet":
				return daoReaders.fetchVotingPeriodSet(this.directoryPath, queryOptions);
			case "Withdraw":
				return daoReaders.fetchWithdraw(this.directoryPath, queryOptions);
			case "WithdrawFromForkEscrow":
				return daoReaders.fetchWithdrawFromForkEscrow(this.directoryPath, queryOptions);

			// Nouns DAO.
			case "DelegateChanged":
				return tokenReaders.fetchDelegateChanged(this.directoryPath, queryOptions);
			case "DelegateVotesChanged":
				return tokenReaders.fetchDelegateVotesChanged(this.directoryPath, queryOptions);
			case "Transfer":
				return tokenReaders.fetchTransfer(this.directoryPath, queryOptions);
			case "Approval":
				return tokenReaders.fetchApproval(this.directoryPath, queryOptions);
			case "ApprovalForAll":
				return tokenReaders.fetchApprovalForAll(this.directoryPath, queryOptions);
			case "NounCreated":
				return tokenReaders.fetchNounCreated(this.directoryPath, queryOptions);
			case "DescriptorLocked":
				return tokenReaders.fetchDescriptorLocked(this.directoryPath, queryOptions);
			case "DescriptorUpdated":
				return tokenReaders.fetchDescriptorUpdated(this.directoryPath, queryOptions);
			case "MinterLocked":
				return tokenReaders.fetchMinterLocked(this.directoryPath, queryOptions);
			case "MinterUpdated":
				return tokenReaders.fetchMinterUpdated(this.directoryPath, queryOptions);
			case "NounBurned":
				return tokenReaders.fetchNounBurned(this.directoryPath, queryOptions);
			case "NoundersDAOUpdated":
				return tokenReaders.fetchNoundersDAOUpdated(this.directoryPath, queryOptions);
			case "OwnershipTransferred":
				return tokenReaders.fetchOwnershipTransferred(this.directoryPath, queryOptions);
			case "SeederLocked":
				return tokenReaders.fetchSeederLocked(this.directoryPath, queryOptions);
			case "SeederUpdated":
				return tokenReaders.fetchSeederUpdated(this.directoryPath, queryOptions);

			// Errors.
			default:
				throw new Error(`${eventName} is not supported.`);
		}
	}
}
