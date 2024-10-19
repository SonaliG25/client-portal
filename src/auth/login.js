import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Placeholder login logic, replace with actual authentication logic
    const response = await axios.post(
      "https://client-portal-server-b7rq.onrender.com/user/login",
      {
        email,
        password,
      }
    );
    if (response.status === 200) {
      console.log("res", response);
      localStorage.setItem("auth", {
        user: response.data.userInfo,
        token: response.data.token,
      });
      setAuth({
        user: response.data.userInfo,
        token: response.data.token,
      });
      response.data.userInfo.role == "admin"
        ? navigate("/admin-dashboard")
        : navigate("/user-dashboard"); // Redirect to the dashboard or home page
    } else {
      setError("Invalid email or password");
    }
    // console.log(err);
    // setError("An error occurred, please try again later");
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
              {error && (
                <div className="text-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>

                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>

            <div className="social-auth-links text-center mb-3">
              <p>- OR -</p>
              {/* <a href="#" className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
              </a> */}
              {/* <a href="#" className="btn btn-block btn-danger">
                <i className="fab fa-google-plus mr-2"></i> Sign in using
                Google+
              </a> */}
            </div>

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

//  default Login;
