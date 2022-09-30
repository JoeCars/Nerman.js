# README 

## Import into ES6 TypeScript project

    import 'dotenv/config';
    
    import * as StateOfNouns from "stateofnouns"; // load latest public npm version

    if(typeof(process.env.JSON_RPC_API_URL) === "string"){
        StateOfNouns.init(process.env.JSON_RPC_API_URL);
    }

    import { EventData } from './lib/StateOfNouns/src/types';

    StateOfNouns.on("VoteCast", (vote : EventData.VoteCast) => {

    console.log(JSON.stringify(vote));
    console.log("NounsDAO | VoteCast | id:" + vote.proposalId + ",  voter: " + vote.voter.id + ", votes: " +
    vote.votes + " , supportDetailed: " + vote.supportDetailed + ", reason: " + vote.reason);

    });



## Import into CommonJS Project

    require('dotenv').config();

    const _StateOfNouns = import('stateofnouns');

    async function runApp() {