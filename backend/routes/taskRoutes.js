const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { calculateAverageCompletionTime } = require('../utils/taskUtils');

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new task
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update task
router.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete task
router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get task analytics
router.get('/tasks/analytics', async (req, res) => {
  try {
    const tasks = await Task.find();
    
    // Priority Distribution
    const priorityDistribution = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    // Status Distribution
    const statusDistribution = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    // Department Distribution
    const departmentDistribution = tasks.reduce((acc, task) => {
      acc[task.department] = (acc[task.department] || 0) + 1;
      return acc;
    }, {});

    // Story Points Analysis
    const spAnalysis = tasks.reduce((acc, task) => {
      acc.totalAssigned += task.assignedSP || 0;
      acc.totalActual += task.actualSP || 0;
      return acc;
    }, { totalAssigned: 0, totalActual: 0 });

    // Task Completion Trends
    const completionTrends = tasks
      .filter(task => task.completionDate)
      .reduce((acc, task) => {
        const date = new Date(task.completionDate).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

    const analytics = {
      totalTasks: tasks.length,
      priorityDistribution,
      statusDistribution,
      departmentDistribution,
      spAnalysis,
      completionTrends,
      averageCompletionTime: calculateAverageCompletionTime(tasks)
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 