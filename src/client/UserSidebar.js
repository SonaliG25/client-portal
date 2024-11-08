// src/components/UserSidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import * as RouteNames from "../utils/routeNames.js";
function UserSidebar() {
  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{ height: "100vh" }}
    >
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>

      <div className="sidebar" style={{ height: "100%" }}>
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="img/user2-160x160.jpg"
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
    </aside>
  );
}

export default UserSidebar;
