const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('../models/Task');

// Suppress deprecation warnings
process.removeAllListeners('warning');

dotenv.config();

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
  }
];

async function seedDatabase() {
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected successfully to MongoDB');
    
    // Get the database name
    const dbName = mongoose.connection.db.databaseName;
    console.log('Connected to database:', dbName);

    // Clear existing tasks
    console.log('Clearing existing tasks...');
    const deleteResult = await Task.deleteMany({});
    console.log('Cleared tasks:', deleteResult);

    // Insert new tasks
    console.log('Inserting sample tasks...');
    const insertResult = await Task.insertMany(sampleTasks);
    console.log('Inserted tasks:', insertResult);

    // Verify the insertion
    const count = await Task.countDocuments();
    console.log('Total tasks in database:', count);

    console.log('Seeding completed successfully!');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error details:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase().catch(err => {
  console.error('Failed to seed database:', err);
  process.exit(1);
}); 