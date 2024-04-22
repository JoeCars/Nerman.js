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

## `Event`

Event meta data.

-   **blockNumber**: `number`.
-   **blockHash**: `string`.
-   **transactionHash**: `string`.

# Nouns DAO Types

A list of types belonging to various Nouns DAO contract events.

## `DAOWithdrawNounsFromEscrow`

DAOWithdrawNounsFromEscrow event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L191C9-L191C9)

-   **tokenIds**: `number[]`. List of tokens being withdrawn.
-   **to**: `Account`. Address withdrawing the tokens.
-   **event**: `Event`. Event meta data.

```js
{
	tokenIds: [181],
	to: { id: "0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71" }
}
```

## `ERC20TokensToIncludeInForkSet`

ERC20TokensToIncludeInForkSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L513)

-   **oldErc20Tokens**: `string[]`. Old ERC20 tokens for splitting funds.
-   **newErc20tokens**: `string[]`. New ERC20 tokens for splitting funds.
-   **event**: `Event`. Event meta data.

```js
{
	oldErc20Tokens: [],
	newErc20tokens: [
		"0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
		"0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
		"0xae78736Cd615f374D3085123A210448E74Fc6393",
		"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
	]
}
```

## `EscrowedToFork`

EscrowedToFork event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L74)

-   **forkId**: `number`. Fork number.
-   **owner**: `Account`. Token owner who is escrowing to fork.
-   **tokenIds**: `number[]`. List of tokens being escrowed.
-   **proposalIds**: `number[]`. Proposal IDs which are the reason for wanting to fork.
-   **reason**: `string`. Optional reason.
-   **event**: `Event`. Event meta data.

```js
{
	forkId: 2,
	owner: { id: "0x67DaCc258DCCc8CbFB493c652ab5170C3CFf0AD9" },
	tokenIds: [877, 902, 903, 904, 905, 906, 907],
	proposalIds: [439],
	reason: ""
}
```

## `ExecuteFork`

ExecuteFork event data. The fork escrow is closed. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L111)

-   **forkId**: `number`. Fork number.
-   **forkTreasury**: `Account`. New fork treasury address.
-   **forkToken**: `Account`. New fork token address.
-   **forkEndTimestamp**: `bigint | string`. The unix timestamp in seconds until which the fork can rejoin the DAO.
-   **tokensInEscrow**: `bigint | string`. Tokens in escrow at the moment of the escrow. These are lost from the main treasury.
-   **event**: `Event`. Event meta data.

```js
{
	forkId: 0,
	forkTreasury: { id: "0x55Dd565C6f94B3Bad1f4A35398af4a526Fcd465f" },
	forkToken: { id: "0x06cF70f6f90E0B1f17d19F3Cb962A39E505D5b3f" },
	forkEndTimestamp: 1694813195,
	tokensInEscrow: 187
}
```

## `ForkDAODeployerSet`

ForkDAODeployerSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L500)

-   **oldForkDAODeployer**: `Account`. Old fork DAO deployer contract.
-   **newForkDAODeployer**: `Account`. New fork DAO deployer contract.
-   **event**: `Event`. Event meta data.

```js
{
	oldForkDAODeployer: { id: "0x0000000000000000000000000000000000000000" },
	newForkDAODeployer: { id: "0xcD65e61f70e0b1Aa433ca1d9A6FC2332e9e73cE3" }
}
```

## `ForkPeriodSet`

ForkPeriodSet event data. Sets how much time a fork has to rejoin the DAO after it has been executed. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L533)

-   **oldForkPeriod**: `bigint | string`. Old fork period in seconds.
-   **newForkPeriod**: `bigint | string`. New fork period in seconds.
-   **event**: `Event`. Event meta data.

```js
{
	oldForkPeriod: 302400,
	newForkPeriod: 604800
}
```

## `ForkThresholdSet`

ForkThresholdSet event data. Sets the threshold of Nouns in escrow needed to execute a fork. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L551)

-   **oldForkThreshold**: `bigint | string`. The old token amount needed to successfully fork the DAO. A percentage of the token supply.
-   **newForkThreshold**: `bigint | string`. The new token amount needed to successfully fork the DAO. A percentage of the token supply.
-   **event**: `Event`. Event meta data.

```js
{
	oldForkThreshold: 2000,
	newForkThreshold: 1000
}
```

## `JoinFork`

JoinFork event data. Joins contract after the contract has been executed, but before the time to rejoin has ended. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L141)

-   **forkId**: `number`. Fork number.
-   **owner**: `Account`. Token owner who is escrowing to fork.
-   **tokenIds**: `number[]`. List of tokens being escrowed.
-   **proposalIds**: `number[]`. Owner's currently active proposals being transferred to the fork.
-   **reason**: `string`. Optional reason.
-   **event**: `Event`. Event meta data.

```js
{
	forkId: 2,
	owner: { id: "0x8D8B9c79196f32161BcB2A9728D274B3b45eB9AF" },
	tokenIds: [878, 892, 894, 912],
	proposalIds: [],
	reason: ""
}
```

## `LastMinuteWindowSet`

LastMinuteWindowSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L229)

-   **oldLastMinuteWindowInBlocks**: `bigint | string`. Old objection period last minute window.
-   **newLastMinuteWindowInBlocks**: `bigint | string`. New objection period last minute window.
-   **event**: `Event`. Event meta data.

## `MaxQuorumVotesBPSSet`

MaxQuorumVotesBPSSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L381)

-   **oldMaxQuorumVotesBPS**: `number`. Old maximum quorum votes BPS.
-   **newMaxQuorumVotesBPS**: `number`. New maximum quorum votes BPS.
-   **event**: `Event`. Event meta data.

```js
{
	oldMaxQuorumVotesBPS: 2000,
	newMaxQuorumVotesBPS: 1500
}
```

## `MinQuorumVotesBPSSet`

MinQuorumVotesBPSSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L351)

-   **oldMinQuorumVotesBPS**: `number`. Old minimum quorum votes BPS.
-   **newMinQuorumVotesBPS**: `number`. New minimum quorum votes BPS.
-   **event**: `Event`. Event meta data.

```js
{
	oldMinQuorumVotesBPS: 1000,
	newMinQuorumVotesBPS: 1000
}
```

## `NewAdmin`

NewAdmin event data. Transfers admin rights. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L276)

-   **oldAdmin**: `Account | undefined`. Old admin address.
-   **newAdmin**: `Account`. New admin address.
-   **event**: `Event`. Event meta data.

## `NewImplementation`

NewImplementation event data. Updates implementation of the delegator. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOProxyV3.sol#L81)

-   **oldImplementation**: `Account`. Old delegator implementation.
-   **newImplementation**: `Account`. New delegator implementation.
-   **event**: `Event`. Event meta data.

