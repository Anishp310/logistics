import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { useNavigate } from "react-router-dom";

const NAVIGATION = [
  { title: "Dashboard", segment: "/admin/dashboard", icon: <DashboardIcon /> },

  {
    title: "Users",
    icon: <DescriptionIcon />,
    subItems: [
      { title: "Consignee", segment: "/admin/consignee", icon: <DescriptionIcon /> },
      { title: "Consigner", segment: "/admin/consignor", icon: <DescriptionIcon /> },
    ],
  },
    { kind: "divider" },

  {
    title: "Products",
    icon: <DescriptionIcon />,
    subItems: [
      { title: "Product", segment: "/admin/product", icon: <DescriptionIcon /> },
      { title: "Type", segment: "/admin/product/type", icon: <DescriptionIcon /> },
      { title: "Nature", segment: "/admin/product/nature", icon: <DescriptionIcon /> },
      { title: "Details", segment: "/admin/product/details", icon: <DescriptionIcon /> },  {/* Add the new link */}

    ],
  },


  { kind: "divider" },
  {
    title: "Reports",
    icon: <DescriptionIcon />,
    subItems: [
      { title: "Monthly Report", segment: "/admin/reports/monthly" },
      { title: "Yearly Report", segment: "/admin/reports/yearly" },
    ],
  },
  { title: "Integrations", segment: "/admin/integrations", icon: <LayersIcon /> },
];

const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState({});

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleDropdown = (title) => {
    setOpenDropdown((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <List>
      {NAVIGATION.map((item, index) =>
        item.kind === "divider" ? (
          <Divider key={index} />
        ) : item.subItems ? (
          <React.Fragment key={index}>
            <ListItem onClick={() => toggleDropdown(item.title)} className="cursor-pointer">
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.title} />}
              {openDropdown[item.title] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDropdown[item.title]} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    {item.subItems.map((subItem, subIndex) => (
      <ListItem
        key={`${index}-${subIndex}`}
        className=" cursor-pointer   "
        onClick={() => handleNavigation(subItem.segment)}
      >
        <ListItemIcon className="">{subItem.icon}</ListItemIcon>
        <ListItemText primary={subItem.title} className="text-sm " />
      </ListItem>
    ))}
  </List>
</Collapse>

          </React.Fragment>
        ) : (
          <ListItem key={index} onClick={() => handleNavigation(item.segment)} className="cursor-pointer">
            <ListItemIcon>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.title} />}
          </ListItem>
        )
      )}
    </List>
  );
};

export default Sidebar;
