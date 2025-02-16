import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Paper } from '@mui/material';
import SummaryApi from '../../../API/BackendApi';

const columns = [
  { field: 'id', headerName: 'ID', minWidth: 230, flex: 1 },
  { field: 'name', headerName: 'Name', minWidth: 150, flex: 1 },
  { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
  { field: 'phone', headerName: 'Phone', minWidth: 150, flex: 1 },
  { field: 'address', headerName: 'Address', minWidth: 220, flex: 1 },
  { field: 'role', headerName: 'Role', minWidth: 150, flex: 1 },
];

export default function Consignor() {
  const [rows, setRows] = useState([]);

  const getConsignorUsers = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getConsignorUsers.url, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();

      setRows(data.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    getConsignorUsers();
  }, [getConsignorUsers]);

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        m: { xs: 1, sm: 2 },
        borderRadius: 2,
        backgroundColor: '#f8f9fa',
        boxShadow: 2,
        overflowX: 'auto', // Ensures responsiveness
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ mb: 2, fontWeight: 'bold', color: '#333', textAlign: 'center' }}
      >
        Consignor List
      </Typography>

      <Paper elevation={3} sx={{ p: 2, overflowX: 'auto' }}>
        <Box sx={{ height: 450, width: '100%', minWidth: '600px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            autoHeight
            checkboxSelection
            sx={{
              '& .MuiDataGrid-root': {
                backgroundColor: 'white',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1976d2',
              },
              '& .MuiDataGrid-columnHeadersInner': {
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem', // Ensures readability
              },
              '& .MuiDataGrid-cell': {
                color: '#333',
              },
              '& .MuiDataGrid-virtualScroller': {
                overflowX: 'auto', // Enables scrolling if content overflows
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
