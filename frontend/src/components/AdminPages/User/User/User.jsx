import React, { useState, useEffect, useCallback } from 'react';
import SummaryApi from '../../../../API/BackendApi';
import ComponentTable from '../../../common/ComponentTable';
import Header from '../../../common/Header';  // Import the Header component

export default function User() {
  const [rows, setRows] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);

  // Fetch all users and set them to rows state
  const getAllUsers = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllUsers.url, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
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
    getAllUsers();
  }, [getAllUsers,rows]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUpdateRole = async (event) => {
    event.preventDefault();
    let userIdFromState = userId || user?.id; // Use fallback if userId is not set
    try {
      const response = await fetch(SummaryApi.updateRole.url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: roleName, userId: userIdFromState }),
      });
      if (!response.ok) throw new Error('Failed to update role');
      setRoleName('');
      setUserId('');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true, width: '200px' },
    { name: 'Name', selector: (row) => row.name, sortable: true, width: '200px' },
    { name: 'Email', selector: (row) => row.email, sortable: true, width: '250px' },
    { name: 'Phone', selector: (row) => row.phone, sortable: true, width: '150px' },
    { name: 'Address', selector: (row) => row.address, sortable: true, width: '200px' },
    { name: 'Role', selector: (row) => row.role, sortable: true, width: '150px' },
  ];

  return (
    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
      <Header heading="User Management" /> {/* Add the Header component here */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">Create Role</h2>
        <form onSubmit={handleUpdateRole}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Role Name */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* User ID Dropdown */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select User</option>
                {rows.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.id} - {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-1">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Update Role
              </button>
            </div>
          </div>
        </form>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-4">Users List</h2>

      {/* Use ComponentTable to display users */}
      <ComponentTable data={rows} columns={columns} />
    </div>
  );
}
