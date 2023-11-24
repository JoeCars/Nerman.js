const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");

async function convertDAOWithdrawNounsFromEscrow() {
	const path = join(__dirname, "..", "src", "data", "indexer", "DAOWithdrawNounsFromEscrow.json");
	const file = await readFile(path);
	const data = JSON.parse(file);
	const events = data.events;

	events.forEach((event) => {
		event.tokenIds = event.tokenIds.map((tokenId) => {
			if (typeof tokenId === "number") {
				return tokenId;
			}

			return parseInt(tokenId.hex);
		});
	});

	writeFile(path, JSON.stringify(data));
}

async function convertEscrowedToFork() {
	const path = join(__dirname, "..", "src", "data", "indexer", "EscrowedToFork.json");
	const file = await readFile(path);
	const data = JSON.parse(file);
	const events = data.events;

	events.forEach((event) => {
		event.tokenIds = event.tokenIds.map((tokenId) => {
			if (typeof tokenId === "number") {
				return tokenId;
			}

			return parseInt(tokenId.hex);
		});

		event.proposalIds = event.proposalIds.map((proposalId) => {
			if (typeof proposalId === "number") {
				return proposalId;
			}

			return parseInt(proposalId.hex);
		});
	});

	writeFile(path, JSON.stringify(data));
}

async function convertExecuteFork() {
	const path = join(__dirname, "..", "src", "data", "indexer", "ExecuteFork.json");
	const file = await readFile(path);
	const data = JSON.parse(file);
	const events = data.events;

	events.forEach((event) => {
		if (typeof event.forkEndTimestamp === "object") {
			event.forkEndTimestamp = parseInt(event.forkEndTimestamp.hex);
		}

		if (typeof event.tokensInEscrow === "object") {
			event.tokensInEscrow = parseInt(event.tokensInEscrow.hex);
		}
	});

	writeFile(path, JSON.stringify(data));
}

async function convertForkPeriodSet() {
	const path = join(__dirname, "..", "src", "data", "indexer", "ForkPeriodSet.json");
	const file = await readFile(path);
	const data = JSON.parse(file);
	const events = data.events;

	events.forEach((event) => {
		if (typeof event.oldForkPeriod === "object") {
			event.oldForkPeriod = parseInt(event.oldForkPeriod.hex);
		}

		if (typeof event.newForkPeriod === "object") {
			event.newForkPeriod = parseInt(event.newForkPeriod.hex);
		}
	});

	writeFile(path, JSON.stringify(data));
}

async function convertForkThresholdSet() {
	const path = join(__dirname, "..", "src", "data", "indexer", "ForkThresholdSet.json");
	const file = await readFile(path);
	const data = JSON.parse(file);
	const events = data.events;

	events.forEach((event) => {
		if (typeof event.oldForkThreshold === "object") {
			event.oldForkThreshold = parseInt(event.oldForkThreshold.hex);
		}

		if (typeof event.newForkThreshold === "object") {
			event.newForkThreshold = parseInt(event.newForkThreshold.hex);
		}
	});

	writeFile(path, JSON.stringify(data));
}

async function convertJoinFork() {
	const path = join(__dirname, "..", "src", "data", "indexer", "JoinFork.json");
	const file = await readFile(path);
	const data = JSON.parse(file);
	const events = data.events;

	events.forEach((event) => {
		event.tokenIds = event.tokenIds.map((tokenId) => {
			if (typeof tokenId === "number") {
				return tokenId;
			}

			return parseInt(tokenId.hex);
		});

		event.proposalIds = event.proposalIds.map((proposalId) => {
			if (typeof proposalId === "number") {
				return proposalId;
			}

			return parseInt(proposalId.hex);
		});
	});

	writeFile(path, JSON.stringify(data));
}

async function convertAllEvents() {
	await convertDAOWithdrawNounsFromEscrow();
	await convertEscrowedToFork();
	await convertExecuteFork();
	await convertForkPeriodSet();
	await convertForkThresholdSet();
	await convertJoinFork();
}

convertAllEvents();