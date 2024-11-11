import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BASE_URL } from "../../utils/endPointNames.js";

const Subscriptions = () => {
  const [loader, setLoader] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [auth] = useAuth();

  // Fetch orders from the API
  const getSubscriptions = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/subscription/allSubscriptions?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setSubscriptions(res.data.data);
      console.log("res.data.data", res.data.data);

      setTotalPages(res.data.totalPages);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getSubscriptions();
    }
  }, [auth, searchQuery, currentPage]);

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

  const handleViewOrder = (data) => {
    navigate(`/admin-dashboard/subscription/${data._id}`);
  };

  const handleUpdateOrder = (data) => {
    navigate(`/admin-dashboard/subscription/${data._id}`);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            <div className="col-12 col-md-4 mb-2 mb-md-0">
              <h1 className="font-weight-bold">Subscriptions</h1>
            </div>
            <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-md-end">
              <div className="form-group mb-2 mb-md-0 flex-grow-1 mr-md-3">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search by Product Name or Status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-body">
            {loader ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Customer Name</th>
                        <th>Product Name(s)</th>
                        <th>Created On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.length === 0 ? (
                        <tr>
                          <td colSpan="11" className="text-center">
                            No matching subscriptions found
                          </td>
                        </tr>
                      ) : (
                        subscriptions.map((subscription) => (
                          <tr key={subscription._id}>
                            <td>{subscription.customer?.name || "N/A"}</td>
                            <td>
                              {subscription.products &&
                              subscription.products.length > 0 ? (
                                subscription.products.map((product, index) => (
                                  <p key={index}>
                                    {product.productId.name ||
                                      "No Name Available"}
                                  </p>
                                ))
                              ) : (
                                <p>No products</p>
                              )}
                            </td>
                            <td>
                              {new Date(subscription.createdAt).toLocaleString(
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
                            <td>
                              <div className="d-flex flex-column flex-md-row">
                                <button
                                  className="btn btn-primary m-1"
                                  onClick={() => handleViewOrder(subscription)}
                                >
                                  <i className="fas fa-file-alt"></i>
                                </button>
                                {/* <button
                                  className="btn btn-success m-1"
                                  onClick={() =>
                                    handleUpdateOrder(subscription)
                                  }
                                >
                                  <i className="fas fa-edit"></i>
                                </button> */}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

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
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscriptions;
