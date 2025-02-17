import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../../../API/BackendApi";

const RequestJob = () => {
  const [requests, setRequests] = useState([]);
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

  // Fetch requests from the backend
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(SummaryApi.getAllRequests.url);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

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
      fetchRequests();
      setFormData({ product: "", quantity: "", totalPrice: "", sender: "", receiver: "", status: "Pending", createdBy: "" });
      setEditingId(null);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  // Handle Edit Request
  const handleEdit = (request) => {
    setFormData(request);
    setEditingId(request._id);
  };

  // Handle Delete Request
  const handleDelete = async (id) => {
    try {
      await axios.delete(SummaryApi.deleteRequest.url(id));
      fetchRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Request Job</h2>

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
      <table className="w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Order #</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Total Price</th>
            <th className="p-2 border">Sender</th>
            <th className="p-2 border">Receiver</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="border">
              <td className="p-2 border">{request.orderNumber}</td>
              <td className="p-2 border">{request.product}</td>
              <td className="p-2 border">{request.quantity}</td>
              <td className="p-2 border">{request.totalPrice}</td>
              <td className="p-2 border">{request.sender}</td>
              <td className="p-2 border">{request.receiver}</td>
              <td className="p-2 border">{request.status}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(request)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Edit</button>
                <button onClick={() => handleDelete(request._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestJob;
