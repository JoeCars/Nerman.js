import { readFile } from "fs/promises";
import { join } from "path";

import { EventData, Indexer, FormattedEvent } from "../../types";
import { NOUNS_STARTING_BLOCK } from "../../constants";

//====================================
// General
//====================================

/**
 * @param startBlock The starting block. Inclusive.
 * @param endBlock The final block. Inclusive.
 */
export function _filterByBlock(events: FormattedEvent[], startBlock: number, endBlock: number) {
	let filteredEvents = events.filter((event) => {
		return event.event.blockNumber >= startBlock && event.event.blockNumber <= endBlock;
	});
	return filteredEvents;
}

/**
 * @param event the event name
 * @param directoryPath path to the indexer directory.
 * @returns An array of indexed events of the given type.
 */
export async function _fetchAllEvents(event: string, directoryPath: string) {
	let path = join(directoryPath, `${event}.json`);
	let file = await readFile(path, { encoding: "utf8" });
	let auctions: FormattedEvent[] = JSON.parse(file).events;
	return auctions;
}

//====================================
// NounsAuctionHouse
//====================================

export namespace NounsAuctionHouse {
	// AuctionCreated

	/**
	 * Fetches all AuctionCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchAuctionCreated(directoryPath: string, query?: Indexer.NounsAuctionHouse.AuctionCreatedQuery) {
		let events = (await _fetchAllEvents("AuctionCreated", directoryPath)) as EventData.AuctionCreated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.AuctionCreated[];
		}

		if (query.nounId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.nounId;
			});
		}

		return events;
	}

	// AuctionBid

	/**
	 * Fetches all AuctionBid events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchAuctionBid(directoryPath: string, query?: Indexer.NounsAuctionHouse.AuctionBidQuery) {
		let events = (await _fetchAllEvents("AuctionBid", directoryPath)) as EventData.AuctionBid[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.AuctionBid[];
		}

		if (query.nounId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.nounId;
			});
		}

		if (query.bidder) {
			events = events.filter((event) => {
				return event.bidder.id === query.bidder;
			});
		}

		if (query.minBidAmount || query.maxBidAmount) {
			if (!query.minBidAmount) {
				query.minBidAmount = 0;
			}
			if (!query.maxBidAmount) {
				query.maxBidAmount = Infinity;
			}
			events = events.filter((event) => {
				return (
					Number(event.amount) <= (query.minBidAmount as number) &&
					Number(event.amount) >= (query.maxBidAmount as number)
				);
			});
		}

		return events;
	}

	// AuctionExtended

	/**
	 * Fetches all AuctionExtended events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchAuctionExtended(directoryPath: string, query?: Indexer.NounsAuctionHouse.AuctionExtendedQuery) {
		let events = (await _fetchAllEvents("AuctionExtended", directoryPath)) as EventData.AuctionExtended[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.AuctionExtended[];
		}

		if (query.nounId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.nounId;
			});
		}

		return events;
	}

	// AuctionSettled

	/**
	 * Fetches all AuctionSettled events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchAuctionSettled(directoryPath: string, query?: Indexer.NounsAuctionHouse.AuctionSettledQuery) {
		let events = (await _fetchAllEvents("AuctionSettled", directoryPath)) as EventData.AuctionSettled[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.AuctionSettled[];
		}

		if (query.nounId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.nounId;
			});
		}

		if (query.winner) {
			events = events.filter((event) => {
				return event.winner.id === query.winner;
			});
		}

		if (query.minBidAmount || query.maxBidAmount) {
			if (!query.minBidAmount) {
				query.minBidAmount = 0;
			}
			if (!query.maxBidAmount) {
				query.maxBidAmount = Infinity;
			}
			events = events.filter((event) => {
				return (
					Number(event.amount) <= (query.minBidAmount as number) &&
					Number(event.amount) >= (query.maxBidAmount as number)
				);
			});
		}

		return events;
	}

	// AuctionTimeBufferUpdated

	/**
	 * Fetches all AuctionTimeBufferUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchAuctionTimeBufferUpdated(
		directoryPath: string,
		query?: Indexer.NounsAuctionHouse.AuctionTimeBufferUpdatedQuery
	) {
		let events = (await _fetchAllEvents("AuctionTimeBufferUpdated", directoryPath)) as EventData.AuctionTimeBufferUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.AuctionTimeBufferUpdated[];
		}

		return events;
	}

	// AuctionReservePriceUpdated

	/**
	 * Fetches all AuctionReservePriceUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchAuctionReservePriceUpdated(
		directoryPath: string,
		query?: Indexer.NounsAuctionHouse.AuctionReservePriceUpdatedQuery
	) {
		let events = (await _fetchAllEvents(
			"AuctionReservePriceUpdated",
			directoryPath
		)) as EventData.AuctionReservePriceUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.AuctionReservePriceUpdated[];
		}

		return events;
	}

	// AuctionMinBidIncrementPercentageUpdated

	/**
	 * Fetches all AuctionMinBidIncrementPercentageUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchAuctionMinBidIncrementPercentageUpdated(
		directoryPath: string,
		query?: Indexer.NounsAuctionHouse.AuctionMinBidIncrementPercentageUpdatedQuery
	) {
		let events = (await _fetchAllEvents(
			"AuctionMinBidIncrementPercentageUpdated",
			directoryPath
		)) as EventData.AuctionMinBidIncrementPercentageUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(
				events,
				query.startBlock,
				query.endBlock
			) as EventData.AuctionMinBidIncrementPercentageUpdated[];
		}

		return events;
	}

	// OwnershipTransferred

	/**
	 * Fetches all OwnershipTransferred events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchOwnershipTransferred(
		directoryPath: string,
		query?: Indexer.NounsAuctionHouse.OwnershipTransferredQuery
	) {
		let events = (await _fetchAllEvents("OwnershipTransferred", directoryPath)) as EventData.OwnershipTransferred[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.OwnershipTransferred[];
		}

		if (query.previousOwner) {
			events = events.filter((event) => {
				return event.previousOwner.id === query.previousOwner;
			});
		}

		if (query.newOwner) {
			events = events.filter((event) => {
				return event.newOwner.id === query.newOwner;
			});
		}

		if (query.involving) {
			events = events.filter((event) => {
				let isPreviousOwner = event.previousOwner.id === query.involving;
				let isNewOwner = event.newOwner.id === query.involving;
				return isPreviousOwner || isNewOwner;
			});
		}

		return events;
	}

	// Paused

	/**
	 * Fetches all Paused events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchPaused(directoryPath: string, query?: Indexer.NounsAuctionHouse.PausedQuery) {
		let events = (await _fetchAllEvents("Paused", directoryPath)) as EventData.Paused[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.Paused[];
		}

		return events;
	}

	// Unpaused

	/**
	 * Fetches all Unpaused events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchUnpaused(directoryPath: string, query?: Indexer.NounsAuctionHouse.UnpausedQuery) {
		let events = (await _fetchAllEvents("Unpaused", directoryPath)) as EventData.Unpaused[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.Unpaused[];
		}

		return events;
	}
}

export namespace NounsDAOData {
	// ==================================
	// AdminChanged
	// ==================================

	/**
	 * Fetches all AdminChanged events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchAdminChanged(directoryPath: string, query?: Indexer.NounsDAOData.AdminChangedQuery) {
		let events = (await _fetchAllEvents("AdminChanged", directoryPath)) as EventData.AdminChanged[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.AdminChanged[];
		}

		if (query.previousAdmin) {
			events = events.filter((event) => {
				return event.previousAdmin.id === query.previousAdmin;
			});
		}

		if (query.newAdmin) {
			events = events.filter((event) => {
				return event.newAdmin.id === query.newAdmin;
			});
		}

		if (query.involving) {
			events = events.filter((event) => {
				let isPreviousAdmin = event.previousAdmin.id === query.involving;
				let isNewAdmin = event.newAdmin.id === query.involving;
				return isPreviousAdmin || isNewAdmin;
			});
		}

		return events;
	}

	// ==================================
	// BeaconUpgraded
	// ==================================

	/**
	 * Fetches all BeaconUpgraded events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchBeaconUpgraded(directoryPath: string, query?: Indexer.NounsDAOData.BeaconUpgradedQuery) {
		let events = (await _fetchAllEvents("BeaconUpgraded", directoryPath)) as EventData.BeaconUpgraded[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.BeaconUpgraded[];
		}

		return events;
	}

	// ==================================
	// CandidateFeedbackSent
	// ==================================

	/**
	 * Fetches all CandidateFeedbackSent events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchCandidateFeedbackSent(
		directoryPath: string,
		query?: Indexer.NounsDAOData.CandidateFeedbackSentQuery
	) {
		let events = (await _fetchAllEvents("CandidateFeedbackSent", directoryPath)) as EventData.CandidateFeedbackSent[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.CandidateFeedbackSent[];
		}

		if (query.msgSender) {
			events = events.filter((event) => {
				return event.msgSender.id === query.msgSender;
			});
		}

		if (query.proposer) {
			events = events.filter((event) => {
				return event.proposer.id === query.proposer;
			});
		}

		if (query.involving) {
			events = events.filter((event) => {
				let isMsgSender = event.msgSender.id === query.involving;
				let isProposer = event.proposer.id === query.involving;
				return isMsgSender || isProposer;
			});
		}

		if (query.slug) {
			events = events.filter((event) => {
				return event.slug === query.slug;
			});
		}

		if (query.supportChoice) {
			events = events.filter((event) => {
				return ["AGAINST", "FOR", "ABSTAIN"][event.support] === query.supportChoice;
			});
		}

		return events;
	}

	// ==================================
	// CreateCandidateCostSet
	// ==================================

	/**
	 * Fetches all CreateCandidateCostSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchCreateCandidateCostSet(
		directoryPath: string,
		query?: Indexer.NounsDAOData.CreateCandidateCostSetQuery
	) {
		let events = (await _fetchAllEvents("CreateCandidateCostSet", directoryPath)) as EventData.CreateCandidateCostSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.CreateCandidateCostSet[];
		}

		return events;
	}

	// ==================================
	// ETHWithdrawn
	// ==================================

	/**
	 * Fetches all ETHWithdrawn events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchETHWithdrawn(directoryPath: string, query?: Indexer.NounsDAOData.ETHWithdrawnQuery) {
		let events = (await _fetchAllEvents("ETHWithdrawn", directoryPath)) as EventData.ETHWithdrawn[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ETHWithdrawn[];
		}

		if (query.to) {
			events = events.filter((event) => {
				return event.to.id === query.to;
			});
		}

		return events;
	}

	// ==================================
	// FeeRecipientSet
	// ==================================

	/**
	 * Fetches all FeeRecipientSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchFeeRecipientSet(directoryPath: string, query?: Indexer.NounsDAOData.FeeRecipientSetQuery) {
		let events = (await _fetchAllEvents("FeeRecipientSet", directoryPath)) as EventData.FeeRecipientSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.FeeRecipientSet[];
		}

		return events;
	}

	// ==================================
	// FeedbackSent
	// ==================================

	/**
	 * Fetches all FeedbackSent events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchFeedbackSent(directoryPath: string, query?: Indexer.NounsDAOData.FeedbackSentQuery) {
		let events = (await _fetchAllEvents("FeedbackSent", directoryPath)) as EventData.FeedbackSent[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.FeedbackSent[];
		}

		if (query.msgSender) {
			events = events.filter((event) => {
				return event.msgSender.id === query.msgSender;
			});
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.proposalId === query.proposalId;
			});
		}

		if (query.supportChoice) {
			events = events.filter((event) => {
				return ["AGAINST", "FOR", "ABSTAIN"][event.support] === query.supportChoice;
			});
		}

		return events;
	}

	// ==================================
	// OwnershipTransferred
	// ==================================

	/**
	 * Fetches all OwnershipTransferred events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchOwnershipTransferred(
		directoryPath: string,
		query?: Indexer.NounsDAOData.OwnershipTransferredQuery
	) {
		let events = (await _fetchAllEvents("OwnershipTransferred", directoryPath)) as EventData.OwnershipTransferred[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.OwnershipTransferred[];
		}

		if (query.previousOwner) {
			events = events.filter((event) => {
				return event.previousOwner.id === query.previousOwner;
			});
		}

		if (query.newOwner) {
			events = events.filter((event) => {
				return event.newOwner.id === query.newOwner;
			});
		}

		if (query.involving) {
			events = events.filter((event) => {
				let isPreviousOwner = event.previousOwner.id === query.involving;
				let isNewOwner = event.newOwner.id === query.involving;
				return isPreviousOwner || isNewOwner;
			});
		}

		return events;
	}

	// ==================================
	// ProposalCandidateCanceled
	// ==================================

	/**
	 * Fetches all ProposalCandidateCanceled events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalCandidateCanceled(
		directoryPath: string,
		query?: Indexer.NounsDAOData.ProposalCandidateCanceledQuery
	) {
		let events = (await _fetchAllEvents(
			"ProposalCandidateCanceled",
			directoryPath
		)) as EventData.ProposalCandidateCanceled[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalCandidateCanceled[];
		}

		if (query.msgSender) {
			events = events.filter((event) => {
				return event.msgSender.id === query.msgSender;
			});
		}

		if (query.slug) {
			events = events.filter((event) => {
				return event.slug === query.slug;
			});
		}

		return events;
	}

	// ==================================
	// ProposalCandidateCreated
	// ==================================

	/**
	 * Fetches all ProposalCandidateCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalCandidateCreated(
		directoryPath: string,
		query?: Indexer.NounsDAOData.ProposalCandidateCreatedQuery
	) {
		let events = (await _fetchAllEvents("ProposalCandidateCreated", directoryPath)) as EventData.ProposalCandidateCreated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalCandidateCreated[];
		}

		if (query.msgSender) {
			events = events.filter((event) => {
				return event.msgSender.id === query.msgSender;
			});
		}

		if (query.slug) {
			events = events.filter((event) => {
				return event.slug === query.slug;
			});
		}

		return events;
	}

	// ==================================
	// ProposalCandidateUpdated
	// ==================================

	/**
	 * Fetches all ProposalCandidateUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalCandidateUpdated(
		directoryPath: string,
		query?: Indexer.NounsDAOData.ProposalCandidateUpdatedQuery
	) {
		let events = (await _fetchAllEvents("ProposalCandidateUpdated", directoryPath)) as EventData.ProposalCandidateUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalCandidateUpdated[];
		}

		if (query.msgSender) {
			events = events.filter((event) => {
				return event.msgSender.id === query.msgSender;
			});
		}

		if (query.slug) {
			events = events.filter((event) => {
				return event.slug === query.slug;
			});
		}

		return events;
	}

	// ==================================
	// SignatureAdded
	// ==================================

	/**
	 * Fetches all SignatureAdded events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchSignatureAdded(directoryPath: string, query?: Indexer.NounsDAOData.SignatureAddedQuery) {
		let events = (await _fetchAllEvents("SignatureAdded", directoryPath)) as EventData.SignatureAdded[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.SignatureAdded[];
		}

		if (query.signer) {
			events = events.filter((event) => {
				return event.signer.id === query.signer;
			});
		}

		if (query.proposer) {
			events = events.filter((event) => {
				return event.proposer.id === query.proposer;
			});
		}

		if (query.involving) {
			events = events.filter((event) => {
				let isSigner = event.signer.id === query.involving;
				let isProposer = event.proposer.id === query.involving;
				return isSigner || isProposer;
			});
		}

		if (query.slug) {
			events = events.filter((event) => {
				return event.slug === query.slug;
			});
		}

		return events;
	}

	// ==================================
	// UpdateCandidateCostSet
	// ==================================

	/**
	 * Fetches all UpdateCandidateCostSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchUpdateCandidateCostSet(
		directoryPath: string,
		query?: Indexer.NounsDAOData.UpdateCandidateCostSetQuery
	) {
		let events = (await _fetchAllEvents("UpdateCandidateCostSet", directoryPath)) as EventData.UpdateCandidateCostSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.UpdateCandidateCostSet[];
		}

		return events;
	}

	// ==================================
	// Upgraded
	// ==================================

	/**
	 * Fetches all Upgraded events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchUpgraded(directoryPath: string, query?: Indexer.NounsDAOData.UpgradedQuery) {
		let events = (await _fetchAllEvents("Upgraded", directoryPath)) as EventData.Upgraded[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.Upgraded[];
		}

		return events;
	}
}

//====================================
// NounsDAO
//====================================

export namespace NounsDAO {
	// DAOWithdrawNounsFromEscrow

	/**
	 * Fetches all DAOWithdrawNounsFromEscrow events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchDAOWithdrawNounsFromEscrow(
		directoryPath: string,
		query?: Indexer.NounsDAO.DAOWithdrawNounsFromEscrowQuery
	) {
		let events = (await _fetchAllEvents(
			"DAOWithdrawNounsFromEscrow",
			directoryPath
		)) as EventData.DAOWithdrawNounsFromEscrow[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.DAOWithdrawNounsFromEscrow[];
		}

		if (query.tokenId !== undefined) {
			events = events.filter((event) => {
				return event.tokenIds.includes(query.tokenId as number);
			});
		}

		if (query.to) {
			events = events.filter((event) => {
				return event.to.id === query.to;
			});
		}

		return events;
	}

	// ERC20TokensToIncludeInForkSet

	/**
	 * Fetches all ERC20TokensToIncludeInForkSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchERC20TokensToIncludeInForkSet(
		directoryPath: string,
		query?: Indexer.NounsDAO.ERC20TokensToIncludeInForkSetQuery
	) {
		let events = (await _fetchAllEvents(
			"ERC20TokensToIncludeInForkSet",
			directoryPath
		)) as EventData.ERC20TokensToIncludeInForkSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ERC20TokensToIncludeInForkSet[];
		}

		return events;
	}

	// EscrowedToFork

	/**
	 * Fetches all EscrowedToFork events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchEscrowedToFork(directoryPath: string, query?: Indexer.NounsDAO.EscrowedToForkQuery) {
		let events = (await _fetchAllEvents("EscrowedToFork", directoryPath)) as EventData.EscrowedToFork[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.EscrowedToFork[];
		}

		if (query.forkId) {
			events = events.filter((event) => {
				return event.forkId === query.forkId;
			});
		}

		if (query.owner) {
			events = events.filter((event) => {
				return event.owner.id === query.owner;
			});
		}

		if (query.tokenId !== undefined) {
			events = events.filter((event) => {
				return event.tokenIds.includes(query.tokenId as number);
			});
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.proposalIds.includes(query.proposalId as number);
			});
		}

		return events;
	}

	// ExecuteFork

	/**
	 * Fetches all ExecuteFork events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchExecutedFork(directoryPath: string, query?: Indexer.NounsDAO.ExecuteForkQuery) {
		let events = (await _fetchAllEvents("ExecuteFork", directoryPath)) as EventData.ExecuteFork[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ExecuteFork[];
		}

		if (query.startId || query.endId) {
			if (!query.startId) {
				query.startId = 0;
			}
			if (!query.endId) {
				query.endId = Infinity;
			}
			events = _filterExecutedForkById(events, query.startId, query.endId);
		} else if (query.id) {
			events = _filterExecutedForkById(events, query.id);
		}

		return events;
	}

	/**
	 * @param startId The starting block. Inclusive.
	 * @param endId The final block. Inclusive.
	 */
	function _filterExecutedForkById(forks: EventData.ExecuteFork[], startId: number, endId?: number) {
		if (endId === undefined) {
			endId = startId;
		}

		let filteredForks = forks.filter((fork) => {
			return fork.forkId >= startId && fork.forkId <= (endId as number);
		});
		return filteredForks;
	}

