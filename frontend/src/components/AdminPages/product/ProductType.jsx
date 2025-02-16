import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SummaryApi from '../../../API/BackendApi';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 200 },
];

export default function ProductType() {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');

  const getTypes = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.createType.url, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch types');
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  }, []);

  const handleAddType = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.createType.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newType }),
      });
      if (!response.ok) throw new Error('Failed to create type');
      setNewType('');
      getTypes(); // Refresh types
    } catch (error) {
      console.error('Error adding type:', error);
    }
  };

  useEffect(() => {
    getTypes();
  }, [getTypes]);

  return (
    <div>
      <h2>Create Type</h2>
      <form onSubmit={handleAddType}>
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Type Name"
        />
        <button type="submit">Add Type</button>
      </form>

      <h2>Types</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={types} columns={columns} pageSize={5} checkboxSelection />
      </div>
    </div>
  );
}
