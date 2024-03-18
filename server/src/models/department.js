import { Schema, model } from "mongoose";

export const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: [true, "departmentName field required"],
  },
});

const Department = model("Department", departmentSchema);

export default Department;
