import { Schema, model } from "mongoose";
import { NounCreated } from "./events";

const nounSchema = new Schema(
	{
		nounId: {
			type: Schema.Types.Number
		},
		seed: {
			background: Schema.Types.Number,
			body: Schema.Types.Number,
			accessory: Schema.Types.Number,
			head: Schema.Types.Number,
			glasses: Schema.Types.Number
		},
		image: {
			png: Schema.Types.String,
			jpg: Schema.Types.String,
			svg: Schema.Types.String
		},
		auction: {
			startTime: Schema.Types.String,
			endTime: Schema.Types.String,
			wasExtended: Schema.Types.Boolean,
			winner: Schema.Types.String,
			winningBidAmount: Schema.Types.String,
			bids: {
				type: [
					{
						bidder: Schema.Types.String,
						bidAmount: Schema.Types.String,
						bidBlock: Schema.Types.String
					}
				]
			}
		},
		transfers: [
			{
				from: Schema.Types.String,
				to: Schema.Types.String,
				blockNumber: Schema.Types.String
			}
		],
		currentOwner: Schema.Types.String,
		status: {
			isActive: Schema.Types.Boolean,
			detail: Schema.Types.String
		},
		fork: {
			forkParticipation: [
				{
					eventName: Schema.Types.String,
					blockNumber: Schema.Types.String,
					forkId: Schema.Types.Number,
					owner: Schema.Types.String,
					reason: {
						type: Schema.Types.String,
						required: false
					}
				}
			]
		}
	},
	{ collection: "nouns", versionKey: false, _id: false }
);

