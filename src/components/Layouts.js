// React Router's Navigate is used for redirection, Outlet is for nested routes
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";

import { AuthContext } from "../context/AuthContext";
import { UserRoles } from "../constants/roles";
// Main Layout component for wrapping other routes/pages with a common structure
function ClientLayout() {
  return (
    <div className="wrapper">
      Preloader
      <div className="preloader flex-column justify-content-center align-items-center">
        <img
          className="animation__shake"
          src="img/AdminLTELogo.png"
          alt="AdminLTELogo"
          height={60}
          width={60}
        />
      </div>
      <Navbar />
      <Sidebar />
      {/* Content section where child routes/components will be displayed */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function Layout() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  if (currentUser.role === UserRoles.ADMIN) return AdminLayout();
  else return ClientLayout();
}
function AdminLayout() {
  <div className="wrapper">
    Preloader
    <div className="preloader flex-column justify-content-center align-items-center">
      <img
        className="animation__shake"
        src="img/AdminLTELogo.png"
        alt="AdminLTELogo"
        height={60}
        width={60}
      />
    </div>
    <Navbar />
    <Sidebar />
    {/* Content section where child routes/components will be displayed */}
    <div className="content">
      <Outlet />
    </div>
  </div>;
}
// Export the components for use in other parts of the application
export { ClientLayout, AdminLayout, Layout };
