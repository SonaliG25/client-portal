// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
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

      <div className="sidebar">
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
            <li className="nav-item ">
              <Link to="proposal" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Proposals</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="proposaltemplete" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Proposal Template</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="newuser" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>NewUser</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="allusers" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Users</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                <i className="nav-icon fas fa-cogs"></i>
                <p>Orders</p>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/support" className="nav-link">
                <i className="nav-icon fas fa-cogs"></i>
                <p>Support</p>
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