NounCreated.db.createCollection("nouns", {
	viewOn: "nouncreateds",
	pipeline: [
		{
			$project: {
				_id: 0,
				nounId: "$id",
				seed: "$seed",
				image: {
					png: {
						$concat: [
							"https://noun.pics/",
							{
								$toString: "$id"
							},
							".png"
						]
					},
					jpg: {
						$concat: [
							"https://noun.pics/",
							{
								$toString: "$id"
							},
							".jpg"
						]
					},
					svg: {
						$concat: [
							"https://noun.pics/",
							{
								$toString: "$id"
							},
							".svg"
						]
					}
				}
			}
		},
		{
			$lookup: {
				from: "auctionbids",
				localField: "nounId",
				foreignField: "id",
				as: "bids",
				pipeline: [
					{
						$project: {
							bidder: "$bidder.id",
							bidAmount: "$amount",
							bidBlock: "$event.blockNumber",
							_id: 0
						}
					}
				]
			}
		},
		{
			$lookup: {
				from: "auctioncreateds",
				localField: "nounId",
				foreignField: "id",
				as: "auctionCreated"
			}
		},
		{
			$project: {
				nounId: 1,
				seed: 1,
				image: 1,
				auction: {
					bids: "$bids",
					startTime: {
						$first: "$auctionCreated.startTime"
					},
					endTime: {
						$first: "$auctionCreated.endTime"
					},
					wasExtended: {
						$toBool: false
					}
				}
			}
		},
		{
			$lookup: {
				from: "auctionextendeds",
				localField: "nounId",
				foreignField: "id",
				as: "auctionExtended",
				pipeline: [
					{
						$project: {
							id: 1,
							endTime: 1
						}
					}
				]
			}
		},
		{
			$project: {
				nounId: 1,
				seed: 1,
				image: 1,
				auction: {
					bids: 1,
					startTime: 1,
					endTime: {
						$cond: {
							if: {
								$gt: [
									{
										$size: "$auctionExtended"
									},
									0
								]
							},
							then: {
								$max: "$auctionExtended.endTime"
							},
							else: "$auction.endTime"
						}
					},
					wasExtended: {
						$gt: [
							{
								$size: "$auctionExtended"
							},
							0
						]
					}
				}
			}
		},
		{
			$lookup: {
				from: "auctionsettleds",
				localField: "nounId",
				foreignField: "id",
				as: "auctionSettled",
				pipeline: [
					{
						$project: {
							_id: 0,
							winner: "$winner.id",
							id: 1,
							winningBidAmount: "$amount"
						}
					}
				]
			}
		},
		{
			$project: {
				nounId: 1,
				seed: 1,
				image: 1,
				auction: {
					startTime: 1,
					endTime: 1,
					wasExtended: 1,
					winner: {
						$first: "$auctionSettled.winner"
					},
					winningBidAmount: {
						$first: "$auctionSettled.winningBidAmount"
					},
					bids: 1
				}
			}
		},
		{
			$lookup: {
				from: "transfers",
				localField: "nounId",
				foreignField: "tokenId",
				as: "transfers",
				pipeline: [
					{
						$project: {
							_id: 0,
							from: "$from.id",
							to: "$to.id",
							blockNumber: "$event.blockNumber"
						}
					}
				]
			}
		},
		{
			$project: {
				nounId: 1,
				seed: 1,
				image: 1,
				transfers: 1,
				auction: 1,
				currentOwner: {
					$getField: {
						field: "to",
						input: {
							$first: {
								$sortArray: {
									input: "$transfers",
									sortBy: {
										blockNumber: -1
									}
								}
							}
						}
					}
				}
			}
		},
		{
			$project: {
				nounId: 1,
				seed: 1,
				image: 1,
				transfers: 1,
				currentOwner: 1,
				auction: 1,
				status: {
					isActive: {
						$not: {
							$in: [
								"$currentOwner",
								[
									"0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71",
									"0x44d97D22B3d37d837cE4b22773aAd9d1566055D9",
									"0x0000000000000000000000000000000000000000"
								]
							]
						}
					},
					detail: {
						$switch: {
							branches: [
								{
									case: {
										$eq: ["$currentOwner", "0xb1a32FC9F9D8b2cf86C068Cae13108809547ef71"]
									},
									then: "in treasury"
								},
								{
									case: {
										$eq: ["$currentOwner", "0x44d97D22B3d37d837cE4b22773aAd9d1566055D9"]
									},
									then: "in escrow"
								},
								{
									case: {
										$eq: ["$currentOwner", "0x0000000000000000000000000000000000000000"]
									},
									then: "burned"
								},
								{
									case: {
										$eq: ["$currentOwner", "0x830BD73E4184ceF73443C15111a1DF14e495C706"]
									},
									then: "in auction house"
								}
							],
							default: "in circulation"
						}
					}
				}
			}
		},
		{
			$lookup: {
				from: "joinforks",
				let: {
					nounId: "$nounId"
				},
				pipeline: [
					{
						$match: {
							$expr: {
								$in: ["$$nounId", "$tokenIds"]
							}
						}
					},
					{
						$project: {
							_id: 0,
							eventName: "JoinFork",
							blockNumber: "$event.blockNumber",
							forkId: "$forkId",
							owner: "$owner.id",
							reason: "$reason"
						}
					}
				],
				as: "joinForks"
			}
		},
		{
			$lookup: {
				from: "escrowedtoforks",
				let: {
					nounId: "$nounId"
				},
				pipeline: [
					{
						$match: {
							$expr: {
								$in: ["$$nounId", "$tokenIds"]
							}
						}
					},
					{
						$project: {
							_id: 0,
							eventName: "EscrowedToFork",
							blockNumber: "$event.blockNumber",
							forkId: "$forkId",
							owner: "$owner.id",
							reason: "$reason"
						}
					}
				],
				as: "escrowedToForks"
			}
		},
		{
			$lookup: {
				from: "withdrawfromforkescrows",
				let: {
					nounId: "$nounId"
				},
				pipeline: [
					{
						$match: {
							$expr: {
								$in: ["$$nounId", "$tokenIds"]
							}
						}
					},
					{
						$project: {
							_id: 0,
							eventName: "WithdrawFromForkEscrow",
							blockNumber: "$event.blockNumber",
							forkId: "$forkId",
							owner: "$owner.id"
						}
					}
				],
				as: "withdrawFromForkEscrows"
			}
		},
		{
			$project: {
				nounId: 1,
				seed: 1,
				image: 1,
				transfers: 1,
				currentOwner: 1,
				status: 1,
				auction: 1,
				fork: {
					forkParticipation: {
						$concatArrays: ["$joinForks", "$escrowedToForks", "$withdrawFromForkEscrows"]
					}
				}
			}
		}
	]
});

const Noun = model("Noun", nounSchema, "nouns");
export default Noun;
