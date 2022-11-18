import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Project = new Schema(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "users" },
    username: {type: String, required: true},
    name: { type: String, required: true },
    authors: [{ type: String }],
    imgURL: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String },
    codeSource: { type: String },
    techStack: [],
    tasks: [],
    team: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

export default mongoose.model("projects", Project);
