import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// for development purposes
let SALT_ROUNDS = 11;
let TOKEN_KEY = "areallylonggoodkey";

// for production
if (`${process.env.NODE_ENV}` === "production") {
  SALT_ROUNDS = Number(`${process.env.SALT_ROUNDS}`);
  TOKEN_KEY = `${process.env.TOKEN_KEY}`;
}

// for JWT expiration
const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

export const signUp = async (req, res) => {
  try {
    console.log("signing up");
    const { username, email, password_digest } = req.body;
    const password_hashed = await bcrypt.hash(password_digest, SALT_ROUNDS);
    // console.log(password);
    const user = new User({
      username,
      email,
      password_digest: password_hashed,
      imgURL:
        "https://www.pngkey.com/png/detail/839-8393808_user-male-silhouette-comments-blank-person.png",
    });

    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      imgURL: user.imgURL,
      // projects: [],
      exp: parseInt(exp.getTime() / 1000),
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password_digest } = req.body;
    const user = await User.findOne({ email: email }).select(
      "username email password_digest"
    );
    // .populate("projects");
    if (await bcrypt.compare(password_digest, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        // projects: user.projects,
        exp: parseInt(exp.getTime() / 1000),
      };

      const token = jwt.sign(payload, TOKEN_KEY);
      res.status(201).json({
        token: token,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    if (payload) {
      res.json(payload);
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).send("Not Authorized");
  }
};

export const changePassword = async (req, res) => {};
