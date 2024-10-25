import React, { useState } from 'react';

const NewProduct = () => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    purchasePrice: '',
    mrp: '',
    salePrice: '',
    stock: '',
    category: '',
    imageUrl: '',
    purchaseType: 'one-time',
    currency: 'USD',
    isAvailable: false,
    tags: '',
    keywords: '',
  });
  
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));

    if (type === 'file' && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to handle file upload
    const uploadData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        uploadData.append(key, value);
      } else {
        uploadData.append(key, value);
      }
    });

    // Here, you would typically send the data to your server
    // For example, using fetch or axios:
    // await axios.post('/upload-endpoint', uploadData);

    console.log('Form Data:', uploadData);
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
            onChange={handleChange}
            required
          />
        </div>

        {imagePreview && (
          <div className="form-group">
            <label>Image Preview:</label>
            <img
              src={imagePreview}
              alt="Selected Preview"
              className="img-thumbnail"
              style={{ maxWidth: '100%', height: 'auto' }}
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
