import { ethers } from "ethers";
import NounsPool from "../abis/federation/NounsPool";
import NounsPoolV2 from "../abis/federation/NounsPoolV2";
import { EventData } from "../../types";

export class FederationNounsPool {
	provider: ethers.providers.JsonRpcProvider;
	nounsPoolContractV1: ethers.Contract;
	nounsPoolContractV2: ethers.Contract;
	registeredListeners: Map<string, ethers.providers.Listener>;

	constructor(jsonRpcUrl: string) {
		this.provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
		this.provider.pollingInterval = 30000;
		this.nounsPoolContractV1 = new ethers.Contract("0xBE5E6De0d0Ac82b087bAaA1d53F145a52EfE1642", NounsPool, this.provider);
		this.nounsPoolContractV2 = new ethers.Contract(
			"0x0f722d69B3D8C292E85F2b1E5D9F4439edd58F1e",
			NounsPoolV2,
			this.provider
		);
		this.registeredListeners = new Map();
	}

	on(event: string, listener: ethers.providers.Listener) {
		if (event === "BidPlaced") {
			this.nounsPoolContractV1.on(event, (dao, propId, support, amount, bidder) => {
				listener({ dao, propId, support, amount, bidder });
			});
			this.nounsPoolContractV2.on(event, (dao, propId, support, amount, bidder, reason?) => {
				listener({ dao, propId, support, amount, bidder, reason });
			});
		} else if (event === "VoteCast") {
			this.nounsPoolContractV1.on(event, (dao, propId, support, amount, bidder) => {
				listener({ dao, propId, support, amount, bidder });
			});
			this.nounsPoolContractV2.on(event, (dao, propId, support, amount, bidder) => {
				listener({ dao, propId, support, amount, bidder });
			});
		}

		this.registeredListeners.set(event, listener);
	}

	off(event: string) {
		const listener = this.registeredListeners.get(event);
		if (listener) {
			this.nounsPoolContractV1.off(event, listener);
			this.nounsPoolContractV2.off(event, listener);
		}

		this.registeredListeners.delete(event);
	}

	trigger(event: string, data: unknown) {
		const listener = this.registeredListeners.get(event);
		if (listener) {
			listener(data);
		}
	}
}
