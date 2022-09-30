import { ethers, BigNumber } from "ethers";
import { stringify } from "querystring";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account, ProposalStatus, EventData } from '../types';

// Nouns DAO Proxy - 
// https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/governance/NounsDAOProxy.sol

export const on = async function(eventType: string, listener: Function, contract : ethers.Contract){

  switch(eventType) {

    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    // TODO - just return calldata, object construction (ie Proposal) goes in other file
    //
    // **********************************************************

    case "ProposalCreated":

      /// @notice An event emitted when a new proposal is created
      contract.on("ProposalCreated", (
        id: BigNumber,
        proposer: string,
        targets: string[],
        values: BigNumber[],
        signatures: string[],
        calldatas : any[], // type is bytes[]
        startBlock: BigNumber,
        endBlock: BigNumber,
        description: string,
        event: Event
      ) => {

        const data: EventData.ProposalCreated  = {
          id: id.toNumber(),
          proposer: { id : proposer } as Account,
          targets: targets,
          values: values,
          signatures: signatures,
          calldatas: calldatas, // type is bytes[]
          startBlock: startBlock.toNumber(),
          endBlock: endBlock.toNumber(),
          description: description,
          event: event,
        }

        listener(data);


      });
      break;

    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // TODO - just return calldata, object construction (ie Proposal) goes in other file
    // **********************************************************

    case "ProposalCreatedWithRequirements":

      /// @notice An event emitted when a new proposal is created
      contract.on("ProposalCreatedWithRequirements", (
        id : BigNumber, 
        proposer : string, 
        targets : string[],
        values : BigNumber[],
        signatures : string[],
        calldatas: any[], // bytes
        startBlock : BigNumber, 
        endBlock : BigNumber, 
        proposalThreshold : BigNumber, 
        quorumVotes : BigNumber, 
        description : string,
        event : Event
      ) => {
        
        const data: EventData.ProposalCreatedWithRequirements  = {
            id: id.toNumber(),
            proposer: { id : proposer } as Account,
            targets: targets,
            values: values,
            signatures: signatures,
            calldatas: calldatas,
            startBlock: startBlock.toNumber(),
            endBlock: endBlock.toNumber(),
            proposalThreshold: proposalThreshold.toNumber(),
            quorumVotes: quorumVotes.toNumber(),
            description: description,
            event: event,

          }

          listener(data);

      });

      break;

    case "VoteCast": // WORKING

      // / @notice An event emitted when a vote has been cast on a proposal
      // / @param voter The address which casted a vote
      // / @param proposalId The proposal id which was voted on
      // / @param support Support value for the vote. 0=against, 1=for, 2=abstain
      // / @param votes Number of votes which were cast by the voter
      // / @param reason The reason given for the vote by the voter

      contract.on("VoteCast", (voter: string, proposalId: number, support: number, votes: number, reason: string, event: Event) => {

        const supportDetailed: VoteDirection = support;

        const data: EventData.VoteCast = {
            voter: { id : voter } as Account,
            proposalId: proposalId,
            supportDetailed: supportDetailed,
            votes: votes,
            reason: reason,
            event: event
        }

        listener(data);

      });

      break;


    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************      

    case "ProposalCanceled":
      
        // @notice An event emitted when a proposal has been canceled
        contract.on("ProposalCanceled", (id: number, event: Event) => {

          const data: EventData.ProposalCanceled = {
              id: id,
              event: event
          }

          listener(data);
        });
      break;

    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************
      
    case "ProposalQueued":
      /// @notice An event emitted when a proposal has been queued in the NounsDAOExecutor
      /// @param eta The timestamp that the proposal will be available for execution, set once the vote succeeds
      contract.on("ProposalQueued", (id: number, eta: number, event: Event) => {

        const data : EventData.ProposalQueued = {
          id: id,
          eta: eta,
          event: event
        }
        listener(data);
      });
      break;

    case "ProposalExecuted": // FUNCTIONING CORRECTLY
      
      // An event emitted when a proposal has been executed in the NounsDAOExecutor
      contract.on("ProposalExecuted", (id: number, event: Event) => {

        const data : EventData.ProposalExecuted = {
          id: id,
          event: event
        }
        listener(data);
      });
      break;



    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************   
    case "ProposalVetoed":
      /// @notice An event emitted when a proposal has been vetoed by vetoAddress
      contract.on("ProposalVetoed", (id: number, event: Event) => {

        const data : EventData.ProposalVetoed = {
          id: id,
          event: event
        }
        listener(data);
      });
      break;


      
    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************   
    case "VotingDelaySet":
      /// @notice An event emitted when the voting delay is set
      contract.on("VotingDelaySet", (oldVotingDelay: number, newVotingDelay: number, event: Event) => {
        
        const data: EventData.VotingDelaySet = {
          oldVotingDelay: oldVotingDelay,
          newVotingDelay: newVotingDelay,
          event: event
        }

        listener(data);
        
      });
      break;


    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************   
    case "VotingPeriodSet":

      /// @notice An event emitted when the voting period is set
      contract.on("VotingPeriodSet", (oldVotingPeriod: number, newVotingPeriod: number, event: Event) => {
        
        const data : EventData.VotingPeriodSet = {
          oldVotingPeriod : oldVotingPeriod,
          newVotingPeriod : newVotingPeriod,
          event : event
        }

        listener(data);

      });
      break;


    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************   
    case "NewImplementation":
      /// @notice Emitted when implementation is changed
      contract.on("NewImplementation", (oldImplementation: string, newImplementation: string, event: Event) => {

        const data : EventData.NewImplementation = {
          oldImplementation : { id: oldImplementation } as Account,
          newImplementation : { id: newImplementation } as Account,
          event : event
        }

        listener(data);

      });
      break;


    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************   
    case "ProposalThresholdBPSSet":
      /// @notice Emitted when proposal threshold basis points is set
      contract.on("ProposalThresholdBPSSet", (oldProposalThresholdBPS:number, newProposalThresholdBPS:number, event:Event) => {

        const data : EventData.ProposalThresholdBPSSet = {
          oldProposalThresholdBPS : oldProposalThresholdBPS,
          newProposalThresholdBPS : newProposalThresholdBPS,
          event : event
        }
        
        listener(data);

      });
      break;


    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************   
    case "QuorumVotesBPSSet":
        /// @notice Emitted when quorum votes basis points is set
        contract.on("QuorumVotesBPSSet", (oldQuorumVotesBPS : number, newQuorumVotesBPS : number, event:Event) => {

          const data : EventData.QuorumVotesBPSSet = {
            oldQuorumVotesBPS : oldQuorumVotesBPS,
            newQuorumVotesBPS : newQuorumVotesBPS,
            event : event
          }

          listener(data);
        });
      break;


    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************   
    case "NewPendingAdmin":
        /// @notice Emitted when pendingAdmin is changed
        contract.on("NewPendingAdmin", (oldPendingAdmin : string, newPendingAdmin : string, event:Event) => {

          const data : EventData.NewPendingAdmin = {
            oldPendingAdmin : { id : oldPendingAdmin } as Account, 
            newPendingAdmin : { id : newPendingAdmin } as Account,
            event : event
          }

          listener(data);
        });
        

      break;


    // **********************************************************
    //
    // STATUS: TESTING AND DOCUMENTATION NEEDED
    //
    // **********************************************************   
    case "NewAdmin":
        /// @notice Emitted when pendingAdmin is accepted, which means admin is updated
        contract.on("NewAdmin", (oldAdmin : string, newAdmin : string, event:Event) => {

          const data : EventData.NewAdmin = {
            oldAdmin : { id : oldAdmin } as Account,
            newAdmin : { id : newAdmin } as Account,
            event : event
          }

          listener(data);
        });
      break;


  }

}
