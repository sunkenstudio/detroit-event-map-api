import mongoose from "mongoose";

const { Schema } = mongoose;

export const userSchema = new Schema({
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  is_blocked:{
    type: Boolean,
    required: true,
    default: false,
  }
});

export const Users = mongoose.model("Users", userSchema);
