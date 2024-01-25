import { checkDirectory } from "../../../src/utilities/indexer/indexer-logic";
import { mkdir, readdir, rm } from "fs/promises";

describe("checkDirectory tests", () => {
	const filePath = __dirname + "/_test/_indexer/my-file.ts";
	const directoryName = __dirname + "/_test/_indexer/";

	afterEach(async () => {
		await rm(__dirname + "/_test/", { recursive: true });
	});

	test("creates missing directory", async () => {
		await checkDirectory(filePath);
		const files = await readdir(directoryName);

		expect(files.length).toEqual(0);
	});
});
