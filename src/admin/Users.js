import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
// import { Link } from "react-router-dom";

import { useEditUserContext } from "../context/EditUserContext.jsx";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const [auth, setAuth] = useAuth();
  const [UserDetails, setUserDetails] = useEditUserContext();

  const [userdata, setUserdata] = useState(null);
  const [deleteId, setDeleteId] = useState();
  const navigate = useNavigate();

  console.log("UserDetails", UserDetails);

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

      // console.log(res);
    } catch (error) {}
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/user/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // Sending token in Authorization header
        },
      });
      console.log("delete Successful:", res);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("auth-test", auth);
    if (auth?.token) {
      getUser();
    }
  }, [auth]);

  const handleAddUser = () => {
    navigate("/admin-dashboard/newuser");
  };
  const HandleView = (data) => {
    setUserDetails(data);
    navigate("/admin-dashboard/view");
  };

  const handleUpdateForm = (data) => {
    setUserDetails(data);
    navigate("/admin-dashboard/Update");
  };
  const handleDeleteID = (id) => {
    setDeleteId(id);
    console.log("deletedid:", deleteId);
  };

  return (
    <>
      {" "}
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row m-2">
              <button
                onClick={handleAddUser}
                className="btn btn-lg  btn-success"
              >
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
                            <th>Number of Subscription</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userdata?.map((data) => (
                            <tr key={data._id}>
                              <td>{data.lastName}</td>
                              <td>{data.firstName}</td>
                              <td>{data.phone}</td>

                              <td>{data.subscription.length}</td>
                              <td>
                                <div className="d-flex justify-content-center">
                                  <button
                                    className="m-1 btn btn-primary"
                                    onClick={() => HandleView(data)}
                                  >
                                    View
                                  </button>{" "}
                                  <button
                                    className="m-1  btn btn-danger"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => handleDeleteID(data?._id)}
                                  >
                                    Delete
                                  </button>
                                  <button
                                    className="m-1 btn btn-dark"
                                    onClick={() => handleUpdateForm(data)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Modal */}
      {/* delete popup */}
      <div>
        {/* Button trigger modal */}

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Delete
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
              <div className="modal-body">Are you sure </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
