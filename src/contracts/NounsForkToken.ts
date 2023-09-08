import { ethers } from "ethers";
import { Auction, Bid, Proposal, TokenMetadata, Vote, VoteDirection, NounsTokenSeed, Account, EventData } from "../types";
import { NounsTokenABI } from "@nouns/contracts";

export class _NounsForkToken {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<string, Function>;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract("0x06cF70f6f90E0B1f17d19F3Cb962A39E505D5b3f", NounsTokenABI, this.provider);
		this.registeredListeners = new Map<string, Function>();
	}

	public async on(eventType: string, listener: Function) {
		switch (eventType) {
			case "DelegateChanged": // WORKING
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

			case "DelegateVotesChanged": // WORKING
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

			case "Transfer": // WORKING
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

			case "Approval": // WORKING
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			case "NounCreated": // WORKING
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "DescriptorLocked":
				this.Contract.on("DescriptorLocked", (event: ethers.Event) => {
					const data: EventData.DescriptorLocked = {
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "MinterLocked":
				this.Contract.on("MinterLocked", (event: ethers.Event) => {
					const data: EventData.MinterLocked = {
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "NoundersDAOUpdated":
				this.Contract.on("NoundersDAOUpdated", (_noundersDAO: string, event: ethers.Event) => {
					const data: EventData.NoundersDAOUpdated = {
						noundersDAO: { id: _noundersDAO } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
			case "SeederLocked":
				this.Contract.on("SeederLocked", (event: ethers.Event) => {
					const data: EventData.SeederLocked = {
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			// **********************************************************
			//
			// TESTING - Double check details, haven't confirmed live event yet
			//
			// **********************************************************
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

			default:
				throw new Error(`${eventType} is not supported. Please use a different event.`);
		}
	}

	public emit(eventType: string, data: unknown) {
		const listener = this.registeredListeners.get(eventType);
		if (!listener) {
			throw new Error(`${eventType} does not have a listener.`);
		}

		listener(data);
	}

	public name() {
		return "NounsForkToken";
	}
}
