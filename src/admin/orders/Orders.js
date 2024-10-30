import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  Table,
  Button,
  Input,
  InputGroup,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
} from "reactstrap";

const Orders = () => {
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

  const handleUpdateForm = (data) => {
    navigate("/admin-dashboard/update-order");
  };

  const handleView = (data) => {
    navigate("/admin-dashboard/view-order");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/order/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      getOrders();
    } catch (error) {
      console.error(error);
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
    navigate("/admin-dashboard/new-order");
  };

  return (
    <Container className="content-wrapper my-4">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            {/* Title */}
            <div className="col-12 col-md-4 mb-2 mb-md-0">
              <h1 className="font-weight-bold">Orders</h1>
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
              {/* <button
                onClick={handleAddProposal}
                className="btn btn-success mt-2 mt-md-0"
              >
                <i className="fas fa-plus mr-1"></i> Add Proposal
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <Row>
        <Col xs="12">
          <div className="card">
            <div className="card-body">
              {loader ? (
                <div className="text-center">
                  <Spinner color="primary" />
                </div>
              ) : (
                <>
                  <Table bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Total Amount</th>
                        <th>Order Status</th>
                        <th>Payment Status</th>
                        <th>Order Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No matching templates found
                          </td>
                        </tr>
                      ) : (
                        orders.map((data) => (
                          <tr key={data._id}>
                            <td className="text-center">{data.customer}</td>
                            <td className="text-center">
                              {data.grandTotalCurrency}{data.grandTotal}
                            </td>
                            <td className="text-center">{data.orderStatus}</td>
                            <td className="text-center">{data.paymentStatus}</td>
                            <td className="text-center">
                              {moment(data.orderDate).format('MMMM DD, YYYY')}
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <Button
                                  className="m-1"
                                  color="primary"
                                  onClick={() => handleView(data)}
                                >
                                  View
                                </Button>
                                <Button
                                  className="m-1"
                                  color="danger"
                                  onClick={() => handleDelete(data._id)}
                                >
                                  Delete
                                </Button>
                                <Button
                                  className="m-1"
                                  color="dark"
                                  onClick={() => handleUpdateForm(data)}
                                >
                                  Edit
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>

                  {/* Pagination Controls */}
                  <div className="d-flex ">
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
                            onClick={handleNextPage}
                          >
                            Next
                          </button>
                        </div>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;