```js
{
	oldImplementation: { id: "0x51C7D7C47E440d937208bD987140D6db6B1E4051" },
	newImplementation: { id: "0xdD1492570beb290a2f309541e1fDdcaAA3f00B61" }
}
```

## `NewPendingAdmin`

NewPendingAdmin event data. Offers the admin position to a new address. The new address must accept it to become an admin. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L261)

-   **oldPendingAdmin**: `Account | undefined`. Old pending admin address.
-   **newPendingAdmin**: `Account`. New pending admin address.
-   **event**: `Event`. Event meta data.

## `NewPendingVetoer`

NewPendingVetoer event data. Offers the vetoer position to a new address. The new address must accept it to become a vetoer. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L301)

-   **oldPendingVetoer**: `Account`. Old pending vetoer.
-   **newPendingVetoer**: `Account`. New pending vetoer.
-   **event**: `Event`. Event meta data.

## `NewVetoer`

NewVetoer event data. Transfers vetoer rights. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L314)

-   **oldVetoer**: `Account`. Old vetoer.
-   **newVetoer**: `Account`. New vetoer.
-   **event**: `Event`. Event meta data.

```js
{
	oldVetoer: { id: "0x2573C60a6D127755aA2DC85e342F7da2378a0Cc5" },
	newVetoer: { id: "0x37b8e20646d174B00198b7E183dd1f25520C0f60" }
}
```

## `ObjectionPeriodDurationSet`

ObjectionPeriodDurationSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L212)

-   **oldObjectionPeriodDurationInBlocks**: `bigint | string`. Old objection period in blocks.
-   **newObjectionPeriodDurationInBlocks**: `bigint | string`. New objection period in blocks.
-   **event**: `Event`. Event meta data.

## `ProposalCanceled`

ProposalCanceled event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L571)

-   **id**: `number`. id of the proposal being cancelled.
-   **event**: `Event`. Event meta data.

```js
{
	id: 419;
}
```

## `ProposalCreated`

ProposalCreated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L917)

-   **id**: `number`. id of the proposal being created.
-   **proposer**: `Account`. Account of the proposer.
-   **targets**: `string[]`. Target addresses for proposal calls.
-   **values**: `bigint[] | string[]`. Eth values for proposal calls.
-   **signatures**: `string[]`. Function signatures for proposal calls.
-   **calldatas**: `any[]`. Bytes. Calldatas for proposal calls.
-   **startBlock**: `bigint | string`. The block voting starts.
-   **endBlock**: `bigint | string`. The block voting ends.
-   **description**: `string`. Proposal description. Typically formatted as:

```md
# Proposal Title \n

Proposal content.
```

-   **event**: `Event`. Event meta data.

```js
{
	id: 431,
	proposer: { id: "0xb0dd496FffFa300df1EFf42702066aCa81834404" },
	targets: ["0x49048044D57e1C92A77f79988d21Fa8fAF74E97e"],
	signatures: ["depositTransaction(address,uint256,uint64,bool,bytes)"],
	calldatas: [
		"0x000000000000000000000000945da7ddb8d8ee64c11001c1a5ba80c1c026279e000000000000000000000000000000000000000000000000533b1db6dcd2c00000000000000000000000000000000000000000000000000000000000000493e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000064fc93ac2500000000000000000000000000000000000000000000000000000000000002bb000000000000000000000000804f6272a167e8accb32072d08e0957f9c79334e000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000"
	],
	startBlock: 18537673,
	endBlock: 18566473,
	description: "# Nouns x BasePaint\n\n\n\n*tldr:\nCommit to minting 6 ETH of Nouns Themed BasePaint dailys for three consecutive days..."
}
```

## `ProposalCreatedOnTimelockV1`

ProposalCreatedOnTimelockV1 event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L197)

-   **id**: `number`. id of the proposal created.
-   **event**: `Event`. Event meta data.

```js
{
	id: 362;
}
```

## `ProposalCreatedWithRequirements`

ProposalCreatedWithRequirements event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L917)

-   **id**: `number`. id of the proposal created.
-   **proposer**: `Account`. Account of the proposer.
-   **signers**: `string[]`. List of signers. In V3.
-   **targets**: `string[]`. Target addresses for proposal calls.
-   **values**: `bigint[] | string[]`. Eth values for proposal calls.
-   **signatures**: `string[]`. Function signatures for proposal calls.
-   **calldatas**: `any[]`. Calldatas for proposal calls.
-   **startBlock**: `bigint | string`. The block voting starts.
-   **endBlock**: `bigint | string`. The block voting ends.
-   **updatePeriodEndBlock**: `bigint | string`. Period where the proposal is updatable. In V3.
-   **proposalThreshold**: `number`. The proposal threshold. In V1.
-   **quorumVotes**: `number`. The quorum votes. In V1. Renamed to minQuorumVotes in V2.
-   **description**: `string`. Proposal description.
-   **event**: `Event`. Event meta data.

```js
{
	id: 431,
	proposer: { id: "0xb0dd496FffFa300df1EFf42702066aCa81834404" },
	signers: [],
	targets: ["0x49048044D57e1C92A77f79988d21Fa8fAF74E97e"],
	signatures: ["depositTransaction(address,uint256,uint64,bool,bytes)"],
	calldatas: [
		"0x000000000000000000000000945da7ddb8d8ee64c11001c1a5ba80c1c026279e000000000000000000000000000000000000000000000000533b1db6dcd2c00000000000000000000000000000000000000000000000000000000000000493e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000064fc93ac2500000000000000000000000000000000000000000000000000000000000002bb000000000000000000000000804f6272a167e8accb32072d08e0957f9c79334e000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000"
	],
	startBlock: 18537673,
	endBlock: 18566473,
	updatePeriodEndBlock: 18534073,
	proposalThreshold: 0,
	quorumVotes: 37,
	description: "# Nouns x BasePaint\n\n\n\n*tldr:\nCommit to minting 6 ETH of Nouns Themed BasePaint dailys for three consecutive days..."
}
```

## `ProposalDescriptionUpdated`

ProposalDescriptionUpdated event data. The proposal description was updated during the updateable period. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L360)

-   **id**: `number`. id of the proposal updated.
-   **proposer**: `Account`. Account of the proposer.
-   **description**: `string`. Updated proposal description.
-   **updatedMessage**: `string`. A message explaining the update.
-   **event**: `Event`. Event meta data.

```js
{
	id: 404,
	proposer: { id: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B" },
	description: "# 4156 and the Nounders have let..."
}
```

## `ProposalExecuted`

ProposalExecuted event data. Executes a fork that is currently queued. Not possible during forking period. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L495)

-   **id**: `number`. id of the proposal executed.
-   **event**: `Event`. Event meta data.

```js
{
	id: 423,
}
```

