import React, { useEffect, useState } from "react";
import { useEditUserContext } from "../context/EditUserContext.jsx";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function UpdateForm() {
  const [UserDetails] = useEditUserContext(); // Get user details from context
  const [auth] = useAuth(); // Get auth context (token)
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addresses: [{ city: "", street: "", state: "", zipCode: "", country: "" }],
    subscription: 0,
  });

  useEffect(() => {
    if (UserDetails) {
      setUserForm({
        firstName: UserDetails.firstName || "",
        lastName: UserDetails.lastName || "",
        phone: UserDetails.phone || "",
        addresses: [
          {
            city: UserDetails?.addresses?.[0]?.city || "",
            street: UserDetails?.addresses?.[0]?.street || "",
            state: UserDetails?.addresses?.[0]?.state || "",
            zipCode: UserDetails?.addresses?.[0]?.zipCode || "",
            country: UserDetails?.addresses?.[0]?.country || "",
          },
        ],
        subscription: UserDetails.subscription?.length || 0,
      });
    }
  }, [UserDetails, auth?.token]);

  // Handle update request
  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/user/${UserDetails?._id}`,
        {
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          phone: userForm.phone,
          addresses: [userForm.addresses[0]], // Send the updated address
          subscription: [], // Update subscription as needed
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      const updatedUser =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      console.log("Updated User:", updatedUser);
      navigate("/admin-dashboard/allusers");
    } catch (error) {
      console.error("Error data:", error.response?.data);
      console.error("Error updating user:", error);
    }
  };

  // Handle input changes for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle address input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prevForm) => ({
      ...prevForm,
      addresses: [{ ...prevForm.addresses[0], [name]: value }],
    }));
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="text-dark">Update User</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Update User</li>
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
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userForm.firstName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userForm.lastName}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={userForm.phone}
                    onChange={handleInputChange}
                    className="form-control"
                  />
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
                  <label htmlFor="street">Street</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={userForm.addresses[0].street}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={userForm.addresses[0].city}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={userForm.addresses[0].state}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">ZipCode</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={userForm.addresses[0].zipCode}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={userForm.addresses[0].country}
                    onChange={handleAddressChange}
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
              className="btn btn-success btn-block"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateForm;
