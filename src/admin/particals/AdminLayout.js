import { Outlet, useNavigate } from "react-router-dom";
// import AdminNavbar from "./AdminNavBar.js";
import AdminSidebar from "./AdminSidebar.js";
import React, { useState, useEffect } from "react";

import axios from "axios";
const AdminLayout = () => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response, // Pass through successful responses
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor); // Clean up on unmount
  }, [navigate]);

  const logout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the login page
  };
  return (
    <div
      className={`${
        isMobile
          ? "sidebar-mini sidebar-closed sidebar-collapse"
          : "sidebar-mini"
      }`}
    >
      <div className=" wrapper">
        {/* <AdminNavbar /> */}
        <AdminSidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
