# README 

## Import into ES6 TypeScript project

```
import 'dotenv/config';

import * as nerman from "nerman";

const Nouns = new nerman.Nouns(process.env.JSON_RPC_API_URL);

Nouns.on("VoteCast", (vote : EventData.VoteCast) => {

  Nouns.on("AuctionBid", (data) => {

    console.log("NounsAuctionHouse | AuctionBid " + data.id + " " + data.bidder.id + " " + data.amount + " " + data.extended);
    
  });

});

```



## Import into CommonJS Project

```
require('dotenv').config();

const _nerman = import('stateofnouns');

async function runApp() {

  const nerman = await _nerman;
  const Nouns = new nerman.Nouns(process.env.JSON_RPC_API_URL);

  Nouns.on("AuctionBid", (data) => {

    console.log("NounsAuctionHouse | AuctionBid " + data.id + " " + data.bidder.id + " " + data.amount + " " + data.extended);
    
  });

}

runApp()
.catch(err => { console.log(err); });
```

## Short Example

```
import 'dotenv/config';

import * as nerman from "nerman";
const Nouns = new nerman.Nouns(process.env.JSON_RPC_API_URL);

Nouns.on("ProposalCreated", (data : nerman.EventData.ProposalCreatedWithRequirements) => {

  // do stuff here
  
});


```

## Listen To Common Nouns Events

```
import 'dotenv/config';

import * as nerman from "nerman";
const Nouns = new nerman.Nouns(process.env.JSON_RPC_API_URL);

async function listenToStandardEvents () {

  Nouns.on("ProposalCreatedWithRequirements", (data : nerman.EventData.ProposalCreatedWithRequirements) => {

    data.description = data.description.substring(0,150);
    console.log("NounsDAO | ProposalCreatedWithRequirements | id:" + data.id + ", proposer: " + data.proposer.id +
    ", startBlock: " + data.startBlock + ", endBlock: " + data.endBlock + "quorumVotes " + data.quorumVotes
    + ", proposalThreshold: "+ data.proposalThreshold + ", description: " + data.description);
    
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

  Nouns.on("AuctionExtended", (data : nerman.EventData.AuctionExtended) => {

    console.log("NounsAuctionHouse | AuctionExtended | id:" + data.id + ", endTime:" + data.endTime);
    
  });

  Nouns.on("ApprovalForAll", (data : nerman.EventData.ApprovalForAll) => {

    console.log("NounsToken | ApprovalForAll | owner:" + data.owner.id + ", operator: " + data.operator.id + 
    ", approved: " + data.approved );
    
  });

  Nouns.on("VoteCast", (vote : nerman.EventData.VoteCast) => {

    console.log("NounsDAO | VoteCast | id:" + vote.proposalId + ",  voter: " + vote.voter.id + ", votes: " +
    vote.votes + " , supportDetailed: " + vote.supportDetailed + ", reason: " + vote.reason);

  });

  Nouns.on("ProposalExecuted", (data : nerman.EventData.ProposalExecuted) => {

    console.log("NounsDAO | ProposalExecuted | id:" + data.id );
    
  });

  Nouns.on("AuctionCreated", (auction: nerman.EventData.AuctionCreated) => {

    console.log("NounsAuctionHouse | AuctionCreated " + auction.id + " " + auction.startTime + " " + auction.endTime);
    
  });

  Nouns.on("AuctionBid", (data : nerman.EventData.AuctionBid) => {

    console.log("NounsAuctionHouse | AuctionBid " + data.id + " " + data.bidder.id + " " + data.amount + " " + data.extended);
    
  });

  Nouns.on("AuctionSettled", (data : nerman.EventData.AuctionSettled) => {

    console.log("NounsAuctionHouse | AuctionSettled | id:" + data.id + ", winnerId:" + data.winner.id + ", amount: " + data.amount);
    
  });

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
}

listenToStandardEvents();


```