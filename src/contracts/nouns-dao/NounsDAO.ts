import { ethers } from "ethers-v6";
import { VoteDirection, Account, EventData } from "../../types";
import { default as NounsDAOLogicV3ABI } from "../abis/NounsDAOLogicV3.json";

export interface SupportedEventMap {
	DAOWithdrawNounsFromEscrow: EventData.DAOWithdrawNounsFromEscrow;
	ERC20TokensToIncludeInForkSet: EventData.ERC20TokensToIncludeInForkSet;
	EscrowedToFork: EventData.EscrowedToFork;
	ExecuteFork: EventData.ExecuteFork;
	ForkDAODeployerSet: EventData.ForkDAODeployerSet;
	ForkPeriodSet: EventData.ForkPeriodSet;
	ForkThresholdSet: EventData.ForkThresholdSet;
	JoinFork: EventData.JoinFork;
	LastMinuteWindowSet: EventData.LastMinuteWindowSet;
	MaxQuorumVotesBPSSet: EventData.MaxQuorumVotesBPSSet;
	MinQuorumVotesBPSSet: EventData.MinQuorumVotesBPSSet;
	NewAdmin: EventData.NewAdmin;
	NewImplementation: EventData.NewImplementation;
	NewPendingAdmin: EventData.NewPendingAdmin;
	NewPendingVetoer: EventData.NewPendingVetoer;
	NewVetoer: EventData.NewVetoer;
	ObjectionPeriodDurationSet: EventData.ObjectionPeriodDurationSet;
	ProposalCanceled: EventData.ProposalCanceled;
	ProposalCreated: EventData.ProposalCreated;
	ProposalCreatedOnTimelockV1: EventData.ProposalCreatedOnTimelockV1;
	ProposalCreatedWithRequirements: EventData.ProposalCreatedWithRequirements;
	ProposalDescriptionUpdated: EventData.ProposalDescriptionUpdated;
	ProposalExecuted: EventData.ProposalExecuted;
	ProposalObjectionPeriodSet: EventData.ProposalObjectionPeriodSet;
	ProposalQueued: EventData.ProposalQueued;
	ProposalThresholdBPSSet: EventData.ProposalThresholdBPSSet;
	ProposalTransactionsUpdated: EventData.ProposalTransactionsUpdated;
	ProposalUpdatablePeriodSet: EventData.ProposalUpdatablePeriodSet;
	ProposalUpdated: EventData.ProposalUpdated;
	ProposalVetoed: EventData.ProposalVetoed;
	QuorumCoefficientSet: EventData.QuorumCoefficientSet;
	QuorumVotesBPSSet: EventData.QuorumVotesBPSSet;
	RefundableVote: EventData.RefundableVote;
	SignatureCancelled: EventData.SignatureCancelled;
	TimelocksAndAdminSet: EventData.TimelocksAndAdminSet;
	VoteCast: EventData.VoteCast;
	VoteSnapshotBlockSwitchProposalIdSet: EventData.VoteSnapshotBlockSwitchProposalIdSet;
	VotingDelaySet: EventData.VotingDelaySet;
	VotingPeriodSet: EventData.VotingPeriodSet;
	Withdraw: EventData.Withdraw;
	WithdrawFromForkEscrow: EventData.WithdrawFromForkEscrow;
}
const SUPPORTED_NOUNS_DAO_EVENTS = [
	"DAOWithdrawNounsFromEscrow",
	"ERC20TokensToIncludeInForkSet",
	"EscrowedToFork",
	"ExecuteFork",
	"ForkDAODeployerSet",
	"ForkPeriodSet",
	"ForkThresholdSet",
	"JoinFork",
	"LastMinuteWindowSet",
	"MaxQuorumVotesBPSSet",
	"MinQuorumVotesBPSSet",
	"NewAdmin",
	"NewImplementation",
	"NewPendingAdmin",
	"NewPendingVetoer",
	"NewVetoer",
	"ObjectionPeriodDurationSet",
	"ProposalCanceled",
	"ProposalCreated",
	"ProposalCreatedOnTimelockV1",
	"ProposalCreatedWithRequirements",
	"ProposalDescriptionUpdated",
	"ProposalExecuted",
	"ProposalObjectionPeriodSet",
	"ProposalQueued",
	"ProposalThresholdBPSSet",
	"ProposalTransactionsUpdated",
	"ProposalUpdatablePeriodSet",
	"ProposalUpdated",
	"ProposalVetoed",
	"QuorumCoefficientSet",
	"QuorumVotesBPSSet",
	"RefundableVote",
	"SignatureCancelled",
	"TimelocksAndAdminSet",
	"VoteCast",
	"VoteSnapshotBlockSwitchProposalIdSet",
	"VotingDelaySet",
	"VotingPeriodSet",
	"Withdraw",
	"WithdrawFromForkEscrow"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

/**
 * A wrapper class around the NounsDAO contract.
 */
export class _NounsDAO {
	public provider: ethers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_DAO_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		if (typeof provider === "string") {
			this.provider = new ethers.JsonRpcProvider(provider);
		} else {
			this.provider = provider;
		}

		this.Contract = new ethers.Contract("0x6f3E6272A167e8AcCb32072d08E0957F9c79223d", NounsDAOLogicV3ABI, this.provider);
		this.registeredListeners = new Map();
	}

	/**
	 * Registers a listener function to the given event, triggering the function with the appropriate data whenever the event fires on the blockchain.
	 * Throws an error if the event is not supported.
	 * Listening to `ProposalCreatedWithRequirements` assigns the listener to both versions of the event.
	 * @param eventName The name of the event.
	 * @param listener The listener function.
	 * @example
	 * nounsDAO.on('VoteCast', (data) => {
	 * 	console.log(data.proposalId);
	 * });
	 */
	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "DAOWithdrawNounsFromEscrow":
				this.Contract.on("DAOWithdrawNounsFromEscrow", (tokenIds: BigInt[], to: string, event: ethers.Log) => {
					const data = {
						tokenIds: tokenIds.map((tokenId) => Number(tokenId)),
						to: { id: to } as Account,
						event: event
					} as EventData.DAOWithdrawNounsFromEscrow;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ERC20TokensToIncludeInForkSet":
				this.Contract.on(
					"ERC20TokensToIncludeInForkSet",
					(oldErc20Tokens: string[], newErc20tokens: string[], event: ethers.Log) => {
						const data = {
							oldErc20Tokens: oldErc20Tokens,
							newErc20tokens: newErc20tokens,
							event: event
						} as EventData.ERC20TokensToIncludeInForkSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "EscrowedToFork":
				this.Contract.on(
					"EscrowedToFork",
					(
						forkId: BigInt,
						owner: string,
						tokenIds: BigInt[],
						proposalIds: BigInt[],
						reason: string,
						event: ethers.Log
					) => {
						const data = {
							forkId: Number(forkId),
							owner: { id: owner } as Account,
							tokenIds: tokenIds,
							proposalIds: proposalIds,
							reason: reason,
							event: event
						} as EventData.EscrowedToFork;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ExecuteFork":
				this.Contract.on(
					"ExecuteFork",
					(
						forkId: BigInt,
						forkTreasury: string,
						forkToken: string,
						forkEndTimestamp: BigInt,
						tokensInEscrow: BigInt,
						event: ethers.Log
					) => {
						const data = {
							forkId: Number(forkId),
							forkTreasury: { id: forkTreasury } as Account,
							forkToken: { id: forkToken },
							forkEndTimestamp: forkEndTimestamp,
							tokensInEscrow: tokensInEscrow,
							event: event
						} as EventData.ExecuteFork;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ForkDAODeployerSet":
				this.Contract.on(
					"ForkDAODeployerSet",
					(oldForkDAODeployer: string, newForkDAODeployer: string, event: ethers.Log) => {
						const data = {
							oldForkDAODeployer: { id: oldForkDAODeployer } as Account,
							newForkDAODeployer: { id: newForkDAODeployer } as Account,
							event: event
						} as EventData.ForkDAODeployerSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ForkPeriodSet":
				this.Contract.on("ForkPeriodSet", (oldForkPeriod: BigInt, newForkPeriod: BigInt, event: ethers.Log) => {
					const data = {
						oldForkPeriod: oldForkPeriod,
						newForkPeriod: newForkPeriod,
						event: event
					} as EventData.ForkPeriodSet;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ForkThresholdSet":
				this.Contract.on(
					"ForkThresholdSet",
					(oldForkThreshold: BigInt, newForkThreshold: BigInt, event: ethers.Log) => {
						const data = {
							oldForkThreshold: oldForkThreshold,
							newForkThreshold: newForkThreshold,
							event: event
						} as EventData.ForkThresholdSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "JoinFork":
				this.Contract.on(
					"JoinFork",
					(
						forkId: BigInt,
						owner: string,
						tokenIds: BigInt[],
						proposalIds: BigInt[],
						reason: string,
						event: ethers.Log
					) => {
						const data = {
							forkId: Number(forkId),
							owner: { id: owner } as Account,
							tokenIds: tokenIds,
							proposalIds: proposalIds,
							reason: reason,
							event: event
						} as EventData.JoinFork;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "LastMinuteWindowSet":
				this.Contract.on(
					"LastMinuteWindowSet",
					(oldLastMinuteWindowInBlocks: BigInt, newLastMinuteWindowInBlocks: BigInt, event: ethers.Log) => {
						const data = {
							oldLastMinuteWindowInBlocks: oldLastMinuteWindowInBlocks,
							newLastMinuteWindowInBlocks: newLastMinuteWindowInBlocks,
							event: event
						} as EventData.LastMinuteWindowSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "MaxQuorumVotesBPSSet":
				this.Contract.on(
					"MaxQuorumVotesBPSSet",
					(oldMaxQuorumVotesBPS: BigInt, newMaxQuorumVotesBPS: BigInt, event: ethers.Log) => {
						const data = {
							oldMaxQuorumVotesBPS: Number(oldMaxQuorumVotesBPS),
							newMaxQuorumVotesBPS: Number(newMaxQuorumVotesBPS),
							event: event
						} as EventData.MaxQuorumVotesBPSSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "MinQuorumVotesBPSSet":
				this.Contract.on(
					"MinQuorumVotesBPSSet",
					(oldMinQuorumVotesBPS: BigInt, newMinQuorumVotesBPS: BigInt, event: ethers.Log) => {
						const data = {
							oldMinQuorumVotesBPS: Number(oldMinQuorumVotesBPS),
							newMinQuorumVotesBPS: Number(newMinQuorumVotesBPS),
							event: event
						} as EventData.MinQuorumVotesBPSSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "NewAdmin":
				/// @notice Emitted when pendingAdmin is accepted, which means admin is updated
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

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "NewImplementation":
				/// @notice Emitted when implementation is changed
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

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "NewPendingAdmin":
				/// @notice Emitted when pendingAdmin is changed
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

			case "NewPendingVetoer":
				this.Contract.on(
					"NewPendingVetoer",
					(oldPendingVetoer: string, newPendingVetoer: string, event: ethers.Log) => {
						const data = {
							oldPendingVetoer: { id: oldPendingVetoer } as Account,
							newPendingVetoer: { id: newPendingVetoer } as Account,
							event: event
						} as EventData.NewPendingVetoer;

						listener(data as any);
					}
				);
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

			case "ObjectionPeriodDurationSet":
				this.Contract.on(
					"ObjectionPeriodDurationSet",
					(
						oldObjectionPeriodDurationInBlocks: BigInt,
						newObjectionPeriodDurationInBlocks: BigInt,
						event: ethers.Log
					) => {
						const data = {
							oldObjectionPeriodDurationInBlocks: oldObjectionPeriodDurationInBlocks,
							newObjectionPeriodDurationInBlocks: newObjectionPeriodDurationInBlocks,
							event: event
						} as EventData.ObjectionPeriodDurationSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************

			case "ProposalCanceled":
				// @notice An event emitted when a proposal has been canceled
				this.Contract.on("ProposalCanceled", (id: BigInt, event: ethers.Log) => {
					const data: EventData.ProposalCanceled = {
						id: Number(id),
						event: event
					};

					listener(data as any);
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

			case "ProposalCreatedOnTimelockV1":
				this.Contract.on("ProposalCreatedOnTimelockV1", (id: BigInt, event: ethers.Log) => {
					const data = {
						id: Number(id),
						event: event
					} as EventData.ProposalCreatedOnTimelockV1;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// TODO - just return calldata, object construction (ie Proposal) goes in other file
			// **********************************************************

			case "ProposalCreatedWithRequirements":
				/// @notice An event emitted when a new proposal is created
				this.Contract.on(
					"ProposalCreatedWithRequirements(uint256,address,address[],address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,uint256,string)",
					(
						id: BigInt,
						proposer: string,
						signers: string[],
						targets: string[],
						values: BigInt[],
						signatures: string[],
						calldatas: any[], // bytes
						startBlock: BigInt,
						endBlock: BigInt,
						updatePeriodEndBlock: BigInt,
						proposalThreshold: BigInt,
						quorumVotes: BigInt,
						description: string,
						event: ethers.Log
					) => {
						const data: EventData.ProposalCreatedWithRequirements = {
							id: Number(id),
							proposer: { id: proposer } as Account,
							signers: signers,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							startBlock: startBlock,
							endBlock: endBlock,
							updatePeriodEndBlock: updatePeriodEndBlock,
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

			case "ProposalDescriptionUpdated":
				this.Contract.on(
					"ProposalDescriptionUpdated",
					(id: BigInt, proposer: string, description: string, updatedMessage: string, event: ethers.Log) => {
						const data = {
							id: Number(id),
							proposer: { id: proposer } as Account,
							description: description,
							updatedMessage: updatedMessage,
							event: event
						} as EventData.ProposalDescriptionUpdated;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalExecuted": // FUNCTIONING CORRECTLY
				// An event emitted when a proposal has been executed in the NounsDAOExecutor
				this.Contract.on("ProposalExecuted", (id: BigInt, event: ethers.Log) => {
					const data: EventData.ProposalExecuted = {
						id: Number(id),
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalObjectionPeriodSet":
				this.Contract.on(
					"ProposalObjectionPeriodSet",
					(id: BigInt, objectionPeriodEndBlock: BigInt, event: ethers.Log) => {
						const data = {
							id: Number(id),
							objectionPeriodEndBlock: objectionPeriodEndBlock,
							event: event
						} as EventData.ProposalObjectionPeriodSet;

						listener(data as any);
					}
				);
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
				this.Contract.on("ProposalQueued", (id: BigInt, eta: BigInt, event: ethers.Log) => {
					const data: EventData.ProposalQueued = {
						id: Number(id),
						eta: eta,
						event: event
					};
					listener(data as any);
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
					(oldProposalThresholdBPS: BigInt, newProposalThresholdBPS: BigInt, event: ethers.Log) => {
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

			case "ProposalTransactionsUpdated":
				this.Contract.on(
					"ProposalTransactionsUpdated",
					(
						id: BigInt,
						proposer: string,
						targets: string[],
						values: BigInt[],
						signatures: string[],
						calldatas: any[],
						updateMessage: string,
						event: ethers.Log
					) => {
						const data = {
							id: Number(id),
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							updateMessage: updateMessage,
							event: event
						} as EventData.ProposalTransactionsUpdated;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalUpdatablePeriodSet":
				this.Contract.on(
					"ProposalUpdatablePeriodSet",
					(
						oldProposalUpdatablePeriodInBlocks: BigInt,
						newProposalUpdatablePeriodInBlocks: BigInt,
						event: ethers.Log
					) => {
						const data = {
							oldProposalUpdatablePeriodInBlocks: oldProposalUpdatablePeriodInBlocks,
							newProposalUpdatablePeriodInBlocks: newProposalUpdatablePeriodInBlocks,
							event: event
						} as EventData.ProposalUpdatablePeriodSet;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalUpdated":
				this.Contract.on(
					"ProposalUpdated",
					(
						id: BigInt,
						proposer: string,
						targets: string[],
						values: BigInt[],
						signatures: string[],
						calldatas: any[],
						description: string,
						updateMessage: string,
						event: ethers.Log
					) => {
						const data = {
							id: Number(id),
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							description: description,
							updateMessage: updateMessage,
							event: event
						} as EventData.ProposalUpdated;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			// **********************************************************
			//
			// STATUS: TESTING AND DOCUMENTATION NEEDED
			//
			// **********************************************************
			case "ProposalVetoed":
				/// @notice An event emitted when a proposal has been vetoed by vetoAddress
				this.Contract.on("ProposalVetoed", (id: BigInt, event: ethers.Log) => {
					const data: EventData.ProposalVetoed = {
						id: Number(id),
						event: event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "QuorumCoefficientSet":
				this.Contract.on(
					"QuorumCoefficientSet",
					(oldQuorumCoefficient: BigInt, newQuorumCoefficient: BigInt, event: ethers.Log) => {
						const data = {
							oldQuorumCoefficient: Number(oldQuorumCoefficient),
							newQuorumCoefficient: Number(newQuorumCoefficient),
							event: event
						} as EventData.QuorumCoefficientSet;

						listener(data as any);
					}
				);
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
					(oldQuorumVotesBPS: BigInt, newQuorumVotesBPS: BigInt, event: ethers.Log) => {
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

			case "RefundableVote":
				this.Contract.on(
					"RefundableVote",
					(voter: string, refundAmount: BigInt, refundSent: boolean, event: ethers.Log) => {
						const data = {
							voter: { id: voter } as Account,
							refundAmount: refundAmount,
							refundSent: refundSent,
							event: event
						} as EventData.RefundableVote;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "SignatureCancelled":
				this.Contract.on("SignatureCancelled", (signer: string, sig: any, event: ethers.Log) => {
					const data = {
						signer: { id: signer } as Account,
						sig: sig,
						event: event
					} as EventData.SignatureCancelled;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "TimelocksAndAdminSet":
				this.Contract.on(
					"TimelocksAndAdminSet",
					(timelock: string, timelockV1: string, admin: string, event: ethers.Log) => {
						const data = {
							timelock: { id: timelock } as Account,
							timelockV1: { id: timelockV1 } as Account,
							admin: { id: admin } as Account,
							event: event
						} as EventData.TimelocksAndAdminSet;

						listener(data as any);
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
					(voter: string, proposalId: BigInt, support: BigInt, votes: BigInt, reason: string, event: ethers.Log) => {
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

			case "VoteSnapshotBlockSwitchProposalIdSet":
				this.Contract.on(
					"VoteSnapshotBlockSwitchProposalIdSet",
					(
						oldVoteSnapshotBlockSwitchProposalId: BigInt,
						newVoteSnapshotBlockSwitchProposalId: BigInt,
						event: ethers.Log
					) => {
						const data = {
							oldVoteSnapshotBlockSwitchProposalId: Number(oldVoteSnapshotBlockSwitchProposalId),
							newVoteSnapshotBlockSwitchProposalId: Number(newVoteSnapshotBlockSwitchProposalId),
							event: event
						} as EventData.VoteSnapshotBlockSwitchProposalIdSet;

						listener(data as any);
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
				this.Contract.on("VotingDelaySet", (oldVotingDelay: BigInt, newVotingDelay: BigInt, event: ethers.Log) => {
					const data: EventData.VotingDelaySet = {
						oldVotingDelay: oldVotingDelay,
						newVotingDelay: newVotingDelay,
						event: event
					};

					listener(data as any);
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
				this.Contract.on("VotingPeriodSet", (oldVotingPeriod: BigInt, newVotingPeriod: BigInt, event: ethers.Log) => {
					const data: EventData.VotingPeriodSet = {
						oldVotingPeriod: oldVotingPeriod,
						newVotingPeriod: newVotingPeriod,
						event: event
					};

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "Withdraw":
				this.Contract.on("Withdraw", (amount: BigInt, sent: boolean, event: ethers.Log) => {
					const data = {
						amount: amount,
						sent: sent,
						event: event
					} as EventData.Withdraw;

					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "WithdrawFromForkEscrow":
				this.Contract.on(
					"WithdrawFromForkEscrow",
					(forkId: BigInt, owner: string, tokenIds: BigInt[], event: ethers.Log) => {
						const data = {
							forkId: Number(forkId),
							owner: { id: owner } as Account,
							tokenIds: tokenIds.map((tokenId) => Number(tokenId)),
							event: event
						} as EventData.WithdrawFromForkEscrow;

						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * @returns The name of the contract. `NounsDAO`.
	 */
	public name() {
		return "NounsDAO";
	}

	/**
	 * Removes an event listener.
	 * @param eventName the event listened to.
	 * @example
	 * nounsDAO.off('VoteCast');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			if (eventName === "ProposalCreatedWithRequirements") {
				this.Contract.off(
					"ProposalCreatedWithRequirements(uint256,address,address[],address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,uint256,string)",
					listener as ethers.Listener
				);
			} else {
				this.Contract.off(eventName, listener as ethers.Listener);
			}
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers an event. Throws an error if no listener is found.
	 * @param eventName the name of the event.
	 * @param data the event data.
	 * @example
	 * nounsDAO.trigger('VoteCast', {
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
}

// Nouns DAO Proxy -
// https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/governance/NounsDAOProxy.sol
