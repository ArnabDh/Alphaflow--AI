const mongoose = require('mongoose');
const Task = require('../models/Task');
require('dotenv').config();

const sampleTasks = [
  {
    department: 'Engineering',
    taskName: 'Implement Login Feature',
    priority: 'P1',
    type: 'planned',
    assignedSP: 5,
    actualSP: 6,
    status: 'done',
    dueDate: new Date('2024-04-20'),
    comment: 'Initial implementation completed',
    completionDate: new Date('2024-04-18')
  },
  {
    department: 'Design',
    taskName: 'Create Homepage Mockup',
    priority: 'P2',
    type: 'planned',
    assignedSP: 3,
    actualSP: 3,
    status: 'inProgress',
    dueDate: new Date('2024-04-25'),
    comment: 'Working on final revisions'
  },
  // Add more sample tasks as needed
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Cleared existing tasks');

    // Insert sample tasks
    await Task.insertMany(sampleTasks);
    console.log('Sample tasks inserted successfully');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 