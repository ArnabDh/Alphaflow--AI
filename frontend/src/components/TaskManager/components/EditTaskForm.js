import React, { useState, useEffect } from 'react';
import './EditTaskForm.css';

function EditTaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    department: '',
    taskName: '',
    priority: 'P2',
    type: 'planned',
    assignedSP: '',
    actualSP: '',
    status: 'pending',
    dueDate: '',
    comment: '',
    completionDate: null
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        department: task.department,
        taskName: task.taskName,
        priority: task.priority,
        type: task.type,
        assignedSP: task.assignedSP,
        actualSP: task.actualSP || '',
        status: task.status,
        dueDate: task.dueDate.split('T')[0],
        comment: task.comment || '',
        completionDate: task.completionDate ? task.completionDate.split('T')[0] : null
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.taskName) newErrors.taskName = 'Task name is required';
    if (!formData.assignedSP) newErrors.assignedSP = 'Assigned SP is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (formData.status === 'done' && !formData.completionDate) {
      newErrors.completionDate = 'Completion date is required for completed tasks';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, id: task._id });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'status' && value === 'done' && !formData.completionDate 
        ? { completionDate: new Date().toISOString().split('T')[0] }
        : {})
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="edit-task-form">
      <div className="form-row">
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
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <select 
            name="priority" 
            value={formData.priority} 
            onChange={handleChange}
            className={`priority-${formData.priority.toLowerCase()}`}
          >
            <option value="P0">P0 (Highest)</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="P4">P4 (Lowest)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            className={`status-${formData.status}`}
          >
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="planned">Planned</option>
            <option value="unplanned">Unplanned</option>
          </select>
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
          <label>Actual SP</label>
          <input
            type="number"
            name="actualSP"
            value={formData.actualSP}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      {formData.status === 'done' && (
        <div className="form-group">
          <label>Completion Date*</label>
          <input
            type="date"
            name="completionDate"
            value={formData.completionDate || ''}
            onChange={handleChange}
            className={errors.completionDate ? 'error' : ''}
          />
          {errors.completionDate && <span className="error-text">{errors.completionDate}</span>}
        </div>
      )}

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
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm; 