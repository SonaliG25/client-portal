import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [subscription, setSubscription] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   username,
    //   email,
    //   password,
    //   role,
    //   subscription,
    //   purchaseHistory,
    //   firstName,
    //   lastName,
    //   phone,
    //   addresses
    // );

    try {
      const res = await axios.post(`http://localhost:3000/user/register`, {
        username,
        email,
        password,
        role,
        subscription,
        purchaseHistory,
        firstName,
        lastName,
        phone,
        addresses,
      });
      console.log(res);
      navigate("/admin-dashboard/allusers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="text-dark">Add User</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Project Add</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Person Information</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputName">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      id="inputName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName">Last Name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      id="inputName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName">Phone</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      id="inputName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputStatus">User Type</label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      id="inputStatus"
                      className="form-control custom-select"
                    >
                      <option selected disabled>
                        Select one
                      </option>
                      <option value="lead">Lead</option>
                      <option value="prospect">Prospect</option>
                      <option value="opportunity">Opportunity</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName">UserName</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      id="inputName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName">Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      id="inputName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      id="inputName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputStatus">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      id="inputStatus"
                      className="form-control custom-select"
                    >
                      <option selected disabled>
                        Select one
                      </option>
                      <option value="client">Client</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="developer">Developer</option>
                    </select>
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Address</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputEstimatedBudget">Street</label>
                    <input
                      value={addresses.street}
                      onChange={(e) =>
                        setAddresses({ ...addresses, street: e.target.value })
                      }
                      type="text"
                      id="inputEstimatedBudget"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputSpentBudget">City</label>
                    <input
                      value={addresses.city}
                      onChange={(e) =>
                        setAddresses({ ...addresses, city: e.target.value })
                      }
                      type="text"
                      id="inputSpentBudget"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEstimatedDuration">State</label>
                    <input
                      value={addresses.state}
                      onChange={(e) =>
                        setAddresses({ ...addresses, state: e.target.value })
                      }
                      type="text"
                      id="inputEstimatedDuration"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEstimatedDuration">ZipCode</label>
                    <input
                      value={addresses.zipCode}
                      onChange={(e) =>
                        setAddresses({ ...addresses, zipCode: e.target.value })
                      }
                      type="text"
                      id="inputEstimatedDuration"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputEstimatedDuration">Country</label>
                    <input
                      value={addresses.country}
                      onChange={(e) =>
                        setAddresses({ ...addresses, country: e.target.value })
                      }
                      type="text"
                      id="inputEstimatedDuration"
                      className="form-control"
                    />
                  </div>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button
                onClick={handleSubmit}
                className="btn btn-success btn-block"
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
  //   <div
  //     className="hold-transition login-page"
  //     style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
  //   >
  //     <div className="register-box">
  //       <div className="register-logo">
  //         <a href="/">
  //           <b>Admin</b>LTE
  //         </a>
  //       </div>
  //       <div className="card">
  //         <div className="card-body register-card-body">
  //           <p className="login-box-msg">Register a new membership</p>
  //           <form onSubmit={handleSubmit}>
  //             {/* First Row */}
  //             <div className="row">
  //               <div className="col-xs-12 col-sm-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="First Name"
  //                     value={firstName}
  //                     onChange={(e) => setFirstName(e.target.value)}
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-xs-12 col-sm-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="Last Name"
  //                     value={lastName}
  //                     onChange={(e) => setLastName(e.target.value)}
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-xs-12 col-sm-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="Phone"
  //                     value={phone}
  //                     onChange={(e) => setPhone(e.target.value)}
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-xs-12 col-sm-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="Username"
  //                     value={username}
  //                     onChange={(e) => setUsername(e.target.value)}
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-xs-12 col-sm-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="email"
  //                     className="form-control"
  //                     placeholder="Email"
  //                     value={email}
  //                     onChange={(e) => setEmail(e.target.value)}
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-xs-12 col-sm-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="password"
  //                     className="form-control"
  //                     placeholder="Password"
  //                     value={password}
  //                     onChange={(e) => setPassword(e.target.value)}
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-xs-12 col-sm-6">
  //                 <div className="form-group">
  //                   <select
  //                     className="form-control"
  //                     value={userType}
  //                     onChange={(e) => setUserType(e.target.value)}
  //                   >
  //                     <option value="lead">Lead</option>
  //                     <option value="prospect">Prospect</option>
  //                     <option value="opportunity">Opportunity</option>
  //                     <option value="customer">Customer</option>
  //                   </select>
  //                 </div>
  //               </div>
  //               <div className="col-xs-12 col-sm-6">
  //                 <div className="form-group">
  //                   <select
  //                     className="form-control"
  //                     value={role}
  //                     onChange={(e) => setRole(e.target.value)}
  //                   >
  //                     <option value="client">Client</option>
  //                     <option value="admin">Admin</option>
  //                     <option value="manager">Manager</option>
  //                     <option value="developer">Developer</option>
  //                   </select>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Second Row for Addresses  */}
  //             <div className="row">
  //               <div className="col-xs-12 col-sm-12">
  //                 <h5>Addresses</h5>

  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="Street"
  //                     value={addresses.street}
  //                     onChange={(e) =>
  //                       setAddresses({ ...addresses, street: e.target.value })
  //                     }
  //                     required
  //                   />
  //                 </div>
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="City"
  //                     value={addresses.city}
  //                     onChange={(e) =>
  //                       setAddresses({ ...addresses, city: e.target.value })
  //                     }
  //                     required
  //                   />
  //                 </div>
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="State"
  //                     value={addresses.state}
  //                     onChange={(e) =>
  //                       setAddresses({ ...addresses, state: e.target.value })
  //                     }
  //                     required
  //                   />
  //                 </div>
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="Zip Code"
  //                     value={addresses.zipCode}
  //                     onChange={(e) =>
  //                       setAddresses({ ...addresses, zipCode: e.target.value })
  //                     }
  //                     required
  //                   />
  //                 </div>
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="country"
  //                     value={addresses.country}
  //                     onChange={(e) =>
  //                       setAddresses({ ...addresses, country: e.target.value })
  //                     }
  //                     required
  //                   />
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Submit Button */}
  //             <div className="d-flex justify-content-between">
  //               <button
  //                 type="submit"
  //                 className=" px-5 py-2 btn  btn-lg btn-primary"
  //               >
  //                 Create
  //               </button>
  //               <button
  //                 type="submit"
  //                 className="px-5 py-2  btn btn-lg btn-dark"
  //               >
  //                 Edit
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
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
