import { ethers } from "ethers";

//=======================================
// NounsDAO
//=======================================

export function parseProposalCreatedWithEvent(event: ethers.Event) {
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
		id: `${event.args!.id}`,
		proposer: event.args!.proposer,
		startBlock: `${event.args!.startBlock}`,
		endBlock: `${event.args!.endBlock}`,
		proposalThreshold: `${event.args!.proposalThreshold}`,
		quorumVotes: `${event.args!.quorumVotes}`,
		description: event.args!.description,
		targets: event.args!.targets,
		signatures: event.args!.signatures,
		calldatas: event.args!.calldatas
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
		proposalId: `${event.args!.proposalId}`,
		support: event.args!.support,
		supportChoice: ["AGAINST", "FOR", "ABSTAIN"][event.args!.support],
		votes: `${event.args!.votes}`,
		reason: event.args!.reason
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
		proposalId: `${event.args!.id}`,
		status: "Cancelled"
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
		proposalId: `${event.args!.id}`,
		eta: `${event.args!.eta}`,
		status: "Queued"
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
		proposalId: `${event.args!.id}`,
		status: "Executed"
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
		proposalId: `${event.args!.id}`,
		status: "Vetoed"
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
		oldVotingDelay: `${event.args!.oldVotingDelay}`,
		newVotingDelay: `${event.args!.newVotingDelay}`
	};
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
		oldVotingPeriod: `${event.args!.oldVotingPeriod}`,
		newVotingPeriod: `${event.args!.newVotingPeriod}`
	};
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
		oldImplementation: `${event.args!.oldImplementation}`,
		newImplementation: `${event.args!.newImplementation}`
	};
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
	};
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
		oldPendingAdmin: `${event.args!.oldPendingAdmin}`,
		newPendingAdmin: `${event.args!.newPendingAdmin}`
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
		oldAdmin: `${event.args!.oldAdmin}`,
		newAdmin: `${event.args!.newAdmin}`
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
	};
}

export const NOUNS_DAO_PARSERS = new Map();
NOUNS_DAO_PARSERS.set("ProposalCreated", parseProposalCreatedWithEvent);
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
		nounId: Number(`${event.args!.nounId}`),
		startTime: Number(`${event.args!.startTime}`),
		endTime: Number(`${event.args!.endTime}`)
	};
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
		nounId: Number(`${event.args!.nounId}`),
		bidderAddress: event.args!.sender,
		bidAmount: Number(`${event.args!.value}`),
		extended: event.args!.extended
	};
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
		nounId: Number(`${event.args!.nounId}`),
		endTime: Number(`${event.args!.endTime}`)
	};
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
		nounId: Number(`${event.args!.nounId}`),
		winnerAddress: `${event.args!.winner}`,
		bidAmount: Number(`${event.args!.amount}`)
	};
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
		timeBuffer: Number(`${event.args!.timeBuffer}`)
	};
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
		reservePrice: Number(`${event.args!.reservePrice}`)
	};
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
		minBidIncrementPercentage: Number(`${event.args!.minBidIncrementPercentage}`)
	};
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
	};
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
	};
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
	};
}

export const NOUNS_AUCTION_PARSERS = new Map();
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
	};
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
		previousBalance: Number(`${event.args!.previousBalance}`),
		newBalance: Number(`${event.args!.newBalance}`)
	};
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
		tokenId: Number(`${event.args!.tokenId}`)
	};
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
		tokenId: Number(`${event.args!.tokenId}`)
	};
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
	};
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
		tokenId: Number(`${event.args!.tokenId}`),
		seed: {
			background: Number(event.args!.seed.background),
			body: Number(event.args!.seed.body),
			accessory: Number(event.args!.seed.accessory),
			head: Number(event.args!.seed.head),
			glasses: Number(event.args!.seed.glasses)
		}
	};
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
	};
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
	};
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
	};
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
	};
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
	};
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
	};
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
	};
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
	};
}

export const NOUNS_TOKEN_PARSERS = new Map();
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