import { ethers } from "ethers";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account, EventData_AuctionCreated, EventData_AuctionBid} from '../types';


export const on = async function(eventType: string, listener: Function, contract: ethers.Contract){

    switch(eventType) {
        case "AuctionCreated":

            contract.on("AuctionCreated", (nounId: number, startTime: number, endTime: number) => {

                const data: EventData_AuctionCreated = {
                    id: nounId,
                    startTime: startTime,
                    endTime: endTime
                }

                listener(data);
                
            }); 

          break;
        case "AuctionBid":

            contract.on("AuctionBid", (nounId, sender: string, value, extended) => {
               
                const account: Account = {
                    id: sender,
                }

                const data: EventData_AuctionBid = {
                    id: nounId,
                    amount: value,
                    bidder: account,
                    extended: extended
                }

                listener(data);
            });

            break;
            
        case "AuctionExtended":
            contract.on("AuctionExtended", (nounId, endTime) => {
    
                console.log("AuctionExtended " + nounId + " " + endTime);
            
            });
            break;
        case "AuctionSettled":
            contract.on("AuctionSettled", (nounId, winner, amount) => {
    
                console.log("AuctionSettled: " + nounId + " " + winner + " " + amount);
            
            });
            break;
        case "AuctionTimeBufferUpdated":
            contract.on("AuctionTimeBufferUpdated", (timeBuffer) => {
    
            });
            break;
        case "AuctionReservePriceUpdated":
            contract.on("AuctionReservePriceUpdated", (reservePrice) => {
    
            });
            break;
        case "AuctionMinBidIncrementPercentageUpdated":
            contract.on("AuctionMinBidIncrementPercentageUpdated", (minBidIncrementPercentage) => {
    
            });
            break;
        default:
          // code block
      }

      return("Am I Here?");

}
