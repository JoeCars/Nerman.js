import { JsonRpcProvider, Contract, Log, Listener } from "ethers";

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

export class Rewards {
	private _provider: JsonRpcProvider;
	private _contract: Contract;
	private _registeredListeners: Map<SupportedEventsType, Function>;
	private _rewardsViewer: RewardsViewer;
	public static readonly supportedEvents = SUPPORTED_REWARDS_EVENTS;

	constructor(provider: JsonRpcProvider | string) {
		this._provider = createOrReturnProvider(provider);
		this._contract = createRewardsProxyContract(this._provider);
		this._rewardsViewer = new RewardsViewer(this._contract);
		this._registeredListeners = new Map();
	}

	public get viewer() {
		return this._rewardsViewer;
	}

	public get contract() {
		return this._contract;
	}

	public async on<T extends SupportedEventsType>(eventName: T, listener: (data: SupportedEventMap[T]) => void) {
		switch (eventName) {
			case "ClientRegistered":
				this._contract.on(eventName, (clientId: bigint, name: string, description: string, event: Log) => {
					const data: EventData.ClientRegistered = {
						clientId: Number(clientId),
						name,
						description,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "ClientUpdated":
				this._contract.on(eventName, (clientId: bigint, name: string, description: string, event: Log) => {
					const data: EventData.ClientUpdated = {
						clientId: Number(clientId),
						name,
						description,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "ClientRewarded":
				this._contract.on(eventName, (clientId: bigint, amount: bigint, event: Log) => {
					const data: EventData.ClientRewarded = {
						clientId: Number(clientId),
						amount,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "ClientBalanceWithdrawal":
				this._contract.on(eventName, (clientId: bigint, amount: bigint, to: string, event: Log) => {
					const data: EventData.ClientBalanceWithdrawal = {
						clientId: Number(clientId),
						amount,
						to: { id: to },
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "AuctionRewardsUpdated":
				this._contract.on(eventName, (firstAuctionId: bigint, lastAuctionId: bigint, event: Log) => {
					const data: EventData.AuctionRewardsUpdated = {
						firstAuctionId: Number(firstAuctionId),
						lastAuctionId: Number(lastAuctionId),
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "ProposalRewardsUpdated":
				this._contract.on(
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
				this._registeredListeners.set(eventName, listener);
				break;
			case "ClientApprovalSet":
				this._contract.on(eventName, (clientId: bigint, approved: boolean, event: Log) => {
					const data: EventData.ClientApprovalSet = {
						clientId: Number(clientId),
						approved,
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "AuctionRewardsEnabled":
				this._contract.on(eventName, (nextAuctionIdToReward: bigint, event: Log) => {
					const data: EventData.AuctionRewardsEnabled = {
						nextAuctionIdToReward: Number(nextAuctionIdToReward),
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "AuctionRewardsDisabled":
				this._contract.on(eventName, (event: Log) => {
					const data: EventData.AuctionRewardsDisabled = {
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;
			case "ProposalRewardsEnabled":
				this._contract.on(
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
				this._registeredListeners.set(eventName, listener);
				break;
			case "ProposalRewardsDisabled":
				this._contract.on(eventName, (event: Log) => {
					const data: EventData.ProposalRewardsDisabled = {
						event
					};
					listener(data as any);
				});
				this._registeredListeners.set(eventName, listener);
				break;

			default:
				throw new Error(`${eventName} is not supported. Please use a different event.`);
		}
	}

	public off(eventName: SupportedEventsType) {
		let listener = this._registeredListeners.get(eventName);
		if (listener) {
			this._contract.off(eventName, listener as Listener);
		}
		this._registeredListeners.delete(eventName);
	}

	public trigger<T extends SupportedEventsType>(eventName: T, data: SupportedEventMap[T]) {
		const listener = this._registeredListeners.get(eventName);
		if (!listener) {
			throw new Error(`${eventName} does not have a listener.`);
		}

		listener(data);
	}
}

interface ClientMetadata {
	approved: boolean;
	rewarded: bigint;
	withdrawn: bigint;
	__gap: bigint;
	name: string;
	description: string;
}

interface AuctionRevenue {
	sumRevenue: bigint;
	lastAuctionId: bigint;
}

interface AuctionRewardParams {
	auctionRewardBps: bigint;
	minimumAuctionsBetweenUpdates: bigint;
}

interface ProposalRewardParams {
	minimumRewardPeriod: bigint;
	numProposalsEnoughForReward: bigint;
	proposalRewardBps: bigint;
	votingRewardBps: bigint;
	proposalEligibilityQuorumBps: bigint;
}

class RewardsViewer {
	private contract: Contract;
	constructor(contract: Contract) {
		this.contract = contract;
	}

	public async RewardsStorageLocation(): Promise<string> {
		return this.contract.RewardsStorageLocation();
	}

	public async admin(): Promise<string> {
		return this.contract.admin();
	}

	public async auctionHouse(): Promise<string> {
		return this.contract.auctionHouse();
	}

	public async auctionRewardsEnabled(): Promise<boolean> {
		return this.contract.auctionRewardsEnabled();
	}

	public async balanceOf(owner: string): Promise<bigint> {
		return this.contract.balanceOf(owner);
	}

	public async clientBalance(clientId: number): Promise<bigint> {
		return this.contract.clientBalance(clientId);
	}

	public async clientMetadata(tokenId: number): Promise<ClientMetadata> {
		const [approved, rewarded, withdrawn, __gap, name, description] = await this.contract.clientMetadata(tokenId);
		return {
			approved,
			rewarded,
			withdrawn,
			__gap,
			name,
			description
		};
	}

	public async descriptor(): Promise<string> {
		return this.contract.descriptor();
	}

	public async ethToken(): Promise<string> {
		return this.contract.ethToken();
	}

	public async getApproved(tokenId: number): Promise<string> {
		return this.contract.getApproved(tokenId);
	}

	public async getAuctionRevenue(firstNounId: number, endTimestamp: number): Promise<AuctionRevenue> {
		const [sumRevenue, lastAuctionId] = await this.contract.getAuctionRevenue(firstNounId, endTimestamp);
		return { sumRevenue, lastAuctionId };
	}

	public async getAuctionRewardParams(): Promise<AuctionRewardParams> {
		const [auctionRewardBps, minimumAuctionsBetweenUpdates] = await this.contract.getAuctionRewardParams();
		return { auctionRewardBps, minimumAuctionsBetweenUpdates };
	}

	public async getProposalRewardParams(): Promise<ProposalRewardParams> {
		const [
			minimumRewardPeriod,
			numProposalsEnoughForReward,
			proposalRewardBps,
			votingRewardBps,
			proposalEligibilityQuorumBps
		] = await this.contract.getProposalRewardParams();
		return {
			minimumRewardPeriod,
			numProposalsEnoughForReward,
			proposalRewardBps,
			votingRewardBps,
			proposalEligibilityQuorumBps
		};
	}

	public async getVotingClientIds(lastProposalId: number): Promise<bigint[]> {
		return this.contract.getVotingClientIds(lastProposalId);
	}

	public async isApprovedForAll(owner: string, operator: string): Promise<boolean> {
		return this.contract.isApprovedForAll(owner, operator);
	}

	public async lastProposalRewardsUpdate(): Promise<bigint> {
		return this.contract.lastProposalRewardsUpdate();
	}

	public async name(): Promise<string> {
		return this.contract.name();
	}

	public async nextAuctionIdToReward(): Promise<bigint> {
		return this.contract.nextAuctionIdToReward();
	}

	public async nextProposalIdToReward(): Promise<bigint> {
		return this.contract.nextProposalIdToReward();
	}

	public async nextProposalRewardFirstAuctionId(): Promise<bigint> {
		return this.contract.nextProposalRewardFirstAuctionId();
	}

	public async nextTokenId(): Promise<bigint> {
		return this.contract.nextTokenId();
	}

	public async nounsDAO(): Promise<string> {
		return this.contract.nounsDAO();
	}

	public async owner(): Promise<string> {
		return this.contract.owner();
	}

	public async ownerOf(tokenId: number): Promise<string> {
		return this.contract.ownerOf(tokenId);
	}

	public async paused(): Promise<boolean> {
		return this.contract.paused();
	}

	public async proposalRewardsEnabled(): Promise<boolean> {
		return this.contract.proposalRewardsEnabled();
	}

	public async supportsInterface(interfaceId: string): Promise<boolean> {
		return this.contract.supportsInterface(interfaceId);
	}

	public async symbol(): Promise<string> {
		return this.contract.symbol();
	}

	public async tokenURI(tokenId: number): Promise<string> {
		return this.contract.tokenURI(tokenId);
	}
}
