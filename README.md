# Nerman.js

[![NPM Version](https://img.shields.io/npm/v/nerman.svg?style=flat)]()

Nerman.js is a JavaScript/TypeScript wrapper for Nouns projects like the Nouns DAO, LilNouns DAO, Propdates, and more. Our goal is to create an intuitive toolkit to interact with these contracts, lowering the barrier of entry to this community, and enabling developer creativity.

If there's a Nouns project you think should be a part of Nerman.js, feel free to open an issue so we can add support.

## Installation

Ensure you have `npm` installed and are in a node project.

```
npm install --save nerman
```

## Examples

To use Nerman.js, you will need a `JSON_RPC_URL` from a blockchain development platform like [Alchemy](https://www.alchemy.com/).

To listen to an on-chain vote event for Nouns DAO, write the following:

```ts
import * as nerman from "nerman";

const nouns = new nerman.Nouns("<JSON_RPC_URL>");

nouns.on("VoteCast", (vote: nerman.EventData.VoteCast) => {
	console.log(
		"NounsDAO | VoteCast | id:" +
			vote.proposalId +
			",  voter: " +
			vote.voter.id +
			", votes: " +
			vote.votes +
			" , supportDetailed: " +
			vote.supportDetailed +
			", reason: " +
			vote.reason
	);
});
```

For more details on events, see: [Event Types](./docs/types.md).

For more details on contract wrappers, see: [Contracts](./docs//contracts.md).

## License

Nerman.js is distributed under an [MIT](./LICENSE) license.

## Contribution

Nerman.js is currently not open to contribution.

If you have any suggestions or experience any bugs, please feel free to open a Github issue. We are always eager to better support the Nouns community.
