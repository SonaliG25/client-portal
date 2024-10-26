import React, { useEffect,useState } from 'react'

import { useEditUserContext } from '../../context/EditUserContext';

import moment from 'moment';


function ViewProduct() {
  const [productDetails,setproductDetails] = useEditUserContext()
  const product = [productDetails]
  console.log("product Detqaisl",Array.isArray(productDetails), productDetails)

  return (
    <>
    <div className="content-wrapper">
      <section className="content-header">
       
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
      {product?.map((data)=>
        <div className="row">
          <div className="col-md-7 mt-1">
          <h3 >{data.name}</h3>  
            
            <div className='card'>
             <div className='mb-2 ml-2'>
             
             </div>
                    
    
              <div className='m-2'>
                <img className='img img-fluid' src={data.imgUrl || data.imgUrl !== ""?data.imgUrl:'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'} alt='product image'></img>
              </div>
              <div className='m-2'>
                <div className='d-flex text-start mb-1'>
                <h6 className='w-25 ' >Description </h6>
                <p className='ml-1' >{data.description}</p>
                </div>
                <div className='d-flex text-start mb-1'>
                <h6 className='w-25 '>Tags </h6>
                <p className='ml-1'>{data.tags}</p>
                </div>
                <div className='d-flex text-start mb-1'>
                <h6 className='w-25 '>Keywords </h6>
                <p className='ml-1'>{data.keywords}</p>
                </div>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          <div className="col-md-5 mt-5">
            
              <div className='card p-2 text-start' >
              <div className='d-flex text-start'>
              <h6 className='w-25 ' >Sku </h6>
              <p className='ml-1'>{data.sku}</p>
              </div>
              <div className='d-flex text-start'>
                <h6 className='w-25 '>Purchase Price</h6>
                <p className='ml-1'>{data.currency} {data.purchasePrice}</p>
                </div>
                <div className='d-flex text-start'>
                <h6 className='w-25 '>Mrp </h6>
                <p className='ml-1'>{data.currency} {data.salePrice}</p>
                </div>
                
              </div>
              <div className='card p-3 text-start'>
              <div className='d-flex text-start'>
                <h6 className='w-25'>Cateory </h6>
                <p className='ml-1'>{data.category}</p>
                </div>
                <div className='d-flex text-start'>
                <h6 className='w-25' >Purchase Type </h6>
                <p className='ml-1'>{data.purchaseType}</p>
                </div>
                <div className='d-flex text-start'>
                <h6 className='w-25'>Stock </h6>
                <p className='ml-1'>{data.stock}</p>
                </div>
                <div className='d-flex text-start'>
                <h6 className='w-25'>Created On </h6>
                <p className='ml-1'>{moment(data.createdAt).format("MMMM DD, YYYY")}</p>
                </div>
              </div>
             
              {/* /.card-body */}
            </div>
            {/* /.card */}
          
        </div>
        
      )} 
      </section>
    </div>
  </>
  )
}

export default ViewProduct
