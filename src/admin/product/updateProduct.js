import React, { useEffect, useState } from 'react';
import { useEditUserContext } from '../../context/EditUserContext';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UpdateProduct() {
    const [productDetails] = useEditUserContext(); 
    const [product, setProduct] = useState({
        name: productDetails?.name || '',
        description: productDetails?.description || '',
        keywords: productDetails?.keywords || '',
        tags: productDetails?.tags || '',
        purchasePrice: productDetails?.purchasePrice || '',
        salePrice: productDetails?.salePrice || '', 
        purchaseType: productDetails?.purchaseType || '', 
        stock: productDetails?.stock || '',
        category: productDetails?.category || '',
        _id: productDetails?._id || '' // Ensure _id is present
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (productDetails) {
            setProduct(productDetails);
            setLoading(false);
        } else {
            setError('No product details available.');
            setLoading(false);
        }
    }, [productDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!product._id) {
            setError('Product ID is missing');
            return;
        }

        try {
            const res = await axios.patch(
                `http://localhost:3000/product/${product._id}`,
                {
                    name: product.name,
                    description: product.description,
                    keywords: product.keywords,
                    tags: product.tags,
                    purchasePrice: product.purchasePrice,
                    salePrice: product.salePrice,
                    purchaseType: product.purchaseType,
                    stock: product.stock,
                    category: product.category
                },
                {
                    headers: {
                        'Authorization': `Bearer ${auth?.token}`,
                        // Removed 'Content-Type', axios will default to application/json
                    },
                }
            );
            console.log('Product updated successfully:', res.data);
            navigate('/admin-dashboard/product');
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Error updating product. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="content-wrapper">
            <section className="content">
                <div className="container">
                    <h3>Update Product</h3>
                    <form onSubmit={handleSubmit} className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={product.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    value={product.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    className="form-control"
                                    value={product.tags}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Keywords</label>
                                <input
                                    type="text"
                                    name="keywords"
                                    className="form-control"
                                    value={product.keywords}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Purchase Price</label>
                                <input
                                    type="number"
                                    name="purchasePrice"
                                    className="form-control"
                                    value={product.purchasePrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>MRP</label>
                                <input
                                    type="number"
                                    name="salePrice"
                                    className="form-control"
                                    value={product.salePrice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    value={product.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Purchase Type</label>
                                <input
                                    type="text"
                                    name="purchaseType"
                                    className="form-control"
                                    value={product.purchaseType}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    className="form-control"
                                    value={product.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default UpdateProduct;
