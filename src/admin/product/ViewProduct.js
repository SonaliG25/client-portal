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
        <section className="content-header d-flex justify-content-between align-items-center">
          <h1>Product Details</h1>
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit Product
          </button>
        </section>
        <section className="content">
          {product?.map((data) => (
            <div className="row" key={data.id}>
              {/* Product Info */}
              <div className="col-md-7 mt-1">
                <div className="card card-primary shadow-sm">
                  <div className="card-header">
                    <h3 className="card-title">{data.name}</h3>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-3">
                      <img
                        className="img-fluid img-cover rounded"
                        src={BASE_URL + data.imageUrl}
                        alt="product image"
                      />
                    </div>
                    <div className="mb-3">
                      <strong>Description:</strong>
                      <p>{data.description}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Tags:</strong>
                      <p>{data.tags}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Keywords:</strong>
                      <p>{data.keywords}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Pricing and Stock Info */}
              <div className="col-md-5 mt-1">
                <div className="card card-info shadow-sm mb-3">
                  <div className="card-header">
                    <h3 className="card-title">Pricing Information</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <strong>SKU:</strong>
                      <p>{data.sku}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Purchase Price:</strong>
                      <p>
                        {data.currency} {data.purchasePrice}
                      </p>
                    </div>
                    <div className="mb-3">
                      <strong>MRP:</strong>
                      <p>
                        {data.currency} {data.salePrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="card card-secondary shadow-sm">
                  <div className="card-header">
                    <h3 className="card-title">Additional Information</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <strong>Category:</strong>
                      <p>{data.category}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Purchase Type:</strong>
                      <p>{data.purchaseType}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Stock:</strong>
                      <p>{data.stock}</p>
                    </div>
                    <div className="mb-3">
                      <strong>Created On:</strong>
                      <p>{moment(data.createdAt).format("MMMM DD, YYYY")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default ViewProduct;
