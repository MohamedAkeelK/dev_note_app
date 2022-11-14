import { Router } from "express";
import projectsRoutes from "./projects.js";
import usersRoutes from "./users.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/users", usersRoutes);
router.use("/projects", projectsRoutes);

export default router;
