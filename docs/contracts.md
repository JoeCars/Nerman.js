# Nouns DAO Project
A set of contracts for running the Nouns DAO.

## Nouns
A wrapper for all Nouns DAO contracts, allowing you to access them from a single place without worrying about which contract has the information you need.

### `constructor()`
- **apiUrl**: `string`. The JSON_RPC_URL needed to establish a connection to the Ethereum network. Typically retrieved through a provider like Alchemy.
- **options**: `object`. An options object to configure the Nouns wrappers. Is optional.
    - **pollingTime**: `number`. The polling time in milliseconds.

```js
const nouns = new Nouns('<JSON_RPC_URL>', { pollingTime: 30000 });
```

### `on()`
Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.

- **eventName**: `string`. The name of the event.
- **listener**: `Function`. The listener function.

```js
nouns.on('NounCreated', (data) => {
    console.log(data.id);
});
```

### `off()`

- **eventName**: `string`. The event name.

```js
nouns.off('NounCreated');
```

### `trigger()`
Triggers an event.

- **eventName**: `string`. The event name.
- **data**: `unknown`. The event data.

```js
nouns.trigger('NounCreated', {
    id: 420,
    seed: {
        background: 0,
        body: 0,
        accessory: 0,
        head: 0,
        glasses: 0
    }
});
```

### Supported Events
- AuctionEnd
- All Nouns Auction House events.
- All Nouns DAO events.
- All Nouns DAO Data events.
- All Nouns Token events.

## Nouns Auction House
A contract that manages Nouns auctions, including bidding.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const nounsAuctionHouse = new NounsAuctionHouse(provider);
```

### `on()`
Registers a listener to the given event, triggering the function with the appropriate event data whenever it triggers in the blockchain. Throws an error if the event is not supported.
- **eventType**: `string`. The event name.
- **listener**: `Function`. The listener function.

```js
nounsAuctionHouse.on('AuctionCreated', (data) => {
	console.log(data.id);
});
```


### `off()`
Removes an event listener.

- **eventName**: `string`. The event listened to.

```js
nounsAuctionHouse.off('AuctionCreated');
```

### `trigger()`
Triggers an event. Throws an error if the listener cannot be found.

- **eventType**: `string`. The name of the event.
- **data**: `unknown`. The event data.

```js
nounsAuctionHouse.trigger('AuctionCreated', {
    id: 420,
    startTime: 1689677183,
    endTime: 1689763583
});
```

### Supported Events
- AuctionCreated
- AuctionBid
- AuctionExtended
- AuctionSettled
- AuctionTimeBufferUpdated
- AuctionReservePriceUpdated
- AuctionMinBidIncrementPercentageUpdated
- OwnershipTransferred
- Paused
- Unpaused

## Nouns DAO
A contract that manages the core Nouns DAO logic, including proposals and voting.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const nounsDAO = new NounsDAO(provider);
```

### `on()`
Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain. Throws an error if the event is not supported. Listening to `ProposalCreatedWithRequirements` assigns the listener to both versions of the event.

- **eventType**: `string`. The name of the event.
- **listener**: `Function`. The listener function.

```js
nounsDAO.on('VoteCast', (data) => {
    console.log(data.proposalId);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The event listened to.

```js
nounsDAO.off('VoteCast');
```

### `trigger()`
Triggers an event. Throws an error if no listener is found.

- **eventType**: `string`. The name of the event.
- **data**: `unknown`. The event data.

```js
nounsDAO.trigger('VoteCast', {
    voter: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
    proposalId: 117,
    supportDetailed: 0,
    votes: 24,
    reason: "Really good reason."
});
```

### Supported Events
- DAOWithdrawNounsFromEscrow
- ERC20TokensToIncludeInForkSet
- EscrowedToFork
- ExecuteFork
- ForkDAODeployerSet
- ForkPeriodSet
- ForkThresholdSet
- JoinFork
- LastMinuteWindowSet
- MaxQuorumVotesBPSSet
- MinQuorumVotesBPSSet
- NewAdmin
- NewImplementation
- NewPendingAdmin
- NewPendingVetoer
- NewVetoer
- ObjectionPeriodDurationSet
- ProposalCanceled
- ProposalCreated
- ProposalCreatedOnTimelockV1
- ProposalCreatedWithRequirements
- ProposalDescriptionUpdated
- ProposalExecuted
- ProposalObjectionPeriodSet
- ProposalQueued
- ProposalThresholdBPSSet
- ProposalTransactionsUpdated
- ProposalUpdatablePeriodSet
- ProposalUpdated
- ProposalVetoed
- QuorumCoefficientSet
- QuorumVotesBPSSet
- RefundableVote
- SignatureCancelled
- TimelocksAndAdminSet
- VoteCast
- VoteSnapshotBlockSwitchProposalIdSet
- VotingDelaySet
- VotingPeriodSet
- Withdraw
- WithdrawFromForkEscrow

## Nouns DAO Data
A contract that manages feedback and proposal candidates in the Nouns DAO.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const nounsDAOData = new NounsDAOData(provider);
```

