import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function UserNavbar() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear("auth");
      setAuth({ user: null, token: "" });
      navigate("/login");
    }
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav ml-auto">
        {/* Logout Button */}
        <li className="nav-item">
          <button
            className="btn btn-danger" // Bootstrap danger button style
            onClick={handleLogout} // Call handleLogout on click
            aria-label="Logout" // Accessibility label
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="18"
              fill="currentColor"
              className="bi bi-box-arrow-right" // Changed class to className
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd" // Changed fill-rule to fillRule
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fillRule="evenodd" // Changed fill-rule to fillRule
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavbar;