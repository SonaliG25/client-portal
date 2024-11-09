import React, { useState, navigate, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Table,
} from "reactstrap";
const NewProduct = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    description: "",
    cost: 0,
    tax: 0,
    totalCost: 0,
    // productManager: auth?.user.userId,
    category: "",
    purchaseType: "one-time",
    currency: "USD",
    status: "Active",
    tags: [],
    keywords: [],
    // imageUrl:"",
    activeSubscriptions: 0,
    revenueGenerated: 0,
    // duration 0,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchUsers = async () => {
    if (!auth?.token) return;
    try {
      const response = await axios.get("http://localhost:3000/user/clients", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setUsers(response.data);
      // console.log("users", response.data.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handleSelectecUserChange = (selectedUser) => {
    setSelectedUser(selectedUser);

    if (selectedUser) {
      const userid = selectedUser._id;
      const useremail = selectedUser.email;
      const username = selectedUser.name;

      setFormData((prevData) => ({
        ...prevData,
        productManager: userid,
      }));
    } else {
      // Reset the values if no user is selected
      setFormData((prevData) => ({
        ...prevData,
        productManager: null,
      }));
    }
  };

  // Calculate total cost
  useEffect(() => {
    const cost = parseFloat(formData.cost) || 0;
    const tax = parseFloat(formData.tax) || 0;
    setFormData((prevData) => ({
      ...prevData,
      totalCost: (cost + tax).toFixed(2),
    }));
  }, [formData.cost, formData.tax]);

  // Fetch categories
  useEffect(() => {
    fetchUsers();
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
        console.log(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "tags" || name === "keywords") {
      // Ensure it's always an array
      setFormData((prevData) => ({
        ...prevData,
        [name]: value ? value.split(",").map((item) => item.trim()) : [], // Split by commas and remove extra spaces, or set an empty array if value is empty
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
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
    toast.success("Product Added Successfully");

    if (!file) {
      setMessage("Please select an image file.");
      return;
    }

    try {
      // Image upload
      const uploadData = new FormData();
      uploadData.append("image", file);

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

      const imageUrl = uploadResponse.data.fileUrl;
      console.log("ImageUrl", imageUrl);

      // Prepare productData with proper data types
      const productData = {
        ...formData,
        imageUrl,
        cost: parseFloat(formData.cost), // Ensure cost is a number
        tax: parseFloat(formData.tax), // Ensure tax is a number
        totalCost: parseFloat(formData.totalCost), // Ensure totalCost is a number
        tags: formData.tags.split(","), // Ensure tags are properly trimmed strings
        keywords: formData.keywords.split(","), // Ensure keywords are properly trimmed strings
      };
      if (formData.purchaseType === "subscription" && formData.duration) {
        productData.duration = parseInt(formData.duration); // Only add if purchaseType is subscription
      }
      console.log("DataProd", productData);

      // Send the product data to the backend
      await axios.post(
        "http://localhost:3000/product/newProduct",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      navigate(-1); // Navigate back after successful submission
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
                  <label htmlFor="cost">Cost</label>
                  <input
                    type="number"
                    className="form-control"
                    id="cost"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter Purchase Price"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tax">Tax</label>
                  <input
                    type="number"
                    className="form-control"
                    id="tax"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter Tax"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="totalCost">Total Cost</label>
                  <input
                    type="text"
                    className="form-control"
                    id="totalCost"
                    name="totalCost"
                    value={formData.totalCost}
                    readOnly
                  />
                </div>

                {/* <div className="form-group">
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
                </div> */}
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

                <FormGroup>
                  <Label>Product Manager</Label>
                  <Typeahead
                    id="user-selector"
                    options={users}
                    labelKey="username" // Adjust based on your user object, e.g., 'email' or 'name'
                    onChange={(selected) =>
                      handleSelectecUserChange(selected[0] || null)
                    }
                    // onInputChange={(input) => handleEmailTo(input)}
                    selected={selectedUser ? [selectedUser] : []}
                    placeholder="Choose a user"
                  />
                </FormGroup>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Retired">Retired</option>
                  </select>
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
                        category: selected.length ? selected[0].name : "", // Set selected category or empty string
                      }));
                    }}
                    selected={
                      formData.category ? [{ name: formData.category }] : []
                    }
                    placeholder="Choose a category"
                    paginate
                    maxResults={5} // Show 5 results at a time to enable scrolling
                    inputProps={{ autoComplete: "off" }}
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

                {/* Conditionally render the Duration field */}
                {formData.purchaseType === "subscription" && (
                  <div className="form-group">
                    <label htmlFor="duration">Duration (in days)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      min="1"
                      placeholder="Enter duration in days"
                    />
                  </div>
                )}

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
