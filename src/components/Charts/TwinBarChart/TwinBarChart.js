import React from 'react';
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

const TwinBarChart = ({ sortType, dataPerformance }) => {
  const { t } = useTranslation();

  const array0 =
    dataPerformance && sortType.type === 'month' ? dataPerformance.map((item) => new Date(item.date).getDate()) : [];
  const array1 = dataPerformance ? dataPerformance.map((item) => item.totalAccess) : [];
  const array2 = dataPerformance ? dataPerformance.map((item) => item.totalOrder) : [];
  const array3 = array2.map((value2, index) => {
    const value1 = array1[index];
    if (value1 === 0 || value2 === 0) {
      return 0;
    }
    return (value2 / value1) * 100;
  });

  const dataSets = {
    week: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      values1: array1,
      values2: array2,
      values3: array3,
    },
    month: {
      labels: array0,
      values1: array1,
      values2: array2,
      values3: array3,
    },
    quarter: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values1: array1,
      values2: array2,
      values3: array3,
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values1: array1,
      values2: array2,
      values3: array3,
    },
  };

  return (
    <div>
      {dataSets[sortType.type] && (
        <Bar
          style={{ width: '100%' }}
          data={{
            labels: dataSets[sortType.type].labels,
            datasets: [
              {
                type: 'bar',
                label: t('users.desc04'),
                backgroundColor: 'rgba(14, 165, 233, 0.5)',
                data: dataSets[sortType.type].values1,
              },
              {
                type: 'bar',
                label: t('users.desc05'),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                data: dataSets[sortType.type].values2,
              },
              {
                type: 'line',
                label: t('users.desc06'),
                backgroundColor: 'rgba(145, 99, 132, 1)',
                data: dataSets[sortType.type].values3,
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
