import { Line } from 'react-chartjs-2';
// import { CategoryScale } from 'chart.js';
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
import { useEffect, useState } from 'react';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function BiaxialLineChart({ sortType }) {
  const [data, setData] = useState([
    {
      type: 'week',
      values: [400, 300, 320, 106, 783, 111, 133],
      labels: ['Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    {
      type: 'month',
      values: [
        400, 300, 320, 106, 783, 111, 133, 400, 300, 320, 106, 783, 111, 133, 400, 300, 120, 300, 320, 106, 783, 111,
        133, 400, 300, 320, 106, 783, 111, 133,
      ],
      labels: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
      ],
    },
    {
      type: 'year',
      values: [400, 300, 320, 106, 783, 111, 133, 400, 300, 320, 106, 300],
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    {
      type: 'quarter',
      values: [400, 300, 320, 106],
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
  ]);

  const [datasets, setDatasets] = useState(null);

  useEffect(() => {
    // Filter the dataset based on the selected sortType
    const filteredDataset = data.find((item) => item.type === sortType.type);
    setDatasets(filteredDataset);
  }, [sortType]);
  return datasets ? (
    <Line
      data={{
        labels: datasets.labels,
        datasets: [
          {
            data: datasets.values,
            label: 'Doanh thu',
            tension: 0.4,
            borderColor: '#3e95cd',
            fill: false,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: 'World population per region (in millions)',
        },
        legend: {
          display: true,
          position: 'bottom',
        },
      }}
    />
  ) : null;
}
