import { Schema, model } from "mongoose";

export const userRoleSchema = new Schema({
  isSuper: {
    type: Boolean,
    required: false,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: Number,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
  currentPosition: {
    type: String,
    required: true,
    default: "Laborer",
  },
  startDate: {
    type: Date,
    required: false,
  },
  userRole: {
    type: [userRoleSchema],
    required: false,
  },
});
const User = model("User", userSchema);

export default User;
