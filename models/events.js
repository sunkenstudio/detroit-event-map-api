import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  end_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  date: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
    default: 0,
  },
  lng: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Events = mongoose.model("Events", eventSchema);
