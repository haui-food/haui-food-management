import React from 'react';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';

const GaugeChart = ({ value, max, color }) => {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={100} height={100} value={value} valueMin={0} valueMax={100} color={color} />
    </Stack>
  );
};

export default GaugeChart;
