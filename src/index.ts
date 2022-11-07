import { ethers } from "ethers";
import * as NounsDAO from "./contracts/NounsDAO";

import { _NounsAuctionHouse } from "./contracts/NounsAuctionHouse"; 
import { _NounsToken } from "./contracts/NounsToken"; 
import { _NounsDAO } from "./contracts/NounsDAO"; 

export { EventData } from "./types";

export class Nouns {

  private provider : ethers.providers.JsonRpcProvider;

  public NounsAuctionHouse : _NounsAuctionHouse; // @TODO refactor into NounishContract?
  public NounsToken : _NounsToken;
  public NounsDAO : _NounsDAO;

  constructor(apiUrl: string | undefined) {

    if ( apiUrl === undefined) {
      console.log("need to define process.env.JSON_RPC_API_URL");
      process.exit();
      return;
    }
    this.provider = new ethers.providers.JsonRpcProvider(apiUrl);
    this.provider.pollingInterval = 10000;

    this.NounsAuctionHouse = new _NounsAuctionHouse(this.provider);
    this.NounsToken = new _NounsToken(this.provider);
    this.NounsDAO = new _NounsDAO(this.provider);

  }

  public async on( eventName: string, listener: Function) {
    console.log("StateOfNouns.ts on(" + eventName + ") created");
    let errorCount = 0;

    //@todo use ABI to look up function signatures instead, try-catch feel ugly
    try {
      this.NounsDAO.Contract.interface.getEvent(eventName);
      await this.NounsDAO.on(eventName, (data: unknown) => { listener(data); });
      return;
    } catch (error) {
      //console.error(error);
    }

    try {
      this.NounsAuctionHouse.Contract.interface.getEvent(eventName);
      await this.NounsAuctionHouse.on(eventName, (data: unknown) => { listener(data); });
      return;
    } catch (error) {
      //console.error(error);
    }

    try {
      this.NounsToken.Contract.interface.getEvent(eventName);
      await this.NounsToken.on(eventName, (data: unknown) => { listener(data); });
      return;
    } catch (error) {
      //console.error(error);
    }

    console.log("event name not found: " + eventName);

  }


  public off (eventName: string) {
    console.log("StateOfNouns off " + eventName);
  }


  // @todo functionType is only the following items: view pure payable
  public async call (fType: string, fName: string, fArgs: any[]){

    switch(fType) {
  
      case "view": 
  
        return ( await this.NounsToken.callView(fName, fArgs) );
  
      break;
    }

  }

  public async ensReverseLookup (address: string){
    const ens = await this.provider.lookupAddress(address);
    return ens;
  }



}

  // {
  //   "blockNumber": 13116621,
  //   "blockHash": "0x6897277f125153466684dbd27ac7fb845deb5cfd3d3c09c5fd850c980483c888",
  //   "transactionIndex": 395,
  //   "removed": false,
  //   "address": "0x830BD73E4184ceF73443C15111a1DF14e495C706",
  //   "data": "0x0000000000000000000000004ea324a72848f8a689110e41f891a512ef7bda7b000000000000000000000000000000000000000000000000002386f26fc100000000000000000000000000000000000000000000000000000000000000000000",
  //   "topics": ["0x1159164c56f277e6fc99c11731bd380e0347deb969b75523398734c252706ea3", "0x0000000000000000000000000000000000000000000000000000000000000017"],
  //   "transactionHash": "0x9da291f2b183cfd7e53fcd324a1e468449b8dcdd74c68731c952e471c12a771c",
  //   "logIndex": 584,
  //   "event": "AuctionBid",
  //   "eventSignature": "AuctionBid(uint256,address,uint256,bool)",
  //   "args": [{
  //     "type": "BigNumber",
  //     "hex": "0x17"
  //   }, "0x4ea324A72848F8A689110E41f891A512eF7BDA7b", {
  //     "type": "BigNumber",
  //     "hex": "0x2386f26fc10000"
  //   }, false]
  // }

  