import { ethers } from "ethers";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account, EventData } from '../types';
import { NounsAuctionHouseABI} from '@nouns/contracts';

export class _NounsForkAuctionHouse {

    private provider : ethers.providers.JsonRpcProvider;
    public Contract :  ethers.Contract; 
    
    constructor(provider: ethers.providers.JsonRpcProvider) {

        this.provider = provider;
        this.Contract = new ethers.Contract( '0xd5c122b40823e467bc6e3c859cb530b105cae22e' , NounsAuctionHouseABI, this.provider );
        
      }

    public async on( eventType: string, listener: Function) {


        switch(eventType) {

            case "AuctionCreated": // FUNCTIONING CORRECTLY
    
                this.Contract.on("AuctionCreated", (nounId: number, startTime: number, endTime: number, event:  ethers.Event) => {
                    
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
    
                this.Contract.on("AuctionBid", (nounId, sender: string, value, extended: boolean, event:  ethers.Event) => {
    
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
                this.Contract.on("AuctionExtended", (nounId: number, endTime: number, event:  ethers.Event) => {
    
                    const data: EventData.AuctionExtended = {
                        id: nounId,
                        endTime: endTime,
                        event: event
                    }
    
                    listener(data);
                
                });
                break;
    
            case "AuctionSettled": // FUNCTIONING CORRECTLY
                this.Contract.on("AuctionSettled", (nounId: number, winner: string, amount: number, event:  ethers.Event) => {
    
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
                this.Contract.on("AuctionTimeBufferUpdated", (timeBuffer: number, event:  ethers.Event) => {
    
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
                this.Contract.on("AuctionReservePriceUpdated", (reservePrice: number, event:  ethers.Event) => {
                    
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
                this.Contract.on("AuctionMinBidIncrementPercentageUpdated", (minBidIncrementPercentage: number, event:  ethers.Event) => {
                    
                    const data: EventData.AuctionMinBidIncrementPercentageUpdated = {
                        minBidIncrementPercentage: minBidIncrementPercentage,
                        event: event
                    }

                    listener(data);
    
                });
                break;

            case "OwnershipTransferred":
                this.Contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Event) => {
                    const data: EventData.OwnershipTransferred = {
                        previousOwner: {id: previousOwner},
                        newOwner: {id: newOwner},
                        event: event
                    }

                    listener(data);
                });
                break;

            case "Paused":
                this.Contract.on("Paused", (address: string, event: ethers.Event) => {
                    const data: EventData.Paused = {
                        address: {id: address},
                        event: event
                    }

                    listener(data);
                });
                break;

            case "Unpaused":
                this.Contract.on("Unpaused", (address: string, event: ethers.Event) => {
                    const data: EventData.Unpaused = {
                        address: {id: address},
                        event: event
                    }

                    listener(data);
                });
                break;

            default:
                throw new Error(`${eventType} is not supported. Please use a different event.`);
          }

    }


    public async getLatestAuctions (){

        const filter = this.Contract.filters.AuctionCreated();
        const auctions = await this.Contract.queryFilter(filter) as Array<ethers.Event>;
        return auctions;

    }

    public async getLatestAuctionExtended (){

        const filter = this.Contract.filters.AuctionExtended();
        const auctionExtendeds = await this.Contract.queryFilter(filter) as Array<ethers.Event>;
        return auctionExtendeds;

    }

    public async getAuctionBids( nounId: number ) {

        const filter = this.Contract.filters.AuctionBid(nounId);
        const bids = await this.Contract.queryFilter(filter) as Array<ethers.Event>;
        return bids;

    }
    
    public name (){
        return "NounsAuctionHouse";
    }

    //todo - cache this data
    public async getAuctionLatestBid (nounId: number){
        const bids = await this.getAuctionBids(nounId);
        const latestBid = bids.pop();
    
        return latestBid;
    }

    
    // Put this in a provider specific file
    public async getBlock (blockNumber : number) {
        const block = await this.provider.getBlock( blockNumber );
        return block;
    }
    
    public async tempFormatAuctionBid (bid: ethers.Event) {
    
      if(bid != undefined && bid.args != undefined){
        const block = await this.getBlock( bid.blockNumber );
        const date = new Date(block.timestamp * 1000);
        const bidPrice = ethers.utils.formatEther( bid.args[2] );
        console.log("Bid on " + bid.args[0].toNumber() + " for " + bidPrice + " on " + date.toLocaleDateString() );
      }

    }

    public async tempPrintAuctionBid (nounId: number) {
        const bid = await this.getAuctionLatestBid(nounId);

        if(bid != undefined && bid.args != undefined){
            this.tempFormatAuctionBid(bid);
        }
    }

    public async getLatestBidData(nounId: number) {
        const bid = await this.getAuctionLatestBid(nounId);
        if(bid != undefined && bid.args != undefined){
            const block = await this.getBlock( bid.blockNumber );
            const ens = await this.provider.lookupAddress(bid.args[1]);
            // ethers.js automatically checks that the forward resolution matches.

            const latestBidData = {
                id: nounId,
                block: bid.blockNumber,
                date: new Date(block.timestamp * 1000),
                amount: ethers.utils.formatEther( bid.args[2] ),
                address: bid.args[1],
                ens: ens
            }

            return latestBidData;

        }

        return null;
    }


    // IF ITS A NOUNDERS NOUNS, OR NO BIDS, NEED TO CHECK WHO IT WAS TRANSFERRED TO



}