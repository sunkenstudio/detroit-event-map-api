import { Router } from "express";
import { Events, eventSchema } from "../models/events.js";
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

// Create one
// router.post("/", async (req, res) => {
//   const {
//     title,
//     img,
//     start_date,
//     end_date,
//     date,
//     desc,
//     url,
//     address,
//     lat,
//     lng,
//   } = req.body;
//   const event = new Events({
//     title,
//     img,
//     start_date,
//     end_date,
//     date,
//     desc,
//     url,
//     address,
//     lat,
//     lng,
//   });

//   try {
//     const newEvent = await event.save();
//     res.status(201).send({ message: "success" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Create one
router.post("/", async (req, res) => {
  const { token, events } = req.body;
  const authToken = process.env.AUTH_TOKEN;
  if (token !== authToken) {
    res
      .status(401)
      .json({ message: "Please cut that shit out. I have no money." });
  }

  const Event = mongoose.model("Event", eventSchema);
  try {
    await Event.insertMany(events);
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.patch("/:id", getEvent, async (req, res) => {
  const { token } = req.body;
  const authToken = process.env.AUTH_TOKEN;
  if (token !== authToken) {
    res
      .status(401)
      .json({ message: "Please cut that shit out. I have no money." });
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
  } = req.body;
  if (title) {
    res.event.title = title;
  }
  if (img) {
    res.event.img = img;
  }
  if (start_date) {
    res.event.start_date = start_date;
  }
  if (end_date) {
    res.event.end_date = end_date;
  }
  if (date) {
    res.event.date = date;
  }
  if (desc) {
    res.event.desc = desc;
  }
  if (url) {
    res.event.url = url;
  }
  if (address) {
    res.event.address = address;
  }
  if (lat) {
    res.event.lat = lat;
  }
  if (lng) {
    res.event.lng = lng;
  }
  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one
router.delete("/:id", getEvent, async (req, res) => {
  const { token } = req.body;
  const authToken = process.env.AUTH_TOKEN;
  if (token !== authToken) {
    res
      .status(401)
      .json({ message: "Please cut that shit out. I have no money." });
  }
  try {
    await res.event.deleteOne();
    res.json({ message: "event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/", async (req, res) => {
  const { token } = req.body;
  const authToken = process.env.AUTH_TOKEN;
  if (token !== authToken) {
    res
      .status(401)
      .json({ message: "Please cut that shit out. I have no money." });
  }
  try {
    const Event = mongoose.model("Event", eventSchema);
    await Event.deleteMany({});
    res.status(200).json({ message: "All records deleted successfully." });
  } catch (err) {
    console.error("Error deleting records:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting records." });
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
