# General Types

A group of types used in different events.

## `Account`

An Ethereum account.

-   **id**: `string`. The address id.

## `NounsTokenSeed`

Seed object for Nouns tokens.

-   **background**: `number`. 0 to 1. Cool or warm.
-   **body**: `number`. 0 to 29.
-   **accessory**: `number`. 0 to 136.
-   **head**: `number`. 0 to 233.
-   **glasses**: `number`. 0 to 20.

## `VoteDirection`

Vote options and their associated numbers.

-   **AGAINST** = 0
-   **FOR** = 1
-   **ABSTAIN** = 2

## `ProposalStatus`

Possible proposal states.

-   `string`. "ACTIVE", "CANCELLED", "EXECUTED", "PENDING", "QUEUED", or "VETOED".

# Nouns DAO Types

A list of types belonging to various Nouns DAO contract events.

## `DAOWithdrawNounsFromEscrow`

DAOWithdrawNounsFromEscrow event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L191C9-L191C9)

-   **tokenIds**: `number[]`. List of tokens being withdrawn.
-   **to**: `Account`. Address withdrawing the tokens.
-   **event**: `ethers.Event`. Event meta data.

## `ERC20TokensToIncludeInForkSet`

ERC20TokensToIncludeInForkSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L513)

-   **oldErc20Tokens**: `string[]`. Old ERC20 tokens for splitting funds.
-   **newErc20tokens**: `string[]`. New ERC20 tokens for splitting funds.
-   **event**: `ethers.Event`. Event meta data.

## `EscrowedToFork`

EscrowedToFork event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L74)

-   **forkId**: `number`. Fork number.
-   **owner**: `Account`. Token owner who is escrowing to fork.
-   **tokenIds**: `number[]`. List of tokens being escrowed.
-   **proposalIds**: `number[]`. Proposal IDs which are the reason for wanting to fork.
-   **reason**: `string`. Optional reason.
-   **event**: `ethers.Event`. Event meta data.

## `ExecuteFork`

ExecuteFork event data. The fork escrow is closed. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L111)

-   **forkId**: `number`. Fork number.
-   **forkTreasury**: `Account`. New fork treasury address.
-   **forkToken**: `Account`. New fork token address.
-   **forkEndTimestamp**: `number`. The unix timestamp in seconds until which the fork can rejoin the DAO.
-   **tokensInEscrow**: `number`. Tokens in escrow at the moment of the escrow. These are lost from the main treasury.
-   **event**: `ethers.Event`. Event meta data.

## `ForkDAODeployerSet`

ForkDAODeployerSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L500)

-   **oldForkDAODeployer**: `Account`. Old fork DAO deployer contract.
-   **newForkDAODeployer**: `Account`. New fork DAO deployer contract.
-   **event**: `ethers.Event`. Event meta data.

## `ForkPeriodSet`

ForkPeriodSet event data. Sets how much time a fork has to rejoin the DAO after it has been executed. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L533)

-   **oldForkPeriod**: `number`. Old fork period in seconds.
-   **newForkPeriod**: `number`. New fork period in seconds.
-   **event**: `ethers.Event`. Event meta data.

## `ForkThresholdSet`

ForkThresholdSet event data. Sets the threshold of Nouns in escrow needed to execute a fork. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L551)

-   **oldForkThreshold**: `number`. The old token amount needed to successfully fork the DAO. A percentage of the token supply.
-   **newForkThreshold**: `number`. The new token amount needed to successfully fork the DAO. A percentage of the token supply.
-   **event**: `ethers.Event`. Event meta data.

## `JoinFork`

JoinFork event data. Joins contract after the contract has been executed, but before the time to rejoin has ended. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L141)

-   **forkId**: `number`. Fork number.
-   **owner**: `Account`. Token owner who is escrowing to fork.
-   **tokenIds**: `number[]`. List of tokens being escrowed.
-   **proposalIds**: `number[]`. Owner's currently active proposals being transferred to the fork.
-   **reason**: `string`. Optional reason.
-   **event**: `ethers.Event`. Event meta data.

## `LastMinuteWindowSet`

LastMinuteWindowSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L229)

-   **oldLastMinuteWindowInBlocks**: `number`. Old objection period last minute window.
-   **newLastMinuteWindowInBlocks**: `number`. New objection period last minute window.
-   **event**: `ethers.Event`. Event meta data.

