import Project from "../models/Project.js";
// import User from "../models/User.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (project) {
      return res.json(project);
    }
    res.status(404).json({ message: "Product not found!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await Project.findOne({ name: req.body.name })
      .select("postedBy")
      .populate("users");
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  // console.log(req.body.username);
  const projectAuthor = req.body.username;
  const theproject = await Project.findById(id);
  if (theproject === projectAuthor) {
    try {
      const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(project);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  } else {
    console.log("You can delete only your post!");
    res.status(500).json({ error: "You can delete only your post!" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const projectAuthor = req.body.username;
  const theproject = await Project.findById(id);
  if (theproject === projectAuthor) {
    try {
      const deleted = await Project.findByIdAndDelete(id);
      if (deleted) {
        console.log("project deleted");
        return res.status(200).send("Project deleted");
      }
      throw new Error("Project not found");
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    console.log("You can delete only your post!");
    res.status(500).json({ error: "You can delete only your post!" });
  }
};
