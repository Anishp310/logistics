import React from "react";
import Sidebar from "./common/Sidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex min-h-screen bg-slate-200 p-2">
      <div className="flex w-full gap-4 mx-auto p-2">
        {/* Sidebar */}
        <div className="w-[300px]">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1  bg-white shadow-lg rounded-lg p-2">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Admin;
