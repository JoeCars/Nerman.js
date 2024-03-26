import { indexEvent, ConversionRateManager } from "../../../src/utilities/indexer/database-indexer";

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
		const result = ConversionRateManager.formatDate(date);
		expect(result).toEqual("2023-12-25");
	});

	it("should work when the month and day are single digits", () => {
		const date = new Date("2024-01-01");
		const result = ConversionRateManager.formatDate(date);
		expect(result).toEqual("2024-01-01");
	});

	it("should work when passing in a timestamp", () => {
		const MILLISECONDS_PER_SECOND = 1_000;

		const date = new Date("2023-12-25");
		const result = ConversionRateManager.formatDate(date.getTime() / MILLISECONDS_PER_SECOND);
		expect(result).toEqual("2023-12-25");
	});
});

describe("incrementDate tests", () => {
	it("should increment days", () => {
		const result = ConversionRateManager.incrementDate("2023-12-25");
		expect(result).toEqual("2023-12-26");
	});
	it("should increment months", () => {
		const result = ConversionRateManager.incrementDate("2023-01-31");
		expect(result).toEqual("2023-02-01");
	});
	it("should increment years", () => {
		const result = ConversionRateManager.incrementDate("2023-12-31");
		expect(result).toEqual("2024-01-01");
	});
	it("should handle leap years", () => {
		const result1 = ConversionRateManager.incrementDate("2024-02-28");
		const result2 = ConversionRateManager.incrementDate("2024-02-29");
		const result3 = ConversionRateManager.incrementDate("2023-02-28");
		expect(result1).toEqual("2024-02-29");
		expect(result2).toEqual("2024-03-01");
		expect(result3).toEqual("2023-03-01");
	});
});
