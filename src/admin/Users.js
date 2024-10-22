import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

import { useEditUserContext } from "../context/EditUserContext";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const [auth, setAuth] = useAuth();
  const [UserDetails, setUserDetails] = useEditUserContext();

  const [userdata, setUserdata] = useState(null);
  const navigate = useNavigate();

  console.log("UserDetails", UserDetails);
  const [updateitem, setUpdateItem] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    userType: "",
    subscription: "",
    updatedkey: "",
  });

  // http://localhost:3000/user/user-detail/${id}
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/users`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // Sending token in Authorization header
        },
      });
      // console.log("auth:", auth?.token);
      setUserdata(res.data);
      // console.log("userdata:", userdata);

      console.log(res);
    } catch (error) {}
  };
  useEffect(() => {
    console.log("auth-test", auth);
    if (auth?.token) {
      getUser();
    }
  }, [auth]);

  const handleClick = () => {
    navigate("/admin-dashboard/newuser");
  };

  const handleUpdateForm = (data) => {
    setUserDetails(data);
    navigate("/admin-dashboard/Update");
  };
  const HandlePopup = (data) => {
    setUpdateItem({
      lastName: data.lastName,
      firstName: data.firstName,
      phone: data.phone,
      email: data.email,
      userType: data.userType,
      subscription: data.subscription.length,
      updatedkey: data._id,
    });
    // console.log(updateitem);
  };
  return (
    <>
      {" "}
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row m-2">
              <button onClick={handleClick} className="btn btn-lg  btn-success">
                Add user
              </button>
              <div className="col-12">
                <div className="card">
                  {/* <div className="card-header"></div> */}
                  <div className="card-body">
                    {!userdata ? (
                      <>
                        <div class="spinner-border" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <table
                        id="example2"
                        className="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>lastName</th>
                            <th>FirstName</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Number of Subscription</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userdata?.map((data, index) => (
                            <tr key={data._id}>
                              <td>{data.lastName}</td>
                              <td>{data.firstName}</td>
                              <td>{data.phone}</td>
                              <td> {data.addresses[0].city}</td>

                              <td>
                                {data.subscription.length}
                                {data.__id}
                              </td>
                              <td>
                                <button
                                  className="m-1 btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                  onClick={() => HandlePopup(data)}
                                >
                                  View
                                </button>{" "}
                                <button className="m-1  btn btn-danger">
                                  Delete
                                </button>
                                <button
                                  className="m-1 btn btn-dark"
                                  onClick={() => handleUpdateForm(data)}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        {/* <tfoot>
                        <tr>
                          <th>Rendering engine</th>
                          <th>Browser</th>
                          <th>Platform(s)</th>
                          <th>Engine version</th>
                          <th>CSS grade</th>
                        </tr>
                      </tfoot> */}
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* popup  */}
      {/* Button trigger modal */}
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="inputEstimatedBudget">username</label>
                <input
                  value={updateitem.lastName}
                  onChange={(e) =>
                    setUpdateItem({ ...updateitem, lastName: e.target.value })
                  }
                  type="text"
                  id="inputEstimatedBudget"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputEstimatedBudget">firstname</label>
                <input
                  value={updateitem.firstName}
                  onChange={(e) =>
                    setUpdateItem({ ...updateitem, firstName: e.target.value })
                  }
                  type="text"
                  id="inputEstimatedBudget"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputEstimatedBudget">Phone</label>
                <input
                  value={updateitem.phone}
                  onChange={(e) =>
                    setUpdateItem({ ...updateitem, phone: e.target.value })
                  }
                  type="text"
                  id="inputEstimatedBudget"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputEstimatedBudget">email</label>
                <input
                  value={updateitem.email}
                  onChange={(e) =>
                    setUpdateItem({ ...updateitem, email: e.target.value })
                  }
                  type="text"
                  id="inputEstimatedBudget"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputStatus">User Type</label>
                <select
                  value={updateitem.userType}
                  onChange={(e) =>
                    setUpdateItem({ ...updateitem, userType: e.target.value })
                  }
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
                <label htmlFor="inputEstimatedBudget">subscription</label>
                <input
                  value={updateitem.subscription}
                  onChange={(e) =>
                    setUpdateItem({
                      ...updateitem,
                      subscription: e.target.value,
                    })
                  }
                  type="text"
                  id="inputEstimatedBudget"
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-primary " data-dismiss="modal">
                view
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
