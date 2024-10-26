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
//   const handleImageUpload = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "file" ? files[0] : value,
//     }));

//     if (type === "file" && files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => setImagePreview(e.target.result);
//       reader.readAsDataURL(files[0]);
//     }
//   };
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

//       const productForm = {
//         ...formData,
//         imageUrl: updatedPath,
//       };
//       // Prepare data to send to the backend try now
//       const data = {
//         ...productForm,
//         tags: productForm.tags.split(",").map((tag) => tag.trim()),
//         keywords: productForm.keywords
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
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Products() {
  const [productForm, setProductForm] = useState({
    sku: "",
    name: "",
    description: "",
    purchasePrice: "",
    mrp: "",
    salePrice: "",
    stock: "",
    category: "",
    imageUrl: "",
    purchaseType: "one-time",
    currency: "USD",
    isAvailable: true,
    tags: "",
    keywords: "",
  });

  const [imagePreview, setImagePreview] = useState(""); // Added image preview state
  const [auth] = useAuth();

  const handleImageUpload = (e) => {
    const { name, value, type, files } = e.target;
    setProductForm((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));

    if (type === "file" && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result); // Display image preview
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      sku,
      name,
      description,
      purchasePrice,
      mrp,
      salePrice,
      category,
      isAvailable,
    } = productForm;

    if (
      !sku ||
      !name ||
      !description ||
      !purchasePrice ||
      !mrp ||
      !salePrice ||
      !category ||
      isAvailable === undefined
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const uploadData = new FormData();
    Object.entries(productForm).forEach(([key, value]) => {
      if (value instanceof File) {
        uploadData.append(key, value);
      } else {
        uploadData.append(key, value);
      }
    });

    try {
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

      const imageName = uploadResponse.data.imageUrl;
      const updatedPath = imageName.replace(/\\/g, "/");

      const productData = {
        ...productForm,
        imageUrl: updatedPath,
        tags: productForm.tags.split(",").map((tag) => tag.trim()),
        keywords: productForm.keywords
          .split(",")
          .map((keyword) => keyword.trim()),
      };

      const res = await axios.post(
        "http://localhost:3000/product/newProduct",
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      // setProductForm({
      //   sku: "",
      //   name: "",
      //   description: "",
      //   purchasePrice: "",
      //   mrp: "",
      //   salePrice: "",
      //   stock: "",
      //   category: "",
      //   imageUrl: "",
      //   purchaseType: "one-time",
      //   currency: "USD",
      //   isAvailable: true,
      //   tags: "",
      //   keywords: "",
      // });
      // setImagePreview(""); // Clear the preview after submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <h2>Create Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                id="sku"
                value={productForm.sku}
                onChange={(e) =>
                  setProductForm({ ...productForm, sku: e.target.value })
                }
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm({ ...productForm, name: e.target.value })
                }
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="purchasePrice">Purchase Price</label>
              <input
                type="number"
                id="purchasePrice"
                value={productForm.purchasePrice}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    purchasePrice: e.target.value,
                  })
                }
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mrp">MRP</label>
              <input
                type="number"
                id="mrp"
                value={productForm.mrp}
                onChange={(e) =>
                  setProductForm({ ...productForm, mrp: e.target.value })
                }
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="salePrice">Sale Price</label>
              <input
                type="number"
                id="salePrice"
                value={productForm.salePrice}
                onChange={(e) =>
                  setProductForm({ ...productForm, salePrice: e.target.value })
                }
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                value={productForm.stock}
                onChange={(e) =>
                  setProductForm({ ...productForm, stock: e.target.value })
                }
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={productForm.category}
                onChange={(e) =>
                  setProductForm({ ...productForm, category: e.target.value })
                }
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageFile">Upload Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  style={{ width: "100px", marginTop: "10px" }}
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="purchaseType">Purchase Type</label>
              <select
                id="purchaseType"
                value={productForm.purchaseType}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    purchaseType: e.target.value,
                  })
                }
                className="form-control"
              >
                <option value="one-time">One Time</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                value={productForm.tags}
                onChange={(e) =>
                  setProductForm({ ...productForm, tags: e.target.value })
                }
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="keywords">Keywords (comma-separated)</label>
              <input
                type="text"
                id="keywords"
                value={productForm.keywords}
                onChange={(e) =>
                  setProductForm({ ...productForm, keywords: e.target.value })
                }
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={productForm.isAvailable}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      isAvailable: e.target.checked,
                    })
                  }
                  required
                />
                Available
              </label>
            </div>

            <button type="submit" className="btn btn-success">
              Create Product
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Products;
