import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Productlist() {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useAuth();

  const FetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/product/getProducts`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("getProducts:", res);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchProduct();
  }, []);
  return (
    <>
      <div className="content-wrapper">
        <hr />
        <h2>Product List</h2>
        <div className="container my-4">
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    {/* <h6 className="card-title">{product.sku}</h6> */}
                    <h5 className="card-title fw-bold">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <strong>Price:</strong> ${product.salePrice}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary w-100">Add Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Productlist;
