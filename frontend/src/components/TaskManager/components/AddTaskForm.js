import React, { useState } from 'react';
import './AddTaskForm.css';

function AddTaskForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    department: '',
    taskName: '',
    priority: 'P2',
    type: 'planned',
    assignedSP: '',
    actualSP: '0',
    status: 'pending',
    dueDate: '',
    comment: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.taskName) newErrors.taskName = 'Task name is required';
    if (!formData.assignedSP) newErrors.assignedSP = 'Assigned SP is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <div className="form-group">
        <label>Department*</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={errors.department ? 'error' : ''}
        />
        {errors.department && <span className="error-text">{errors.department}</span>}
      </div>

      <div className="form-group">
        <label>Task Name*</label>
        <input
          type="text"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
          className={errors.taskName ? 'error' : ''}
        />
        {errors.taskName && <span className="error-text">{errors.taskName}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="P0">P0 (Highest)</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="P4">P4 (Lowest)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="planned">Planned</option>
            <option value="unplanned">Unplanned</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Assigned SP*</label>
          <input
            type="number"
            name="assignedSP"
            value={formData.assignedSP}
            onChange={handleChange}
            min="0"
            className={errors.assignedSP ? 'error' : ''}
          />
          {errors.assignedSP && <span className="error-text">{errors.assignedSP}</span>}
        </div>

        <div className="form-group">
          <label>Due Date*</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={errors.dueDate ? 'error' : ''}
          />
          {errors.dueDate && <span className="error-text">{errors.dueDate}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Comment</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm; 