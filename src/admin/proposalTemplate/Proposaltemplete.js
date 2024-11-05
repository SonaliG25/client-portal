import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEditUserContext } from "../../context/EditUserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";

const Proposaltemplete = () => {
  const [proposalTemplateDetails, setProposalTempleteDetails] =
    useEditUserContext();
  const [loader, setLoader] = useState(true);
  const [proposalTemplete, setProposalTemplete] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const [auth] = useAuth();

  // Fetch templates from the API
  const getProposalTemplete = async () => {
    setLoader(true); // Show loader while fetching
    try {
      const res = await axios.get(
        `http://localhost:3000/proposalTemplate/templates?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setProposalTemplete(res.data.templates);
      setTotalPages(res.data.totalPages);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  // Fetch data on component mount and when search or page changes
  useEffect(() => {
    if (auth?.token) {
      getProposalTemplete();
    }
  }, [auth, searchQuery, currentPage]);

  const handleUpdateForm = (data) => {
    //setProposalTempleteDetails(data);
    navigate(`/admin-dashboard/updateproposaltemplete/${data._id}`);
  };

  const HandleView = (data) => {
    //setProposalTempleteDetails(data);
    console.log(data);
    navigate(`/admin-dashboard/viewproposaltemplete/${data._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/proposalTemplate/templates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      getProposalTemplete(); // Re-fetch templates after delete
      toast.success("Templete Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination controls
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClick = () => {
    navigate("/admin-dashboard/newproposaltemplete");
  };

  return (
    <div className="content-wrapper">
       <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            {/* Title */}
            <div className="col-12 col-md-4 mb-2 mb-md-0">
              <h1 className="font-weight-bold">Proposal Template</h1>
            </div>

            {/* Search Bar and Add Button */}
            <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-md-end">
              {/* Search Bar */}
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
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add Proposal Button */}
              <button
                onClick={handleClick}
                className="btn btn-success mt-2 mt-md-0"
              >
                <i className="fas fa-plus mr-1"></i> Add Proposal Template
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        <div className="row m-2">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                {loader ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            {/* <th>Status</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th> */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {proposalTemplete.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No matching templates found
                              </td>
                            </tr>
                          ) : (
                            proposalTemplete.map((data) => (
                              <tr key={data._id}>
                                <td>{data.title}</td>
                                <td>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: `${data.description.slice(0, 200)}...`,
                                    }}
                                  />
                                </td>
                                {/* <td>{data.status}</td>
                                <td>{moment(data.createdAt).format("MMMM DD, YYYY")}</td>
                                <td>{moment(data.updatedAt).format("MMMM DD, YYYY")}</td> */}
                                <td>
                                  <div className="d-flex justify-content-center">
                                    <button
                                      className="m-1 btn btn-primary"
                                      onClick={() => HandleView(data)}
                                    >
                                      View
                                    </button>
                                    <button
                                      className="m-1 btn btn-danger"
                                      onClick={() => handleDelete(data._id)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="m-1 btn btn-dark"
                                      onClick={() => handleUpdateForm(data)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Proposaltemplete;
