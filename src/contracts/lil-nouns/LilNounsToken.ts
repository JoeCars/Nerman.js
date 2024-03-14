import { N, ethers } from "ethers-v6";
import { NounsTokenSeed, Account, EventData } from "../../types";
import { default as LilNounsTokenABI } from "../abis/lil-nouns/NounsToken.json";

export interface SupportedEventMap {
	Approval: EventData.Approval;
	ApprovalForAll: EventData.ApprovalForAll;
	DelegateChanged: EventData.DelegateChanged;
	DelegateVotesChanged: EventData.DelegateVotesChanged;
	DescriptorLocked: EventData.DescriptorLocked;
	DescriptorUpdated: EventData.DescriptorUpdated;
	LilNoundersDAOUpdated: EventData.LilNouns.LilNoundersDAOUpdated;
	MinterLocked: EventData.MinterLocked;
	MinterUpdated: EventData.MinterUpdated;
	NounBurned: EventData.NounBurned;
	NounCreated: EventData.NounCreated;
	NounsDAOUpdated: EventData.LilNouns.NounsDAOUpdated;
	OwnershipTransferred: EventData.OwnershipTransferred;
	SeederLocked: EventData.SeederLocked;
	SeederUpdated: EventData.SeederUpdated;
	Transfer: EventData.Transfer;
}
const SUPPORTED_LIL_NOUNS_TOKEN_EVENTS = [
	"Approval",
	"ApprovalForAll",
	"DelegateChanged",
	"DelegateVotesChanged",
	"DescriptorLocked",
	"DescriptorUpdated",
	"LilNoundersDAOUpdated",
	"MinterLocked",
	"MinterUpdated",
	"NounBurned",
	"NounCreated",
	"NounsDAOUpdated",
	"OwnershipTransferred",
	"SeederLocked",
	"SeederUpdated",
	"Transfer"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper around the LilNounsToken governance contract.
 */
export class LilNounsToken {
	public provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_LIL_NOUNS_TOKEN_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this.Contract = new ethers.Contract("0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B", LilNounsTokenABI, this.provider);
		this.registeredListeners = new Map();
	}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The name of the event.
	 * @param listener The listener function.
	 * @example
	 * lilNounsToken.on('NounCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "Approval":
				this.Contract.on("Approval", (owner: string, approved: string, tokenId: BigInt, event: ethers.Log) => {
					const data: EventData.Approval = {
						owner: { id: owner } as Account,
						approved: { id: approved } as Account,
						tokenId: Number(tokenId),
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ApprovalForAll":
				this.Contract.on("ApprovalForAll", (owner: string, operator: string, approved: boolean, event: ethers.Log) => {
					const data: EventData.ApprovalForAll = {
						owner: { id: owner } as Account,
						operator: { id: operator } as Account,
						approved: approved,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "DelegateChanged":
				this.Contract.on(
					"DelegateChanged",
					async (delegator: string, fromDelegate: string, toDelegate: string, event: ethers.Log) => {
						let numOfVotesChanged = 0;
						try {
							const receipt = await event.getTransactionReceipt();
							if (receipt.logs[1]) {
								// Removes '0x'
								const hexData = receipt.logs[1].data.substring(2);
								const hex1 = hexData.substring(0, 64);
								const hex2 = hexData.substring(64);
								const oldVotes = parseInt(hex1, 16);
								const newVotes = parseInt(hex2, 16);

								numOfVotesChanged = Math.abs(oldVotes - newVotes);
							}
						} catch (error) {
							console.error("Unable to retrieve vote change information.", error);
						}
						const data: EventData.DelegateChanged = {
							delegator: { id: delegator } as Account,
							fromDelegate: { id: fromDelegate } as Account,
							toDelegate: { id: toDelegate } as Account,
							numOfVotesChanged,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "DelegateVotesChanged":
				this.Contract.on(
					"DelegateVotesChanged",
					(delegate: string, previousBalance: BigInt, newBalance: BigInt, event: ethers.Log) => {
						const data: EventData.DelegateVotesChanged = {
							delegate: { id: delegate } as Account,
							previousBalance: previousBalance,
							newBalance: newBalance,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "DescriptorLocked":
				this.Contract.on("DescriptorLocked", (event: ethers.Log) => {
					const data: EventData.DescriptorLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "DescriptorUpdated":
				this.Contract.on("DescriptorUpdated", (_descriptor: string, event: ethers.Log) => {
					const data: EventData.DescriptorUpdated = {
						descriptor: { id: _descriptor } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "LilNoundersDAOUpdated":
				this.Contract.on("LilNoundersDAOUpdated", (lilnoundersDAO: string, event: ethers.Log) => {
					const data: EventData.LilNouns.LilNoundersDAOUpdated = {
						lilnoundersDAO: { id: lilnoundersDAO } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "MinterLocked":
				this.Contract.on("MinterLocked", (event: ethers.Log) => {
					const data: EventData.MinterLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "MinterUpdated":
				this.Contract.on("MinterUpdated", (_minter: string, event: ethers.Log) => {
					const data: EventData.MinterUpdated = {
						minter: { id: _minter } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NounBurned":
				this.Contract.on("NounBurned", (nounId: BigInt, event: ethers.Log) => {
					const data: EventData.NounBurned = {
						id: Number(nounId),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NounCreated":
				this.Contract.on(
					"NounCreated",
					(
						tokenId: BigInt,
						seed: { accessory: BigInt; background: BigInt; body: BigInt; glasses: BigInt; head: BigInt },
						event: ethers.Log
					) => {
						const convertedSeed: NounsTokenSeed = {
							accessory: Number(seed.accessory),
							background: Number(seed.background),
							body: Number(seed.body),
							glasses: Number(seed.glasses),
							head: Number(seed.head)
						};

						const data: EventData.NounCreated = {
							id: Number(tokenId),
							seed: convertedSeed,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "NounsDAOUpdated":
				this.Contract.on("NounsDAOUpdated", (nounsDAO: string, event: ethers.Log) => {
					const data: EventData.LilNouns.NounsDAOUpdated = {
						nounsDAO: { id: nounsDAO } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.Contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Log) => {
					const data: EventData.OwnershipTransferred = {
						previousOwner: { id: previousOwner } as Account,
						newOwner: { id: newOwner } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "SeederLocked":
				this.Contract.on("SeederLocked", (event: ethers.Log) => {
					const data: EventData.SeederLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "SeederUpdated":
				this.Contract.on("SeederUpdated", (_seeder: string, event: ethers.Log) => {
					const data: EventData.SeederUpdated = {
						seeder: { id: _seeder } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Transfer":
				this.Contract.on("Transfer", (from: string, to: string, tokenId: BigInt, event: ethers.Log) => {
					const data: EventData.Transfer = {
						from: { id: from } as Account,
						to: { id: to } as Account,
						tokenId: Number(tokenId),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes an event listener.
	 * @param eventName the event name.
	 * @example
	 * lilNounsToken.off('NounCreated');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if there is no assigned listener.
	 * @param eventName the event name.
	 * @param data the event data.
	 * @example
	 * lilNounsToken.trigger('NounCreated', {
	 * 	id: 420,
	 * 	seed: {
	 * 		background: 0,
	 * 		body: 0,
	 * 		accessory: 0,
	 * 		head: 0,
	 * 		glasses: 0
	 * 	}
	 * });
	 */
	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * @returns The name of the contract. `LilNounsToken`.
	 */
	public name() {
		return "LilNounsToken";
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return LilNounsToken.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
