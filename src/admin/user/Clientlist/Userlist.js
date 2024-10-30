import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";

function Userlist() {
  const [auth, setAuth] = useAuth();
  const [userdata, setUserdata] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Fixed number of items per page
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/users`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setUserdata(res.data);
      console.log("userdata", res.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Filter the userdata based on search query
  const filteredUsers = userdata?.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    return fullName.includes(searchLower) || user.phone.includes(searchQuery);
  });

  // Calculate the current data to display based on pagination
  const indexOfLastUser = currentPage * itemsPerPage; // Last user index
  const indexOfFirstUser = indexOfLastUser - itemsPerPage; // First user index
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser); // Users for the current page

  // Calculate total pages
  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);
  useEffect(() => {
    if (auth?.token) {
      getUser();
    }
  });
  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="m-2 d-flex justify-content-center align-items-center">
              <h2 className=" py-2 text-center">Clients</h2>

              <form className="flex-grow-1 mr-2 ">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="form-group mb-0">
                      <div className="input-group input-group-md">
                        <input
                          type="search"
                          className="form-control form-control-md"
                          placeholder="Search by First Name, Last Name or Phone"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-md btn-outline-secondary"
                            type="button"
                          >
                            <i className="fa fa-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="row m-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {!userdata ? (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <>
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th>Last Name</th>
                              <th>First Name</th>
                              <th>Phone</th>
                              <th>UserType</th>
                              <th>Number of Subscriptions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentUsers?.map((data) => (
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
                            className="text-blue"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <button
                              key={index + 1}
                              onClick={() => setCurrentPage(index + 1)}
                              className={`text-blue ${
                                currentPage === index + 1
                                  ? "active bg-blue"
                                  : ""
                              }`}
                            >
                              {index + 1}
                            </button>
                          ))}
                          <button
                            className="text-blue"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Userlist;
