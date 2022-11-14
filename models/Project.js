import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Project = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String },
    codeSource: { type: String },
    techStack: [],
    tasks: [],
    team: [{ type: Schema.Types.ObjectId, ref: "users" }],
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export default mongoose.model("projects", Project);