## `ProposalObjectionPeriodSet`

ProposalObjectionPeriodSet event data. A last minute FOR vote that changes the proposal from defeated to succeeded will trigger this event. Extends voting time. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L210)

-   **id**: `number`. id of the proposal.
-   **objectionPeriodEndBlock**: `bigint | string`. Objection end block.
-   **event**: `Event`. Event meta data.

## `ProposalQueued`

ProposalQueued event data. A proposal that was successful during the voting period is queued. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L438)

-   **id**: `number`. id of the proposal.
-   **eta**: `bigint | string`. Block number signifying end of the queued period. The proposal is executed once this is over.
-   **event**: `Event`. Event meta data.

```js
{
	proposalId: 425,
	eta: 1699405607
}
```

## `ProposalThresholdBPSSet`

ProposalThresholdBPSSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L193)

-   **oldProposalThresholdBPS**: `number`. Old proposal threshold basis points.
-   **newProposalThresholdBPS**: `number`. New proposal threshold basis points.
-   **event**: `Event`. Event meta data.

```js
{
	oldProposalThresholdBPS: 50,
	newProposalThresholdBPS: 25
}
```

## `ProposalTransactionsUpdated`

ProposalTransactionsUpdated event data. Updates list of proposal transactions during the updateable period. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L321)

-   **id**: `number`. id of the proposal.
-   **proposer**: `Account`. Account of the proposer.
-   **targets**: `string[]`. Target addresses for proposal calls.
-   **values**: `bigint[] | string[]`. Eth values for proposal calls.
-   **signatures**: `string[]`. Function signatures for proposal calls.
-   **calldatas**: `any[]`. Calldatas for proposal calls.
-   **updateMessage**: `string`. The reason for the update.
-   **event**: `Event`. Event meta data.

```js
{
	id: 427,
	proposer: { id: "0xe62d071Ea99A63798Fec7222c483c53e87F2A32E" },
	targets: [
		"0x0fd206FC7A7dBcD5661157eDCb1FFDD0D02A61ff",
		"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
		"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
	],
	signatures: [
		"createStream(address,uint256,address,uint256,uint256,uint8,address)",
		"deposit()",
		"transfer(address,uint256)"
	],
	calldatas: [
		"0x000000000000000000000000bf49c08ec0e98ebb1d8dc546d7f1fcd6a166e43000000000000000000000000000000000000000000000000138400eca364a0000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000654acf800000000000000000000000000000000000000000000000000000000065af018000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008ac7585afe80d0c54b2e42bff41d5e2a1743b017",
		"0x",
		"0x0000000000000000000000008ac7585afe80d0c54b2e42bff41d5e2a1743b01700000000000000000000000000000000000000000000000138400eca364a0000"
	],
	updateMessage: "Corrected payment information"
}
```

## `ProposalUpdatablePeriodSet`

ProposalUpdatablePeriodSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L243)

-   **oldProposalUpdatablePeriodInBlocks**: `bigint | string`. The old proposal updatable period in blocks.
-   **newProposalUpdatablePeriodInBlocks**: `bigint | string`. The new proposal updatable period in blocks.
-   **event**: `Event`. Event meta data.

```js
{
	oldProposalUpdatablePeriodInBlocks: 0,
	newProposalUpdatablePeriodInBlocks: 18000
}
```

## `ProposalUpdated`

ProposalUpdated event data. Updates both the description and transaction. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L288)

-   **id**: `number`. id of the proposal.
-   **proposer**: `Account`. Account of the proposer.
-   **targets**: `string[]`. Updated target addresses for proposal calls.
-   **values**: `bigint[] | string[]`. Updated eth values for proposal calls.
-   **signatures**: `string[]`. Updated function signatures for proposal calls.
-   **calldatas**: `any[]`. Updated calldatas for proposal calls.
-   **description**: `string`. Updated proposal description.
-   **updateMessage**: `string`. Message explaining the update.
-   **event**: `Event`. Event meta data.

```js
{
	id: 415,
	proposer: { id: "0xA86882277E69FbF0a51805cdc8b0a3a113079E63" },
	targets: ["0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", "0x889edC2eDab5f40e902b864aD4d7AdE8E412F9B1"],
	signatures: ["approve(address,uint256)", "requestWithdrawals(uint256[],address)"],
	calldatas: [
		"0x000000000000000000000000889edc2edab5f40e902b864ad4d7ade8e412f9b10000000000000000000000000000000000000000000000f3752521a9874c0000",
		"0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000b1a32fc9f9d8b2cf86c068cae13108809547ef71000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000003635c9adc5dea0000000000000000000000000000000000000000000000000003635c9adc5dea0000000000000000000000000000000000000000000000000003635c9adc5dea0000000000000000000000000000000000000000000000000003635c9adc5dea0000000000000000000000000000000000000000000000000001a9dfe6a920ccc0000"
	],
	description: "# Unstake 50% of stETH\n\nThe dao currently holds an outsized...",
	updateMessage: "added a missing tx"
}
```

## `ProposalVetoed`

ProposalVetoed event data. Vetoes a proposal that has not been executed. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L536)

-   **id**: `number`. id of the proposal.
-   **event**: `Event`. Event meta data.

```js
{
	id: 60,
}
```

## `Quit`

Quit event data. Token holders return their tokens in exchange for eth. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/newdao/governance/NounsDAOLogicV1Fork.sol#L222)

-   **msgSender**: `Account`. The account quitting the Nouns DAO.
-   **tokenIds**: `number[]`. The tokens returned in exchange for eth.
-   **event**: `Event`. Event meta data.

## `QuorumCoefficientSet`

QuorumCoefficientSet event data. Sets a new fixed point integer with 6 decimals. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L408)

-   **oldQuorumCoefficient**: `number`. The old quorum coefficient.
-   **newQuorumCoefficient**: `number`. The new quorum coefficient.
-   **event**: `Event`. Event meta data.

```js
{
	oldQuorumCoefficient: 1000000,
	newQuorumCoefficient: 1000000
}
```

## `QuorumVotesBPSSet`

QuorumVotesBPSSet event data. (Old). [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/newdao/governance/NounsDAOLogicV1Fork.sol#L709)

-   **oldQuorumVotesBPS**: `number`. The old quorum votes basis points.
-   **newQuorumVotesBPS**: `number`. The new quorum votes basis points.
-   **event**: `Event`. Event meta data.

```js
{
	oldQuorumVotesBPS: 0,
	newQuorumVotesBPS: 1000
}
```

## `RefundableVote`

RefundableVote event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L295)

-   **voter**: `Account`. The voter account.
-   **refundAmount**: `bigint | string`. The refund amount.
-   **refundSent**: `boolean`. Whether the refund was sent or not.
-   **event**: `Event`. Event meta data.

