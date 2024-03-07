import { Schema, model } from "mongoose";

export const productionLineSchema = new Schema({
  lineName: {
    type: String,
    required: true,
  },
  departmentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
});

const ProductionLine = model("ProductionLine", productionLineSchema);

export default ProductionLine;
