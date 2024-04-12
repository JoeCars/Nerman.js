import { Schema, model } from "mongoose";
import { ProposalCreatedWithRequirements } from "./events";
import { connectToDatabase } from "../database-indexer";

const proposalSchema = new Schema(
	{
		proposalId: Schema.Types.Number,
		proposer: Schema.Types.String,
		signers: [Schema.Types.String],
		transactions: {
			targets: [Schema.Types.String],
			values: [Schema.Types.String],
			signatures: [Schema.Types.String],
			calldatas: [Schema.Types.String]
		},
		startBlock: Schema.Types.Number,
		endBlock: Schema.Types.Number,
		updatePeriodEndBlock: Schema.Types.Number,
		proposalThreshold: Schema.Types.Number,
		quorumVotes: Schema.Types.Number,
		description: Schema.Types.String,
		feedback: [
			{
				feedbacker: Schema.Types.String,
				support: Schema.Types.String,
				reason: Schema.Types.String,
				blockNumber: Schema.Types.String
			}
		],
		votes: [
			{
				votes: Schema.Types.Number,
				reason: Schema.Types.String,
				voter: Schema.Types.String,
				blockNumber: Schema.Types.String,
				support: Schema.Types.String
			}
		],
		status: {
			wasCreatedOnTimelock: Schema.Types.Boolean,
			hadObjectionPeriod: Schema.Types.Boolean,
			previousStatuses: [
				{
					eventName: Schema.Types.String,
					blockNumber: Schema.Types.String
				}
			],
			currentStatus: Schema.Types.String,
			wasUpdated: Schema.Types.Boolean,
			updateMessages: [
				{
					updateMessage: Schema.Types.String,
					blockNumber: Schema.Types.String
				}
			]
		},
		fork: {
			blamedIn: [
				{
					forkId: Schema.Types.Number,
					reason: Schema.Types.String,
					blockNumber: Schema.Types.String,
					forker: Schema.Types.String,
					eventName: Schema.Types.String
				}
			]
		}
	},
	{ collection: "proposals", versionKey: false }
);

