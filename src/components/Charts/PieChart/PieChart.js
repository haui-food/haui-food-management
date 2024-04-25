import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 27.7, label: 'series A', color: '#1877F2' },
  { id: 1, value: 34.7, label: 'series B', color: '#F5CE43' },
  { id: 2, value: 9.2, label: 'series C', color: '#42DCF7' },
  { id: 3, value: 28.4, label: 'series E', color: '#FF5630' },
  { id: 4, value: 58.4, label: 'series E', color: 'orange' },
];

export default function PieActiveArc() {
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={300}
      // width={250}
      label={({ dataEntry }) => `${dataEntry.label}: ${dataEntry.value}%`} // Định dạng lại nhãn để nhỏ hơn
      labelLineSize={10}
    />
  );
}
