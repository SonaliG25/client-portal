import React, { useEffect, useState } from "react";
import { useEditUserContext } from "../../context/EditUserContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { BASE_URL } from "../../utils/routeNames.js";
import "react-bootstrap-typeahead/css/Typeahead.css";

function UpdateProduct() {
  const [productDetails, setProductDetails] = useEditUserContext();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (productDetails) {
      setProduct(productDetails);
      console.log("ProductDetails", productDetails);
      setLoading(false);
    } else {
      setError("No product details available.");
      setLoading(false);
    }
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/category/allCategory",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setCategories(response.data.categories);

        console.log("categories", categories);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [productDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = product.imageUrl; // Default to existing image URL

      // Step 1: Upload the image if a new file is selected
      if (file) {
        const uploadData = new FormData();
        uploadData.append("image", file); // "image" should match the field name expected by the server

        const uploadResponse = await axios.post(
          "http://localhost:3000/upload/productImage",
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        imageUrl = uploadResponse.data.imageUrl; // Update imageUrl to the uploaded image URL
        console.log("Image uploaded successfully:", imageUrl);
      }

      // Step 2: Update product with the new or existing image URL and other form data
      const updatedProductData = {
        ...product,
        imageUrl,
      };
      await axios.patch(
        `http://localhost:3000/product/${product._id}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      navigate("/admin-dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="text-dark">Update Product</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Update Product</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <form
          id="productForm"
          onSubmit={handleSubmit}
          className="card card-primary"
        >
          <div className="card-header">
            <h3 className="card-title">Update Product</h3>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="sku">SKU</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sku"
                    name="sku"
                    readOnly={true}
                    value={product.sku}
                    onChange={handleChange}
                    placeholder="Enter SKU"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Enter Product Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter Description"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="currency">Currency</label>
                  <select
                    className="form-control"
                    id="currency"
                    name="currency"
                    value={product.currency}
                    onChange={handleChange}
                    required
                  >
                    <option value="USD">USD - United States Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                    <option value="SGD">SGD - Singapore Dollar</option>
                    <option value="AED">AED - UAE Dirham</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="purchasePrice">Purchase Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="purchasePrice"
                    name="purchasePrice"
                    value={product.purchasePrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter Purchase Price"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mrp">MRP</label>
                  <input
                    type="number"
                    className="form-control"
                    id="mrp"
                    name="mrp"
                    value={product.mrp}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter MRP"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salePrice">Sale Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="salePrice"
                    name="salePrice"
                    value={product.salePrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter Sale Price"
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isAvailable"
                      name="isAvailable"
                      checked={product.isAvailable}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isAvailable">
                      Available
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                {!preview && (
                  <div className="form-group">
                    <img
                      src={BASE_URL + product.imageUrl}
                      alt="Selected Preview"
                      className="img-thumbnail"
                      width="100"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="imageUpload" className="font-weight-bold">
                    Selected Image
                  </label>
                  {preview && (
                    <div className="form-group">
                      <img
                        src={preview}
                        alt="Selected Preview"
                        className="img-thumbnail"
                        width="100"
                      />
                    </div>
                  )}
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="imageUpload"
                        name="imageUpload"
                        accept="image/*"
                        onChange={handleFileChange}
                        required={file ? true : false} // Only required if a new file is selected
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="imageUpload"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <small className="form-text text-muted">
                    Supported formats: JPG, PNG, GIF. Max size: 2MB.
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter Stock"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>

                  <Typeahead
                    value={product.category}
                    id="category"
                    options={categories}
                    labelKey="name"
                    onChange={(selected) => {
                      setProductDetails((prevData) => ({
                        ...prevData,
                        category:
                          selected.length > 0 && selected[0]
                            ? selected[0].name
                            : "", // Check for selected[0]
                      }));
                    }}
                    selected={product.category ? [product.category] : []}
                    placeholder="Choose a category"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="purchaseType">Purchase Type</label>
                  <select
                    className="form-control"
                    id="purchaseType"
                    name="purchaseType"
                    value={product.purchaseType}
                    onChange={handleChange}
                  >
                    <option value="one-time">One-Time</option>
                    <option value="subscription">Subscription</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tags"
                    name="tags"
                    value={product.tags}
                    onChange={handleChange}
                    placeholder="Enter tags, separated by commas"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="keywords">Keywords</label>
                  <input
                    type="text"
                    className="form-control"
                    id="keywords"
                    name="keywords"
                    value={product.keywords}
                    onChange={handleChange}
                    placeholder="Enter keywords, separated by commas"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateProduct;
