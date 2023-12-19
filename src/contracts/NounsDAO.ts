import { ethers, BigNumber } from "ethers";
import { VoteDirection, Account, EventData } from "../types";
import { SUPPORTED_NOUNS_DAO_EVENTS } from "../constants";
import { default as NounsDAOLogicV3ABI } from "./abis/NounsDAOLogicV3.json";

export type SupportedEventsType = (typeof SUPPORTED_NOUNS_DAO_EVENTS)[number];

/**
 * A wrapper class around the NounsDAO contract.
 */
export class _NounsDAO {
	private provider: ethers.providers.JsonRpcProvider;
	public Contract: ethers.Contract;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_NOUNS_DAO_EVENTS;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
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
	public async on(eventName: SupportedEventsType, listener: Function) {
		switch (eventName) {
			case "DAOWithdrawNounsFromEscrow":
				this.Contract.on("DAOWithdrawNounsFromEscrow", (tokenIds: number[], to: string, event: ethers.Event) => {
					const data = {
						tokenIds: tokenIds,
						to: { id: to } as Account,
						event: event
					} as EventData.DAOWithdrawNounsFromEscrow;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ERC20TokensToIncludeInForkSet":
				this.Contract.on(
					"ERC20TokensToIncludeInForkSet",
					(oldErc20Tokens: string[], newErc20tokens: string[], event: ethers.Event) => {
						const data = {
							oldErc20Tokens: oldErc20Tokens,
							newErc20tokens: newErc20tokens,
							event: event
						} as EventData.ERC20TokensToIncludeInForkSet;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "EscrowedToFork":
				this.Contract.on(
					"EscrowedToFork",
					(
						forkId: number,
						owner: string,
						tokenIds: number[],
						proposalIds: number[],
						reason: string,
						event: ethers.Event
					) => {
						const data = {
							forkId: forkId,
							owner: { id: owner } as Account,
							tokenIds: tokenIds,
							proposalIds: proposalIds,
							reason: reason,
							event: event
						} as EventData.EscrowedToFork;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ExecuteFork":
				this.Contract.on(
					"ExecuteFork",
					(
						forkId: number,
						forkTreasury: string,
						forkToken: string,
						forkEndTimestamp: number,
						tokensInEscrow: number,
						event: ethers.Event
					) => {
						const data = {
							forkId: forkId,
							forkTreasury: { id: forkTreasury } as Account,
							forkToken: { id: forkToken },
							forkEndTimestamp: forkEndTimestamp,
							tokensInEscrow: tokensInEscrow,
							event: event
						} as EventData.ExecuteFork;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ForkDAODeployerSet":
				this.Contract.on(
					"ForkDAODeployerSet",
					(oldForkDAODeployer: string, newForkDAODeployer: string, event: ethers.Event) => {
						const data = {
							oldForkDAODeployer: { id: oldForkDAODeployer } as Account,
							newForkDAODeployer: { id: newForkDAODeployer } as Account,
							event: event
						} as EventData.ForkDAODeployerSet;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ForkPeriodSet":
				this.Contract.on("ForkPeriodSet", (oldForkPeriod: number, newForkPeriod: number, event: ethers.Event) => {
					const data = {
						oldForkPeriod: oldForkPeriod,
						newForkPeriod: newForkPeriod,
						event: event
					} as EventData.ForkPeriodSet;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "ForkThresholdSet":
				this.Contract.on(
					"ForkThresholdSet",
					(oldForkThreshold: number, newForkThreshold: number, event: ethers.Event) => {
						const data = {
							oldForkThreshold: oldForkThreshold,
							newForkThreshold: newForkThreshold,
							event: event
						} as EventData.ForkThresholdSet;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "JoinFork":
				this.Contract.on(
					"JoinFork",
					(
						forkId: number,
						owner: string,
						tokenIds: number[],
						proposalIds: number[],
						reason: string,
						event: ethers.Event
					) => {
						const data = {
							forkId: forkId,
							owner: { id: owner } as Account,
							tokenIds: tokenIds,
							proposalIds: proposalIds,
							reason: reason,
							event: event
						} as EventData.JoinFork;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "LastMinuteWindowSet":
				this.Contract.on(
					"LastMinuteWindowSet",
					(oldLastMinuteWindowInBlocks: number, newLastMinuteWindowInBlocks: number, event: ethers.Event) => {
						const data = {
							oldLastMinuteWindowInBlocks: oldLastMinuteWindowInBlocks,
							newLastMinuteWindowInBlocks: newLastMinuteWindowInBlocks,
							event: event
						} as EventData.LastMinuteWindowSet;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "MaxQuorumVotesBPSSet":
				this.Contract.on(
					"MaxQuorumVotesBPSSet",
					(oldMaxQuorumVotesBPS: number, newMaxQuorumVotesBPS: number, event: ethers.Event) => {
						const data = {
							oldMaxQuorumVotesBPS: oldMaxQuorumVotesBPS,
							newMaxQuorumVotesBPS: newMaxQuorumVotesBPS,
							event: event
						} as EventData.MaxQuorumVotesBPSSet;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "MinQuorumVotesBPSSet":
				this.Contract.on(
					"MinQuorumVotesBPSSet",
					(oldMinQuorumVotesBPS: number, newMinQuorumVotesBPS: number, event: ethers.Event) => {
						const data = {
							oldMinQuorumVotesBPS: oldMinQuorumVotesBPS,
							newMinQuorumVotesBPS: newMinQuorumVotesBPS,
							event: event
						} as EventData.MinQuorumVotesBPSSet;

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

			case "NewPendingVetoer":
				this.Contract.on(
					"NewPendingVetoer",
					(oldPendingVetoer: string, newPendingVetoer: string, event: ethers.Event) => {
						const data = {
							oldPendingVetoer: { id: oldPendingVetoer } as Account,
							newPendingVetoer: { id: newPendingVetoer } as Account,
							event: event
						} as EventData.NewPendingVetoer;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
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
				this.registeredListeners.set(eventName, listener);
				break;

			case "ObjectionPeriodDurationSet":
				this.Contract.on(
					"ObjectionPeriodDurationSet",
					(
						oldObjectionPeriodDurationInBlocks: number,
						newObjectionPeriodDurationInBlocks: number,
						event: ethers.Event
					) => {
						const data = {
							oldObjectionPeriodDurationInBlocks: oldObjectionPeriodDurationInBlocks,
							newObjectionPeriodDurationInBlocks: newObjectionPeriodDurationInBlocks,
							event: event
						} as EventData.ObjectionPeriodDurationSet;

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

			case "ProposalCreatedOnTimelockV1":
				this.Contract.on("ProposalCreatedOnTimelockV1", (id: number, event: ethers.Event) => {
					const data = {
						id: id,
						event: event
					} as EventData.ProposalCreatedOnTimelockV1;

					listener(data);
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
						id: BigNumber,
						proposer: string,
						signers: string[],
						targets: string[],
						values: BigNumber[],
						signatures: string[],
						calldatas: any[], // bytes
						startBlock: BigNumber,
						endBlock: BigNumber,
						updatePeriodEndBlock: number,
						proposalThreshold: BigNumber,
						quorumVotes: BigNumber,
						description: string,
						event: ethers.Event
					) => {
						const data: EventData.ProposalCreatedWithRequirements = {
							id: id.toNumber(),
							proposer: { id: proposer } as Account,
							signers: signers,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							startBlock: startBlock.toNumber(),
							endBlock: endBlock.toNumber(),
							updatePeriodEndBlock: updatePeriodEndBlock,
							proposalThreshold: proposalThreshold.toNumber(),
							quorumVotes: quorumVotes.toNumber(),
							description: description,
							event: event
						};

						listener(data);
					}
				);
				this.Contract.on(
					"ProposalCreatedWithRequirements(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,string)",
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

			case "ProposalDescriptionUpdated":
				this.Contract.on(
					"ProposalDescriptionUpdated",
					(id: number, proposer: string, description: string, updatedMessage: string, event: ethers.Event) => {
						const data = {
							id: id,
							proposer: { id: proposer } as Account,
							description: description,
							updatedMessage: updatedMessage,
							event: event
						} as EventData.ProposalDescriptionUpdated;

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

			case "ProposalObjectionPeriodSet":
				this.Contract.on(
					"ProposalObjectionPeriodSet",
					(id: number, objectionPeriodEndBlock: number, event: ethers.Event) => {
						const data = {
							id: id,
							objectionPeriodEndBlock: objectionPeriodEndBlock,
							event: event
						} as EventData.ProposalObjectionPeriodSet;

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

			case "ProposalTransactionsUpdated":
				this.Contract.on(
					"ProposalTransactionsUpdated",
					(
						id: number,
						proposer: string,
						targets: string[],
						values: number[],
						signatures: string[],
						calldatas: any[],
						updateMessage: string,
						event: ethers.Event
					) => {
						const data = {
							id: id,
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							updateMessage: updateMessage,
							event: event
						} as EventData.ProposalTransactionsUpdated;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalUpdatablePeriodSet":
				this.Contract.on(
					"ProposalUpdatablePeriodSet",
					(
						oldProposalUpdatablePeriodInBlocks: number,
						newProposalUpdatablePeriodInBlocks: number,
						event: ethers.Event
					) => {
						const data = {
							oldProposalUpdatablePeriodInBlocks: oldProposalUpdatablePeriodInBlocks,
							newProposalUpdatablePeriodInBlocks: newProposalUpdatablePeriodInBlocks,
							event: event
						} as EventData.ProposalUpdatablePeriodSet;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "ProposalUpdated":
				this.Contract.on(
					"ProposalUpdated",
					(
						id: number,
						proposer: string,
						targets: string[],
						values: number[],
						signatures: string[],
						calldatas: any[],
						description: string,
						updateMessage: string,
						event: ethers.Event
					) => {
						const data = {
							id: id,
							proposer: { id: proposer } as Account,
							targets: targets,
							values: values,
							signatures: signatures,
							calldatas: calldatas,
							description: description,
							updateMessage: updateMessage,
							event: event
						} as EventData.ProposalUpdated;

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
			case "ProposalVetoed":
				/// @notice An event emitted when a proposal has been vetoed by vetoAddress
				this.Contract.on("ProposalVetoed", (id: number, event: ethers.Event) => {
					const data: EventData.ProposalVetoed = {
						id: id,
						event: event
					};
					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "QuorumCoefficientSet":
				this.Contract.on(
					"QuorumCoefficientSet",
					(oldQuorumCoefficient: number, newQuorumCoefficient: number, event: ethers.Event) => {
						const data = {
							oldQuorumCoefficient: oldQuorumCoefficient,
							newQuorumCoefficient: newQuorumCoefficient,
							event: event
						} as EventData.QuorumCoefficientSet;

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

			case "RefundableVote":
				this.Contract.on(
					"RefundableVote",
					(voter: string, refundAmount: number, refundSent: boolean, event: ethers.Event) => {
						const data = {
							voter: { id: voter } as Account,
							refundAmount: refundAmount,
							refundSent: refundSent,
							event: event
						} as EventData.RefundableVote;

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;

			case "SignatureCancelled":
				this.Contract.on("SignatureCancelled", (signer: string, sig: any, event: ethers.Event) => {
					const data = {
						signer: { id: signer } as Account,
						sig: sig,
						event: event
					} as EventData.SignatureCancelled;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "TimelocksAndAdminSet":
				this.Contract.on(
					"TimelocksAndAdminSet",
					(timelock: string, timelockV1: string, admin: string, event: ethers.Event) => {
						const data = {
							timelock: { id: timelock } as Account,
							timelockV1: { id: timelockV1 } as Account,
							admin: { id: admin } as Account,
							event: event
						} as EventData.TimelocksAndAdminSet;

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

			case "VoteSnapshotBlockSwitchProposalIdSet":
				this.Contract.on(
					"VoteSnapshotBlockSwitchProposalIdSet",
					(
						oldVoteSnapshotBlockSwitchProposalId: number,
						newVoteSnapshotBlockSwitchProposalId: number,
						event: ethers.Event
					) => {
						const data = {
							oldVoteSnapshotBlockSwitchProposalId: oldVoteSnapshotBlockSwitchProposalId,
							newVoteSnapshotBlockSwitchProposalId: newVoteSnapshotBlockSwitchProposalId,
							event: event
						} as EventData.VoteSnapshotBlockSwitchProposalIdSet;

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

			case "Withdraw":
				this.Contract.on("Withdraw", (amount: number, sent: boolean, event: ethers.Event) => {
					const data = {
						amount: amount,
						sent: sent,
						event: event
					} as EventData.Withdraw;

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			case "WithdrawFromForkEscrow":
				this.Contract.on(
					"WithdrawFromForkEscrow",
					(forkId: number, owner: string, tokenIds: number[], event: ethers.Event) => {
						const data = {
							forkId: forkId,
							owner: { id: owner } as Account,
							tokenIds: tokenIds,
							event: event
						} as EventData.WithdrawFromForkEscrow;

						listener(data);
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
					listener as ethers.providers.Listener
				);
				this.Contract.off(
					"ProposalCreatedWithRequirements(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,string)",
					listener as ethers.providers.Listener
				);
			} else {
				this.Contract.off(eventName, listener as ethers.providers.Listener);
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
	public trigger(eventName: SupportedEventsType, data: unknown) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}
}

// Nouns DAO Proxy -
// https://github.com/nounsDAO/nouns-monorepo/blob/master/packages/nouns-contracts/contracts/governance/NounsDAOProxy.sol