```js
{
	voter: { id: "0x2ED22eA03fEA3e5BD90f6Fdd52C20c26ff6e1300" },
	refundAmount: 3289721564978004,
	refundSent: true
}
```

## `SignatureCancelled`

SignatureCancelled event data. Invalidates a signature for signing a proposal. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Proposals.sol#L270)

-   **signer**: `Account`. The account cancelling the signature.
-   **sig**: `any`. The signature to cancel.
-   **event**: `Event`. Event meta data.

```js
{
	signer: { id: "0x696ed7b26f4B019CEeC78DC8b9140ad64A6f354B" },
	sig: "0xb27da69e2b0047b881741f4f793d3d1d1a8d4587b5d23ace7e6e53e180a8fc14537d86a313c3daaec900a7d6c6652ad94e68675315b688eeaae8891274f247161c"
}
```

## `TimelocksAndAdminSet`

TimelocksAndAdminSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L566)

-   **timelock**: `Account`. The new timelock contract.
-   **timelockV1**: `Account`. The new timelockV1 contract.
-   **admin**: `Account`. The new admin address.
-   **event**: `Event`. Event meta data.

```js
{
	timelock: { id: "0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71" },
	timelockV1: { id: "0x0BC3807Ec262cB779b38D65b38158acC3bfedE10" },
	admin: { id: "0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71" }
}
```

## `VoteCast`

VoteCast event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Votes.sol#L70)

-   **voter**: `Account`. The voter account.
-   **proposalId**: `number`. The proposal voted on.
-   **supportDetailed**: `VoteDirection`. The side they are voting for.
-   **votes**: `number`. The number of votes they are using.
-   **reason**: `string`. An optional reason explaining their decision.
-   **event**: `Event`. Event meta data.

```js
{
	voterAddress: { id: "0x2ED22eA03fEA3e5BD90f6Fdd52C20c26ff6e1300" },
	proposalId: 429,
	supportDetailed: 1,
	votes: 1,
	reason: ""
}
```

## `VoteSnapshotBlockSwitchProposalIdSet`

VoteSnapshotBlockSwitchProposalIdSet event data. The proposal id after which the snapshot was taken the day voting started. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L482)

-   **oldVoteSnapshotBlockSwitchProposalId**: `number`. 0. This event was only intended to ever be executed once.
-   **newVoteSnapshotBlockSwitchProposalId**: `number`. The proposal id from which the snapshot became the starting day.
-   **event**: `Event`. Event meta data.

```js
{
	oldVoteSnapshotBlockSwitchProposalId: 0,
	newVoteSnapshotBlockSwitchProposalId: 359
}
```

## `VotingDelaySet`

VotingDelaySet event data. Voting delay is the time before voting begins, in blocks. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L162)

-   **oldVotingDelay**: `bigint | string`. The old voting delay in blocks.
-   **newVotingDelay**: `bigint | string`. The new voting delay in blocks.
-   **event**: `Event`. Event meta data.

```js
{
	oldVotingDelay: 36000,
	newVotingDelay: 3600
}
```

## `VotingPeriodSet`

VotingPeriodSet event data. Voting period is how long voting lasts, in blocks. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L177)

-   **oldVotingPeriod**: `bigint | string`. The old voting period in blocks.
-   **newVotingPeriod**: `bigint | string`. The new voting period in blocks.
-   **event**: `Event`. Event meta data.

```js
{
	oldVotingPeriod: 36000,
	newVotingPeriod: 28800
}
```

## `Withdraw`

Withdraw event data. Withdraws all the eth in the contract. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/NounsDAOV3Admin.sol#L468)

-   **amount**: `bigint | string`. The amount withdrawn.
-   **sent**: `boolean`. Whether the withdrawn amount was sent.
-   **event**: `Event`. Event meta data.

## `WithdrawFromForkEscrow`

WithdrawFromForkEscrow event data. Withdraws nouns from the escrow if the fork has not been executed yet. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/fork/NounsDAOV3Fork.sol#L95)

-   **forkId**: `number`. The fork escrow withdrawing from.
-   **owner**: `Account`. The account withdrawing.
-   **tokenIds**: `number[]`. The tokens withdrawing.
-   **event**: `Event`. Event meta data.

## `AuctionComplete`

AuctionComplete event data. Custom type.

-   **id**: `number`. Noun token id.
-   **endTime**: `number`. The auction end time.

## `AuctionBid`

AuctionBid event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L104)

-   **id**: `number`. Noun token id.
-   **amount**: `bigint | string`. The bid amount in wei.
-   **bidder**: `Account`. Bidder account.
-   **extended**: `boolean`. Whether the bid was received within the end time buffer, thus extending the auction.
-   **event**: `Event`. Event meta data.

```js
{
	id: 904,
	bidder: { id: "0xf6B6F07862A02C85628B3A9688beae07fEA9C863" },
	amount: 10710000000000000000,
	extended: false
}
```

## `AuctionCreated`

AuctionCreated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L197)

-   **id**: `number`. Noun token id.
-   **startTime**: `bigint | string`. Auction starting time as seconds since unix epoch.
-   **endTime**: `bigint | string`. Auction ending time as seconds since unix epoch.
-   **event**: `Event`. Event meta data.

```js
{
	id: 904,
	startTime: 1699273631,
	endTime: 1699360031
}
```

## `AuctionExtended`

AuctionExtended event data. Happens whenever a bid comes in within the end buffer of the auction. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L104)

-   **id**: `number`. Noun token id.
-   **endTime**: `bigint | string`. New auction end time as seconds since unix epoch.
-   **event**: `Event`. Event meta data.

```js
{
	nounId: 903,
	endTime: 1699272947
}
```

## `AuctionSettled`

AuctionSettled event data. Triggers when the next auction begins. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L221)

-   **id**: `number`. Noun token id.
-   **winner**: `Account`. The winning bidder's account.
-   **amount**: `bigint | string`. Winning bid amount in wei.
-   **event**: `Event`. Event meta data.

```js
{
	id: 903,
	winner: { id: "0x67DaCc258DCCc8CbFB493c652ab5170C3CFf0AD9" },
	amount: 20200000000000000000
}
```

## `AuctionTimeBufferUpdated`

AuctionTimeBufferUpdated event data. The time buffer that extends an auction. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L165)

-   **timeBuffer**: `bigint | string`. New time buffer.
-   **event**: `Event`. Event meta data.

## `AuctionReservePriceUpdated`

AuctionReservePriceUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L175)

-   **reservePrice**: `bigint | string`. New auction reserve price.
-   **event**: `Event`. Event meta data.

## `AuctionMinBidIncrementPercentageUpdated`

AuctionMinBidIncrementPercentageUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L185)

-   **minBidIncrementPercentage**: `number`. New auction minimum bid increment percentage.
-   **event**: `Event`. Event meta data.

