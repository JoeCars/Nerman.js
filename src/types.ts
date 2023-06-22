import { ethers, BigNumber } from 'ethers';

// ETHEREUM
export interface Account {
  id: string;
}

export interface NounsTokenSeed {
  background: number;
  body:number;
  accessory:number;
  head:number;
  glasses:number;
}

// NounsAuctionHouse
export interface Auction {
  id: number; //Noun ID
  startTime: number;
  endTime: number;
}

export interface Bid {
  id: string;
  amount: string;
  bidder: Account;
  extended: boolean;
}

export interface AuctionBids {
  id: number;
  endTime: number;
  bids: Bid[];
}

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
}

export enum VoteDirection {
  AGAINST = 0,
  FOR = 1,
  ABSTAIN = 2,
}

export interface Vote {
  id: string;
  voter: Account;
  votes: number;
  supportDetailed: VoteDirection;
  reason: string | null;
}

export interface NounsContractData {
  address: string;
  abi: ethers.ContractInterface;
  provider: ethers.providers.JsonRpcProvider;
}

export interface EventWrapper {
  event: ethers.Event;
}

export type ProposalStatus =
  | typeof STATUS_ACTIVE
  | typeof STATUS_CANCELLED
  | typeof STATUS_EXECUTED
  | typeof STATUS_PENDING
  | typeof STATUS_QUEUED
  | typeof STATUS_VETOED;



import {
    STATUS_ACTIVE,
    STATUS_QUEUED,
    STATUS_PENDING,
    STATUS_EXECUTED,
    STATUS_CANCELLED,
    STATUS_VETOED,
  } from './constants';


  // THIS IS OLD, moved to EVENT DATA
export interface Proposal {
  id: number;
  proposer: Account;
  description: string;
  status: ProposalStatus;
  quorumVotes: number;
  proposalThreshold: number;
  startBlock: number;
  endBlock: number;
  executionETA: number;
  votes: Vote[];
}

export namespace EventData {

// ******************************************
//
// Contract - NounsDAO
//
// ******************************************
// EventData types

  export interface ProposalCanceled {
    id: number;
    event: ethers.Event;
  }

  export interface ProposalCreated {
    id: number;
    proposer: Account;
    targets: string[];
    values: BigNumber[];
    signatures: string[];
    calldatas : any[]; // type is bytes[]
    startBlock: number;
    endBlock: number;
    description: string;
    event: ethers.Event;
  }
  
  export interface ProposalCreatedWithRequirements {
    id: number;
    proposer: Account;
    targets: string[];
    values: BigNumber[];
    signatures: string[];
    calldatas: any[];
    startBlock: number;
    endBlock: number;
    proposalThreshold: number;
    quorumVotes: number;
    description: string;
    event: ethers.Event;
  }

  export interface ProposalExecuted {
    id:number;
    event: ethers.Event;
  }

  export interface ProposalQueued {
    id: number;
    eta: number;
    event: ethers.Event;
  }

  export interface ProposalVetoed {
    id:number;
    event: ethers.Event;
  }

  export interface VoteCast {
    voter: Account;
    proposalId: number;
    supportDetailed: VoteDirection;
    votes: number;
    reason: string;
    event: ethers.Event;
  }

  export interface VotingDelaySet {
    oldVotingDelay: number;
    newVotingDelay: number;
    event: ethers.Event;
  }

  export interface VotingPeriodSet {
    oldVotingPeriod: number;
    newVotingPeriod: number;
    event: ethers.Event;
  }

  export interface NewAdmin {
    oldAdmin: Account;
    newAdmin: Account;
    event: ethers.Event;
  }

  export interface NewImplementation {
    oldImplementation: Account;
    newImplementation: Account;
    event: ethers.Event;
  }

  export interface NewPendingAdmin {
    oldPendingAdmin: Account;
    newPendingAdmin: Account;
    event: ethers.Event;
  }

  export interface NewVetoer {
    oldVetoer: Account;
    newVetoer: Account;
    event: ethers.Event;
  }

