import React, { useEffect } from "react";
import { useEditUserContext } from "../context/EditUserContext";

function UpdateForm() {
  const [UserDetails, setUserDetails] = useEditUserContext();

  useEffect(() => {
    console.log("userDetails:", UserDetails);
  }, [UserDetails]);

  return (
    <>
      {UserDetails}
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="text-dark">UpdateUser</h1>
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
        </section>
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-light">
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
                    <label htmlFor="inputFirstName">First Name</label>
                    <input
                      value={UserDetails?.firstName || ""}
                      type="text"
                      className="form-control"
                      id="inputFirstName"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputLastName">Last Name</label>
                    <input
                      value={UserDetails?.lastName || ""}
                      type="text"
                      className="form-control"
                      id="inputLastName"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPhone">Phone</label>
                    <input
                      value={UserDetails?.phone || ""}
                      type="text"
                      className="form-control"
                      id="inputPhone"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input
                      value={UserDetails?.addresses?.[0]?.[0] || ""}
                      type="text"
                      className="form-control"
                      id="inputAddress"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inputSubscription">Subscription</label>
                    <input
                      value={UserDetails?.subscription?.length || 0}
                      type="text"
                      className="form-control"
                      id="inputSubscription"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button className="btn btn-dark btn-block">Submit</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default UpdateForm;
