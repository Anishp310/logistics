import React from 'react';
import UserInfo from './sidebarContent/UserInfo';
import Menulist from './sidebarContent/MenuList';
import Footer from './Footer';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-white shadow-lg p-4 w-[300px] rounded-md">
      {/* User Information Section */}
      <UserInfo />
      <hr className="mt-3 border-gray-600" />

      {/* Menu List Section */}
      <Menulist />

      {/* Spacer to push the footer to the bottom */}
      <div className="flex-grow"></div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Sidebar;
