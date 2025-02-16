import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SummaryApi from '../../../API/BackendApi';

const columns = [
  { field: 'id', headerName: 'Id', width: 220 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 180 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'role', headerName: 'Role', width: 150 },
];

export default function Consignor() {
  const [rows, setRows] = useState([]);

  const getConsigneeUsers = useCallback(async () => {
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
    getConsigneeUsers();
  }, [getConsigneeUsers]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
