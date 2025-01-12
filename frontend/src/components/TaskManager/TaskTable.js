import React from 'react';
import { format } from 'date-fns';
import './TaskTable.css';

function TaskTable({ tasks, isEditing, onTaskUpdate }) {
  const getPriorityClass = (priority) => `priority-${priority.toLowerCase()}`;
  const getStatusClass = (status) => `status-${status.toLowerCase()}`;

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
          method: 'DELETE'
        });
        onTaskUpdate();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const getDueDateClass = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    
    if (isOverdue(dueDate)) return 'overdue';
    if (due.toDateString() === today.toDateString()) return 'due-today';
    return '';
  };

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Assigned SP</th>
            <th>Actual SP</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Comment</th>
            <th>Overdue</th>
            <th>Completion Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <td>{index + 1}</td>
              <td>{task.department}</td>
              <td>{task.taskName}</td>
              <td className={getPriorityClass(task.priority)}>
                {task.priority}
              </td>
              <td>{task.type}</td>
              <td>{task.assignedSP}</td>
              <td>{task.actualSP}</td>
              <td className={getStatusClass(task.status)}>
                {task.status}
              </td>
              <td className={getDueDateClass(task.dueDate)}>
                {format(new Date(task.dueDate), 'dd-MM-yyyy')}
              </td>
              <td>{task.comment}</td>
              <td>{isOverdue(task.dueDate) ? 'Yes' : 'No'}</td>
              <td>
                {task.completionDate 
                  ? format(new Date(task.completionDate), 'dd-MM-yyyy')
                  : '-'}
              </td>
              <td>
                {isEditing && (
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(task._id)}
                  >
                    🗑️
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable; 