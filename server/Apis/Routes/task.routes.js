import express from "express";
import TasksController from "../Controller/task.controller.js";
const router = express.Router();


router.get("/api/tasks", TasksController.getAllTask);
router.post("/api/tasks", TasksController.createTask);
router.put("/api/tasks/:id", TasksController.updateTaskById);
router.delete("/api/tasks/:id", TasksController.deleteTaskById);

export default router;