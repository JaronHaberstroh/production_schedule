import { Schema, model } from "mongoose";

export const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
  },
});

const Department = model("Department", departmentSchema);

export default Department;
