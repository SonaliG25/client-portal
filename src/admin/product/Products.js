import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEditUserContext } from "../../context/EditUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Routes from "../../utils/routeNames";

import { BASE_URL } from "../../utils/routeNames.js";

function Products() {
  const [productDetails, setProductDetails] = useEditUserContext();
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/product/getProducts`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setProducts(res.data);
      console.log("Product Data:", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getProduct();
    }
  }, [auth]);

  const handleView = (data) => {
    setProductDetails(data);
    navigate("/admin-dashboard/viewproduct");
  };
  const handleClick = () => {
    navigate(Routes.NEW_PRODUCT);
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            {/* Title */}
            <div className="col-md-4">
              <h1 className="text-left">Product Catalog</h1>
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
                    placeholder="Search by Product Name"
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
                Add Product
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="content container">
        {/* <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Product Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}

        <div className="row">
          {currentProducts.map((product) => (
            <div
              className="col-md-3"
              key={product.id}
              onClick={() => handleView(product)}
            >
              <div className="card mb-4 shadow-sm">
                <img
                  src={BASE_URL + product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center my-4">
          <button
            className="btn btn-primary"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredProducts.length / productsPerPage)}
          </span>
          <button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={
              currentPage ===
              Math.ceil(filteredProducts.length / productsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
