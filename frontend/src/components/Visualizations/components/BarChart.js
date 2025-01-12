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

function BarChart({ data = [] }) {
  const getChartData = () => {
    const tasks = data.slice(0, 10);
    return {
      labels: tasks.map(task => task?.taskName || 'Unnamed Task'),
      datasets: [
        {
          label: 'Assigned SP',
          data: tasks.map(task => task?.assignedSP || 0),
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
        },
        {
          label: 'Actual SP',
          data: tasks.map(task => task?.actualSP || 0),
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
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
        text: 'Story Points Comparison'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={getChartData()} options={options} />
    </div>
  );
}

export default BarChart; 