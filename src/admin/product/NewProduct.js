import React, { useState, navigate, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import toast from "react-hot-toast";
const NewProduct = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    purchasePrice: "",
    mrp: "",
    salePrice: "",
    stock: "",
    category: "",
    purchaseType: "one-time",
    currency: "USD",
    isAvailable: false,
    tags: "",
    keywords: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/category/categories",
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
  }, []);

  // Handle input changes for all fields except the file upload
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Product Added Suceessfully")
    if (!file) {
      setMessage("Please select an image file.");
      return;
    }

    try {
      // Step 1: Upload image
      const uploadData = new FormData();
      uploadData.append("image", file); // Image field matches multer configuration

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

      const imageUrl = uploadResponse.data.imageUrl;
      console.log("Image uploaded successfully:", imageUrl);

      // Step 2: Create new product with the uploaded image URL and other form data
      const productData = {
        ...formData,
        imageUrl,
      };
      console.log("Image uploaded productData is:", productData);

      await axios.post(
        "http://localhost:3000/product/newProduct",
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log("Product created successfully:", productData);
      // setMessage("Product created successfully!");
      navigate(-1)
    } catch (error) {
      console.error("Error uploading image or creating product:", error);
      setMessage("Failed to upload image or create product.");
    }
  };
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="text-dark">Add Product</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Add Product</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        {message && <p>{message}</p>}
        <form
          id="productForm"
          onSubmit={handleSubmit}
          className="card card-primary"
        >
          <div className="card-header">
            <h3 className="card-title">Add Product</h3>
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
                    value={formData.sku}
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
                    value={formData.name}
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
                    value={formData.description}
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
                    value={formData.currency}
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
                    value={formData.purchasePrice}
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
                    value={formData.mrp}
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
                    value={formData.salePrice}
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
                      checked={formData.isAvailable}
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
                        required
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
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter Stock"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>

                  <Typeahead
                    id="category"
                    options={categories}
                    labelKey="name"
                    onChange={(selected) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        category: selected[0]["name"] || "", // Set selected category or empty string
                      }));
                    }}
                    selected={formData.category ? [formData.category] : []}
                    placeholder="Choose a category"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="purchaseType">Purchase Type</label>
                  <select
                    className="form-control"
                    id="purchaseType"
                    name="purchaseType"
                    value={formData.purchaseType}
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
                    value={formData.tags}
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
                    value={formData.keywords}
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
};

export default NewProduct;
