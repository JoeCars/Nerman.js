import { JsonRpcProvider, Contract, Log, Listener } from "ethers-v6";

import { createOrReturnProvider } from "../../utilities/providers";
import { EventData } from "../../types";
import { createRewardsProxyContract } from "../../utilities/contracts";

export interface SupportedEventMap {
	ClientRegistered: EventData.ClientRegistered;
	ClientUpdated: EventData.ClientUpdated;
	ClientRewarded: EventData.ClientRewarded;
	ClientBalanceWithdrawal: EventData.ClientBalanceWithdrawal;
	AuctionRewardsUpdated: EventData.AuctionRewardsUpdated;
	ProposalRewardsUpdated: EventData.ProposalRewardsUpdated;
	ClientApprovalSet: EventData.ClientApprovalSet;
	AuctionRewardsEnabled: EventData.AuctionRewardsEnabled;
	AuctionRewardsDisabled: EventData.AuctionRewardsDisabled;
	ProposalRewardsEnabled: EventData.ProposalRewardsEnabled;
	ProposalRewardsDisabled: EventData.ProposalRewardsDisabled;
}
const SUPPORTED_REWARDS_EVENTS = [
	"ClientRegistered",
	"ClientUpdated",
	"ClientRewarded",
	"ClientBalanceWithdrawal",
	"AuctionRewardsUpdated",
	"ProposalRewardsUpdated",
	"ClientApprovalSet",
	"AuctionRewardsEnabled",
	"AuctionRewardsDisabled",
	"ProposalRewardsEnabled",
	"ProposalRewardsDisabled"
] as const;
export type SupportedEventsType = keyof SupportedEventMap;

export default class Rewards {
	private provider: JsonRpcProvider;
	private contract: Contract;
	private registeredListeners: Map<SupportedEventsType, Function>;
	public static readonly supportedEvents = SUPPORTED_REWARDS_EVENTS;

	constructor(provider: JsonRpcProvider | string) {
		this.provider = createOrReturnProvider(provider);
		this.contract = createRewardsProxyContract(this.provider);
		this.registeredListeners = new Map();
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "ClientRegistered":
				this.contract.on(eventName, (clientId: bigint, name: string, description: string, event: Log) => {
					const data: EventData.ClientRegistered = {
						clientId: Number(clientId),
						name,
						description,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "ClientUpdated":
				this.contract.on(eventName, (clientId: bigint, name: string, description: string, event: Log) => {
					const data: EventData.ClientUpdated = {
						clientId: Number(clientId),
						name,
						description,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "ClientRewarded":
				this.contract.on(eventName, (clientId: bigint, amount: bigint, event: Log) => {
					const data: EventData.ClientRewarded = {
						clientId: Number(clientId),
						amount,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "ClientBalanceWithdrawal":
				this.contract.on(eventName, (clientId: bigint, amount: bigint, to: string, event: Log) => {
					const data: EventData.ClientBalanceWithdrawal = {
						clientId: Number(clientId),
						amount,
						to: { id: to },
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "AuctionRewardsUpdated":
				this.contract.on(eventName, (firstAuctionId: bigint, lastAuctionId: bigint, event: Log) => {
					const data: EventData.AuctionRewardsUpdated = {
						firstAuctionId: Number(firstAuctionId),
						lastAuctionId: Number(lastAuctionId),
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "ProposalRewardsUpdated":
				this.contract.on(
					eventName,
					(
						firstProposalId: bigint,
						lastProposalId: bigint,
						firstAuctionIdForRevenue: bigint,
						lastAuctionIdForRevenue: bigint,
						auctionRevenue: bigint,
						rewardPerProposal: bigint,
						rewardPerVote: bigint,
						event: Log
					) => {
						const data: EventData.ProposalRewardsUpdated = {
							firstProposalId: Number(firstProposalId),
							lastProposalId: Number(lastProposalId),
							firstAuctionIdForRevenue: Number(firstAuctionIdForRevenue),
							lastAuctionIdForRevenue: Number(lastAuctionIdForRevenue),
							auctionRevenue,
							rewardPerProposal,
							rewardPerVote,
							event
						};
						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;
			case "ClientApprovalSet":
				this.contract.on(eventName, (clientId: bigint, approved: boolean, event: Log) => {
					const data: EventData.ClientApprovalSet = {
						clientId: Number(clientId),
						approved,
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "AuctionRewardsEnabled":
				this.contract.on(eventName, (nextAuctionIdToReward: bigint, event: Log) => {
					const data: EventData.AuctionRewardsEnabled = {
						nextAuctionIdToReward: Number(nextAuctionIdToReward),
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "AuctionRewardsDisabled":
				this.contract.on(eventName, (event: Log) => {
					const data: EventData.AuctionRewardsDisabled = {
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;
			case "ProposalRewardsEnabled":
				this.contract.on(
					eventName,
					(nextProposalIdToReward: bigint, nextProposalRewardFirstAuctionId: bigint, event: Log) => {
						const data: EventData.ProposalRewardsEnabled = {
							nextProposalIdToReward: Number(nextProposalIdToReward),
							nextProposalRewardFirstAuctionId: Number(nextProposalRewardFirstAuctionId),
							event
						};
						listener(data as any);
					}
				);
				this.registeredListeners.set(eventName, listener);
				break;
			case "ProposalRewardsDisabled":
				this.contract.on(eventName, (event: Log) => {
					const data: EventData.ProposalRewardsDisabled = {
						event
					};
					listener(data as any);
				});
				this.registeredListeners.set(eventName, listener);
				break;

			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	public off(eventName: SupportedEventsType) {
		let listener = this.registeredListeners.get(eventName);
		if (listener) {
			this.contract.off(eventName, listener as Listener);
		}
		this.registeredListeners.delete(eventName);
	}

	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this.registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}
}
