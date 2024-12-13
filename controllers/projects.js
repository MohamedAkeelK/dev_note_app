import Project from "../models/Project.js";
// import restrict from "../helpers/restrict.js";
import User from "../models/User.js";

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
    // Check if a project with the same name already exists
    const existingProject = await Project.findOne({ name: req.body.name });
    if (existingProject) {
      return res
        .status(400)
        .json({ error: "Project with this name already exists" });
    }

    // Create a new project
    const projectData = { ...req.body, postedBy: req.user.id };
    const project = new Project(projectData);
    await project.save();

    // Find the user and update their projects array
    const userId = req.user.id; // Assumes `req.user.id` contains the logged-in user's ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.allProjects.push(project._id); // Add the project ID to the user's projects array
    await user.save();

    // Respond with the created project
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params; // The project ID to update
    const userId = req.user.id; // The logged-in user's ID

    // Find the project and populate the `postedBy` field
    const project = await Project.findById(id).populate("postedBy");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the logged-in user is the owner of the project
    if (!project.postedBy || !project.postedBy.equals(userId)) {
      return res
        .status(403)
        .json({ error: "You can update only your project" });
    }

    // Update the project with the new data
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation rules are applied
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// export const updateProject = async (req, res) => {
//   const { id } = req.params;
//   const theproject = await Project.findById(id);
//   if (theproject.username === theproject.authors[0]) {
//     try {
//       const project = await Project.findByIdAndUpdate(id, req.body, {
//         new: true,
//       });
//       res.status(200).json(project);
//     } catch (err) {
//       console.log(err);
//       res.status(500);
//     }
//   } else {
//     console.log("You can edit only your project!");
//     res.status(500).json({ error: "You can edit only your project!" });
//   }
// };

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params; // The project ID
    const userId = req.user.id; // The logged-in user's ID

    // Find the project and populate the `postedBy` field
    const project = await Project.findById(id).populate("postedBy");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the logged-in user is the owner of the project
    if (!project.postedBy || !project.postedBy.equals(userId)) {
      return res
        .status(403)
        .json({ error: "You can delete only your project" });
    }

    // Delete the project
    await Project.findByIdAndDelete(id);

    // Optionally, remove the project from the user's projects array
    await User.findByIdAndUpdate(userId, { $pull: { projects: id } });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
