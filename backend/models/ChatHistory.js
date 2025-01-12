const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isBot: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  messages: [chatMessageSchema],
  lastInteraction: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema); 