import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (auth?.user) {
      auth.user.role === "admin"
        ? navigate("/admin-dashboard")
        : navigate("/user-dashboard");
    }
  }, [auth, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      console.log("loginnnnn");
      if (response.status === 200) {
        localStorage.setItem("auth", JSON.stringify(response.data.userInfo));
        localStorage.setItem("token", response.data.token);
        setAuth({
          user: response.data.userInfo,
          token: response.data.token,
        });

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
                <div className="col-8">
                  {/* <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div> */}
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <p className="mb-1">
              <a href="#">I forgot my password</a>
            </p>
            <p className="mb-0">
              <a href="/register" className="text-center">
                Register a new membership
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
