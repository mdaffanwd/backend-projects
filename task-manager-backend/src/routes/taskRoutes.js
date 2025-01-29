import express from 'express'
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";
import taskRoutes from "./routes/taskRoutes.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(protect, getTasks).post(protect, createTask);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


export default router;