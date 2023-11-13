# IndexerWriter
A class that takes event data from on-chain and writes them to files.

### `constructor()`

*   **provider**: `ethers.providers.JsonRpcProvider`. Provider uses to create wrappers.
*   **path**: `string`. Directory path to indexer directory, where all files will be stored.

### `index()`
Stores all event data from the starting block for nouns to the present.

*   **event**: `string`. The event name.

### `listen()`

Assigns a listener to the contract event, updating the index whenever the event is triggered on-chain. If the file does not already exist, it will create it.

*   **event**: `string`. The event name.

### `update()`

Updates already existing event index. Uses the most recently indexed block number of the event to append more recent events.

*   **event**: `string`. The event name.

### `indexAll()`

Stores all event data from the starting block for nouns to the present. Does this for all events.

### `listenAll()`

Assigns a listener to all contract events, updating the index whenever the event is triggered on-chain.

### `updateAll()`

Updates already existing event index. Uses the most recently indexed block number of the event to append more recent events. Creates new files for unindexed events.
Does this for all events.