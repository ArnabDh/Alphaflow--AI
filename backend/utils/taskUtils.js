const calculateAverageCompletionTime = (tasks) => {
  const completedTasks = tasks.filter(task => 
    task.status === 'done' && task.completionDate
  );

  if (completedTasks.length === 0) return 0;

  const totalTime = completedTasks.reduce((sum, task) => {
    const completionTime = new Date(task.completionDate) - new Date(task.createdAt);
    return sum + completionTime;
  }, 0);

  return Math.round(totalTime / completedTasks.length / (1000 * 60 * 60 * 24)); // Convert to days
};

const getTaskPriority = (dueDate, status) => {
  if (status === 'done') return 'P4';
  
  const today = new Date();
  const due = new Date(dueDate);
  const daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (daysUntilDue < 0) return 'P0';
  if (daysUntilDue === 0) return 'P1';
  if (daysUntilDue <= 2) return 'P2';
  if (daysUntilDue <= 5) return 'P3';
  return 'P4';
};

const validateTask = (task) => {
  const errors = [];

  if (!task.department) errors.push('Department is required');
  if (!task.taskName) errors.push('Task name is required');
  if (!task.assignedSP || task.assignedSP < 0) errors.push('Invalid assigned story points');
  if (task.actualSP < 0) errors.push('Invalid actual story points');
  if (!task.dueDate) errors.push('Due date is required');

  return errors;
};

module.exports = {
  calculateAverageCompletionTime,
  getTaskPriority,
  validateTask
}; 