## `MaxQuorumVotesBPSSet`

MaxQuorumVotesBPSSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L381)

-   **oldMaxQuorumVotesBPS**: `number`. Old maximum quorum votes BPS.
-   **newMaxQuorumVotesBPS**: `number`. New maximum quorum votes BPS.
-   **event**: `ethers.Event`. Event meta data.

## `MinQuorumVotesBPSSet`

MinQuorumVotesBPSSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L351)

-   **oldMinQuorumVotesBPS**: `number`. Old minimum quorum votes BPS.
-   **newMinQuorumVotesBPS**: `number`. New minimum quorum votes BPS.
-   **event**: `ethers.Event`. Event meta data.

## `NewAdmin`

NewAdmin event data. Transfers admin rights. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L276)

-   **oldAdmin**: `Account`. Old admin address.
-   **newAdmin**: `Account`. New admin address.
-   **event**: `ethers.Event`. Event meta data.

## `NewImplementation`

NewImplementation event data. Updates implementation of the delegator. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOProxyV3.sol#L81)

-   **oldImplementation**: `Account`. Old delegator implementation.
-   **newImplementation**: `Account`. New delegator implementation.
-   **event**: `ethers.Event`. Event meta data.

## `NewPendingAdmin`

NewPendingAdmin event data. Offers the admin position to a new address. The new address must accept it to become an admin. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L261)

-   **oldPendingAdmin**: `Account`. Old pending admin address.
-   **newPendingAdmin**: `Account`. New pending admin address.
-   **event**: `ethers.Event`. Event meta data.

## `NewPendingVetoer`

NewPendingVetoer event data. Offers the vetoer position to a new address. The new address must accept it to become a vetoer. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L301)

-   **oldPendingVetoer**: `Account`. Old pending vetoer.
-   **newPendingVetoer**: `Account`. New pending vetoer.
-   **event**: `ethers.Event`. Event meta data.

## `NewVetoer`

NewVetoer event data. Transfers vetoer rights. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L314)

-   **oldVetoer**: `Account`. Old vetoer.
-   **newVetoer**: `Account`. New vetoer.
-   **event**: `ethers.Event`. Event meta data.

## `ObjectionPeriodDurationSet`

ObjectionPeriodDurationSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L212)

-   **oldObjectionPeriodDurationInBlocks**: `number`. Old objection period in blocks.
-   **newObjectionPeriodDurationInBlocks**: `number`. New objection period in blocks.
-   **event**: `ethers.Event`. Event meta data.

## `ProposalCanceled`

ProposalCanceled event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L571)

- **id**: `number`. id of the proposal being cancelled.
-   **event**: `ethers.Event`. Event meta data.

## `ProposalCreated`
ProposalCreated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L917)

- **id**: `number`. id of the proposal being created.
- **proposer**: `Account`. Account of the proposer.
- **targets**: `string[]`. Target addresses for proposal calls.
- **values**: `BigNumber[]`. Eth values for proposal calls.
- **signatures**: `string[]`. Function signatures for proposal calls.
- **calldatas**: `any[]`. Bytes. Calldatas for proposal calls.
- **startBlock**: `number`. The block voting starts.
- **endBlock**: `number`. The block voting ends.
- **description**: `string`. Proposal description. Typically formatted as:
```md
# Proposal Title \n
Proposal content.
```
- **event**: `ethers.Event`. Event meta data.

## `ProposalCreatedOnTimelockV1`
ProposalCreatedOnTimelockV1 event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L197)

- **id**: `number`. id of the proposal created.
- **event**: `ethers.Event`. Event meta data.

## `ProposalCreatedWithRequirements`
ProposalCreatedWithRequirements event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L917)

- **id**: `number`. id of the proposal created.
- **proposer**: `Account`. Account of the proposer.
- **signers**: `string[]`. List of signers. In V3.
- **targets**: `string[]`. Target addresses for proposal calls.
- **values**: `BigNumber[]`. Eth values for proposal calls.
- **signatures**: `string[]`. Function signatures for proposal calls.
- **calldatas**: `any[]`. Calldatas for proposal calls.
- **startBlock**: `number`. The block voting starts.
- **endBlock**: `number`. The block voting ends.
- **updatePeriodEndBlock**: `number`. Period where the proposal is updatable. In V3.
- **proposalThreshold**: `number`. The proposal threshold. In V1.
- **quorumVotes**: `number`. The quorum votes. In V1. Renamed to minQuorumVotes in V2.
- **description**: `string`. Proposal description.
- **event**: `ethers.Event`. Event meta data.

