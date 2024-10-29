import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEditUserContext } from "../../context/EditUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Routes from "../../utils/routeNames";

import { BASE_URL } from "../../utils/routeNames.js";

function Products() {
  const [productDetails, setProductDetails] = useEditUserContext();
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [auth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(0); // Track total products
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/product/getProducts?page=${currentPage}&limit=${productsPerPage}&search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setProducts(res.data.products); // Set products from the response
      setTotalProducts(res.data.total); // Set total product count from response
      console.log("Product Data:", res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getProduct();
    }
  }, [auth, currentPage, searchQuery]); // Add currentPage and searchQuery to dependencies

  const handleView = (data) => {
    setProductDetails(data);
    console.log("hhgb", productDetails);

    navigate("/admin-dashboard/viewproduct");
  };
  const handleAddProduct = () => {
    navigate(Routes.NEW_PRODUCT);
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

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

  // const makePayment= async()=>{
  //   const stripe = await loadStripe("company stripe token")

  //   const body ={
  //     products:cart
  //   }

  //   const
  // }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            {/* Title */}
            <div className="col-md-4">
              <h1 className="text-left font-weight-bold">Product Catalog</h1>
            </div>

            {/* Search Bar and Add Button */}
            <div className="col-md-8 d-flex justify-content-end">
              {/* Search Bar */}
              <div className="form-group mb-0 flex-grow-1 mr-3">
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

              {/* Add Product Button */}
              <button
                onClick={handleAddProduct}
                className="btn btn-success ml-2"
              >
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
              <div
                className="col-md-4"
                key={prod._id}
                onClick={() => handleView(prod)}
              >
                <div className="card mb-4 shadow-sm">
                  <img
                    src={
                      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                    }
                    className="card-img"
                    alt={prod.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text">{prod.category}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>

        <div className="d-flex align-items-center my-4">
          <button
            className="btn btn-outline-primary"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <i className="fas fa-arrow-left mr-1"></i> Previous
          </button>
          <span className="m-2">
            {currentPage} / {Math.ceil(totalProducts / productsPerPage)}
          </span>
          <button
            className="btn btn-outline-primary"
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(totalProducts / productsPerPage)
            }
          >
            Next <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;
