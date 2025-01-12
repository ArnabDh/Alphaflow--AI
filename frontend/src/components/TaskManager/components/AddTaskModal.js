import React, { useState } from 'react';
import './AddTaskModal.css';

function AddTaskModal({ onClose, onTaskAdd }) {
  const initialTaskData = {
    department: '',
    taskName: '',
    priority: 'P2', // Default priority
    type: 'unplanned', // Default type
    assignedSP: '',
    actualSP: '',
    status: 'pending', // Default status
    dueDate: '',
    comment: '',
    completionDate: null
  };

  const [taskData, setTaskData] = useState(initialTaskData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.department.trim()) newErrors.department = 'Department is required';
    if (!taskData.taskName.trim()) newErrors.taskName = 'Task name is required';
    if (!taskData.assignedSP) newErrors.assignedSP = 'Assigned story points are required';
    if (!taskData.dueDate) newErrors.dueDate = 'Due date is required';
    
    // Validate due date is not in the past
    if (taskData.dueDate && new Date(taskData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...taskData,
          completionDate: taskData.status === 'done' ? new Date().toISOString() : null
        })
      });

      if (response.ok) {
        onTaskAdd();
        onClose();
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || 'Failed to add task' });
      }
    } catch (error) {
      setErrors({ submit: 'Error adding task. Please try again.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value,
      // Update completion date if status is changed to 'done'
      ...(name === 'status' && value === 'done' ? { completionDate: new Date().toISOString() } : {})
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department*</label>
              <input
                id="department"
                type="text"
                name="department"
                value={taskData.department}
                onChange={handleChange}
                className={errors.department ? 'error' : ''}
              />
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="taskName">Task Name*</label>
              <input
                id="taskName"
                type="text"
                name="taskName"
                value={taskData.taskName}
                onChange={handleChange}
                className={errors.taskName ? 'error' : ''}
              />
              {errors.taskName && <span className="error-message">{errors.taskName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className={`priority-${taskData.priority.toLowerCase()}`}
              >
                <option value="P0">P0 (Highest)</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="P4">P4 (Lowest)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={taskData.type}
                onChange={handleChange}
              >
                <option value="unplanned">Unplanned</option>
                <option value="planned">Planned</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assignedSP">Assigned Story Points*</label>
              <input
                id="assignedSP"
                type="number"
                name="assignedSP"
                min="0"
                value={taskData.assignedSP}
                onChange={handleChange}
                className={errors.assignedSP ? 'error' : ''}
              />
              {errors.assignedSP && <span className="error-message">{errors.assignedSP}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="actualSP">Actual Story Points</label>
              <input
                id="actualSP"
                type="number"
                name="actualSP"
                min="0"
                value={taskData.actualSP}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={taskData.status}
                onChange={handleChange}
                className={`status-${taskData.status}`}
              >
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date*</label>
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className={errors.dueDate ? 'error' : ''}
              />
              {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              value={taskData.comment}
              onChange={handleChange}
              rows="3"
            />
          </div>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal; 