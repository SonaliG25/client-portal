import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
const ClientDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("auth");
    setAuth({ user: null, token: "" });
    navigate("/login");
  };
  return (
    <div className="p-5 flex justify-between">
      <h1 className="text-3xl font-bold">Client Dashboard</h1>
      <button
        className="bg-red-500 px-5 rounded-sm py-2 "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ClientDashboard;
