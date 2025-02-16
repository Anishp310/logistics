import React, { useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography, Button, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Card, CardContent } from '@mui/material';
import SummaryApi from '../../../../API/BackendApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function User() {
  const [rows, setRows] = useState([]);
  const [roleName, setRoleName] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);

  const getAllUsers = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.getAllUsers.url, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setRows(data.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);



  useEffect(() => {
    getAllUsers();
  }, [getAllUsers,rows]);


  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUpdateRole = async (event) => {
    event.preventDefault();
    let userIdFromState =  userId; // Fallback to selected userId
    try {
      const response = await fetch(SummaryApi.updateRole.url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: roleName, userId: userIdFromState }), // Use correct user_id
      });
      if (!response.ok) throw new Error('Failed to update role');
      setRoleName('');
      setUserId('');
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  return (
    <Box sx={{ p: 2, m: 2, borderRadius: 2, backgroundColor: '#f8f9fa', boxShadow: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Create Role</Typography>
          <form onSubmit={handleUpdateRole}>
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
                  Update Role
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
        Users List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="Users Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.phone}</StyledTableCell>
                <StyledTableCell>{row.address}</StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
