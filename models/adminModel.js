import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  mobile_number: { type: Number, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
});

export const Admin = mongoose.model("Admin", adminSchema);
