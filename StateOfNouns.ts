import * as NounsDAO from "../contracts/NounsDAO";
import * as NounsAuctionHouse from "../contracts/NounsAuctionHouse";
import { sloppyABI } from "../utils/constants";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account } from './types';

export const on = async function( eventName: string, listener: Function){
  console.log("StateOfNouns.ts on(" + eventName + ") created");

  // TODO - CHANGE data TO A REAL TYPE OF ALL POSSIBLE THANGS
  if(sloppyABI.NounsAuctionHouse.events.includes(eventName)) {

    await NounsAuctionHouse.on(eventName, (data: unknown) => { listener(data); });

  } else if (sloppyABI.NounsDAO.events.includes(eventName)){

    await NounsDAO.on(eventName, (data: unknown) => { listener(data); });
  }
  
}

export const off = async function(eventName: string){
  // add ability to remove individual functions later
  // otherwise, removes all listeners for event
  console.log("StateOfNouns off " + eventName);
}