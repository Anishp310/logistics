import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTachometerAlt, FaInfoCircle, FaMoneyBill, 
  FaEllipsisH 
} from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaShippingFast } from "react-icons/fa";

const menuItems = [
  { path: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
  { kind: "divider" },
  {
    title: "Users",
    icon: <FaInfoCircle />,
    subItems: [{ path: "/admin/users", label: "User Table" }],
  },
  { kind: "divider" },
  {
    title: "Products",
    icon: <FaMoneyBill />,
    subItems: [
      { path: "/admin/product", label: "Product" },
      { path: "/admin/product/type", label: "Type" },
      { path: "/admin/product/nature", label: "Nature" },
      // { path: "/admin/product/details", label: "Details" },
    ],
  },
  { kind: "divider" },
  {   title: "Job", path: "/admin/job", label: "Job", icon: <FaShippingFast />
  },

  {
    title: "Reports",
    icon: <FaTachometerAlt />,
    subItems: [
      { path: "/admin/reports/monthly", label: "Monthly Report" },
      { path: "/admin/reports/yearly", label: "Yearly Report" },
    ],
  },
  { path: "/admin/integrations", label: "Integrations", icon: <FaEllipsisH /> },
];

const Menulist = () => {
  const [openDropdown, setOpenDropdown] = useState({});

  const toggleDropdown = (title) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <ul className="space-y-2">
      {menuItems.map((item, index) => (
        item.kind === "divider" ? (
          <hr key={index} className="border-gray-700" />
        ) : item.subItems ? (
          <li key={index} className="p-2 cursor-pointer">
            <div
              className="flex items-center justify-between hover:bg-gray-700 p-2 rounded-lg transition-all duration-200 text-white"
              onClick={() => toggleDropdown(item.title)}
            >
              <div className="flex items-center space-x-2">
                {item.icon} <span className="font-semibold">{item.title}</span>
              </div>
              {openDropdown[item.title] ? <IoIosArrowUp className="text-gray-400" /> : <IoIosArrowDown className="text-gray-400" />}
            </div>
            {openDropdown[item.title] && (
              <ul className="ml-5 mt-2 bg-gray-800 rounded-lg shadow-md">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="p-2 text-sm hover:bg-gray-700 rounded-lg">
                    <Link to={subItem.path} className="text-white hover:text-gray-300">{subItem.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ) : (
          <li key={index} className="p-2 hover:bg-gray-700 rounded-lg">
            <Link to={item.path} className="flex items-center space-x-2 text-white hover:text-gray-300">
              {item.icon} <span>{item.label}</span>
            </Link>
          </li>
        )
      ))}
    </ul>
  );
};

export default Menulist;
