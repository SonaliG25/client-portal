// // src/components/Sidebar.js
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// const AdminSidebar = () => {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   return (
//     <aside className="main-sidebar sidebar-dark-primary elevation-4">
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

//       <div className="sidebar">
//         {/* Sidebar user panel (optional) */}
//         <div className="user-panel mt-3 pb-3 mb-3 d-flex">
//           <div className="info">
//             <a href="#" className="d-block">
//               Admin
//             </a>
//           </div>
//         </div>

//         <nav className="mt-2">
//           <ul
//             className="nav nav-pills nav-sidebar flex-column"
//             data-widget="treeview"
//             role="menu"
//             data-accordion="false"
//           >
//             <li className="nav-item">
//               <NavLink
//                 to="/admin-dashboard"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active" : "nav-link"
//                 }
//               >
//                 <i className="nav-icon fas fa-tachometer-alt"></i>
//                 <p>Dashboard</p>
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="proposal"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active" : "nav-link"
//                 }
//               >
//                 <i className="nav-icon fas fa-tachometer-alt"></i>
//                 <p>Proposals</p>
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="proposaltempletes"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active" : "nav-link"
//                 }
//               >
//                 <i className="nav-icon fas fa-tachometer-alt"></i>
//                 <p>Proposal Templates</p>
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="categories"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active" : "nav-link"
//                 }
//               >
//                 <i className="nav-icon fas fa-tachometer-alt"></i>
//                 <p>Categories</p>
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="allusers"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active" : "nav-link"
//                 }
//               >
//                 <i className="nav-icon fas fa-users"></i>
//                 <p>Clients</p>
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="product"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active" : "nav-link"
//                 }
//               >
//                 <i className="nav-icon fas fa-users"></i>
//                 <p>Products</p>
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="orders"
//                 className={({ isActive }) =>
//                   isActive ? "nav-link active" : "nav-link"
//                 }
//               >
//                 <i className="nav-icon fas fa-cogs"></i>
//                 <p>Orders</p>
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;
// src/components/Sidebar.js
import React,{useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";


const AdminSidebar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds
      console.log("Token",decodedToken);
      // If the token is expired, logout
      if (decodedToken.exp < currentTime) {
        console.log("Enter logout",decodedToken);
        handleLogout();
      }
    }
  };

 

  // Automatically check for token expiration on component mount and at intervals
  useEffect(() => {
    // Check for token expiration on initial render
    checkTokenExpiration();

    // Check for token expiration at regular intervals (e.g., every minute)
    const intervalId = setInterval(checkTokenExpiration, 60000); // 1 minute

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const handleLogout = () => {
    // localStorage.clear("auth");
    
    
    localStorage.clear("auth");
    localStorage.clear("token");
    console.log("session removed");
    
    // Clear the auth context
    setAuth({ user: null, token: "" });
    navigate("/login");
    // Redirect to login page
    
  }

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
