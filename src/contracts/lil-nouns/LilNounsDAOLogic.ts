import { ethers } from "ethers-v6";
import { Account, EventData, VoteDirection } from "../../types";
import { default as LilNounsDAOLogicV1ABI } from "../abis/lil-nouns/NounsDAOLogicV1.json";

export interface SupportedEventMap {
	NewAdmin: EventData.NewAdmin;
	NewImplementation: EventData.NewImplementation;
	NewPendingAdmin: EventData.NewPendingAdmin;
	NewVetoer: EventData.NewVetoer;
	ProposalCanceled: EventData.ProposalCanceled;
	ProposalCreated: EventData.ProposalCreated;
	ProposalCreatedWithRequirements: EventData.ProposalCreatedWithRequirements;
	ProposalExecuted: EventData.ProposalExecuted;
	ProposalQueued: EventData.ProposalQueued;
	ProposalThresholdBPSSet: EventData.ProposalThresholdBPSSet;
	ProposalVetoed: EventData.ProposalVetoed;
	QuorumVotesBPSSet: EventData.QuorumVotesBPSSet;
	VoteCast: EventData.VoteCast;
	VotingDelaySet: EventData.VotingDelaySet;
	VotingPeriodSet: EventData.VotingPeriodSet;
}
const SUPPORTED_LIL_NOUNS_DAO_LOGIC_EVENTS = [
	"NewAdmin",
	"NewImplementation",
	"NewPendingAdmin",
	"NewVetoer",
	"ProposalCanceled",
	"ProposalCreated",
	"ProposalCreatedWithRequirements",
	"ProposalExecuted",
	"ProposalQueued",
	"ProposalThresholdBPSSet",
	"ProposalVetoed",
	"QuorumVotesBPSSet",
	"VoteCast",
	"VotingDelaySet",
	"VotingPeriodSet"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class around the LilNounsAuctionHouse contract.
 */
export class LilNounsDAOLogic {
	public provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_LIL_NOUNS_DAO_LOGIC_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this.Contract = new ethers.Contract("0x5d2C31ce16924C2a71D317e5BbFd5ce387854039", LilNounsDAOLogicV1ABI, this.provider);
		this.registeredListeners = new Map();
	}

	/**
	 * Assigns a listener to the event, which triggers whenever the event happens onchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The event name.
	 * @param listener The listener function.
	 * @example
	 * lilNounsDAOLogic.on('VoteCast', (data) => {
	 * 	console.log(data.proposalId);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "NewAdmin":
				this.Contract.on("NewAdmin", (oldAdmin: string, newAdmin: string, event: ethers.Log) => {
					const data: EventData.NewAdmin = {
						oldAdmin: { id: oldAdmin } as Account,
						newAdmin: { id: newAdmin } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewImplementation":
				this.Contract.on(
					"NewImplementation",
					(oldImplementation: string, newImplementation: string, event: ethers.Log) => {
						const data: EventData.NewImplementation = {
							oldImplementation: { id: oldImplementation } as Account,
							newImplementation: { id: newImplementation } as Account,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewPendingAdmin":
				this.Contract.on("NewPendingAdmin", (oldPendingAdmin: string, newPendingAdmin: string, event: ethers.Log) => {
					const data: EventData.NewPendingAdmin = {
						oldPendingAdmin: { id: oldPendingAdmin } as Account,
						newPendingAdmin: { id: newPendingAdmin } as Account,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewVetoer":
				this.Contract.on("NewVetoer", (oldVetoer: string, newVetoer: string, event: ethers.Log) => {
					const data: EventData.NewVetoer = {
						oldVetoer: { id: oldVetoer },
						newVetoer: { id: newVetoer },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCanceled":
				this.Contract.on("ProposalCanceled", (id: bigint, event: ethers.Log) => {
					const data: EventData.ProposalCanceled = {
						id: Number(id),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreated":
				this.Contract.on(
					"ProposalCreated",
					(
						id: bigint,
						proposer: string,
						targets: string[],
						values: bigint[],
						signatures: string[],
						calldatas: any[], // type is bytes[]
						startBlock: bigint,
						endBlock: bigint,
						description: string,
						event: ethers.Log
					) => {
						const data: EventData.ProposalCreated = {
							id: Number(id),
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas, // type is bytes[]
							startBlock: startBlock,
							endBlock: endBlock,
							description: description,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreatedWithRequirements":
				this.Contract.on(
					"ProposalCreatedWithRequirements",
					(
						id: bigint,
						proposer: string,
						targets: string[],
						values: bigint[],
						signatures: string[],
						calldatas: any[], // bytes
						startBlock: bigint,
						endBlock: bigint,
						proposalThreshold: bigint,
						quorumVotes: bigint,
						description: string,
						event: ethers.Log
					) => {
						const data: EventData.ProposalCreatedWithRequirements = {
							id: Number(id),
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							startBlock: startBlock,
							endBlock: endBlock,
							proposalThreshold: Number(proposalThreshold),
							quorumVotes: Number(quorumVotes),
							description: description,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalExecuted":
				this.Contract.on("ProposalExecuted", (id: bigint, event: ethers.Log) => {
					const data: EventData.ProposalExecuted = {
						id: Number(id),
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalQueued":
				this.Contract.on("ProposalQueued", (id: bigint, eta: bigint, event: ethers.Log) => {
					const data: EventData.ProposalQueued = {
						id: Number(id),
						eta: eta,
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalThresholdBPSSet":
				this.Contract.on(
					"ProposalThresholdBPSSet",
					(oldProposalThresholdBPS: bigint, newProposalThresholdBPS: bigint, event: ethers.Log) => {
						const data: EventData.ProposalThresholdBPSSet = {
							oldProposalThresholdBPS: Number(oldProposalThresholdBPS),
							newProposalThresholdBPS: Number(newProposalThresholdBPS),
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalVetoed":
				this.Contract.on("ProposalVetoed", (id: bigint, event: ethers.Log) => {
					const data: EventData.ProposalVetoed = {
						id: Number(id),
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "QuorumVotesBPSSet":
				this.Contract.on(
					"QuorumVotesBPSSet",
					(oldQuorumVotesBPS: bigint, newQuorumVotesBPS: bigint, event: ethers.Log) => {
						const data: EventData.QuorumVotesBPSSet = {
							oldQuorumVotesBPS: Number(oldQuorumVotesBPS),
							newQuorumVotesBPS: Number(newQuorumVotesBPS),
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "VoteCast":
				this.Contract.on(
					"VoteCast",
					(voter: string, proposalId: bigint, support: bigint, votes: bigint, reason: string, event: ethers.Log) => {
						const supportDetailed: VoteDirection = Number(support);

						const data: EventData.VoteCast = {
							voter: { id: voter } as Account,
							proposalId: Number(proposalId),
							supportDetailed: supportDetailed,
							votes: Number(votes),
							reason: reason,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "VotingDelaySet":
				this.Contract.on("VotingDelaySet", (oldVotingDelay: bigint, newVotingDelay: bigint, event: ethers.Log) => {
					const data: EventData.VotingDelaySet = {
						oldVotingDelay: oldVotingDelay,
						newVotingDelay: newVotingDelay,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "VotingPeriodSet":
				this.Contract.on("VotingPeriodSet", (oldVotingPeriod: bigint, newVotingPeriod: bigint, event: ethers.Log) => {
					const data: EventData.VotingPeriodSet = {
						oldVotingPeriod: oldVotingPeriod,
						newVotingPeriod: newVotingPeriod,
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
	 * @param eventName the event listened to.
	 * @example
	 * lilNounsDAOLogic.off('VoteCast');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if the listener cannot be found.
	 * @param eventName the name of the event.
	 * @param data the event data.
	 * @example
	 * lilNounsDAOLogic.trigger('VoteCast', {
	 * 	voter: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	 * 	proposalId: 117,
	 * 	supportDetailed: 0,
	 * 	votes: 24,
	 * 	reason: "Really good reason."
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
	 * @returns The name of the contract. `LilNounsDAOLogic`.
	 */
	public name() {
		return "LilNounsDAOLogic";
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return LilNounsDAOLogic.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
