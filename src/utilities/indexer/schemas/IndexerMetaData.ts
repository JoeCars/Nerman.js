import { Schema, model } from "mongoose";

const indexerMetaDataSchema = new Schema(
	{
		_id: Schema.ObjectId,
		eventSignature: {
			unique: true,
			type: String,
			required: true
		},
		eventName: {
			type: String,
			required: true
		},
		recentBlock: {
			type: Schema.Types.BigInt,
			required: true
		}
	},
	{
		timestamps: true
	}
);

export default model("IndexerMetaData", indexerMetaDataSchema);
