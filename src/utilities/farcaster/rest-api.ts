import fetch from "node-fetch";
import { EventData } from "../../types";

const HUB_URL = "https://hub.farcaster.standardcrypto.vc:2281";
const NOUNS_CAST_URL = "chain://eip155:1/erc721:0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03";

type CastId = {
	fid: number;
	hash: string;
};

type Embed = {
	url: string;
	castId?: CastId;
};

interface AugmentedMessage {
	data: {
		type: string;
		fid: number;
		timestamp: number;
		network: string;
		castAddBody: {
			embeds: Embed[];
			embedsDeprecated: string[];
			mentions: number[];
			mentionsPositions: number[];
			parentCastId?: CastId;
			parentUrl?: string;
			text: string;
		};
	};
	hash: string;
	hashScheme: string;
	signature: string;
	signatureScheme: string;
	signer: string;
}

interface AugmentedMessage {
	data: {
		type: string;
		fid: number;
		timestamp: number;
		network: string;
		castAddBody: {
			embeds: Embed[];
			embedsDeprecated: string[];
			mentions: number[];
			mentionsPositions: number[];
			parentCastId?: CastId;
			parentUrl?: string;
			text: string;
		};
	};
	hash: string;
	hashScheme: string;
	signature: string;
	signatureScheme: string;
	signer: string;
	author: string;
}

interface CastResponse {
	messages: AugmentedMessage[];
	nextPageToken: string;
}

export async function _fetchNounsCasts(pageSize = 5, pageToken = "") {
	const url = `${HUB_URL}/v1/castsByParent?url=${NOUNS_CAST_URL}&reverse=1&pageSize=${pageSize}&pageToken=${pageToken}`;
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Unable to fetch casts. ${res.status} ${res.statusText}`);
	}

	const body: CastResponse = await res.json();
	return body;
}

/**
 * Formats cast data.
 * @param next Raw cast data.
 * @returns Formatted cast data.
 */
export function _formatCastData(message: AugmentedMessage): EventData.Farcaster.NounsCast {
	return {
		embeds: message.data.castAddBody.embeds,
		mentions: message.data.castAddBody.mentions,
		mentionsPositions: message.data.castAddBody.mentionsPositions,
		parentCastId: message.data.castAddBody.parentCastId,
		parentUrl: message.data.castAddBody.parentUrl,
		text: message.data.castAddBody.text,
		author: message.author,
		event: {
			hash: message.hash,
			signature: message.signature,
			signer: message.signer,
			fid: message.data.fid,
			network: message.data.network,
			timestamp: message.data.timestamp,
			type: message.data.type
		}
	};
}

/**
 * Returns all Nouns Casts that happen after the previousTimestamp along with the newest timestamp.
 * @param previousTimestamp Previous timestamp.
 * @returns All Nouns Casts and the newest timestamp.
 */
export async function _fetchNewCasts(previousTimestamp: number, fetchCasts = _fetchNounsCasts, _fetchAuthor = _fetchUsername) {
	let nextPageToken = "";
	let newestTimestamp = previousTimestamp;
	const casts: EventData.Farcaster.NounsCast[] = [];
	let isDone = false;

	while (!isDone) {
		try {
			const response = await fetchCasts(5, nextPageToken);
			for (const message of response.messages) {
				if (message.data.timestamp <= previousTimestamp) {
					isDone = true;
					break;
				}
				message.author = await _fetchAuthor(message.data.fid);
				newestTimestamp = Math.max(newestTimestamp, message.data.timestamp);
				casts.unshift(_formatCastData(message));
			}
			nextPageToken = response.nextPageToken;
			isDone = isDone || nextPageToken === "";
		} catch (error: any) {
			if (error.message === "Unable to fetch casts. 502 Bad Gateway") {
				isDone = true;
			} else {
				throw error;
			}
		}
	}

	return {
		casts,
		newestTimestamp
	};
}

/**
 * Retrieves the most recent cast's timestamp.
 * @returns Most recent cast's timestamp.
 */
export async function _fetchNewestTimestamp() {
	const response = await _fetchNounsCasts(1);
	return response.messages[0].data.timestamp;
}

/**
 * @param fid Farcaster user id.
 * @returns The username associated with the id.
 */
export async function _fetchUsername(fid: number) {
	const url = `${HUB_URL}/v1/userNameProofsByFid?fid=${fid}`;
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Unable to fetch usernames. ${res.status} ${res.statusText}`);
	}

	const body: { proofs: { name: string }[] } = await res.json();
	const proofs = body.proofs;
	const names = proofs.map((proof) => proof.name);

	return names[names.length - 1];
}
