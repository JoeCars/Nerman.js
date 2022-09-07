import { ethers } from "ethers";
import { NounsAuctionHouseABI } from '@nouns/contracts';
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account, EventData_AuctionCreated, EventData_AuctionBid} from '../types';

const provider = new ethers.providers.StaticJsonRpcProvider(process.env.JSON_RPC_API_URL);
provider.pollingInterval = 10000;
// @todo move provider to StateOfNouns.ts, pass as arg when initializing


const NounsAuctionHouseContract = {
    address:'0x830BD73E4184ceF73443C15111a1DF14e495C706',
    abi: NounsAuctionHouseABI,
    provider: provider
}

const NounsAuctionHouse = new ethers.Contract( NounsAuctionHouseContract.address , NounsAuctionHouseContract.abi, NounsAuctionHouseContract.provider );



export const on = async function(eventType: string, listener: Function){

    switch(eventType) {
        case "AuctionCreated":

            NounsAuctionHouse.on("AuctionCreated", (nounId: number, startTime: number, endTime: number) => {

                const data: EventData_AuctionCreated = {
                    id: nounId,
                    startTime: startTime,
                    endTime: endTime
                }

                listener(data);
                
            }); 

          break;
        case "AuctionBid":

            NounsAuctionHouse.on("AuctionBid", (nounId, sender: string, value, extended) => {
               
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
            NounsAuctionHouse.on("AuctionExtended", (nounId, endTime) => {
    
                console.log("AuctionExtended " + nounId + " " + endTime);
            
            });
            break;
        case "AuctionSettled":
            NounsAuctionHouse.on("AuctionSettled", (nounId, winner, amount) => {
    
                console.log("AuctionSettled: " + nounId + " " + winner + " " + amount);
            
            });
            break;
        case "AuctionTimeBufferUpdated":
            NounsAuctionHouse.on("AuctionTimeBufferUpdated", (timeBuffer) => {
    
            });
            break;
        case "AuctionReservePriceUpdated":
            NounsAuctionHouse.on("AuctionReservePriceUpdated", (reservePrice) => {
    
            });
            break;
        case "AuctionMinBidIncrementPercentageUpdated":
            NounsAuctionHouse.on("AuctionMinBidIncrementPercentageUpdated", (minBidIncrementPercentage) => {
    
            });
            break;
        default:
          // code block
      }

      return("Am I Here?");

}
