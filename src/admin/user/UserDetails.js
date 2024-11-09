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
            {/* User Info Card */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-primary">
                  <h3 className="card-title">Basic Information</h3>
                </div>
                <div className="card-body">
                  <dl className="row">
                    <dt className="col-sm-4">Full Name:</dt>
                    <dd className="col-sm-8">{viewInfo?.name}</dd>

                    <dt className="col-sm-4">Email:</dt>
                    <dd className="col-sm-8">{viewInfo?.email}</dd>

                    <dt className="col-sm-4">Phone:</dt>
                    <dd className="col-sm-8">{viewInfo?.phone}</dd>

                    <dt className="col-sm-4">Role:</dt>
                    <dd className="col-sm-8">{viewInfo?.role}</dd>

                    <dt className="col-sm-4">User Type:</dt>
                    <dd className="col-sm-8">{viewInfo?.userType}</dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-info">
                  <h3 className="card-title">Address Information</h3>
                </div>
                <div className="card-body">
                  <dl className="row">
                    <dt className="col-sm-4">Street 1:</dt>
                    <dd className="col-sm-8">{viewInfo?.address?.street1}</dd>

                    <dt className="col-sm-4">Street 2:</dt>
                    <dd className="col-sm-8">{viewInfo?.address?.street2}</dd>

                    <dt className="col-sm-4">City:</dt>
                    <dd className="col-sm-8">{viewInfo?.address?.city}</dd>

                    <dt className="col-sm-4">State:</dt>
                    <dd className="col-sm-8">{viewInfo?.address?.state}</dd>

                    <dt className="col-sm-4">Zip Code:</dt>
                    <dd className="col-sm-8">{viewInfo?.address?.zipCode}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Business Details Card */}
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-success">
                  <h3 className="card-title">Business Details</h3>
                </div>
                <div className="card-body">
                  <dl className="row">
                    <dt className="col-sm-4">Client Name:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.businessDetails?.clientName}
                    </dd>

                    <dt className="col-sm-4">Company Type:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.businessDetails?.companyType}
                    </dd>

                    <dt className="col-sm-4">Tax ID:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.businessDetails?.taxId}
                    </dd>

                    <dt className="col-sm-4">Employee Size:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.businessDetails?.employeeSize}
                    </dd>

                    <dt className="col-sm-4">Owner Phone:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.businessDetails?.ownerPhone}
                    </dd>

                    <dt className="col-sm-4">Owner Email:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.businessDetails?.ownerEmail}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Miscellaneous Info Card */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-warning">
                  <h3 className="card-title">Account Status</h3>
                </div>
                <div className="card-body">
                  <dl className="row">
                    <dt className="col-sm-4">Allow Login:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.allowLogin ? "Yes" : "No"}
                    </dd>

                    <dt className="col-sm-4">Account Active:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.activeAccount ? "Yes" : "No"}
                    </dd>

                    <dt className="col-sm-4">Account Banned:</dt>
                    <dd className="col-sm-8">
                      {viewInfo?.bannedAccount ? "Yes" : "No"}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="row">
            <div className="col-md-12">
              <div className="card-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => window.history.back()}
                >
                  Back to User List
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default View;
