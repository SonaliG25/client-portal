import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

function Userlist() {
  const [auth, setAuth] = useAuth();
  const [userdata, setUserdata] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Fixed number of items per page
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [totalPages, setTotalPages] = useState(0);

  const getUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/user/users?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setUserdata(res.data.data);
      setTotalPages(res.data.totalPages);
      console.log("userdata", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getUser();
    }
  }, [auth, currentPage, searchQuery]);

  return (
    <div className="content-wrapper">
      {/* Content Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Clients</h1>
            </div>
            <div className="col-sm-6">
              <form className="w-100">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search by First Name, Last Name, or Phone"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row m-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  {!userdata ? (
                    <div className="table-responsive">
                      <table
                        id="example2"
                        className="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Phone</th>
                            <th>User Type</th>
                            <th>Number of Subscriptions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: itemsPerPage }).map(
                            (_, index) => (
                              <tr key={index}>
                                <td
                                  className="line loading-shimmer"
                                  style={{ height: "70px" }}
                                  colSpan="5"
                                >
                                  &nbsp;
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table
                        id="example2"
                        className="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Phone</th>
                            <th>User Type</th>
                            <th>Number of Subscriptions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userdata?.map((data) => (
                            <tr key={data._id}>
                              <td>{data.lastName}</td>
                              <td>{data.firstName}</td>
                              <td>{data.phone}</td>
                              <td>{data.userType}</td>
                              <td>{data.subscription.length}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Pagination Controls */}
                      <div className="pagination m-2">
                        <button
                          className="btn btn-primary m-1"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`btn m-1 ${
                              currentPage === index + 1
                                ? "bg-primary"
                                : "btn-light"
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          className="btn btn-primary m-1"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Userlist;
