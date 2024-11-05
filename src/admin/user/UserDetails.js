import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
// import { useEditUserContext } from "../../context/EditUserContext";

function View() {
  // const [UserDetails, setUserDetails] = useEditUserContext();
  // const [UserDetails, setUserDetails] = useState();
  const [viewInfo, setViewInfo] = useState(null);
  const [auth, seAuth] = useAuth();
  const { id } = useParams();

  const viewpage = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setViewInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      viewpage();
    }
  }, [auth]);

  return (
    <>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="text-dark">User Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">User Details</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

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
                    <label htmlFor="inputFirstName">First Name</label>
                    <input
                      type="text"
                      id="inputFirstName"
                      className="form-control"
                      value={viewInfo?.firstName || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputLastName">Last Name</label>
                    <input
                      type="text"
                      id="inputLastName"
                      className="form-control"
                      value={viewInfo?.lastName || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPhone">Phone</label>
                    <input
                      type="text"
                      id="inputPhone"
                      className="form-control"
                      value={viewInfo?.phone || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputUsername">UserName</label>
                    <input
                      type="text"
                      id="inputUsername"
                      className="form-control"
                      value={viewInfo?.username || ""}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      type="text"
                      id="inputEmail"
                      className="form-control"
                      value={viewInfo?.email || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputRole">Role</label>
                    <input
                      type="text"
                      id="inputRole"
                      className="form-control"
                      value={viewInfo?.role || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
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
                    <label htmlFor="inputStreet">Street</label>
                    <input
                      type="text"
                      id="inputStreet"
                      className="form-control"
                      value={viewInfo?.addresses?.[0]?.street || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputCity">City</label>
                    <input
                      type="text"
                      id="inputCity"
                      className="form-control"
                      value={viewInfo?.addresses?.[0]?.city || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputState">State</label>
                    <input
                      type="text"
                      id="inputState"
                      className="form-control"
                      value={viewInfo?.addresses?.[0]?.state || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputZipCode">Zip Code</label>
                    <input
                      type="text"
                      id="inputZipCode"
                      className="form-control"
                      value={viewInfo?.addresses?.[0]?.zipCode || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputCountry">Country</label>
                    <input
                      type="text"
                      id="inputCountry"
                      className="form-control"
                      value={viewInfo?.addresses?.[0]?.country || ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row"></div>
        </section>
      </div>
    </>
  );
}

export default View;
