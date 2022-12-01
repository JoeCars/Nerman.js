import 'dotenv/config';
import { exit } from 'process';

import * as nerman from "stateofnouns";
const Nouns = new nerman.Nouns(process.env.JSON_RPC_API_URL);


// import { EventData } from './lib/StateOfNouns/src/types';
//import { _StateOfNouns } from "stateofnouns"; // load latest public npm version

async function getNounInfo(nounId : number) {

  console.log("Getting Data for Noun " + nounId);

  // Look up Owner of Noun by id
  const ownerAddress = await Nouns.NounsToken.Contract.ownerOf(nounId);
  
  // Look up ENS from address
  const ownerEns = await Nouns.ensReverseLookup(ownerAddress);

  // Look up delegate from ownerAddress
  const delegateAddress = await Nouns.NounsToken.Contract.delegates(ownerAddress);

  // Look up ENS from address
  const delegateEns = await Nouns.ensReverseLookup(delegateAddress);

  // Look up current votes for ownerAddress
  const votingPower = await Nouns.NounsToken.Contract.getCurrentVotes(delegateAddress);

  console.log("Owner: " + ownerAddress);
  if(ownerEns){ console.log("ENS found: " + ownerEns); }
  console.log("Delegate: " + delegateAddress );
  if(delegateEns){ console.log("ENS found: " + delegateEns); }
  console.log("Voting Power:  " + votingPower.toNumber());

  // Get Final Bid Data

  const bid = await Nouns.NounsAuctionHouse.getLatestBidData(nounId);

  //   bid : {
  //     id: number,
  //     block: numbre,
  //     date: Date,
  //     amount: number (ETH),
  //     address: string,
  //     ens: string
  // }

  if(bid != null){
    const name = (bid.ens != null) ? bid.ens :  bid.address;
    console.log("Noun " + bid.id + " sold for " + bid.amount + " ETH to " + name + " on " + bid.date.toLocaleString() )
  }
}

getNounInfo(2);

async function getNounerInfo(address:string){

  const result = await Nouns.getAddress(address);

  if (result) {
  
    const owned = await Nouns.NounsToken.Contract.balanceOf(result);
    console.log("Owned Nouns: " + owned);

    const delegated = await Nouns.NounsToken.Contract.getCurrentVotes(result);
    console.log("Delegated Nouns: " + delegated);

  }

}

getNounerInfo("vote.nounders.eth");
getNounerInfo("nounders.eth");

// Nounders hot voting wallet

// *************************************************************
//
// NounsDAO events - TESTING
//
// *************************************************************

Nouns.on("ProposalCreated", (data : nerman.EventData.ProposalCreated) => {

  data.description = data.description.substring(0,150);

  console.log("NounsDAO | ProposalCreated | id:" + data.id + ", proposer: " + data.proposer.id +
  ", startBlock: " + data.startBlock + ", endBlock: " + data.endBlock + ", description: " + data.description);

  console.log("targets: " + JSON.stringify(data.targets));
  console.log("values: " + JSON.stringify(data.values));
  console.log("signatures: " + JSON.stringify(data.signatures));
  console.log("calldatas: " + JSON.stringify(data.calldatas));
});

Nouns.on("ProposalCreatedWithRequirements", (data : nerman.EventData.ProposalCreatedWithRequirements) => {

  data.description = data.description.substring(0,150);
  console.log("NounsDAO | ProposalCreatedWithRequirements | id:" + data.id + ", proposer: " + data.proposer.id +
  ", startBlock: " + data.startBlock + ", endBlock: " + data.endBlock + "quorumVotes " + data.quorumVotes
   + ", proposalThreshold: "+ data.proposalThreshold + ", description: " + data.description);

  console.log("targets: " + JSON.stringify(data.targets));
  console.log("values: " + JSON.stringify(data.values));
  console.log("signatures: " + JSON.stringify(data.signatures));
  console.log("calldatas: " + JSON.stringify(data.calldatas));
  
});