### `on()`
Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain. Throws an error if the event is not supported.

- **eventType**: `string`. The name of the event.
- **listener**: `Function`. The listener function.

```js
nounsDAOData.on('CandidateFeedbackSent', (data) => {
    console.log(data.slug);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The event listened to.

```js
nounsDAOData.off('CandidateFeedbackSent');
```

### `trigger()`
Triggers an event. Throws an error if there is no assigned listener.

- **eventType**: `string`. The event name.
- **data**: `unknown`. The event data.

```js
nounsDAOData.trigger('CandidateFeedbackSent', {
    msgSender: {id: '0x281eC184E704CE57570614C33B3477Ec7Ff07243'},
    proposer: {id: '0x281eC184E704CE57570614C33B3477Ec7Ff07243'},
    slug: 'candidate-title',
    support: 0,
    reason: ''
});
```

### Supported Events
- AdminChanged
- BeaconUpgraded
- CandidateFeedbackSent
- CreateCandidateCostSet
- ETHWithdrawn
- FeeRecipientSet
- FeedbackSent
- OwnershipTransferred
- ProposalCandidateCanceled
- ProposalCandidateCreated
- ProposalCandidateUpdated
- SignatureAdded
- UpdateCandidateCostSet
- Upgraded

## Nouns Token
A contract that manages Nouns tokens, including transfers and delegations.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const nounsToken = new NounsToken(provider);
```

### `on()`
Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain. Throws an error if the event is not supported.

- **eventType**: `string`. The name of the event.
- **listener**: `Function`. The listener function.

```js
nounsToken.on('NounCreated', (data) => {
    console.log(data.id);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The event name.

```js
nounsToken.off('NounCreated');
```

### `trigger()`
Triggers an event. Throws an error if there is no assigned listener.

- **eventType**: `string`. The event name.
- **data**: `unknown`. The event data.

```js
nounsToken.trigger('NounCreated', {
    id: 420,
    seed: {
        background: 0,
        body: 0,
        accessory: 0,
        head: 0,
        glasses: 0
    }
});
```

### Supported Events
- DelegateChanged
- DelegateVotesChanged
- Transfer
- Approval
- ApprovalForAll
- NounCreated
- DescriptorLocked
- DescriptorUpdated
- MinterLocked
- MinterUpdated
- NounBurned
- NoundersDAOUpdated
- OwnershipTransferred
- SeederLocked
- SeederUpdated

# Nouns Fork DAO Project
A set of contracts that manage Nouns DAO forks.

## Nouns Fork
The core Nouns DAO fork logic, handling proposal and withdrawal logic.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const nounsFork = new NounsFork(provider);
```

### `on()`
Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain. Throws an error if the event is not supported.

- **eventType**: `string`. The name of the event.
- **listener**: `Function`. The listener function.

