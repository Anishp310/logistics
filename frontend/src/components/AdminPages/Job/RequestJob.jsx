import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../../../API/BackendApi";
import ComponentTable from "../../common/ComponentTable";
import Header from "../../common/Header";

export default function RequestJob() {
  const [rows, setRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const getAllUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(SummaryApi.getAllUsers.url);
      setUsers(data.map((user) => ({ id: user._id, name: user.name })));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const getAllRequests = useCallback(async () => {
    try {
      const { data } = await axios.get(SummaryApi.getAllRequests.url);
      setRows(
        data.map((request) => ({
          id: request._id,
          product: request.product ? request.product.name : 'Unknown',
          quantity: request.quantity,
          totalPrice: request.totalPrice,
          sender: request.sender ? request.sender.name : 'Unknown',
          receiver: request.receiver ? request.receiver.name : 'Unknown',
          status: request.status,
          createdBy: request.createdBy,
        }))
      );
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }, []);
console.log(rows)
  const getAllProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(SummaryApi.getProducts.url);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const [session, setSession] = useState(null);
  useEffect(() => {
    getAllRequests();
    getAllUsers();
    getAllProducts();
    const storedUser = sessionStorage.getItem('User');
    if (storedUser) {
      setSession(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductSelect = (e) => {
    const selectedProductId = e.target.value;
    const product = products.find(p => p._id === selectedProductId);
    setSelectedProduct(product);
    setFormData({
      ...formData,
      product: selectedProductId,
      quantity: "",
      totalPrice: "",
    });
  };

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setFormData({
      ...formData,
      quantity: quantity,
      totalPrice: selectedProduct ? (quantity * selectedProduct.value).toFixed(2) : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      createdBy: session?.name,
      sender:session?._id,
    };
    // if (!formData.product || !formData.quantity || !formData.totalPrice || !formData.sender || !formData.receiver) {
    //   alert("Please fill in all required fields.");
    //   return;
    // 
    try {
     
      console.log(requestData)
       
        await axios.post(SummaryApi.createRequest.url, requestData);
      

      getAllRequests();
      setFormData({ product: "", quantity: "", totalPrice: "", sender: "", receiver: "", status: "Pending", createdBy: "" });
      
    } catch (error) {
      console.error("Error submitting request:", error);
      alert(error.response?.data?.message || "Failed to submit request.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/request/${id}`);
  };
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
    { name: "Product", selector: (row) => row.product || 'Unknown', sortable: true, width: "200px" },
    { name: "Quantity", selector: (row) => row.quantity, sortable: true, width: "150px" },
    { name: "Total Price", selector: (row) => row.totalPrice, sortable: true, width: "150px" },
    { name: "Sender", selector: (row) => row.sender || 'Unknown', sortable: true, width: "200px" },
    { name: "Receiver", selector: (row) => row.receiver || 'Unknown', sortable: true, width: "200px" },
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
    <div className="p-6 m-6 bg-gray-50 rounded-lg shadow-lg max-w-[160vh] mx-auto">
      <Header heading="Request Management" />
      <h2 className="text-2xl font-semibold text-center mb-8">Request a Job</h2>

      {/* Request Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender - Top Left */}
              <div className="flex flex-col">
                <label htmlFor="sender" className="block text-sm font-medium text-gray-700">Sender</label>
                <select
                  name="sender"
                  id="sender"
                  value={formData.sender || session?._id}
                  onChange={handleChange}
                  className="border p-3 rounded-lg w-full"
                >
                  <option value="">Select Sender</option>
                  {session && (
                    <option value={session._id}>{session.name}</option>
                  )}
                </select>
              </div>


    {/* Receiver - Top Right */}
    <div className="flex flex-col">
      <label htmlFor="receiver" className="block text-sm font-medium text-gray-700">Receiver</label>
      <select
        name="receiver"
        id="receiver"
        value={formData.receiver}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      >
        <option value="">Select Receiver</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  </div>

  {/* Product Form Below */}
  <div className="mt-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Product Select */}
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
        <select
          name="product"
          id="product"
          value={formData.product}
          onChange={handleProductSelect}
          className="border p-3 rounded-lg w-full"
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>{product.name}</option>
          ))}
        </select>
      </div>

      {/* Product Details */}
      {selectedProduct && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Value</label>
            <input
              type="text"
              value={selectedProduct.value}
              className="border p-3 rounded-lg w-full"
              disabled
            />
          </div>
        </div>
      )}
    </div>

    {/* Quantity Input */}
    <div>
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={formData.quantity}
        onChange={handleQuantityChange}
        placeholder="Quantity"
        className="border p-3 rounded-lg w-full"
        required
      />
    </div>

    {/* Total Price Input */}
    <div>
      <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price</label>
      <input
        type="text"
        name="totalPrice"
        id="totalPrice"
        value={formData.totalPrice}
        className="border p-3 rounded-lg w-full"
        disabled
      />
    </div>
  </div>

  <button type="submit" className="bg-blue-500 text-white px-6 py-3 mt-6 rounded-lg w-full hover:bg-blue-600">
     Create Request
  </button>
</form>


      {/* Requests Table */}
      <ComponentTable data={rows} columns={columns} />
    </div>
  );
}
