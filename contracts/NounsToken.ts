import { ethers } from "ethers";
import { NounsTokenABI } from '@nouns/contracts';
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, Account, EventData_DelegateVotesChanged, EventData_Transfer, EventData_DelegateChanged } from '../types';

const provider = new ethers.providers.StaticJsonRpcProvider(process.env.JSON_RPC_API_URL);
provider.pollingInterval = 10000;
// @todo move provider to StateOfNouns.ts, pass as arg when initializing


const NounsTokenContract = {
    address:'0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
    abi: NounsTokenABI,
    provider: provider
}

const NounsToken = new ethers.Contract( NounsTokenContract.address , NounsTokenContract.abi, NounsTokenContract.provider );



export const on = async function(eventType: string, listener: Function){

    switch(eventType) {

        // "Approval","ApprovalForAll", "DescriptorLocked","DescriptorUpdated","MinterLocked","MinterUpdated","NounBurned", "NoundersDAOUpdated","OwnershipTransferred", "SeederUpdated"

        case "DelegateChanged":

            NounsToken.on("DelegateChanged", (delegator: string, fromDelegate: string, toDelegate: string) => {

                const delegatorAccount : Account = {
                    id: delegator
                }

                const fromDelegateAccount : Account = {
                    id: fromDelegate
                }

                const toDelegateAccount : Account = {
                    id: toDelegate
                }

                const data: EventData_DelegateChanged = {
                    delegator: delegatorAccount,
                    fromDelegate: fromDelegateAccount,
                    toDelegate: toDelegateAccount
                };

                listener(data);
                
            }); 

          break;

        case "DelegateVotesChanged" :

            NounsToken.on("DelegateVotesChanged", (delegate: string, previousBalance: number, newBalance: number) => {

                const delegatorAccount : Account = {
                    id: delegate
                }

                const data: EventData_DelegateVotesChanged = {
                    delegate: delegatorAccount,
                    previousBalance: previousBalance,
                    newBalance: newBalance
                };

                listener(data);
                
            }); 

          break;
        case "NounCreated" :

          break;
        case "Transfer" :

 
            NounsToken.on("Transfer", (from: string, to: string, tokenId: number) => {

                const fromAccount : Account = {
                    id: from
                }
                const toAccount : Account = {
                    id: to
                }

                const data: EventData_Transfer = {
                    from: fromAccount,
                    to: toAccount,
                    tokenId: tokenId
                }

                listener(data);
                
            });        
          break;

        default:
          // code block
      }

      return("Am I Here?");

}

export const balanceOf = async function(address: Account){


}
    //   "checkpoints",
    //   "dataURI",
    //   "delegates",
    //   "checkpoints",

// export const callFunction = async function(name: string, stateMutability: string){

//     // check if function is valid and read only in ABI
//     // check if 

// }

      // READ ONLY
    //   "DELEGATION_TYPEHASH",
    //   "DOMAIN_TYPEHASH",
    //   "balanceOf",
    //   "checkpoints",
    //   "contractURI",
    //   "dataURI",
    //   "decimals",
    //   "delegates",
    //   "descriptor",
    //   "getApproved",
    //   "getCurrentVotes",
    //   "getPriorVotes",
    //   "isApprovedForAll",
    //   "isDescriptorLocked",
    //   "isMinterLocked",
    //   "isSeederLocked",
    //   "minter",
    //   "name",
    //   "nonces",
    //   "noundersDAO",
    //   "numCheckpoints",
    //   "owner",
    //   "ownerOf",
    //   "proxyRegistry",
    //   "seeder",
    //   "seeds",
    //   "supportsInterface",
    //   "symbol",
    //   "tokenByIndex",
    //   "tokenOfOwnerByIndex",
    //   "tokenURI",
    //   ,