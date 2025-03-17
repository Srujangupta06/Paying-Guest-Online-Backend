import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile_number: { type: Number, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
