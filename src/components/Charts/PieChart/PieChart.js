import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieActiveArc({ dataChart }) {
  const data = [
    { id: 0, value: dataChart?.pending, label: 'Pending', color: '#1877F2' },
    { id: 1, value: dataChart?.canceled, label: 'Canceled', color: '#F5CE43' },
    { id: 2, value: dataChart?.confirmed, label: 'Confirmed', color: '#42DCF7' },
    { id: 3, value: dataChart?.reject, label: 'Reject', color: '#FF5630' },
    { id: 4, value: dataChart?.shipping, label: 'Shipping', color: 'orange' },
    { id: 4, value: dataChart?.success, label: 'Success', color: 'orange' },
  ];

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
