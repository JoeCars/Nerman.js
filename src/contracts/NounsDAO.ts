import { ethers } from "ethers";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account, ProposalStatus, EventData_ProposalCreatedWithRequirements, NounsContractData, EventData_ProposalQueued, EventData_ProposalExecuted  } from '../types';

// Nouns DAO Proxy - 
// https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/governance/NounsDAOProxy.sol

export const on = async function(eventType: string, listener: Function, contract : ethers.Contract){

  switch(eventType) {

    case "ProposalCreated":

      /// @notice An event emitted when a new proposal is created
      contract.on("ProposalCreated", (
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
      contract.on("ProposalCreatedWithRequirements", (
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
      contract.on("VoteCast", (voter: string, proposalId: string, support: number, votes: number, reason: string | null) => {

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
    
    case "ProposalCanceled":
        // @notice An event emitted when a proposal has been canceled
        contract.on("ProposalCanceled", (id) => {
          listener(id);
        });
      break;

    case "ProposalQueued":
      /// @notice An event emitted when a proposal has been queued in the NounsDAOExecutor
      /// @param eta The timestamp that the proposal will be available for execution, set once the vote succeeds
      contract.on("ProposalQueued", (id, eta) => {

        const data : EventData_ProposalQueued = {
          id: id,
          eta: eta
        }
        listener(data);
      });
      break;

    case "ProposalExecuted":
      /// @notice An event emitted when a proposal has been executed in the NounsDAOExecutor
      contract.on("ProposalExecuted", (id) => {
        const data : EventData_ProposalExecuted = {
          id: id,
        }
        listener(data);
      });
      break;
    
    case "ProposalVetoed":
      /// @notice An event emitted when a proposal has been vetoed by vetoAddress
      contract.on("ProposalVetoed", (id) => {
        listener(id);
      });
      break;
  }

}

// /// @notice An event emitted when the voting delay is set
// contract.on("VotingDelaySet", (oldVotingDelay, newVotingDelay) => {
//     console.log("VotingDelaySet");
// });
// /// @notice An event emitted when the voting period is set
// contract.on("VotingPeriodSet", (oldVotingPeriod, newVotingPeriod) => {
//     console.log("VotingPeriodSet");
// });
// /// @notice Emitted when implementation is changed
// contract.on("NewImplementation", (oldImplementation, newImplementation) => {
//     console.log("NewImplementation");
// });
// /// @notice Emitted when proposal threshold basis points is set
// contract.on("ProposalThresholdBPSSet", (oldProposalThresholdBPS, newProposalThresholdBPS) => {
//     console.log("ProposalThresholdBPSSet");
// });
// /// @notice Emitted when quorum votes basis points is set
// contract.on("QuorumVotesBPSSet", (oldQuorumVotesBPS, newQuorumVotesBPS) => {
//     console.log("QuorumVotesBPSSet");
// });
// /// @notice Emitted when pendingAdmin is changed
// contract.on("NewPendingAdmin", (oldPendingAdmin, newPendingAdmin) => {
//     console.log("NewPendingAdmin");
// });
// /// @notice Emitted when pendingAdmin is accepted, which means admin is updated
// contract.on("NewAdmin", (oldAdmin, newAdmin) => {
//     console.log("NewAdmin");
// });
// /// @notice Emitted when vetoer is changed
// contract.on("NewVetoer", (oldVetoer, newVetoer) => {
//     console.log("NewVetoer");
// });