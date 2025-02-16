import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Grid, Container, Card, CardContent, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../../../../API/BackendApi';

export default function AddRole() {
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');  // State for user ID
  const navigate = useNavigate();

  // Get all users
  const [rows, setRows] = useState([]);

  const getAllUsers = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllUsers.url, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();

      setRows(data.map((user) => ({
        id: user._id,
        name: user.name,
      })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  // Fetch all roles from the API
  const getRoles = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllRoles.url);
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }, []);

  // Handle adding a new role
  const handleAddRole = async (e) => {
    e.preventDefault();
    if (!roleName || !userId) {
      alert('Role name and user ID are required');
      return;
    }
    console.log(roleName,userId)
// return;
    try {
      const response = await fetch(SummaryApi.createRole.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: roleName, user_id: userId }), // Only include user_id
      });
      if (!response.ok) throw new Error('Failed to create role');
      setRoleName('');
      setUserId('');
      getRoles(); // Refresh roles
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  // Handle deleting a role
  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteRole.url(id), { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete role');
      getRoles(); // Refresh roles
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    getRoles(); // Get roles when component loads
  }, [getRoles]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Create Role</Typography>
          <form onSubmit={handleAddRole}>
            <Grid container spacing={2}>
              {/* Role Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  label="Role Name"
                  variant="outlined"
                />
              </Grid>

              {/* User ID Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>User ID</InputLabel>
                  <Select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    label="User ID"
                  >
                    {rows.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.id}_{user.name} {/* Display user's name in dropdown */}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Role
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Roles</Typography>
        <Box>
          {roles.map((role) => (
            <Box key={role._id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="body1">{role.name}</Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteRole(role._id)}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
