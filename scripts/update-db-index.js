require("dotenv").config();
const mongoose = require("mongoose");
const { DatabaseIndexer } = require("../lib/index");

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("beginning");
		const indexer = new DatabaseIndexer(process.env.ALCHEMY_URL);
		return indexer.index(
			"QueueTransaction",
			"NewDelay",
			"ExecuteTransaction",
			"ETHSent",
			"ERC20Sent",
			"CancelTransaction",
			"VoteCast"
		);
	})
	.then(() => {
		console.log("done");
	})
	.catch((err) => {
		console.error(err);
	});
