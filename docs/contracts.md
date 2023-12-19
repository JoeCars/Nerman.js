# Contract Wrappers

The contract wrappers provided by Nerman.js currently support basic event listening. You can interact with these events using the following functions on each wrapper.

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

## Propdates

A contract that handles posting updates.

The previous contract address was `0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1`.
Moved to `0xa5Bf9A9b8f60CFD98b1cCB592f2F9F37Bb0033a4` on block `18689732` (01-Dec-2023) with the launch of PropdatesV2.
