import { ethers } from "ethers";

import { Indexer } from "../types";

//=======================================
// NounsDAO
//=======================================

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
		startBlock: Number(event.args!.startBlock),
		endBlock: Number(event.args!.endBlock),
		description: event.args!.description,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas,
		proposalThreshold: Number(event.args!.proposalThreshold),
		quorumVotes: Number(event.args!.quorumVotes)
	} as Indexer.NounsDAO.ProposalCreatedWithRequirements;
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

export const NOUNS_DAO_PARSERS = new Map<string, Function>();
NOUNS_DAO_PARSERS.set("ProposalCreated", parseProposalCreatedEvent);
NOUNS_DAO_PARSERS.set("ProposalCreatedWithRequirements", parseProposalCreatedWithRequirementsEvent);
NOUNS_DAO_PARSERS.set("VoteCast", parseVoteCastEvent);
NOUNS_DAO_PARSERS.set("ProposalCanceled", parseProposalCanceledEvent);
NOUNS_DAO_PARSERS.set("ProposalQueued", parseProposalQueuedEvent);
NOUNS_DAO_PARSERS.set("ProposalExecuted", parseProposalExecutedEvent);
NOUNS_DAO_PARSERS.set("ProposalVetoed", parseProposalVetoedEvent);
NOUNS_DAO_PARSERS.set("VotingDelaySet", parseVotingDelaySetEvent);
NOUNS_DAO_PARSERS.set("VotingPeriodSet", parseVotingPeriodSetEvent);
NOUNS_DAO_PARSERS.set("NewImplementation", parseNewImplementationEvent);
NOUNS_DAO_PARSERS.set("ProposalThresholdBPSSet", parseProposalThresholdBPSSetEvent);
NOUNS_DAO_PARSERS.set("QuorumVotesBPSSet", parseQuorumVotesBPSSetEvent);
NOUNS_DAO_PARSERS.set("NewPendingAdmin", parseNewPendingAdminEvent);
NOUNS_DAO_PARSERS.set("NewAdmin", parseNewAdminEvent);
NOUNS_DAO_PARSERS.set("NewVetoer", parseNewVetoerEvent);

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
NOUNS_TOKEN_PARSERS.set("SeederLocked", parseSeederLockedEvent);
NOUNS_TOKEN_PARSERS.set("SeederUpdated", parseSeederUpdatedEvent);
