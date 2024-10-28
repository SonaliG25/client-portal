// src/components/Sidebar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// const AdminSidebar = () => {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear("auth");
//     setAuth({ user: null, token: "" });
//     navigate("/login");
//   };
//   return (
//     <aside
//       className="main-sidebar sidebar-dark-primary elevation-4 d-flex flex-column"
//       style={{ height: "100vh" }}
//     >
//       {/* Brand Logo */}
//       <a href="index3.html" className="brand-link">
//         <img
//           src="img/AdminLTELogo.png"
//           alt="AdminLTE Logo"
//           className="brand-image img-circle elevation-3"
//           style={{ opacity: ".8" }}
//         />
//         <span className="brand-text font-weight-light">AdminLTE 3</span>
//       </a>

//       <div className="sidebar flex-grow-1">
//         {/* Sidebar user panel */}
//         <div className="user-panel mt-3 pb-3 mb-3 d-flex">
//           <div className="info">
//             <a href="#" className="d-block">
//               Admin
//             </a>
//           </div>
//         </div>

//         <nav className="mt-2">
//           <ul
//             className="nav nav-pills nav-sidebar flex-column d-flex flex-column"
//             data-widget="treeview"
//             role="menu"
//             data-accordion="false"
//           >
//             <li className="nav-item">
//               <NavLink to="/admin-dashboard" className="nav-link">
//                 <i className="nav-icon fas fa-tachometer-alt"></i>
//                 <p>Dashboard</p>
//               </NavLink>
//             </li>

//             {/* Logout Button */}
//             <li className="nav-item mt-auto">
//               <button
//                 className="btn btn-danger" // Bootstrap danger button style
//                 onClick={handleLogout} // Call handleLogout on click
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="25"
//                   height="18"
//                   fill="currentColor"
//                   class="bi bi-box-arrow-right"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
//                   />
//                   <path
//                     fill-rule="evenodd"
//                     d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
//                   />
//                 </svg>
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

// src/components/Sidebar.js
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("auth");
    setAuth({ user: null, token: "" });
    navigate("/login");
  };

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4 d-flex flex-column"
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

      <div className="sidebar flex-grow-1">
        {/* Sidebar user panel */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <a href="#" className="d-block">
              Admin
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column d-flex flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="home" className="nav-link">
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
                to="proposaltempletes"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Proposal Templates</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="allusers"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-users"></i>
                <p>Clients</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="categories"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-users"></i>
                <p>Categories</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="products"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-users"></i>
                <p>Products</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="orders"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <i className="nav-icon fas fa-cogs"></i>
                <p>Orders</p>
              </NavLink>
            </li>
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
};

export default AdminSidebar;
