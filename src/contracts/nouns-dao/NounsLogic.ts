import { Contract, ethers, Typed } from "ethers";
import { VoteDirection, Account, EventData } from "../../types";
import { createOrReturnProvider } from "../../utilities/providers";
import { createNounsDaoLogicV4Contract } from "../../utilities/contracts";

export const PROPOSAL_CREATED_WITH_REQUIREMENTS_V4_SIGNATURE =
	"ProposalCreatedWithRequirements(uint256,address[],uint256,uint256,uint256,uint32)";
export interface SupportedEventMap {
	DAONounsSupplyIncreasedFromEscrow: EventData.DAONounsSupplyIncreasedFromEscrow;
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
	VoteCastWithClientId: EventData.VoteCastWithClientId;
	VoteSnapshotBlockSwitchProposalIdSet: EventData.VoteSnapshotBlockSwitchProposalIdSet;
	VotingDelaySet: EventData.VotingDelaySet;
	VotingPeriodSet: EventData.VotingPeriodSet;
	Withdraw: EventData.Withdraw;
	WithdrawFromForkEscrow: EventData.WithdrawFromForkEscrow;
}
const SUPPORTED_NOUNS_DAO_EVENTS = [
	"DAONounsSupplyIncreasedFromEscrow",
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
	"VoteCastWithClientId",
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
export class NounsLogic {
	private _provider: ethers.JsonRpcProvider;
	private _contract: ethers.Contract;
	private _registeredListeners: Map<SupportedEventsType, Function>;
	private _nounsLogicViewer: NounsLogicViewer;
	public static readonly supportedEvents = SUPPORTED_NOUNS_DAO_EVENTS;

	constructor(provider: ethers.JsonRpcProvider | string) {
		this._provider = createOrReturnProvider(provider);
		this._contract = createNounsDaoLogicV4Contract(this._provider);
		this._nounsLogicViewer = new NounsLogicViewer(this._contract);
		this._registeredListeners = new Map();
	}

	public get viewer() {
		return this._nounsLogicViewer;
	}

	public get contract() {
		return this._contract;
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
			case "DAONounsSupplyIncreasedFromEscrow":
				this._contract.on(eventName, (numTokens: bigint, to: string, event: ethers.Log) => {
					const data: EventData.DAONounsSupplyIncreasedFromEscrow = {
						numTokens: Number(numTokens),
						to: { id: to },
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "DAOWithdrawNounsFromEscrow":
				this._contract.on(eventName, (tokenIds: bigint[], to: string, event: ethers.Log) => {
					const data = {
						tokenIds: tokenIds.map((tokenId) => Number(tokenId)),
						to: { id: to } as Account,
						event: event
					} as EventData.DAOWithdrawNounsFromEscrow;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ERC20TokensToIncludeInForkSet":
				this._contract.on(eventName, (oldErc20Tokens: string[], newErc20tokens: string[], event: ethers.Log) => {
					const data = {
						oldErc20Tokens: oldErc20Tokens,
						newErc20tokens: newErc20tokens,
						event: event
					} as EventData.ERC20TokensToIncludeInForkSet;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "EscrowedToFork":
				this._contract.on(
					eventName,
					(
						forkId: bigint,
						owner: string,
						tokenIds: bigint[],
						proposalIds: bigint[],
						reason: string,
						event: ethers.Log
					) => {
						const data = {
							forkId: Number(forkId),
							owner: { id: owner } as Account,
							tokenIds: tokenIds.map((tokenId) => {
								return Number(tokenId);
							}),
							proposalIds: proposalIds.map((proposalId) => {
								return Number(proposalId);
							}),
							reason: reason,
							event: event
						} as EventData.EscrowedToFork;

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "ExecuteFork":
				this._contract.on(
					eventName,
					(
						forkId: bigint,
						forkTreasury: string,
						forkToken: string,
						forkEndTimestamp: bigint,
						tokensInEscrow: bigint,
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "ForkDAODeployerSet":
				this._contract.on(eventName, (oldForkDAODeployer: string, newForkDAODeployer: string, event: ethers.Log) => {
					const data = {
						oldForkDAODeployer: { id: oldForkDAODeployer } as Account,
						newForkDAODeployer: { id: newForkDAODeployer } as Account,
						event: event
					} as EventData.ForkDAODeployerSet;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ForkPeriodSet":
				this._contract.on(eventName, (oldForkPeriod: bigint, newForkPeriod: bigint, event: ethers.Log) => {
					const data = {
						oldForkPeriod: oldForkPeriod,
						newForkPeriod: newForkPeriod,
						event: event
					} as EventData.ForkPeriodSet;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ForkThresholdSet":
				this._contract.on(eventName, (oldForkThreshold: bigint, newForkThreshold: bigint, event: ethers.Log) => {
					const data = {
						oldForkThreshold: oldForkThreshold,
						newForkThreshold: newForkThreshold,
						event: event
					} as EventData.ForkThresholdSet;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "JoinFork":
				this._contract.on(
					eventName,
					(
						forkId: bigint,
						owner: string,
						tokenIds: bigint[],
						proposalIds: bigint[],
						reason: string,
						event: ethers.Log
					) => {
						const data = {
							forkId: Number(forkId),
							owner: { id: owner } as Account,
							tokenIds: tokenIds.map((tokenId) => {
								return Number(tokenId);
							}),
							proposalIds: proposalIds.map((proposalId) => {
								return Number(proposalId);
							}),
							reason: reason,
							event: event
						} as EventData.JoinFork;

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "LastMinuteWindowSet":
				this._contract.on(
					eventName,
					(oldLastMinuteWindowInBlocks: bigint, newLastMinuteWindowInBlocks: bigint, event: ethers.Log) => {
						const data = {
							oldLastMinuteWindowInBlocks: oldLastMinuteWindowInBlocks,
							newLastMinuteWindowInBlocks: newLastMinuteWindowInBlocks,
							event: event
						} as EventData.LastMinuteWindowSet;

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "MaxQuorumVotesBPSSet":
				this._contract.on(
					eventName,
					(oldMaxQuorumVotesBPS: bigint, newMaxQuorumVotesBPS: bigint, event: ethers.Log) => {
						const data = {
							oldMaxQuorumVotesBPS: Number(oldMaxQuorumVotesBPS),
							newMaxQuorumVotesBPS: Number(newMaxQuorumVotesBPS),
							event: event
						} as EventData.MaxQuorumVotesBPSSet;

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "MinQuorumVotesBPSSet":
				this._contract.on(
					eventName,
					(oldMinQuorumVotesBPS: bigint, newMinQuorumVotesBPS: bigint, event: ethers.Log) => {
						const data = {
							oldMinQuorumVotesBPS: Number(oldMinQuorumVotesBPS),
							newMinQuorumVotesBPS: Number(newMinQuorumVotesBPS),
							event: event
						} as EventData.MinQuorumVotesBPSSet;

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "NewAdmin":
				this._contract.on(eventName, (oldAdmin: string, newAdmin: string, event: ethers.Log) => {
					const data: EventData.NewAdmin = {
						oldAdmin: { id: oldAdmin } as Account,
						newAdmin: { id: newAdmin } as Account,
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "NewImplementation":
				this._contract.on(eventName, (oldImplementation: string, newImplementation: string, event: ethers.Log) => {
					const data: EventData.NewImplementation = {
						oldImplementation: { id: oldImplementation } as Account,
						newImplementation: { id: newImplementation } as Account,
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "NewPendingAdmin":
				this._contract.on(eventName, (oldPendingAdmin: string, newPendingAdmin: string, event: ethers.Log) => {
					const data: EventData.NewPendingAdmin = {
						oldPendingAdmin: { id: oldPendingAdmin } as Account,
						newPendingAdmin: { id: newPendingAdmin } as Account,
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "NewPendingVetoer":
				this._contract.on(eventName, (oldPendingVetoer: string, newPendingVetoer: string, event: ethers.Log) => {
					const data = {
						oldPendingVetoer: { id: oldPendingVetoer } as Account,
						newPendingVetoer: { id: newPendingVetoer } as Account,
						event: event
					} as EventData.NewPendingVetoer;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "NewVetoer":
				this._contract.on(eventName, (oldVetoer: string, newVetoer: string, event: ethers.Log) => {
					const data: EventData.NewVetoer = {
						oldVetoer: { id: oldVetoer },
						newVetoer: { id: newVetoer },
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ObjectionPeriodDurationSet":
				this._contract.on(
					eventName,
					(
						oldObjectionPeriodDurationInBlocks: bigint,
						newObjectionPeriodDurationInBlocks: bigint,
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalCanceled":
				this._contract.on(eventName, (id: bigint, event: ethers.Log) => {
					const data: EventData.ProposalCanceled = {
						id: Number(id),
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreated":
				this._contract.on(
					eventName,
					(
						id: bigint,
						proposer: string,
						targets: string[],
						values: bigint[],
						signatures: string[],
						calldatas: any[],
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
							calldatas: calldatas,
							startBlock: startBlock,
							endBlock: endBlock,
							description: description,
							event: event
						};

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreatedOnTimelockV1":
				this._contract.on(eventName, (id: bigint, event: ethers.Log) => {
					const data = {
						id: Number(id),
						event: event
					} as EventData.ProposalCreatedOnTimelockV1;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalCreatedWithRequirements":
				this._contract.on(
					PROPOSAL_CREATED_WITH_REQUIREMENTS_V4_SIGNATURE,
					(
						id: bigint,
						signers: string[],
						updatePeriodEndBlock: bigint,
						proposalThreshold: bigint,
						quorumVotes: bigint,
						clientId: bigint,
						event: ethers.Log
					) => {
						const data: EventData.ProposalCreatedWithRequirements = {
							id: Number(id),
							signers: signers,
							updatePeriodEndBlock: updatePeriodEndBlock,
							proposalThreshold: Number(proposalThreshold),
							quorumVotes: Number(quorumVotes),
							clientId: Number(clientId),
							event: event
						};

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalDescriptionUpdated":
				this._contract.on(
					eventName,
					(id: bigint, proposer: string, description: string, updatedMessage: string, event: ethers.Log) => {
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalExecuted":
				this._contract.on(eventName, (id: bigint, event: ethers.Log) => {
					const data: EventData.ProposalExecuted = {
						id: Number(id),
						event: event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalObjectionPeriodSet":
				this._contract.on(eventName, (id: bigint, objectionPeriodEndBlock: bigint, event: ethers.Log) => {
					const data = {
						id: Number(id),
						objectionPeriodEndBlock: objectionPeriodEndBlock,
						event: event
					} as EventData.ProposalObjectionPeriodSet;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalQueued":
				this._contract.on(eventName, (id: bigint, eta: bigint, event: ethers.Log) => {
					const data: EventData.ProposalQueued = {
						id: Number(id),
						eta: eta,
						event: event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalThresholdBPSSet":
				this._contract.on(
					eventName,
					(oldProposalThresholdBPS: bigint, newProposalThresholdBPS: bigint, event: ethers.Log) => {
						const data: EventData.ProposalThresholdBPSSet = {
							oldProposalThresholdBPS: Number(oldProposalThresholdBPS),
							newProposalThresholdBPS: Number(newProposalThresholdBPS),
							event: event
						};

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalTransactionsUpdated":
				this._contract.on(
					eventName,
					(
						id: bigint,
						proposer: string,
						targets: string[],
						values: bigint[],
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalUpdatablePeriodSet":
				this._contract.on(
					eventName,
					(
						oldProposalUpdatablePeriodInBlocks: bigint,
						newProposalUpdatablePeriodInBlocks: bigint,
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalUpdated":
				this._contract.on(
					eventName,
					(
						id: bigint,
						proposer: string,
						targets: string[],
						values: bigint[],
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "ProposalVetoed":
				this._contract.on(eventName, (id: bigint, event: ethers.Log) => {
					const data: EventData.ProposalVetoed = {
						id: Number(id),
						event: event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "QuorumCoefficientSet":
				this._contract.on(
					eventName,
					(oldQuorumCoefficient: bigint, newQuorumCoefficient: bigint, event: ethers.Log) => {
						const data = {
							oldQuorumCoefficient: Number(oldQuorumCoefficient),
							newQuorumCoefficient: Number(newQuorumCoefficient),
							event: event
						} as EventData.QuorumCoefficientSet;

						listener(data as any);
					}
				);
				this._registeredListeners.set(eventName, listener);
				break;

			case "QuorumVotesBPSSet":
				this._contract.on(eventName, (oldQuorumVotesBPS: bigint, newQuorumVotesBPS: bigint, event: ethers.Log) => {
					const data: EventData.QuorumVotesBPSSet = {
						oldQuorumVotesBPS: Number(oldQuorumVotesBPS),
						newQuorumVotesBPS: Number(newQuorumVotesBPS),
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "RefundableVote":
				this._contract.on(eventName, (voter: string, refundAmount: bigint, refundSent: boolean, event: ethers.Log) => {
					const data = {
						voter: { id: voter } as Account,
						refundAmount: refundAmount,
						refundSent: refundSent,
						event: event
					} as EventData.RefundableVote;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "SignatureCancelled":
				this._contract.on(eventName, (signer: string, sig: any, event: ethers.Log) => {
					const data = {
						signer: { id: signer } as Account,
						sig: sig,
						event: event
					} as EventData.SignatureCancelled;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "TimelocksAndAdminSet":
				this._contract.on(eventName, (timelock: string, timelockV1: string, admin: string, event: ethers.Log) => {
					const data = {
						timelock: { id: timelock } as Account,
						timelockV1: { id: timelockV1 } as Account,
						admin: { id: admin } as Account,
						event: event
					} as EventData.TimelocksAndAdminSet;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "VoteCast":
				this._contract.on(
					eventName,
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "VoteCastWithClientId":
				this._contract.on(eventName, (voter: string, proposalId: bigint, clientId: bigint, event: ethers.Log) => {
					const data: EventData.VoteCastWithClientId = {
						voter: { id: voter },
						proposalId: Number(proposalId),
						clientId: Number(clientId),
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "VoteSnapshotBlockSwitchProposalIdSet":
				this._contract.on(
					eventName,
					(
						oldVoteSnapshotBlockSwitchProposalId: bigint,
						newVoteSnapshotBlockSwitchProposalId: bigint,
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
				this._registeredListeners.set(eventName, listener);
				break;

			case "VotingDelaySet":
				this._contract.on(eventName, (oldVotingDelay: bigint, newVotingDelay: bigint, event: ethers.Log) => {
					const data: EventData.VotingDelaySet = {
						oldVotingDelay: oldVotingDelay,
						newVotingDelay: newVotingDelay,
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "VotingPeriodSet":
				this._contract.on(eventName, (oldVotingPeriod: bigint, newVotingPeriod: bigint, event: ethers.Log) => {
					const data: EventData.VotingPeriodSet = {
						oldVotingPeriod: oldVotingPeriod,
						newVotingPeriod: newVotingPeriod,
						event: event
					};

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "Withdraw":
				this._contract.on(eventName, (amount: bigint, sent: boolean, event: ethers.Log) => {
					const data = {
						amount: amount,
						sent: sent,
						event: event
					} as EventData.Withdraw;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			case "WithdrawFromForkEscrow":
				this._contract.on(eventName, (forkId: bigint, owner: string, tokenIds: bigint[], event: ethers.Log) => {
					const data = {
						forkId: Number(forkId),
						owner: { id: owner } as Account,
						tokenIds: tokenIds.map((tokenId) => Number(tokenId)),
						event: event
					} as EventData.WithdrawFromForkEscrow;

					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes an event listener.
	 * @param eventName the event listened to.
	 * @example
	 * nounsDAO.off('VoteCast');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this._registeredListeners.get(eventName);
		if (listener) {
			if (eventName === "ProposalCreatedWithRequirements") {
				this._contract.off(PROPOSAL_CREATED_WITH_REQUIREMENTS_V4_SIGNATURE, listener as ethers.Listener);
			} else {
				this._contract.off(eventName, listener as ethers.Listener);
			}
		}
		this._registeredListeners.delete(eventName);
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
		const listener = this._registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * Checks if the contract wrapper supports a given event.
	 * @param eventName The event you are looking for.
	 * @returns True if the event is supported. False otherwise.
	 */
	public hasEvent(eventName: string) {
		return NounsLogic.supportedEvents.includes(eventName as SupportedEventsType);
	}
}

interface Action {
	targets: string[];
	values: bigint[];
	signatures: string[];
	calldatas: string[];
}

interface DynamicQuorumParams {
	minQuorumVotesBPS: bigint;
	maxQuorumVotesBPS: bigint;
	quorumCoefficient: bigint;
}

interface Receipt {
	hasVoted: boolean;
	support: bigint;
	votes: bigint;
}

interface ProposalForRewards {
	endBlock: bigint;
	objectionPeriodEndBlock: bigint;
	forVotes: bigint;
	againstVotes: bigint;
	abstainVotes: bigint;
	totalSupply: bigint;
	creationTimestamp: bigint;
	numSigners: bigint;
	clientId: bigint;
}

interface ClientVoteData {
	votes: bigint;
	txs: bigint;
}

interface ProposalCondensed {
	id: bigint;
	proposer: string;
	proposalThreshold: bigint;
	quorumVotes: bigint;
	eta: bigint;
	startBlock: bigint;
	endBlock: bigint;
	forVotes: bigint;
	againstVotes: bigint;
	abstainVotes: bigint;
	canceled: boolean;
	vetoed: boolean;
	executed: boolean;
	totalSupply: bigint;
	creationBlock: bigint;
}

interface DynamicQuorumParamsCheckpoint {
	fromBlock: bigint;
	params: DynamicQuorumParams;
}

enum ProposalState {
	PENDING,
	ACTIVE,
	CANCELED,
	DEFEATED,
	SUCCEEDED,
	QUEUED,
	EXPIRED,
	EXECUTED,
	VETOED,
	OBJECTION_PERIOD,
	UPDATABLE
}

class NounsLogicViewer {
	private contract: Contract;
	constructor(contract: Contract) {
		this.contract = contract;
	}

	public async MAX_PROPOSAL_THRESHOLD_BPS(): Promise<bigint> {
		return this.contract.MAX_PROPOSAL_THRESHOLD_BPS();
	}

	public async MAX_VOTING_DELAY(): Promise<bigint> {
		return this.contract.MAX_VOTING_DELAY();
	}

	public async MAX_VOTING_PERIOD(): Promise<bigint> {
		return this.contract.MAX_VOTING_PERIOD();
	}

	public async MIN_PROPOSAL_THRESHOLD_BPS(): Promise<bigint> {
		return this.contract.MIN_PROPOSAL_THRESHOLD_BPS();
	}

	public async MIN_VOTING_DELAY(): Promise<bigint> {
		return this.contract.MIN_VOTING_DELAY();
	}

	public async MIN_VOTING_PERIOD(): Promise<bigint> {
		return this.contract.MIN_VOTING_PERIOD();
	}

	public async adjustedTotalSupply(): Promise<bigint> {
		return this.contract.adjustedTotalSupply();
	}

	public async dynamicQuorumVotes(
		againstVotes: number,
		adjustedTotalSupply: number,
		params: { minQuorumVotesBPS: number; maxQuorumVotesBPS: number; quorumCoefficient: number }
	): Promise<bigint> {
		return this.contract.dynamicQuorumVotes(againstVotes, adjustedTotalSupply, params);
	}

	public async erc20TokensToIncludeInFork(): Promise<string[]> {
		return this.contract.erc20TokensToIncludeInFork();
	}

	public async forkDAODeployer(): Promise<string> {
		return this.contract.forkDAODeployer();
	}

	public async forkEndTimestamp(): Promise<bigint> {
		return this.contract.forkEndTimestamp();
	}

	public async forkEscrow(): Promise<string> {
		return this.contract.forkEscrow();
	}

	public async forkPeriod(): Promise<bigint> {
		return this.contract.forkPeriod();
	}

	public async forkThreshold(): Promise<bigint> {
		return this.contract.forkThreshold();
	}

	public async forkThresholdBPS(): Promise<bigint> {
		return this.contract.forkThresholdBPS();
	}

	public async getActions(proposalId: number): Promise<Action> {
		const [targets, values, signatures, calldatas] = await this.contract.getActions(proposalId);
		return { targets, values, signatures, calldatas };
	}

	public async getDynamicQuorumParamsAt(blockNumber: number): Promise<DynamicQuorumParams> {
		const [minQuorumVotesBPS, maxQuorumVotesBPS, quorumCoefficient] = await this.contract.getDynamicQuorumParamsAt(
			blockNumber
		);
		return { minQuorumVotesBPS, maxQuorumVotesBPS, quorumCoefficient };
	}

	public async getReceipt(proposalId: number, voter: string): Promise<Receipt> {
		const [hasVoted, support, votes] = await this.contract.getReceipt(proposalId, voter);
		return { hasVoted, support, votes };
	}

	public async lastMinuteWindowInBlocks(): Promise<bigint> {
		return this.contract.lastMinuteWindowInBlocks();
	}

	public async latestProposalIds(account: string): Promise<bigint> {
		return this.contract.latestProposalIds(account);
	}

	public async maxQuorumVotes(): Promise<bigint> {
		return this.contract.maxQuorumVotes();
	}

	public async minQuorumVotes(): Promise<bigint> {
		return this.contract.minQuorumVotes();
	}

	public async nouns(): Promise<string> {
		return this.contract.nouns();
	}

	public async numTokensInForkEscrow(): Promise<bigint> {
		return this.contract.numTokensInForkEscrow();
	}

	public async objectionPeriodDurationInBlocks(): Promise<bigint> {
		return this.contract.objectionPeriodDurationInBlocks();
	}

	public async pendingVetoer(): Promise<string> {
		return this.contract.pendingVetoer();
	}

	public async proposalCount(): Promise<bigint> {
		return this.contract.proposalCount();
	}

	public async proposalMaxOperations(): Promise<bigint> {
		return this.contract.proposalMaxOperations();
	}

	public async proposalThreshold(): Promise<bigint> {
		return this.contract.proposalThreshold();
	}

	public async proposalThresholdBPS(): Promise<bigint> {
		return this.contract.proposalThresholdBPS();
	}

	public async proposalUpdatablePeriodInBlocks(): Promise<bigint> {
		return this.contract.proposalUpdatablePeriodInBlocks();
	}

	public async proposalVoteClientsData(proposalId: number, clientIds: number[]): Promise<ClientVoteData[]> {
		return this.contract.proposalVoteClientsData(proposalId, clientIds);
	}

	public async proposals(proposalId: number): Promise<ProposalCondensed> {
		const [
			id,
			proposer,
			proposalThreshold,
			quorumVotes,
			eta,
			startBlock,
			endBlock,
			forVotes,
			againstVotes,
			abstainVotes,
			canceled,
			vetoed,
			executed,
			totalSupply,
			creationBlock
		] = await this.contract.proposals(proposalId);
		return {
			id,
			proposer,
			proposalThreshold,
			quorumVotes,
			eta,
			startBlock,
			endBlock,
			forVotes,
			againstVotes,
			abstainVotes,
			canceled,
			vetoed,
			executed,
			totalSupply,
			creationBlock
		};
	}

	public async quorumParamsCheckpoints(
		index?: number
	): Promise<DynamicQuorumParamsCheckpoint[] | DynamicQuorumParamsCheckpoint> {
		let res: any[] = [];
		if (typeof index === "undefined") {
			res = await this.contract.quorumParamsCheckpoints(Typed.overrides({}));
			const checkpoints: DynamicQuorumParamsCheckpoint[] = res.map(
				([fromBlock, [minQuorumVotesBPS, maxQuorumVotesBPS, quorumCoefficient]]) => {
					return {
						fromBlock,
						params: {
							minQuorumVotesBPS,
							maxQuorumVotesBPS,
							quorumCoefficient
						}
					};
				}
			);
			return checkpoints;
		}

		res = await this.contract.quorumParamsCheckpoints(index, Typed.overrides({}));
		const [fromBlock, [minQuorumVotesBPS, maxQuorumVotesBPS, quorumCoefficient]] = res;
		return {
			fromBlock,
			params: {
				minQuorumVotesBPS,
				maxQuorumVotesBPS,
				quorumCoefficient
			}
		};
	}

	public async quorumVotes(proposalId: number): Promise<bigint> {
		return this.contract.quorumVotes(proposalId);
	}

	public async quorumVotesBPS(): Promise<bigint> {
		return this.contract.quorumVotesBPS();
	}

	public async state(proposalId: number): Promise<ProposalState> {
		const stateId = await this.contract.state(proposalId);
		return ProposalState[Number(stateId)] as unknown as ProposalState;
	}

	public async timelock(): Promise<string> {
		return this.contract.timelock();
	}

	public async timelockV1(): Promise<string> {
		return this.contract.timelockV1();
	}

	public async vetoer(): Promise<string> {
		return this.contract.vetoer();
	}

	public async voteSnapshotBlockSwitchProposalId(): Promise<bigint> {
		return this.contract.voteSnapshotBlockSwitchProposalId();
	}

	public async votingDelay(): Promise<bigint> {
		return this.contract.votingDelay();
	}

	public async votingPeriod(): Promise<bigint> {
		return this.contract.votingPeriod();
	}
}
