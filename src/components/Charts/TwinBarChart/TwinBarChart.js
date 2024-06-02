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
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

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

const TwinBarChart = ({ sortType, dataPerformance }) => {
  const { t } = useTranslation();

  const [filteredData, setFilteredData] = useState(null);

  // const array0 =
  //   dataPerformance && sortType === 'month' ? dataPerformance.map((item) => (new Date()).getDate(item.date)) : [];
  const array1 = dataPerformance ? dataPerformance.map((item) => item.totalAccess) : [];
  const array2 = dataPerformance ? dataPerformance.map((item) => item.totalOrder) : [];

  // console.log(array0);
  console.log(array1);
  console.log(array2);
  const dataSets = {
    week: {
      labels: ['Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Mon'],
      values1: array1,
      values2: array2,
    },
    month: {
      labels: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      values1: array1,
      values2: array2,
    },
    quarter: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values1: array1,
      values2: array2,
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values1: array1,
      values2: array2,
    },
  };



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

  console.log(filteredData);

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
                label: t('users.desc04'),
                backgroundColor: 'rgba(14, 165, 233, 0.5)',
                data: filteredData.values1,
              },
              {
                type: 'bar',
                label: t('users.desc05'),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                data: filteredData.values2,
              },
              {
                type: 'line',
                label: t('users.desc06'),
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
          height={200}
        />
      )}
    </div>
  );
};

export default TwinBarChart;
