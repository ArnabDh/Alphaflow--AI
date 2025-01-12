import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import './TaskSort.css';

function TaskSort({ sortConfig, onSort }) {
  const getSortIcon = (field) => {
    if (!sortConfig || sortConfig.field !== field) {
      return <FaSort className="sort-icon" />;
    }
    return sortConfig.direction === 'asc' ? 
      <FaSortUp className="sort-icon active" /> : 
      <FaSortDown className="sort-icon active" />;
  };

  const handleSort = (field) => {
    let direction = 'asc';
    
    if (sortConfig && sortConfig.field === field) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        field = null;
        direction = null;
      }
    }
    
    onSort({ field, direction });
  };

  return (
    <div className="task-sort">
      <div className="sort-header">
        <h3>Sort By</h3>
      </div>

      <div className="sort-options">
        <button 
          className={`sort-button ${sortConfig?.field === 'priority' ? 'active' : ''}`}
          onClick={() => handleSort('priority')}
        >
          Priority {getSortIcon('priority')}
        </button>

        <button 
          className={`sort-button ${sortConfig?.field === 'dueDate' ? 'active' : ''}`}
          onClick={() => handleSort('dueDate')}
        >
          Due Date {getSortIcon('dueDate')}
        </button>

        <button 
          className={`sort-button ${sortConfig?.field === 'status' ? 'active' : ''}`}
          onClick={() => handleSort('status')}
        >
          Status {getSortIcon('status')}
        </button>

        <button 
          className={`sort-button ${sortConfig?.field === 'assignedSP' ? 'active' : ''}`}
          onClick={() => handleSort('assignedSP')}
        >
          Story Points {getSortIcon('assignedSP')}
        </button>

        <button 
          className={`sort-button ${sortConfig?.field === 'department' ? 'active' : ''}`}
          onClick={() => handleSort('department')}
        >
          Department {getSortIcon('department')}
        </button>
      </div>
    </div>
  );
}

export default TaskSort; 