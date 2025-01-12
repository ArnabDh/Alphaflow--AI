import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GroupChart({ data = [] }) {
  const getChartData = () => {
    const departmentData = data.reduce((acc, task) => {
      const dept = task?.department || 'Unassigned';
      if (!acc[dept]) {
        acc[dept] = { total: 0, completed: 0, inProgress: 0, pending: 0 };
      }
      acc[dept].total++;
      
      switch(task?.status) {
        case 'done':
          acc[dept].completed++;
          break;
        case 'inProgress':
          acc[dept].inProgress++;
          break;
        default:
          acc[dept].pending++;
      }
      return acc;
    }, {});

    const departments = Object.keys(departmentData);

    return {
      labels: departments,
      datasets: [
        {
          label: 'Completed',
          data: departments.map(dept => departmentData[dept].completed),
          backgroundColor: 'rgba(16, 185, 129, 0.6)',
        },
        {
          label: 'In Progress',
          data: departments.map(dept => departmentData[dept].inProgress),
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
        },
        {
          label: 'Pending',
          data: departments.map(dept => departmentData[dept].pending),
          backgroundColor: 'rgba(239, 68, 68, 0.6)',
        }
      ]
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tasks by Department'
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={getChartData()} options={options} />
    </div>
  );
}

export default GroupChart; 