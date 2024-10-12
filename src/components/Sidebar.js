// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { UserRoles } from "../constants/roles";

// const Sidebar = ({ userRole }) => {
//   return (
//     <nav>
//       <ul>
//         {/* Always visible Dashboard link */}
//         <li>
//           <Link to="/">Dashboard</Link>
//         </li>

//         {/* Links for ADMIN role */}
//         {userRole === UserRoles.ADMIN && (
//           <>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//             <li>
//               <Link to="/orders">orders</Link>
//             </li>
//             <li>
//               <Link to="/reports">Reports</Link> {/* New link for Reports */}
//             </li>
//             <li>
//               <Link to="/analytics">Analytics</Link>{" "}
//               {/* New link for Analytics */}
//             </li>
//           </>
//         )}

//         {/* Links for MANAGER role */}
//         {userRole === UserRoles.MANAGER && (
//           <>
//             <li>
//               <Link to="/projects">Projects</Link> {/* New link for Projects */}
//             </li>
//             <li>
//               <Link to="/teams">Teams</Link> {/* New link for Teams */}
//             </li>
//             <li>
//               <Link to="/orders">orders</Link>
//             </li>
//             <li>
//               <Link to="/reports">Reports</Link> {/* New link for Reports */}
//             </li>
//           </>
//         )}

//         {/* Links for DEVELOPER role */}
//         {userRole === UserRoles.DEVELOPER && (
//           <>
//             <li>
//               <Link to="/code-reviews">Code Reviews</Link>{" "}
//               {/* New link for Code Reviews */}
//             </li>
//             <li>
//               <Link to="/issues">Issues</Link> {/* New link for Issues */}
//             </li>
//             <li>
//               <Link to="/documentation">Documentation</Link>{" "}
//               {/* New link for Documentation */}
//             </li>
//           </>
//         )}

//         {/* Links for CLIENT role */}
//         {userRole === UserRoles.CLIENT && (
//           <>
//             <li>
//               <Link to="/projects">My Projects</Link>{" "}
//               {/* New link for Client's Projects */}
//             </li>
//             <li>
//               <Link to="/invoices">Invoices</Link> {/* New link for Invoices */}
//             </li>
//             <li>
//               <Link to="/support">Support</Link> {/* New link for Support */}
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

const Sidebar = () => {
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
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item ">
              <Link to="/" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Proposals</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/newUser" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>NewUser</p>
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

export default Sidebar;
