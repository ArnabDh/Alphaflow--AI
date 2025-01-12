const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  const lowerMessage = message.toLowerCase();

  try {
    // Handle task-related queries
    if (lowerMessage.includes('overdue tasks')) {
      const overdueTasks = await Task.find({
        dueDate: { $lt: new Date() },
        status: { $ne: 'done' }
      });
      return res.json({
        response: `There are ${overdueTasks.length} overdue tasks. Would you like me to list them?`
      });
    }

    if (lowerMessage.includes('high priority')) {
      const highPriorityTasks = await Task.find({
        priority: { $in: ['P0', 'P1'] },
        status: { $ne: 'done' }
      });
      return res.json({
        response: `There are ${highPriorityTasks.length} high priority tasks (P0 and P1) that need attention.`
      });
    }

    if (lowerMessage.includes('task status') || lowerMessage.includes('progress')) {
      const stats = await Task.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);
      const statusReport = stats.map(s => `${s._id}: ${s.count}`).join(', ');
      return res.json({
        response: `Current task status: ${statusReport}`
      });
    }

    // Default responses for common queries
    if (lowerMessage.includes('help')) {
      return res.json({
        response: `I can help you with:
- Checking overdue tasks
- Finding high priority tasks
- Getting task status reports
- Creating new tasks
- Updating task status
Just ask me what you'd like to know!`
      });
    }

    // Default response
    return res.json({
      response: "I'm here to help with task management. You can ask me about overdue tasks, high priority items, or task status. How can I assist you?"
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      response: "I'm sorry, I encountered an error while processing your request."
    });
  }
});

module.exports = router; 