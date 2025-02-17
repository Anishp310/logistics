import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../../../../API/BackendApi";
import ComponentTable from "../../../common/ComponentTable";
import Header from "../../../common/Header";

export default function RequestJob() {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    totalPrice: "",
    sender: "",
    receiver: "",
    status: "Pending",
    createdBy: "",
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Fetch all requests
  const getAllRequests = useCallback(async () => {
    try {
      const response = await axios.get(SummaryApi.getAllRequests.url);
      setRows(
        response.data.map((request) => ({
          id: request._id,
          product: request.product,
          quantity: request.quantity,
          totalPrice: request.totalPrice,
          sender: request.sender,
          receiver: request.receiver,
          status: request.status,
          createdBy: request.createdBy,
        }))
      );
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }, []);

  useEffect(() => {
    getAllRequests();
  }, [getAllRequests]);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(SummaryApi.updateRequest.url(editingId), formData);
      } else {
        await axios.post(SummaryApi.createRequest.url, formData);
      }
      getAllRequests();
      setFormData({ product: "", quantity: "", totalPrice: "", sender: "", receiver: "", status: "Pending", createdBy: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  // Navigate to Edit Request Page
  const handleEdit = (id) => {
    navigate(`/admin/request/${id}`);
  };

  // Handle Delete Request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(SummaryApi.deleteRequest.url(id));
      setRows(rows.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "200px" },
    { name: "Product", selector: (row) => row.product, sortable: true, width: "200px" },
    { name: "Quantity", selector: (row) => row.quantity, sortable: true, width: "150px" },
    { name: "Total Price", selector: (row) => row.totalPrice, sortable: true, width: "150px" },
    { name: "Sender", selector: (row) => row.sender, sortable: true, width: "200px" },
    { name: "Receiver", selector: (row) => row.receiver, sortable: true, width: "200px" },
    { name: "Status", selector: (row) => row.status, sortable: true, width: "150px" },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(row.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
          <button onClick={() => handleDelete(row.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
        </div>
      ),
      width: "200px",
    },
  ];

  return (
    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-lg">
      <Header heading="Request Management" />
      <h2 className="text-2xl font-semibold text-center mb-4">Request a Job</h2>

      {/* Request Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="product" value={formData.product} onChange={handleChange} placeholder="Product ID" className="border p-2 rounded" required />
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="border p-2 rounded" required />
          <input type="number" name="totalPrice" value={formData.totalPrice} onChange={handleChange} placeholder="Total Price" className="border p-2 rounded" required />
          <input type="text" name="sender" value={formData.sender} onChange={handleChange} placeholder="Sender ID" className="border p-2 rounded" required />
          <input type="text" name="receiver" value={formData.receiver} onChange={handleChange} placeholder="Receiver ID" className="border p-2 rounded" required />
          <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
            <option value="Pending">Pending</option>
            <option value="Active">Active</option>
            <option value="Finished">Finished</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input type="text" name="createdBy" value={formData.createdBy} onChange={handleChange} placeholder="Created By" className="border p-2 rounded" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">{editingId ? "Update Request" : "Create Request"}</button>
      </form>

      {/* Requests Table */}
      <ComponentTable data={rows} columns={columns} />
    </div>
  );
}
