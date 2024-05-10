import mongoose from "mongoose";

const { Schema } = mongoose;

export const eventSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
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
    required: false,
    default: "",
  },
  start_date: {
    type: String,
    required: true,
    default: "1991-01-01 00:00:00",
  },
  end_date: {
    type: String,
    required: true,
    default: "1991-01-01 00:00:00",
  },
  date: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
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
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: false,
  },
});

export const Events = mongoose.model("Events", eventSchema);
