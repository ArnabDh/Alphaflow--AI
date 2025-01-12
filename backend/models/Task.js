const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    trim: true
  },
  taskName: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['P0', 'P1', 'P2', 'P3', 'P4'],
    default: 'P2'
  },
  type: {
    type: String,
    enum: ['planned', 'unplanned'],
    default: 'unplanned'
  },
  assignedSP: {
    type: Number,
    required: true,
    min: 0
  },
  actualSP: {
    type: Number,
    min: 0,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'inProgress', 'done'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
    trim: true
  },
  completionDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
taskSchema.index({ department: 1, status: 1, priority: 1 });

module.exports = mongoose.model('Task', taskSchema); 