## `ProposalDescriptionUpdated`
ProposalDescriptionUpdated event data. The proposal description was updated during the updateable period. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L360)

- **id**: `number`. id of the proposal updated.
- **proposer**: `Account`. Account of the proposer.
- **description**: `string`. Updated proposal description.
- **updatedMessage**: `string`. A message explaining the update.
- **event**: `ethers.Event`. Event meta data.

## `ProposalExecuted`
ProposalExecuted event data. Executes a fork that is currently queued. Not possible during forking period. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L495)

- **id**: `number`. id of the proposal executed.
- **event**: `ethers.Event`. Event meta data.

## `ProposalObjectionPeriodSet`
ProposalObjectionPeriodSet event data. A last minute FOR vote that changes the proposal from defeated to succeeded will trigger this event. Extends voting time. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L210)

- **id**: `number`. id of the proposal.
- **objectionPeriodEndBlock**: `number`. Objection end block.
- **event**: `ethers.Event`. Event meta data.

## `ProposalQueued`
ProposalQueued event data. A proposal that was successful during the voting period is queued. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L438)

- **id**: `number`. id of the proposal.
- **eta**: `number`. Block number signifying end of the queued period. The proposal is executed once this is over.
- **event**: `ethers.Event`. Event meta data.

## `ProposalThresholdBPSSet`
ProposalThresholdBPSSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L193)

- **oldProposalThresholdBPS**: `number`. Old proposal threshold basis points.
- **newProposalThresholdBPS**: `number`. New proposal threshold basis points.
- **event**: `ethers.Event`. Event meta data.

## `ProposalTransactionsUpdated`
ProposalTransactionsUpdated event data. Updates list of proposal transactions during the updateable period. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L321)

- **id**: `number`. id of the proposal.
- **proposer**: `Account`. Account of the proposer.
- **targets**: `string[]`. Target addresses for proposal calls.
- **values**: `number[]`. Eth values for proposal calls.
- **signatures**: `string[]`. Function signatures for proposal calls.
- **calldatas**: `any[]`. Calldatas for proposal calls.
- **updateMessage**: `string`. The reason for the update.
- **event**: `ethers.Event`. Event meta data.

## `ProposalUpdatablePeriodSet`
ProposalUpdatablePeriodSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L243)

- **oldProposalUpdatablePeriodInBlocks**: `number`. The old proposal updatable period in blocks.
- **newProposalUpdatablePeriodInBlocks**: `number`. The new proposal updatable period in blocks.
- **event**: `ethers.Event`. Event meta data.

## `ProposalUpdated`
ProposalUpdated event data. Updates both the description and transaction. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L288)

- **id**: `number`. id of the proposal.
- **proposer**: `Account`. Account of the proposer.
- **targets**: `string[]`. Updated target addresses for proposal calls.
- **values**: `number[]`. Updated eth values for proposal calls.
- **signatures**: `string[]`. Updated function signatures for proposal calls.
- **calldatas**: `any[]`. Updated calldatas for proposal calls.
- **description**: `string`. Updated proposal description.
- **updateMessage**: `string`. Message explaining the update.
- **event**: `ethers.Event`. Event meta data.

## `ProposalVetoed`
ProposalVetoed event data. Vetoes a proposal that has not been executed. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L536)

- **id**: `number`. id of the proposal.
- **event**: `ethers.Event`. Event meta data.

## `Quit`
Quit event data. Token holders return their tokens in exchange for eth. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/newdao/governance/NounsDAOLogicV1Fork.sol#L222)

- **msgSender**: `Account`. The account quitting the Nouns DAO.
- **tokenIds**: `number[]`. The tokens returned in exchange for eth.
- **event**: `ethers.Event`. Event meta data.

## `QuorumCoefficientSet`
QuorumCoefficientSet event data. Sets a new fixed point integer with 6 decimals. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L408)

