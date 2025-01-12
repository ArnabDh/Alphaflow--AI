import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import TaskTable from './components/TaskTable';
import TaskFilters from './components/TaskFilters';
import './TaskManager.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from your backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data);
        setFilteredTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTasks(tasks);
      return;
    }

    const filtered = tasks.filter(task =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
    setCurrentPage(1);
  };

  // Handle filters
  const handleFilter = (type, value) => {
    try {
      let filtered = [...tasks];

      switch(type) {
        case 'status':
          filtered = value === 'all' 
            ? tasks 
            : tasks.filter(task => task.status.toLowerCase() === value.toLowerCase());
          break;
        case 'priority':
          filtered = value === 'all'
            ? tasks
            : tasks.filter(task => task.priority === value);
          break;
        case 'type':
          filtered = value === 'all'
            ? tasks
            : tasks.filter(task => task.type === value);
          break;
        default:
          filtered = tasks;
      }

      setFilteredTasks(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error('Filter error:', error);
      setFilteredTasks(tasks);
    }
  };

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div className="task-manager">
      <div className="task-header">
        <div className="header-left">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="header-right">
          <button className="edit-button">Edit</button>
          <TaskFilters onFilter={handleFilter} />
          <button className="add-task-button">Add Task</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <>
          <TaskTable 
            tasks={currentTasks}
            startIndex={indexOfFirstTask}
          />
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-number">{currentPage}</span>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(prev => 
                indexOfLastTask >= filteredTasks.length ? prev : prev + 1
              )}
              disabled={indexOfLastTask >= filteredTasks.length}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskManager; 