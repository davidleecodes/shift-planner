import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: {
    type: String,
    // required: true,
    // unique: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },
  username: {
    type: String,
    // required: true,
    // unique: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  planId: {
    type: Number,
    default: 1,
  },
  creditBalance: {
    type: Number,
    default: 10,
  },

  organization_id: {
    type: String,
  },
  organization_clerkId: {
    type: String,
  },
  shiftDays: {
    Mon: String,
    Tue: String,
    Wed: String,
    Thu: String,
    Fri: String,
    Sat: String,
    Sun: String,
  },
});
const User = models?.User || model("User", UserSchema);

export default User;