## `OwnershipTransferred`

OwnershipTransferred event data. In ABI but not in contract.

-   **previousOwner**: `Account`. Previous owner.
-   **newOwner**: `Account`. New owner.
-   **event**: `Event`. Event meta data.

```js
{
	previousOwner: { id: "0x0BC3807Ec262cB779b38D65b38158acC3bfedE10" },
	newOwner: { id: "0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71" }
}
```

## `Paused`

Paused event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L144)

-   **address**: `Account`. Address paused.
-   **event**: `Event`. Event meta data.

```js
{
	address: {
		id: "0x830BD73E4184ceF73443C15111a1DF14e495C706";
	}
}
```

## `Unpaused`

Unpaused event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsAuctionHouse.sol#L153)

-   **address**: `Account`. Address unpaused.
-   **event**: `Event`. Event meta data.

```js
{
	address: {
		id: "0x830BD73E4184ceF73443C15111a1DF14e495C706";
	}
}
```

## `DelegateChanged`

DelegateChanged event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721Checkpointable.sol#L197)

-   **delegator**: `Account`. Token owner account.
-   **fromDelegate**: `Account`. Old delegate account.
-   **toDelegate**: `Account`. New delegate account.
-   **numOfVotesChanged**: `number | undefined`. Number of votes delegated.
-   **event**: `Event`. Event meta data.

```js
{
	delegator: { id: "0xA21023920581fDAdAa893124F401e0c0ed168725" },
	fromDelegate: { id: "0xA21023920581fDAdAa893124F401e0c0ed168725" },
	toDelegate: { id: "0xA86882277E69FbF0a51805cdc8b0a3a113079E63" }
}
```

## `DelegateVotesChanged`

DelegateVotesChanged event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721Checkpointable.sol#L232)

-   **delegate**: `Account`. Delegate account.
-   **previousBalance**: `bigint | string`. Previous voting power.
-   **newBalance**: `bigint | string`. New voting power.
-   **event**: `Event`. Event meta data.

```js
{
	delegate: { id: "0xcC2688350d29623E2A0844Cc8885F9050F0f6Ed5" },
	previousBalance: 9,
	newBalance: 10
}
```

## `Transfer`

Transfer event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L373)

-   **from**: `Account`. Old token owner.
-   **to**: `Account`. New token owner.
-   **tokenId**: `number`. Nouns token id.
-   **event**: `Event`. Event meta data.

```js
{
	from: { id: "0xC9A43964B791e5aBd13B98fAc710132AbFCa873E" },
	to: { id: "0x13061efe742418c361C840CaFf300dC43AC0AffE" },
	tokenId: 894
}
```

## `Approval`

Approval event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L398)

-   **owner**: `Account`. Owner of the token.
-   **approved**: `Account`. The person given permission to operate on the token.
-   **tokenId**: `number`. Nouns token id.
-   **event**: `Event`. Event meta data.

```js
{
	owner: { id: "0xC9A43964B791e5aBd13B98fAc710132AbFCa873E" },
	approved: { id: "0x0000000000000000000000000000000000000000" },
	tokenId: 894
}
```

## `ApprovalForAll`

ApprovalForAll event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/base/ERC721.sol#L165)

-   **owner**: `Account`. The token owner.
-   **operator**: `Account`. The person given permission to operate on the token.
-   **approved**: `boolean`. Whether the operator has permission for the token.
-   **event**: `Event`. Event meta data.

```js
{
	owner: { id: "0x3dD48AD861F0B77D1312F9C95A13e52871Ca95e0" },
	operator: { id: "0x2f18F339620a63e43f0839Eeb18D7de1e1Be4DfB" },
	approved: true
}
```

## `DescriptorLocked`

DescriptorLocked event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L226)

-   **event**: `Event`. Event meta data.

## `DescriptorUpdated`

DescriptorUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L216)

-   **descriptor**: `Account`. New token URI descriptor.
-   **event**: `Event`. Event meta data.

## `MinterLocked`

MinterLocked event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L206)

-   **event**: `Event`. Event meta data.

## `MinterUpdated`

MinterUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L196)

-   **minter**: `Account`. Token minter.
-   **event**: `Event`. Event meta data.

## `NounBurned`

NounBurned event data. Burns a noun. Happens when an auction has no bids. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L159)

-   **id**: `number`. Noun token id.
-   **event**: `Event`. Event meta data.

## `NounCreated`

NounCreated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L255)

-   **id**: `number`. Noun token id.
-   **seed**: `NounsTokenSeed`. Noun token seed.
-   **event**: `Event`. Event meta data.

```js
{
	id: 904,
	seed: { background: 0, body: 2, accessory: 105, head: 246, glasses: 7 }
}
```

## `NoundersDAOUpdated`

NoundersDAOUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L186)

-   **noundersDAO**: `Account`. Nounders DAO.
-   **event**: `Event`. Event meta data.

## `SeederLocked`

SeederLocked event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L246)

-   **event**: `Event`. Event meta data.

## `SeederUpdated`

SeederUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/NounsToken.sol#L236)

-   **seeder**: `Account`. Token seeder.
-   **event**: `Event`. Event meta data.

## `AdminChanged`

AdminChanged event data. In ABI but not in contract.

-   **previousAdmin**: `Account`. Previous admin.
-   **newAdmin**: `Account`. New admin.
-   **event**: `Event`. Event meta data.

## `BeaconUpgraded`

BeaconUpgraded event data. In ABI but not in contract.

-   **beacon**: `Account`. Beacon.
-   **event**: `Event`. Event meta data.

## `CandidateFeedbackSent`

CandidateFeedbackSent event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L279)

-   **msgSender**: `Account`. Feedbacker account.
-   **proposer**: `Account`. Candidate proposal creator account.
-   **slug**: `string`. Candidate proposal unique identifier.
-   **support**: `number`. Feedback vote. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively).
-   **reason**: `string`. Optional reason left by the feedbacker.
-   **event**: `Event`. Event meta data.

```js
{
	msgSender: { id: "0x9C99BF82fC38713C471D4415f66c8336D361501a" },
	proposer: { id: "0x9C99BF82fC38713C471D4415f66c8336D361501a" },
	slug: "the-rise-of-ben---a-documentary-about-benbodhi--",
	support: 1,
	reason: "Hey 12, thanks for your feedback.\n\nBut..."
}
```

## `CreateCandidateCostSet`

CreateCandidateCostSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L297)

-   **oldCreateCandidateCost**: `bigint | string`. Old cost of creating candidate proposal.
-   **newCreateCandidateCost**: `bigint | string`. New cost of creating candidate proposal.
-   **event**: `Event`. Event meta data.

## `ETHWithdrawn`

ETHWithdrawn event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L323C9-L323C9)

