import { ethers, BigNumber } from "ethers";
import { VoteDirection, Account, EventData } from "../../types";
import { default as NounsForkABI } from "../abis/NounsForkGovernance.json";

const SUPPORTED_NOUNS_FORK_EVENTS = [
	"NewAdmin",
	"NewImplementation",
	"NewPendingAdmin",
	"ProposalCanceled",
	"ProposalCreated",
	"ProposalCreatedWithRequirements",
	"ProposalExecuted",
	"ProposalQueued",
	"ProposalThresholdBPSSet",
	"Quit",
	"QuorumVotesBPSSet",
	"VoteCast",
	"VotingDelaySet",
	"VotingPeriodSet"
] as const;
export type SupportedEventsType = (typeof SUPPORTED_NOUNS_FORK_EVENTS)[number];

/**
 * A wrapper around the NounsFork governance contract.
 */
export class _NounsForkLogic {
	private _forkId: number;
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_FORK_EVENTS;
	public static readonly forkAddress = [
		"0xa30e1fbb8e1b5d6487e9f3dda55df05e225f82b6",
		"0x5b8dd9f30425a7e6942c2ecf1d87acafbeab3073",
		"0xcf8b3ce9e92990a689fbdc886585a84ea0e4aece"
	];

	constructor(provider: ethers.providers.JsonRpcProvider, forkId = 0) {
		this.provider = provider;
		this._forkId = forkId;
		this.Contract = new ethers.Contract(_NounsForkLogic.forkAddress[forkId], NounsForkABI, this.provider);
		this.registeredListeners = new Map<SupportedEventsType, Function>();
	}

	get forkId() {
		return this._forkId;
	}

	get address() {
		return _NounsForkLogic.forkAddress[this._forkId];
	}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * Throws an error if the event is not supported.
	 * @param eventName The name of the event.
	 * @param listener The listener function.
	 * @example
	 * nounsFork.on('VoteCast', (data) => {
	 * 	console.log(data.proposalId);
	 * });
	 */
	public async on(eventName: SupportedEventsType, listener: Function) {
		switch (eventName) {
			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "NewAdmin":
				/// @notice Emitted when pendingAdmin is accepted, which means admin is updated
				this.Contract.on("NewAdmin", (oldAdmin: string, newAdmin: string, event: ethers.Event) => {
					const data: EventData.NewAdmin = {
						oldAdmin: { id: oldAdmin } as Account,
						newAdmin: { id: newAdmin } as Account,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "NewImplementation":
				/// @notice Emitted when implementation is changed
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
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "NewPendingAdmin":
				/// @notice Emitted when pendingAdmin is changed
				this.Contract.on("NewPendingAdmin", (oldPendingAdmin: string, newPendingAdmin: string, event: ethers.Event) => {
					const data: EventData.NewPendingAdmin = {
						oldPendingAdmin: { id: oldPendingAdmin } as Account,
						newPendingAdmin: { id: newPendingAdmin } as Account,
						event: event
					};

					listener(data);
				});

				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************

			case "ProposalCanceled":
				// @notice An event emitted when a proposal has been canceled
				this.Contract.on("ProposalCanceled", (id: number, event: ethers.Event) => {
					const data: EventData.ProposalCanceled = {
						id: id,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			// TODO - just return calldata, object construction (ie Proposal) goes in other file
			//
			// **********************************************************

			case "ProposalCreated":
				/// @notice An event emitted when a new proposal is created
				this.Contract.on(
					"ProposalCreated",
					(
						id: BigNumber,
						proposer: string,
						targets: string[],
						values: BigNumber[],
						signatures: string[],
						calldatas: any[], // type is bytes[]
						startBlock: BigNumber,
						endBlock: BigNumber,
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
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// TODO - just return calldata, object construction (ie Proposal) goes in other file
			// **********************************************************

			case "ProposalCreatedWithRequirements":
				this.Contract.on(
					"ProposalCreatedWithRequirements",
					(
						id: BigNumber,
						proposer: string,
						targets: string[],
						values: BigNumber[],
						signatures: string[],
						calldatas: any[], // bytes
						startBlock: BigNumber,
						endBlock: BigNumber,
						proposalThreshold: BigNumber,
						quorumVotes: BigNumber,
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
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalExecuted": // FUNCTIONING CORRECTLY
				// An event emitted when a proposal has been executed in the NounsDAOExecutor
				this.Contract.on("ProposalExecuted", (id: number, event: ethers.Event) => {
					const data: EventData.ProposalExecuted = {
						id: id,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************

			case "ProposalQueued":
				/// @notice An event emitted when a proposal has been queued in the NounsDAOExecutor
				/// @param eta The timestamp that the proposal will be available for execution, set once the vote succeeds
				this.Contract.on("ProposalQueued", (id: number, eta: number, event: ethers.Event) => {
					const data: EventData.ProposalQueued = {
						id: id,
						eta: eta,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "ProposalThresholdBPSSet":
				/// @notice Emitted when proposal threshold basis points is set
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
				this.registeredListeners.set(eventName, listener);
				break;

			case "Quit":
				/// @notice Emitted when quorum votes basis points is set
				this.Contract.on("Quit", (msgSender: string, tokenIds: number[], event: ethers.Event) => {
					const data: EventData.Quit = {
						msgSender: { id: msgSender } as Account,
						tokenIds: tokenIds,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "QuorumVotesBPSSet":
				/// @notice Emitted when quorum votes basis points is set
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
				this.registeredListeners.set(eventName, listener);
				break;

			case "VoteCast": // WORKING
				// / @notice An event emitted when a vote has been cast on a proposal
				// / @param voter The address which casted a vote
				// / @param proposalId The proposal id which was voted on
				// / @param support Support value for the vote. 0=against, 1=for, 2=abstain
				// / @param votes Number of votes which were cast by the voter
				// / @param reason The reason given for the vote by the voter

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
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "VotingDelaySet":
				/// @notice An event emitted when the voting delay is set
				this.Contract.on("VotingDelaySet", (oldVotingDelay: number, newVotingDelay: number, event: ethers.Event) => {
					const data: EventData.VotingDelaySet = {
						oldVotingDelay: oldVotingDelay,
						newVotingDelay: newVotingDelay,
						event: event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "VotingPeriodSet":
				/// @notice An event emitted when the voting period is set
				this.Contract.on("VotingPeriodSet", (oldVotingPeriod: number, newVotingPeriod: number, event: ethers.Event) => {
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
	 * @param eventName the name of the event.
	 * @example
	 * nounsFork.off('VoteCast');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.Contract.off(eventName, listener as ethers.providers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers the listener of the given event with the given data.
	 * Throws an error if there is no assigned listener.
	 * @param eventName The event to be triggered.
	 * @param data The data being passed to the listener.
	 * @example
	 * nounsFork.trigger('VoteCast', {
	 * 	voter: { id: "0x281eC184E704CE57570614C33B3477Ec7Ff07243" },
	 * 	proposalId: 117,
	 * 	supportDetailed: 0,
	 * 	votes: 24,
	 * 	reason: "Really good reason.",
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
	 * @returns The name of the contract. `NounsForkLogic`.
	 */
	public name() {
		return "NounsForkLogic";
	}
}

// Nouns DAO Proxy -
// https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/governance/NounsDAOProxy.sol