Nouns.on("ProposalCanceled", (data : nerman.EventData.ProposalCanceled) => {

  console.log("NounsDAO | ProposalCanceled | id:" + data.id );
  
});

Nouns.on("ProposalQueued", (data : nerman.EventData.ProposalQueued) => {

  console.log("NounsDAO | ProposalQueued | id:" + data.id + ", eta: " + data.eta);
  
});

Nouns.on("ProposalVetoed", (data : nerman.EventData.ProposalVetoed) => {

  console.log("NounsDAO | ProposalVetoed | id:" + data.id );
  
});


// *************************************************************
//
// NounsAuctionHouse events - TESTING
//
// *************************************************************

Nouns.on("AuctionExtended", (data : nerman.EventData.AuctionExtended) => {

  console.log("NounsAuctionHouse | AuctionExtended | id:" + data.id + ", endTime:" + data.endTime);
  
});

// *************************************************************
//
// NounsToken events - TESTING
//
// *************************************************************


Nouns.on("ApprovalForAll", (data : nerman.EventData.ApprovalForAll) => {

  console.log("NounsToken | ApprovalForAll | owner:" + data.owner.id + ", operator: " + data.operator.id + 
  ", approved: " + data.approved );
  
});




// *************************************************************
//
// NounsDAO Events
//
// *************************************************************

Nouns.on("VoteCast", (vote : nerman.EventData.VoteCast) => {

  console.log("NounsDAO | VoteCast | id:" + vote.proposalId + ",  voter: " + vote.voter.id + ", votes: " +
  vote.votes + " , supportDetailed: " + vote.supportDetailed + ", reason: " + vote.reason);

});

Nouns.on("ProposalExecuted", (data : nerman.EventData.ProposalExecuted) => {

  console.log("NounsDAO | ProposalExecuted | id:" + data.id );
  
});

// *************************************************************
//
// NounsAuctionHouse Events
//
// *************************************************************

Nouns.on("AuctionCreated", (auction: nerman.EventData.AuctionCreated) => {

  console.log("NounsAuctionHouse | AuctionCreated " + auction.id + " " + auction.startTime + " " + auction.endTime);
  
});

Nouns.on("AuctionBid", (data : nerman.EventData.AuctionBid) => {

  console.log("NounsAuctionHouse | AuctionBid " + data.id + " " + data.bidder.id + " " + data.amount + " " + data.extended);
  
});

Nouns.on("AuctionSettled", (data : nerman.EventData.AuctionSettled) => {

  console.log("NounsAuctionHouse | AuctionSettled | id:" + data.id + ", winnerId:" + data.winner.id + ", amount: " + data.amount);
  
});

// *************************************************************
//
// NounsToken Events
//
// *************************************************************

Nouns.on("Approval", (data : nerman.EventData.Approval) => {

  console.log("NounsToken | Approval | owner:" + data.owner.id + ", approved: " + data.approved.id + 
  ", tokenId: " + data.tokenId );
  
});

Nouns.on("Transfer", (data : nerman.EventData.Transfer) => {

  console.log("NounsToken | Transfer | from:" + data.from.id + ", to: " + data.to.id + ", tokenId: " + data.tokenId);
  
});

Nouns.on("NounCreated", (data : nerman.EventData.NounCreated) => {

  console.log("NounsToken | NounCreated | id:" + data.id + ", seed: " + JSON.stringify(data.seed));
  
});

Nouns.on("DelegateChanged", (data : nerman.EventData.DelegateChanged) => {

  console.log("NounsToken | DelegateChanged | delegator:" + data.delegator.id + ", fromDelegate: " + data.fromDelegate.id + 
  ", toDelegate: " + data.toDelegate.id );
  
});

Nouns.on("DelegateVotesChanged", (data : nerman.EventData.DelegateVotesChanged) => {

  console.log("NounsToken | DelegateVotesChanged | delegate:" + data.delegate.id + ", previousBalance: " + data.previousBalance + 
  ", newBalance: " + data.newBalance );
  
});