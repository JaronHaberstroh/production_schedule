import { Schema, model } from "mongoose";

export const workPositionsSchema = new Schema({
  positionName: {
    type: String,
    required: true,
  },
});

const WorkPosition = model("WorkPosition", workPositionsSchema);

export default WorkPosition;
