import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Check if token has expired
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds
      console.log("Token",decodedToken);
      // If the token is expired, logout
      if (decodedToken.exp < currentTime) {
        console.log("Enter logout",decodedToken);
        handleLogout();
      }
    }
  };

 

  // Automatically check for token expiration on component mount and at intervals
  useEffect(() => {
    // Check for token expiration on initial render
    checkTokenExpiration();

    // Check for token expiration at regular intervals (e.g., every minute)
    const intervalId = setInterval(checkTokenExpiration, 60000); // 1 minute

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const handleLogout = () => {
    // localStorage.clear("auth");
    
    
    localStorage.clear("auth");
    localStorage.clear("token");
    console.log("session removed");
    
    // Clear the auth context
    setAuth({ user: null, token: "" });s
    navigate("/login");
    // Redirect to login page
    
  };
  return (
    <>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav ml-auto">
          {/* Logout Button */}
          <li className="nav-item">
            <button
              className="btn btn-danger" // Bootstrap danger button style
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="18"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      {/* logout modle */}
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Launch demo modal
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Logout
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Are you sure you want to logout?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
