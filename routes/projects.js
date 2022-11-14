import { Router } from "express";
import * as controllers from "../controllers/projects.js";
import restrict from "../helpers/restrict.js";

const router = Router();

router.get("/", controllers.getProjects);
router.get("/:id", controllers.getProject);
router.post("/", restrict, controllers.createProject);
router.put("/:id", restrict, controllers.updateProject);
router.delete("/:id", restrict, controllers.deleteProject);

export default router;
