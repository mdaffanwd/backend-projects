import Task from "../models/taskModel";

// getTasks function
export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// createTask function
export async function createTask(req, res) {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is required" });

      const task = await Task.create({ title, user: req.user._id });
      res.status(201).json(task);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// updateTask function
export async function updateTask(req, res) {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: "Not authorized" });
  }

  task.completed = !task.completed;

  await task.save();
  res.json(task);
}

// deleteTask function
export async function deleteTask(req, res) {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: "Not authorized" });
  }

  await task.remove();
  res.json({ message: "Task removed" });
}
