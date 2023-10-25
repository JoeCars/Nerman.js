import { ethers } from "ethers";
import { Account, EventData, VoteDirection } from "../../types";
import { default as LilNounsDAOLogicV1ABI } from "../abis/lil-nouns/NounsDAOLogicV1.json";
import { SUPPORTED_LIL_NOUNS_DAO_LOGIC_EVENTS } from "../../constants";

/**
 * A wrapper class around the LilNounsAuctionHouse contract.
 */
export class LilNounsDAOLogic {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public supportedEvents: string[];
	public registeredListeners: Map<string, Function>;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.Contract = new ethers.Contract("0x5d2C31ce16924C2a71D317e5BbFd5ce387854039", LilNounsDAOLogicV1ABI, this.provider);
		this.supportedEvents = SUPPORTED_LIL_NOUNS_DAO_LOGIC_EVENTS;
		this.registeredListeners = new Map();
	}

	/**
	 * Assigns a listener to the event, which triggers whenever the event happens onchain.
	 * Throws an error if the event is not supported.
	 * @param eventType The event name.
	 * @param listener The listener function.
	 * @example
	 * lilNounsDAOLogic.on('VoteCast', (data) => {
	 * 	console.log(data.proposalId);
	 * });
	 */
	public async on(eventType: string, listener: Function) {
		switch (eventType) {
			case "NewAdmin":
				this.Contract.on("NewAdmin", (oldAdmin: string, newAdmin: string, event: ethers.Event) => {
					const data: EventData.NewAdmin = {
						oldAdmin: { id: oldAdmin } as Account,
						newAdmin: { id: newAdmin } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "NewImplementation":
				this.Contract.on(
					"NewImplementation",
					(oldImplementation: string, newImplementation: string, event: ethers.Event) => {
						const data: EventData.NewImplementation = {
							oldImplementation: { id: oldImplementation } as Account,
							newImplementation: { id: newImplementation } as Account,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "NewPendingAdmin":
				this.Contract.on("NewPendingAdmin", (oldPendingAdmin: string, newPendingAdmin: string, event: ethers.Event) => {
					const data: EventData.NewPendingAdmin = {
						oldPendingAdmin: { id: oldPendingAdmin } as Account,
						newPendingAdmin: { id: newPendingAdmin } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "NewVetoer":
				this.Contract.on("NewVetoer", (oldVetoer: string, newVetoer: string, event: ethers.Event) => {
					const data: EventData.NewVetoer = {
						oldVetoer: { id: oldVetoer },
						newVetoer: { id: newVetoer },
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "ProposalCanceled":
				this.Contract.on("ProposalCanceled", (id: number, event: ethers.Event) => {
					const data: EventData.ProposalCanceled = {
						id: id,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "ProposalCreated":
				this.Contract.on(
					"ProposalCreated",
					(
						id: ethers.BigNumber,
						proposer: string,
						targets: string[],
						values: ethers.BigNumber[],
						signatures: string[],
						calldatas: any[], // type is bytes[]
						startBlock: ethers.BigNumber,
						endBlock: ethers.BigNumber,
						description: string,
						event: ethers.Event
					) => {
						const data: EventData.ProposalCreated = {
							id: id.toNumber(),
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas, // type is bytes[]
							startBlock: startBlock.toNumber(),
							endBlock: endBlock.toNumber(),
							description: description,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "ProposalCreatedWithRequirements":
				this.Contract.on(
					"ProposalCreatedWithRequirements",
					(
						id: ethers.BigNumber,
						proposer: string,
						targets: string[],
						values: ethers.BigNumber[],
						signatures: string[],
						calldatas: any[], // bytes
						startBlock: ethers.BigNumber,
						endBlock: ethers.BigNumber,
						proposalThreshold: ethers.BigNumber,
						quorumVotes: ethers.BigNumber,
						description: string,
						event: ethers.Event
					) => {
						const data: EventData.ProposalCreatedWithRequirements = {
							id: id.toNumber(),
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							startBlock: startBlock.toNumber(),
							endBlock: endBlock.toNumber(),
							proposalThreshold: proposalThreshold.toNumber(),
							quorumVotes: quorumVotes.toNumber(),
							description: description,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "ProposalExecuted":
				this.Contract.on("ProposalExecuted", (id: number, event: ethers.Event) => {
					const data: EventData.ProposalExecuted = {
						id: id,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "ProposalQueued":
				this.Contract.on("ProposalQueued", (id: number, eta: number, event: ethers.Event) => {
					const data: EventData.ProposalQueued = {
						id: id,
						eta: eta,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "ProposalThresholdBPSSet":
				this.Contract.on(
					"ProposalThresholdBPSSet",
					(oldProposalThresholdBPS: number, newProposalThresholdBPS: number, event: ethers.Event) => {
						const data: EventData.ProposalThresholdBPSSet = {
							oldProposalThresholdBPS: oldProposalThresholdBPS,
							newProposalThresholdBPS: newProposalThresholdBPS,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "ProposalVetoed":
				this.Contract.on("ProposalVetoed", (id: number, event: ethers.Event) => {
					const data: EventData.ProposalVetoed = {
						id: id,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "QuorumVotesBPSSet":
				this.Contract.on(
					"QuorumVotesBPSSet",
					(oldQuorumVotesBPS: number, newQuorumVotesBPS: number, event: ethers.Event) => {
						const data: EventData.QuorumVotesBPSSet = {
							oldQuorumVotesBPS: oldQuorumVotesBPS,
							newQuorumVotesBPS: newQuorumVotesBPS,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "VoteCast":
				this.Contract.on(
					"VoteCast",
					(
						voter: string,
						proposalId: number,
						support: number,
						votes: number,
						reason: string,
						event: ethers.Event
					) => {
						const supportDetailed: VoteDirection = support;

						const data: EventData.VoteCast = {
							voter: { id: voter } as Account,
							proposalId: proposalId,
							supportDetailed: supportDetailed,
							votes: votes,
							reason: reason,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventType, listener);
				break;

			case "VotingDelaySet":
				this.Contract.on("VotingDelaySet", (oldVotingDelay: number, newVotingDelay: number, event: ethers.Event) => {
					const data: EventData.VotingDelaySet = {
						oldVotingDelay: oldVotingDelay,
						newVotingDelay: newVotingDelay,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventType, listener);
				break;

			case "VotingPeriodSet":
				this.Contract.on("VotingPeriodSet", (oldVotingPeriod: number, newVotingPeriod: number, event: ethers.Event) => {
					const data: EventData.VotingPeriodSet = {
						oldVotingPeriod: oldVotingPeriod,
						newVotingPeriod: newVotingPeriod,
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
	 * @param eventName the event listened to.
	 */
	public off(eventName: string) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.providers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if the listener cannot be found.
	 * @param eventType the name of the event.
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
	 * @returns The name of the contract. `LilNounsDAOLogic`.
	 */
	public name() {
		return "LilNounsDAOLogic";
	}
}