import React from 'react';
import './TaskTable.css';
import { format } from 'date-fns';

function TaskTable({ tasks }) {
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
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
            return (
              <tr key={task._id || index}>
                <td>{index + 1}</td>
                <td>{task.department}</td>
                <td>{task.taskName}</td>
                <td className={`priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </td>
                <td>{task.type}</td>
                <td>{task.assignedSP}</td>
                <td>{task.actualSP}</td>
                <td className={`status-${task.status.toLowerCase()}`}>
                  {task.status}
                </td>
                <td className={isOverdue ? 'overdue' : ''}>
                  {format(new Date(task.dueDate), 'dd-MM-yyyy')}
                </td>
                <td>{task.comment}</td>
                <td>{isOverdue ? 'Yes' : 'No'}</td>
                <td>
                  {task.completionDate 
                    ? format(new Date(task.completionDate), 'dd-MM-yyyy')
                    : '-'
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable; 