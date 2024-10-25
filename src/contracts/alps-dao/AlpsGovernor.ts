import { ethers } from "ethers";
import { EventData } from "../../types";
import { default as AlpsGovernorABI } from "../abis/alps/AlpsGovernor.json";
import { createOrReturnProvider } from "../../utilities/providers";

export interface SupportedEventMap {
	NewAdmin: EventData.Alps.Governor.NewAdmin;
	NewImplementation: EventData.Alps.Governor.NewImplementation;
	NewPendingAdmin: EventData.Alps.Governor.NewPendingAdmin;
	NewVetoer: EventData.Alps.Governor.NewVetoer;
	ProposalCanceled: EventData.Alps.Governor.ProposalCanceled;
	ProposalCreated: EventData.Alps.Governor.ProposalCreated;
	ProposalCreatedWithRequirements: EventData.Alps.Governor.ProposalCreatedWithRequirements;
	ProposalExecuted: EventData.Alps.Governor.ProposalExecuted;
	ProposalQueued: EventData.Alps.Governor.ProposalQueued;
	ProposalThresholdBPSSet: EventData.Alps.Governor.ProposalThresholdBPSSet;
	ProposalVetoed: EventData.Alps.Governor.ProposalVetoed;
	QuorumVotesBPSSet: EventData.Alps.Governor.QuorumVotesBPSSet;
	VoteCast: EventData.Alps.Governor.VoteCast;
	VotingDelaySet: EventData.Alps.Governor.VotingDelaySet;
	VotingPeriodSet: EventData.Alps.Governor.VotingPeriodSet;
}
const SUPPORTED_ALPS_GOVERNOR_EVENTS = [
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

export class AlpsGovernor {
	private provider: ethers.JsonRpcProvider;
	public contract: ethers.Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_ALPS_GOVERNOR_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);

		this.contract = new ethers.Contract("0x40A113d1FfeC298a95969eca1d8a52261A10dC53", AlpsGovernorABI, this.provider);
		this.registeredListeners = new Map();
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "NewAdmin":
				this.contract.on(eventName, (oldAdmin: string, newAdmin: string, event: ethers.Log) => {
					const data: EventData.Alps.Governor.NewAdmin = {
						oldAdmin: { id: oldAdmin },
						newAdmin: { id: newAdmin },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewImplementation":
				this.contract.on(eventName, (oldImplementation: string, newImplementation: string, event: ethers.Log) => {
					const data: EventData.Alps.Governor.NewImplementation = {
						oldImplementation: { id: oldImplementation },
						newImplementation: { id: newImplementation },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewPendingAdmin":
				this.contract.on(eventName, (oldPendingAdmin: string, newPendingAdmin: string, event: ethers.Log) => {
					const data: EventData.Alps.Governor.NewPendingAdmin = {
						oldPendingAdmin: { id: oldPendingAdmin },
						newPendingAdmin: { id: newPendingAdmin },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "NewVetoer":
				this.contract.on(eventName, (oldVetoer: string, newVetoer: string, event: ethers.Log) => {
					const data: EventData.Alps.Governor.NewVetoer = {
						oldVetoer: { id: oldVetoer },
						newVetoer: { id: newVetoer },
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCanceled":
				this.contract.on(eventName, (id: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Governor.ProposalCanceled = {
						id: Number(id),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreated":
				this.contract.on(
					eventName,
					(
						id: bigint,
						proposer: string,
						targets: string[],
						values: bigint[],
						signatures: string[],
						calldatas: string[],
						startBlock: bigint,
						endBlock: bigint,
						description: string,
						event: ethers.Log
					) => {
						const data: EventData.Alps.Governor.ProposalCreated = {
							id: Number(id),
							proposer: { id: proposer },
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							startBlock: Number(startBlock),
							endBlock: Number(endBlock),
							description: description,
							event: event
						};

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreatedWithRequirements":
				this.contract.on(
					eventName,
					(
						id: bigint,
						proposer: string,
						targets: string[],
						values: bigint[],
						signatures: string[],
						calldatas: string[],
						startBlock: bigint,
						endBlock: bigint,
						proposalThreshold: bigint,
						quorumVotes: bigint,
						description: string,
						event: ethers.Log
					) => {
						const data: EventData.Alps.Governor.ProposalCreatedWithRequirements = {
							id: Number(id),
							proposer: { id: proposer },
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							startBlock: Number(startBlock),
							endBlock: Number(endBlock),
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
				this.contract.on(eventName, (id: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Governor.ProposalExecuted = {
						id: Number(id),
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalQueued":
				this.contract.on(eventName, (id: bigint, eta: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Governor.ProposalQueued = {
						id: Number(id),
						eta: eta,
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalThresholdBPSSet":
				this.contract.on(
					eventName,
					(oldProposalThresholdBPS: bigint, newProposalThresholdBPS: bigint, event: ethers.Log) => {
						const data: EventData.Alps.Governor.ProposalThresholdBPSSet = {
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
				this.contract.on(eventName, (id: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Governor.ProposalVetoed = {
						id: Number(id),
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "QuorumVotesBPSSet":
				this.contract.on(eventName, (oldQuorumVotesBPS: bigint, newQuorumVotesBPS: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Governor.QuorumVotesBPSSet = {
						oldQuorumVotesBPS: Number(oldQuorumVotesBPS),
						newQuorumVotesBPS: Number(newQuorumVotesBPS),
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "VoteCast":
				this.contract.on(
					eventName,
					(voter: string, proposalId: bigint, support: bigint, votes: bigint, reason: string, event: ethers.Log) => {
						const data: EventData.Alps.Governor.VoteCast = {
							voter: { id: voter },
							proposalId: Number(proposalId),
							support: Number(support),
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
				this.contract.on(eventName, (oldVotingDelay: bigint, newVotingDelay: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Governor.VotingDelaySet = {
						oldVotingDelay: oldVotingDelay,
						newVotingDelay: newVotingDelay,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "VotingPeriodSet":
				this.contract.on(eventName, (oldVotingPeriod: bigint, newVotingPeriod: bigint, event: ethers.Log) => {
					const data: EventData.Alps.Governor.VotingPeriodSet = {
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
		return "AlpsGovernor";
	}

	public hasEvent(eventName: string) {
		return AlpsGovernor.supportedEvents.includes(eventName as SupportedEventsType);
	}
}