```js
nounsFork.on('VoteCast', (data) => {
    console.log(data.proposalId);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The name of the event.

```js
nounsFork.off('VoteCast');
```

### `trigger()`
Triggers the listener of the given event with the given data. Throws an error if there is no assigned listener.

- **eventType**: `string`. The event to be triggered.
- **data**: `unknown`. The data being passed to the listener.

```js
nounsFork.trigger('VoteCast', {
    voter: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
    proposalId: 117,
    supportDetailed: 0,
    votes: 24,
    reason: "Really good reason.",
});
```

### Supported Events
- NewAdmin
- NewImplementation
- NewPendingAdmin
- ProposalCanceled
- ProposalCreated
- ProposalCreatedWithRequirements
- ProposalExecuted
- ProposalQueued
- ProposalThresholdBPSSet
- Quit
- QuorumVotesBPSSet
- VoteCast
- VotingDelaySet
- VotingPeriodSet

## Nouns Fork Auction House
The Nouns DAO fork's auction contract, which manages daily auctions and bidding.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const nounsForkAuctionHouse = new NounsForkAuctionHouse(provider);
```

### `on()`
Registers a listener to the given event, triggering the function with the appropriate event data whenever it triggers in the blockchain. Throws an error if the event is not supported.

- **eventType**: `string`. The event name.
- **listener**: `Function`. The listener function.

```js
nounsForkAuctionHouse.on('AuctionCreated', (data) => {
    console.log(data.id);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The event name.

```js
nounsForkAuctionHouse.off('AuctionCreated');
```

### `trigger()`
Triggers the listener of the given event with the given data. Throws an error if the event is not supported.

- **eventType**: `string`. The event to be triggered.
- **data**: `data`. The data being passed to the listener.

```js
nounsForkAuctionHouse.trigger('AuctionCreated', {
    id: 420,
    startTime: 1689677183,
    endTime: 1689763583,
});
```

### Supported Events
- AuctionCreated
- AuctionBid
- AuctionExtended
- AuctionSettled
- AuctionTimeBufferUpdated
- AuctionReservePriceUpdated
- AuctionMinBidIncrementPercentageUpdated
- OwnershipTransferred
- Paused
- Unpaused

## Nouns Fork Token
The Nouns DAO fork's token contract, which manages transfers and delegation.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const nounsForkToken = new NounsForkToken(provider);
```

### `on()`
Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain. Throws an error if the event is not supported.

- **eventType**: `string`. The name of the event.
- **listener**: `Function`. The listener function.

```js
nounsForkToken.on('NounCreated', (data) => {
    console.log(data.id);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The event name.

```js
nounsForkToken.off('NounCreated');
```

### `trigger()`
Triggers the listener of the given event with the given data. Throws an error if there is no listener assigned.

- **eventType**: `string`. The event to be triggered.
- **data**: `unknown`. The data being passed to the listener.

```js
nounsForkToken.trigger('NounCreated', {
    id: 420,
    seed: {
        background: 0,
        body: 0,
        accessory: 0,
        head: 0,
        glasses: 0
    }
});
```

### Supported Events
- DelegateChanged
- DelegateVotesChanged
- Transfer
- Approval
- ApprovalForAll
- NounCreated
- DescriptorLocked
- DescriptorUpdated
- MinterLocked
- MinterUpdated
- NounBurned
- NoundersDAOUpdated
- OwnershipTransferred
- SeederLocked
- SeederUpdated

# Federation Gov Pool Project
Federation contracts for auctioning off votes. The Federation Gov Pool accepts token delegations and auctions the voting power off to the highest bidder for each Nouns DAO proposal.

## Federation Nouns Pool
A contract that manages the bidding and voting for each Nouns DAO proposal.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const federationNounsPool = new FederationNounsPool(provider);
```

### `on()`
Assigns a listener to the federation event. Adds the listener to both V1 and V2 contracts. Throws an error if the event is not supported.

- **event**: `string`. The event listened to.
- **listener**: `Function`. A listener function that takes in the appropriate data type for the event.

```js
federationNounsPool.on('BidPlaced', (data) => {
    console.log(data.propId);
});
```

### `off()`
Removes the listener of the given event. Does nothing if the event was not listened to in the first place.

- **event**: `string`. The event being removed.

```js
federationNounsPool.off('BidPlaced');
```

### `trigger()`
Triggers an event with the given data, which calls the assigned listener. Throws an error if the listener could not be found.

- **event**: `string`. The event being triggered.
- **data**: `unknown`. The data used to trigger the given event.