	// ForkDAODeployerSet

	/**
	 * Fetches all ForkDAODeployerSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchForkDAODeployerSet(directoryPath: string, query?: Indexer.NounsDAO.ForkDAODeployerSetQuery) {
		let events = (await _fetchAllEvents("ForkDAODeployerSet", directoryPath)) as EventData.ForkDAODeployerSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ForkDAODeployerSet[];
		}

		return events;
	}

	// ForkPeriodSet

	/**
	 * Fetches all ForkPeriodSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchForkPeriodSet(directoryPath: string, query?: Indexer.NounsDAO.ForkPeriodSetQuery) {
		let events = (await _fetchAllEvents("ForkPeriodSet", directoryPath)) as EventData.ForkPeriodSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ForkPeriodSet[];
		}

		return events;
	}

	// ForkThresholdSet

	/**
	 * Fetches all ForkThresholdSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchForkThresholdSet(directoryPath: string, query?: Indexer.NounsDAO.ForkThresholdSetQuery) {
		let events = (await _fetchAllEvents("ForkThresholdSet", directoryPath)) as EventData.ForkThresholdSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ForkThresholdSet[];
		}

		return events;
	}

	// JoinFork

	/**
	 * Fetches all JoinFork events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchJoinFork(directoryPath: string, query?: Indexer.NounsDAO.JoinForkQuery) {
		let events = (await _fetchAllEvents("JoinFork", directoryPath)) as EventData.JoinFork[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.JoinFork[];
		}

		if (query.forkId) {
			events = events.filter((event) => {
				return event.forkId === query.forkId;
			});
		}

		if (query.owner) {
			events = events.filter((event) => {
				return event.owner.id === query.owner;
			});
		}

		if (query.tokenId !== undefined) {
			events = events.filter((event) => {
				return event.tokenIds.includes(query.tokenId as number);
			});
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.proposalIds.includes(query.proposalId as number);
			});
		}

		return events;
	}

	// LastMinuteWindowSet

	/**
	 * Fetches all LastMinuteWindowSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchLastMinuteWindowSet(directoryPath: string, query?: Indexer.NounsDAO.LastMinuteWindowSetQuery) {
		let events = (await _fetchAllEvents("LastMinuteWindowSet", directoryPath)) as EventData.LastMinuteWindowSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.LastMinuteWindowSet[];
		}

		return events;
	}

	// MaxQuorumVotesBPSSet

	/**
	 * Fetches all MaxQuorumVotesBPSSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchMaxQuorumVotesBPSSet(directoryPath: string, query?: Indexer.NounsDAO.MaxQuorumVotesBPSSetQuery) {
		let events = (await _fetchAllEvents("MaxQuorumVotesBPSSet", directoryPath)) as EventData.MaxQuorumVotesBPSSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.MaxQuorumVotesBPSSet[];
		}

		return events;
	}

	// MinQuorumVotesBPSSet

	/**
	 * Fetches all MinQuorumVotesBPSSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchMinQuorumVotesBPSSet(directoryPath: string, query?: Indexer.NounsDAO.MinQuorumVotesBPSSetQuery) {
		let events = (await _fetchAllEvents("MinQuorumVotesBPSSet", directoryPath)) as EventData.MinQuorumVotesBPSSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.MinQuorumVotesBPSSet[];
		}

		return events;
	}

	// NewAdmin

	/**
	 * Fetches all NewAdmin events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchNewAdmin(directoryPath: string, query?: Indexer.NounsDAO.NewAdminQuery) {
		let events = (await _fetchAllEvents("NewAdmin", directoryPath)) as EventData.NewAdmin[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.NewAdmin[];
		}

		return events;
	}

	// NewImplementation

	/**
	 * Fetches all NewImplementation events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchNewImplementation(directoryPath: string, query?: Indexer.NounsDAO.NewImplementationQuery) {
		let events = (await _fetchAllEvents("NewImplementation", directoryPath)) as EventData.NewImplementation[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.NewImplementation[];
		}

		return events;
	}

	// NewPendingAdmin

	/**
	 * Fetches all NewPendingAdmin events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchNewPendingAdmin(directoryPath: string, query?: Indexer.NounsDAO.NewPendingAdminQuery) {
		let events = (await _fetchAllEvents("NewPendingAdmin", directoryPath)) as EventData.NewPendingAdmin[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.NewPendingAdmin[];
		}

		return events;
	}

	// NewPendingVetoer

	/**
	 * Fetches all NewPendingVetoer events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchNewPendingVetoer(directoryPath: string, query?: Indexer.NounsDAO.NewPendingVetoerQuery) {
		let events = (await _fetchAllEvents("NewPendingVetoer", directoryPath)) as EventData.NewPendingVetoer[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.NewPendingVetoer[];
		}

		return events;
	}

	// NewVetoer

	/**
	 * Fetches all NewVetoer events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchNewVetoer(directoryPath: string, query?: Indexer.NounsDAO.NewVetoerQuery) {
		let events = (await _fetchAllEvents("NewVetoer", directoryPath)) as EventData.NewVetoer[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.NewVetoer[];
		}

		return events;
	}

	// ObjectionPeriodDurationSet

	/**
	 * Fetches all ObjectionPeriodDurationSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchObjectionPeriodDurationSet(
		directoryPath: string,
		query?: Indexer.NounsDAO.ObjectionPeriodDurationSetQuery
	) {
		let events = (await _fetchAllEvents(
			"ObjectionPeriodDurationSet",
			directoryPath
		)) as EventData.ObjectionPeriodDurationSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ObjectionPeriodDurationSet[];
		}

		return events;
	}

	// ProposalCanceled

	/**
	 * Fetches all ProposalCanceled events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalCanceled(directoryPath: string, query?: Indexer.NounsDAO.ProposalCanceledQuery) {
		let events = (await _fetchAllEvents("ProposalCanceled", directoryPath)) as EventData.ProposalCanceled[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalCanceled[];
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.proposalId;
			});
		}

		return events;
	}

	// ProposalCreated

	/**
	 * Fetches all ProposalCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalCreated(directoryPath: string, query?: Indexer.NounsDAO.ProposalCreatedQuery) {
		let events = (await _fetchAllEvents("ProposalCreated", directoryPath)) as EventData.ProposalCreated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalCreated[];
		}

		if (query.startId || query.endId) {
			if (!query.startId) {
				query.startId = 0;
			}
			if (!query.endId) {
				query.endId = Infinity;
			}
			events = _filterProposalsById(events, query.startId, query.endId);
		} else if (query.id) {
			events = _filterProposalsById(events, query.id);
		}

		if (query.proposer) {
			events = events.filter((event) => {
				return event.proposer.id === query.proposer;
			});
		}

		if (query.status) {
			events = await _filterProposalsByStatus(events, query.status, directoryPath);
		}

		return events;
	}

	/**
	 * @param startBlock The starting block. Inclusive.
	 * @param endBlock The final block. Inclusive.
	 */
	function _filterProposalsByBlock(proposals: EventData.ProposalCreated[], startBlock: number, endBlock: number) {
		let filteredProposals = proposals.filter((proposal) => {
			return proposal.event.blockNumber >= startBlock && proposal.event.blockNumber <= endBlock;
		});
		return filteredProposals;
	}

