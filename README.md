# README 

## Import into ES6 TypeScript project

    import 'dotenv/config';
    
    import * as StateOfNouns from "stateofnouns"; // load latest public npm version

    if(typeof(process.env.JSON_RPC_API_URL) === "string"){
        StateOfNouns.init(process.env.JSON_RPC_API_URL);
    }

    import { EventData } from './lib/StateOfNouns/src/types';

    StateOfNouns.on("VoteCast", (vote : EventData.VoteCast) => {

    console.log("NounsDAO | VoteCast | id:" + vote.proposalId + ",  voter: " + vote.voter.id + ", votes: " +
    vote.votes + " , supportDetailed: " + vote.supportDetailed + ", reason: " + vote.reason);

    });



## Import into CommonJS Project

    require('dotenv').config();

    const _StateOfNouns = import('stateofnouns');

    async function runApp() {



## Event Object Sample

Event : 
{
  blockNumber: 9357083,
  blockHash: '0x0d26e13567a123e9380f6de29b1face1a995dee90c77c5d6f4321bc7ecfbbba8',
  transactionIndex: 8,
  removed: false,
  address: '0x8fa9C961D02b05Bcf05B43061e05f90794155A63',
  data: '0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000084c6f67732e6a706700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000247b20227479706522203a20226a706722202c202273697a6522203a20756e6b6e6f776e7d00000000000000000000000000000000000000000000000000000000',
  topics: [
    '0xf2b82d966b4a2fc73b533ba2c1b6d85cc9a6345a7e05c93cf169696ff13149eb',
    '0xf29af4ebe4da02879e6c889417a09fe087a654ffeb3aa350128d0dd1729a9e6e'
  ],
  transactionHash: '0xe0d00c28973bebb2d9208fe2eed4dd6c5a69971f59a7b5263386e9af4491ceb0',
  logIndex: 3,
  removeListener: [Function],
  getBlock: [Function],
  getTransaction: [Function],
  getTransactionReceipt: [Function],
  event: 'metadata',
  eventSignature: 'metadata(bytes32,string,string)',
  decode: [Function],
  args: [
    '0xf29af4ebe4da02879e6c889417a09fe087a654ffeb3aa350128d0dd1729a9e6e',
    'Logs.jpg',
    '{ "type" : "jpg" , "size" : unknown}',
    fileHash: '0xf29af4ebe4da02879e6c889417a09fe087a654ffeb3aa350128d0dd1729a9e6e',
    name: 'Logs.jpg',
    meta: '{ "type" : "jpg" , "size" : unknown}'
  ]
}