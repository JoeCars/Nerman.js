export const STATUS_PENDING = 'PENDING';
export const STATUS_CANCELLED = 'CANCELLED';
export const STATUS_VETOED = 'VETOED';
export const STATUS_EXECUTED = 'EXECUTED';
export const STATUS_QUEUED = 'QUEUED';
export const STATUS_ACTIVE = 'ACTIVE';


export const sloppyABI = {
  "NounsDAO" : {
    events: [
      "ProposalCreated", 
      "ProposalCreatedWithRequirements", 
      "VoteCast", 
      "ProposalCanceled", 
      "ProposalQueued", 
      "ProposalExecuted", 
      "ProposalVetoed", 
      "VotingDelaySet", 
      "VotingPeriodSet", 
      "NewImplementation", 
      "ProposalThresholdBPSSet", 
      "QuorumVotesBPSSet", 
      "NewPendingAdmin", 
      "NewAdmin", 
      "NewVetoer"
    ],
    functions : [
      // READ ONLY
      "DELEGATION_TYPEHASH",
      "DOMAIN_TYPEHASH",
      "balanceOf",
      "checkpoints",
      "contractURI",
      "dataURI",
      "decimals",
      "delegates",
      "descriptor",
      "getApproved",
      "getCurrentVotes",
      "getPriorVotes",
      "isApprovedForAll",
      "isDescriptorLocked",
      "isMinterLocked",
      "isSeederLocked",
      "minter",
      "name",
      "nonces",
      "noundersDAO",
      "numCheckpoints",
      "owner",
      "ownerOf",
      "proxyRegistry",
      "seeder",
      "seeds",
      "supportsInterface",
      "symbol",
      "tokenByIndex",
      "tokenOfOwnerByIndex",
      "tokenURI",
      "totalSupply",
      "votesToDelegate",

      
      // WRITE
      "approve",
      "burn",
      "delegate",
      "delegateBySig",
      "lockDescriptor",
      "lockMinter",
      "lockSeeder",
      "mint",
      "renounceOwnership",
      "safeTransferFrom",
      "safeTransferFrom",
      "setApprovalForAll",
      "setContractURIHash",
      "setDescriptor",
      "setMinter",
      "setNoundersDAO",
      "setSeeder",
      "transferFrom",
      "transferOwnership"
    ]
  },
  "NounsAuctionHouse" : {
    events: [
      "AuctionCreated",
      "AuctionBid", 
      "AuctionExtended", 
      "AuctionSettled",
      "AuctionTimeBufferUpdated",
      "AuctionReservePriceUpdated",
      "AuctionMinBidIncrementPercentageUpdated"
    ], functions: [

    ]
  },
}