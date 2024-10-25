import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEditUserContext } from '../../context/EditUserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Products() {
    const [productDetails, setProductDetails] = useEditUserContext();
    const [products, setProducts] = useState([]);
    const [auth] = useAuth();
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [productsPerPage] = useState(6); // Products per page, adjust this as needed
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/product/getProducts`, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`, // Sending token in Authorization header
                },
            });

            setProducts(res.data);
            console.log('Product Data:', res.data);
        } catch (error) {
            console.error(error); // Log the error for debugging
        }
    };

    useEffect(() => {
        if (auth?.token) {
            getProduct();
        }
    }, [auth]);

    const handleView = (data) => {
        setProductDetails(data);
        navigate('/admin-dashboard/viewproduct');
    };

    // Get current products based on pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle Next Page
    const handleNextPage = () => {
        if (currentPage < Math.ceil(products.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handle Previous Page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="container mt-4">
                            <div className="row">
                                {currentProducts.map((product) => (
                                    <div className="col-md-4" key={product.id} onClick={() => handleView(product)}>
                                        <div className="card mb-4 shadow-sm">
                                            <img
                                                src={
                                                    'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
                                                }
                                                className="card-img-top"
                                                alt={product.name}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="card-text">{product.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <div className="pagination-controls">
                                <button 
                                    className="btn btn-primary mr-2"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1} // Disable if on first page
                                >
                                    Previous
                                </button>
                                <button 
                                    className="btn btn-primary"
                                    onClick={handleNextPage}
                                    disabled={currentPage === Math.ceil(products.length / productsPerPage)} // Disable if on last page
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Products() {
//     const navigate = useNavigate();

//     const handleAddProduct = () => {
//         navigate("/admin-dashboard/newProduct");
//       };
//     return (
//         <>
//          <div className="content-wrapper">
//         <section className="content">
//           <div className="container-fluid">
            
//             <div className="m-2 d-flex  align-items-center">
//             <h2 className="py-2 text-center">Products</h2>

//               {/* <form className="flex-grow-1 mr-2">
//                 <div className="row justify-content-center">
//                   <div className="col-md-6">
//                     <div className="form-group mb-0">
//                       <div className="input-group input-group-lg">
//                         <input
//                           type="search"
//                           className="form-control form-control-lg"
//                           placeholder="Search by First Name, Last Name or Phone"
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <div className="input-group-append">
//                           <button
//                             className="btn btn-lg btn-outline-secondary"
//                             type="button"
//                           >
//                             <i className="fa fa-search" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </form> */}

//               <button
//                 onClick={handleAddProduct}
//                 className="font-weight-bold btn btn-success px-4 py-2"
//               >
//                 Add Product
//               </button>
//             </div>
//             </div>
//             </section>
//             </div>
//             </>
//     );
// }export default Products;