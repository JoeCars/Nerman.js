import { ethers } from "ethers";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, NounsTokenSeed, Account, EventData } from '../types';

export const on = async function(eventType: string, listener: Function, contract : ethers.Contract){

  switch(eventType) {

    case "DelegateChanged": // WORKING

      contract.on("DelegateChanged", (delegator: string, fromDelegate: string, toDelegate: string, event: Event) => {

          const data: EventData.DelegateChanged = {
            delegator: { id : delegator } as Account,
            fromDelegate: { id : fromDelegate } as Account,
            toDelegate: { id : toDelegate } as Account,
            event: event
          };

          listener(data);
                
        }); 

      break;

    case "DelegateVotesChanged" : // WORKING

      contract.on("DelegateVotesChanged", (delegate: string, previousBalance: number, newBalance: number, event: Event) => {

        const data: EventData.DelegateVotesChanged = {
          delegate: { id: delegate } as Account,
          previousBalance: previousBalance,
          newBalance: newBalance,
          event: event
        };

        listener(data);
                
      }); 

      break;

    case "Transfer" : // WORKING
            
      contract.on("Transfer", (from: string, to: string, tokenId: number, event: Event) => {
                
        const data: EventData.Transfer = {
          from: { id: from } as Account,
          to: { id: to } as Account,
          tokenId: tokenId,
          event: event
        }

        listener(data);
                
      });        
      break;

    case "Approval" : // WORKING

      contract.on("Approval", (owner: string, approved: string, tokenId: number, event: Event) => {

        const data: EventData.Approval = {
          owner: { id: owner } as Account,
          approved: { id: approved } as Account,
          tokenId: tokenId,
          event: event
        }

        listener(data);
            
      });  

      break;


    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "ApprovalForAll" :

      contract.on("ApprovalForAll", (owner: string, operator: string, approved: boolean, event: Event) => {

        const data: EventData.ApprovalForAll = {
          owner: { id: owner } as Account,
          operator: { id: operator } as Account,
          approved: approved,
          event: event
        }

        listener(data);

      });

      break;

    case "NounCreated" : // WORKING

      contract.on("NounCreated", (tokenId : number, seed: NounsTokenSeed, event: Event) => {

        const data : EventData.NounCreated = {
          id: tokenId,
          seed: seed,
          event: event
        }

        listener(data);
      });

      break;

    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "DescriptorLocked" :

      contract.on("DescriptorLocked", (event: Event) => {

        const data: EventData.DescriptorLocked = {
          event: event
        }

        listener(data);

      });

    break;


    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "DescriptorUpdated" :

      contract.on("DescriptorUpdated", (_descriptor: string, event: Event) => {

        const data : EventData.DescriptorUpdated = {
          descriptor: { id: _descriptor } as Account,
          event: event
        }

        listener(data);

      });

      break;


    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "MinterLocked" :

      contract.on("MinterLocked", (event: Event) => {

      const data : EventData.MinterLocked = {
        event: event
      }

      listener(data);
      });

      break;


    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "MinterUpdated" :

      contract.on("MinterUpdated", (_minter: string, event: Event) => {

        const data : EventData.MinterUpdated = {
          minter: { id: _minter } as Account,
          event: event
        }

        listener(data);
        
      });

      break;

      
    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "NounBurned" :

      contract.on("NounBurned", (nounId: number, event: Event) => {

        const data : EventData.NounBurned = {
          id: nounId,
          event: event
        }

        listener(data);
      });

      break;

    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "NoundersDAOUpdated" :

        contract.on("NoundersDAOUpdated", (_noundersDAO: string, event: Event) => {

          const data : EventData.NoundersDAOUpdated = {
            noundersDAO: { id: _noundersDAO } as Account,
            event: event
          }

          listener(data);

        });

      break;


    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "OwnershipTransferred" :

      contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: Event) => {

        const data : EventData.OwnershipTransferred = {
          previousOwner: { id: previousOwner } as Account,
          newOwner: { id: newOwner } as Account,
          event: event
        }

        listener(data);
      });

      break;



    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "SeederLocked" :

      contract.on("SeederLocked", (event: Event) => {

        const data : EventData.SeederLocked = {
          event: event
        }

        listener(data);
      });

      break;
    

      
    // **********************************************************
    //
    // TESTING - Double check details, haven't confirmed live event yet
    //
    // **********************************************************
    case "SeederUpdated" :

      contract.on("SeederUpdated", (_seeder: string, event: Event) => {
  
        const data : EventData.SeederUpdated = {
          seeder: { id: _seeder } as Account,
          event: event
        }
  
        listener(data);
      });
  
      break;  
  }

}

    