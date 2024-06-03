import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieActiveArc({ dataChart }) {
  const data = [
    { id: 0, value: dataChart?.pending, label: 'Pending', color: '#ffca28' },
    { id: 1, value: dataChart?.canceled, label: 'Canceled', color: '#cfd8dc' },
    { id: 2, value: dataChart?.confirmed, label: 'Confirmed', color: '#26c6da' },
    { id: 3, value: dataChart?.reject, label: 'Reject', color: '#ef5350' },
    { id: 4, value: dataChart?.shipping, label: 'Shipping', color: '#26a69a' },
    { id: 4, value: dataChart?.success, label: 'Success', color: '#4caf50' },
  ];

  React.useEffect(() => {
    console.log(dataChart);
  }, []);

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
