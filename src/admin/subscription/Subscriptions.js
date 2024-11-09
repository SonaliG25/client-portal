import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Subscriptions = () => {
  const [loader, setLoader] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();
  const [auth] = useAuth();

  // Fetch orders from the API
  const getOrders = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/order/allOrders?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setOrders(res.data.data);
      setTotalPages(res.data.totalPages);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
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
    navigate(`/admin-dashboard/orders/${data._id}`);
  };
  const handleUpdateOrder = (data) => {
    navigate(`/admin-dashboard/orders/update/${data._id}`);
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
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => getOrders()}
                    >
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
        <div className="card">
          <div className="card-body">
            {loader ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Products</th>
                        <th>Shipping Address</th>
                        <th>Payment Method</th>
                        <th>Payment Status</th>
                        <th>Order Status</th>
                        <th>Shipping Cost</th>
                        <th>Total Amount</th>
                        <th>Discount</th>
                        <th>Grand Total</th>
                        <th>Order Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="11" className="text-center">
                            No matching orders found
                          </td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order._id}>
                            <td>{order.customer?.name || "N/A"}</td>
                            <td>
                              <div className="d-flex flex-column flex-md-row">
                                <button
                                  className="btn btn-primary m-1"
                                  onClick={() => handleViewOrder(order)}
                                >
                                  <i className="fas fa-file-alt"></i>
                                </button>
                                <button
                                  className="btn btn-success m-1"
                                  onClick={() => handleUpdateOrder(order)}
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                              </div>
                            </td>
                            <td>
                              {order.shippingAddress?.addressLine1},{" "}
                              {order.shippingAddress?.addressLine2},{" "}
                              {order.shippingAddress?.city},{" "}
                              {order.shippingAddress?.state},{" "}
                              {order.shippingAddress?.postalCode},{" "}
                              {order.shippingAddress?.country}
                            </td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.paymentStatus}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.shippingCost}</td>
                            <td>
                              {order.totalAmountCurrency} {order.totalAmount}
                            </td>
                            <td>{order.discount}</td>
                            <td>
                              {order.grandTotalCurrency} {order.grandTotal}
                            </td>
                            <td>
                              {moment(order.orderDate).format("MMMM DD, YYYY")}
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
