import React, { useState, useEffect, useCallback } from 'react';
import SummaryApi from '../../../API/BackendApi';
import Header from '../../common/Header';
import ComponentTable from '../../common/ComponentTable';

export default function ProductType() {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);

  // Fetch all types from the API
  const getTypes = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllTypes.url, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch types');
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  }, []);

  // Fetch user details
  useEffect(() => {
    const storedUser = sessionStorage.getItem('User');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle adding a new type
  const handleAddType = async (e) => {
    e.preventDefault();
    const userIdFromState = user._id;
    try {
      const response = await fetch(SummaryApi.createType.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newType, user_id: userIdFromState }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to create type');
      setNewType('');
      getTypes(); // Refresh types
    } catch (error) {
      console.error('Error adding type:', error);
    }
  };

  // Handle deleting a type
  const handleDeleteType = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteType.url(id), { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete type');
      getTypes(); // Refresh types
    } catch (error) {
      console.error('Error deleting type:', error);
    }
  };

  // Handle editing a type
  const handleEditType = async (id, updatedName) => {
    try {
      const response = await fetch(SummaryApi.updateType(id).url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedName, user_id: userId }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to update type');
      getTypes(); // Refresh types
    } catch (error) {
      console.error('Error updating type:', error);
    }
  };

  useEffect(() => {
    getTypes();
  }, [getTypes]);

  const columns = [
    { name: 'ID', selector: (row) => row._id, sortable: true, width: '200px' },
    { name: 'User ID', selector: (row) => row.user_id, sortable: true, width: '200px' },
    { name: 'Name', selector: (row) => row.name, sortable: true, width: '250px' },
    { name: 'Actions', selector: (row) => (
      <div>
        <button onClick={() => handleDeleteType(row._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
      </div>
    ), width: '150px' },
  ];

  return (
    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
      <Header heading="Product Type Management" /> {/* Add the Header component here */}

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">Create Type</h2>
      <form onSubmit={handleAddType}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Type Name Input */}
    <div className="col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">Type Name</label>
      <input
        type="text"
        value={newType}
        onChange={(e) => setNewType(e.target.value)}
        placeholder="Enter Type Name"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      />
    </div>

    {/* Add Type Button */}
    <div className="col-span-1 flex items-center justify-center md:mt-6 ">
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
      >
        Add Type
      </button>
    </div>
  </div>
</form>

      </div>

      <h2 className="text-2xl font-semibold text-center mb-4">Types List</h2>

      {/* Use ComponentTable to display types */}
      <ComponentTable data={types} columns={columns} />
    </div>
  );
}