- **oldQuorumCoefficient**: `number`. The old quorum coefficient.
- **newQuorumCoefficient**: `number`. The new quorum coefficient.
- **event**: `ethers.Event`. Event meta data.

## `QuorumVotesBPSSet`
QuorumVotesBPSSet event data. (Old). [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/newdao/governance/NounsDAOLogicV1Fork.sol#L709)

- **oldQuorumVotesBPS**: `number`. The old quorum votes basis points.
- **newQuorumVotesBPS**: `number`. The new quorum votes basis points.
- **event**: `ethers.Event`. Event meta data.

## `RefundableVote`
RefundableVote event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L295)

- **voter**: `Account`. The voter account.
- **refundAmount**: `number`. The refund amount.
- **refundSent**: `boolean`. Whether the refund was sent or not.
- **event**: `ethers.Event`. Event meta data.

## `SignatureCancelled`
SignatureCancelled event data. Invalidates a signature for signing a proposal. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L270)

- **signer**: `Account`. The account cancelling the signature.
- **sig**: `any`. The signature to cancel.
- **event**: `ethers.Event`. Event meta data.

## `TimelocksAndAdminSet`
TimelocksAndAdminSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L566)

- **timelock**: `Account`. The new timelock contract.
- **timelockV1**: `Account`. The new timelockV1 contract.
- **admin**: `Account`. The new admin address.
- **event**: `ethers.Event`. Event meta data.

## `VoteCast`
VoteCast event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L70)

- **voter**: `Account`. The voter account.
- **proposalId**: `number`. The proposal voted on.
- **supportDetailed**: `VoteDirection`. The side they are voting for.
- **votes**: `number`. The number of votes they are using.
- **reason**: `string`. An optional reason explaining their decision.
- **event**: `ethers.Event`. Event meta data.

## `VoteSnapshotBlockSwitchProposalIdSet`
VoteSnapshotBlockSwitchProposalIdSet event data. The proposal id after which the snapshot was taken the day voting started. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L482)

- **oldVoteSnapshotBlockSwitchProposalId**: `number`. 0. This event was only intended to ever be executed once.
- **newVoteSnapshotBlockSwitchProposalId**: `number`. The proposal id from which the snapshot became the starting day.
- **event**: `ethers.Event`. Event meta data.

## `VotingDelaySet`
VotingDelaySet event data. Voting delay is the time before voting begins, in blocks. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L162)

- **oldVotingDelay**: `number`. The old voting delay in blocks.
- **newVotingDelay**: `number`. The new voting delay in blocks.
- **event**: `ethers.Event`. Event meta data.

## `VotingPeriodSet`
VotingPeriodSet event data. Voting period is how long voting lasts, in blocks. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L177)

- **oldVotingPeriod**: `number`. The old voting period in blocks.
- **newVotingPeriod**: `number`. The new voting period in blocks.
- **event**: `ethers.Event`. Event meta data.

## `Withdraw`
Withdraw event data. Withdraws all the eth in the contract. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L468)

- **amount**: `number`. The amount withdrawn.
- **sent**: `boolean`. Whether the withdrawn amount was sent.
- **event**: `ethers.Event`. Event meta data.

## `WithdrawFromForkEscrow`
WithdrawFromForkEscrow event data. Withdraws nouns from the escrow if the fork has not been executed yet. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L95)

- **forkId**: `number`. The fork escrow withdrawing from.
- **owner**: `Account`. The account withdrawing.
- **tokenIds**: `number[]`. The tokens withdrawing.
- **event**: `ethers.Event`. Event meta data.

## `AuctionComplete`
AuctionComplete event data. Custom type.

- **id**: `number`. Noun token id.
- **endTime**: `number`. The auction end time.

## `AuctionBid`
AuctionBid event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L104)

- **id**: `number`. Noun token id.
- **amount**: `number`. The bid amount in wei.
- **bidder**: `Account`. Bidder account.
- **extended**: `boolean`. Whether the bid was received within the end time buffer, thus extending the auction.
- **event**: `ethers.Event`. Event meta data.

## `AuctionCreated`
AuctionCreated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L197)

- **id**: `number`. Noun token id.
- **startTime**: `number`. Auction starting time as seconds since unix epoch.
- **endTime**: `number`. Auction ending time as seconds since unix epoch.
- **event**: `ethers.Event`. Event meta data.

