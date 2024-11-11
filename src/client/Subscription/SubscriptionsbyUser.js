import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function SubscriptionsbyUser() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Set default value to empty string

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch subscriptions on component mount or when page changes
  const fetchSubscriptions = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/subscription/${auth.user.userId}?page=${page}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setSubscriptions(response.data.subscriptions); // Set subscriptions data
      setTotalPages(response.data.totalPages); // Set total pages
      setCurrentPage(page); // Set current page
    } catch (err) {
      setError("Failed to fetch subscriptions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchSubscriptions(currentPage);
    }
  }, [auth, currentPage]);

  // Handle Page Change
  const handlePageChange = (page) => {
    fetchSubscriptions(page);
  };

  // Handle Previous Page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchSubscriptions(currentPage - 1);
    }
  };

  // Handle Next Page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchSubscriptions(currentPage + 1);
    }
  };

  // Handle Search Input Change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update searchQuery when input changes
  };

  // Filter subscriptions based on the search query
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    return (
      subscription.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.proposalId
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      subscription.subscriptionStatus
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            <div className="col-12 col-md-4 mb-2 mb-md-0">
              <h1 className="font-weight-bold">SubscriptionDetails</h1>
            </div>
            <div className="col-12 col-md-8 d-flex flex-column flex-md-row justify-content-md-end">
              <div className="form-group mb-2 mb-md-0 flex-grow-1 mr-md-3">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery} // Bind searchQuery to the input field
                    onChange={handleSearch} // Call handleSearch when input changes
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          {/* Loading and Error Messages */}
          {loading && (
            <div className="text-center" role="alert">
              Loading...
            </div>
          )}
          {error && (
            <div className="text-center" role="alert">
              {error}
            </div>
          )}

          {/* Subscription Table */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Proposal ID</th>
                      <th>Status</th>
                      <th>Final Amount</th>
                      <th>Subscription Date</th>
                      <th>Duration (months)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* If no error, map over filtered subscriptions */}
                    {!error &&
                      filteredSubscriptions.map((subscription) => (
                        <tr key={subscription._id}>
                          <td>{subscription.customer}</td>
                          <td>{subscription.proposalId}</td>
                          <td>{subscription.subscriptionStatus}</td>
                          <td>
                            {subscription.finalAmount}{" "}
                            {subscription.totalAmountCurrency}
                          </td>
                          <td>
                            {new Date(
                              subscription.subscriptionDate
                            ).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </td>
                          <td>{subscription.subscriptionDurationInMonths}</td>
                        </tr>
                      ))}

                    {/* If no subscriptions found and no error */}
                    {!loading &&
                      !error &&
                      filteredSubscriptions.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No subscriptions found.
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="mt-3">
                  <button
                    className="btn btn-outline-primary mr-2"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`btn mr-2 ${
                        currentPage === index + 1 ? "btn-primary" : "btn-light"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="btn btn-outline-primary"
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

export default SubscriptionsbyUser;
