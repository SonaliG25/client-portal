import React, { useEffect, useState } from "react";
import { useEditUserContext } from "../context/EditUserContext.jsx";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

function UpdateForm() {
  const [UserDetails] = useEditUserContext(); // Get user details from context
  const [auth] = useAuth(); // Get auth context (token)

  // Create a new local state to hold extracted values from UserDetails
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addresses: [{ city: "" }],
    subscription: 0,
  });

  // Extract data from UserDetails and set in new state when component mounts
  useEffect(() => {
    console.log("token", auth?.token);
    console.log("userDetails", UserDetails);

    if (UserDetails) {
      setUserForm({
        purchaseHistory: [], // Assuming this field is required
        subscription: UserDetails?.subscription?.length || 0, // Assuming subscription is an array
        firstName: UserDetails.firstName || "",
        lastName: UserDetails.lastName || "",
        phone: UserDetails.phone || "",
        addresses: [{ city: UserDetails?.addresses?.[0]?.city || "" }],
        userId: UserDetails._id,
      });
      console.log("userid:", userForm.userId);
    }
  }, [UserDetails, auth?.token]); // Add dependencies to rerun effect on change

  // Handle update request
  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        // Change PUT to PATCH
        `http://localhost:3000/user/${UserDetails?._id}`, // API endpoint with user's ID
        {
          // Data you're sending in the request
          purchaseHistory: [], // Example empty array, change if necessary
          subscription: userForm.subscription, // Send updated subscription count
          firstName: userForm.firstName, // Send updated first name
          lastName: userForm.lastName, // Send updated last name
          phone: userForm.phone, // Send updated phone
          addresses: [{ city: userForm.addresses[0].city }], // Send updated address (only first one)
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // Include the token for authentication
          },
        }
      );
      const updatedUser =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      console.log("Updated User:", updatedUser); // Log the response to ensure success
    } catch (error) {
      console.error("Error data:", error.response.data); // Log errors for debugging
      console.error("Error updating user:", error); // Log errors for debugging
    }
  };

  // Handle input changes for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Update the respective field
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
      </section>

      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-light">
              <div className="card-header">
                <h3 className="card-title">Personal Information</h3>
              </div>
              <div className="card-body">
                {/* First Name */}
                <div className="form-group">
                  <label htmlFor="inputFirstName">First Name</label>
                  <input
                    name="firstName"
                    value={userForm.firstName} // Controlled input for first name
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    id="inputFirstName"
                  />
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label htmlFor="inputLastName">Last Name</label>
                  <input
                    name="lastName"
                    value={userForm.lastName} // Controlled input for last name
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    id="inputLastName"
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="inputPhone">Phone</label>
                  <input
                    name="phone"
                    value={userForm.phone} // Controlled input for phone
                    onChange={handleInputChange}
                    type="text"
                    className="form-control"
                    id="inputPhone"
                  />
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="inputAddress">Address</label>
                  <input
                    name="city"
                    value={userForm.addresses[0].city} // Controlled input for address
                    onChange={(e) =>
                      setUserForm((prevForm) => ({
                        ...prevForm,
                        addresses: [{ city: e.target.value }], // Update address (city)
                      }))
                    }
                    type="text"
                    className="form-control"
                    id="inputAddress"
                  />
                </div>

                {/* Subscription (number of subscriptions) */}
                <div className="form-group">
                  <label htmlFor="inputSubscription">Subscription</label>
                  <input
                    name="subscription"
                    value={userForm.subscription} // Controlled input for subscription count
                    onChange={(e) =>
                      setUserForm((prevForm) => ({
                        ...prevForm,
                        subscription: parseInt(e.target.value, 10) || 0, // Update subscription with new length
                      }))
                    }
                    type="number"
                    className="form-control"
                    id="inputSubscription"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="row">
          <div className="col-12">
            <button className="btn btn-dark btn-block" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateForm;
