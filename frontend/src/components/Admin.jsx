import * as React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  AppBar,
  CssBaseline,
  Divider,
  useMediaQuery,
  IconButton,
  Box
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Sidebar from "./common/Sidebar";

const drawerWidth = 240;
const collapsedWidth = 60;

export default function Admin() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Header toggleDrawer={toggleDrawer} />
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
      </Drawer>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column", 
          minHeight: "100vh", 
          padding: isMobile ? "10px" : "24px", 
          marginTop: "20px" 
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1 }}>  
          <Outlet />
        </Box>
        <Footer sx={{ width: "100%", marginTop: "auto" }} />
      </Box>
    </Box>
  );
}
