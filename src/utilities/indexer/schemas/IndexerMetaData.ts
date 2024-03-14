import { Schema, model } from "mongoose";

const indexerMetaDataSchema = new Schema(
	{
		eventName: {
			type: String,
			required: true,
			unique: true
		},
		recentBlock: {
			type: Schema.Types.Number,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default model("IndexerMetaData", indexerMetaDataSchema);
