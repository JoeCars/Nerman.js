import { ethers } from "ethers";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account, EventData } from '../types';

export const on = async function(eventType: string, listener: Function, contract: ethers.Contract){

    switch(eventType) {

        case "AuctionCreated": // FUNCTIONING CORRECTLY

            contract.on("AuctionCreated", (nounId: number, startTime: number, endTime: number, event: Event) => {
                
                const data: EventData.AuctionCreated = {
                    id: nounId,
                    startTime: startTime,
                    endTime: endTime,
                    event: event
                }

                listener(data);
                
            }); 

          break;

        case "AuctionBid": // FUNCTIONING CORRECTLY

            contract.on("AuctionBid", (nounId, sender: string, value, extended: boolean, event: Event) => {

                const data: EventData.AuctionBid = {
                    id: nounId,
                    amount: value,
                    bidder: { id: sender } as Account,
                    extended: extended,
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
        case "AuctionExtended":
            contract.on("AuctionExtended", (nounId: number, endTime: number, event: Event) => {

                const data: EventData.AuctionExtended = {
                    id: nounId,
                    endTime: endTime,
                    event: event
                }

                listener(data);
            
            });
            break;

        case "AuctionSettled": // FUNCTIONING CORRECTLY
            contract.on("AuctionSettled", (nounId: number, winner: string, amount: number, event: Event) => {

                const data: EventData.AuctionSettled = {
                    id: nounId,
                    winner: { id: winner } as Account,
                    amount: amount,
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
        case "AuctionTimeBufferUpdated":
            contract.on("AuctionTimeBufferUpdated", (timeBuffer: number, event: Event) => {

                const data: EventData.AuctionTimeBufferUpdated = {
                    timeBuffer: timeBuffer, 
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
        case "AuctionReservePriceUpdated":
            contract.on("AuctionReservePriceUpdated", (reservePrice: number, event: Event) => {
                
                const data: EventData.AuctionReservePriceUpdated = {
                    reservePrice: reservePrice,
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
        case "AuctionMinBidIncrementPercentageUpdated":
            contract.on("AuctionMinBidIncrementPercentageUpdated", (minBidIncrementPercentage: number, event: Event) => {
                
                const data: EventData.AuctionMinBidIncrementPercentageUpdated = {
                    minBidIncrementPercentage: minBidIncrementPercentage,
                    event: event
                }

            });
            break;

      }

}
