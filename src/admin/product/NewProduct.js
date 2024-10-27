import React, { useState,navigate } from 'react';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const NewProduct = () => {
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    purchasePrice: '',
    mrp: '',
    salePrice: '',
    stock: '',
    category: '',
    purchaseType: 'one-time',
    currency: 'USD',
    isAvailable: false,
    tags: '',
    keywords: '',
  });
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  // Handle input changes for all fields except the file upload
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
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
    if (!file) {
      setMessage('Please select an image file.');
      return;
    }

    try {
      // Step 1: Upload image
      const uploadData = new FormData();
      uploadData.append('image', file);  // Image field matches multer configuration

      const uploadResponse = await axios.post(
        'http://localhost:3000/upload/productImage',
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      const imageUrl = uploadResponse.data.imageUrl;
      console.log('Image uploaded successfully:', imageUrl);

      // Step 2: Create new product with the uploaded image URL and other form data
      const productData = {
        ...formData,
        imageUrl,
      };
      console.log('Image uploaded productData is:', productData);

      await axios.post(
        'http://localhost:3000/product/newProduct',
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      console.log('Product created successfully:', productData);
      setMessage('Product created successfully!');
      navigate("/admin-dashboard/products");
    } catch (error) {
      console.error('Error uploading image or creating product:', error);
      setMessage('Failed to upload image or create product.');
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
      {/* /.container-fluid */}
    </section>
     {/* Main content */}
     <section className="content">
     <form id="productForm" onSubmit={handleSubmit} className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Add Product</h3>
      </div>
      <div className="card-body">
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
          <label htmlFor="imageUpload">Upload Image</label>
          <input
            type="file"
            className="form-control-file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        {preview && (
          <div className="form-group">
            <label>Image Preview:</label>
            <img
              src={preview}
              alt="Selected Preview"
              className="img-thumbnail"
              width="100"
              // style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
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
        <div className="row">
        <div className="col-md-6">
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

            </div>
 <div className="col-md-6">
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

            </div>
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
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter Category"
            required
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
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isAvailable"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isAvailable">Available</label>
          </div>
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

      <div className="card-footer">
        <button type="submit" className="btn btn-primary">Save Product</button>
      </div>
    </form>

        </section>
    </div>
  );
};

export default NewProduct;

/// Sohil's code
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// function Products() {
//   const [productForm, setProductForm] = useState({
//     sku: "",
//     name: "",
//     description: "",
//     purchasePrice: "",
//     mrp: "",
//     salePrice: "",
//     stock: "",
//     category: "",
//     imageUrl: "",
//     purchaseType: "one-time",
//     currency: "USD",
//     isAvailable: true,
//     tags: "",
//     keywords: "",
//   });

//   const [auth] = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if required fields are filled
//     const {
//       sku,
//       name,
//       description,
//       purchasePrice,
//       mrp,
//       salePrice,
//       category,
//       isAvailable,
//     } = productForm;

//     if (
//       !sku ||
//       !name ||
//       !description ||
//       !purchasePrice ||
//       !mrp ||
//       !salePrice ||
//       !category ||
//       isAvailable === undefined
//     ) {
//       alert("Please fill all required fields.");
//       return;
//     }
//     //  handle file upload
//     const uploadData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value instanceof File) {
//         uploadData.append(key, value);
//       } else {
//         uploadData.append(key, value);
//       }
//     });

//     try {
//       const uploadResponse = await axios.post(
//         "http://localhost:3000/upload/productImage",
//         uploadData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${auth?.token}`,
//           },
//         }
//       );

//       const imageName = uploadResponse.data.imageUrl;
//       const updatedPath = imageName.replace(/\\/g, "/");

//       const updatedFormData = {
//         ...formData,
//         imageUrl: updatedPath,
//       };
//       // Prepare data to send to the backend
//       const data = {
//         ...updatedFormData,
//         tags: updatedFormData.tags.split(",").map((tag) => tag.trim()),
//         keywords: updatedFormData.keywords
//           .split(",")
//           .map((keyword) => keyword.trim()),
//       };

//       const res = await axios.post(
//         `http://localhost:3000/product/newProduct`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(res);
//       // Reset form on success
//       setProductForm({
//         sku: "",
//         name: "",
//         description: "",
//         purchasePrice: "",
//         mrp: "",
//         salePrice: "",
//         stock: "",
//         category: "",
//         imageUrl: "",
//         purchaseType: "one-time",
//         currency: "USD",
//         isAvailable: true,
//         tags: "",
//         keywords: "",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <div className="container-fluid">
//           <h2>Create Product</h2>
//           <form onSubmit={handleSubmit}>
//             {/* SKU */}
//             <div className="form-group">
//               <label htmlFor="sku">SKU</label>
//               <input
//                 type="text"
//                 id="sku"
//                 value={productForm.sku}
//                 onChange={(e) =>
//                   setProductForm({ ...productForm, sku: e.target.value })
//                 }
//                 className="form-control"
//                 required
//               />
//             </div>

//             {/* Name */}
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={productForm.name}
//                 onChange={(e) =>
//                   setProductForm({ ...productForm, name: e.target.value })
//                 }
//                 className="form-control"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 id="description"
//                 value={productForm.description}
//                 onChange={(e) =>
//                   setProductForm({
//                     ...productForm,
//                     description: e.target.value,
//                   })
//                 }
//                 className="form-control"
//                 required
//               />
//             </div>

//             {/* Purchase Price */}
//             <div className="form-group">
//               <label htmlFor="purchasePrice">Purchase Price</label>
//               <input
//                 type="number"
//                 id="purchasePrice"
//                 value={productForm.purchasePrice}
//                 onChange={(e) =>
//                   setProductForm({
//                     ...productForm,
//                     purchasePrice: e.target.value,
//                   })
//                 }
//                 className="form-control"
//                 required
//               />
//             </div>

//             {/* MRP */}
//             <div className="form-group">
//               <label htmlFor="mrp">MRP</label>
//               <input
//                 type="number"
//                 id="mrp"
//                 value={productForm.mrp}
//                 onChange={(e) =>
//                   setProductForm({ ...productForm, mrp: e.target.value })
//                 }
//                 className="form-control"
//                 required
//               />
//             </div>

//             {/* Sale Price */}
//             <div className="form-group">
//               <label htmlFor="salePrice">Sale Price</label>
//               <input
//                 type="number"
//                 id="salePrice"
//                 value={productForm.salePrice}
//                 onChange={(e) =>
//                   setProductForm({ ...productForm, salePrice: e.target.value })
//                 }
//                 className="form-control"
//                 required
//               />
//             </div>

//             {/* Stock */}
//             <div className="form-group">
//               <label htmlFor="stock">Stock</label>
//               <input
//                 type="number"
//                 id="stock"
//                 value={productForm.stock}
//                 onChange={(e) =>
//                   setProductForm({ ...productForm, stock: e.target.value })
//                 }
//                 className="form-control"
//               />
//             </div>

//             {/* Category */}
//             <div className="form-group">
//               <label htmlFor="category">Category</label>
//               <input
//                 type="text"
//                 id="category"
//                 value={productForm.category}
//                 onChange={(e) =>
//                   setProductForm({ ...productForm, category: e.target.value })
//                 }
//                 className="form-control"
//                 required
//               />
//             </div>

//             {/* Image Upload */}
//             <div className="form-group">
//               <label htmlFor="imageFile">Upload Image</label>
//               <input
//                 type="file"
//                 className="form-control"
//                 onChange={handleImageUpload}
//               />
//               {productForm.imageUrl && (
//                 <img
//                   src={productForm.imageUrl}
//                   alt="Product Preview"
//                   style={{ width: "100px", marginTop: "10px" }}
//                 />
//               )}
//             </div>

//             {/* Purchase Type */}
//             <div className="form-group">
//               <label htmlFor="purchaseType">Purchase Type</label>
//               <select
//                 id="purchaseType"
//                 value={productForm.purchaseType}
//                 onChange={(e) =>
//                   setProductForm({
//                     ...productForm,
//                     purchaseType: e.target.value,
//                   })
//                 }
//                 className="form-control"
//               >
//                 <option value="one-time">One Time</option>
//                 <option value="subscription">Subscription</option>
//               </select>
//             </div>

//             {/* Tags */}
//             <div className="form-group">
//               <label htmlFor="tags">Tags (comma-separated)</label>
//               <input
//                 type="text"
//                 id="tags"
//                 value={productForm.tags}
//                 onChange={(e) =>
//                   setProductForm({ ...productForm, tags: e.target.value })
//                 }
//                 className="form-control"
//               />
//             </div>

//             {/* Keywords */}
//             <div className="form-group">
//               <label htmlFor="keywords">Keywords (comma-separated)</label>
//               <input
//                 type="text"
//                 id="keywords"
//                 value={productForm.keywords}
//                 onChange={(e) =>
//                   setProductForm({ ...productForm, keywords: e.target.value })
//                 }
//                 className="form-control"
//               />
//             </div>

//             {/* Availability Checkbox */}
//             <div className="form-group">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={productForm.isAvailable}
//                   onChange={(e) =>
//                     setProductForm({
//                       ...productForm,
//                       isAvailable: e.target.checked,
//                     })
//                   }
//                   required
//                 />
//                 Available
//               </label>
//             </div>

//             <button type="submit" className="btn btn-success">
//               Create Product
//             </button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Products;



const ImageUploadForm = () => {
  const [auth] = useAuth();
  const [file, setFile] = useState(null);  // Stores selected image file
  const [preview, setPreview] = useState(null);  // Stores image preview URL
  const [message, setMessage] = useState('');  // Shows upload message

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Generate preview URL
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle form submission
  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    // Create FormData object and append the selected file
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Make POST request to upload the image
      const response = await axios.post('http://localhost:3000/upload/productImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      setMessage('Image uploaded successfully!');
      console.log('Uploaded Image URL:', response.data.imageUrl);  // Use this URL as needed
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload image');
    }
  };

  return (
    <div className="content-wrapper" >
      <h3>Upload an Image</h3>
      <form onSubmit={handleImageUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
        <button type="submit">Upload Image</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

// export default ImageUploadForm;
