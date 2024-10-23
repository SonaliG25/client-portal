// import React, { useEffect } from "react";
// import { useEditUserContext } from "../context/EditUserContext.jsx";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext.jsx";

// function UpdateForm() {
//   const [UserDetails, setUserDetails] = useEditUserContext(); // Get user details and setter
//   const [auth] = useAuth(); // Get auth context (token)

//   // Debugging the state to ensure it's being updated
//   useEffect(() => {
//     console.log("UserDetails:", UserDetails); // Logs state to verify changes
//   }, [UserDetails]);

//   // Handle update request
//   const handleUpdate = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:3000/user/${UserDetails?._id}`, // API endpoint with user's ID
//         {
//           // Data you're sending in the request
//           purchaseHistory: [], // Example empty array, change if necessary
//           subscription: UserDetails?.subscription?.length, // If it's an array, sending length
//           firstName: UserDetails?.firstName, // Send updated first name
//           lastName: UserDetails?.lastName, // Send updated last name
//           phone: UserDetails?.phone, // Send updated phone
//           addresses: [{ city: UserDetails?.addresses?.[0]?.city }], // Send updated address (only first one)
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${auth?.token}`, // Include the token for authentication
//           },
//         }
//       );
//       console.log("Updated User:", res.data); // Log the response to ensure success
//     } catch (error) {
//       console.error("Error updating user:", error); // Log errors for debugging
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row mb-2">
//             <div className="col-sm-6">
//               <h1 className="text-dark">Update User</h1>
//             </div>
//             <div className="col-sm-6">
//               <ol className="breadcrumb float-sm-right">
//                 <li className="breadcrumb-item">
//                   <a href="#">Home</a>
//                 </li>
//                 <li className="breadcrumb-item active">Update User</li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="content">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="card card-light">
//               <div className="card-header">
//                 <h3 className="card-title">Personal Information</h3>
//               </div>
//               <div className="card-body">
//                 {/* First Name */}
//                 <div className="form-group">
//                   <label htmlFor="inputFirstName">First Name</label>
//                   <input
//                     value={UserDetails?.firstName || ""} // Controlled input for first name
//                     onChange={(e) =>
//                       setUserDetails({
//                         ...UserDetails,
//                         firstName: e.target.value, // Update first name
//                       })
//                     }
//                     type="text"
//                     className="form-control"
//                     id="inputFirstName"
//                   />
//                 </div>

//                 {/* Last Name */}
//                 <div className="form-group">
//                   <label htmlFor="inputLastName">Last Name</label>
//                   <input
//                     value={UserDetails?.lastName || ""} // Controlled input for last name
//                     onChange={(e) =>
//                       setUserDetails({
//                         ...UserDetails,
//                         lastName: e.target.value, // Update last name
//                       })
//                     }
//                     type="text"
//                     className="form-control"
//                     id="inputLastName"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="form-group">
//                   <label htmlFor="inputPhone">Phone</label>
//                   <input
//                     value={UserDetails?.phone || ""} // Controlled input for phone
//                     onChange={(e) =>
//                       setUserDetails({
//                         ...UserDetails,
//                         phone: e.target.value, // Update phone number
//                       })
//                     }
//                     type="text"
//                     className="form-control"
//                     id="inputPhone"
//                   />
//                 </div>

//                 {/* Address */}
//                 <div className="form-group">
//                   <label htmlFor="inputAddress">Address</label>
//                   <input
//                     value={UserDetails?.addresses?.[0]?.city || ""} // Controlled input for address
//                     onChange={(e) =>
//                       setUserDetails({
//                         ...UserDetails,
//                         addresses: [{ city: e.target.value }], // Update address (city)
//                       })
//                     }
//                     type="text"
//                     className="form-control"
//                     id="inputAddress"
//                   />
//                 </div>

//                 {/* Subscription (number of subscriptions) */}
//                 <div className="form-group">
//                   <label htmlFor="inputSubscription">Subscription</label>
//                   <input
//                     value={UserDetails?.subscription?.length || 0} // Controlled input for subscription count
//                     onChange={(e) =>
//                       setUserDetails({
//                         ...UserDetails,
//                         subscription: Array(parseInt(e.target.value, 10)).fill(
//                           null
//                         ), // Update subscription with new length
//                       })
//                     }
//                     type="text"
//                     className="form-control"
//                     id="inputSubscription"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Update Button */}
//         <div className="row">
//           <div className="col-12">
//             <button className="btn btn-dark btn-block" onClick={handleUpdate}>
//               Update
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default UpdateForm;
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
    if (UserDetails) {
      setUserForm({
        userId: UserDetails._id,
        firstName: UserDetails.firstName || "",
        lastName: UserDetails.lastName || "",
        phone: UserDetails.phone || "",
        addresses: [{ city: UserDetails?.addresses?.[0]?.city || "" }],
        subscription: UserDetails?.subscription?.length || 0, // Assuming subscription is an array
      });
    }
  }, [UserDetails]);

  // Handle input changes for form
  const handleChange = (e) => {
    console.log("updatedUser:", userForm);
  };

  // Handle the update and make API call
  const handleUpdate = async () => {
    console.log("updatedUser:", userForm);

    // try {
    //   const res = await axios.put(
    //     `http://localhost:3000/user/${UserDetails?._id}`,
    //     {
    //       purchaseHistory: [], // Example empty array, change if necessary
    //       subscription: userForm.subscription, // Update subscription length
    //       firstName: userForm.firstName, // Update first name
    //       lastName: userForm.lastName, // Update last name
    //       phone: userForm.phone, // Update phone number
    //       addresses: userForm.addresses, // Update addresses
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${auth?.token}`, // Include token for authentication
    //       },
    //     }
    //   );
    //   console.log("Updated User:", res.data);
    // } catch (error) {
    //   console.error("Error updating user:", error);
    // }
  };

  // Log userForm state to check updates
  // useEffect(() => {
  //   console.log("Updated userForm state:", userForm);
  // }, [userForm]);

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
                  <label>First Name</label>
                  <input
                    name="firstName"
                    value={userForm.firstName} // Controlled input for first name
                    onChange={(e) =>
                      setUserForm({ ...userForm, firstName: e.target.value })
                    } // Update local state on change
                    type="text"
                    className="form-control"
                  />
                </div>

                {/* Last Name */}
                <div className="form-group">
                  <label htmlFor="inputLastName">Last Name</label>
                  <input
                    name="lastName"
                    value={userForm.lastName} // Controlled input for last name
                    onChange={(e) =>
                      setUserForm({ ...userForm, lastName: e.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="inputLastName"
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={userForm.phone} // Controlled input for phone
                    onChange={(e) =>
                      setUserForm({ ...userForm, phone: e.target.value })
                    }
                    type="text"
                    className="form-control"
                  />
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="inputAddress">Address</label>
                  <input
                    name="city"
                    value={userForm.addresses[0].city} // Controlled input for address (city)
                    onChange={(e) =>
                      setUserForm({ ...userForm, addresses: e.target.value })
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
                      setUserForm({ ...userForm, subscription: e.target.value })
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
