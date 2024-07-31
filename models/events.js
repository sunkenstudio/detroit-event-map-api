import mongoose from "mongoose";

const { Schema } = mongoose;

export const eventSchema = new Schema({
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  user_id:{
    type: String,
    required: false,
    default: "",
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
  is_hidden:{
    type: Boolean,
    required: true,
    default: false,
  }
});

export const Events = mongoose.model("Events", eventSchema);
