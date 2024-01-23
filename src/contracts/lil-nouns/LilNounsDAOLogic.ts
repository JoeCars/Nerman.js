import { ethers } from "ethers";
import { Account, EventData, VoteDirection } from "../../types";
import { default as LilNounsDAOLogicV1ABI } from "../abis/lil-nouns/NounsDAOLogicV1.json";

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
export type SupportedEventsType = (typeof SUPPORTED_LIL_NOUNS_DAO_LOGIC_EVENTS)[number];

/**
 * A wrapper class around the LilNounsAuctionHouse contract.
 */
export class LilNounsDAOLogic {
	private provider: ethers.JsonRpcProvider;
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
	public async on(eventName: SupportedEventsType, listener: Function) {
		switch (eventName) {
			case "NewAdmin":
				this.Contract.on("NewAdmin", (oldAdmin: string, newAdmin: string, event: ethers.Log) => {
					const data: EventData.NewAdmin = {
						oldAdmin: { id: oldAdmin } as Account,
						newAdmin: { id: newAdmin } as Account,
						event: event
					};

					listener(data);
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

						listener(data);
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

					listener(data);
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

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCanceled":
				this.Contract.on("ProposalCanceled", (id: number, event: ethers.Log) => {
					const data: EventData.ProposalCanceled = {
						id: id,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreated":
				this.Contract.on(
					"ProposalCreated",
					(
						id: BigInt,
						proposer: string,
						targets: string[],
						values: BigInt[],
						signatures: string[],
						calldatas: any[], // type is bytes[]
						startBlock: BigInt,
						endBlock: BigInt,
						description: string,
						event: ethers.Log
					) => {
						const data: EventData.ProposalCreated = {
							id: id,
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

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreatedWithRequirements":
				this.Contract.on(
					"ProposalCreatedWithRequirements",
					(
						id: BigInt,
						proposer: string,
						targets: string[],
						values: BigInt[],
						signatures: string[],
						calldatas: any[], // bytes
						startBlock: BigInt,
						endBlock: BigInt,
						proposalThreshold: BigInt,
						quorumVotes: BigInt,
						description: string,
						event: ethers.Log
					) => {
						const data: EventData.ProposalCreatedWithRequirements = {
							id: id,
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							startBlock: startBlock,
							endBlock: endBlock,
							proposalThreshold: proposalThreshold,
							quorumVotes: quorumVotes,
							description: description,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalExecuted":
				this.Contract.on("ProposalExecuted", (id: number, event: ethers.Log) => {
					const data: EventData.ProposalExecuted = {
						id: id,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalQueued":
				this.Contract.on("ProposalQueued", (id: number, eta: number, event: ethers.Log) => {
					const data: EventData.ProposalQueued = {
						id: id,
						eta: eta,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalThresholdBPSSet":
				this.Contract.on(
					"ProposalThresholdBPSSet",
					(oldProposalThresholdBPS: number, newProposalThresholdBPS: number, event: ethers.Log) => {
						const data: EventData.ProposalThresholdBPSSet = {
							oldProposalThresholdBPS: oldProposalThresholdBPS,
							newProposalThresholdBPS: newProposalThresholdBPS,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalVetoed":
				this.Contract.on("ProposalVetoed", (id: number, event: ethers.Log) => {
					const data: EventData.ProposalVetoed = {
						id: id,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "QuorumVotesBPSSet":
				this.Contract.on(
					"QuorumVotesBPSSet",
					(oldQuorumVotesBPS: number, newQuorumVotesBPS: number, event: ethers.Log) => {
						const data: EventData.QuorumVotesBPSSet = {
							oldQuorumVotesBPS: oldQuorumVotesBPS,
							newQuorumVotesBPS: newQuorumVotesBPS,
							event: event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "VoteCast":
				this.Contract.on(
					"VoteCast",
					(voter: string, proposalId: number, support: number, votes: number, reason: string, event: ethers.Log) => {
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
				this.registeredListeners.set(eventName, listener);
				break;

			case "VotingDelaySet":
				this.Contract.on("VotingDelaySet", (oldVotingDelay: number, newVotingDelay: number, event: ethers.Log) => {
					const data: EventData.VotingDelaySet = {
						oldVotingDelay: oldVotingDelay,
						newVotingDelay: newVotingDelay,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "VotingPeriodSet":
				this.Contract.on("VotingPeriodSet", (oldVotingPeriod: number, newVotingPeriod: number, event: ethers.Log) => {
					const data: EventData.VotingPeriodSet = {
						oldVotingPeriod: oldVotingPeriod,
						newVotingPeriod: newVotingPeriod,
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
	public trigger(eventName: SupportedEventsType, data: unknown) {
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
}
