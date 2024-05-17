import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RecentOrder = () => {
  const rows = [
    {
      id: 1,
      col1: 'Value 1',
      col2: 'Value 2',
      col3: 'Value 3',
      col4: 'Value 4',
      col5: 'Value 5',
      col6: 'Value 6',
      col7: 'Value 7',
    },
    {
      id: 2,
      col1: 'Value 1',
      col2: 'Value 2',
      col3: 'Value 3',
      col4: 'Value 4',
      col5: 'Value 5',
      col6: 'Value 6',
      col7: 'Value 7',
    },
    {
      id: 3,
      col1: 'Value 1',
      col2: 'Value 2',
      col3: 'Value 3',
      col4: 'Value 4',
      col5: 'Value 5',
      col6: 'Value 6',
      col7: 'Value 7',
    },
    // Add more rows as needed
  ];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#a8afb9' }}>
            <TableCell style={{ width: '100px', fontSize: '1.4rem', textAlign: 'center' }}>Column 1</TableCell>
            <TableCell style={{ width: '150px', fontSize: '1.4rem', textAlign: 'center' }}>Column 2</TableCell>
            <TableCell style={{ width: '120px', fontSize: '1.4rem', textAlign: 'center' }}>Column 3</TableCell>
            <TableCell style={{ width: '90px', fontSize: '1.4rem', textAlign: 'center' }}>Column 4</TableCell>
            <TableCell style={{ width: '130px', fontSize: '1.4rem', textAlign: 'center' }}>Column 5</TableCell>
            <TableCell style={{ width: '110px', fontSize: '1.4rem', textAlign: 'center' }}>Column 6</TableCell>
            <TableCell style={{ width: '140px', fontSize: '1.4rem', textAlign: 'center' }}>Column 7</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell style={{ width: '100px', fontSize: '1.4rem' }}>Column 1</TableCell>
              <TableCell style={{ width: '150px', fontSize: '1.4rem' }}>Column 2</TableCell>
              <TableCell style={{ width: '120px', fontSize: '1.4rem' }}>Column 3</TableCell>
              <TableCell style={{ width: '90px', fontSize: '1.4rem' }}>Column 4</TableCell>
              <TableCell style={{ width: '130px', fontSize: '1.4rem' }}>Column 5</TableCell>
              <TableCell style={{ width: '110px', fontSize: '1.4rem' }}>Column 6</TableCell>
              <TableCell style={{ width: '140px', fontSize: '1.4rem' }}>Column 7</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentOrder;
