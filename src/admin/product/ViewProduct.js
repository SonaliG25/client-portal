import React, { useEffect, useState } from "react";
import { useEditUserContext } from "../../context/EditUserContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../utils/routeNames.js";
function ViewProduct() {
  const [productDetails] = useEditUserContext();
  const product = [productDetails];
  const navigate = useNavigate();

  console.log(
    "Product Details:",
    Array.isArray(productDetails),
    productDetails
  );

  const handleEdit = () => {
    navigate("/admin-dashboard/updateproduct");
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header"></section>
        {/* Main content */}
        <section className="content">
          {product?.map((data) => (
            <div className="row" key={data.id}>
              <div className="col-md-7 mt-1">
                <h3>{data.name}</h3>
                <div className="card">
                  <div className="mb-2 ml-2"></div>
                  <div className="m-2 d-flex justify-content-center">
                    <img
                      className="img img-fluid img-cover"
                      src={BASE_URL + data.imageUrl} // Use data.imgUrl for the correct image source
                      alt="product image"
                    />
                  </div>

                  <div className="m-2">
                    <div className="d-flex text-start mb-1">
                      <h6 className="w-25">Description</h6>
                      <p className="ml-1">{data.description}</p>
                    </div>
                    <div className="d-flex text-start mb-1">
                      <h6 className="w-25">Tags</h6>
                      <p className="ml-1">{data.tags}</p>
                    </div>
                    <div className="d-flex text-start mb-1">
                      <h6 className="w-25">Keywords</h6>
                      <p className="ml-1">{data.keywords}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 mt-5">
                <div className="card p-2 text-start">
                  <div className="d-flex text-start">
                    <h6 className="w-25">Sku</h6>
                    <p className="ml-1">{data.sku}</p>
                  </div>
                  <div className="d-flex text-start">
                    <h6 className="w-25">Purchase Price</h6>
                    <p className="ml-1">
                      {data.currency} {data.purchasePrice}
                    </p>
                  </div>
                  <div className="d-flex text-start">
                    <h6 className="w-25">MRP</h6>
                    <p className="ml-1">
                      {data.currency} {data.salePrice}
                    </p>
                  </div>
                </div>
                <div className="card p-3 text-start">
                  <div className="d-flex text-start">
                    <h6 className="w-25">Category</h6>
                    <p className="ml-1">{data.category}</p>
                  </div>
                  <div className="d-flex text-start">
                    <h6 className="w-25">Purchase Type</h6>
                    <p className="ml-1">{data.purchaseType}</p>
                  </div>
                  <div className="d-flex text-start">
                    <h6 className="w-25">Stock</h6>
                    <p className="ml-1">{data.stock}</p>
                  </div>
                  <div className="d-flex text-start">
                    <h6 className="w-25">Created On</h6>
                    <p className="ml-1">
                      {moment(data.createdAt).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-3 mb-3">
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit Product
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default ViewProduct;
