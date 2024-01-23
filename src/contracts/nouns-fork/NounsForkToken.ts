import { ethers } from "ethers";
import { NounsTokenSeed, Account, EventData } from "../../types";
import { default as NounsTokenABI } from "../abis/NounsToken.json";

const SUPPORTED_NOUNS_FORK_TOKEN_EVENTS = [
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
export type SupportedEventsType = (typeof SUPPORTED_NOUNS_FORK_TOKEN_EVENTS)[number];

/**
 * A wrapper around the NounsForkToken governance contract.
 */
export class _NounsForkToken {
	private _forkId: number;
	public provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_FORK_TOKEN_EVENTS;
	public static readonly forkAddress = [
		"0x06cF70f6f90E0B1f17d19F3Cb962A39E505D5b3f",
		"0xd6473f1d7c07dc08983a7f09f59c1a2aba17be41",
		"0xd7bf9e2c54d07582004782004ed20d0336d52669"
	];

	constructor(provider: ethers.JsonRpcProvider | string, forkId = 0) {
		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this._forkId = forkId;
		this.Contract = new ethers.Contract(_NounsForkToken.forkAddress[forkId], NounsTokenABI, this.provider);
		this.registeredListeners = new Map<SupportedEventsType, Function>();
	}

	get forkId() {
		return this._forkId;
	}

	get address() {
		return _NounsForkToken.forkAddress[this._forkId];
	}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The name of the event.
	 * @param listener The listener function.
	 * @example
	 * nounsForkToken.on('NounCreated', (data) => {
	 * 	console.log(data.id);
	 * });
	 */
	public async on(eventName: SupportedEventsType, listener: Function) {
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

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "DelegateVotesChanged": // WORKING
				this.Contract.on(
					"DelegateVotesChanged",
					(delegate: string, previousBalance: number, newBalance: number, event: ethers.Log) => {
						const data: EventData.DelegateVotesChanged = {
							delegate: { id: delegate } as Account,
							previousBalance: previousBalance,
							newBalance: newBalance,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "Transfer": // WORKING
				this.Contract.on("Transfer", (from: string, to: string, tokenId: number, event: ethers.Log) => {
					const data: EventData.Transfer = {
						from: { id: from } as Account,
						to: { id: to } as Account,
						tokenId: tokenId,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Approval": // WORKING
				this.Contract.on("Approval", (owner: string, approved: string, tokenId: number, event: ethers.Log) => {
					const data: EventData.Approval = {
						owner: { id: owner } as Account,
						approved: { id: approved } as Account,
						tokenId: tokenId,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "ApprovalForAll":
				this.Contract.on(
					"ApprovalForAll",
					(owner: string, operator: string, approved: boolean, event: ethers.Log) => {
						const data: EventData.ApprovalForAll = {
							owner: { id: owner } as Account,
							operator: { id: operator } as Account,
							approved: approved,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "NounCreated": // WORKING
				this.Contract.on("NounCreated", (tokenId: number, seed: NounsTokenSeed, event: ethers.Log) => {
					const data: EventData.NounCreated = {
						id: tokenId,
						seed: seed,
						event: event
					};

					listener(data);
				});
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

					listener(data);
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

					listener(data);
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

					listener(data);
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

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "NounBurned":
				this.Contract.on("NounBurned", (nounId: number, event: ethers.Log) => {
					const data: EventData.NounBurned = {
						id: nounId,
						event: event
					};

					listener(data);
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

					listener(data);
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

					listener(data);
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

					listener(data);
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

					listener(data);
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
	 * nounsForkToken.off('NounCreated');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers the listener of the given event with the given data.
	 * Throws an error if there is no listener assigned.
	 * @param eventName The event to be triggered.
	 * @param data The data being passed to the listener.
	 * @example
	 * nounsForkToken.trigger('NounCreated', {
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
	public trigger(eventName: SupportedEventsType, data: unknown) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * @returns The name of the contract. `NounsFork`.
	 */
	public name() {
		return "NounsForkToken";
	}
}
