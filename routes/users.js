import { Router } from "express";
import { Users } from "../models/users.js";
import { Events } from "../models/events.js";

const router = Router();

// Create one
router.post("/", async (req, res) => {
  const { token, email } = req.body;
  const authToken = process.env.AUTH_TOKEN;
  if (token !== authToken) {
    res
      .status(401)
      .json({ message: "Please cut that shit out. I have no money." });
  }
  const existingUser = await Users.findOne({email});
  if(existingUser){
    const userEvents = await Events.find({user_id: existingUser._id});
    console.log(userEvents.length);
    res.status(200).send({ message: "success", events: userEvents });
  }
  else{
    try {
      await Users.create({email});
      res.status(201).send({ message: "user created" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

export const usersRouter = router;
