import { ethers } from "ethers";
import * as NounsDAO from "./contracts/NounsDAO";
import * as NounsAuctionHouse from "./contracts/NounsAuctionHouse";
import * as NounsToken from "./contracts/NounsToken";
import { NounsDAOABI, NounsAuctionHouseABI, NounsTokenABI} from '@nouns/contracts';


let provider : ethers.providers.JsonRpcProvider,
  NounsAuctionHouseContract : ethers.Contract, 
  NounsDAOContract : ethers.Contract, 
  NounsTokenContract : ethers.Contract;


export const init = async function( apiUrl : string){
  provider = new ethers.providers.JsonRpcProvider(apiUrl);
  provider.pollingInterval = 10000;

  NounsAuctionHouseContract = new ethers.Contract( '0x830BD73E4184ceF73443C15111a1DF14e495C706' , NounsAuctionHouseABI, provider );
  NounsDAOContract = new ethers.Contract( '0x6f3E6272A167e8AcCb32072d08E0957F9c79223d' , NounsDAOABI, provider );
  NounsTokenContract = new ethers.Contract( '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03' , NounsTokenABI, provider );
}

export const on = async function( eventName: string, listener: Function){
  console.log("StateOfNouns.ts on(" + eventName + ") created");

  let contractHandler = getContractEventHandlers(eventName);

  if(contractHandler){
    await contractHandler.handlers.on(eventName, (data: unknown) => { listener(data); }, contractHandler.contract);
  }
}




function getContractEventHandlers(eventName: string) {
  try {
    NounsDAOContract.interface.getEvent(eventName);
    return {
      "contract": NounsDAOContract,
      "handlers": NounsDAO
    };
  } catch (error) {
    //console.error(error);
  }
  
  try {
    NounsAuctionHouseContract.interface.getEvent(eventName);
    return {
      "contract": NounsAuctionHouseContract,
      "handlers": NounsAuctionHouse
    };
  } catch (error) {
    //console.error(error);
  }

  try {
    NounsTokenContract.interface.getEvent(eventName);
    return {
      "contract": NounsTokenContract,
      "handlers": NounsToken
    };
  } catch (error) {
    //console.error(error);
  }

  return null;
}

export const off = async function(eventName: string){
  console.log("StateOfNouns off " + eventName);
}