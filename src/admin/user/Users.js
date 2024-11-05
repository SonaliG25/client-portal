import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEditUserContext } from "../../context/EditUserContext.jsx";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [auth] = useAuth();
  // const [UserDetails, setUserDetails] = useEditUserContext();
  const [userdata, setUserdata] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const getUser = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.get(
        `http://localhost:3000/user/users?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setUserdata(res.data.data); // Assuming 'data' contains the user list
      setTotalPages(res.data.totalPages); // Assuming 'totalPages' is in the response
      setLoading(false); // Stop loading after successful response
    } catch (error) {
      console.error(error);
      setLoading(false); // Stop loading after an error
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      getUser(); // Refresh the user list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getUser();
    }
  }, [auth, currentPage, searchQuery]);

  const handleAddUser = () => {
    navigate("/admin-dashboard/newuser");
  };

  const HandleView = (data) => {
    // setUserDetails(data);
    navigate(`/admin-dashboard/view/${data._id}`);
  };

  const handleUpdateForm = (data) => {
    // setUserDetails(data);
    navigate(`/admin-dashboard/Update/${data._id}`);
  };

  const handleDeleteID = (id) => {
    setDeleteId(id);
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-between my-3">
              <div className="col-12 col-md-4 mb-2 mb-md-0">
                <h1 className="font-weight-bold">Clients</h1>
              </div>
              <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-md-end">
                <div className="form-group mb-2 mb-md-0 flex-grow-1 mr-md-3">
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search by Product Name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                      >
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleAddUser}
                  className="btn btn-success mt-2 mt-md-0"
                >
                  <i className="fas fa-plus mr-1"></i> Add Client
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row m-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : userdata.length === 0 ? (
                      <div className="text-center">
                        <p>No data found</p>
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
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userdata.map((data) => (
                              <tr key={data._id}>
                                <td>{data.lastName}</td>
                                <td>{data.firstName}</td>
                                <td>{data.phone}</td>
                                <td>{data.userType}</td>
                                <td>{data.subscription.length}</td>
                                <td>
                                  <div className="d-flex justify-content-center m-2">
                                    <button
                                      className="btn btn-primary px-4 py-2 m-1"
                                      onClick={() => HandleView(data)}
                                    >
                                      View
                                    </button>
                                    <button
                                      className="btn btn-danger px-4 py-2 m-1"
                                      data-toggle="modal"
                                      data-target="#exampleModalCenter"
                                      onClick={() => handleDeleteID(data._id)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-dark px-4 py-2 m-1"
                                      onClick={() => handleUpdateForm(data)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="d-flex ">
                          <button
                            className="btn btn-outline-primary mr-2"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <button
                              key={index + 1}
                              onClick={() => setCurrentPage(index + 1)}
                              className={`btn mr-2 ${
                                currentPage === index + 1
                                  ? "btn-primary"
                                  : "btn-light"
                              }`}
                            >
                              {index + 1}
                            </button>
                          ))}
                          <button
                            className="btn btn-outline-primary"
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
    </>
  );
};

export default Users;
