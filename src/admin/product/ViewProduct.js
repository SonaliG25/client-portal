import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEditUserContext } from "../../context/EditUserContext";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/endPointNames.js";
import toast from "react-hot-toast";

function ViewProduct() {
  const [productDetails] = useEditUserContext();
  const [product, setProduct] = useState(null);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    navigate(`/admin-dashboard/updateproduct/${id}`, { replace: true });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      // alert("Product deleted successfully");
      toast.success("Product Deleted Successfully")
      navigate("/admin-dashboard/products"); // Redirect to product list after deletion
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setProduct(res.data);
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
        <div>
          <button className="btn btn-primary mr-2" onClick={handleEdit}>
            Edit Product
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Product
          </button>
        </div>
      </section>
      <section className="content">
        <div className="row">
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
                    alt="product"
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
                  <strong>Cost:</strong>
                  <p>{product.currency} {product.cost}</p>
                </div>
                <div className="mb-3">
                  <strong>Tax:</strong>
                  <p>{product.currency} {product.tax}</p>
                </div>
                <div className="mb-3">
                  <strong>Total Cost:</strong>
                  <p>{product.currency} {product.totalCost}</p>
                </div>
              </div>
            </div>

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
                {product.purchaseType === "subscription" && (
                  <div className="mb-3">
                    <strong>Duration:</strong>
                    <p>{product.duration} months</p>
                  </div>
                )}
                <div className="mb-3">
                  <strong>Status:</strong>
                  <p>{product.status}</p>
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