```js
federationNounsPool.trigger('BidPlaced', {
    dao: "0x6f3E6272A167e8AcCb32072d08E0957F9c79223d",
    propId: 346,
    support: 1,
    amount: 42000000000000001,
    bidder: "0x2B0E9aA394209fa8D783C9e8cbFb08A15C019cdF",
    reason: ""
});
```

### Supported Events
- BidPlaced
- VoteCast

# LilNouns DAO Project
A set of contracts for the LilNouns DAO.

## LilNouns
A wrapper contract for all LilNouns contracts, so you can access them without worrying about the exact contract.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const lilNouns = new LilNouns(provider);
```

### `on()`
Adds a listener to the event. The listener is triggered whenever the event occurs onchain, and event data is passed to the function. Throws an error if the event is not supported.

- **eventName**: `string`. The event.
- **listener**: `Function`. The listener function.

```js
lilNouns.on('VoteCast', (data) => {
    console.log(data.proposalId);
});
```

### `off()`
Removes any assigned listeners from the event. Does nothing if there was no listener.

- **eventName**: `string`. The event whose listener you are removing.

```js
lilNouns.off('ProposalExecuted');
```

### `trigger()`
Triggers the event's listener with the data. Throws an error if there is no listener already assigned.

- **eventName**: `string`. The name of the event you are triggering.
- **data**: `unknown`. The data passed to the listener.

```js
lilNouns.trigger('ProposalExecuted', {id: 420});
```

### Supported Events
- All LilNouns Auction House events.
- All LilNouns DAO Logic events.
- All LilNouns Token events.


## LilNouns Auction House
The LilNouns auction contract, which manages auctioning of LilNouns and handles bidding.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const lilNounsAuctionHouse = new LilNounsAuctionHouse(provider);
```

### `on()`
Assigns a listener to the event, which triggers whenever the event happens onchain. Throws an error if the event is not supported.

- **eventType**: `string`. The event name.
- **listener**: `Function`. The listener function.

```js
lilNounsAuctionHouse.on('AuctionCreated', (data) => {
    console.log(data.id);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The event listened to.

```js
lilNounsAuctionHouse.off('AuctionCreated');
```

### `trigger()`
Triggers an event. Throws an error if the listener cannot be found.

- **eventType**: `string`. The name of the event.
- **data**: `unknown`. The event data.

```js
lilNounsAuctionHouse.trigger('AuctionCreated', {
    id: 420,
    startTime: 1689677183,
    endTime: 1689763583
});
```

### Supported Events
- AuctionCreated
- AuctionBid
- AuctionExtended
- AuctionSettled
- AuctionTimeBufferUpdated
- AuctionReservePriceUpdated
- AuctionMinBidIncrementPercentageUpdated
- OwnershipTransferred
- Paused
- Unpaused

## LilNouns DAO Logic
The core LilNouns logic contract, which handles proposals and voting.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const lilNounsDAOLogic = new LilNounsDAOLogic(provider);
```

### `on()`
Assigns a listener to the event, which triggers whenever the event happens onchain. Throws an error if the event is not supported.

- **eventType**: `string`. The event name.
- **listener**: `Function`. The listener function.

```js
lilNounsDAOLogic.on('VoteCast', (data) => {
    console.log(data.proposalId);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The event listened to.

```js
lilNounsDAOLogic.off('VoteCast');
```

### `trigger()`
Triggers an event. Throws an error if the listener cannot be found.

- **eventType**: `string`. The name of the event.
- **data**: `unknown`. The event data.

```js
lilNounsDAOLogic.trigger('VoteCast', {
    voter: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
    proposalId: 117,
    supportDetailed: 0,
    votes: 24,
    reason: "Really good reason."
});
```

### Supported Events
- NewAdmin
- NewImplementation
- NewPendingAdmin
- NewVetoer
- ProposalCanceled
- ProposalCreated
- ProposalCreatedWithRequirements
- ProposalExecuted
- ProposalQueued
- ProposalThresholdBPSSet
- ProposalVetoed
- QuorumVotesBPSSet
- VoteCast
- VotingDelaySet
- VotingPeriodSet

## LilNouns Token
The LilNouns token contract for transferring and delegating LilNouns tokens.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const lilNounsToken = new LilNounsToken(provider);
```

