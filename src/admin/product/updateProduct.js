import React, { useEffect, useState } from "react";
import { useEditUserContext } from "../../context/EditUserContext";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { BASE_URL } from "../../utils/endPointNames.js";
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

function UpdateProduct() {
  const [productDetails, setProductDetails] = useEditUserContext();
  const [product, setProduct] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  const fetchUsers = async () => {
    if (!auth?.token) return;
    try {
      const response = await axios.get("http://localhost:3000/user/clients", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log("product",res.data);
      
      setProduct(res.data);
      setPreview(BASE_URL+res.data.imageUrl || null); // Set initial preview to existing image URL
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load product data.");
    }
  };

  useEffect(() => {
    if (auth?.token) getProduct();
    fetchUsers();
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/category/allCategory`,
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [auth]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    if (name === "cost" || name === "tax") {
      const updatedProduct = {
        ...product,
        [name]: updatedValue,
        totalCost: parseFloat(updatedValue) + parseFloat(product.tax || 0),
      };
      setProduct(updatedProduct);
    } else {
      setProduct({
        ...product,
        [name]: updatedValue,
      });
    }
  };

  const handleSelectecUserChange = (selectedUser) => {
    setSelectedUser(selectedUser);
    if (selectedUser) {
      const userid = selectedUser._id;
      setProduct((prevData) => ({
        ...prevData,
        productManager: userid,
      }));
    } else {
      setProduct((prevData) => ({
        ...prevData,
        productManager: null,
      }));
    }
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
      // Set imageUrl to the existing product image URL initially
      let imageUrl = product.imageUrl;
  
      
        const uploadData = new FormData();
        uploadData.append("image", file);
        console.log("file", file, uploadData);
  
        const uploadResponse = await axios.post(
          `http://localhost:3000/upload/productImage`,
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
  
        imageUrl = uploadResponse.data.fileUrl; // Update imageUrl with new uploaded URL
        toast.success("Image uploaded successfully");
        console.log("image",uploadResponse);
        
      
  
      // Prepare the updated product data, including the correct imageUrl
      const updatedProductData = { ...product, imageUrl };
      console.log("imgUrl", imageUrl, updatedProductData);
  
      await axios.patch(`${BASE_URL}/product/${product._id}`, updatedProductData, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
  
      toast.success("Product updated successfully");
      navigate(-1);
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
        <h1 className="text-dark">Update Product</h1>
      </section>

      <section className="content">
        <form onSubmit={handleSubmit} className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Update Product</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="sku">SKU</label>
                  <input type="text" className="form-control" id="sku" name="sku" readOnly value={product.sku} />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" name="description" value={product.description} onChange={handleChange} rows="3" required />
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
                  //  onInputChange={(input) => handleEmailTo(input)}
                  selected={selectedUser ? [selectedUser] : []}
                  placeholder="Choose a product manager"
                />
              </FormGroup>
                

                <div className="form-group">
                  <label htmlFor="currency">Currency</label>
                  <select className="form-control" id="currency" name="currency" value={product.currency} onChange={handleChange} required>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    {/* Add other currencies as needed */}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cost">Cost</label>
                  <input type="number" className="form-control" id="cost" name="cost" value={product.cost} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="tax">Tax</label>
                  <input type="number" className="form-control" id="tax" name="tax" value={product.tax} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="totalCost">Total Cost</label>
                  <input
                    type="number"
                    className="form-control"
                    id="totalCost"
                    name="totalCost"
                    value={product.totalCost || (parseFloat(product.cost) + parseFloat(product.tax))}
                    readOnly
                  />
                </div>
              </div>

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
                      />
                      <label className="custom-file-label" htmlFor="imageUpload">
                        Choose file
                      </label>
                    </div>
                  </div>
                  <small className="form-text text-muted">
                    Supported formats: JPG, PNG, GIF. Max size: 2MB.
                  </small>
                </div>
                <div className="form-group">
      <label htmlFor="category">Category</label>
      <Typeahead
        id="category"
        options={categories}
        labelKey="name"
        onChange={(selected) => {
          setProduct((prevData) => ({ ...prevData, category: selected[0]?.name || "" }));
        }}
        selected={product.category ? [product.category] : []}
        placeholder="Choose a category"
        maxResults={10}  // Limits results shown before scrolling
        paginate  // Enables pagination for scrolling
        minLength={1}  // Starts search only after typing at least one character
      />
    </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select className="form-control" id="status" name="status" value={product.status} onChange={handleChange} required>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <input type="text" className="form-control" id="tags" name="tags" value={product.tags} onChange={handleChange} placeholder="Enter tags, separated by commas" />
                </div>
                <div className="form-group">
                  <label htmlFor="keywords">Keywords</label>
                  <input type="text" className="form-control" id="keywords" name="keywords" value={product.keywords} onChange={handleChange} placeholder="Enter keywords, separated by commas" />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">Update Product</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateProduct;
