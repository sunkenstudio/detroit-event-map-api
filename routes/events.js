import { Router } from "express";
import { Events, eventSchema } from "../models/events.js";
import { Users } from "../models/users.js";
import mongoose from "mongoose";
import moment from "moment/moment.js";

const router = Router();

// Get all
router.get("/", async (req, res) => {
  try {
    const today = moment();
    const events = await Events.find();
    const filtered = events.filter((i) =>
      moment(i.date, "YYYY-MM-DD").isSameOrAfter(today, "day")
    );
    res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", getEvent, async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user events
router.get('/user/:id', async (req, res)=>{
  const userId = req.params.id;
  try{
    const events = await Events.find({user_id: userId});
    res.status(200).send({events});
  } catch(err){
    res.status(500).json({ message: err.message });
  }
})

// Create a user event
router.post("/", async (req, res) => {
  const { event, id } = req.body;
  const user = await Users.findById(id);

  if(user.is_blocked){
    res.status(200).send({message:'blocked'});
  }
  
  const Event = mongoose.model("Event", eventSchema);
  try {
    await Event.create({...event, user_id: user._id });
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update user event
router.post("/:id", getEvent, async (req, res) => {
  const eventId = req.params.id;
  const { userId } = req.body;
  const event = await Events.findById({_id: eventId});
  if(!event){
    res
      .status(400)
      .json({ message: "Event not found." });
  }

  if(event.user_id !== userId){
    res
      .status(401)
      .json({ message: "Access denied." });
  }

  const {
    title,
    img,
    start_date,
    end_date,
    date,
    desc,
    url,
    address,
    lat,
    lng,
    price,
  } = req.body;
  if (title) {
    event.title = title;
  }
  if (img) {
    event.img = img;
  }
  if (start_date) {
    event.start_date = start_date;
  }
  if (end_date) {
    event.end_date = end_date;
  }
  if (date) {
    event.date = date;
  }
  if (desc) {
    event.desc = desc;
  }
  if (url) {
    event.url = url;
  }
  if (address) {
    event.address = address;
  }
  if (lat) {
    event.lat = lat;
  }
  if (lng) {
    event.lng = lng;
  }
  if (price) {
    event.price = price;
  }
  try {
    const updatedEvent = await event.save();
    res.status(200).json({updatedEvent})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one
router.delete("/:id", getEvent, async (req, res) => {
  const eventId = req.params.id;
  const { userId } = req.body;
  const event = await Events.findById({_id: eventId});
  console.log(eventId, userId);
  if(!event){
    res
      .status(400)
      .json({ message: "Event not found." });
  }

  if(event.user_id !== userId){
    res
      .status(401)
      .json({ message: "Access denied." });
  }
  try {
    await event.deleteOne();
    res.json({ message: "event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getEvent(req, res, next) {
  let event;
  const id = new mongoose.Types.ObjectId(req.params.id);
  try {
    event = await Events.findById(id);
    if (!event) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  res.event = event;
  next();
}

export const eventsRouter = router;
