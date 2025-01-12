import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import './FilterMenu.css';

function FilterMenu({ onFilter }) {
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    type: '',
    department: '',
    overdue: false
  });

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="filter-menu">
      <button className="filter-button">
        <FaFilter /> Filters
      </button>
      <div className="filter-content">
        <div className="filter-group">
          <label>Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">All</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="P4">P4</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All</option>
            <option value="planned">Planned</option>
            <option value="unplanned">Unplanned</option>
          </select>
        </div>

        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={filters.overdue}
              onChange={(e) => handleFilterChange('overdue', e.target.checked)}
            />
            Show Overdue Only
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterMenu; 