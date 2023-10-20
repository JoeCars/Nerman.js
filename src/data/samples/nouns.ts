// NounsDAO.

export const PROPOSAL_CANCELED = {
	id: 117,
	event: {}
};

export const PROPOSAL_CREATED = {
	id: 117,
	proposer: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	targets: [],
	values: [],
	signatures: [],
	calldatas: [],
	startBlock: 17855382,
	endBlock: 17891382,
	proposalThreshold: 1,
	quorumVotes: 79,
	description: "# Supporting Local Animal Shelters!",
	event: {}
};

export const PROPOSAL_EXECUTED = {
	id: 117,
	event: {}
};

export const PROPOSAL_QUEUED = {
	id: 117,
	eta: 1691017619,
	event: {}
};

export const PROPOSAL_VETOED = {
	id: 117,
	event: {}
};

export const VOTE_CAST = {
	voter: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	proposalId: 117,
	supportDetailed: 0,
	votes: 24,
	reason: "Really good reason.",
	event: {}
};

export const VOTING_DELAY_SET = {
	oldVotingDelay: 0,
	newVotingDelay: 99,
	event: {}
};

export const VOTING_PERIOD_SET = {
	oldVotingPeriod: 0,
	newVotingPeriod: 99,
	event: {}
};

export const NEW_ADMIN = {
	oldAdmin: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	newAdmin: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const NEW_IMPLEMENTATION = {
	oldImplementation: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	newImplementation: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const NEW_PENDING_ADMIN = {
	oldPendingAdmin: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	newPendingAdmin: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const NEW_VETOER = {
	oldVetoer: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	newVetoer: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const PROPOSAL_THRESHOLD_BPS_SET = {
	oldProposalThresholdBPS: 12345,
	newProposalThresholdBPS: 123243,
	event: {}
};

export const QUORUM_VOTES_BPS_SET = {
	oldQuorumVotesBPS: 1234,
	newQuorumVotesBPS: 2345,
	event: {}
};

// NounsAuctionHouse.

export const AUCTION_COMPLETE = {
	id: 420,
	endTime: 1691017619
};

export const AUCTION_BID = {
	id: 420,
	amount: 31220000000000000000,
	bidder: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	extended: false,
	event: {}
};

export const AUCTION_CREATED = {
	id: 420,
	startTime: 1689677183,
	endTime: 1689763583,
	event: {}
};

export const AUCTION_EXTENDED = {
	id: 420,
	endTime: 1689763583,
	event: {}
};

export const AUCTION_SETTLED = {
	id: 420,
	winner: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	amount: 29250000000000000000,
	event: {}
};

export const AUCTION_TIME_BUFFER_UPDATED = {
	timeBuffer: 1234,
	event: {}
};

export const AUCTION_RESERVE_PRICE_UPDATED = {
	reservePrice: 12345,
	event: {}
};

export const AUCTION_MIN_BOD_INCREMENT_PERCENTAGE_UPDATED = {
	minBidIncrementPercentage: 1,
	event: {}
};

// NounsToken.

export const DELEGATE_CHANGED = {
	delegator: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	fromDelegate: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	toDelegate: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const DELEGATE_VOTES_CHANGED = {
	delegate: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	previousBalance: 0,
	newBalance: 1,
	event: {}
};

export const TRANSFER = {
	from: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	to: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	tokenId: 420,
	event: {}
};

export const APPROVAL = {
	owner: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	approved: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	tokenId: 420,
	event: {}
};

export const APPROVAL_FOR_ALL = {
	owner: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	operator: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	approved: true,
	event: {}
};

export const DESCRIPTOR_LOCKED = {
	event: {}
};

export const DESCRIPTOR_UPDATED = {
	descriptor: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const MINTER_LOCKED = {
	event: {}
};

export const MINTER_UPDATED = {
	minter: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const NOUN_BURNED = {
	id: 420,
	event: {}
};

export const NOUN_CREATED = {
	id: 420,
	seed: {
		background: 0,
		body: 0,
		accessory: 0,
		head: 0,
		glasses: 0
	},
	event: {}
};

export const NOUNDERS_DAO_UPDATED = {
	noundersDAO: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const OWNERSHIP_TRANSFERRED = {
	previousOwner: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	newOwner: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};

export const SEEDER_LOCKED = {
	event: {}
};

export const SEEDER_UPDATED = {
	seeder: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	event: {}
};
