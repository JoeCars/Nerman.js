import { AuctionBid } from "./schemas/events";

export async function totalVolumeSpentOnBids() {
	let total = 0n;
	for await (const bid of AuctionBid.find()) {
		total = total + BigInt(bid.amount);
	}
	return total;
}

export async function totalBids() {
	return AuctionBid.countDocuments().exec();
}

export async function totalUniqueBidders() {
	return (await AuctionBid.distinct("bidder.id")).length;
}

export async function totalETHBidPerWalletAddress() {
	const ethPerWallet = new Map<string, bigint>();
	for await (const bid of AuctionBid.find()) {
		const prevBidTotal = ethPerWallet.get(bid.bidder.id) || 0n;
		const bidAmount = BigInt(bid.amount);
		ethPerWallet.set(bid.bidder.id, prevBidTotal + bidAmount);
	}
	return ethPerWallet;
}
