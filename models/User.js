import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    password_digest: { type: String, required: true, select: false },
    imgURL: { type: String },
    projects: [{ type: Schema.Types.ObjectId, ref: "projects" }],
  },

  { timestamps: true }
);
export default mongoose.model("users", User);
