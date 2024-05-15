import { ethers } from "ethers-v6";
import { NounsTokenSeed, Account, EventData } from "../../types";
import { createOrReturnProvider } from "../../utilities/providers";
import { createNounsTokenContract } from "../../utilities/contracts";

export interface SupportedEventMap {
	DelegateChanged: EventData.DelegateChanged;
	DelegateVotesChanged: EventData.DelegateVotesChanged;
	Transfer: EventData.Transfer;
	Approval: EventData.Approval;
	ApprovalForAll: EventData.ApprovalForAll;
	NounCreated: EventData.NounCreated;
	DescriptorLocked: EventData.DescriptorLocked;
	DescriptorUpdated: EventData.DescriptorUpdated;
	MinterLocked: EventData.MinterLocked;
	MinterUpdated: EventData.MinterUpdated;
	NounBurned: EventData.NounBurned;
	NoundersDAOUpdated: EventData.NoundersDAOUpdated;
	OwnershipTransferred: EventData.OwnershipTransferred;
	SeederLocked: EventData.SeederLocked;
	SeederUpdated: EventData.SeederUpdated;
}
const SUPPORTED_NOUNS_TOKEN_EVENTS = [
	"DelegateChanged",
	"DelegateVotesChanged",
	"Transfer",
	"Approval",
	"ApprovalForAll",
	"NounCreated",
	"DescriptorLocked",
	"DescriptorUpdated",
	"MinterLocked",
	"MinterUpdated",
	"NounBurned",
	"NoundersDAOUpdated",
	"OwnershipTransferred",
	"SeederLocked",
	"SeederUpdated"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper around the NounsToken governance contract.
 */
export class _NounsToken {
	public provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_TOKEN_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.Contract = createNounsTokenContract(this.provider);
		this.registeredListeners = new Map();
	}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The name of the event.
	 * @param listener The listener function.
	 * @example
	 * nounsToken.on('NounCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "DelegateChanged": // WORKING
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
							numOfVotesChanged: numOfVotesChanged,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "DelegateVotesChanged": // WORKING
				this.Contract.on(
					"DelegateVotesChanged",
					(delegate: string, previousBalance: bigint, newBalance: bigint, event: ethers.Log) => {
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

			case "Transfer": // WORKING
				this.Contract.on("Transfer", (from: string, to: string, tokenId: bigint, event: ethers.Log) => {
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

			case "Approval": // WORKING
				this.Contract.on("Approval", (owner: string, approved: string, tokenId: bigint, event: ethers.Log) => {
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			case "NounCreated": // WORKING
				this.Contract.on(
					"NounCreated",
					(
						tokenId: bigint,
						seed: { accessory: bigint; background: bigint; body: bigint; glasses: bigint; head: bigint },
						event: ethers.Log
					) => {
						const data: EventData.NounCreated = {
							id: Number(tokenId),
							seed: {
								accessory: Number(seed.accessory),
								background: Number(seed.background),
								body: Number(seed.body),
								glasses: Number(seed.glasses),
								head: Number(seed.head)
							},
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "DescriptorLocked":
				this.Contract.on("DescriptorLocked", (event: ethers.Log) => {
					const data: EventData.DescriptorLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "MinterLocked":
				this.Contract.on("MinterLocked", (event: ethers.Log) => {
					const data: EventData.MinterLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "NounBurned":
				this.Contract.on("NounBurned", (nounId: bigint, event: ethers.Log) => {
					const data: EventData.NounBurned = {
						id: Number(nounId),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "NoundersDAOUpdated":
				this.Contract.on("NoundersDAOUpdated", (_noundersDAO: string, event: ethers.Log) => {
					const data: EventData.NoundersDAOUpdated = {
						noundersDAO: { id: _noundersDAO } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "SeederLocked":
				this.Contract.on("SeederLocked", (event: ethers.Log) => {
					const data: EventData.SeederLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes an event listener.
	 * @param eventName the event name.
	 * @example
	 * nounsToken.off('NounCreated');
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
	 * nounsToken.trigger('NounCreated', {
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
	 * A wrapper around contract read functions.
	 * @param fName The function name.
	 * @param fArgs The arguments required by the function.
	 * @returns The output of the read function, if it has any.
	 */
	public async callView(fName: string, fArgs: any[]) {
		switch (fName) {
			case "DELEGATION_TYPEHASH":
				return await this.Contract.DELEGATION_TYPEHASH(); // returns "bytes32", is it string in js?
				break;

			case "DOMAIN_TYPEHASH":
				return await this.Contract.DOMAIN_TYPEHASH(); // returns "bytes32", is it string in js?
				break;

			case "balanceOf":
				return await this.Contract.balanceOf(fArgs[0]); // returns uint256
				break;
			case "checkpoints":
				// address, checkpoint id. ID starts at zero and increments when checkpoints change
				return await this.Contract.checkpoints(fArgs[0], fArgs[1]);
				// returns [number (fromblock), big number (votes)]
				break;
			case "contractURI":
				return await this.Contract.contractURI(); // returns string
				break;

			case "dataURI":
				// ARG is tokenID  - difficult one, fails on etherscan. Document how to consistently run
				return await this.Contract.dataURI(fArgs[0]); // returns string
				break;
			case "decimals":
				return await this.Contract.decimals(); // returns string
				break;
			case "delegates":
				return await this.Contract.delegates(fArgs[0]); // returns string
				break;
			case "descriptor":
				return await this.Contract.descriptor(); // returns string
				break;
			case "getApproved":
				return await this.Contract.getApproved(fArgs[0]); // returns string
				break;
			case "getCurrentVotes":
				return await this.Contract.getCurrentVotes(fArgs[0]); // returns bigint
				break;
			case "getPriorVotes":
				return await this.Contract.getPriorVotes(fArgs[0], fArgs[1]); // returns bigint
				break;
			case "isApprovedForAll":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "address",
				//       "name": "owner",
				//       "type": "address"
				//     },
				//     {
				//       "internalType": "address",
				//       "name": "operator",
				//       "type": "address"
				//     }
				//   ],
				//   "name": "isApprovedForAll",
				//   "outputs": [
				//     {
				//       "internalType": "bool",
				//       "name": "",
				//       "type": "bool"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "isDescriptorLocked":
				// {
				//   "inputs": [],
				//   "name": "isDescriptorLocked",
				//   "outputs": [
				//     {
				//       "internalType": "bool",
				//       "name": "",
				//       "type": "bool"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "isMinterLocked":
				// {
				//   "inputs": [],
				//   "name": "isMinterLocked",
				//   "outputs": [
				//     {
				//       "internalType": "bool",
				//       "name": "",
				//       "type": "bool"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },

				break;
			case "isSeederlocked":
				// {
				//   "inputs": [],
				//   "name": "isSeederLocked",
				//   "outputs": [
				//     {
				//       "internalType": "bool",
				//       "name": "",
				//       "type": "bool"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "minter":
				// {
				//   "inputs": [],
				//   "name": "minter",
				//   "outputs": [
				//     {
				//       "internalType": "address",
				//       "name": "",
				//       "type": "address"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },

				break;
			case "name":
				// {
				//   "inputs": [],
				//   "name": "name",
				//   "outputs": [
				//     {
				//       "internalType": "string",
				//       "name": "",
				//       "type": "string"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "nonces":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "address",
				//       "name": "",
				//       "type": "address"
				//     }
				//   ],
				//   "name": "nonces",
				//   "outputs": [
				//     {
				//       "internalType": "uint256",
				//       "name": "",
				//       "type": "uint256"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "noundersDAO":
				// {
				//   "inputs": [],
				//   "name": "noundersDAO",
				//   "outputs": [
				//     {
				//       "internalType": "address",
				//       "name": "",
				//       "type": "address"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "numCheckpoints":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "address",
				//       "name": "",
				//       "type": "address"
				//     }
				//   ],
				//   "name": "numCheckpoints",
				//   "outputs": [
				//     {
				//       "internalType": "uint32",
				//       "name": "",
				//       "type": "uint32"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "owner":
				// {
				//   "inputs": [],
				//   "name": "owner",
				//   "outputs": [
				//     {
				//       "internalType": "address",
				//       "name": "",
				//       "type": "address"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "ownerOf":
				return await this.Contract.ownerOf(fArgs[0]); // returns address string
				break;
			case "proxyRegistry":
				// {
				//   "inputs": [],
				//   "name": "proxyRegistry",
				//   "outputs": [
				//     {
				//       "internalType": "contract IProxyRegistry",
				//       "name": "",
				//       "type": "address"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "seeder":
				// {
				//   "inputs": [],
				//   "name": "seeder",
				//   "outputs": [
				//     {
				//       "internalType": "contract INounsSeeder",
				//       "name": "",
				//       "type": "address"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "seeds":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "uint256",
				//       "name": "",
				//       "type": "uint256"
				//     }
				//   ],
				//   "name": "seeds",
				//   "outputs": [
				//     {
				//       "internalType": "uint48",
				//       "name": "background",
				//       "type": "uint48"
				//     },
				//     {
				//       "internalType": "uint48",
				//       "name": "body",
				//       "type": "uint48"
				//     },
				//     {
				//       "internalType": "uint48",
				//       "name": "accessory",
				//       "type": "uint48"
				//     },
				//     {
				//       "internalType": "uint48",
				//       "name": "head",
				//       "type": "uint48"
				//     },
				//     {
				//       "internalType": "uint48",
				//       "name": "glasses",
				//       "type": "uint48"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "supportsInterface":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "bytes4",
				//       "name": "interfaceId",
				//       "type": "bytes4"
				//     }
				//   ],
				//   "name": "supportsInterface",
				//   "outputs": [
				//     {
				//       "internalType": "bool",
				//       "name": "",
				//       "type": "bool"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "symbol":
				// {
				//   "inputs": [],
				//   "name": "symbol",
				//   "outputs": [
				//     {
				//       "internalType": "string",
				//       "name": "",
				//       "type": "string"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "tokenByIndex":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "uint256",
				//       "name": "index",
				//       "type": "uint256"
				//     }
				//   ],
				//   "name": "tokenByIndex",
				//   "outputs": [
				//     {
				//       "internalType": "uint256",
				//       "name": "",
				//       "type": "uint256"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "tokenOfOwnerByIndex":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "address",
				//       "name": "owner",
				//       "type": "address"
				//     },
				//     {
				//       "internalType": "uint256",
				//       "name": "index",
				//       "type": "uint256"
				//     }
				//   ],
				//   "name": "tokenOfOwnerByIndex",
				//   "outputs": [
				//     {
				//       "internalType": "uint256",
				//       "name": "",
				//       "type": "uint256"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "tokenURI":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "uint256",
				//       "name": "tokenId",
				//       "type": "uint256"
				//     }
				//   ],
				//   "name": "tokenURI",
				//   "outputs": [
				//     {
				//       "internalType": "string",
				//       "name": "",
				//       "type": "string"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "totalSupply":
				// {
				//   "inputs": [],
				//   "name": "totalSupply",
				//   "outputs": [
				//     {
				//       "internalType": "uint256",
				//       "name": "",
				//       "type": "uint256"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// },
				break;
			case "votesToDelegate":
				// {
				//   "inputs": [
				//     {
				//       "internalType": "address",
				//       "name": "delegator",
				//       "type": "address"
				//     }
				//   ],
				//   "name": "votesToDelegate",
				//   "outputs": [
				//     {
				//       "internalType": "uint96",
				//       "name": "",
				//       "type": "uint96"
				//     }
				//   ],
				//   "stateMutability": "view",
				//   "type": "function"
				// }
				break;
		}
	}

	/**
	 * @returns The name of the contract. `NounsToken`.
	 */
	public name() {
		return "NounsToken";
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return _NounsToken.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
