import { WeiPerEther } from "ethers-v6";
import {
	indexEvent,
	ConversionRateManager,
	formatDate,
	incrementDate,
	fetchBlockTimestamp,
	fetchDate,
	formatAuctionSummary
} from "../../../src/utilities/indexer/database-indexer";

describe("indexEvent tests", () => {
	it("should return formatted events", async () => {
		const contractMock = {
			queryFilter() {
				return [
					{
						bidder: "0x00"
					}
				];
			}
		};
		const formatterMock = (arg: any) => {
			return { bidder: { id: arg.bidder } };
		};

		const results = await indexEvent(contractMock as any, "event", formatterMock as any, 1, 0);

		expect(results.length).toBe(1);
		expect(results[0]).toEqual({ bidder: { id: "0x00" } });
	});
});

describe("formatDate tests", () => {
	it("should work when passing in a date object", () => {
		const date = new Date("2023-12-25");
		const result = formatDate(date);
		expect(result).toEqual("2023-12-25");
	});

	it("should work when the month and day are single digits", () => {
		const date = new Date("2024-01-01");
		const result = formatDate(date);
		expect(result).toEqual("2024-01-01");
	});

	it("should work when passing in a timestamp", () => {
		const MILLISECONDS_PER_SECOND = 1_000;

		const date = new Date("2023-12-25");
		const result = formatDate(date.getTime() / MILLISECONDS_PER_SECOND);
		expect(result).toEqual("2023-12-25");
	});

	it("should work when passing in a string date", () => {
		const result = formatDate("1-1-2024");
		expect(result).toEqual("2024-01-01");
	});
});

describe("incrementDate tests", () => {
	it("should increment days", () => {
		const result = incrementDate("2023-12-25");
		expect(result).toEqual("2023-12-26");
	});
	it("should increment months", () => {
		const result = incrementDate("2023-01-31");
		expect(result).toEqual("2023-02-01");
	});
	it("should increment years", () => {
		const result = incrementDate("2023-12-31");
		expect(result).toEqual("2024-01-01");
	});
	it("should handle leap years", () => {
		const result1 = incrementDate("2024-02-28");
		const result2 = incrementDate("2024-02-29");
		const result3 = incrementDate("2023-02-28");
		expect(result1).toEqual("2024-02-29");
		expect(result2).toEqual("2024-03-01");
		expect(result3).toEqual("2023-03-01");
	});
});

describe("fetchBlockTimestamp tests", () => {
	it("should return timestamp", async () => {
		const providerMock = {
			getBlock() {
				return { timestamp: 100 };
			}
		};
		const result = await fetchBlockTimestamp(providerMock as any, 99);
		expect(result).toEqual(100);
	});

	it("should return 0", async () => {
		const providerMock = {
			getBlock() {
				return null;
			}
		};
		const result = await fetchBlockTimestamp(providerMock as any, 99);
		expect(result).toEqual(0);
	});
});

describe("fetchDate tests", () => {
	it("should return 2024-03-27", async () => {
		const providerMock = {
			getBlock() {
				return { timestamp: 1711567580 };
			}
		};
		const result = await fetchDate(providerMock as any, 99);
		expect(result).toEqual("2024-03-27");
	});
});

describe("formatAuctionSummary tests", () => {
	it("should return correctly formatted output", async () => {
		const weiPerBidder = new Map();
		weiPerBidder.set("0x00", 100n * WeiPerEther);
		weiPerBidder.set("0x01", 50n * WeiPerEther);

		const output = formatAuctionSummary(150n * WeiPerEther, 7, weiPerBidder, 1000);
		const expectedOutput = {
			totalSpent: {
				eth: 150,
				usd: 150_000
			},
			totalBids: 7,
			totalUniqueBidders: 2,
			totalBidPerBidder: [
				{ eth: 100, usd: 100_000, bidder: "0x00" },
				{ eth: 50, usd: 50_000, bidder: "0x01" }
			],
			usdPerEth: 1000
		};

		expect(output).toEqual(expectedOutput);
	});

	it("should handle fractional eth values", async () => {
		const weiPerBidder = new Map();
		weiPerBidder.set("0x00", 100n * WeiPerEther);
		weiPerBidder.set("0x01", 10000000000000000n);

		const output = formatAuctionSummary(100010000000000000000n, 7, weiPerBidder, 1000);
		const expectedOutput = {
			totalSpent: {
				eth: 100.01,
				usd: 100_010
			},
			totalBids: 7,
			totalUniqueBidders: 2,
			totalBidPerBidder: [
				{ eth: 100, usd: 100_000, bidder: "0x00" },
				{ eth: 0.01, usd: 10, bidder: "0x01" }
			],
			usdPerEth: 1000
		};

		expect(output).toEqual(expectedOutput);
	});
});