## `AuctionExtended`
AuctionExtended event data. Happens whenever a bid comes in within the end buffer of the auction. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L104)

- **id**: `number`. Noun token id.
- **endTime**: `number`. New auction end time as seconds since unix epoch.
- **event**: `ethers.Event`. Event meta data.

## `AuctionSettled`
AuctionSettled event data. Triggers when the next auction begins. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L221)

- **id**: `number`. Noun token id.
- **winner**: `Account`. The winning bidder's account.
- **amount**: `number`. Winning bid amount in wei.
- **event**: `ethers.Event`. Event meta data.

## `AuctionTimeBufferUpdated`
AuctionTimeBufferUpdated event data. The time buffer that extends an auction. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L165)

- **timeBuffer**: `number`. New time buffer.
- **event**: `ethers.Event`. Event meta data.

## `AuctionReservePriceUpdated`
AuctionReservePriceUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L175)

- **reservePrice**: `number`. New auction reserve price.
- **event**: `ethers.Event`. Event meta data.

## `AuctionMinBidIncrementPercentageUpdated`
AuctionMinBidIncrementPercentageUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L185)

- **minBidIncrementPercentage**: `number`. New auction minimum bid increment percentage.
- **event**: `ethers.Event`. Event meta data.

## `OwnershipTransferred`
OwnershipTransferred event data. In ABI but not in contract.

- **previousOwner**: `Account`. Previous owner.
- **newOwner**: `Account`. New owner.
- **event**: `ethers.Event`. Event meta data.

## `Paused`
Paused event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L144)

- **address**: `Account`. Address paused.
- **event**: `ethers.Event`. Event meta data.

## `Unpaused`
Unpaused event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L153)

- **address**: `Account`. Address unpaused.
- **event**: `ethers.Event`. Event meta data.

## `DelegateChanged`
DelegateChanged event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721Checkpointable.sol#L197)

- **delegator**: `Account`. Token owner account.
- **fromDelegate**: `Account`. Old delegate account.
- **toDelegate**: `Account`. New delegate account.
- **event**: `ethers.Event`. Event meta data.

## `DelegateVotesChanged`
DelegateVotesChanged event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721Checkpointable.sol#L232)

- **delegate**: `Account`. Delegate account.
- **previousBalance**: `number`. Previous voting power.
- **newBalance**: `number`. New voting power.
- **event**: `ethers.Event`. Event meta data.

## `Transfer`
Transfer event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L373)

- **from**: `Account`. Old token owner.
- **to**: `Account`. New token owner.
- **tokenId**: `number`. Nouns token id.
- **event**: `ethers.Event`. Event meta data.

## `Approval`
Approval event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L398)

- **owner**: `Account`. Owner of the token.
- **approved**: `Account`. The person given permission to operate on the token.
- **tokenId**: `number`. Nouns token id.
- **event**: `ethers.Event`. Event meta data.

## `ApprovalForAll`
ApprovalForAll event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L165)

- **owner**: `Account`. The token owner.
- **operator**: `Account`. The person given permission to operate on the token.
- **approved**: `boolean`. Whether the operator has permission for the token.
- **event**: `ethers.Event`. Event meta data.

## `DescriptorLocked`
DescriptorLocked event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L226)

- **event**: `ethers.Event`. Event meta data.

## `DescriptorUpdated`
DescriptorUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L216)

- **descriptor**: `Account`. New token URI descriptor.
- **event**: `ethers.Event`. Event meta data.

## `MinterLocked`
MinterLocked event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L206)

- **event**: `ethers.Event`. Event meta data.

## `MinterUpdated`
MinterUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L196)

- **minter**: `Account`. Token minter.
- **event**: `ethers.Event`. Event meta data.

## `NounBurned`
NounBurned event data. Burns a noun. Happens when an auction has no bids. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L159)

- **id**: `number`. Noun token id.
- **event**: `ethers.Event`. Event meta data.

## `NounCreated`
NounCreated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L255)

- **id**: `number`. Noun token id.
- **seed**: `NounsTokenSeed`. Noun token seed.
- **event**: `ethers.Event`. Event meta data.

## `NoundersDAOUpdated`
NoundersDAOUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L186)

- **noundersDAO**: `Account`. Nounders DAO.
- **event**: `ethers.Event`. Event meta data.

