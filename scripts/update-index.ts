import { Indexer } from "../src/index";
import { ethers } from "ethers";
import { join } from "path";

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
const indexer = new Indexer(provider, join(__dirname, "..", "src", "data", "indexer"));
indexer.updateAll();
