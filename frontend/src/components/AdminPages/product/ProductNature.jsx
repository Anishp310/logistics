import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SummaryApi from '../../../API/BackendApi';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 200 },
];

export default function ProductNature() {
  const [natures, setNatures] = useState([]);
  const [newNature, setNewNature] = useState('');
  const [userId, setUserId] = useState(''); // Assuming the user ID is available

  // Fetch all natures from the API
  const getNatures = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllNatures.url, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch natures');
      const data = await response.json();
      setNatures(data);
    } catch (error) {
      console.error('Error fetching natures:', error);
    }
  }, []);

  // Handle adding a new nature
  const handleAddNature = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.createNature.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newNature, user_id: userId }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to create nature');
      setNewNature('');
      getNatures(); // Refresh natures
    } catch (error) {
      console.error('Error adding nature:', error);
    }
  };

  // Handle deleting a nature
  const handleDeleteNature = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteNature(id).url, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete nature');
      getNatures(); // Refresh natures
    } catch (error) {
      console.error('Error deleting nature:', error);
    }
  };

  // Handle editing a nature
  const handleEditNature = async (id, updatedName) => {
    try {
      const response = await fetch(SummaryApi.updateNature(id).url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedName, user_id: userId }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to update nature');
      getNatures(); // Refresh natures
    } catch (error) {
      console.error('Error updating nature:', error);
    }
  };

  useEffect(() => {
    getNatures();
    // Set userId based on your app's user authentication flow
  }, [getNatures]);

  return (
    <div>
      <h2>Create Nature</h2>
      <form onSubmit={handleAddNature}>
        <input
          type="text"
          value={newNature}
          onChange={(e) => setNewNature(e.target.value)}
          placeholder="Nature Name"
        />
        <button type="submit">Add Nature</button>
      </form>

      <h2>Natures</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={natures.map((nature) => ({
            id: nature._id,  // Assuming nature has an _id
            name: nature.name,
          }))}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowEditCommit={(params) => handleEditNature(params.id, params.row.name)}  // Handle editing
        />
      </div>
    </div>
  );
}
