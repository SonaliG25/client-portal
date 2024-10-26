import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavBar.js";
import AdminSidebar from "./AdminSidebar.js";
const AdminLayout = () => {
 
  return (
    <div className=" wrapper">
      <AdminNavbar/>
      <AdminSidebar/>
      {/* Content section where child routes/components will be displayed */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
