import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Don't forget to import axios
import SummaryApi from '../../../API/BackendApi';
import Header from '../../common/Header';
import ComponentTable from '../../common/ComponentTable';
import Select from 'react-select';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: '',
    quantity: 0,
    value: 0,
    dimensions: '',
    weight: 0,
    type: '',
    nature: [], // Array for nature (multi-select)
    hs_code: '',
    user_id: '',
  });
  const [natures, setNatures] = useState([]);
  const [types, setTypes] = useState([]);
  const [user, setUser] = useState(null);

  const getType = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllTypes.url, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch types');
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  }, []);

  const getNatures = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllNatures.url);
      if (!response.ok) throw new Error('Failed to fetch natures');
      const data = await response.json();
      setNatures(data);
    } catch (error) {
      console.error('Error fetching natures:', error);
    }
  }, []);

  const getAllProducts = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getProducts.url, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to fetch products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    getNatures();
    getType();
    getAllProducts();
    const storedUser = sessionStorage.getItem('User');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [getNatures, getType, getAllProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const handleNatureChange = (e) => {
    const { options } = e.target;
    const selectedNatures = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value); // Collect selected values into an array
  
    setProductForm({
      ...productForm,
      nature: selectedNatures, // Ensure the 'nature' is updated with selected values
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation and form submission logic goes here...
  };

  const handleUpdate = async (productId, updatedData) => {
    try {
      const response = await fetch(SummaryApi.updateProduct.url(productId), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData), // Send updated product data
      });

      if (!response.ok) throw new Error('Failed to update product');

      const data = await response.json();
      console.log('Updated product:', data);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? data : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(SummaryApi.deleteProduct.url(productId), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to delete product');

      console.log(`Product ${productId} deleted successfully`);
      // Remove deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    { name: 'ID', selector: (row) => row._id, sortable: true, width: '200px' },
    { name: 'Name', selector: (row) => row.name, sortable: true, width: '200px' },
    { name: 'Quantity', selector: (row) => row.quantity, sortable: true, width: '150px' },
    { name: 'Value', selector: (row) => row.value, sortable: true, width: '150px' },
    { name: 'Dimensions', selector: (row) => row.dimensions, sortable: true, width: '200px' },
    { name: 'Weight', selector: (row) => row.weight, sortable: true, width: '150px' },
    { name: 'HS Code', selector: (row) => row.hs_code, sortable: true, width: '150px' },
    { name: 'Type', selector: (row) => row.type.name, sortable: true, width: '150px' },
    { name: 'Nature', selector: (row) => row.nature.map(n => n.name).join(', '), sortable: true, width: '200px' },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleUpdate(row._id, row)} // Pass the row data to update
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      ),
      width: '250px',
    },
  ];

  return (
    <div className="p-2 m-2 bg-gray-100 rounded-lg shadow-lg max-w-[165vh]">
      <Header heading="Product Management" />
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 ">
        <h2 className="text-xl font-semibold text-center mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={productForm.quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
              <input
                type="number"
                name="value"
                value={productForm.value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
              <input
                type="text"
                name="dimensions"
                value={productForm.dimensions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <input
                type="number"
                name="weight"
                value={productForm.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">HS Code</label>
              <input
                type="text"
                name="hs_code"
                value={productForm.hs_code}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                name="type"
                value={productForm.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Type</option>
                {types.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
  <label className="block text-sm font-medium text-gray-700 mb-1">Product Nature</label>
  <Select
    isMulti
    name="nature"
    options={natures.map((nature) => ({
      value: nature._id,
      label: nature.name,
    }))}
    value={productForm.nature.map((natureId) => ({
      value: natureId,
      label: natures.find((nature) => nature._id === natureId)?.name,
    }))}
    onChange={(selectedOptions) => {
      const selectedNatures = selectedOptions.map((option) => option.value);
      setProductForm({
        ...productForm,
        nature: selectedNatures,
      });
    }}
    className="w-full"
  />
</div>


          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-[165vh] overflow-x-auto rounded-xl shadow-lg">
  <ComponentTable data={products} columns={columns} />
</div>
    </div>
  );
}
