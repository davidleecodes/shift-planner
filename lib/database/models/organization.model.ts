import { Schema, model, models } from "mongoose";

const OrganizationSchema = new Schema({
  clerkId: {
    type: String,
    unique: true,
  },
});
const Organization =
  models?.Organization || model("Organization", OrganizationSchema);

export default Organization;
