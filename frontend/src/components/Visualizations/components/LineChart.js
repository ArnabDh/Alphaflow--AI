import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data = [] }) {
  const getChartData = () => {
    const dateGroups = data.reduce((acc, task) => {
      const date = new Date(task?.dueDate).toLocaleDateString() || 'No Date';
      if (!acc[date]) acc[date] = { total: 0, completed: 0 };
      acc[date].total++;
      if (task?.status === 'done') acc[date].completed++;
      return acc;
    }, {});

    const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(a) - new Date(b));

    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Total Tasks',
          data: sortedDates.map(date => dateGroups[date].total),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          tension: 0.4,
        },
        {
          label: 'Completed Tasks',
          data: sortedDates.map(date => dateGroups[date].completed),
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          tension: 0.4,
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
        text: 'Task Completion Trends'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={getChartData()} options={options} />
    </div>
  );
}

export default LineChart; 