import { ethers } from "ethers";

import { Account, EventData } from "../../types";
import { createOrReturnProvider } from "../../utilities/providers";
import { createNounsDaoDataContract } from "../../utilities/contracts";

export interface SupportedEventMap {
	AdminChanged: EventData.AdminChanged;
	BeaconUpgraded: EventData.BeaconUpgraded;
	CandidateFeedbackSent: EventData.CandidateFeedbackSent;
	CreateCandidateCostSet: EventData.CreateCandidateCostSet;
	ETHWithdrawn: EventData.ETHWithdrawn;
	FeeRecipientSet: EventData.FeeRecipientSet;
	FeedbackSent: EventData.FeedbackSent;
	OwnershipTransferred: EventData.OwnershipTransferred;
	ProposalCandidateCanceled: EventData.ProposalCandidateCanceled;
	ProposalCandidateCreated: EventData.ProposalCandidateCreated;
	ProposalCandidateUpdated: EventData.ProposalCandidateUpdated;
	SignatureAdded: EventData.SignatureAdded;
	UpdateCandidateCostSet: EventData.UpdateCandidateCostSet;
	Upgraded: EventData.Upgraded;
}
const SUPPORTED_NOUNS_DAO_DATA_EVENTS = [
	"AdminChanged",
	"BeaconUpgraded",
	"CandidateFeedbackSent",
	"CreateCandidateCostSet",
	"ETHWithdrawn",
	"FeeRecipientSet",
	"FeedbackSent",
	"OwnershipTransferred",
	"ProposalCandidateCanceled",
	"ProposalCandidateCreated",
	"ProposalCandidateUpdated",
	"SignatureAdded",
	"UpdateCandidateCostSet",
	"Upgraded"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class around the NounsDAOData contract.
 */
export class _NounsDAOData {
	private provider: ethers.JsonRpcProvider;
	private contract: ethers.Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_DAO_DATA_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.contract = createNounsDaoDataContract(this.provider);
		this.registeredListeners = new Map();
	}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The name of the event.
	 * @param listener The listener function.
	 * @example
	 * nounsDAOData.on('CandidateFeedbackSent', (data) => {
	 * 	console.log(data.slug);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "AdminChanged":
				this.contract.on(eventName, (previousAdmin: string, newAdmin: string, event: ethers.Log) => {
					const data = {
						previousAdmin: { id: previousAdmin } as Account,
						newAdmin: { id: newAdmin } as Account,
						event: event
					} as EventData.AdminChanged;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "BeaconUpgraded":
				this.contract.on(eventName, (beacon: string, event: ethers.Log) => {
					const data = {
						beacon: { id: beacon } as Account,
						event: event
					} as EventData.BeaconUpgraded;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "CandidateFeedbackSent":
				this.contract.on(
					eventName,
					(msgSender: string, proposer: string, slug: string, support: bigint, reason: string, event: ethers.Log) => {
						const data = {
							msgSender: { id: msgSender } as Account,
							proposer: { id: proposer } as Account,
							slug: slug,
							support: Number(support),
							reason: reason,
							event: event
						} as EventData.CandidateFeedbackSent;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "CreateCandidateCostSet":
				this.contract.on(
					eventName,
					(oldCreateCandidateCost: bigint, newCreateCandidateCost: bigint, event: ethers.Log) => {
						const data = {
							oldCreateCandidateCost: oldCreateCandidateCost,
							newCreateCandidateCost: newCreateCandidateCost,
							event: event
						} as EventData.CreateCandidateCostSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ETHWithdrawn":
				this.contract.on(eventName, (to: string, amount: bigint, event: ethers.Log) => {
					const data = {
						to: { id: to } as Account,
						amount: amount,
						event: event
					} as EventData.ETHWithdrawn;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "FeeRecipientSet":
				this.contract.on(eventName, (oldFeeRecipient: string, newFeeRecipient: string, event: ethers.Log) => {
					const data = {
						oldFeeRecipient: { id: oldFeeRecipient } as Account,
						newFeeRecipient: { id: newFeeRecipient } as Account,
						event: event
					} as EventData.FeeRecipientSet;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "FeedbackSent":
				this.contract.on(
					eventName,
					(msgSender: string, proposalId: bigint, support: bigint, reason: string, event: ethers.Log) => {
						const data = {
							msgSender: { id: msgSender } as Account,
							proposalId: Number(proposalId),
							support: Number(support),
							reason: reason,
							event: event
						} as EventData.FeedbackSent;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.contract.on(eventName, (previousOwner: string, newOwner: string, event: ethers.Log) => {
					const data = {
						previousOwner: { id: previousOwner } as Account,
						newOwner: { id: newOwner } as Account,
						event: event
					} as EventData.OwnershipTransferred;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCandidateCanceled":
				this.contract.on(eventName, (msgSender: string, slug: string, event: ethers.Log) => {
					const data = {
						msgSender: { id: msgSender } as Account,
						slug: slug,
						event: event
					} as EventData.ProposalCandidateCanceled;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCandidateCreated":
				this.contract.on(
					eventName,
					(
						msgSender: string,
						targets: string[],
						values: bigint[],
						signatures: string[],
						calldatas: any[],
						description: string,
						slug: string,
						proposalIdToUpdate: bigint,
						encodedProposalHash: string,
						event: ethers.Log
					) => {
						const data = {
							msgSender: { id: msgSender } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							description: description,
							slug: slug,
							proposalIdToUpdate: Number(proposalIdToUpdate),
							encodedProposalHash: encodedProposalHash,
							event: event
						} as EventData.ProposalCandidateCreated;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCandidateUpdated":
				this.contract.on(
					eventName,
					(
						msgSender: string,
						targets: string[],
						values: bigint[],
						signatures: string[],
						calldatas: any[],
						description: string,
						slug: string,
						proposalIdToUpdate: bigint,
						encodedProposalHash: string,
						reason: string,
						event: ethers.Log
					) => {
						const data = {
							msgSender: { id: msgSender } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							description: description,
							slug: slug,
							proposalIdToUpdate: Number(proposalIdToUpdate),
							encodedProposalHash: encodedProposalHash,
							reason: reason,
							event: event
						} as EventData.ProposalCandidateUpdated;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "SignatureAdded":
				this.contract.on(
					eventName,
					(
						signer: string,
						sig: string,
						expirationTimestamp: bigint,
						proposer: string,
						slug: string,
						proposalIdToUpdate: bigint,
						encodedPropHash: string,
						sigDigest: string,
						reason: string,
						event: ethers.Log
					) => {
						const data = {
							signer: { id: signer } as Account,
							sig: sig,
							expirationTimestamp: expirationTimestamp,
							proposer: { id: proposer } as Account,
							slug: slug,
							proposalIdToUpdate: Number(proposalIdToUpdate),
							encodedPropHash: encodedPropHash,
							sigDigest: sigDigest,
							reason: reason,
							event: event
						} as EventData.SignatureAdded;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "UpdateCandidateCostSet":
				this.contract.on(
					eventName,
					(oldUpdateCandidateCost: bigint, newUpdateCandidateCost: bigint, event: ethers.Log) => {
						const data = {
							oldUpdateCandidateCost: oldUpdateCandidateCost,
							newUpdateCandidateCost: newUpdateCandidateCost,
							event: event
						} as EventData.UpdateCandidateCostSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "Upgraded":
				this.contract.on(eventName, (implementation: string, event: ethers.Log) => {
					const data = {
						implementation: { id: implementation } as Account,
						event: event
					} as EventData.Upgraded;

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
	 * @param eventName the event listened to.
	 * @example
	 * nounsDAOData.off('CandidateFeedbackSent');
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
	 * nounsDAOData.trigger('CandidateFeedbackSent', {
	 * 	msgSender: {id: '0x281eC184E704CE57570614C33B3477Ec7Ff07243'},
	 * 	proposer: {id: '0x281eC184E704CE57570614C33B3477Ec7Ff07243'},
	 * 	slug: 'candidate-title',
	 * 	support: 0,
	 * 	reason: ''
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
	 * @returns The name of the contract. `NounsDAOData`.
	 */
	public name() {
		return "NounsDAOData";
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return _NounsDAOData.supportedEvents.includes(eventName as SupportedEventsType);
	}

	//=====================================
	// View / Pure functions.
	//=====================================

	public async PRIOR_VOTES_BLOCKS_AGO(): Promise<bigint> {
		return this.contract.PRIOR_VOTES_BLOCKS_AGO();
	}

	public async createCandidateCost(): Promise<bigint> {
		return this.contract.createCandidateCost();
	}

	public async feeRecipient(): Promise<string> {
		return this.contract.feeRecipient();
	}

	public async nounsDao(): Promise<string> {
		return this.contract.nounsDao();
	}

	public async nounsToken(): Promise<string> {
		return this.contract.nounsToken();
	}

	public async owner(): Promise<string> {
		return this.contract.owner();
	}

	public async propCandidates(address: string, bytes: string): Promise<boolean> {
		return this.contract.propCandidates(address, bytes);
	}

	public async updateCandidateCost(): Promise<bigint> {
		return this.contract.updateCandidateCost();
	}
}
