import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const EventChart = ({ filteredEvents }) => {
  const [chartInstance, setChartInstance] = useState(null);

  // Generate chart data
  const generateChartData = () => {
    const labels = filteredEvents.map(event => event.timestamp);
    const data = filteredEvents.map(() => 1); // Each event counts as 1 per timestamp

    return {
      labels,
      datasets: [
        {
          label: 'File Events Over Time',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    if (filteredEvents.length > 0) {
      const ctx = document.getElementById("eventChart").getContext("2d");
      const chartData = generateChartData();

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Timestamp',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Event Count',
              },
              beginAtZero: true,
            },
          },
        },
      });

      setChartInstance(newChartInstance);
      return () => {
        newChartInstance.destroy(); // Cleanup chart instance on unmount or re-render
      };
    }
  }, [filteredEvents]);

  return (
    <div>
      <h3>Event Visualization</h3>
      <canvas id="eventChart" width="400" height="200"></canvas>
    </div>
  );
};

export default EventChart;
