import { ethers } from "ethers";
import { Account, EventData } from "../../types";
import { default as PropdatesABI } from "./PropdatesABI.json";

export class _Propdates {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<string, Function>;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract("0x94b4fb16893C0Fb4E470eEf2559C24FD87FEd5F1", PropdatesABI, this.provider);
		this.registeredListeners = new Map();
	}

	public async on(eventType: string, listener: Function) {
		switch (eventType) {
			case "PostUpdate":
				this.Contract.on("PostUpdate", (propId: number, isCompleted: boolean, update: string, event: ethers.Event) => {
					const data: EventData.Propdates.PostUpdate = {
						propId: Number(propId),
						isCompleted: isCompleted,
						update: update,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "PropUpdateAdminTransferStarted":
				this.Contract.on(
					"PropUpdateAdminTransferStarted",
					(propId: number, oldAdmin: string, newAdmin: string, event: ethers.Event) => {
						const data: EventData.Propdates.PropUpdateAdminTransferStarted = {
							propId: propId,
							oldAdmin: { id: oldAdmin } as Account,
							newAdmin: { id: newAdmin } as Account,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "PropUpdateAdminTransfered":
				this.Contract.on(
					"PropUpdateAdminTransfered",
					(propId: number, oldAdmin: string, newAdmin: string, event: ethers.Event) => {
						const data: EventData.Propdates.PropUpdateAdminTransfered = {
							propId: propId,
							oldAdmin: { id: oldAdmin } as Account,
							newAdmin: { id: newAdmin } as Account,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			default:
				throw new Error(`${eventType} is not supported. Please use a different event.`);
		}
	}

	public trigger(eventType: string, data: unknown) {
		const listener = this.registeredListeners.get(eventType);
		if (!listener) {
			throw new Error(`${eventType} does not have a listener.`);
		}

		listener(data);
	}
}
