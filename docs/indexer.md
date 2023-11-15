# Indexer

Indexer class responsible for storing and retrieving indexed events.

### `constructor()`

-   **provider**: `ethers.providers.JsonRpcProvider`. The blockchain network connection needed to store data.
-   **directoryPath**: `string`. The indexer directory for storing events.

```js
import { join } from "path";
import { ethers } from "ethers";
import { Indexer } from "nerman";

const provider = new ethers.provider.JsonRpcProvider("<JSON_RPC_URL>");
const path = join(__dirname, "data", "indexer");

const indexer = new Indexer(provider, path);
```

### `query()`

Retrieves indexed event data, filtered by options. Throws an error if the event is not supported.

-   **eventName**: `string`. Name of the event.
-   **queryOptions**: `object`. Object with filter options for the indexed events.

```js
const allForVotes = await indexer.query("VoteCast", { support: "FOR" });
```

### `index()`

Stores all instances of the given event from the Nouns starting block to the present. Do not use this if the event is already indexed, as it will rewrite the existing data.

-   **eventName**: `string`. Name of the event.

```js
indexer.index("ProposalCreated");
```

### `listen()`

Assigns a listener to the given event, appending new instances to the existing store of indexed events.

-   **eventName**: `string`. Name of the event.

```js
indexer.listen("ProposalCreated");
```

### `update()`

Stores all instances of the given even from the most recent indexing efforts to the present. Appends all data, rather than overwriting. This will create the indexed event file if it does not already exist.

-   **eventName**: `string`. Name of the event.

```js
indexer.update("ProposalCreated");
```

### `indexAll()`

Performs `index()` for all supported events.

```js
indexer.indexAll();
```

### `listenAll()`

Performs `listen()` for all supported events.

```js
indexer.listenAll();
```

### `updateAll()`

Performs `update()` for all supported events.

```js
indexer.updateAll();
```

# Query Options

## Nouns DAO

### `DAOWithdrawNounsFromEscrowQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **tokenId**: `number`. Token to return. All tokens by default.
- **to**: `string`. Address to return. All addressed by default.

### `ERC20TokensToIncludeInForkSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `EscrowedToForkQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **forkId**: `number`. Fork id to return. All by default.
- **owner**: `string`. Owner address to return. All by default.
- **tokenId**: `number`. Token id to return. All by default.
- **proposalId**: `number`. Proposal id to return. All by default.

### `ExecuteForkQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **startId**: `number`. Starting fork number to return. 0 by default.
- **endId**: `number`. Ending fork number to return. Infinity by default.
- **id**: `number`. To return a single fork id, use in place of startId and endId.

### `ForkDAODeployerSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `ForkPeriodSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `ForkThresholdSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `JoinForkQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **forkId**: `number`. Fork id to return. All by default.
- **owner**: `string`. Owner address to return. All by default.
- **tokenId**: `number`. Token id to return. All by default.
- **proposalId**: `number`. Proposal id to return. All by default.

### `LastMinuteWindowSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `MaxQuorumVotesBPSSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `MinQuorumVotesBPSSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `NewAdminQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `NewImplementationQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `NewPendingAdminQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `NewPendingVetoerQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `NewVetoerQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `ObjectionPeriodDurationSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `ProposalCanceledQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **proposalId**: `number`. Proposal id to return. All by default.

### `ProposalCreatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **startId**: `number`. First proposal id to return. 0 by default.
- **endId**: `number`. Last proposal id to return. Infinity by default.
- **id**: `number`. Used in place of startId and endId, to return only one proposal id.
- **status**: `"Cancelled" | "Vetoed" | "Executed" | "Queued"`. Latest proposal status to return. All by default.
- **proposer**: `string`. Proposer address to return. All by default.

### `ProposalCreatedOnTimelockV1Query`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `ProposalCreatedWithRequirementsQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **startId**: `number`. First proposal id to return. 0 by default.
- **endId**: `number`. Last proposal id to return. Infinity by default.
- **id**: `number`. Used in place of startId and endId, to return only one proposal id.
- **status**: `"Cancelled" | "Vetoed" | "Executed" | "Queued"`. Latest proposal status to return. All by default.
- **proposer**: `string`. Proposer address to return. All by default.

### `ProposalDescriptionUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **proposer**: `string`. Proposer address to return. All by default.

### `ProposalExecutedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **proposalId**: `number`. Proposal id to return. All by default.

### `ProposalObjectionPeriodSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **proposalId**: `number`. Proposal id to return. All by default.

### `ProposalQueuedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **proposalId**: `number`. Proposal id to return. All by default.

### `ProposalThresholdBPSSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `ProposalTransactionsUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **id**: `number`. Proposal id to return. All by default.
- **proposer**: `string`. Proposer address to return. All by default.

### `ProposalUpdatablePeriodSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `ProposalUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **id**: `number`. Proposal id to return. All by default.
- **proposer**: `string`. Proposer address to return. All by default.

### `ProposalVetoedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **proposalId**: `number`. Proposal id to return. All by default.

### `QuorumCoefficientSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `QuorumVotesBPSSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `RefundableVoteQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **voter**: `string`. Voter address to return. All by default.

### `SignatureCancelledQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **signer**: `string`. Signer address to return. All by default.

### `TimelocksAndAdminSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **admin**: `string`. Admin address to return. All by default.


### `StatusChangeQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **proposalId**: `number`. Proposal id to return. All by default.
- **status**: `"Cancelled" | "Vetoed" | "Executed" | "Queued"`. Proposal status to return. All by default.

