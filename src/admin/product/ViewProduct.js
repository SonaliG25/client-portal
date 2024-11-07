import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEditUserContext } from "../../context/EditUserContext";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/endPointNames.js";

function ViewProduct() {
  const [productDetails] = useEditUserContext();
  const [product, setProduct] = useState(null); // Initialize as null
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    navigate(`/admin-dashboard/updateproduct/${id}`, { replace: true });
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log("Single Product", res.data);
      setProduct(res.data); // Set the single product object directly
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getProduct();
    }
  }, [auth]);

  if (!product) {
    return (
      <div className="col-md-12 mt-1">
        <div className="card card-primary shadow-sm">
          <div className="card-header">
            <h3 className="card-title">Loading...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <section className="content-header d-flex justify-content-between align-items-center">
        <h1>Product Details</h1>
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit Product
        </button>
      </section>
      <section className="content">
        <div className="row">
          {/* Product Info */}
          <div className="col-md-7 mt-1">
            <div className="card card-primary shadow-sm">
              <div className="card-header">
                <h3 className="card-title">{product.name}</h3>
              </div>
              <div className="card-body">
                <div className="text-center mb-3">
                  <img
                    onError={(e) =>
                      (e.target.src = BASE_URL + "/uploads/placeholder.png")
                    }
                    className="img-fluid img-cover rounded"
                    src={BASE_URL + product.imageUrl}
                    alt="product image"
                  />
                </div>
                <div className="mb-3">
                  <strong>Description:</strong>
                  <p>{product.description}</p>
                </div>
                <div className="mb-3">
                  <strong>Tags:</strong>
                  <p>{product.tags}</p>
                </div>
                <div className="mb-3">
                  <strong>Keywords:</strong>
                  <p>{product.keywords}</p>
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
                  <p>{product.sku}</p>
                </div>
                <div className="mb-3">
                  <strong>Purchase Price:</strong>
                  <p>
                    {product.currency} {product.purchasePrice}
                  </p>
                </div>
                <div className="mb-3">
                  <strong>MRP:</strong>
                  <p>
                    {product.currency} {product.salePrice}
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
                  <p>{product.category}</p>
                </div>
                <div className="mb-3">
                  <strong>Purchase Type:</strong>
                  <p>{product.purchaseType}</p>
                </div>
                <div className="mb-3">
                  <strong>Stock:</strong>
                  <p>{product.stock}</p>
                </div>
                <div className="mb-3">
                  <strong>Created On:</strong>
                  <p>{moment(product.createdAt).format("MMMM DD, YYYY")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewProduct;
