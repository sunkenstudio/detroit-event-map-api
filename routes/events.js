import { Router } from "express";
import { Events } from "../models/events.js";

const router = Router();
// Get all
router.get("/", async (req, res) => {
  try {
    const events = await Events.find();
    res.status(200).json(events);
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
router.post("/", async (req, res) => {
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
  const event = new Events({
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
  });

  try {
    const newEvent = await event.save();
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.patch("/:id", getEvent, async (req, res) => {
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
  try {
    await res.event.deleteOne();
    res.json({ message: "event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getEvent(req, res, next) {
  let event;
  try {
    event = await Events.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  res.event = event;
  next();
}

export const eventsRouter = router;
