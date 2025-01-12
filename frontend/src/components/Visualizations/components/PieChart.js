import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

function PieChart({ data = [] }) {
  const getPriorityData = () => {
    const priorityCounts = {
      'P0': 0, 'P1': 0, 'P2': 0, 'P3': 0, 'P4': 0
    };

    data.forEach(task => {
      if (task?.priority in priorityCounts) {
        priorityCounts[task.priority]++;
      }
    });

    return Object.values(priorityCounts);
  };

  const chartData = {
    labels: ['P0', 'P1', 'P2', 'P3', 'P4'],
    datasets: [
      {
        data: getPriorityData(),
        backgroundColor: [
          '#dc2626',
          '#ea580c',
          '#ca8a04',
          '#16a34a',
          '#22c55e',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Priority Distribution'
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default PieChart; 