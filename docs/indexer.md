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
