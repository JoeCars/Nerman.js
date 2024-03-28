import { Schema, model } from "mongoose";

const ETHConversionRateSchema = new Schema({
	usdPerEth: {
		type: Schema.Types.Number,
		required: true
	},
	date: {
		type: Date,
		required: true,
		unique: true
	}
});

export default model("ETHConversionRate", ETHConversionRateSchema);
