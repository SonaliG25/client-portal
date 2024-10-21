import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  // User state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("lead");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [addresses, setAddresses] = useState([
    {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    },
  ]);
  const [subscriptions, setSubscriptions] = useState([
    {
      planId: "",
      planName: "",
      startDate: "",
      endDate: "",
      status: "active",
    },
  ]); // Updated for subscription schema

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({
    //   firstName,
    //   lastName,
    //   phone,
    //   userType,
    //   username,
    //   email,
    //   password,
    //   role,
    //   addresses,
    //   subscriptions,
    // });
    try {
      const res = await axios.post(`http://localhost:3000/user/register`, {
        firstName,
        lastName,
        phone,
        userType,
        username,
        email,
        password,
        role,
        addresses,
        subscriptions,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="hold-transition login-page"
      style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
    >
      <div className="register-box">
        <div className="register-logo">
          <a href="/">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            <form onSubmit={handleSubmit}>
              {/* First Row */}
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value="lead">Lead</option>
                      <option value="prospect">Prospect</option>
                      <option value="opportunity">Opportunity</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="client">Client</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="developer">Developer</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Second Row for Addresses and Subscriptions */}
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <h5>Addresses</h5>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Street"
                      value={addresses.street}
                      onChange={(e) =>
                        setAddresses({ ...addresses, street: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      value={addresses.city}
                      onChange={(e) =>
                        setAddresses({ ...addresses, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      value={addresses.state}
                      onChange={(e) =>
                        setAddresses({ ...addresses, state: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zip Code"
                      value={addresses.zipCode}
                      onChange={(e) =>
                        setAddresses({ ...addresses, zipCode: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="country"
                      value={addresses.country}
                      onChange={(e) =>
                        setAddresses({ ...addresses, country: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                  <div
                    className="form-group 
                  "
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Plan ID"
                      value={subscriptions.planId}
                      onChange={(e) =>
                        setSubscriptions({
                          ...subscriptions,
                          planId: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Plan Name"
                      value={subscriptions.planName}
                      onChange={(e) =>
                        setSubscriptions({
                          ...subscriptions,
                          planName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Start Date"
                      value={subscriptions.startDate} // Convert date to string
                      onChange={(e) =>
                        setSubscriptions({
                          ...subscriptions,
                          startDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="End Date"
                      value={subscriptions.endDate}
                      onChange={(e) =>
                        setSubscriptions({
                          ...subscriptions,
                          endDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={subscriptions.status}
                      onChange={(e) =>
                        setSubscriptions({
                          ...subscriptions,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-block btn-primary btn-block"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// {
//   "firstName": "John",
//   "lastName": "Doe",
//   "phone": "+1234567890",
//   "userType": "prospect",
//   "username": "John",
//   "email": "user@test.com",
//   "password": "123456",
//   "role": "client",
//   "addresses": [
//     {
//       "street": "123 Main St",
//       "city": "New York",
//       "state": "NY",
//       "zipCode": "10001",
//       "country": "USA"
//     }
//   ],
//   "purchaseHistory:[],
//   "subscription": [],
//   "createdAt": "2024-10-08T12:34:56.789Z",
//   "updatedAt": "2024-10-08T12:34:56.789Z"
// }

// user table structure
// name , phone, userType,username, email,no of subscriptions|| update | delete(warning:Are u sure?)
