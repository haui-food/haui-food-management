import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Button, ButtonGroup } from '@mui/material';
import 'chart.js/auto';

const SalesAreaChart = ({ sortType, dataRevenue }) => {
  const [timePeriod, setTimePeriod] = useState('week');

  const timeLabels = {
    week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: [
      'Week 1',
      'Week 2',
      'Week 3',
      'Week 4',
      'Week 5',
      'Week 6',
      'Week 7',
      'Week 8',
      'Week 9',
      'Week 10',
      'Week 11',
      'Week 12',
    ],
    quarter: ['Q1', 'Q2', 'Q3', 'Q4'],
    year: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };

  const array = dataRevenue ? dataRevenue.map((item) => item.totalRevenue) : [];

  const salesData = {
    week: array,
    month: array,
    quarter: array,
    year: array,
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
    responsive: true,
    maintainAspectRatio: false,
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const data = {
    labels: timeLabels[timePeriod],
    datasets: [
      {
        label: 'Sales',
        data: salesData[timePeriod],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    setTimePeriod(sortType.type);
  }, [sortType]);

  return (
    <Box mt={2} height={!isMobile ? 320 : 200}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default SalesAreaChart;
