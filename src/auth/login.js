import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Add this package to decode JWT tokens
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Check if token has expired
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds
      console.log("Token", decodedToken);
      // If the token is expired, logout
      if (decodedToken.exp < currentTime) {
        console.log("Enter logout", decodedToken);
        logout();
      }
    }
  };

  // Logout function
  const logout = () => {
    // Remove token and user data from local storage
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    console.log("session removed");

    // Clear the auth context
    setAuth(null);

    // Redirect to login page
    navigate("/login");
  };

  // Automatically check for token expiration on component mount and at intervals
  useEffect(() => {
    // Check for token expiration on initial render
    checkTokenExpiration();

    // Check for token expiration at regular intervals (e.g., every minute)
    const intervalId = setInterval(checkTokenExpiration, 60*1000*10); // 1 minute

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log("Loginnnnnm");

    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Store token and user info
        localStorage.setItem("auth", JSON.stringify(response.data.userInfo));
        localStorage.setItem("token", response.data.token);

        setAuth({
          user: response.data.userInfo,
          token: response.data.token,
        });
        toast.success("login Suceessfully");
        // Redirect to appropriate dashboard
        response.data.userInfo.role === "admin"
          ? navigate("/admin-dashboard")
          : navigate("/user-dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError("Login failed. Please try again.");
      } else {
        setError("An error occurred. Please check your network and try again.");
      }
    }
  };

  return (
    <div
      className="hold-transition login-page"
      style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
    >
      <div className="login-box">
        <div className="login-logo">
          <a href="/">
            <b>AppName</b>
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            {/* <p className="mb-1">
              <a href="#">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="/register" className="text-center">
                Register a new membership
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