-   **to**: `Account`. Amount recipient.
-   **amount**: `bigint | string`. Amount of eth withdrawn in wei.
-   **event**: `Event`. Event meta data.

## `FeeRecipientSet`

FeeRecipientSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L311)

-   **oldFeeRecipient**: `Account`. Old fee recipient.
-   **newFeeRecipient**: `Account`. New fee recipient.
-   **event**: `Event`. Event meta data.

## `FeedbackSent`

FeedbackSent event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L261)

-   **msgSender**: `Account`. Feedbacker account.
-   **proposalId**: `number`. Proposal receiving feedback.
-   **support**: `number`. Feedback vote. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively).
-   **reason**: `string`. Optional reason left by the feedbacker.
-   **event**: `Event`. Event meta data.

```js
{
	msgSender: { id: "0x7c87323236aEd3eAb7A85efD5e94c4efDD22eD53" },
	proposalId: 429,
	support: 1,
	reason: "Dear benbodhi eth,\nThank you for..."
}
```

## `ProposalCandidateCanceled`

ProposalCandidateCanceled event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L204)

-   **msgSender**: `Account`. Proposal candidate creator account.
-   **slug**: `string`. Proposal candidate unique identifier.
-   **event**: `Event`. Event meta data.

```js
{
	msgSender: { id: "0xA86882277E69FbF0a51805cdc8b0a3a113079E63" },
	slug: "unstake-all-steth-from-lido"
}
```

## `ProposalCandidateCreated`

ProposalCandidateCreated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L111)

-   **msgSender**: `Account`. Proposal candidate creator account.
-   **targets**: `string[]`. Target addresses for proposal calls.
-   **values**: `bigint[] | string[]`. Eth values for proposal calls.
-   **signatures**: `string[]`. Function signatures for proposal calls.
-   **calldatas**: `any[]`. Calldatas for proposal calls.
-   **description**: `string`. Proposal candidate's description.
-   **slug**: `string`. Proposal candidate unique identifier.
-   **proposalIdToUpdate**: `number`. The id of the proposal to update if this is an update to an existing proposal.
-   **encodedProposalHash**: `string`. Hash of the proposal that this is an update for.
-   **event**: `Event`. Event meta data.

```js
{
	msgSender: { id: "0x32d1A53f6709a03f4b6cf4cb0501204ba188d4f5" },
	targets: ["0x32d1A53f6709a03f4b6cf4cb0501204ba188d4f5"],
	signatures: [""],
	calldatas: ["0x"],
	description: "# Buy Lils Nouns \n\nSubdaos/fractional Noun owners are...",
	slug: "buy-lils-nouns-",
	proposalIdToUpdate: 0,
	encodedProposalHash: "0x1122d1394bb2ee7eafa64b896a864712ec2af6b9f93419849aafddb03f4db815"
}
```

## `ProposalCandidateUpdated`

ProposalCandidateUpdated event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L161)

-   **msgSender**: `Account`. Proposal candidate creator account.
-   **targets**: `string[]`. Target addresses for proposal calls.
-   **values**: `bigint[] | string[]`. Eth values for proposal calls.
-   **signatures**: `string[]`. Function signatures for proposal calls.
-   **calldatas**: `any[]`. Calldatas for proposal calls.
-   **description**: `string`. Proposal candidate's description.
-   **slug**: `string`. Proposal candidate unique identifier.
-   **proposalIdToUpdate**: `number`. The id of the proposal to update if this is an update to an existing proposal.
-   **encodedProposalHash**: `string`. Hash of the proposal that this is an update for.
-   **reason**: `string`. Optional reason for explaining the update.
-   **event**: `Event`. Event meta data.

```js
{
	msgSender: "0xb0dd496FffFa300df1EFf42702066aCa81834404",
	targets: ["0x49048044D57e1C92A77f79988d21Fa8fAF74E97e"],
	signatures: ["depositTransaction(address,uint256,uint64,bool,bytes)"],
	calldatas: [
		"0x000000000000000000000000945da7ddb8d8ee64c11001c1a5ba80c1c026279e000000000000000000000000000000000000000000000000533b1db6dcd2c00000000000000000000000000000000000000000000000000000000000000493e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000064fc93ac2500000000000000000000000000000000000000000000000000000000000002bb000000000000000000000000804f6272a167e8accb32072d08e0957f9c79334e000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000"
	],
	description: "# Nouns x BasePaint\n\n\n\n*tldr:\nCommit to minting 6 ETH of Nouns Themed BasePaint dailys...",
	slug: "nouns-x-basepaint",
	proposalIdToUpdate: 0,
	encodedProposalHash: "0xf7f301d0423c3ca3f8ba88dd45c36f10a87058a3c0a8c128638c2645a84daf19",
	reason: "nit"
}
```

## `SignatureAdded`

SignatureAdded event data. Token holders can sign proposal candidates to convert them into DAO proposals. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L222)

-   **signer**: `Account`. Signer account.
-   **sig**: `string`. The signature bytes.
-   **expirationTimestamp**: `bigint | string`. The signature's expiration timestamp. As milliseconds since Unix epoch.
-   **proposer**: `Account`. Proposal candidate creator account.
-   **slug**: `string`. Proposal candidate unique identifier.
-   **proposalIdToUpdate**: `number`. The id of the proposal to update if this is an update to an existing proposal.
-   **encodedPropHash**: `string`. Hash of the proposal that this is an update for.
-   **sigDigest**: `string`. The abi encoding of the candidate version signed.
-   **reason**: `string`. Optional reason for signing proposal candidate.
-   **event**: `Event`. Event meta data.

```js
{
	signer: { id: "0x008c84421dA5527F462886cEc43D2717B686A7e4" },
	sig: "0x76a6278ff8aac2b476bd18b6f15b76bddbd099f91a7c07c5e3e729d90817fefb2fef42318f3879c25ddfc25636ffd27ca0b2ba018c2ea2df4f2390ee8b535fba1c",
	expirationTimestamp: 1699678800000,
	proposer: { id: "0xCA06BdB8b1f677a1C29cbCf9dF69aE76cCEA0E4C" },
	slug: "nouns-house-1---tokyo-jpn",
	proposalIdToUpdate: 0,
	encodedPropHash: "0xa48cc9485d59edd42a0087230c25e04693f2895823766c68c2084f10f6a97074",
	sigDigest: "0xe2588a4308b73dc0eac385550049c05f2eb1857ca755ba2a7117e1d331b1ebfb",
	reason: "Tougher than the Nouns Deli, but..."
}
```

## `UpdateCandidateCostSet`

