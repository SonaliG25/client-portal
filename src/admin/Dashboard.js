import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavBar.js";
import AdminSidebar from "../components/AdminSidebar.js";
const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("auth");
    setAuth({ user: null, token: "" });
    navigate("/login");
  };
  return (
    <div className=" wrapper">
      <AdminNavbar></AdminNavbar>
      <AdminSidebar></AdminSidebar>
      {/* Content section where child routes/components will be displayed */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