### `on()`
Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain. Throws an error if the event is not supported.

- **eventType**: `string`. The name of the event.
- **listener**: `Function`. The listener function.

```js
lilNounsToken.on('NounCreated', (data) => {
    console.log(data.id);
});
```

### `off()`
Removes an event listener.

- **eventType**: `string`. The event name.

```js
lilNounsToken.off('NounCreated');
```

### `trigger()`
Triggers an event. Throws an error if there is no assigned listener.

- **eventType**: `string`. The event name.
- **data**: `unknown`. The event data.

```js
lilNounsToken.trigger('NounCreated', {
    id: 420,
    seed: {
        background: 0,
        body: 0,
        accessory: 0,
        head: 0,
        glasses: 0
    }
});
```

### Supported Events
- Approval
- ApprovalForAll
- DelegateChanged
- DelegateVotesChanged
- DescriptorLocked
- DescriptorUpdated
- LilNoundersDAOUpdated
- MinterLocked
- MinterUpdated
- NounBurned
- NounCreated
- NounsDAOUpdated
- OwnershipTransferred
- SeederLocked
- SeederUpdated
- Transfer

# NounsNymz Project
NounsNymz is a tool for posting anonymously while using tokens for verification.

## NounsNymz
A wrapper around the NounsNymz API for receiving new posts.

### `constructor()`

```js
const nounsNymz = new NounsNymz();
```

### `on()`
Assigns a listener function for the given event. Throws an error if the event is not supported.

- **eventName**: `string`. The event being listened to.
- **listener**: `Function`. The listener function.

```js
nounsNymz.on('NewPost', (data) => {
    console.log(data.body);
});
```

### `off()`
Removes an event listener.

- **eventName**: `string`. The event listened to.

```js
nounsNymz.off('NewPost');
```

### `trigger()`
Triggers the listener of the given event with the given data. Throws an error if the listener cannot be found.

- **eventName**: `string`. The event to be triggered.
- **data**: `unknown`. The data being passed to the listener.

```js
nounsNymz.trigger('NewPost', {
    id: "0xcbd6b65b7fd297dad4ea88eb789fed57ead1c1e49fa7f6e3dedaa2d10c42edab",
    title: "Do you re-use your nyms here? If not, why not?",
    body: "It's been fun seeing some life here in the past couple weeks! \n\nWe've noticed that most new nyms are randomly generated/single-use. For those posting from single-use nyms: do you see any value in re-using a name you've used in the past? ",
    timestamp: "2023-07-31T17:54:17.000Z",
    userId: "0x141b63d93daf55bfb7f396eee6114f3a5d4a90b2",
    parentId: null
});
```

### Supported Events
- NewPost

# Propdates Project
A project allowing proposal creators to post progress reports of their Nouns DAO proposals.

## Propdates
A contract that handles posting updates.

### `constructor()`
- **provider**: `ethers.providers.JsonRpcProvider`. A connection to the Ethereum network.

```js
const provider = new ethers.providers.JsonRpcProvider('<JSON_RPC_URL>');
const propdates = new Propdates(provider);
```

### `on()`
Assigns a listener function for the given event. Throws an error if the event is not supported.

- **eventName**: `string`. The event being listened to.
- **listener**: `Function`. The listener function.

```js
propdates.on('PostUpdate', (data) => {
    console.log(data.propId);
});
```

### `off()`
Removes a listener.

- **eventName**: `string`. The event listened to.

```js
propdates.off('PostUpdate');
```

### `trigger()`
Triggers the listener of the given event with the given data. Throws an error if the event did not have a listener.

- **eventName**: `string`. The event to be triggered.
- **data**: `unknown`. The data being passed to the listener.

```js
propdates.trigger('PostUpdate', {
    propId: 117,
    isCompleted: true,
    update: "It's done!"
});
```

### Supported Events
- PostUpdate
- PropUpdateAdminTransferStarted
- PropUpdateAdminTransfered