## `SeederLocked`
SeederLocked event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L246)

- **event**: `ethers.Event`. Event meta data.

## `SeederUpdated`
SeederUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L236)

- **seeder**: `Account`. Token seeder.
- **event**: `ethers.Event`. Event meta data.

## `AdminChanged`
AdminChanged event data. In ABI but not in contract.

- **previousAdmin**: `Account`. Previous admin.
- **newAdmin**: `Account`. New admin.
- **event**: `ethers.Event`. Event meta data.

## `BeaconUpgraded`
BeaconUpgraded event data. In ABI but not in contract.

- **beacon**: `Account`. Beacon.
- **event**: `ethers.Event`. Event meta data.

## `CandidateFeedbackSent`
CandidateFeedbackSent event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L279)

- **msgSender**: `Account`. Feedbacker account.
- **proposer**: `Account`. Candidate proposal creator account.
- **slug**: `string`. Candidate proposal unique identifier.
- **support**: `number`. Feedback vote. Either FOR, AGAINST, or ABSTAIN.
- **reason**: `string`. Optional reason left by the feedbacker.
- **event**: `ethers.Event`. Event meta data.

## `CreateCandidateCostSet`
CreateCandidateCostSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L297)

- **oldCreateCandidateCost**: `number`. Old cost of creating candidate proposal.
- **newCreateCandidateCost**: `number`. New cost of creating candidate proposal.
- **event**: `ethers.Event`. Event meta data.

## `ETHWithdrawn`
ETHWithdrawn event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L323C9-L323C9)

- **to**: `Account`. Amount recipient.
- **amount**: `number`. Amount of eth withdrawn in wei.
- **event**: `ethers.Event`. Event meta data.

## `FeeRecipientSet`
FeeRecipientSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L311)

- **oldFeeRecipient**: `Account`. Old fee recipient.
- **newFeeRecipient**: `Account`. New fee recipient.
- **event**: `ethers.Event`. Event meta data.

## `FeedbackSent`
FeedbackSent event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L261)

- **msgSender**: `Account`. Feedbacker account.
- **proposalId**: `number`. Proposal receiving feedback.
- **support**: `number`. Feedback vote. Either FOR, AGAINST, or ABSTAIN.
- **reason**: `string`. Optional reason left by the feedbacker.
- **event**: `ethers.Event`. Event meta data.

## `ProposalCandidateCanceled`
ProposalCandidateCanceled event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L204)

- **msgSender**: `Account`. Proposal candidate creator account.
- **slug**: `string`. Proposal candidate unique identifier.
- **event**: `ethers.Event`. Event meta data.

## `ProposalCandidateCreated`
ProposalCandidateCreated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L111)

- **msgSender**: `Account`. Proposal candidate creator account.
- **targets**: `string[]`. Target addresses for proposal calls.
- **values**: `number[]`. Eth values for proposal calls.
- **signatures**: `string[]`. Function signatures for proposal calls.
- **calldatas**: `any[]`. Calldatas for proposal calls.
- **description**: `string`. Proposal candidate's description.
- **slug**: `string`. Proposal candidate unique identifier.
- **proposalIdToUpdate**: `number`. The id of the proposal to update if this is an update to an existing proposal.
- **encodedProposalHash**: `string`. Hash of the proposal that this is an update for.
- **event**: `ethers.Event`. Event meta data.

## `ProposalCandidateUpdated`
ProposalCandidateUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L161)

- **msgSender**: `Account`. Proposal candidate creator account.
- **targets**: `string[]`. Target addresses for proposal calls.
- **values**: `number[]`. Eth values for proposal calls.
- **signatures**: `string[]`. Function signatures for proposal calls.
- **calldatas**: `any[]`. Calldatas for proposal calls.
- **description**: `string`. Proposal candidate's description.
- **slug**: `string`. Proposal candidate unique identifier.
- **proposalIdToUpdate**: `number`. The id of the proposal to update if this is an update to an existing proposal.
- **encodedProposalHash**: `string`. Hash of the proposal that this is an update for.
- **reason**: `string`. Optional reason for explaining the update.
- **event**: `ethers.Event`. Event meta data.

## `SignatureAdded`
SignatureAdded event data. Token holders can sign proposal candidates to convert them into DAO proposals. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L222)