UpdateCandidateCostSet event data. [Github](https://github.com/nounsDAO/nouns-monorepo/blob/31b2a955a18ca50d95f6517d35c4f97d1261d775/packages/nouns-contracts/contracts/governance/data/NounsDAOData.sol#L304)

-   **oldUpdateCandidateCost**: `bigint | string`. Old update cost.
-   **newUpdateCandidateCost**: `bigint | string`. New update cost.
-   **event**: `Event`. Event meta data.

## `Upgraded`

Upgraded event data. In ABI but not in contract.

-   **implementation**: `Account`. Implementation.
-   **event**: `Event`. Event meta data.

```js
{
	implementation: {
		id: "0x26d6cD86c1F30aD528c67300bD7ACf48F23F9EB6";
	}
}
```

## `CancelTransaction`

[Github](https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L164)

-   **txHash**: `string`. Transaction hash.
-   **target**: `Account`. Transaction target.
-   **value**: `bigint`. Transaction value.
-   **signature**: `string`. Transaction signature.
-   **data**: `string`. Transaction data.
-   **eta**: `bigint`. Transaction eta.
-   **event**: `Event`. Event meta data.

## `ERC20Sent`

[Github](https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L232)

-   **to**: `Account`. Token recipient.
-   **erc20Token**: `Account`. Contract address of token being sent.
-   **amount**: `bigint`. Amount of tokens sent.
-   **success**: `boolean`. Whether the transfer was successful or not.
-   **event**: `Event`. Event meta data.

## `ETHSent`

[Github](https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L220)

-   **to**: `Account`. Eth recipient.
-   **amount**: `bigint`. Eth amount.
-   **success**: `boolean`. Whether the transfer was successful or not.
-   **event**: `Event`. Event meta data.

## `ExecuteTransaction`

[Github](https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L201)

-   **txHash**: `string`. Transaction hash.
-   **target**: `Account`. Transaction target.
-   **value**: `bigint`. Transaction value.
-   **signature**: `string`. Transaction signature.
-   **data**: `string`. Transaction data.
-   **eta**: `bigint`. Transaction eta.
-   **event**: `Event`. Event meta data.

## `NewDelay`

[Github](https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L111)

-   **newDelay**: `bigint`. Delay as a timestamp between 2 to 30 days, indicating when a queued transaction will be executed.
-   **event**: `Event`. Event meta data.

## `QueueTransaction`

[Github](https://github.com/nounsDAO/nouns-monorepo/blob/61d2b50ce82bb060cf4281a55adddf47c5085881/packages/nouns-contracts/contracts/governance/NounsDAOExecutorV2.sol#L148)

-   **txHash**: `string`. Transaction hash.
-   **target**: `Account`. Transaction target.
-   **value**: `bigint`. Transaction value.
-   **signature**: `string`. Transaction signature.
-   **data**: `string`. Transaction data.
-   **eta**: `bigint`. Transaction eta.
-   **event**: `Event`. Event meta data.

## `PaidBackDebt`

[Github](https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/Payer.sol#L139)

-   **account**: `Account`. Account owed debt.
-   **amount**: `bigint`. Amount of debt paid.
-   **remainingDebt**: `bigint`. Remaining debt amount.
-   **event**: `Event`. Event meta data.

## `RegisteredDebt`

[Github](https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/Payer.sol#L233)

-   **account**: `Account`. Account owed debt.
-   **amount**: `bigint`. Amount of debt paid.
-   **event**: `Event`. Event meta data.

## `TokensWithdrawn`

[Github](https://github.com/nounsDAO/token-buyer/blob/1d9cf7a8615084d744ee7112a99846690eec1efa/src/Payer.sol#L122)

-   **account**: `Account`. Payer contract owner address.
-   **amount**: `bigint`. Total amount of tokens withdrawn to the owner.
-   **event**: `Event`. Event meta data.

# NounsNymz Types

Events from the NounsNymz api.

## `NewPost`

NewPost event data.

-   **id**: `string`. Post id.
-   **title**: `string`. Post title. Empty if it is a reply.
-   **body**: `string`. Post body.
-   **timestamp**: `string`. Post UTC timestamp.
-   **userId**: `string`. Poster id.
-   **parentId**: `string`. Parent post id.
-   **depth**: `number`. Number of replies in chain.
-   **upvotes**: `Upvote[]`. List of upvotes.
-   **root**: `RootPost`. Original post if the new post is a reply.
-   **parent**: `ParentPost`. Parent post if the new post is a reply.

# Federation Types

Event types for the Federation GovPool.

## `BidPlaced`

BidPlaced event data. [Github](https://github.com/nounish/federation/blob/6360984278f017f182290facb0dc665c2b7108ad/contracts/src/experimental/delegate-bid.sol#L138)

-   **dao**: `Account`. The address of the DAO.
-   **propId**: `number`. Proposal being bid on.
-   **support**: `number`. The bidder's stance on the proposal. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively).
-   **amount**: `bigint`. The amount bid, in wei.
-   **bidder**: `Account`. The bidder account address.
-   **reason**: `string`. The reason for the bid.

## `VoteCast`

VoteCast event data. [Github](https://github.com/nounish/federation/blob/6360984278f017f182290facb0dc665c2b7108ad/contracts/src/experimental/delegate-bid.sol#L188C1-L188C1)

-   **dao**: `Account`. The address of the DAO.
-   **propId**: `number`. Proposal that Federation is voting on.
-   **support**: `number`. The direction of the vote. 0, 1, or 2 (AGAINST, FOR, or ABSTAIN respectively).
-   **amount**: `bigint`. The winning bid amount, in wei.
-   **bidder**: `Account`. The winning bidder account address.

# Propdates Types

Event types for Propdates contracts.

## `Initialized`

Initialized event data.

-   **version**: `number`. The version number.
-   **event**: `Event`. Event meta data.

## `OwnershipTransferStarted`

OwnershipTransferStarted event data.

-   **previousOwner**: `Account`. Old owner.
-   **newOwner**: `Account`. New owner.
-   **event**: `Event`. Event meta data.

## `OwnershipTransferred`

OwnershipTransferred event data.

-   **previousOwner**: `Account`. Old owner.
-   **newOwner**: `Account`. New owner.
-   **event**: `Event`. Event meta data.

## `PostUpdate`

PostUpdate event data.

-   **propId**: `number`. Proposal being updated.
-   **isCompleted**: `boolean`. Whether the proposal is complete.
-   **update**: `string`. Update description.
-   **event**: `Event`. Event meta data.

## `PropUpdateAdminMigrated`

PropUpdateAdminMigrated event data.

-   **propId**: `number`. Proposal.
-   **oldAdmin**: `Account`. Old admin.
-   **newAdmin**: `Account`. New admin.
-   **event**: `Event`. Event meta data.

## `PropUpdateAdminRecovered`

PropUpdateAdminRecovered event data.

-   **propId**: `number`. Proposal.
-   **oldAdmin**: `Account`. Old admin.
-   **newAdmin**: `Account`. New admin.
-   **event**: `Event`. Event meta data.

## `PropUpdateAdminTransferred`

PropUpdateAdminTransferred event data.

-   **propId**: `number`. Proposal.
-   **oldAdmin**: `Account`. Old admin.
-   **newAdmin**: `Account`. New admin.
-   **event**: `Event`. Event meta data.

## `SuperAdminTransferred`

SuperAdminTransferred event data.

-   **oldSuperAdmin**: `Account`. Old super admin.
-   **newSuperAdmin**: `Account`. New super admin.
-   **event**: `Event`. Event meta data.

## `Upgraded`

Upgraded event data.

-   **implementation**: `Account`. Upgraded implementation address.
-   **event**: `Event`. Event meta data.

# LilNouns Types

Events exclusive to LilNouns contracts.

## `LilNoundersDAOUpdated`

LilNoundersDAOUpdated event data.

-   **lilnoundersDAO**: `Account`. LilNounders DAO.
-   **event**: `Event`. Event meta data.

## `NounsDAOUpdated`

NounsDAOUpdated event data.

-   **nounsDAO**: `Account`. Nouns DAO.
-   **event**: `Event`. Event meta data.

# PropHouse Types

Events exclusive to PropHouse contracts.

## `RoundCreated`

RoundCreated event data.

-   **creator**: `Account`. Round created address.
-   **house**: House information.
    -   **id**: `string`. House address.
    -   **name**: `string | undefined`. House name.
-   **round**: `Account`. Round address.
-   **kind**: `any`.
-   **title**: `string`. Round title.
-   **description**: `string`. Round description.
-   **event**: `Event`. Event meta data.

## `HouseCreated`

HouseCreated event data.

-   **creator**: `Account`. House created address.
-   **house**: `Account`. House address.
-   **kind**: `any`.
-   **event**: `Event`. Event meta data.

## `VoteCast`

VoteCast event data.

-   **voter**: `Account`. Voter address.
-   **round**: Round information.
    -   **id**: `string`. Round address.
    -   **title**: `string`. Round title.
-   **house**: House information.
    -   **id**: `string`. House address.
    -   **name**: `string | undefined`. House name.
-   **proposalTitle**: `string`. Proposal's title
-   **proposalId**: `number`. Proposal id voted for in round.
-   **votingPower**: `string`. Vote amount.
-   **event**: Event meta data.
    -   **createdAt**: `number`. Time the vote was cast in seconds since the unix epoch.
    -   **txHash**: `string`. On-chain vote transaction hash.

## `ProposalSubmitted`

ProposalSubmitted event data.

-   **proposalId**: `number`. Proposal id in round.
-   **proposer**: `Account`. Proposer address.
-   **round**: Round information.
    -   **id**: `string`. Round address.
    -   **title**: `string`. Round title.
-   **house**: House information.
    -   **id**: `string`. House address.
    -   **name**: `string | undefined`. House name.
-   **metaDataURI**: `string`. Proposal meta data.
-   **title**: `string`. The proposal title.
-   **description**: `string`. The proposal description. In HTML format.
-   **isCancelled**: `boolean`. Whether proposal has been cancelled or not.
-   **isWinner**: `boolean`. Whether the proposal won or not.
-   **winningPosition**: `null | any;`. The placement when winning.
-   **votingPower**: `string`. Current votes for this proposal.
-   **event**: Event meta data.
    -   **createdAt**: `number`. Time the proposal was submitted in seconds since the unix epoch.
    -   **txHash**: `string`. On-chain proposal submission transaction hash.

# Farcaster Types

## `NounsCast`

NounsCast event data.

-   **embeds**: `Embed[]`. List of embeds within the cast.
-   **mentions**: `number[]`. User ids mentioned.
-   **mentionsPositions**: `number[]`. Position of mentions.
-   **parentCastId**: `CastId | undefined`. Parent cast id.
-   **parentUrl**: `string | undefined`. Parent url. Used for channels.
-   **text**: `string`. Cast text.
-   **event**: Event meta data.
    -   **hash**: `string`. Cast hash.
    -   **signature**: `string`. Signature.
    -   **signer**: `string`. Signer.
    -   **fid**: `number`. User id.
    -   **network**: `string`. Network.
    -   **timestamp**: `number`. Timestamp. Order of the casts. Does not convert to actual time.
    -   **type**: `string`. Event type.

### `CastId`

Data used in the NounsCast event.

-   **fid**: `number`. User id.
-   **hash**: `string`. Cast hash

### `Embed`

Data used in the NounsCast event.

-   **url**: `string`. Embed URL.
-   **castId**: `CastId | undefined`. Cast id embedded.

# Snapshot Types

## `Proposal`

Snapshot Proposal object.

-   **id**: `string`. The unique ID for the proposal.
-   **title**: `string`. Proposal's title.
-   **body**: `string`. Proposal's body.
-   **choices**: `string[]`. Voting choices available in proposal.
-   **startTime**: `number`. Proposal voting start time, in seconds since unix epoch.
-   **endTime**: `number`. Proposal voting end time, in seconds since unix epoch.
-   **createdTime**: `number`. The time at which the proposal was created, in seconds since unix epoch.
-   **snapshot**: `string`. Ethereum block number when the voting power snapshot was taken.
-   **state**: `"pending" | "active" | "closed"`. Proposal's current state.
-   **author**: `Account`. Proposer's wallet.
-   **quorum**: `number`. Proposal's quorum.
-   **scores**: `number[]`. Proposal's scores for each choice.
-   **votes**: `number`. Total number of votes cast (different from the total score). The number of unique voters.
-   **space**: The Snapshot space the proposal is a part of.
    -   **id**: `string`. The space id. An ENS.
    -   **name**: `string`. The space name.

## `Vote`

Snapshot Vote object.

-   **id**: `string`. Unique vote ID.
-   **voter**: `Account`. Voter wallet address.
-   **votingPower**: `number`. Voter voting power. Is based on the voting strategy used.
-   **created**: `number`. The time the vote was cast, in seconds since unix epoch.
-   **choice**: `number`. Which proposal choice was selected. This is the associated index number. 0 based.
-   **reason**: `string`. Reason for the vote.
-   **space**: The Snapshot space the proposal voted on is a part of.
    -   **id**: `string`. The space id. An ENS.
    -   **name**: `string`. The space name.
-   **proposal**: The proposal being voted on.
    -   **id**: `string`. The unique ID for the proposal.
    -   **title**: `string`. Proposal's title.
    -   **choices**: `string[]`. Voting choices available in proposal.
    -   **quorum**: `number`. Proposal's quorum.
    -   **scores**: `number[]`. Proposal's scores for each choice.
    -   **votes**: `number`. Total number of votes cast (different from the total score). The number of unique voters.
