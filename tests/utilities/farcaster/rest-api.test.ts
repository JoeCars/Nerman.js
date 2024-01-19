import { _fetchNewCasts } from "../../../src/utilities/farcaster/rest-api";

describe("_fetchNewCasts tests", () => {
	test("is called once", async () => {
		const fetchMock = jest.fn(() => {
			return {
				messages: [],
				nextPageToken: ""
			};
		});

		const response = await _fetchNewCasts(0, fetchMock as any);

		expect(response.newestTimestamp).toEqual(0);
		expect(response.casts).toEqual([]);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	test("is called twice", async () => {
		const data = [
			{
				messages: [],
				nextPageToken: "0451"
			},
			{
				messages: [],
				nextPageToken: ""
			}
		];
		let i = 0;
		const fetchMock = jest.fn(() => {
			return data[i++];
		});

		const response = await _fetchNewCasts(0, fetchMock as any);

		expect(response.newestTimestamp).toEqual(0);
		expect(response.casts).toEqual([]);
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});

	test("updates timestamp to 100", async () => {
		const data = [
			{
				messages: [
					{
						data: {
							castAddBody: {},
							timestamp: 100
						}
					}
				],
				nextPageToken: ""
			}
		];
		let i = 0;
		const fetchMock = jest.fn(() => {
			return data[i++];
		});

		const response = await _fetchNewCasts(0, fetchMock as any);

		expect(response.newestTimestamp).toEqual(100);
		expect(response.casts.length).toEqual(1);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	test("handles 502 error", async () => {
		const fetchMock = jest.fn(() => {
			throw new Error("Unable to fetch casts. 502 Bad Gateway");
		});

		const response = await _fetchNewCasts(0, fetchMock as any);

		expect(response.newestTimestamp).toEqual(0);
		expect(response.casts.length).toEqual(0);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});
});
