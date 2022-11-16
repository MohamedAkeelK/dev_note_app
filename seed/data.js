import db from "../db/connection.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const insertData = async () => {
  // reset database
  await db.dropDatabase();

  const user1 = new User({
    username: "bruno",
    email: "root@super.gmail.com",
    password_digest: await bcrypt.hash("!a$ecureP@ssw0Rd55!", 11),
    imgURL: "https://randomuser.me/api/portraits/women/47.jpg",
    projects: [],
  });
  await user1.save();

  const user2 = new User({
    username: "bianca",
    email: "b.anca@super.gmail.com",
    password_digest: await bcrypt.hash("!$h0pp3R1", 11),
    imgURL: "https://randomuser.me/api/portraits/men/34.jpg",
    projects: [],
  });
  await user2.save();

  const user3 = new User({
    username: "enzo",
    email: "n.zo@super.gmail.com",
    password_digest: await bcrypt.hash("!$eller4Lif3", 11),
    imgURL: "https://randomuser.me/api/portraits/men/8.jpg",
    projects: [],
  });
  await user3.save();

  const user4 = new User({
    username: "kumi",
    email: "kumi@super.gmail.com",
    password_digest: await bcrypt.hash("L0v32!p4int", 11),
    imgURL: "https://randomuser.me/api/portraits/men/26.jpg",
    projects: [],
  });
  await user4.save();

  // projects data
  const project1 = new Project({
    name: "project 001",
    authors: ["bob", "ron"],
    imgURL:
      "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    deadline: "12/12/2022",
    codeSource: "https://github.com/MohamedAkeelK/dev_note_app",
    techStack: ["html", "css", "js", "nodejs"],
    tasks: ["build boilerplate", "build frontend", "deploy"],
    team: [user2, user3],
  });

  await project1.save();
  user1.projects.push(project1);

  await user1.save();
  await user1.populate("projects");

  const project2 = new Project({
    name: "Product 002",
    authors: ["mary", "ron"],
    imgURL:
      "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    deadline: "12/12/2022",
    codeSource: "https://github.com/MohamedAkeelK/dev_note_app",
    techStack: ["html", "css", "js", "nodejs"],
    tasks: ["build boilerplate", "build frontend", "deploy"],
    team: [user2, user3],
  });

  await project2.save();

  user2.projects.push(project2);
  await user2.save();

  const project3 = new Project({
    name: "project 003",
    authors: ["xen", "david"],
    imgURL:
      "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    deadline: "12/12/2022",
    codeSource: "https://github.com/MohamedAkeelK/dev_note_app",
    techStack: ["html", "css", "js", "nodejs"],
    tasks: ["build boilerplate", "build frontend", "deploy"],
    team: [user2, user3],
  });

  await project3.save();

  user3.projects.push(project3);
  await user3.save();

  const project4 = new Project({
    name: "project 004",
    authors: ["bob"],
    imgURL:
      "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    deadline: "12/12/2022",
    codeSource: "https://github.com/MohamedAkeelK/dev_note_app",
    techStack: ["html", "css", "js", "nodejs"],
    tasks: ["build boilerplate", "build frontend", "deploy"],
    team: [user2, user3],
  });

  await project4.save();

  user4.projects.push(project4);
  await user4.save();

  console.log("Created users & projects!");

  db.close();
};

insertData();
