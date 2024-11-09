import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function SubscriptionDetails() {
  const [auth] = useAuth();
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    if (auth?.token && id) {
      axios
        .get(`http://localhost:3000/order/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setOrderInfo(res.data))
        .catch((error) => console.error("Error fetching order:", error));
    }
  }, [auth, id]);

  return (
    <div className="content-wrapper mt-5">
      <h1 className="text-center mb-4">Order Details</h1>
      {orderInfo ? (
        <div className="invoice p-3 mb-3">
          {/* Order Information */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Order Information</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Customer Name:</strong> {orderInfo.customer.name}
                  </p>
                  <p>
                    <strong>Shipping Address:</strong>{" "}
                    {`${orderInfo.shippingAddress.addressLine1}, ${orderInfo.shippingAddress.city}, ${orderInfo.shippingAddress.state}, ${orderInfo.shippingAddress.country}`}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {orderInfo.paymentMethod}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(orderInfo.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Payment Status:</strong> {orderInfo.paymentStatus}
                  </p>
                  <p>
                    <strong>Order Status:</strong> {orderInfo.orderStatus}
                  </p>
                  <p>
                    <strong>Shipping Cost:</strong>{" "}
                    {`${orderInfo.shippingCost} ${orderInfo.totalAmountCurrency}`}
                  </p>
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    {`${orderInfo.totalAmount} ${orderInfo.totalAmountCurrency}`}
                  </p>
                  <p>
                    <strong>Grand Total:</strong>{" "}
                    {`${orderInfo.grandTotal} ${orderInfo.grandTotalCurrency}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="card mt-4">
            <div className="card-header">
              <h3 className="card-title">Product Details</h3>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Sale Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Purchase Type</th>
                  </tr>
                </thead>
                <tbody>
                  {orderInfo.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.sku}</td>
                      <td>{`${product.currency} ${product.salePrice}`}</td>
                      <td>{product.quantity}</td>
                      <td>{`${product.currency} ${product.total}`}</td>
                      <td>{product.purchaseType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Loading order details...</p>
        </div>
      )}
    </div>
  );
}

export default SubscriptionDetails;
