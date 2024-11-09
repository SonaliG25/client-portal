import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
// import { useEditUserContext } from "../../context/EditUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Routes from "../../utils/routeNames";

import { BASE_URL } from "../../utils/endPointNames.js";

function Proposals() {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const [proposals, setProposals] = useState([]);
  // Pagination variablees
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [proposalsPerPage] = useState(6);
  const [totalProposals, setTotalProposals] = useState(0);

  //Search for Proposal
  const [searchQuery, setSearchQuery] = useState("");
  // const filteredProposals = proposals.filter((proposal) =>
  //   // proposal.name.includes(searchQuery)
  // );

  const handleAddProposal = () => {
    navigate(Routes.NEW_PROPOSAL);
  };

  const HandleView = (data) => {
    // setUserDetails(data);
    navigate(`/admin-dashboard/proposal/${data._id}`);
  };
  const getProposals = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/proposal/proposals?page=${currentPage}&limit=${proposalsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log("proposals", res.data.proposals);

      setProposals(res.data.proposals);
      setTotalPages(res.data.totalPages);
      setTotalProposals(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProposals / proposalsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      getProposals();
    }
  }, [auth, currentPage, searchQuery]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            {/* Title */}
            <div className="col-12 col-md-4 mb-2 mb-md-0">
              <h1 className="font-weight-bold">Proposals</h1>
            </div>

            {/* Search Bar and Add Button */}
            <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-md-end">
              {/* Search Bar */}
              <div className="form-group mb-2 mb-md-0 flex-grow-1 mr-md-3">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
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
                onClick={handleAddProposal}
                className="btn btn-success mt-2 mt-md-0"
              >
                <i className="fas fa-plus mr-1"></i> Add Proposal
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
              <div className="card-body table-responsive p-4">
                <table
                  id="example2"
                  className="table table-bordered table-hover"
                >
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>Sent To</th>
                      <th>Title</th>
                      <th>Sent On</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Dynamic data or fallback message */}
                    {proposals.length > 0 ? (
                      proposals.map((proposal) => (
                        <tr key={proposal.id}>
                          <td>{proposal.emailTo}</td>
                          <td>{proposal.title}</td>
                          <td>
                            {new Date(proposal.createdAt).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </td>
                          <td>{proposal.status}</td>
                          <td>
                            <button
                              onClick={() => HandleView(proposal)}
                              className="btn btn-primary btn-sm m-1"
                            >
                              <i className="fas fa-file-alt"></i>
                            </button>
                            {/* <div className="d-flex justify-content-center m-2">
                              

                              {/* <button className="btn btn-warning btn-sm m-1">
                                <i className="fas fa-edit"></i>
                              </button> 
                            </div> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No matching Proposal found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="d-flex mt-3 flex-column flex-md-row">
                  <button
                    className="btn btn-outline-primary mr-2"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`btn mr-2 mt-2 mt-md-0 ${
                        currentPage === index + 1 ? "btn-primary" : "btn-light"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="btn btn-outline-primary mt-2 mt-md-0"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Proposals;
