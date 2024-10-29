import React, { useEffect, useState } from 'react';
import { useEditUserContext } from '../../context/EditUserContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function ViewProduct() {
    const [productDetails] = useEditUserContext();
    const product = [productDetails]
    
    // const [product,setProduct] = useState({
    //     name:productDetails[0].name || "",
    //     description:productDetails[0].description || "",
    //     tags:productDetails[0].tags || "",
    //     keywords:productDetails[0].keywords || "",
    //     category:productDetails[0].category || "",
    //     mrp:productDetails[0].mrp || "",
    //     salePrice:productDetails[0].salePrice || "",
    //     purchasePrice:productDetails[0].purchasePrice || "",
    //     purchaseType:productDetails[0].purchaseType || "",
    //     stock:productDetails[0].stock || "",
    //     sku:productDetails[0].sku || "",
    // });
    const navigate = useNavigate();
    useEffect(() => {
        console.log("view proposal",productDetails);
        
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = ''; // Some browsers require returnValue to be set for the dialog to show
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    console.log("Product Details:", Array.isArray(productDetails), productDetails.name);

    const handleEdit = () => {
        navigate('/admin-dashboard/updateproduct'); 
    };

    return (
        <>
            <div className="content-wrapper ">
            {product?.map((data) => (             
                <div className='m-3'> 
                <div className="d-flex justify-content-between align-items-center m-2"> 
                <h3 className="mb-0">{data.name}</h3> 
                <button className="btn btn-primary mt-2" onClick={handleEdit}>
                    Edit Product
                </button>
            </div>
                <section className="content m-2">
                    
                        <div className="row" key={data.id}>
                        <div className="col-md-7 mt-1">
                            
                               
                                <div className='card'>
                                    <div className='mb-2 ml-2'></div>
                                    <div className='m-2'>
                                        <img
                                            className='img img-fluid img-cover'
                                            src={data.imgUrl !== undefined  ? data.imgUrl : 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'}
                                            alt='product image'
                                        />
                                    </div>
                                    <div className='m-2'>
                                        <div className='d-flex text-start mb-1'>
                                            <h6 className='w-25'>Description</h6>
                                            <p className='ml-1'>{data.description}</p>
                                        </div>
                                        <div className='d-flex text-start mb-1'>
                                            <h6 className='w-25'>Tags</h6>
                                            <p className='ml-1'>{data.tags}</p>
                                        </div>
                                        <div className='d-flex text-start mb-1'>
                                            <h6 className='w-25'>Keywords</h6>
                                            <p className='ml-1'>{data.keywords}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 mt-5">
                                <div className='card p-2 text-start'>
                                    <div className='d-flex text-start'>
                                        <h6 className='w-25'>Sku</h6>
                                        <p className='ml-1'>{data.sku}</p>
                                    </div>
                                    <div className='d-flex text-start'>
                                        <h6 className='w-25'>Purchase Price</h6>
                                        <p className='ml-1'>{data.currency} {data.purchasePrice}</p>
                                    </div>
                                    <div className='d-flex text-start'>
                                        <h6 className='w-25'>MRP</h6>
                                        <p className='ml-1'>{data.currency} {data.mrp}</p>
                                    </div>
                                    <div className='d-flex text-start'>
                                        <h6 className='w-25'>Sale Price</h6>
                                        <p className='ml-1'>{data.currency} {data.salePrice}</p>
                                    </div>
                                </div>
                                <div className='card p-3 text-start'>
                                    <div className='d-flex text-start'>
                                        <h6 className='w-25'>Category</h6>
                                        <p className='ml-1'>{data.category}</p>
                                    </div>
                                    <div className='d-flex text-start'>
                                        <h6 className='w-25'>Purchase Type</h6>
                                        <p className='ml-1'>{data.purchaseType}</p>
                                    </div>
                                    <div className='d-flex text-start'>
                                        <h6 className='w-25'>Stock</h6>
                                        <p className='ml-1'>{data.stock}</p>
                                    </div>
                                    <div className='d-flex text-start'>
                                        <h6 className='w-25'>Created On</h6>
                                        <p className='ml-1'>{moment(data.createdAt).format("MMMM DD, YYYY")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                   
                   
                </section></div>
            ))}
            </div>
        </>
    );
}

export default ViewProduct;
