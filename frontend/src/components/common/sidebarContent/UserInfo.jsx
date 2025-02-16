import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page redirection

const UserInfo = () => {
  const [openbox, setOpenbox] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenbox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear session data from localStorage
    sessionStorage.removeItem('User');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiry');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative flex justify-between gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-all duration-200"
        onClick={() => setOpenbox(!openbox)}
      >
        <div className="flex gap-2">
          <div>
            <p className="font-bold text-lg">Anish Pandey</p>
            <p className="text-xs text-gray-400">anishp310@gmail.com</p>
          </div>
        </div>
        <div className="absolute right-0 top-4 text-md cursor-pointer text-gray-400">
          {openbox ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {openbox && (
        <div className="absolute bg-gray-800 w-32 rounded-lg top-full right-0 flex flex-col items-center p-2 shadow-lg transition-all">
          <ul>
            <li
              className="text-md font-semibold text-red-500 hover:text-red-800 py-2 px-4 cursor-pointer rounded-lg transition-all"
              onClick={handleLogout} // Trigger logout on click
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
