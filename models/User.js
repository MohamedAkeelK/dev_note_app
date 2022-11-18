import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true, unique: true },
    password_digest: { type: String, required: true, select: false },
    imgURL: { type: String },
  },

  { timestamps: true }
);
export default mongoose.model("users", User);
