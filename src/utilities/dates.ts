import { JsonRpcProvider } from "ethers-v6";

const MILLISECONDS_PER_SECOND = 1_000;

export class BlockToDateConverter {
	private provider: JsonRpcProvider;
	private dateFormatter: DateFormatter;
	constructor(provider: JsonRpcProvider, dateFormatter: DateFormatter) {
		this.provider = provider;
		this.dateFormatter = dateFormatter;
	}

	/** Seconds since unix epoch. */
	async fetchBlockTimestamp(blockNumber: number | string | bigint) {
		const block = await this.provider.getBlock(blockNumber);
		return block ? block.timestamp : 0;
	}

	async fetchDate(blockNumber: number | string | bigint) {
		const timestamp = await this.fetchBlockTimestamp(blockNumber);
		const date = this.dateFormatter.formatDate(timestamp);
		return date;
	}
}

export class DateFormatter {
	private convertTimeToDate(time: number | string | Date) {
		if (typeof time === "number") {
			return new Date(time * MILLISECONDS_PER_SECOND);
		} else if (typeof time === "string") {
			return new Date(time);
		} else {
			return time;
		}
	}

	private extractDayMonthYear(date: Date) {
		return {
			year: date.getUTCFullYear(),
			month: date.getUTCMonth() + 1, // getUTCMonth is 0 indexed.
			day: date.getUTCDate()
		};
	}
	private formatDayMonthYear({ day, month, year }: { day: number; month: number; year: number }) {
		return `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
	}

	/**
	 * @param time either the seconds since unix time, a string date, or a date object
	 * @returns a date string formatted as "yyyy-mm-dd"
	 */
	formatDate(time: number | string | Date) {
		const date = this.convertTimeToDate(time);
		const dayMonthYear = this.extractDayMonthYear(date);
		const formattedDate = this.formatDayMonthYear(dayMonthYear);
		return formattedDate;
	}

	incrementDate(date: string) {
		const oldDate = new Date(date);
		const newDate = new Date(oldDate);
		newDate.setUTCDate(oldDate.getUTCDate() + 1);
		const formattedDate = this.formatDate(newDate);
		return formattedDate;
	}
}
