import React, { useState, useEffect } from "react";
import axios from "axios";
import SummaryApi from "../../../API/BackendApi";
import ComponentTable from "../../common/ComponentTable";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleEdit = (request) => {
    setFormData(request);
    setEditingId(request._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(SummaryApi.deleteRequest.url(id));
      fetchRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const columns = [
    { name: "Order #", selector: (row) => row.orderNumber, sortable: true },
    { name: "Product", selector: (row) => row.product, sortable: true },
    { name: "Quantity", selector: (row) => row.quantity, sortable: true },
    { name: "Total Price", selector: (row) => row.totalPrice, sortable: true },
    { name: "Sender", selector: (row) => row.sender, sortable: true },
    { name: "Receiver", selector: (row) => row.receiver, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Actions",
      selector: (row) => (
        <div>
          <button onClick={() => handleEdit(row)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Edit</button>
          <button onClick={() => handleDelete(row._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Request Job</h2>
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
      <ComponentTable data={requests} columns={columns} />
    </div>
  );
};

export default RequestJob;
