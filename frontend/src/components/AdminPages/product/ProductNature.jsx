import React, { useState, useEffect, useCallback } from 'react';
import SummaryApi from '../../../API/BackendApi';
import Header from '../../common/Header';
import ComponentTable from '../../common/ComponentTable';

export default function ProductNature() {
  const [natures, setNatures] = useState([]);
  const [newNature, setNewNature] = useState('');
  const [user, setUser] = useState(null);

  // Fetch all Natures from the API
  const getNatures = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllNatures.url, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch Natures');
      const data = await response.json();
      setNatures(data);
    } catch (error) {
      console.error('Error fetching Natures:', error);
    }
  }, []);

  // Fetch user details
  useEffect(() => {
    const storedUser = sessionStorage.getItem('User');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle adding a new Nature
  const handleAddNature = async (e) => {
    e.preventDefault();
    const userIdFromState = user._id;
    try {
      const response = await fetch(SummaryApi.createNature.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newNature, user_id: userIdFromState }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to create Nature');
      setNewNature('');
      getNatures(); // Refresh Natures
    } catch (error) {
      console.error('Error adding Nature:', error);
    }
  };

  // Handle deleting a Nature
  const handleDeleteNature = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteNature.url(id), { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete Nature');
      getNatures(); // Refresh Natures
    } catch (error) {
      console.error('Error deleting Nature:', error);
    }
  };

  // Handle editing a Nature
  const handleEditNature = async (id, updatedName) => {
    try {
      const response = await fetch(SummaryApi.updateNature(id).url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedName, user_id: user._id }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to update Nature');
      getNatures(); // Refresh Natures
    } catch (error) {
      console.error('Error updating Nature:', error);
    }
  };

  useEffect(() => {
    getNatures();
  }, [getNatures]);

  const columns = [
    { name: 'ID', selector: (row) => row._id, sortable: true, width: '200px' },
    { name: 'User ID', selector: (row) => row.user_id, sortable: true, width: '200px' },
    { name: 'Name', selector: (row) => row.name, sortable: true, width: '250px' },
    { name: 'Actions', selector: (row) => (
      <div>
        <button onClick={() => handleDeleteNature(row._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
      </div>
    ), width: '150px' },
  ];

  return (
    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
      <Header heading="Product Nature Management" />

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">Create Nature</h2>
        <form onSubmit={handleAddNature}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Nature Name</label>
              <input
                type="text"
                value={newNature}
                onChange={(e) => setNewNature(e.target.value)}
                placeholder="Enter Nature Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              />
            </div>
            <div className="col-span-1 flex items-center justify-center md:mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              >
                Add Nature
              </button>
            </div>
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-4">Natures List</h2>

      <ComponentTable data={natures} columns={columns} />
    </div>
  );
}
