import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../../../API/BackendApi";
import ComponentTable from "../../../common/ComponentTable";
import Header from "../../../common/Header";

export default function User() {
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch all users and set them to rows state
  const getAllUsers = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllUsers.url, {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setRows(
        data.map((user) => ({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        }))
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
console.log(rows)
  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Navigate to Edit User page
  const handleEdit = (id) => {
    navigate(`/admin/user/${id}`);
  };

  // Delete user function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(SummaryApi.deleteUser.url(id), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete user");

      setRows(rows.filter((user) => user.id !== id)); // Remove deleted user from UI
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "200px" },
    { name: "Name", selector: (row) => row.name, sortable: true, width: "200px" },
    { name: "Email", selector: (row) => row.email, sortable: true, width: "250px" },
    { name: "Phone", selector: (row) => row.phone, sortable: true, width: "150px" },
    { name: "Address", selector: (row) => row.address, sortable: true, width: "200px" },
    { name: "Role", selector: (row) => row.role, sortable: true, width: "150px" },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
      width: "200px",
    },
  ];

  return (
    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
      <Header heading="User Management" />
      <h2 className="text-2xl font-semibold text-center mb-4">Users List</h2>
      <ComponentTable data={rows} columns={columns} />
    </div>
  );
}
