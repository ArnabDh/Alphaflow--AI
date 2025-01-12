export const getPriorityData = (tasks) => {
  const priorityCounts = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: ['P0', 'P1', 'P2', 'P3', 'P4'],
    datasets: [{
      label: 'Tasks by Priority',
      data: ['P0', 'P1', 'P2', 'P3', 'P4'].map(p => priorityCounts[p] || 0),
      backgroundColor: [
        '#dc2626', // red for P0
        '#ea580c', // orange for P1
        '#ca8a04', // yellow for P2
        '#16a34a', // green for P3
        '#22c55e'  // light green for P4
      ]
    }]
  };
};

export const getStackedData = (tasks) => {
  const statusByPriority = tasks.reduce((acc, task) => {
    if (!acc[task.priority]) {
      acc[task.priority] = { pending: 0, inProgress: 0, done: 0 };
    }
    acc[task.priority][task.status]++;
    return acc;
  }, {});

  return {
    labels: ['P0', 'P1', 'P2', 'P3', 'P4'],
    datasets: [
      {
        label: 'Pending',
        data: ['P0', 'P1', 'P2', 'P3', 'P4'].map(p => 
          statusByPriority[p]?.pending || 0
        ),
        backgroundColor: '#dc2626'
      },
      {
        label: 'In Progress',
        data: ['P0', 'P1', 'P2', 'P3', 'P4'].map(p => 
          statusByPriority[p]?.inProgress || 0
        ),
        backgroundColor: '#ca8a04'
      },
      {
        label: 'Done',
        data: ['P0', 'P1', 'P2', 'P3', 'P4'].map(p => 
          statusByPriority[p]?.done || 0
        ),
        backgroundColor: '#16a34a'
      }
    ]
  };
};

export const getTrendsData = (tasks) => {
  const dateGroups = tasks.reduce((acc, task) => {
    const date = task.dueDate.split('T')[0];
    if (!acc[date]) acc[date] = { total: 0, completed: 0 };
    acc[date].total++;
    if (task.status === 'done') acc[date].completed++;
    return acc;
  }, {});

  const sortedDates = Object.keys(dateGroups).sort();

  return {
    labels: sortedDates,
    datasets: [
      {
        label: 'Total Tasks',
        data: sortedDates.map(date => dateGroups[date].total),
        borderColor: '#2563eb',
        fill: false
      },
      {
        label: 'Completed Tasks',
        data: sortedDates.map(date => dateGroups[date].completed),
        borderColor: '#16a34a',
        fill: false
      }
    ]
  };
};

export const getSpComparisonData = (tasks) => {
  return {
    labels: tasks.map(task => task.taskName.substring(0, 10)),
    datasets: [
      {
        label: 'Assigned SP',
        data: tasks.map(task => task.assignedSP),
        backgroundColor: '#2563eb'
      },
      {
        label: 'Actual SP',
        data: tasks.map(task => task.actualSP),
        backgroundColor: '#ea580c'
      }
    ]
  };
};

export const getScatterData = (tasks) => {
  return {
    datasets: [{
      label: 'Story Points vs Duration',
      data: tasks.map(task => ({
        x: task.assignedSP,
        y: task.actualSP,
      })),
      backgroundColor: '#2563eb',
      pointRadius: 6
    }]
  };
}; 