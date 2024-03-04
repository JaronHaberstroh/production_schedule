import { Schema, model } from "mongoose";

export const linePositionSchema = new Schema({
  lineId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ProductionLine",
  },
  positionId: {
    type: Schema.Types.ObjectId,
    ref: "WorkPosition",
  },
});

const LinePosition = model("LinePosition", linePositionSchema);

export default LinePosition;
