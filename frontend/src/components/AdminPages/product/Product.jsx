import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SummaryApi from '../../../API/BackendApi';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: '',
    quantity: 0,
    value: 0,
    dimensions: '',
    weight: 0,
    type: '',
    nature: [],
    hs_code: '',
    user_id: '1234567',
  });

  // Fetch products from API
  useEffect(() => {
    axios(SummaryApi.getProducts)
      .then(response => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Expected array of products, but got:', response.data);
        }
      })
      .catch(error => console.error('Error fetching products', error));
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(SummaryApi.createProduct.url, productForm);
      setProducts([...products, response.data.product]);
      setProductForm({
        name: '',
        quantity: 0,
        value: 0,
        dimensions: '',
        weight: 0,
        type: '',
        nature: [],
        hs_code: '',
        user_id: '1234567',
      });
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(SummaryApi.deleteProduct.url(id));
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'value', headerName: 'Value', width: 100 },
    { field: 'dimensions', headerName: 'Dimensions', width: 150 },
    { field: 'weight', headerName: 'Weight', width: 100 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'nature', headerName: 'Nature', width: 200 },
    { field: 'hs_code', headerName: 'HS Code', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.row._id)} color="secondary">
          Delete
        </Button>
      ),
      width: 150,
    },
  ];

  const rows = products?.map((product) => ({
    id: product._id,
    name: product.name,
    quantity: product.quantity,
    value: product.value,
    dimensions: product.dimensions,
    weight: product.weight,
    type: product.type?.name || 'N/A',
    nature: product.nature?.map((n) => n.name).join(', ') || 'N/A',
    hs_code: product.hs_code,
  }));

  return (
    <Container>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Product Name"
              name="name"
              value={productForm.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Quantity Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={productForm.quantity}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Value Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Value"
              name="value"
              type="number"
              value={productForm.value}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          {/* Dimensions Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Dimensions"
              name="dimensions"
              value={productForm.dimensions}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          {/* Weight Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Weight"
              name="weight"
              type="number"
              value={productForm.weight}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          {/* Type Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Type"
              name="type"
              value={productForm.type}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          {/* Nature Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Nature"
              name="nature"
              value={productForm.nature.join(', ')}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          {/* HS Code Field */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="HS Code"
              name="hs_code"
              value={productForm.hs_code}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Product
            </Button>
          </Grid>
        </Grid>
      </form>

      <h2>Product List</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </Container>
  );
};

export default Product;
