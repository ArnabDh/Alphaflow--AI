import React, { useState, useEffect } from 'react';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import ScatterPlot from './components/ScatterPlot';
import GroupChart from './components/GroupChart';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaArrowUp, FaArrowDown, FaDownload } from 'react-icons/fa';
import './Visualizations.css';

function Visualizations() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [charts, setCharts] = useState([
    { id: 'pie', component: PieChart, title: 'Priority Distribution' },
    { id: 'line', component: LineChart, title: 'Task Completion Trends' },
    { id: 'bar', component: BarChart, title: 'Story Points Comparison' },
    { id: 'scatter', component: ScatterPlot, title: 'Task Analysis' },
    { id: 'group', component: GroupChart, title: 'Department Distribution' }
  ]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/tasks');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        setTasks(data || []);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="loading">Loading charts...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!tasks?.length) return <div className="no-data">No tasks available</div>;

  const moveChart = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= charts.length) return;
    const updatedCharts = [...charts];
    const [movedChart] = updatedCharts.splice(fromIndex, 1);
    updatedCharts.splice(toIndex, 0, movedChart);
    setCharts(updatedCharts);
  };

  const exportToPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const chartsContainer = document.querySelector('.charts-container');

    try {
      const canvas = await html2canvas(chartsContainer);
      const imgData = canvas.toDataURL('image/png');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('task-analytics.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="visualizations">
      <div className="visualizations-header">
        <h2>Task Analytics</h2>
        <button className="export-button" onClick={exportToPDF}>
          <FaDownload /> Export to PDF
        </button>
      </div>

      <div className="charts-container">
        {charts.map((chart, index) => (
          <div key={chart.id} className="chart-wrapper">
            <div className="chart-header">
              <h3>{chart.title}</h3>
              <div className="chart-controls">
                {index > 0 && (
                  <button 
                    className="move-button"
                    onClick={() => moveChart(index, index - 1)}
                    title="Move Up"
                  >
                    <FaArrowUp />
                  </button>
                )}
                {index < charts.length - 1 && (
                  <button 
                    className="move-button"
                    onClick={() => moveChart(index, index + 1)}
                    title="Move Down"
                  >
                    <FaArrowDown />
                  </button>
                )}
              </div>
            </div>
            <div className="chart-content">
              <chart.component data={tasks} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visualizations; 