import { ethers } from "ethers";
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

interface Checkpoint {
	fromBlock: bigint;
	votes: bigint;
}

interface Seed {
	background: bigint;
	body: bigint;
	accessory: bigint;
	head: bigint;
	glasses: bigint;
}

/**
 * A wrapper around the NounsToken governance contract.
 */
export class _NounsToken {
	private provider: ethers.JsonRpcProvider;
	private contract: ethers.Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_TOKEN_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.contract = createNounsTokenContract(this.provider);
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
				this.contract.on(
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
				this.contract.on(
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
				this.contract.on("Transfer", (from: string, to: string, tokenId: bigint, event: ethers.Log) => {
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
				this.contract.on("Approval", (owner: string, approved: string, tokenId: bigint, event: ethers.Log) => {
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
				this.contract.on("ApprovalForAll", (owner: string, operator: string, approved: boolean, event: ethers.Log) => {
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
				this.contract.on(
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
				this.contract.on("DescriptorLocked", (event: ethers.Log) => {
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
				this.contract.on("DescriptorUpdated", (_descriptor: string, event: ethers.Log) => {
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
				this.contract.on("MinterLocked", (event: ethers.Log) => {
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
				this.contract.on("MinterUpdated", (_minter: string, event: ethers.Log) => {
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
				this.contract.on("NounBurned", (nounId: bigint, event: ethers.Log) => {
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
				this.contract.on("NoundersDAOUpdated", (_noundersDAO: string, event: ethers.Log) => {
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
				this.contract.on("OwnershipTransferred", (previousOwner: string, newOwner: string, event: ethers.Log) => {
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
				this.contract.on("SeederLocked", (event: ethers.Log) => {
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
				this.contract.on("SeederUpdated", (_seeder: string, event: ethers.Log) => {
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
			this.contract.off(eventName, listener as ethers.Listener);
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

	//=====================================
	// View / Pure functions.
	//=====================================

	public async DELEGATION_TYPEHASH(): Promise<string> {
		return this.contract.DELEGATION_TYPEHASH();
	}

	public async DOMAIN_TYPEHASH(): Promise<string> {
		return this.contract.DOMAIN_TYPEHASH();
	}

	public async balanceOf(owner: string): Promise<bigint> {
		return this.contract.balanceOf(owner);
	}

	public async checkpoints(address: string, index: number): Promise<Checkpoint> {
		return this.contract.checkpoints(address, index);
	}

	public async contractURI(): Promise<string> {
		return this.contract.contractURI();
	}

	public async dataURI(tokenId: number): Promise<string> {
		return this.contract.dataURI(tokenId);
	}

	public async decimals(): Promise<bigint> {
		return this.contract.decimals();
	}

	public async delegates(delegator: string): Promise<string> {
		return this.contract.delegates(delegator);
	}

	public async descriptor(): Promise<string> {
		return this.contract.descriptor();
	}

	public async getApproved(tokenId: number): Promise<string> {
		return this.contract.getApproved(tokenId);
	}

	public async getCurrentVotes(account: string): Promise<bigint> {
		return this.contract.getCurrentVotes(account);
	}

	public async getPriorVotes(account: string, blockNumber: number): Promise<bigint> {
		return this.contract.getPriorVotes(account, blockNumber);
	}

	public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
		return this.contract.isApprovedForAll(owner, operator);
	}

	public async isDescriptorLocked(): Promise<boolean> {
		return this.contract.isDescriptorLocked();
	}

	public async isMinterLocked(): Promise<boolean> {
		return this.contract.isMinterLocked();
	}

	public async isSeederLocked(): Promise<boolean> {
		return this.contract.isSeederLocked();
	}

	public async minter(): Promise<string> {
		return this.contract.minter();
	}

	public async name(): Promise<string> {
		return this.contract.name();
	}

	public async nonces(): Promise<bigint> {
		return this.contract.nonces();
	}

	public async noundersDAO(): Promise<string> {
		return this.contract.noundersDAO();
	}

	public async numCheckpoints(): Promise<bigint> {
		return this.contract.numCheckpoints();
	}

	public async owner(): Promise<string> {
		return this.contract.owner();
	}

	public async ownerOf(tokenId: number): Promise<string> {
		return this.contract.ownerOf(tokenId);
	}

	public async proxyRegistry(tokenId: number): Promise<string> {
		return this.contract.proxyRegistry(tokenId);
	}

	public async seeder(): Promise<string> {
		return this.contract.seeder();
	}

	public async seeds(tokenId: number): Promise<Seed> {
		return this.contract.seeds(tokenId);
	}

	public async supportsInterface(interfaceId: string): Promise<boolean> {
		return this.contract.supportsInterface(interfaceId);
	}

	public async symbol(): Promise<string> {
		return this.contract.symbol();
	}

	public async tokenByIndex(index: number): Promise<bigint> {
		return this.contract.tokenByIndex(index);
	}

	public async tokenOfOwnerByIndex(owner: string, index: number): Promise<bigint> {
		return this.contract.tokenOfOwnerByIndex(owner, index);
	}

	public async tokenURI(tokenId: number): Promise<string> {
		return this.contract.tokenURI(tokenId);
	}

	public async totalSupply(): Promise<bigint> {
		return this.contract.totalSupply();
	}

	public async votesToDelegate(delegator: string): Promise<bigint> {
		return this.contract.votesToDelegate(delegator);
	}
}
