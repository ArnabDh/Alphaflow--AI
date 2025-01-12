import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function ScatterPlot({ data = [] }) {
  const getChartData = () => {
    const points = data.map(task => ({
      x: task?.assignedSP || 0,
      y: task?.actualSP || 0,
    }));

    return {
      datasets: [
        {
          label: 'Story Points Correlation',
          data: points,
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          pointRadius: 8,
          pointHoverRadius: 10,
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
        text: 'Assigned vs Actual Story Points'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = context.raw;
            return `Assigned: ${point.x}, Actual: ${point.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Assigned Story Points'
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Actual Story Points'
        },
        beginAtZero: true,
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Scatter data={getChartData()} options={options} />
    </div>
  );
}

export default ScatterPlot; 