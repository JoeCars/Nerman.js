import Snapshot, {
	createProposalCreatedQuery,
	createProposalCompletedQuery,
	createVoteCastQuery
} from "../../../src/contracts/snapshot";

describe("Snapshot tests", () => {
	test("should add space IDs in constructor", () => {
		const snapshot = new Snapshot("1", "22", "333");

		expect(snapshot.spaceIds).toEqual(["1", "22", "333"]);
	});
	test("should have empty spaceIds with no constructor arg", () => {
		const snapshot = new Snapshot();

		expect(snapshot.spaceIds).toEqual([]);
	});
	test("should add new spaceIds", () => {
		const snapshot = new Snapshot();
		snapshot.addSpace("1", "22", "333");

		expect(snapshot.spaceIds).toEqual(["1", "22", "333"]);
	});
	test("should not add duplicate spaceIds", () => {
		const snapshot = new Snapshot("1","22","333");
		snapshot.addSpace("1", "22", "4444");

		expect(snapshot.spaceIds).toEqual(["1", "22", "333", "4444"]);
	});
	test("should remove spaceIds", () => {
		const snapshot = new Snapshot("1", "22", "333");
		snapshot.removeSpace("22");

		expect(snapshot.spaceIds).toEqual(["1", "333"]);
	});
	test("should add spaceIds to createProposalCreatedQuery", () => {
		// Don't change indentation of query. Breaks test.
		const expectedQuery = `
		query Proposals {
			proposals(
			first: 10,
			skip: 0,
			where: {
				state: "pending"
				space_in: ["1","22","333"]
			},
			orderBy: "created",
			orderDirection: desc
			) {
			id
			title
			body
			choices
			start
			end
			created
			snapshot
			state
			author
			quorum
			scores
			votes
			space {
				id
				name
			}
			}
		}
	`;

		expect(createProposalCreatedQuery(["1", "22", "333"])).toEqual(expectedQuery);
	});
	test("should add spaceIds to createProposalCompletedQuery", () => {
		// Don't change indentation of query. Breaks test.
		const expectedQuery = `
		query Proposals {
			proposals(
			first: 20,
			skip: 0,
			where: {
				state: "closed"
				space_in: ["1","22","333"]
			},
			orderBy: "end",
			orderDirection: desc
			) {
			id
			title
			body
			choices
			start
			end
			created
			snapshot
			state
			author
			quorum
			scores
			votes
			space {
				id
				name
			}
			}
		}
	`;

		expect(createProposalCompletedQuery(["1", "22", "333"])).toEqual(expectedQuery);
	});
	test("should add spaceIds to createVoteCastQuery", () => {
		const snapshot = new Snapshot("1", "22", "333");

		// Don't change indentation of query. Breaks test.
		const expectedQuery = `
		query Votes {
			votes (
			first: 20
			orderBy: "created"
			orderDirection: desc
			where: {
				space_in: ["1","22","333"]
			}
			) {
			id
			voter
			vp
			created
			choice
			reason
			space {
				id
				name
			}
			proposal {
				id
				title
				choices
				quorum
				scores
				votes
			}
			}
		}
		`;

		expect(createVoteCastQuery(snapshot.spaceIds)).toEqual(expectedQuery);
	});
});
