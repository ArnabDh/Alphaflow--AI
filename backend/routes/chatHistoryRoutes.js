const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');

// Get chat history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const history = await ChatHistory.findOne({ userId: req.params.userId });
    res.json(history?.messages || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history' });
  }
});

// Save message to history
router.post('/history/:userId', async (req, res) => {
  try {
    const { text, isBot } = req.body;
    const history = await ChatHistory.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $push: { messages: { text, isBot } },
        $set: { lastInteraction: new Date() }
      },
      { upsert: true, new: true }
    );
    res.json(history.messages);
  } catch (error) {
    res.status(500).json({ message: 'Error saving chat message' });
  }
});

// Clear chat history
router.delete('/history/:userId', async (req, res) => {
  try {
    await ChatHistory.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { messages: [] } }
    );
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing chat history' });
  }
});

module.exports = router; 