  export interface ProposalThresholdBPSSet {
    oldProposalThresholdBPS: number;
    newProposalThresholdBPS: number;
    event: ethers.Event;
  }

  export interface QuorumVotesBPSSet {
    oldQuorumVotesBPS: number;
    newQuorumVotesBPS: number;
    event: ethers.Event;
  }


  // ******************************************
  //
  // Contract - NounsAuctionHouse
  //
  // ******************************************

  // CUSTOM TYPES
  export interface AuctionComplete {
    id: number;
    endTime: number;
    // should add block
  }


  // EventData types from ABI

  export interface AuctionCreated {
    id: number;
    startTime: number;
    endTime: number;
    event: ethers.Event;
  }

  export interface AuctionBid   {
    id: number;
    amount: number;
    bidder: Account;
    extended: boolean;
    event: ethers.Event;
  }

  export interface AuctionCreated {
    id: number; 
    startTime: number;
    endTime: number;
    event: ethers.Event;
  }

  export interface AuctionExtended {
    id: number;
    endTime: number;
    event: ethers.Event;
  }
    
  export interface AuctionSettled {
    id: number;
    winner: Account;
    amount: number;
    event: ethers.Event;
  }

  export interface AuctionTimeBufferUpdated {
    timeBuffer: number;
    event: ethers.Event;
  }

  export interface AuctionReservePriceUpdated {
    reservePrice: number;
    event: ethers.Event;
  }

  export interface AuctionMinBidIncrementPercentageUpdated {
    minBidIncrementPercentage: number;
    event: ethers.Event;
  }

    // ******************************************
  //
  // Contract - NounsToken
  //
  // ******************************************
  // EventData types

  export interface DelegateChanged {
    delegator: Account;
    fromDelegate: Account;
    toDelegate: Account;
    event: ethers.Event;
  }

  export interface DelegateVotesChanged {
    delegate: Account;
    previousBalance: number;
    newBalance: number;
    event: ethers.Event;
  }

  export interface Transfer {
    from: Account;
    to: Account;
    tokenId: number;
    event: ethers.Event;
  }

  export interface Approval {
    owner: Account;
    approved: Account;
    tokenId: number;
    event: ethers.Event;
  }

  export interface ApprovalForAll {
    owner: Account;
    operator: Account;
    approved: boolean;
    event: ethers.Event;
  }

  export interface DescriptorLocked{
    event: ethers.Event;
  }

  export interface DescriptorUpdated {
    descriptor: Account;
    event: ethers.Event;
  }

  export interface MinterLocked {
    event: ethers.Event;
  }

  export interface MinterUpdated {
    minter: Account;
    event: ethers.Event;
  }

  export interface NounBurned {
    id: number;
    event: ethers.Event;
  }

  export interface NounCreated {
    id: number;
    seed: NounsTokenSeed;
    event: ethers.Event;
  }

  export interface NoundersDAOUpdated {
    noundersDAO: Account;
    event: ethers.Event;
  }

  export interface OwnershipTransferred {
    previousOwner: Account;
    newOwner: Account;
    event: ethers.Event;
  }

  export interface SeederLocked {
    event: ethers.Event;
  }

	export interface SeederUpdated {
		event: ethers.Event;
		seeder: Account;
	}

	// ******************************************
	//
	// Nouns Nyms
	//
	// ******************************************

	export namespace NounsNyms {
		export interface Post {
			id: string;
			title: string;
			body: string;
			timestamp: string;
			userId: string;
			parentId?: string;
			depth: number;
			upvotes: Upvote[];
			root?: Post;
			parent?: Post;
			_count: {
				descendants: number;
			};
		}

		export interface Upvote {
			id: string;
			address: string;
			timestamp: string;
		}

		export interface User {
			userId: string;
			numPosts: number;
			numReplies: number;
			totalPosts: number;
			doxed: boolean;
			name: string;
			lastActive: string;
			upvotes: number;
		}

		export interface UserAttachedPost extends Post {
			user: User;
		}
	}
}