	/**
	 * @param startId The starting block. Inclusive.
	 * @param endId The final block. Inclusive.
	 */
	function _filterProposalsById(proposals: EventData.ProposalCreated[], startId: number, endId?: number) {
		if (endId === undefined) {
			endId = startId;
		}

		let filteredProposals = proposals.filter((proposal) => {
			return proposal.id >= startId && proposal.id <= (endId as number);
		});
		return filteredProposals;
	}

	function _filterProposalByProposer(proposals: EventData.ProposalCreated[], proposer: string) {
		let filteredProposals = proposals.filter((proposal) => {
			return proposal.proposer.id === proposer;
		});
		return filteredProposals;
	}

	async function _filterProposalsByStatus(proposals: EventData.ProposalCreated[], status: string, directoryPath: string) {
		const cancels = (await _fetchAllEvents("ProposalCanceled", directoryPath)) as EventData.ProposalCanceled[];
		const executes = (await _fetchAllEvents("ProposalExecuted", directoryPath)) as EventData.ProposalExecuted[];
		const queues = (await _fetchAllEvents("ProposalQueued", directoryPath)) as EventData.ProposalQueued[];
		const vetoes = (await _fetchAllEvents("ProposalVetoed", directoryPath)) as EventData.ProposalVetoed[];

		let newestProposalStatuses = new Map<number, { blockNumber: number; status: string }>();
		for (let status of cancels) {
			let storedStatus = newestProposalStatuses.get(status.id);
			if (!storedStatus || storedStatus.blockNumber < status.event.blockNumber) {
				newestProposalStatuses.set(Number(status.id), {
					blockNumber: status.event.blockNumber,
					status: "Cancelled"
				});
			}
		}

		for (let status of executes) {
			let storedStatus = newestProposalStatuses.get(status.id);
			if (!storedStatus || storedStatus.blockNumber < status.event.blockNumber) {
				newestProposalStatuses.set(Number(status.id), {
					blockNumber: status.event.blockNumber,
					status: "Executed"
				});
			}
		}

		for (let status of queues) {
			let storedStatus = newestProposalStatuses.get(status.id);
			if (!storedStatus || storedStatus.blockNumber < status.event.blockNumber) {
				newestProposalStatuses.set(Number(status.id), {
					blockNumber: status.event.blockNumber,
					status: "Queued"
				});
			}
		}

		for (let status of vetoes) {
			let storedStatus = newestProposalStatuses.get(status.id);
			if (!storedStatus || storedStatus.blockNumber < status.event.blockNumber) {
				newestProposalStatuses.set(Number(status.id), {
					blockNumber: status.event.blockNumber,
					status: "Vetoed"
				});
			}
		}

		let filteredProposals = proposals.filter((proposal) => {
			let newestStatus = newestProposalStatuses.get(proposal.id);
			let hasCorrectStatus = newestStatus !== undefined && newestStatus.status === status;
			return hasCorrectStatus;
		});
		return filteredProposals;
	}

