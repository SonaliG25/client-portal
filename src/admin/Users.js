import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
const Users = () => {
  const [auth, setAuth] = useAuth();
  const [userdata, setUserdata] = useState(null);
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/users`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // Sending token in Authorization header
        },
      });
      console.log("auth:", auth?.token);
      setUserdata(res.data);
      console.log("userdata:", userdata);

      console.log(res);
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {" "}
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header"></div>
                  <div className="card-body">
                    <table
                      id="example2"
                      className="table table-bordered table-hover"
                    >
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Usertype</th>
                          <th>Number of Subscription</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userdata?.map((data) => (
                          <tr key={data._id}>
                            <td>{data.username}</td>
                            <td>{data.firstName}</td>
                            <td>{data.phone}</td>
                            <td> {data.email}</td>
                            <td>{data.userType}</td>
                            <td>{data.subscription.length}</td>
                            <td>
                              <span className="btn btn-primary">Edit</span>{" "}
                              <span className="btn btn-danger">Delete</span>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Users;
