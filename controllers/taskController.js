import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Fetching tasks failed', error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = new Task({ ...req.body, userId: req.userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Creating task failed', error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Updating task failed', error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Deleting task failed', error: err.message });
  }
};
