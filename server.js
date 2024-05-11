import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { usersRouter } from "./routes/users.js";
import { eventsRouter } from "./routes/events.js";
import cors from "cors";

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to db"));

app.use(express.json({ limit: "50mb" }));
app.use(cors());

const BASE_URL = "/api";

app.use(BASE_URL + "/users", usersRouter);
app.use(BASE_URL + "/events", eventsRouter);

app.get(BASE_URL, (req, res) => {
  res.send("get out");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Express listening at http://0.0.0.0:${port}`);
});