	/**
	 * @param directoryPath Path to the indexer directory.
	 */
	async function _fetchAllStatusChange(directoryPath: string) {
		let proposals = (await _fetchAllEvents("ProposalCanceled", directoryPath)) as EventData.ProposalCanceled[];
		proposals = proposals.concat(
			(await _fetchAllEvents("ProposalExecuted", directoryPath)) as EventData.ProposalExecuted[]
		);
		proposals = proposals.concat((await _fetchAllEvents("ProposalQueued", directoryPath)) as EventData.ProposalQueued[]);
		proposals = proposals.concat((await _fetchAllEvents("ProposalVetoed", directoryPath)) as EventData.ProposalVetoed[]);
		proposals.sort((a, b) => {
			return a.event.blockNumber - b.event.blockNumber;
		});
		return proposals; // Proposals should probably be indexed together anyway.
	}

	// ProposalCreatedOnTimelockV1

	/**
	 * Fetches all ProposalCreatedOnTimelockV1 events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalCreatedOnTimelockV1(
		directoryPath: string,
		query?: Indexer.NounsDAO.ProposalCreatedOnTimelockV1Query
	) {
		let events = (await _fetchAllEvents(
			"ProposalCreatedOnTimelockV1",
			directoryPath
		)) as EventData.ProposalCreatedOnTimelockV1[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalCreatedOnTimelockV1[];
		}

		return events;
	}

	// ProposalCreatedWithRequirements

	/**
	 * Fetches all ProposalCreatedWithRequirements events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalCreatedWithRequirements(
		directoryPath: string,
		query?: Indexer.NounsDAO.ProposalCreatedWithRequirementsQuery
	) {
		let events = (await _fetchAllEvents(
			"ProposalCreatedWithRequirements(uint256,address,address[],address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,uint256,string)",
			directoryPath
		)) as EventData.ProposalCreatedWithRequirements[];
		events = events.concat(
			(await _fetchAllEvents(
				"ProposalCreatedWithRequirements(uint256,address,address[],uint256[],string[],bytes[],uint256,uint256,uint256,uint256,string)",
				directoryPath
			)) as EventData.ProposalCreatedWithRequirements[]
		);

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterProposalsByBlock(
				events,
				query.startBlock,
				query.endBlock
			) as EventData.ProposalCreatedWithRequirements[];
		}

		if (query.startId || query.endId) {
			if (!query.startId) {
				query.startId = 0;
			}
			if (!query.endId) {
				query.endId = Infinity;
			}
			events = _filterProposalsById(events, query.startId, query.endId) as EventData.ProposalCreatedWithRequirements[];
		} else if (query.id) {
			events = _filterProposalsById(events, query.id) as EventData.ProposalCreatedWithRequirements[];
		}

		if (query.proposer) {
			events = _filterProposalByProposer(events, query.proposer) as EventData.ProposalCreatedWithRequirements[];
		}

		if (query.status) {
			events = (await _filterProposalsByStatus(
				events,
				query.status,
				directoryPath
			)) as EventData.ProposalCreatedWithRequirements[];
		}

		return events;
	}

	// ProposalDescriptionUpdated

	/**
	 * Fetches all ProposalDescriptionUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalDescriptionUpdated(
		directoryPath: string,
		query?: Indexer.NounsDAO.ProposalDescriptionUpdatedQuery
	) {
		let events = (await _fetchAllEvents(
			"ProposalDescriptionUpdated",
			directoryPath
		)) as EventData.ProposalDescriptionUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalDescriptionUpdated[];
		}

		if (query.proposer) {
			events = events.filter((event) => {
				return event.proposer.id === query.proposer;
			});
		}

		return events;
	}

	// ProposalExecuted

	/**
	 * Fetches all ProposalExecuted events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalExecuted(directoryPath: string, query?: Indexer.NounsDAO.ProposalExecutedQuery) {
		let events = (await _fetchAllEvents("ProposalExecuted", directoryPath)) as EventData.ProposalExecuted[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalExecuted[];
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.proposalId;
			});
		}

		return events;
	}

	// ProposalObjectionPeriodSet

	/**
	 * Fetches all ProposalObjectionPeriodSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalObjectionPeriodSet(
		directoryPath: string,
		query?: Indexer.NounsDAO.ProposalObjectionPeriodSetQuery
	) {
		let events = (await _fetchAllEvents(
			"ProposalObjectionPeriodSet",
			directoryPath
		)) as EventData.ProposalObjectionPeriodSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalObjectionPeriodSet[];
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.proposalId;
			});
		}

		return events;
	}

	// ProposalQueued

	/**
	 * Fetches all ProposalQueued events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalQueued(directoryPath: string, query?: Indexer.NounsDAO.ProposalQueuedQuery) {
		let events = (await _fetchAllEvents("ProposalQueued", directoryPath)) as EventData.ProposalQueued[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalQueued[];
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.proposalId;
			});
		}

		return events;
	}

	// ProposalThresholdBPSSet

	/**
	 * Fetches all ProposalThresholdBPSSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalThresholdBPSSet(
		directoryPath: string,
		query?: Indexer.NounsDAO.ProposalThresholdBPSSetQuery
	) {
		let events = (await _fetchAllEvents("ProposalThresholdBPSSet", directoryPath)) as EventData.ProposalThresholdBPSSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalThresholdBPSSet[];
		}

		return events;
	}

	// ProposalTransactionsUpdated

	/**
	 * Fetches all ProposalTransactionsUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalTransactionsUpdated(
		directoryPath: string,
		query?: Indexer.NounsDAO.ProposalTransactionsUpdatedQuery
	) {
		let events = (await _fetchAllEvents(
			"ProposalTransactionsUpdated",
			directoryPath
		)) as EventData.ProposalTransactionsUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalTransactionsUpdated[];
		}

		if (query.id !== undefined) {
			events = events.filter((event) => {
				return event.id === query.id;
			});
		}

		if (query.proposer) {
			events = events.filter((event) => {
				return event.proposer.id === query.proposer;
			});
		}

		return events;
	}

	// ProposalUpdatablePeriodSet

	/**
	 * Fetches all ProposalUpdatablePeriodSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalUpdatablePeriodSet(
		directoryPath: string,
		query?: Indexer.NounsDAO.ProposalUpdatablePeriodSetQuery
	) {
		let events = (await _fetchAllEvents(
			"ProposalUpdatablePeriodSet",
			directoryPath
		)) as EventData.ProposalUpdatablePeriodSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalUpdatablePeriodSet[];
		}

		return events;
	}

	// ProposalUpdated

	/**
	 * Fetches all ProposalUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalUpdated(directoryPath: string, query?: Indexer.NounsDAO.ProposalUpdatedQuery) {
		let events = (await _fetchAllEvents("ProposalUpdated", directoryPath)) as EventData.ProposalUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalUpdated[];
		}

		if (query.id !== undefined) {
			events = events.filter((event) => {
				return event.id === query.id;
			});
		}

		if (query.proposer) {
			events = events.filter((event) => {
				return event.proposer.id === query.proposer;
			});
		}

		return events;
	}

	// ProposalVetoed

	/**
	 * Fetches all ProposalVetoed events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalVetoed(directoryPath: string, query?: Indexer.NounsDAO.ProposalVetoedQuery) {
		let events = (await _fetchAllEvents("ProposalVetoed", directoryPath)) as EventData.ProposalVetoed[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ProposalVetoed[];
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.proposalId;
			});
		}

		return events;
	}

	// QuorumCoefficientSet

	/**
	 * Fetches all QuorumCoefficientSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchQuorumCoefficientSet(directoryPath: string, query?: Indexer.NounsDAO.QuorumCoefficientSetQuery) {
		let events = (await _fetchAllEvents("QuorumCoefficientSet", directoryPath)) as EventData.QuorumCoefficientSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.QuorumCoefficientSet[];
		}

		return events;
	}

	// QuorumVotesBPSSet

	/**
	 * Fetches all QuorumVotesBPSSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchQuorumVotesBPSSet(directoryPath: string, query?: Indexer.NounsDAO.QuorumVotesBPSSetQuery) {
		let events = (await _fetchAllEvents("QuorumVotesBPSSet", directoryPath)) as EventData.QuorumVotesBPSSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.QuorumVotesBPSSet[];
		}

		return events;
	}

	// RefundableVote

	/**
	 * Fetches all RefundableVote events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchRefundableVote(directoryPath: string, query?: Indexer.NounsDAO.RefundableVoteQuery) {
		let events = (await _fetchAllEvents("RefundableVote", directoryPath)) as EventData.RefundableVote[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.RefundableVote[];
		}

		if (query.voter) {
			events = events.filter((event) => {
				return event.voter.id === query.voter;
			});
		}

		return events;
	}

	// SignatureCancelled

	/**
	 * Fetches all SignatureCancelled events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchSignatureCancelled(directoryPath: string, query?: Indexer.NounsDAO.SignatureCancelledQuery) {
		let events = (await _fetchAllEvents("SignatureCancelled", directoryPath)) as EventData.SignatureCancelled[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.SignatureCancelled[];
		}

		if (query.signer) {
			events = events.filter((event) => {
				return event.signer.id === query.signer;
			});
		}

		return events;
	}

	// TimelocksAndAdminSet

	/**
	 * Fetches all TimelocksAndAdminSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchTimelocksAndAdminSet(directoryPath: string, query?: Indexer.NounsDAO.TimelocksAndAdminSetQuery) {
		let events = (await _fetchAllEvents("TimelocksAndAdminSet", directoryPath)) as EventData.TimelocksAndAdminSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.TimelocksAndAdminSet[];
		}

		if (query.admin) {
			events = events.filter((event) => {
				return event.admin.id === query.admin;
			});
		}

		return events;
	}

	// ProposalStatusChange

	/**
	 * Fetches all ProposalStatusChange events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchProposalStatusChange(directoryPath: string, query?: Indexer.NounsDAO.StatusChangeQuery) {
		let events: EventData.ProposalCanceled[] = [];

		if (!query) {
			return _fetchAllStatusChange(directoryPath);
		}

		if (query.status === "Cancelled") {
			events = (await _fetchAllEvents("ProposalCanceled", directoryPath)) as EventData.ProposalCanceled[];
		} else if (query.status === "Vetoed") {
			events = (await _fetchAllEvents("ProposalVetoed", directoryPath)) as EventData.ProposalVetoed[];
		} else if (query.status === "Queued") {
			events = (await _fetchAllEvents("ProposalQueued", directoryPath)) as EventData.ProposalQueued[];
		} else if (query.status === "Executed") {
			events = (await _fetchAllEvents("ProposalExecuted", directoryPath)) as EventData.ProposalExecuted[];
		} else {
			events = await _fetchAllStatusChange(directoryPath);
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterStatusChangeByBlock(events, query.startBlock, query.endBlock);
		}

		if (query.proposalId) {
			events = _filterStatusChangeByProposalId(events, query.proposalId);
		}

		return events;
	}

	/**
	 * @param startBlock The starting block. Inclusive.
	 * @param endBlock The final block. Inclusive.
	 */
	function _filterStatusChangeByBlock(statuses: EventData.ProposalCanceled[], startBlock: number, endBlock: number) {
		let filteredStatuses = statuses.filter((status) => {
			return status.event.blockNumber >= startBlock && status.event.blockNumber <= endBlock;
		});
		return filteredStatuses;
	}

