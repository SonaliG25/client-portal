import React from "react";
import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

import { Outlet, useNavigate } from "react-router-dom";
function UserLayout() {
  return (
    <div className=" wrapper">
      <UserNavbar />
      <UserSidebar />
      {/* Content section where child routes/components will be displayed */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
