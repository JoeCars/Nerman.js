// ETHEREUM
export interface Account {
  id: string;
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
  provider: ethers.providers.JsonRpcProvider
}

export type ProposalStatus =
  | typeof STATUS_ACTIVE
  | typeof STATUS_CANCELLED
  | typeof STATUS_EXECUTED
  | typeof STATUS_PENDING
  | typeof STATUS_QUEUED
  | typeof STATUS_VETOED;

import { ethers } from 'ethers';
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

// // NOUNS BOT TYPES
  
//   export interface IAuctionLifecycleHandler {
//     handleNewAuction(auctionId: number): Promise<void>;
//     handleNewBid(auctionId: number, bid: Bid): Promise<void>;
//     handleAuctionEndingSoon?(auctionId: number): Promise<void>;
//     handleNewProposal?(proposal: Proposal): Promise<void>;
//     handleUpdatedProposalStatus?(proposal: Proposal): Promise<void>;
//     handleProposalAtRiskOfExpiry?(proposal: Proposal): Promise<void>;
//     handleGovernanceVote?(proposal: Proposal, vote: Vote): Promise<void>;
//   }

export interface EventData_DelegateChanged {
  delegator: Account,
  fromDelegate: Account,
  toDelegate: Account
}

export interface EventData_DelegateVotesChanged {
  delegate: Account,
  previousBalance: number,
  newBalance: number
}

export interface EventData_Transfer {
  from: Account,
  to: Account,
  tokenId: number
}

export interface EventData_AuctionCreated {
  id: number,
  startTime: number,
  endTime: number
}

export interface EventData_AuctionBid {
  id: number,
  amount: number,
  bidder: Account,
  extended: boolean
}

export interface EventData_ProposalCreatedWithRequirements {
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

export interface EventData_VoteCast {
  id: number;
  voter: Account;
  votes: number;
  supportDetailed: VoteDirection;
  reason: string | null;
}

export interface EventData_ProposalQueued {
  id: string;
  eta: string
}