ProposalCreatedWithRequirements.db.createCollection("proposals", {
	viewOn: "proposalcreatedwithrequirements",
	pipeline: [
		{
			$project: {
				proposalId: "$id",
				_id: 0,
				proposer: "$proposer.id",
				signers: 1,
				transactions: {
					targets: "$targets",
					values: "$values",
					signatures: "$signatures",
					calldatas: "$calldatas"
				},
				startBlock: 1,
				endBlock: 1,
				updatePeriodEndBlock: 1,
				proposalThreshold: 1,
				quorumVotes: 1,
				description: 1
			}
		},
		{
			$lookup: {
				from: "votecasts",
				localField: "proposalId",
				foreignField: "proposalId",
				as: "votes",
				pipeline: [
					{
						$project: {
							_id: 0,
							voter: "$voter.id",
							votes: 1,
							reason: 1,
							blockNumber: "$event.blockNumber",
							support: {
								$switch: {
									branches: [
										{
											case: {
												$eq: ["$supportDetailed", 0]
											},
											then: "AGAINST"
										},
										{
											case: {
												$eq: ["$supportDetailed", 1]
											},
											then: "FOR"
										},
										{
											case: {
												$eq: ["$supportDetailed", 2]
											},
											then: "ABSTAIN"
										}
									],
									default: "N/A"
								}
							}
						}
					}
				]
			}
		},
		{
			$lookup: {
				from: "feedbacksents",
				localField: "proposalId",
				foreignField: "proposalId",
				as: "feedback",
				pipeline: [
					{
						$project: {
							_id: 0,
							feedbacker: "$msgSender.id",
							reason: 1,
							blockNumber: "$event.blockNumber",
							support: {
								$switch: {
									branches: [
										{
											case: {
												$eq: ["$support", 0]
											},
											then: "AGAINST"
										},
										{
											case: {
												$eq: ["$support", 1]
											},
											then: "FOR"
										},
										{
											case: {
												$eq: ["$support", 2]
											},
											then: "ABSTAIN"
										}
									],
									default: "N/A"
								}
							}
						}
					}
				]
			}
		},
		{
			$lookup: {
				from: "proposalcreatedontimelockv1",
				localField: "proposalId",
				foreignField: "id",
				as: "timelock"
			}
		},
		{
			$lookup: {
				from: "proposalobjectionperiodsets",
				localField: "proposalId",
				foreignField: "id",
				as: "objections"
			}
		},
		{
			$project: {
				signers: 1,
				startBlock: 1,
				endBlock: 1,
				proposalThreshold: 1,
				quorumVotes: 1,
				description: 1,
				proposalId: 1,
				proposer: 1,
				transactions: 1,
				votes: 1,
				feedback: 1,
				status: {
					wasCreatedOnTimelock: {
						$toBool: {
							$size: "$timelock"
						}
					},
					hadObjectionPeriod: {
						$toBool: {
							$size: "$objections"
						}
					}
				},
				updatePeriodEndBlock: 1
			}
		},
		{
			$lookup: {
				from: "escrowedtoforks",
				let: {
					proposalId: "$proposalId"
				},
				pipeline: [
					{
						$match: {
							$expr: {
								$in: ["$$proposalId", "$proposalIds"]
							}
						}
					},
					{
						$project: {
							_id: 0,
							forkId: 1,
							reason: 1,
							blockNumber: "$event.blockNumber",
							forker: "$owner.id",
							eventName: "EscrowedToFork"
						}
					}
				],
				as: "escrows"
			}
		},
		{
			$lookup: {
				from: "joinforks",
				let: {
					proposalId: "$proposalId"
				},
				pipeline: [
					{
						$match: {
							$expr: {
								$in: ["$$proposalId", "$proposalIds"]
							}
						}
					},
					{
						$project: {
							_id: 0,
							forkId: 1,
							reason: 1,
							blockNumber: "$event.blockNumber",
							forker: "$owner.id",
							eventName: "JoinFork"
						}
					}
				],
				as: "joins"
			}
		},
		{
			$project: {
				signers: 1,
				startBlock: 1,
				endBlock: 1,
				proposalThreshold: 1,
				quorumVotes: 1,
				description: 1,
				proposalId: 1,
				proposer: 1,
				transactions: 1,
				votes: 1,
				feedback: 1,
				status: 1,
				fork: {
					blamedIn: {
						$concatArrays: ["$escrows", "$joins"]
					}
				},
				updatePeriodEndBlock: 1
			}
		},
		{
			$lookup: {
				from: "proposalcanceleds",
				localField: "proposalId",
				foreignField: "id",
				pipeline: [
					{
						$project: {
							_id: 0,
							eventName: "Canceled",
							blockNumber: "$event.blockNumber"
						}
					}
				],
				as: "cancels"
			}
		},
		{
			$lookup: {
				from: "proposalvetoeds",
				localField: "proposalId",
				foreignField: "id",
				pipeline: [
					{
						$project: {
							_id: 0,
							eventName: "Vetoed",
							blockNumber: "$event.blockNumber"
						}
					}
				],
				as: "vetoes"
			}
		},
		{
			$lookup: {
				from: "proposalqueueds",
				localField: "proposalId",
				foreignField: "id",
				pipeline: [
					{
						$project: {
							_id: 0,
							eventName: "Queued",
							blockNumber: "$event.blockNumber"
						}
					}
				],
				as: "queues"
			}
		},
		{
			$lookup: {
				from: "proposalexecuteds",
				localField: "proposalId",
				foreignField: "id",
				pipeline: [
					{
						$project: {
							_id: 0,
							eventName: "Executed",
							blockNumber: "$event.blockNumber"
						}
					}
				],
				as: "executions"
			}
		},
		{
			$project: {
				signers: 1,
				startBlock: 1,
				endBlock: 1,
				proposalThreshold: 1,
				quorumVotes: 1,
				description: 1,
				proposalId: 1,
				proposer: 1,
				transactions: 1,
				votes: 1,
				feedback: 1,
				status: {
					previousStatuses: {
						$concatArrays: ["$cancels", "$vetoes", "$queues", "$executions"]
					},
					wasCreatedOnTimelock: 1,
					hadObjectionPeriod: 1
				},
				fork: 1,
				updatePeriodEndBlock: 1
			}
		},
		{
			$project: {
				signers: 1,
				startBlock: 1,
				endBlock: 1,
				proposalThreshold: 1,
				quorumVotes: 1,
				description: 1,
				proposalId: 1,
				proposer: 1,
				transactions: 1,
				votes: 1,
				feedback: 1,
				status: {
					previousStatuses: 1,
					wasCreatedOnTimelock: 1,
					hadObjectionPeriod: 1,
					currentStatus: {
						$cond: {
							if: {
								$size: "$status.previousStatuses"
							},
							then: {
								$getField: {
									field: "eventName",
									input: {
										$first: {
											$sortArray: {
												input: "$status.previousStatuses",
												sortBy: {
													blockNumber: -1
												}
											}
										}
									}
								}
							},
							else: "Defeated"
						}
					}
				},
				fork: 1,
				updatePeriodEndBlock: 1
			}
		},
		{
			$lookup: {
				from: "proposalupdateds",
				localField: "proposalId",
				foreignField: "id",
				pipeline: [
					{
						$project: {
							_id: 0,
							targets: 1,
							values: 1,
							signatures: 1,
							calldatas: 1,
							description: 1,
							updateMessage: 1,
							blockNumber: "$event.blockNumber"
						}
					}
				],
				as: "proposalupdateds"
			}
		},
		{
			$lookup: {
				from: "proposaldescriptionupdateds",
				localField: "proposalId",
				foreignField: "id",
				pipeline: [
					{
						$project: {
							_id: 0,
							description: 1,
							updateMessage: 1,
							blockNumber: "$event.blockNumber"
						}
					}
				],
				as: "proposaldescriptionupdateds"
			}
		},
		{
			$lookup: {
				from: "proposaltransactionsupdateds",
				localField: "proposalId",
				foreignField: "id",
				pipeline: [
					{
						$project: {
							_id: 0,
							targets: 1,
							values: 1,
							signatures: 1,
							calldatas: 1,
							updateMessage: 1,
							blockNumber: "$event.blockNumber"
						}
					}
				],
				as: "proposaltransactionsupdateds"
			}
		},
		{
			$addFields: {
				newestDescription: {
					$first: {
						$sortArray: {
							input: {
								$concatArrays: ["$proposalupdateds", "$proposaldescriptionupdateds"]
							},
							sortBy: {
								blockNumber: -1
							}
						}
					}
				},
				newestTransactions: {
					$first: {
						$sortArray: {
							input: {
								$concatArrays: ["$proposalupdateds", "$proposaltransactionsupdateds"]
							},
							sortBy: {
								blockNumber: -1
							}
						}
					}
				}
			}
		},
		{
			$project: {
				signers: 1,
				startBlock: 1,
				endBlock: 1,
				proposalThreshold: 1,
				quorumVotes: 1,
				description: {
					$ifNull: ["$newestDescription.description", "$description"]
				},
				proposalId: 1,
				proposer: 1,
				transactions: {
					targets: {
						$ifNull: ["$newestTransactions.targets", "$transactions.targets"]
					},
					values: {
						$ifNull: ["$newestTransactions.values", "$transactions.values"]
					},
					signatures: {
						$ifNull: ["$newestTransactions.signatures", "$transactions.signatures"]
					},
					calldatas: {
						$ifNull: ["$newestTransactions.calldatas", "$transactions.calldatas"]
					}
				},
				votes: 1,
				feedback: 1,
				fork: 1,
				status: {
					wasCreatedOnTimelock: 1,
					hadObjectionPeriod: 1,
					previousStatuses: 1,
					currentStatus: 1,
					wasUpdated: {
						$toBool: {
							$sum: [
								{
									$size: "$proposalupdateds"
								},
								{
									$size: "$proposaldescriptionupdateds"
								},
								{
									$size: "$proposaltransactionsupdateds"
								}
							]
						}
					},
					updateMessages: {
						$map: {
							input: {
								$concatArrays: [
									"$proposalupdateds",
									"$proposaldescriptionupdateds",
									"$proposaltransactionsupdateds"
								]
							},
							as: "update",
							in: {
								updateMessage: "$$update.updateMessage",
								blockNumber: "$$update.blockNumber"
							}
						}
					}
				},
				updatePeriodEndBlock: 1
			}
		}
	]
});

const Proposal = model("Proposal", proposalSchema, "proposals");
export default Proposal;
