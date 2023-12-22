import { ethers } from "ethers";

import { default as NounsDAODataABI } from "../abis/NounsDAOData.json";
import { Account, EventData } from "../../types";

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
export type SupportedEventsType = (typeof SUPPORTED_NOUNS_DAO_DATA_EVENTS)[number];

/**
 * A wrapper class around the NounsDAOData contract.
 */
export class _NounsDAOData {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_DAO_DATA_EVENTS;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract("0xf790A5f59678dd733fb3De93493A91f472ca1365", NounsDAODataABI, this.provider);
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
	public async on(eventName: SupportedEventsType, listener: ethers.providers.Listener) {
		switch (eventName) {
			case "AdminChanged":
				this.Contract.on(eventName, (previousAdmin: string, newAdmin: string, event: ethers.Event) => {
					const data = {
						previousAdmin: { id: previousAdmin } as Account,
						newAdmin: { id: newAdmin } as Account,
						event: event
					} as EventData.AdminChanged;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "BeaconUpgraded":
				this.Contract.on(eventName, (beacon: string, event: ethers.Event) => {
					const data = {
						beacon: { id: beacon } as Account,
						event: event
					} as EventData.BeaconUpgraded;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "CandidateFeedbackSent":
				this.Contract.on(
					eventName,
					(
						msgSender: string,
						proposer: string,
						slug: string,
						support: number,
						reason: string,
						event: ethers.Event
					) => {
						const data = {
							msgSender: { id: msgSender } as Account,
							proposer: { id: proposer } as Account,
							slug: slug,
							support: support,
							reason: reason,
							event: event
						} as EventData.CandidateFeedbackSent;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "CreateCandidateCostSet":
				this.Contract.on(
					eventName,
					(oldCreateCandidateCost: number, newCreateCandidateCost: number, event: ethers.Event) => {
						const data = {
							oldCreateCandidateCost: oldCreateCandidateCost,
							newCreateCandidateCost: newCreateCandidateCost,
							event: event
						} as EventData.CreateCandidateCostSet;

						listener(data);
					}
				);
				break;

			case "ETHWithdrawn":
				this.Contract.on(eventName, (to: string, amount: number, event: ethers.Event) => {
					const data = {
						to: { id: to } as Account,
						amount: amount,
						event: event
					} as EventData.ETHWithdrawn;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "FeeRecipientSet":
				this.Contract.on(eventName, (oldFeeRecipient: string, newFeeRecipient: string, event: ethers.Event) => {
					const data = {
						oldFeeRecipient: { id: oldFeeRecipient } as Account,
						newFeeRecipient: { id: newFeeRecipient } as Account,
						event: event
					} as EventData.FeeRecipientSet;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "FeedbackSent":
				this.Contract.on(
					eventName,
					(msgSender: string, proposalId: number, support: number, reason: string, event: ethers.Event) => {
						const data = {
							msgSender: { id: msgSender } as Account,
							proposalId: proposalId,
							support: support,
							reason: reason,
							event: event
						} as EventData.FeedbackSent;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "OwnershipTransferred":
				this.Contract.on(eventName, (previousOwner: string, newOwner: string, event: ethers.Event) => {
					const data = {
						previousOwner: { id: previousOwner } as Account,
						newOwner: { id: newOwner } as Account,
						event: event
					} as EventData.OwnershipTransferred;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCandidateCanceled":
				this.Contract.on(eventName, (msgSender: string, slug: string, event: ethers.Event) => {
					const data = {
						msgSender: { id: msgSender } as Account,
						slug: slug,
						event: event
					} as EventData.ProposalCandidateCanceled;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCandidateCreated":
				this.Contract.on(
					eventName,
					(
						msgSender: string,
						targets: string[],
						values: number[],
						signatures: string[],
						calldatas: any[],
						description: string,
						slug: string,
						proposalIdToUpdate: number,
						encodedProposalHash: string,
						event: ethers.Event
					) => {
						const data = {
							msgSender: { id: msgSender } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							description: description,
							slug: slug,
							proposalIdToUpdate: proposalIdToUpdate,
							encodedProposalHash: encodedProposalHash,
							event: event
						} as EventData.ProposalCandidateCreated;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCandidateUpdated":
				this.Contract.on(
					eventName,
					(
						msgSender: string,
						targets: string[],
						values: number[],
						signatures: string[],
						calldatas: any[],
						description: string,
						slug: string,
						proposalIdToUpdate: number,
						encodedProposalHash: string,
						reason: string,
						event: ethers.Event
					) => {
						const data = {
							msgSender: { id: msgSender } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							description: description,
							slug: slug,
							proposalIdToUpdate: proposalIdToUpdate,
							encodedProposalHash: encodedProposalHash,
							reason: reason,
							event: event
						} as EventData.ProposalCandidateUpdated;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "SignatureAdded":
				this.Contract.on(
					eventName,
					(
						signer: string,
						sig: string,
						expirationTimestamp: number,
						proposer: string,
						slug: string,
						proposalIdToUpdate: number,
						encodedPropHash: string,
						sigDigest: string,
						reason: string,
						event: ethers.Event
					) => {
						const data = {
							signer: { id: signer } as Account,
							sig: sig,
							expirationTimestamp: expirationTimestamp,
							proposer: { id: proposer } as Account,
							slug: slug,
							proposalIdToUpdate: proposalIdToUpdate,
							encodedPropHash: encodedPropHash,
							sigDigest: sigDigest,
							reason: reason,
							event: event
						} as EventData.SignatureAdded;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "UpdateCandidateCostSet":
				this.Contract.on(
					eventName,
					(oldUpdateCandidateCost: number, newUpdateCandidateCost: number, event: ethers.Event) => {
						const data = {
							oldUpdateCandidateCost: oldUpdateCandidateCost,
							newUpdateCandidateCost: newUpdateCandidateCost,
							event: event
						} as EventData.UpdateCandidateCostSet;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "Upgraded":
				this.Contract.on(eventName, (implementation: string, event: ethers.Event) => {
					const data = {
						implementation: { id: implementation } as Account,
						event: event
					} as EventData.Upgraded;

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
	 * @param eventName the event listened to.
	 * @example
	 * nounsDAOData.off('CandidateFeedbackSent');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.providers.Listener);
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
	public trigger(eventName: SupportedEventsType, data: unknown) {
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
}