import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../utils/endPointNames";

function SubscriptionDetails() {
  const [auth] = useAuth();
  const { id } = useParams();
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);

  useEffect(() => {
    if (auth?.token && id) {
      axios
        .get(`${BASE_URL}/subscription/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => {
          setSubscriptionInfo(res.data);
          console.log("res", res.data);
        })
        .catch((error) => console.error("Error fetching order:", error));
    }
  }, [auth, id]);
  const calculateSubscriptionEndDate = (
    subscriptionStartDate,
    subscriptionDurationInMonths
  ) => {
    const startDate = new Date(subscriptionStartDate);
    startDate.setMonth(startDate.getMonth() + subscriptionDurationInMonths);
    return startDate;
  };
  return (
    <div className="content-wrapper ">
      <h1 className="text-center mb-4">Subscription Details</h1>
      {subscriptionInfo ? (
        <div className="invoice p-3 mb-3">
          {/* Subscription Information */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Subscription Details</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Subscription Status:</strong>{" "}
                    <span
                      className={`badge ${
                        subscriptionInfo.subscriptionStatus === "Sent"
                          ? "badge-warning"
                          : subscriptionInfo.subscriptionStatus === "active"
                          ? "badge-success"
                          : subscriptionInfo.subscriptionStatus === "inactive"
                          ? "badge-dark"
                          : "badge-danger"
                      }`}
                    >
                      {subscriptionInfo.subscriptionStatus}
                    </span>
                  </p>
                  {/* <p>
                    <strong>Shipping Address:</strong>{" "}
                    {`${subscriptionInfo.address.street1}, ${subscriptionInfo.shippingAddress.city}, ${subscriptionInfo.shippingAddress.state}, ${subscriptionInfo.shippingAddress.country}`}
                  </p> */}
                  <p>
                    <strong>Subscription Duration (In Months):</strong>{" "}
                    {subscriptionInfo.subscriptionDurationInMonths}
                  </p>
                  <p>
                    <strong>subscription Start Date:</strong>{" "}
                    {new Date(
                      subscriptionInfo.subscriptionStartDate
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>subscription End Date:</strong>{" "}
                    {new Date(
                      calculateSubscriptionEndDate(
                        subscriptionInfo.subscriptionStartDate,
                        subscriptionInfo.subscriptionDurationInMonths
                      )
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    {`${subscriptionInfo.finalAmount} ${subscriptionInfo.totalAmountCurrency}`}
                  </p>
                  <p>
                    <strong> Total no of products:</strong>{" "}
                    {`${subscriptionInfo.products.length} `}
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
                    <th>Total With Tax</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    {/* <th>Purchase Type</th> */}
                  </tr>
                </thead>
                <tbody>
                  {subscriptionInfo.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.productId.name}</td>
                      <td>{product.productId.sku}</td>
                      <td>{`${subscriptionInfo.totalAmountCurrency} ${product.total}`}</td>
                      <td>{product.quantity}</td>
                      <td>{`${subscriptionInfo.totalAmountCurrency} ${product.total}`}</td>
                      {/* <td>{product.purchaseType}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-header">
              <h3 className="card-title">Payment Details</h3>
            </div>
            <div className="card-body">
              <p>We can show once strip integration is done</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Loading Subscription details...</p>
        </div>
      )}
    </div>
  );
}

export default SubscriptionDetails;
