import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function SubscriptionsbyUser() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch subscriptions on component mount
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/subscription/${auth.user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setSubscriptions(response.data);
    } catch (err) {
      setError("Failed to fetch subscriptions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      console.log("auth:", auth.user.userId);

      fetchSubscriptions();
    }
  }, [auth]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Subscriptions Details</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          {/* Loading and Error Messages */}
          {loading && (
            <div className="  text-center" role="alert">
              Loading...
            </div>
          )}
          {error && (
            <div className="  text-center" role="alert">
              {error}
            </div>
          )}

          {/* Subscription Table */}
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Proposal ID</th>
                      <th>Status</th>
                      <th>Final Amount</th>
                      <th>Subscription Date</th>
                      <th>Duration (months)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* If no error, map over subscriptions */}
                    {!error &&
                      subscriptions.map((subscription) => (
                        <tr key={subscription._id}>
                          <td>{subscription.customer}</td>
                          <td>{subscription.proposalId}</td>
                          <td>{subscription.subscriptionStatus}</td>
                          <td>
                            {subscription.finalAmount}{" "}
                            {subscription.totalAmountCurrency}
                          </td>
                          <td>
                            {new Date(
                              subscription.subscriptionDate
                            ).toLocaleDateString()}
                          </td>
                          <td>{subscription.subscriptionDurationInMonths}</td>
                        </tr>
                      ))}

                    {/* If no subscriptions found and no error */}
                    {!loading && !error && subscriptions.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No subscriptions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SubscriptionsbyUser;
