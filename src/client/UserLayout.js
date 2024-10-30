import React, { useEffect, useState } from "react";
import UserSidebar from "./UserSidebar.js";
import UserNavbar from "./UserNavbar.js";

import { Outlet, useNavigate } from "react-router-dom";
function UserLayout() {
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
  return (
    <div
      className={`${
        isMobile
          ? "sidebar-mini sidebar-closed sidebar-collapse"
          : "sidebar-mini"
      }`}
    >
      <div className={`wrapper`}>
        <UserNavbar />
        <UserSidebar />
        {/* Content section where child routes/components will be displayed */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
