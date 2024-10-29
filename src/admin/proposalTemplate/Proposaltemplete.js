import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEditUserContext } from "../../context/EditUserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Proposaltemplete = () => {
  const [proposalTemplateDetails, setProposalTempleteDetails] =
    useEditUserContext();
  const [loader, setLoader] = useState(true);
  const [proposalTemplete, setProposalTemplete] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleClick = () => {
    navigate("/admin-dashboard/newproposaltemplete");
  };

  const getProposalTemplete = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/proposalTemplate/templates`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setProposalTemplete(res.data);
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getProposalTemplete();
    }
  }, [auth]);

  const handleUpdateForm = (data) => {
    setProposalTempleteDetails(data);
    navigate("/admin-dashboard/updateproposaltemplete");
  };

  const HandleView = (data) => {
    setProposalTempleteDetails(data);
    navigate("/admin-dashboard/viewproposaltemplete");
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/proposalTemplate/templates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      getProposalTemplete();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTemplates = proposalTemplete?.filter((template) => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = template.title.toLowerCase().includes(searchLower);
    const descriptionMatch = template.description
      .replace(/<\/?[^>]+(>|$)/g, "")
      .toLowerCase()
      .includes(searchLower);
    const statusMatch = template.status.toLowerCase().includes(searchLower);
    const createdAtMatch = moment(template.createdAt)
      .format("MMMM DD, YYYY")
      .toLowerCase()
      .includes(searchLower);
    const updatedAtMatch = moment(template.updatedAt)
      .format("MMMM DD, YYYY")
      .toLowerCase()
      .includes(searchLower);

    return (
      titleMatch ||
      descriptionMatch ||
      statusMatch ||
      createdAtMatch ||
      updatedAtMatch
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTemplates = filteredTemplates?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredTemplates?.length / itemsPerPage);

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

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            {/* Title */}
            <div className="col-md-4">
              <h1 className="text-left">Proposal Template</h1>
            </div>

            {/* Add Button and Search Bar */}
            <div className="col-md-8 d-flex justify-content-end">
              {/* Search Bar */}
              <div className="form-group mb-0 flex-grow-1 mr-3">
                {" "}
                {/* Add mr-3 here */}
                <div className="input-group input-group-md">
                  <input
                    type="search"
                    className="form-control form-control-md"
                    placeholder="Search by Title, Status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary btn-md"
                      type="button"
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add Proposal Button */}
              <button onClick={handleClick} className="btn btn-success">
                Add Proposal Template
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Main content */}
      <section className="content">
        {/* Table Content */}
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
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>CreatedAt</th>
                          <th>UpdatedAt</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTemplates.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No matching templates found
                            </td>
                          </tr>
                        ) : (
                          currentTemplates?.map((data) => (
                            <tr key={data._id}>
                              <td>{data.title}</td>
                              <td>
                                {data.description.replace(
                                  /<\/?[^>]+(>|$)/g,
                                  ""
                                )}
                              </td>
                              <td>{data.status}</td>
                              <td>
                                {moment(data.createdAt).format("MMMM DD, YYYY")}
                              </td>
                              <td>
                                {moment(data.updatedAt).format("MMMM DD, YYYY")}
                              </td>
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
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => handleDelete(data?._id)}
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

                    {/* Pagination Controls */}
                    <div className="pagination d-flex justify-content-between m-2">
                      <button
                        className="btn btn-outline-secondary"
                        disabled={currentPage === 1}
                        onClick={handlePreviousPage}
                      >
                        Previous
                      </button>
                      <span className="align-self-center">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        className="btn btn-outline-secondary"
                        disabled={currentPage === totalPages}
                        onClick={handleNextPage}
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
