import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const dataSets = {
  week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values1: [400, 300, 320, 106, 783, 111, 133],
    values2: [100, 200, 120, 46, 13, 41, 33],
  },
  month: {
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
    values1: [
      400, 300, 320, 106, 783, 111, 133, 400, 300, 320, 106, 783, 111, 133, 400, 300, 320, 106, 783, 111, 133, 400, 300,
      320, 106, 783, 111, 133, 123, 123, 123,
    ],
    values2: [
      200, 200, 120, 16, 383, 101, 103, 300, 200, 120, 26, 783, 111, 133, 400, 300, 320, 106, 783, 111, 133, 400, 300,
      320, 106, 783, 111, 133, 123, 123, 123,
    ],
  },
  quarter: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values1: [800, 400, 350, 500],
    values2: [500, 600, 250, 400],
  },
  year: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values1: [1000, 1200, 1900, 900, 1000, 2000, 1500, 1000, 1200, 1900, 900, 1000],
    values2: [800, 400, 350, 500, 800, 400, 350, 500, 800, 400, 350, 500],
  },
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  elements: {
    line: {
      fill: true,
    },
  },
};

const TwinBarChart = ({ sortType }) => {
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const filtered = dataSets[sortType.type];
    if (filtered) {
      const calculatedValues = filtered.values2.map((value2, index) => {
        const value1 = filtered.values1[index];
        return (value2 / value1) * 100;
      });
      const newData = { ...filtered, values: calculatedValues };
      setFilteredData(newData);
    }
  }, [sortType.type]);

  return (
    <div>
      {filteredData && (
        <Bar
          style={{ width: '100%' }}
          data={{
            labels: filteredData.labels,
            datasets: [
              {
                type: 'bar',
                label: 'Số lượt truy cập',
                backgroundColor: 'rgba(14, 165, 233, 0.5)',
                data: filteredData.values1,
              },
              {
                type: 'bar',
                label: 'Số đơn đặt hàng',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                data: filteredData.values2,
              },
              {
                type: 'line',
                label: 'Tỉ lệ đặt hàng',
                backgroundColor: 'rgba(145, 99, 132, 1)',
                data: filteredData.values,
                tension: 0.4,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: { display: true },
              title: {
                display: false,
                text: 'Sales Data Visualization',
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default TwinBarChart;
