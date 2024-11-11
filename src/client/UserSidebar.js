// src/components/UserSidebar.js
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { LOGIN } from "../utils/routeNames.js";
import * as RouteNames from "../utils/routeNames.js";
function UserSidebar() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 1000 * 60 * 10);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.clear("auth");
    localStorage.clear("token");
    setAuth({ user: null, token: "" });
    toast.success("Logout successfully");
    navigate(LOGIN);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <aside
      className={`main-sidebar sidebar-dark-primary elevation-4 d-flex flex-column ${
        isSidebarOpen ? "d-block" : "d-none d-md-flex"
      }`}
      style={{ height: "100vh", position: "fixed", zIndex: 999 }}
    >
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>

      <div className="sidebar flex-grow-1">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Alexander Pierce
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink
                to={RouteNames.USER_HOME}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="proposal"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Proposals</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={RouteNames.SERVICE_DESK}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Service Desk</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={RouteNames.SUBSCRIPTIONS}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>subscriptions</p>
              </NavLink>
            </li>

            {/* <li className="nav-item">
              <NavLink
                to="userlist"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Userlist</p>
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
      {/* Logout Button at the Bottom */}
      <div className="logout-section">
        <li className="nav-item mt-auto">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="18"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
            Logout
          </button>
        </li>
      </div>
    </aside>
  );
}

export default UserSidebar;
