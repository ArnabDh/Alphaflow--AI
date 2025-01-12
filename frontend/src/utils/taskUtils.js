export const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const calculateOverdue = (dueDate, status) => {
  if (status === 'done') return false;
  return new Date(dueDate) < new Date();
};

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    if (filters.priority && task.priority !== filters.priority) return false;
    if (filters.status && task.status !== filters.status) return false;
    if (filters.type && task.type !== filters.type) return false;
    if (filters.department && !task.department.toLowerCase().includes(filters.department.toLowerCase())) return false;
    if (filters.dueDate && formatDate(task.dueDate) !== formatDate(filters.dueDate)) return false;
    return true;
  });
};

export const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm) return tasks;
  const term = searchTerm.toLowerCase();
  return tasks.filter(task => 
    task.taskName.toLowerCase().includes(term) ||
    task.department.toLowerCase().includes(term)
  );
};

export const sortTasks = (tasks, sortField, sortDirection) => {
  return [...tasks].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'priority':
        comparison = a.priority.localeCompare(b.priority);
        break;
      case 'dueDate':
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
        break;
      case 'department':
        comparison = a.department.localeCompare(b.department);
        break;
      default:
        comparison = 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });
}; 