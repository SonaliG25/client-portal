import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  // User state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [subscription, setSubscription] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
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
                  <li className="breadcrumb-item active">Add User</li>
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
                  <h3 className="card-title">Personal Information</h3>
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
                    <label htmlFor="inputName">Mobile number</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      maxLength={13}
                      id="inputName"
                      className="form-control"
                    />
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
