import { Router } from "express";
import { Users } from "../models/users.js";
import { Encrypt } from "../utils/bcrypt.js";

const router = Router();
// Get all
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get one
router.get("/:id", getUser, async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const salt = process.env.BCRYPT_SALT;
  const password_hash = await Encrypt.cryptPassword(password, salt);
  const user = new Users({
    username,
    email,
    password_hash,
  });

  try {
    const newUser = await user.save();
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.patch("/:id", getUser, async (req, res) => {
  const { name, rank } = req.body;
  if (name) {
    res.user.name = name;
  }
  if (rank) {
    res.user.rank = rank;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete one
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "user deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/auth", getUserByEmail, async (req, res) => {
  const { user } = res;
  const hash = user.password_hash;
  try {
    const isAuth = await Encrypt.comparePassword(req.body.password, hash);
    if (isAuth) {
      return res.status(200).json({
        message: "success",
        user: {
          username: user.username,
          rank: user.rank,
          story_progress: user.story_progress,
          items: user.items,
        },
      });
    } else {
      return res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

async function getUserByEmail(req, res, next) {
  const { email } = req.body;
  try {
    Users.findOne({ email: email })
      .then((record) => {
        if (!record) {
          res.status(404).json({ message: "cannot find user" });
        } else {
          res.user = record;
          next();
        }
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

async function getUser(req, res, next) {
  let user;
  try {
    user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  res.user = user;
  next();
}

export const usersRouter = router;
