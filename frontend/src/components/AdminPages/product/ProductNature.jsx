import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Grid, Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import SummaryApi from '../../../API/BackendApi';
import { useNavigate } from 'react-router-dom';

export default function ProductNature() {
  const [natures, setNatures] = useState([]);
  const [newNature, setNewNature] = useState('');
  const [userId, setUserId] = useState(''); // Assuming the user ID is available


  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // Fetch all natures from the API
  const getNatures = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllNatures.url);
      if (!response.ok) throw new Error('Failed to fetch natures');
      const data = await response.json();
      console.log(data)
      setNatures(data);
    } catch (error) {
      console.error('Error fetching natures:', error);
    }
  }, []);

  // Handle adding a new nature
  const handleAddNature = async (e) => {

    let userId = user._id

    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.createNature.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newNature, user_id: userId }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to create nature');
      setNewNature('');
      getNatures(); // Refresh natures
    } catch (error) {
      console.error('Error adding nature:', error);
    }
  };

  // Handle deleting a nature
  const handleDeleteNature = async (id) => {
    console.log(id)
    try {
      const response = await fetch(SummaryApi.deleteNature.url(id), { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete nature');
      getNatures(); // Refresh natures
    } catch (error) {
      console.error('Error deleting nature:', error);
    }
  };

  // Handle editing a nature
  const handleEditNature = async (id, updatedName) => {
    try {
      const response = await fetch(SummaryApi.updateNature(id).url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedName, user_id: userId }),  // Include user_id
      });
      if (!response.ok) throw new Error('Failed to update nature');
      getNatures(); // Refresh natures
    } catch (error) {
      console.error('Error updating nature:', error);
    }
  };

  useEffect(() => {
    getNatures();
    // Set userId based on your app's user authentication flow
  }, [getNatures]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Create Nature</Typography>
          <form onSubmit={handleAddNature}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  value={newNature}
                  onChange={(e) => setNewNature(e.target.value)}
                  label="Nature Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Nature
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Natures</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User_Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {natures.map((nature) => (
                <TableRow key={nature._id}>
                  <TableCell>{nature._id}</TableCell>
                  <TableCell>{nature.user_id}</TableCell>
                  <TableCell>{nature.name}</TableCell>
                  <TableCell>
                    {/* <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditNature(nature._id, nature.name)}
                      style={{ marginRight: 10 }}
                    >
                      Edit
                    </Button> */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteNature(nature._id)}
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