### `VoteCastQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **voter**: `string`. Voter address to return. All by default.
- **proposalId**: `number`. Proposal id to return. All by default.
- **support**: `"AGAINST" | "FOR" | "ABSTAIN"`. Vote stance to return. All by default.

### `VoteSnapshotBlockSwitchProposalIdSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `VotingDelaySetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `VotingPeriodSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `WithdrawQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **forkId**: `number`. Fork id to return. All by default.
- **owner**: `string`. Owner address to return. All by default.
- **tokenId**: `number`. Token id to return. All by default.

## Nouns Auction House

### `AuctionCreatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **nounId**: `number`. Noun id to return. All by default.

### `AuctionBidQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **nounId**: `number`. Noun id to return. All by default.
- **bidder**: `string`. Bidder address to return. All by default.
- **minBidAmount**: `number`. Smallest bid to return. 0 by default.
- **maxBidAmount**: `number`. Largest bid to return. Infinity by default.

### `AuctionExtendedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **nounId**: `number`. Noun id to return. All by default.

### `AuctionSettledQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **nounId**: `number`. Noun id to return. All by default.
- **winner**: `string`. Winner address to return. All by default.
- **minBidAmount**: `number`. Smallest bid to return. 0 by default.
- **maxBidAmount**: `number`. Largest bid to return. Infinity by default.

### `AuctionTimeBufferUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `AuctionReservePriceUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `AuctionMinBidIncrementPercentageUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `OwnershipTransferredQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **previousOwner**: `string`. Previous owner address to return. All by default.
- **newOwner**: `string`. New owner address to return. All by default.
- **including**: `string`. An included address to return, either the previousOwner or the newOwner. All by default.

### `PausedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `UnpausedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

## Nouns Token

### `DelegateChangedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **delegator**: `string`. Delegator address to return. All by default.
- **fromDelegate**: `string`. From delegate address to return. All by default.
- **toDelegate**: `string`. To delegate address to return. All by default.
- **involving**: `string`. An involved address to return, either the delegator, fromDelegate, or toDelegate. All by default.

### `DelegateVotesChangedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **delegate**: `string`. Delegate address to return. All by default.

### `TransferQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **from**: `string`. From address to return. All by default.
- **to**: `string`. To address to return. All by default.
- **involved**: `string`. An involved address to return, either the delegator, fromDelegate, or toDelegate. All by default.
- **tokenId**: `number`. Token id to return. All by default.


### `ApprovalQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **owner**: `string`. Owner address to return. All by default.
- **tokenId**: `number`. Token id to return. All by default.

### `ApprovalForAllQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **owner**: `string`. Owner address to return. All by default.

### `NounCreatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **tokenId**: `number`. Token id to return. All by default.
- **background**: `number`. Background seed to return. All by default.
- **body**: `number`. Body seed to return. All by default.
- **accessory**: `number`. Accessory seed to return. All by default.
- **head**: `number`. Head seed to return. All by default.
- **glasses**: `number`. Glasses seed to return. All by default.

### `DescriptorLockedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `DescriptorUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `MinterLockedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `MinterUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `NounBurnedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **nounId**: `number`. Noun id to return. All by default.

### `NoundersDAOUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `OwnershipTransferredQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **previousOwner**: `string`. Previous owner address to return. All by default.
- **newOwner**: `string`. New owner address to return. All by default.
- **including**: `string`. An involved address to return, either the previousOwner, or newOwner. All by default.

### `SeederLockedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `SeederUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

## Nouns DAO Data

### `AdminChangedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **previousAdmin**: `string`. Previous admin address to return. All by default.
- **newAdmin**: `string`. New admin address to return. All by default.
- **including**: `string`. An involved address to return, either the previousAdmin, or newAdmin. All by default.

### `BeaconUpgradedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `CandidateFeedbackSentQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **msgSender**: `string`. Message sender address to return. All by default.
- **proposer**: `string`. Proposer address to return. All by default.
- **involved**: `string`. An involved address to return, either the msgSender, or proposer. All by default.
- **slug**: `string`. Slug to return. All by default.
- **supportChoice**: `"AGAINST" | "FOR" | "ABSTAIN"`. Support choice to return. All by default.

### `CreateCandidateCostSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `ETHWithdrawnQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **to**: `string`. To address to return. All by default.

### `FeeRecipientSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `OwnershipTransferredQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **previousOwner**: `string`. Previous owner address to return. All by default.
- **newOwner**: `string`. New owner address to return. All by default.
- **including**: `string`. An involved address to return, either the previousOwner, or newOwner. All by default.

### `ProposalCandidateCanceledQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **msgSender**: `string`. Message sender address to return. All by default.
- **slug**: `string`. Slug to return. All by default.

### `ProposalCandidateCreatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **msgSender**: `string`. Message sender address to return. All by default.
- **slug**: `string`. Slug to return. All by default.

### `ProposalCandidateUpdatedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **msgSender**: `string`. Message sender address to return. All by default.
- **slug**: `string`. Slug to return. All by default.

### `SignatureAddedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.
- **signer**: `string`. Signer address to return. All by default.
- **proposer**: `string`. Proposer address to return. All by default.
- **involved**: `string`. An involved address to return, either the signer, or proposer. All by default.
- **slug**: `string`. Slug to return. All by default.

### `UpdateCandidateCostSetQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.

### `UpgradedQuery`

- **startBlock**: `number`. Oldest block to return. Nouns starting block by default.
- **endBlock**: `number`. Newest block to return. Infinity by default.