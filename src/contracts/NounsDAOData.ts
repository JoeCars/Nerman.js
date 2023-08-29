import { ethers } from "ethers";

import { default as NounsDAOData } from "./NounsDAOData.json";
import { Account, EventData } from "../types";
import { sign } from "crypto";

export class _NounsDAOData {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract("0xf790A5f59678dd733fb3De93493A91f472ca1365", NounsDAOData, this.provider);
	}

	public async on(eventType: string, listener: ethers.providers.Listener) {
		switch (eventType) {
			case "AdminChanged":
				this.Contract.on(eventType, (previousAdmin: string, newAdmin: string, event: ethers.Event) => {
					const data = {
						previousAdmin: { id: previousAdmin } as Account,
						newAdmin: { id: newAdmin } as Account,
						event: event
					} as EventData.AdminChanged;

					listener(data);
				});
				break;

			case "BeaconUpgraded":
				this.Contract.on(eventType, (beacon: string, event: ethers.Event) => {
					const data = {
						beacon: { id: beacon } as Account,
						event: event
					} as EventData.BeaconUpgraded;

					listener(data);
				});
				break;

			case "CandidateFeedbackSent":
				this.Contract.on(
					eventType,
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
				break;

			case "CreateCandidateCostSet":
				this.Contract.on(
					eventType,
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
				this.Contract.on(eventType, (to: string, amount: number, event: ethers.Event) => {
					const data = {
						to: { id: to } as Account,
						amount: amount,
						event: event
					} as EventData.ETHWithdrawn;

					listener(data);
				});
				break;
			case "FeeRecipientSet":
				this.Contract.on(eventType, (oldFeeRecipient: string, newFeeRecipient: string, event: ethers.Event) => {
					const data = {
						oldFeeRecipient: { id: oldFeeRecipient } as Account,
						newFeeRecipient: { id: newFeeRecipient } as Account,
						event: event
					} as EventData.FeeRecipientSet;

					listener(data);
				});
				break;

			case "FeedbackSent":
				this.Contract.on(
					eventType,
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
				break;

			case "OwnershipTransferred":
				this.Contract.on(eventType, (previousOwner: string, newOwner: string, event: ethers.Event) => {
					const data = {
						previousOwner: { id: previousOwner } as Account,
						newOwner: { id: newOwner } as Account,
						event: event
					} as EventData.OwnershipTransferred;

					listener(data);
				});
				break;

			case "ProposalCandidateCanceled":
				this.Contract.on(eventType, (msgSender: string, slug: string, event: ethers.Event) => {
					const data = {
						msgSender: { id: msgSender } as Account,
						slug: slug,
						event: event
					} as EventData.ProposalCandidateCanceled;

					listener(data);
				});
				break;

			case "ProposalCandidateCreated":
				this.Contract.on(
					eventType,
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
				break;

			case "ProposalCandidateUpdated":
				this.Contract.on(
					eventType,
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
				break;

			case "SignatureAdded":
				this.Contract.on(
					eventType,
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
				break;

			case "UpdateCandidateCostSet":
				this.Contract.on(
					eventType,
					(oldUpdateCandidateCost: number, newUpdateCandidateCost: number, event: ethers.Event) => {
						const data = {
							oldUpdateCandidateCost: oldUpdateCandidateCost,
							newUpdateCandidateCost: newUpdateCandidateCost,
							event: event
						} as EventData.UpdateCandidateCostSet;

						listener(data);
					}
				);
				break;

			case "Upgraded":
				this.Contract.on(eventType, (implementation: string, event: ethers.Event) => {
					const data = {
						implementation: { id: implementation } as Account,
						event: event
					} as EventData.Upgraded;

					listener(data);
				});
				break;

			default:
				throw new Error(`${eventType} is not supported. Please use a different event.`);
		}
	}

	public async off(eventType: string, listener: ethers.providers.Listener) {
		this.Contract.off(eventType, listener);
	}

	public name() {
		return "NounsDAOData";
	}
}