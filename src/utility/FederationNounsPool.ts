import { ethers } from "ethers";
import NounsPool from "../contracts/Federation/NounsPool";
import NounsPoolV2 from "../contracts/Federation/NounsPoolV2";
import { EventData } from "../types";

class FederationNounsPool {
	provider: ethers.providers.WebSocketProvider;
	nounsPoolContractV1: ethers.Contract;
	nounsPoolContractV2: ethers.Contract;

	constructor(jsonRpcToken: string) {
		this.provider = new ethers.providers.WebSocketProvider(jsonRpcToken);
		this.nounsPoolContractV1 = new ethers.Contract("0xBE5E6De0d0Ac82b087bAaA1d53F145a52EfE1642", NounsPool, this.provider);
		this.nounsPoolContractV2 = new ethers.Contract(
			"0x0f722d69B3D8C292E85F2b1E5D9F4439edd58F1e",
			NounsPoolV2,
			this.provider
		);
	}

	on(event: string, listener: (data: unknown) => void) {
		this.nounsPoolContractV1.on(event, listener);
		this.nounsPoolContractV2.on(event, listener);
	}
}
