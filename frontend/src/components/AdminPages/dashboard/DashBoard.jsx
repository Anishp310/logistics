import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="body1">
          Manage users, settings, and analytics all from one place.
        </Typography>
      </Paper>

      {/* Flexbox container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
        {/* Products Card */}
        <div style={{ flex: '1 1 calc(25% - 16px)', minWidth: '250px' }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", backgroundColor: "#FCE4EC" }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#D81B60" }}>
              Total Products
            </Typography>
            <Typography variant="h6" sx={{ color: "#C2185B" }}>
              1200
            </Typography>
          </Paper>
        </div>

        {/* Receivers Card */}
        <div style={{ flex: '1 1 calc(25% - 16px)', minWidth: '250px' }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", backgroundColor: "#E1F5FE" }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#0288D1" }}>
              Consigner
            </Typography>
            <Typography variant="h6" sx={{ color: "#0277BD" }}>
              450
            </Typography>
          </Paper>
        </div>

        {/* Senders Card */}
        <div style={{ flex: '1 1 calc(25% - 16px)', minWidth: '250px' }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", backgroundColor: "#F1F8E9" }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#7B1FA2" }}>
              Consignee
            </Typography>
            <Typography variant="h6" sx={{ color: "#8E24AA" }}>
              320
            </Typography>
          </Paper>
        </div>

        {/* Transactions Card */}
        <div style={{ flex: '1 1 calc(25% - 16px)', minWidth: '250px' }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center", backgroundColor: "#FFF3E0" }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#FB8C00" }}>
              Total Transactions
            </Typography>
            <Typography variant="h6" sx={{ color: "#FF6F00" }}>
              980
            </Typography>
          </Paper>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