	function _filterStatusChangeByProposalId(statuses: EventData.ProposalCanceled[], proposalId: number) {
		let filteredStatuses = statuses.filter((status) => {
			return status.id === proposalId;
		});
		return filteredStatuses;
	}

	// VoteCast

	/**
	 * Fetches all VoteCast events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchVoteCast(directoryPath: string, query?: Indexer.NounsDAO.VoteCastQuery) {
		let events = (await _fetchAllEvents("VoteCast", directoryPath)) as EventData.VoteCast[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.VoteCast[];
		}

		if (query.proposalId !== undefined) {
			events = events.filter((event) => {
				return event.proposalId === query.proposalId;
			});
		}

		if (query.voter) {
			events = events.filter((event) => {
				return event.voter.id === query.voter;
			});
		}

		if (query.support) {
			events = events.filter((event) => {
				return ["AGAINST", "FOR", "ABSTAIN"][event.supportDetailed] === query.support;
			});
		}

		return events;
	}

	// VoteSnapshotBlockSwitchProposalIdSet

	/**
	 * Fetches all VoteSnapshotBlockSwitchProposalIdSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchVoteSnapshotBlockSwitchProposalIdSet(
		directoryPath: string,
		query?: Indexer.NounsDAO.VoteSnapshotBlockSwitchProposalIdSetQuery
	) {
		let events = (await _fetchAllEvents(
			"VoteSnapshotBlockSwitchProposalIdSet",
			directoryPath
		)) as EventData.VoteSnapshotBlockSwitchProposalIdSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(
				events,
				query.startBlock,
				query.endBlock
			) as EventData.VoteSnapshotBlockSwitchProposalIdSet[];
		}

		return events;
	}

	// VotingDelaySet

	/**
	 * Fetches all VotingDelaySet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchVotingDelaySet(directoryPath: string, query?: Indexer.NounsDAO.VotingDelaySetQuery) {
		let events = (await _fetchAllEvents("VotingDelaySet", directoryPath)) as EventData.VotingDelaySet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.VotingDelaySet[];
		}

		return events;
	}

	// VotingPeriodSet

	/**
	 * Fetches all VotingPeriodSet events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchVotingPeriodSet(directoryPath: string, query?: Indexer.NounsDAO.VotingPeriodSetQuery) {
		let events = (await _fetchAllEvents("VotingPeriodSet", directoryPath)) as EventData.VotingPeriodSet[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.VotingPeriodSet[];
		}

		return events;
	}

	// Withdraw

	/**
	 * Fetches all Withdraw events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchWithdraw(directoryPath: string, query?: Indexer.NounsDAO.WithdrawQuery) {
		let events = (await _fetchAllEvents("Withdraw", directoryPath)) as EventData.Withdraw[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.Withdraw[];
		}

		return events;
	}

	// WithdrawFromForkEscrow

	/**
	 * Fetches all WithdrawFromForkEscrow events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchWithdrawFromForkEscrow(
		directoryPath: string,
		query?: Indexer.NounsDAO.WithdrawFromForkEscrowQuery
	) {
		let events = (await _fetchAllEvents("WithdrawFromForkEscrow", directoryPath)) as EventData.WithdrawFromForkEscrow[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.WithdrawFromForkEscrow[];
		}

		if (query.forkId !== undefined) {
			events = events.filter((event) => {
				return event.forkId === query.forkId;
			});
		}

		if (query.owner) {
			events = events.filter((event) => {
				return event.owner.id === query.owner;
			});
		}

		if (query.tokenId !== undefined) {
			events = events.filter((event) => {
				return event.tokenIds.includes(query.tokenId as number);
			});
		}

		return events;
	}
}

//====================================
// NounsToken
//====================================

export namespace NounsToken {
	// DelegateChanged

	/**
	 * Fetches all DelegateChanged events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchDelegateChanged(directoryPath: string, query?: Indexer.NounsToken.DelegateChangedQuery) {
		let events = (await _fetchAllEvents("DelegateChanged", directoryPath)) as EventData.DelegateChanged[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.DelegateChanged[];
		}

		if (query.delegator) {
			events = events.filter((event) => {
				return event.delegator.id === query.delegator;
			});
		}

		if (query.fromDelegate) {
			events = events.filter((event) => {
				return event.fromDelegate.id === query.fromDelegate;
			});
		}

		if (query.toDelegate) {
			events = events.filter((event) => {
				return event.toDelegate.id === query.toDelegate;
			});
		}

		if (query.involving) {
			events = events.filter((event) => {
				let isDelegator = event.delegator.id === query.involving;
				let isFromDelegate = event.fromDelegate.id === query.involving;
				let isToDelegate = event.toDelegate.id === query.involving;
				return isDelegator || isFromDelegate || isToDelegate;
			});
		}

		return events;
	}

	// DelegateVotesChanged

	/**
	 * Fetches all DelegateVotesChanged events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchDelegateVotesChanged(
		directoryPath: string,
		query?: Indexer.NounsToken.DelegateVotesChangedQuery
	) {
		let events = (await _fetchAllEvents("DelegateVotesChanged", directoryPath)) as EventData.DelegateVotesChanged[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.DelegateVotesChanged[];
		}

		if (query.delegate) {
			events = events.filter((event) => {
				return event.delegate.id === query.delegate;
			});
		}

		return events;
	}

	// Transfer

	/**
	 * Fetches all Transfer events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchTransfer(directoryPath: string, query?: Indexer.NounsToken.TransferQuery) {
		let events = (await _fetchAllEvents("Transfer", directoryPath)) as EventData.Transfer[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.Transfer[];
		}

		if (query.from) {
			events = events.filter((event) => {
				return event.from.id === query.from;
			});
		}

		if (query.to) {
			events = events.filter((event) => {
				return event.to.id === query.to;
			});
		}

		if (query.involving) {
			events = events.filter((event) => {
				let isFrom = event.from.id === query.involving;
				let isTo = event.to.id === query.involving;
				return isFrom || isTo;
			});
		}

		if (query.tokenId !== undefined) {
			events = events.filter((event) => {
				return event.tokenId === query.tokenId;
			});
		}

		return events;
	}

	// Approval

	/**
	 * Fetches all Approval events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchApproval(directoryPath: string, query?: Indexer.NounsToken.ApprovalQuery) {
		let events = (await _fetchAllEvents("Approval", directoryPath)) as EventData.Approval[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.Approval[];
		}

		if (query.owner) {
			events = events.filter((event) => {
				return event.owner.id === query.owner;
			});
		}

		if (query.tokenId !== undefined) {
			events = events.filter((event) => {
				return event.tokenId === query.tokenId;
			});
		}

		return events;
	}

	// ApprovalForAll

	/**
	 * Fetches all ApprovalForAll events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchApprovalForAll(directoryPath: string, query?: Indexer.NounsToken.ApprovalForAllQuery) {
		let events = (await _fetchAllEvents("ApprovalForAll", directoryPath)) as EventData.ApprovalForAll[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.ApprovalForAll[];
		}

		if (query.owner) {
			events = events.filter((event) => {
				return event.owner.id === query.owner;
			});
		}

		return events;
	}

	// NounCreated

	/**
	 * Fetches all NounCreated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchNounCreated(directoryPath: string, query?: Indexer.NounsToken.NounCreatedQuery) {
		let events = (await _fetchAllEvents("NounCreated", directoryPath)) as EventData.NounCreated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.NounCreated[];
		}

		if (query.tokenId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.tokenId;
			});
		}

		if (query.background !== undefined) {
			events = events.filter((event) => {
				return event.seed.background === query.background;
			});
		}

		if (query.body !== undefined) {
			events = events.filter((event) => {
				return event.seed.body === query.body;
			});
		}

		if (query.accessory !== undefined) {
			events = events.filter((event) => {
				return event.seed.accessory === query.accessory;
			});
		}

		if (query.head !== undefined) {
			events = events.filter((event) => {
				return event.seed.head === query.head;
			});
		}

		if (query.glasses !== undefined) {
			events = events.filter((event) => {
				return event.seed.glasses === query.glasses;
			});
		}

		return events;
	}

	// DescriptorLocked

	/**
	 * Fetches all DescriptorLocked events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchDescriptorLocked(directoryPath: string, query?: Indexer.NounsToken.DescriptorLockedQuery) {
		let events = (await _fetchAllEvents("DescriptorLocked", directoryPath)) as EventData.DescriptorLocked[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.DescriptorLocked[];
		}

		return events;
	}

	// DescriptorUpdated

	/**
	 * Fetches all DescriptorUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchDescriptorUpdated(directoryPath: string, query?: Indexer.NounsToken.DescriptorUpdatedQuery) {
		let events = (await _fetchAllEvents("DescriptorUpdated", directoryPath)) as EventData.DescriptorUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.DescriptorUpdated[];
		}

		return events;
	}

	// MinterLocked

	/**
	 * Fetches all MinterLocked events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchMinterLocked(directoryPath: string, query?: Indexer.NounsToken.MinterLockedQuery) {
		let events = (await _fetchAllEvents("MinterLocked", directoryPath)) as EventData.MinterLocked[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.MinterLocked[];
		}

		return events;
	}

	// MinterUpdated

	/**
	 * Fetches all MinterUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchMinterUpdated(directoryPath: string, query?: Indexer.NounsToken.MinterUpdatedQuery) {
		let events = (await _fetchAllEvents("MinterUpdated", directoryPath)) as EventData.MinterUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.MinterUpdated[];
		}

		return events;
	}

	// NounBurned

	/**
	 * Fetches all NounBurned events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchNounBurned(directoryPath: string, query?: Indexer.NounsToken.NounBurnedQuery) {
		let events = (await _fetchAllEvents("NounBurned", directoryPath)) as EventData.NounBurned[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.NounBurned[];
		}

		if (query.nounId !== undefined) {
			events = events.filter((event) => {
				return event.id === query.nounId;
			});
		}

		return events;
	}

	// NoundersDAOUpdated

	/**
	 * Fetches all NoundersDAOUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchNoundersDAOUpdated(directoryPath: string, query?: Indexer.NounsToken.NoundersDAOUpdatedQuery) {
		let events = (await _fetchAllEvents("NoundersDAOUpdated", directoryPath)) as EventData.NoundersDAOUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.NoundersDAOUpdated[];
		}

		return events;
	}

	// OwnershipTransferred

	/**
	 * Fetches all OwnershipTransferred events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchOwnershipTransferred(
		directoryPath: string,
		query?: Indexer.NounsToken.OwnershipTransferredQuery
	) {
		let events = (await _fetchAllEvents("OwnershipTransferred", directoryPath)) as EventData.OwnershipTransferred[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.OwnershipTransferred[];
		}

		if (query.previousOwner) {
			events = events.filter((event) => {
				return event.previousOwner.id === query.previousOwner;
			});
		}

		if (query.newOwner) {
			events = events.filter((event) => {
				return event.newOwner.id === query.newOwner;
			});
		}

		if (query.involving) {
			events = events.filter((event) => {
				let isPreviousOwner = event.previousOwner.id === query.involving;
				let isNewOwner = event.newOwner.id === query.involving;
				return isPreviousOwner || isNewOwner;
			});
		}

		return events;
	}

	// SeederLocked

	/**
	 * Fetches all SeederLocked events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchSeederLocked(directoryPath: string, query?: Indexer.NounsToken.SeederLockedQuery) {
		let events = (await _fetchAllEvents("SeederLocked", directoryPath)) as EventData.SeederLocked[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.SeederLocked[];
		}

		return events;
	}

	// SeederUpdated

	/**
	 * Fetches all SeederUpdated events from the file system. Filtering the results based on the query provided. If no query is provided, returns all events.
	 * @param directoryPath Path to the indexer directory.
	 * @param query A query object.
	 * @returns An array of events.
	 */
	export async function fetchSeederUpdated(directoryPath: string, query?: Indexer.NounsToken.SeederUpdatedQuery) {
		let events = (await _fetchAllEvents("SeederUpdated", directoryPath)) as EventData.SeederUpdated[];

		if (!query) {
			return events;
		}

		if (query.startBlock || query.endBlock) {
			if (!query.startBlock) {
				query.startBlock = NOUNS_STARTING_BLOCK;
			}
			if (!query.endBlock) {
				query.endBlock = Infinity;
			}
			events = _filterByBlock(events, query.startBlock, query.endBlock) as EventData.SeederUpdated[];
		}

		return events;
	}
}
