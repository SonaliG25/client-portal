import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Routes from "../../utils/routeNames";
import { BASE_URL } from "../../utils/endPointNames.js";

function Products() {
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/product/getProducts?page=${currentPage}&limit=${productsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setTotalProducts(res.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getProduct();
    }
  }, [auth, currentPage, searchQuery]);

  const handleView = (data) => {
    navigate(`/admin-dashboard/viewproduct/${data._id}`);
  };

  const handleAddProduct = () => {
    navigate(Routes.NEW_PRODUCT);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStatusDotClass = (status) => {
    if (status === "Active") return "bg-success";
    if (status === "Inactive") return "bg-danger";
    if (status === "Retired") return "bg-warning";
    return "";
  };

  return (
    <div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row align-items-center justify-content-between my-3">
        <div className="col-md-4">
          <h1 className="text-left font-weight-bold">Product Catalog</h1>
        </div>
        <div className="col-md-8 d-flex justify-content-end">
          <div className="form-group mb-0 flex-grow-1 mr-3">
            <div className="input-group input-group-md">
              <input
                type="search"
                className="form-control form-control-md"
                placeholder="Search by Product Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search Products"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary btn-md" type="button">
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
          </div>
          <button onClick={handleAddProduct} className="btn btn-success ml-2">
            <i className="fas fa-plus mr-1"></i> Add Product
          </button>
        </div>
      </div>
    </div>
  </section>

  <div className="content container">
    <div className="row">
      {products.length > 0 ? (
        products.map((prod) => (
          <div className="col-md-4 mb-4" key={prod._id}>
            <div className="card shadow-sm h-100" onClick={() => handleView(prod)}>
              <img
                onError={(e) => (e.target.src = BASE_URL + "/uploads/placeholder.png")}
                src={BASE_URL + prod.imageUrl}
                className="card-img-top"
                alt={prod.name}
                style={{ height: "150px", objectFit: "contain" }}
              />
              <h5 className="card-title mt-2 ml-2 mr-2"><strong>{prod.name}</strong></h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-6 mb-3">
                    <p className="font-weight-bold mb-1">SKU:</p>
                    <p>{prod.sku}</p>
                    <p className="font-weight-bold mb-1">Cost ($):</p>
                    <p>{prod.cost}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <p className="font-weight-bold mb-1">Category:</p>
                    <p>{prod.category}</p>
                    <p className="font-weight-bold mb-1">Status:</p>
                    <p>
                      <span
                        className={`status-dot ${getStatusDotClass(prod.status)}`}
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      ></span>
                      {prod.status}
                    </p>
                  </div>
                  <div className="col-6 mb-3">
                    <p className="font-weight-bold mb-1">Active Subs:</p>
                    <p>{prod.activeSubs}</p>
                    <p className="font-weight-bold mb-1">Revenue Gen ($):</p>
                    <p>{prod.revenueGen}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <p className="font-weight-bold mb-1">Purchase Type:</p>
                    <p>{prod.purchaseType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">
          <p className="text-center">No products found</p>
        </div>
      )}
    </div>

    <div className="d-flex justify-content-center mt-4">
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
          className={`btn mr-2 ${currentPage === index + 1 ? "btn-primary" : "btn-light"}`}
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

  );
}

export default Products;
