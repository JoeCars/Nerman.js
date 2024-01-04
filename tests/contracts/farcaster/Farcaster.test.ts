import { _getRecentTimestamp, _listenToNounsCast } from "../../../src/contracts/farcaster/Farcaster";

describe("Farcaster tests", () => {
	describe("_getRecentTimestamp tests", () => {
		test("should return timestamp", async () => {
			const arg = {
				listCastsByParent() {
					return {
						next() {
							return {
								value: {
									data: {
										timestamp: 123
									}
								}
							};
						}
					};
				}
			};

			const timestamp = await _getRecentTimestamp(arg as any);
			expect(timestamp).toEqual(123);
		});
	});
	describe("_listenToNounsCast", () => {
		test("should call listener once", async () => {
			const data = [
				{
					value: {
						data: {
							castAddBody: {
								embeds: [],
								mentions: [],
								mentionsPositions: [],
								parentCastId: {},
								parentUrl: "",
								text: ""
							},
							fid: 0,
							network: "",
							timestamp: 300,
							type: ""
						},
						hash: "",
						signature: "",
						signer: ""
					}
				},
				{
					value: {
						data: {
							castAddBody: {
								embeds: [],
								mentions: [],
								mentionsPositions: [],
								parentCastId: {},
								parentUrl: "",
								text: ""
							},
							fid: 0,
							network: "",
							timestamp: 100,
							type: ""
						},
						hash: "",
						signature: "",
						signer: ""
					}
				}
			];
			let i = 0;
			const clientMock = {
				listCastsByParent() {
					return {
						next() {
							return data[i++];
						}
					};
				}
			};
			const listenerMock = jest.fn();
			const previousTimestamp = 200;

			const output = await _listenToNounsCast(clientMock as any, listenerMock, previousTimestamp);

			expect(output).toEqual(300);
			expect(listenerMock).toHaveBeenCalledTimes(1);
		});

		test("should call listener twice", async () => {
			const data = [
				{
					value: {
						data: {
							castAddBody: {
								embeds: [],
								mentions: [],
								mentionsPositions: [],
								parentCastId: {},
								parentUrl: "",
								text: ""
							},
							fid: 0,
							network: "",
							timestamp: 400,
							type: ""
						},
						hash: "",
						signature: "",
						signer: ""
					}
				},
				{
					value: {
						data: {
							castAddBody: {
								embeds: [],
								mentions: [],
								mentionsPositions: [],
								parentCastId: {},
								parentUrl: "",
								text: ""
							},
							fid: 0,
							network: "",
							timestamp: 300,
							type: ""
						},
						hash: "",
						signature: "",
						signer: ""
					}
				}
			];
			let i = 0;
			const clientMock = {
				listCastsByParent() {
					return {
						next() {
							return data[i++];
						}
					};
				}
			};
			const listenerMock = jest.fn();
			const previousTimestamp = 200;

			const output = await _listenToNounsCast(clientMock as any, listenerMock, previousTimestamp);

			expect(output).toEqual(400);
			expect(listenerMock).toHaveBeenCalledTimes(2);
		});

		test("should not call listener", async () => {
			const data = [
				{
					value: {
						data: {
							castAddBody: {
								embeds: [],
								mentions: [],
								mentionsPositions: [],
								parentCastId: {},
								parentUrl: "",
								text: ""
							},
							fid: 0,
							network: "",
							timestamp: 100,
							type: ""
						},
						hash: "",
						signature: "",
						signer: ""
					}
				}
			];
			let i = 0;
			const clientMock = {
				listCastsByParent() {
					return {
						next() {
							return data[i++];
						}
					};
				}
			};
			const listenerMock = jest.fn();
			const previousTimestamp = 200;

			const output = await _listenToNounsCast(clientMock as any, listenerMock, previousTimestamp);

			expect(output).toEqual(200);
			expect(listenerMock).not.toHaveBeenCalled();
		});
	});
});
