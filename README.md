# README 

## Import into ES6 TypeScript project

    import 'dotenv/config';

    import * as nerman from "stateofnouns";

    const Nouns = new nerman.Nouns(process.env.JSON_RPC_API_URL);

    Nouns.on("VoteCast", (vote : EventData.VoteCast) => {

      Nouns.on("AuctionBid", (data) => {

        console.log("NounsAuctionHouse | AuctionBid " + data.id + " " + data.bidder.id + " " + data.amount + " " + data.extended);
        
      });

    });



## Import into CommonJS Project

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