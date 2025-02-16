import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Divider,
  Avatar,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header({ toggleDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("token");
    setUser(null);
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#333", boxShadow: "none" }}>
        <Toolbar>
          {/* Sidebar Toggle Button */}
          <IconButton
            size="large"
            edge="start"
            sx={{ color: "white", mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuOpenIcon />
          </IconButton>

          {/* Dashboard Title */}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}>
            Dashboard
          </Typography>

          {/* Profile & Logout Menu */}
          {user && (
            <>
              <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "#3F51B5" }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ mt: "45px" }}
              >
                {/* User Details */}
                <MenuItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <Avatar sx={{ bgcolor: "#3F51B5", width: 50, height: 50 }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {user?.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {user?.email}
                  </Typography>
                </MenuItem>

                <Divider />

                {/* Logout Button */}
                <MenuItem onClick={handleLogout} sx={{ color: "red", justifyContent: "center" }}>
                  <LogoutIcon sx={{ fontSize: 18, mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
