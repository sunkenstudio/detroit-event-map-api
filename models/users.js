import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  // username, user_id, is_ios, currency, rank, inventory, story_progress
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  username: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  is_logged_in: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Users = mongoose.model("Users", userSchema);
