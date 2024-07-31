import 'dotenv/config'

import express from "express";
import mongoose from "mongoose";
import { eventsRouter } from "./routes/events.js";
import cors from "cors";
import passport from "passport";
import session from 'express-session';

import "./strategies/google-strategy.js";

const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to db"));

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(session({
  secret: 'REPLACE_THIS', // Replace with a secure, unique key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set `secure: true` if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

const BASE_URL = "/api";

app.use(BASE_URL + "/events", eventsRouter);

app.get(BASE_URL + '/auth/google', passport.authenticate('google'));
app.get(BASE_URL + "/auth/google/callback", passport.authenticate('google',{ session: false }), (req,res)=>{
  const id = req.user._id;
  res.redirect(`https://detroiteventmap.com/?id=${id}`);
});

app.get(BASE_URL, (req, res) => {
  res.send("get out");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Express listening at http://0.0.0.0:${port}`);
});
