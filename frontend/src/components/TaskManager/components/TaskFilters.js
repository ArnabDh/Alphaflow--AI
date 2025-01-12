import React from 'react';
import './TaskFilters.css';

function TaskFilters({ onFilter }) {
  const handleStatusChange = (e) => {
    onFilter('status', e.target.value);
  };

  const handlePriorityChange = (e) => {
    onFilter('priority', e.target.value);
  };

  const handleTypeChange = (e) => {
    onFilter('type', e.target.value);
  };

  return (
    <div className="filters-container">
      <select onChange={handleStatusChange} className="filter-select">
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="inProgress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select onChange={handlePriorityChange} className="filter-select">
        <option value="all">All Priority</option>
        <option value="P0">P0</option>
        <option value="P1">P1</option>
        <option value="P2">P2</option>
        <option value="P3">P3</option>
        <option value="P4">P4</option>
      </select>

      <select onChange={handleTypeChange} className="filter-select">
        <option value="all">All Types</option>
        <option value="planned">Planned</option>
        <option value="unplanned">Unplanned</option>
      </select>
    </div>
  );
}

export default TaskFilters; 