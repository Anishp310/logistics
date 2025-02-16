import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Grid, Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import SummaryApi from '../../../API/BackendApi';

export default function ProductType() {
  const [Type, setType] = useState([]);
  const [newType, setNewType] = useState('');
  const [userId, setUserId] = useState(''); // Assuming the user ID is available

  // Fetch all Type from the API
  const getType = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllTypes.url, { method: 'GET' });
      if (!response.ok) throw new Error('Failed to fetch Type');
      const data = await response.json();
    
      setType(data);
    } catch (error) {
      console.error('Error fetching Type:', error);
    }
  }, []);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // Handle adding a new Type
  const handleAddType = async (e) => {
    e.preventDefault();
   let userId = user._id ;
    try {
      const response = await fetch(SummaryApi.createType.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newType, user_id: userId }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to create Type');
      setNewType('');
      getType(); // Refresh Type
    } catch (error) {
      console.error('Error adding Type:', error);
    }
  };

  // Handle deleting a Type
  const handleDeleteType = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteType.url(id), { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete Type');
      getType(); // Refresh Type
    } catch (error) {
      console.error('Error deleting Type:', error);
    }
  };

  // Handle editing a Type
  const handleEditType = async (id, updatedName) => {
    try {
      const response = await fetch(SummaryApi.updateType(id).url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedName, user_id: userId }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to update Type');
      getType(); // Refresh Type
    } catch (error) {
      console.error('Error updating Type:', error);
    }
  };

  useEffect(() => {
    getType();
    // Set userId based on your app's user authentication flow
  }, [getType]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Create Type</Typography>
          <form onSubmit={handleAddType}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  label="Type Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Type
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Type</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User_id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Type.map((Type) => (
                <TableRow key={Type._id}>
                  <TableCell>{Type._id}</TableCell>
                  <TableCell>{Type.user_id}</TableCell>
                  <TableCell>{Type.name}</TableCell>
                  <TableCell>
                    {/* <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditType(Type._id, Type.name)}
                      style={{ marginRight: 10 }}
                    >
                      Edit
                    </Button> */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteType(Type._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
