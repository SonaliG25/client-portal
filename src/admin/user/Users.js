import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Routes from "../../utils/routeNames";

const Users = () => {
  const [auth] = useAuth();
  const [userdata, setUserdata] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    setLoading(true);
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
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDelete = async (data) => {
    try {
      await axios.delete(`http://localhost:3000/user/${data}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      toast.success("Deleted Successfully");
      getUser();
    } catch (error) {
      toast.error("Unable to delete");
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getUser();
    }
  }, [auth, currentPage, searchQuery]);

  const handleAddUser = () => {
    navigate(Routes.NEW_USER);
  };

  const HandleView = (data) => {
    navigate(`/admin-dashboard/view/${data._id}`);
  };

  const handleUpdateForm = (data) => {
    navigate(`/admin-dashboard/Update/${data._id}`);
  };

  const handleSupportChat = () => {
  //  navigate(Routes.CHATS);
  navigate('/chats')
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
                      placeholder="Search..."
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
                              <th className="text-center">Active Account</th>
                              <th>ClientName</th>
                              <th>Address</th>
                              <th>Timezone</th>
                              <th className="text-center">
                                Prefered Contact Method
                              </th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userdata.map((data) => (
                              <tr key={data._id}>
                                <td className="text-center">
                                  <span
                                    className={`badge online ${
                                      data.activeAccount
                                        ? "badge-success"
                                        : "badge-danger"
                                    }`}
                                  >
                                    &nbsp;
                                  </span>
                                </td>
                                <td>
                                  <div>{data?.businessDetails?.clientName}</div>
                                  <b>
                                    {data?.businessDetails?.companyType}
                                  </b>{" "}
                                </td>
                                <td>
                                  {data?.address?.street1},
                                  {data?.address?.state},
                                  {data?.address?.country}
                                </td>
                                <td>{data?.timeZone}</td>
                                <td>{data?.preferredContactMethod}</td>
                                <td>
                                  <div className="d-flex justify-content-center m-2">
                                    <button
                                      className="btn btn-primary btn-sm m-1"
                                      onClick={() => HandleView(data)}
                                    >
                                      <i className="fas fa-file-alt"></i>
                                    </button>
                                    <button
                                      className="btn btn-danger btn-sm m-1"
                                      data-toggle="modal"
                                      data-target="#exampleModalCenter"
                                      onClick={() => handleDelete(data._id)}
                                    >
                                      <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <button
                                      className="btn btn-dark btn-sm m-1"
                                      onClick={() => handleUpdateForm(data)}
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                      className="btn btn-info btn-sm m-1"
                                      onClick={handleSupportChat}
                                    >
                                      <i className="fas fa-comments"></i>
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
