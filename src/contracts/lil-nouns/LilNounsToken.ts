import { ethers } from "ethers";
import { NounsTokenSeed, Account, EventData } from "../../types";
import { default as LilNounsTokenABI } from "../abis/lil-nouns/NounsToken.json";
import { SUPPORTED_NOUNS_TOKEN_EVENTS } from "../../constants"; // Contract is identical, so using the same constant.

/**
 * A wrapper around the LilNounsToken governance contract.
 */
export class LilNounsToken {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public supportedEvents: string[];
	public registeredListeners: Map<string, Function>;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract("0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B", LilNounsTokenABI, this.provider);
		this.supportedEvents = SUPPORTED_NOUNS_TOKEN_EVENTS;
		this.registeredListeners = new Map();
	}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventType The name of the event.
	 * @param listener The listener function.
	 * @example
	 * lilNounsToken.on('NounCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on(eventType: string, listener: Function) {
		switch (eventType) {
			case "Approval":
				this.Contract.on("Approval", (owner: string, approved: string, tokenId: number, event: ethers.Event) => {
					const data: EventData.Approval = {
						owner: { id: owner } as Account,
						approved: { id: approved } as Account,
						tokenId: tokenId,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "ApprovalForAll":
				this.Contract.on(
					"ApprovalForAll",
					(owner: string, operator: string, approved: boolean, event: ethers.Event) => {
						const data: EventData.ApprovalForAll = {
							owner: { id: owner } as Account,
							operator: { id: operator } as Account,
							approved: approved,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "DelegateChanged":
				this.Contract.on(
					"DelegateChanged",
					(delegator: string, fromDelegate: string, toDelegate: string, event: ethers.Event) => {
						const data: EventData.DelegateChanged = {
							delegator: { id: delegator } as Account,
							fromDelegate: { id: fromDelegate } as Account,
							toDelegate: { id: toDelegate } as Account,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "DelegateVotesChanged":
				this.Contract.on(
					"DelegateVotesChanged",
					(delegate: string, previousBalance: number, newBalance: number, event: ethers.Event) => {
						const data: EventData.DelegateVotesChanged = {
							delegate: { id: delegate } as Account,
							previousBalance: previousBalance,
							newBalance: newBalance,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "DescriptorLocked":
				this.Contract.on("DescriptorLocked", (event: ethers.Event) => {
					const data: EventData.DescriptorLocked = {
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "DescriptorUpdated":
				this.Contract.on("DescriptorUpdated", (_descriptor: string, event: ethers.Event) => {
					const data: EventData.DescriptorUpdated = {
						descriptor: { id: _descriptor } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "LilNoundersDAOUpdated":
				this.Contract.on("LilNoundersDAOUpdated", (lilnoundersDAO: string, event: ethers.Event) => {
					const data: EventData.LilNouns.LilNoundersDAOUpdated = {
						lilnoundersDAO: { id: lilnoundersDAO } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "MinterLocked":
				this.Contract.on("MinterLocked", (event: ethers.Event) => {
					const data: EventData.MinterLocked = {
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "MinterUpdated":
				this.Contract.on("MinterUpdated", (_minter: string, event: ethers.Event) => {
					const data: EventData.MinterUpdated = {
						minter: { id: _minter } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "NounBurned":
				this.Contract.on("NounBurned", (nounId: number, event: ethers.Event) => {
					const data: EventData.NounBurned = {
						id: nounId,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "NounCreated":
				this.Contract.on("NounCreated", (tokenId: number, seed: NounsTokenSeed, event: ethers.Event) => {
					const data: EventData.NounCreated = {
						id: tokenId,
						seed: seed,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "NounsDAOUpdated":
				this.Contract.on("NounsDAOUpdated", (nounsDAO: string, event: ethers.Event) => {
					const data: EventData.LilNouns.NounsDAOUpdated = {
						nounsDAO: { id: nounsDAO } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "OwnershipTransferred":
				this.Contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Event) => {
					const data: EventData.OwnershipTransferred = {
						previousOwner: { id: previousOwner } as Account,
						newOwner: { id: newOwner } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "SeederLocked":
				this.Contract.on("SeederLocked", (event: ethers.Event) => {
					const data: EventData.SeederLocked = {
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "SeederUpdated":
				this.Contract.on("SeederUpdated", (_seeder: string, event: ethers.Event) => {
					const data: EventData.SeederUpdated = {
						seeder: { id: _seeder } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "Transfer":
				this.Contract.on("Transfer", (from: string, to: string, tokenId: number, event: ethers.Event) => {
					const data: EventData.Transfer = {
						from: { id: from } as Account,
						to: { id: to } as Account,
						tokenId: tokenId,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			default:
				throw new Error(`${eventType} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes an event listener.
	 * @param eventName the event name.
	 */
	public off(eventName: string) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.providers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if there is no assigned listener.
	 * @param eventType the event name.
	 * @param data the event data.
	 */
	public trigger(eventType: string, data: unknown) {
		const listener = this.registeredListeners.get(eventType);
		if (!listener) {
			throw new Error(`${eventType} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * @returns The name of the contract. `LilNounsToken`.
	 */
	public name() {
		return "LilNounsToken";
	}
}
