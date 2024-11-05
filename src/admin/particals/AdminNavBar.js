import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("auth");
    setAuth({ user: null, token: "" });
    toast.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light"></nav>
  );
};

export default AdminNavbar;
