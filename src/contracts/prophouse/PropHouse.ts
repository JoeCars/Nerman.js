import { ethers, BigNumber } from "ethers";
import { ChainId, OrderDirection, PropHouse as PropHouseSDK } from "@prophouse/sdk";
import { OrderByProposalFields, OrderByVoteFields } from "@prophouse/sdk/dist/gql/starknet/graphql";
import { schedule } from "node-cron";
import { Account, EventData } from "../../types";

const SUPPORTED_PROP_HOUSE_EVENTS = ["RoundCreated", "HouseCreated", "ProposalSubmitted", "VoteCast"] as const;
export type SupportedEventsType = (typeof SUPPORTED_PROP_HOUSE_EVENTS)[number];

/**
 * A wrapper class for PropHouse.
 */
export class PropHouse {
	private provider: ethers.providers.JsonRpcProvider;
	public prophouse: PropHouseSDK;
	public registeredListeners: Map<SupportedEventsType, Function>;
	public readonly supportedEvents = SUPPORTED_PROP_HOUSE_EVENTS;
	private proposalSubmittedLastTime: number;
	private voteCastLastTime: number;

	constructor(provider: ethers.providers.JsonRpcProvider) {
		this.provider = provider;
		this.prophouse = new PropHouseSDK({
			evmChainId: ChainId.EthereumMainnet,
			evm: this.provider
		});
		this.registeredListeners = new Map();
		this.proposalSubmittedLastTime = Date.now();
		this.voteCastLastTime = Date.now();
	}

	/**
	 * Assigns a listener function for the given event. Throws an error if the event is not supported.
	 * @param eventName The event being listened to.
	 * @param listener The listener function.
	 * @example
	 * prophouse.on('RoundCreated', (data) => {
	 * 	console.log(data.creator);
	 * });
	 */
	public async on(eventName: SupportedEventsType, listener: Function) {
		switch (eventName) {
			case "RoundCreated":
				this.prophouse.contract.on(
					"RoundCreated",
					(
						creator: string,
						house: string,
						round: string,
						kind: any,
						title: string,
						description: string,
						event: ethers.Event
					) => {
						const data: EventData.PropHouse.RoundCreated = {
							creator: { id: creator },
							house: { id: house },
							round: { id: round },
							kind,
							title,
							description,
							event
						};

						listener(data);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;
			case "HouseCreated":
				this.prophouse.contract.on("HouseCreated", (creator: string, house: string, kind: any, event: ethers.Event) => {
					const data: EventData.PropHouse.HouseCreated = {
						creator: { id: creator },
						house: { id: house },
						kind,
						event
					};

					listener(data);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "ProposalSubmitted":
				this.listenToProposalSubmittedEvent(listener as () => {});
				this.registeredListeners.set(eventName, listener);
				break;
			case "VoteCast":
				this.listenToVoteCastEvent(listener as () => {});
				this.registeredListeners.set(eventName, listener);
				break;
			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	/**
	 * Removes a listener.
	 * @param eventName the event listened to.
	 * @example
	 * prophouse.off('RoundCreated');
	 */
	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.prophouse.contract.off(eventName, listener as ethers.providers.Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	/**
	 * Triggers the listener of the given event with the given data. Throws an error if the event did not have a listener.
	 * @param eventName The event to be triggered.
	 * @param data The data being passed to the listener.
	 */
	public trigger(eventName: SupportedEventsType, data: unknown) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}

	/**
	 * @returns the name of the contract. 'PropHouse'.
	 */
	public name() {
		return "PropHouse";
	}

	private listenToProposalSubmittedEvent(listener: (arg: unknown) => void) {
		schedule("*/1 * * * *", async () => {
			const proposals = await this.prophouse.query.getProposals({
				where: {
					receivedAt_gt: this.proposalSubmittedLastTime
				},
				orderBy: OrderByProposalFields.ReceivedAt,
				orderDirection: OrderDirection.Asc
			});

			for (let i = 0; i < proposals.length; ++i) {
				// Transform into desired form.
				if (i === proposals.length - 1) {
					this.proposalSubmittedLastTime = proposals[i].receivedAt;
				}
				listener(proposals[i]);
			}
		});
	}

	private listenToVoteCastEvent(listener: (arg: unknown) => void) {
		schedule("*/1 * * * *", async () => {
			const votes = await this.prophouse.query.getVotes({
				where: {
					receivedAt_gt: this.voteCastLastTime
				},
				orderBy: OrderByVoteFields.ReceivedAt,
				orderDirection: OrderDirection.Asc
			});

			for (let i = 0; i < votes.length; ++i) {
				// Transform into desired form.
				if (i === votes.length - 1) {
					this.voteCastLastTime = votes[i].receivedAt;
				}
				listener(votes[i]);
			}
		});
	}
}
