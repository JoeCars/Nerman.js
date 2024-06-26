# Contract Wrappers

The contract wrappers provided by Nerman.js currently support basic event listening. You can interact with these events using the following functions on each wrapper.

### `constructor()`

-   **provider**: `string | ethers.JsonRpcProvider`. Our wrappers can handle providers behind the scene, so you only need to provide a JSON RPC URL from your preferred provider (like Alchemy) to make them work. We also offer the ability to pass in your own provider, giving you flexibility when needed.

```js
import * as nerman from "nerman";

const nouns = new nerman.Nouns("<JSON_RPC_URL>");
```

### `on()`

Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain. Throws an error if the event is not supported.

-   **eventName**: `string`. The name of the event.
-   **listener**: `Function`. The listener function.

```js
nouns.on("NounCreated", (data) => {
	console.log(data.id);
});
```

### `off()`

Removes any assigned listeners from the event. Does nothing if there was no listener.

-   **eventName**: `string`. The event name.

```js
nouns.off("NounCreated");
```

### `trigger()`

Triggers the listener of the given event with the given data. Throws an error if there is no listener assigned.

-   **eventName**: `string`. The event name.
-   **data**: `unknown`. The event data.

```js
nouns.trigger("NounCreated", {
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

# ERC20

<table>
	<tr>
		<th> Contract </th>
		<th> Address </th>
	</tr>
	<tr>
		<td> stETH </td>
		<td> 
			<a href="https://etherscan.io/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84">
				0xae7ab96520de3a18e5e111b5eaab095312d7fe84
			</a>
		</td>
	</tr>
	<tr>
		<td> rETH </td>
		<td> 
			<a href="https://etherscan.io/token/0xae78736cd615f374d3085123a210448e74fc6393">
				0xae78736cd615f374d3085123a210448e74fc6393
			</a>
		</td>
	</tr>
	<tr>
		<td> WETH </td>
		<td> 
			<a href="https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2">
				0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
			</a>
		</td>
	</tr>
	<tr>
		<td> USDC </td>
		<td> 
			<a href="https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48">
				0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
			</a>
		</td>
	</tr>
	<tr>
		<td> wstETH </td>
		<td> 
			<a href="https://etherscan.io/token/0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0">
				0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0
			</a>
		</td>
	</tr>
</table>

# Nouns

<table>
	<tr>
		<th> Contract </th>
		<th> Address </th>
		<th> Notes </th>
	</tr>
	<tr>
		<td> Treasury / Executor </td>
		<td> 
			<a href="https://etherscan.io/address/0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71">
				0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71
			</a>
		</td>
	</tr>
	<tr>
		<td> TokenBuyer </td>
		<td> 
			<a href="https://etherscan.io/address/0x4f2aCdc74f6941390d9b1804faBc3E780388cfe5">
				0x4f2aCdc74f6941390d9b1804faBc3E780388cfe5
			</a>
		</td>
	</tr>
	<tr>
		<td> Payer </td>
		<td> 
			<a href="https://etherscan.io/address/0xd97Bcd9f47cEe35c0a9ec1dc40C1269afc9E8E1D">
				0xd97Bcd9f47cEe35c0a9ec1dc40C1269afc9E8E1D
			</a>
		</td>
	</tr>
	<tr>
		<td> AuctionHouseV2 </td>
		<td> 
			<a href="https://etherscan.io/address/0x830BD73E4184ceF73443C15111a1DF14e495C706">
				0x830BD73E4184ceF73443C15111a1DF14e495C706
			</a>
		</td>
		<td>
			Change to V2 with Proposal 532, executed on block 
			<a href = "https://etherscan.io/tx/0xd5ff1526564cf3713bcfa00f0462a3157a9a07f4b2446ec20c3f2d086943ad4c"> 			19810422 
			</a>
		</td>
	</tr>
	<tr>
		<td> LogicV4 </td>
		<td> 
			<a href="https://etherscan.io/address/0x6f3E6272A167e8AcCb32072d08E0957F9c79223d">
				0x6f3E6272A167e8AcCb32072d08E0957F9c79223d
			</a>
		</td>
		<td>
			Change to V4 with Proposal 532, executed on block
			<a href = "https://etherscan.io/tx/0xd5ff1526564cf3713bcfa00f0462a3157a9a07f4b2446ec20c3f2d086943ad4c"> 			19810422 
			</a>
		</td>
	</tr>
</table>

For more details, check out our [contracts page](https://nouns.biz/nouns-dao-contracts/) and the [Nouns Contracts Readme](https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/README.md).

# Propdates

A contract that handles posting updates.

<table>
	<tr>
		<th> Version </th>
		<th> Address </th>
		<th> Note </th>
	</tr>
	<tr>
		<td> V1 </td>
		<td> 
			<a href="https://etherscan.io/address/0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1">
				0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1
			</a>
		</td>
	</tr>
	<tr>
		<td> V2 </td>
		<td> 
			<a href="https://etherscan.io/address/0xa5Bf9A9b8f60CFD98b1cCB592f2F9F37Bb0033a4">
				0xa5Bf9A9b8f60CFD98b1cCB592f2F9F37Bb0033a4
			</a>
		</td>
		<td>
			Updated to V2 on block 18689732. 01-Dec-2023.
		</td>
	</tr>
</table>

# Nouns Forks

Each fork has its own unique addresses for its treasury, token, auction, and logic contracts. These deployed contracts can be found in the [Nouns Fork Deployer Contract events](https://etherscan.io/address/0xcd65e61f70e0b1aa433ca1d9a6fc2332e9e73ce3#events).

There do not appear to be any auction proxies at the moment, and there are no triggered auction events.

<table>
	<tr>
		<th> Fork </th>
		<th> Contract </th>
		<th> Address </th>
	<tr>
	<tr>
		<td rowspan=4> 0 </td>
		<td> Token </td> 
		<td> <a href="https://etherscan.io/address/0x06cF70f6f90E0B1f17d19F3Cb962A39E505D5b3f"> 
			0x06cF70f6f90E0B1f17d19F3Cb962A39E505D5b3f 
		</a> </td>
	</tr>
	<tr>
		<td> Auction </td> 
		<td> <a href="https://etherscan.io/address/0xd5c122b40823e467bc6e3c859cb530b105cae22e"> 
			0xd5c122b40823e467bc6e3c859cb530b105cae22e 
		</a> </td>
	</tr>
	<tr>
		<td> Logic </td> 
		<td> <a href="https://etherscan.io/address/0xa30e1fbb8e1b5d6487e9f3dda55df05e225f82b6"> 
			0xa30e1fbb8e1b5d6487e9f3dda55df05e225f82b6
		 </a> </td>
	</tr>
	<tr>
		<td> Treasury </td> 
		<td> <a href="https://etherscan.io/address/0x55dd565c6f94b3bad1f4a35398af4a526fcd465f"> 0x55dd565c6f94b3bad1f4a35398af4a526fcd465f</a> </td>
	</tr>
	<tr>
		<td rowspan=4> 1 </td>
		<td> Token </td> 
		<td> <a href="https://etherscan.io/address/0xd6473f1d7c07dc08983a7f09f59c1a2aba17be41"> 0xd6473f1d7c07dc08983a7f09f59c1a2aba17be41 </a> </td>
	</tr>
	<tr>
		<td> Auction </td> 
		<td> <a href="https://etherscan.io/address/0xb350beda0210fae7a179809fb0ae0ecd565164b0"> 0xb350beda0210fae7a179809fb0ae0ecd565164b0 </a> </td>
	</tr>
	<tr>
		<td> Logic </td> 
		<td> <a href="https://etherscan.io/address/0x5b8dd9f30425a7e6942c2ecf1d87acafbeab3073"> 0x5b8dd9f30425a7e6942c2ecf1d87acafbeab3073 </a> </td>
	</tr>
	<tr>
		<td> Treasury </td> 
		<td> <a href="https://etherscan.io/address/0x6a4c7cada167a0da8b0323dcc3f0083ac5706817"> 0x6a4c7cada167a0da8b0323dcc3f0083ac5706817</a> </td>
	</tr>
	<tr>
		<td rowspan=4> 2 </td>
		<td> Token </td> 
		<td> <a href="https://etherscan.io/address/0xd7bf9e2c54d07582004782004ed20d0336d52669"> 0xd7bf9e2c54d07582004782004ed20d0336d52669 </a> </td>
	</tr>
	<tr>
		<td> Auction </td> 
		<td> <a href="https://etherscan.io/address/0xd5d4c3863c320bc9f5fe9ee0d3da6f7b214449ef"> 0xd5d4c3863c320bc9f5fe9ee0d3da6f7b214449ef </a> </td>
	</tr>
	<tr>
		<td> Logic </td> 
		<td> <a href="https://etherscan.io/address/0xcf8b3ce9e92990a689fbdc886585a84ea0e4aece"> 0xcf8b3ce9e92990a689fbdc886585a84ea0e4aece</a> </td>
	</tr>
	<tr>
		<td> Treasury </td> 
		<td> <a href="https://etherscan.io/address/0x4e2d32da6ea31cbdd96e14c34bf8141c15902e06"> 0x4e2d32da6ea31cbdd96e14c34bf8141c15902e06</a> </td>
	</tr>

</table>

# Federation

Federation Nouns Pool contracts. V1 is no longer in use.

<table>
	<tr>
		<th> Version </th>
		<th> Address </th>
	</tr>
	<tr>
		<td> V1 </td>
		<td> 
			<a href="https://etherscan.io/address/0xBE5E6De0d0Ac82b087bAaA1d53F145a52EfE1642">
				0xBE5E6De0d0Ac82b087bAaA1d53F145a52EfE1642
			</a>
		</td>
	</tr>
	<tr>
		<td> V2 </td>
		<td> 
			<a href="https://etherscan.io/address/0x0f722d69B3D8C292E85F2b1E5D9F4439edd58F1e">
				0x0f722d69B3D8C292E85F2b1E5D9F4439edd58F1e
			</a>
		</td>
	</tr>
</table>
