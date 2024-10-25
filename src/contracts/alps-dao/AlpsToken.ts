import { ethers } from "ethers";
import { EventData } from "../../types";
import { default as AlpsTokenABI } from "../abis/alps/AlpsToken.json";
import { createOrReturnProvider } from "../../utilities/providers";

export interface SupportedEventMap {
	AlpBurned: EventData.Alps.Token.AlpBurned;
	AlpCreated: EventData.Alps.Token.AlpCreated;
	AlpersDAOUpdated: EventData.Alps.Token.AlpersDAOUpdated;
	Approval: EventData.Alps.Token.Approval;
	ApprovalForAll: EventData.Alps.Token.ApprovalForAll;
	DelegateChanged: EventData.Alps.Token.DelegateChanged;
	DelegateVotesChanged: EventData.Alps.Token.DelegateVotesChanged;
	DescriptorLocked: EventData.Alps.Token.DescriptorLocked;
	DescriptorUpdated: EventData.Alps.Token.DescriptorUpdated;
	MinterLocked: EventData.Alps.Token.MinterLocked;
	MinterUpdated: EventData.Alps.Token.MinterUpdated;
	OwnershipTransferred: EventData.Alps.Token.OwnershipTransferred;
	SeederLocked: EventData.Alps.Token.SeederLocked;
	SeederUpdated: EventData.Alps.Token.SeederUpdated;
	Transfer: EventData.Alps.Token.Transfer;
}
const SUPPORTED_ALPS_TOKEN_EVENTS = [
	"AlpBurned",
	"AlpCreated",
	"AlpersDAOUpdated",
	"Approval",
	"ApprovalForAll",
	"DelegateChanged",
	"DelegateVotesChanged",
	"DescriptorLocked",
	"DescriptorUpdated",
	"MinterLocked",
	"MinterUpdated",
	"OwnershipTransferred",
	"SeederLocked",
	"SeederUpdated",
	"Transfer"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

export class AlpsToken {
	private provider: ethers.JsonRpcProvider;
	public contract: ethers.Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_ALPS_TOKEN_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);

		this.contract = new ethers.Contract("0xf59eB3e1957F120f7C135792830F900685536f52", AlpsTokenABI, this.provider);
		this.registeredListeners = new Map();
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "AlpBurned":
				this.contract.on(eventName, (tokenId: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Token.AlpBurned = {
						tokenId: Number(tokenId),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "AlpCreated":
				this.contract.on(
					eventName,
					(
						tokenId: bigint,
						seed: { accessory: bigint; background: bigint; body: bigint; glasses: bigint; head: bigint },
						event: ethers.Log
					) => {
						const data: EventData.Alps.Token.AlpCreated = {
							tokenId: Number(tokenId),
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

			case "AlpersDAOUpdated":
				this.contract.on(eventName, (alpersDAO: string, event: ethers.Log) => {
					const data: EventData.Alps.Token.AlpersDAOUpdated = {
						alpersDAO: { id: alpersDAO },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Approval":
				this.contract.on(eventName, (owner: string, approved: string, tokenId: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Token.Approval = {
						owner: { id: owner },
						approved: { id: approved },
						tokenId: Number(tokenId),
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ApprovalForAll":
				this.contract.on(eventName, (owner: string, operator: string, approved: boolean, event: ethers.Log) => {
					const data: EventData.Alps.Token.ApprovalForAll = {
						owner: { id: owner },
						operator: { id: operator },
						approved: approved,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "DelegateChanged":
				this.contract.on(
					eventName,
					async (delegator: string, fromDelegate: string, toDelegate: string, event: ethers.Log) => {
						const data: EventData.Alps.Token.DelegateChanged = {
							delegator: { id: delegator },
							fromDelegate: { id: fromDelegate },
							toDelegate: { id: toDelegate },
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "DelegateVotesChanged":
				this.contract.on(
					eventName,
					(delegate: string, previousBalance: bigint, newBalance: bigint, event: ethers.Log) => {
						const data: EventData.Alps.Token.DelegateVotesChanged = {
							delegate: { id: delegate },
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
				this.contract.on(eventName, (event: ethers.Log) => {
					const data: EventData.Alps.Token.DescriptorLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "DescriptorUpdated":
				this.contract.on(eventName, (descriptor: string, event: ethers.Log) => {
					const data: EventData.Alps.Token.DescriptorUpdated = {
						descriptor: { id: descriptor },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "MinterLocked":
				this.contract.on(eventName, (event: ethers.Log) => {
					const data: EventData.Alps.Token.MinterLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "MinterUpdated":
				this.contract.on(eventName, (minter: string, event: ethers.Log) => {
					const data: EventData.Alps.Token.MinterUpdated = {
						minter: { id: minter },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.contract.on(eventName, (previousOwner: string, newOwner: string, event: ethers.Log) => {
					const data: EventData.Alps.Token.OwnershipTransferred = {
						previousOwner: { id: previousOwner },
						newOwner: { id: newOwner },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "SeederLocked":
				this.contract.on(eventName, (event: ethers.Log) => {
					const data: EventData.Alps.Token.SeederLocked = {
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "SeederUpdated":
				this.contract.on(eventName, (seeder: string, event: ethers.Log) => {
					const data: EventData.Alps.Token.SeederUpdated = {
						seeder: { id: seeder },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Transfer":
				this.contract.on(eventName, (from: string, to: string, tokenId: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Token.Transfer = {
						from: { id: from },
						to: { id: to },
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

	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	public name() {
		return "AlpsToken";
	}

	public hasEvent(eventName: string) {
		return AlpsToken.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
