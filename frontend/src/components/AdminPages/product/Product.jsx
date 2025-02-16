import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SummaryApi from '../../../API/BackendApi';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: '',
    quantity: 0,
    value: 0,
    dimensions: '',
    weight: 0,
    type: '',  // Single value for type
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
      
      console.log('Fetched products:', data);
  
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    getNatures();
    getType();
    getAllProducts();
    const storedUser = sessionStorage.getItem("User");
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
    const { value } = e.target;
    setProductForm({
      ...productForm,
      nature: typeof value === 'string' ? value.split(',') : value, // Ensure array format for nature
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productForm.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (productForm.quantity <= 0) {
      alert('Quantity must be a positive number');
      return;
    }
    if (productForm.value <= 0) {
      alert('Value must be a positive number');
      return;
    }
    if (productForm.weight < 0) {
      alert('Weight cannot be negative');
      return;
    }
    if (!productForm.type) {
      alert('Product type is required');
      return;
    }
    if (productForm.nature.length === 0) {
      alert('At least one nature is required');
      return;
    }
    if (!productForm.hs_code) {
      alert('HS Code is required');
      return;
    }
  
    // Add user_id before sending
    const newProductForm = { ...productForm, user_id: user._id };
  
    try {
      const response = await axios.post(SummaryApi.createProduct.url, newProductForm);
      const newProduct = response.data.product;
  
      // Transform type and nature before adding to state
      const updatedProduct = {
        ...newProduct,
        type: types.find(t => t._id === newProduct.type) || { name: 'Unknown' },
        nature: natures.filter(n => newProduct.nature.includes(n._id)) || [],
      };
  
      setProducts([...products, updatedProduct]);
      console.log("Product created successfully");
  
      // Reset form after submission
      setProductForm({
        name: '',
        quantity: 0,
        value: 0,
        dimensions: '',
        weight: 0,
        type: '',
        nature: [],
        hs_code: '',
        user_id: user._id,
      });
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  const handleUpdate = async (productId, updatedData) => {
    try {
      const response = await fetch(SummaryApi.updateProduct.url(productId), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData), // Send updated product data
      });
  
      if (!response.ok) throw new Error("Failed to update product");
  
      const data = await response.json();
      console.log("Updated product:", data);
  
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? data : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  
  const handleDelete = async (productId) => {

  
    try {
      const response = await fetch(SummaryApi.deleteProduct.url(productId), {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) throw new Error("Failed to delete product");
  
      console.log(`Product ${productId} deleted successfully`);
  
      // Refresh the product list after deletion
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const response = await fetch(SummaryApi.getProducts.url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) throw new Error("Failed to fetch products");
  
      const data = await response.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  

  return (
    <Container maxWidth="lg" style={{ marginTop: '10px' }}>
      <Card elevation={3} style={{ padding: '10px', marginBottom: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#333' }}>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Product Name" name="name" value={productForm.name} onChange={handleInputChange} fullWidth required variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Quantity" name="quantity" type="number" value={productForm.quantity} onChange={handleInputChange} fullWidth required variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Value" name="value" type="number" value={productForm.value} onChange={handleInputChange} fullWidth required variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Dimensions" name="dimensions" value={productForm.dimensions} onChange={handleInputChange} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="Weight" name="weight" type="number" value={productForm.weight} onChange={handleInputChange} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={productForm.type || ''}
            onChange={handleInputChange}
            label="Type"
  >
   {types.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.name}
                    </MenuItem>
    ))}
  </Select>
</FormControl>
 </Grid>
 <Grid item xs={12} sm={6} md={4}>
 <FormControl fullWidth variant="outlined">
  <InputLabel>Nature</InputLabel>
  <Select
    name="nature"
    multiple
    value={productForm.nature || []}  // Ensure it's always an array
    onChange={handleNatureChange}
    label="Nature"
  >
    {natures.map((nature) => (
      <MenuItem key={nature._id} value={nature._id}>  {/* Use nature.id as a unique key */}
        {nature.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField label="HS_Code" name="hs_code" type="number" value={productForm.hs_code} onChange={handleInputChange} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Product
              </Button>
            </Grid>
          
          </Grid>
        </form>
      </Card>

      <Box sx={{ p: 2, m: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          Product List
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="Product table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Dimensions</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Nature</TableCell>
                <TableCell>HS Code</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product,index) => (
                <TableRow key={product._id || index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.value}</TableCell>
                  <TableCell>{product.dimensions}</TableCell>
                  <TableCell>{product.weight}</TableCell>
                  <TableCell>{product.type?.name || 'N/A'}</TableCell>
                  <TableCell>{product.nature?.map((n) => n.name).join(', ') || 'N/A'}</TableCell>
                  <TableCell>{product.hs_code}</TableCell>
                  <TableCell><button onClick={()=>{handleUpdate(product._id)}} className='bg-blue-500 text-white p-1 hover:bg-blue-800 '>Edit</button></TableCell>
                  <TableCell><button onClick={()=>{handleDelete(product._id)}}  className='bg-red-500 text-white p-1 hover:bg-red-800'>Delete</button></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Product;