- **signer**: `Account`. Signer account.
- **sig**: `string`. The signature bytes.
- **expirationTimestamp**: `number`. The signature's expiration timestamp. As milliseconds since Unix epoch.
- **proposer**: `Account`. Proposal candidate creator account.
- **slug**: `string`. Proposal candidate unique identifier.
- **proposalIdToUpdate**: `number`. The id of the proposal to update if this is an update to an existing proposal.
- **encodedPropHash**: `string`. Hash of the proposal that this is an update for.
- **sigDigest**: `string`. The abi encoding of the candidate version signed.
- **reason**: `string`. Optional reason for signing proposal candidate.
- **event**: `ethers.Event`. Event meta data.

## `UpdateCandidateCostSet`
UpdateCandidateCostSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L304)

- **oldUpdateCandidateCost**: `number`. Old update cost.
- **newUpdateCandidateCost**: `number`. New update cost.
- **event**: `ethers.Event`. Event meta data.

## `Upgraded`
Upgraded event data. In ABI but not in contract.

- **implementation**: `Account`. Implementation.
- **event**: `ethers.Event`. Event meta data.

# NounsNymz Types
Events from the NounsNymz api.

## `NewPost`
NewPost event data.

- **id**: `string`. Post id.
- **title**: `string`. Post title. Empty if it is a reply.
- **body**: `string`. Post body.
- **timestamp**: `string`. Post UTC timestamp.
- **userId**: `string`. Poster id.
- **parentId**: `string`. Parent post id.
- **depth**: `number`. Number of replies in chain.
- **upvotes**: `Upvote[]`. List of upvotes.
- **root**: `RootPost`. Original post if the new post is a reply.
- **parent**: `ParentPost`. Parent post if the new post is a reply.

# Federation Types
Event types for the Federation GovPool.

## `BidPlaced`
BidPlaced event data. [Github](https://github.com/nounish/federation/blob/6360984278f017f182290facb0dc665c2b7108ad/contracts/src/experimental/delegate-bid.sol#L138)

- **dao**: `string`. The address of the DAO.
- **propId**: `number`. Proposal being bid on.
- **support**: `number`. The bidder's stance on the proposal. FOR, AGAINST, or ABSTAIN.
- **amount**: `number`. The amount bid, in wei.
- **bidder**: `string`. The bidder account address.
- **reason**: `string`. The reason for the bid.

## `VoteCast`
VoteCast event data. [Github](https://github.com/nounish/federation/blob/6360984278f017f182290facb0dc665c2b7108ad/contracts/src/experimental/delegate-bid.sol#L188C1-L188C1)

- **dao**: `string`. The address of the DAO.
- **propId**: `number`. Proposal that Federation is voting on.
- **support**: `number`. The direction of the vote. FOR, AGAINST, or ABSTAIN.
- **amount**: `number`. The winning bid amount, in wei.
- **bidder**: `string`. The winning bidder account address.

# Propdates Types
Event types for Propdates contracts.

## `PostUpdate`
PostUpdate event data.

- **propId**: `number`. Proposal being updated.
- **isCompleted**: `boolean`. Whether the proposal is complete.
- **update**: `string`. Update description.
- **event**: `ethers.Event`. Event meta data.

## `PropUpdateAdminTransferStarted`
PropUpdateAdminTransferStarted event data.

- **propId**: `number`. Proposal.
- **oldAdmin**: `Account`. Old admin.
- **newAdmin**: `Account`. New admin.
- **event**: `ethers.Event`. Event meta data.

## `PropUpdateAdminTransfered`
PropUpdateAdminTransfered event data.

- **propId**: `number`. Proposal.
- **oldAdmin**: `Account`. Old admin.
- **newAdmin**: `Account`. New admin.
- **event**: `ethers.Event`. Event meta data.

# LilNouns Types
Events exclusive to LilNouns contracts.

## `LilNoundersDAOUpdated`
LilNoundersDAOUpdated event data.

- **lilnoundersDAO**: `Account`. LilNounders DAO.
- **event**: `ethers.Event`. Event meta data.

## `NounsDAOUpdated`
NounsDAOUpdated event data.

- **nounsDAO**: `Account`. Nouns DAO.
- **event**: `ethers.Event`. Event meta data.