import { ethers } from "ethers";
import { NounsDAOABI } from '@nouns/contracts';
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account, ProposalStatus, EventData_ProposalCreatedWithRequirements  } from '../types';

// Nouns DAO Proxy - 
// https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/governance/NounsDAOProxy.sol

const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_API_URL);
provider.pollingInterval = 10000;
// @todo move provider to StateOfNouns.ts, pass as arg when initializing


const NounsDAOProxyV1 = {
  address:'0x6f3E6272A167e8AcCb32072d08E0957F9c79223d',
  abi:NounsDAOABI,
  provider: provider
}

const NounsDAO = new ethers.Contract( NounsDAOProxyV1.address , NounsDAOABI, provider )

export const on = async function(eventType: string, listener: Function){

  switch(eventType) {

    case "ProposalCreated":

      /// @notice An event emitted when a new proposal is created
      NounsDAO.on("ProposalCreated", (
        id,
        proposer,
        targets,
        values,
        signatures,
        calldatas,
        startBlock,
        endBlock,
        description
      ) => {
        console.log("ProposalCreated");
      });
      break;

    case "ProposalCreatedWithRequirements":

      /// @notice An event emitted when a new proposal is created
      NounsDAO.on("ProposalCreatedWithRequirements", (
        id, 
        proposer, 
        targets, //address[]
        values, // unit256[]
        signatures, // string[]
        calldatas, // bytes
        startBlock, 
        endBlock, 
        proposalThreshold, 
        quorumVotes, 
        description
      ) => {

        const data: EventData_ProposalCreatedWithRequirements  = {
            id: id,
            proposer: proposer,
            description: description,
            status: "STATUS_CANCELLED" as ProposalStatus, // NOT IMPLEMENTED YET
            quorumVotes: quorumVotes,
            proposalThreshold: proposalThreshold,
            startBlock: startBlock,
            endBlock: endBlock,
            executionETA: -1, //NOT IMPLEMENTED YET
            votes: [] as Vote[] //NOT IMPLEMENTED YET
          }

          listener(data);

      });

      break;
    
    case "VoteCast":

      // / @notice An event emitted when a vote has been cast on a proposal
      // / @param voter The address which casted a vote
      // / @param proposalId The proposal id which was voted on
      // / @param support Support value for the vote. 0=against, 1=for, 2=abstain
      // / @param votes Number of votes which were cast by the voter
      // / @param reason The reason given for the vote by the voter
      NounsDAO.on("VoteCast", (voter: string, proposalId: string, support: number, votes: number, reason: string | null) => {

        const voterAccount: Account = {
            id: voter
        }

        const supportDetailed: VoteDirection = support;

        const vote: Vote = {
            id: proposalId,
            voter: voterAccount,
            votes: votes,
            supportDetailed: supportDetailed,
            reason: reason
        }

        listener(vote);

      });


      break;
  }

}


// / @notice An event emitted when a proposal has been canceled
// NounsDAO.on("ProposalCanceled", (id) => {
//     console.log("ProposalCanceled " +id);
// });
// /// @notice An event emitted when a proposal has been queued in the NounsDAOExecutor
// /// @param eta The timestamp that the proposal will be available for execution, set once the vote succeeds
// NounsDAO.on("ProposalQueued", (id, eta) => {
//     console.log("ProposalQueued " + id + ", eta " + eta);
// });
// /// @notice An event emitted when a proposal has been executed in the NounsDAOExecutor
// NounsDAO.on("ProposalExecuted", (id) => {
//     console.log("ProposalExecuted");
// });
// /// @notice An event emitted when a proposal has been vetoed by vetoAddress
// NounsDAO.on("ProposalVetoed", (id) => {
//     console.log("ProposalVetoed");
// });
// /// @notice An event emitted when the voting delay is set
// NounsDAO.on("VotingDelaySet", (oldVotingDelay, newVotingDelay) => {
//     console.log("VotingDelaySet");
// });
// /// @notice An event emitted when the voting period is set
// NounsDAO.on("VotingPeriodSet", (oldVotingPeriod, newVotingPeriod) => {
//     console.log("VotingPeriodSet");
// });
// /// @notice Emitted when implementation is changed
// NounsDAO.on("NewImplementation", (oldImplementation, newImplementation) => {
//     console.log("NewImplementation");
// });
// /// @notice Emitted when proposal threshold basis points is set
// NounsDAO.on("ProposalThresholdBPSSet", (oldProposalThresholdBPS, newProposalThresholdBPS) => {
//     console.log("ProposalThresholdBPSSet");
// });
// /// @notice Emitted when quorum votes basis points is set
// NounsDAO.on("QuorumVotesBPSSet", (oldQuorumVotesBPS, newQuorumVotesBPS) => {
//     console.log("QuorumVotesBPSSet");
// });
// /// @notice Emitted when pendingAdmin is changed
// NounsDAO.on("NewPendingAdmin", (oldPendingAdmin, newPendingAdmin) => {
//     console.log("NewPendingAdmin");
// });
// /// @notice Emitted when pendingAdmin is accepted, which means admin is updated
// NounsDAO.on("NewAdmin", (oldAdmin, newAdmin) => {
//     console.log("NewAdmin");
// });
// /// @notice Emitted when vetoer is changed
// NounsDAO.on("NewVetoer", (oldVetoer, newVetoer) => {
//     console.log("NewVetoer");
// });