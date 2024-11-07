import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast"; // Ensure this import is correct
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();

  const timeZones = [
    "UTC",
    "America/New_York",
    "America/Chicago",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Kolkata",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number should be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    businessDetails: Yup.object({
      clientName: Yup.string().required("Client name is required"),
      companyType: Yup.string().required("Company type is required"),
      taxId: Yup.string().required("Tax ID is required"),
      employeeSize: Yup.string().required("Employee size is required"),
      ownerPhone: Yup.string().required("Owner phone is required"),
      ownerEmail: Yup.string()
        .email("Invalid email")
        .required("Owner email is required"),
    }),
    timeZone: Yup.string().required("Time zone is required"),
    address: Yup.object({
      street1: Yup.string().required("Street address is required"),
      street2: Yup.string().required("Street address is required"),

      zipCode: Yup.string().required("ZIP Code is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("country is required"),
    }),
    allowLogin: Yup.boolean(),
    activeAccount: Yup.boolean(),
    bannedAccount: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      userType: "lead",
      email: "",
      password: "",
      role: "client",
      businessDetails: {
        clientName: "",
        companyType: "",
        taxId: "",
        employeeSize: "",
        ownerPhone: "",
        ownerEmail: "",
      },
      timeZone: "UTC",
      preferredContactMethod: "email",
      paymentStatus: "noPaymentYet",
      address: {
        street1: "",
        street2: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
      },
      allowLogin: true,
      activeAccount: true,
      bannedAccount: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("clicked on submit", values);

      try {
        const res = await axios.post(
          "http://localhost:3000/user/register",
          values,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        toast.success("User created successfully");
        navigate("/admin-dashboard/allusers");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error creating user");
      }
    },
  });

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="text-dark">Create Client Account</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">
                  Create Client Account
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            {/* Business Details Card */}
            <div className="col-md-6">
              <div className="card mb-6">
                <div className="card-header bg-info">
                  <h5 className="card-title">Business Details</h5>
                </div>
                <div className="card-body">
                  {[
                    "clientName",
                    "companyType",
                    "taxId",
                    "employeeSize",
                    "ownerPhone",
                    "ownerEmail",
                  ].map((field, index) => (
                    <div className="form-group" key={index}>
                      <label>
                        {field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                      <input
                        type="text"
                        name={`businessDetails.${field}`}
                        value={formik.values.businessDetails[field]}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.touched.businessDetails?.[field] &&
                        formik.errors.businessDetails?.[field] && (
                          <div className="text-danger">
                            {formik.errors.businessDetails[field]}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Auth Details Card */}
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-header bg-primary">
                  <h5 className="card-title">Auth Details</h5>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-danger">{formik.errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-danger">{formik.errors.phone}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formik.values.role}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-header bg-secondary">
                  <h5 className="card-title">Address</h5>
                </div>
                <div className="card-body">
                  .
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Timezone
                    </label>
                    <select
                      className="form-control"
                      onChange={(item) =>
                        formik.setFieldValue("timeZone", item.target.value)
                      }
                    >
                      {timeZones.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  {[
                    "street1",
                    "street2",
                    "zipCode",
                    "city",
                    "state",
                    "country",
                  ].map((field, index) => (
                    <div className="form-group" key={index}>
                      <label>
                        {field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>
                      <input
                        type="text"
                        name={`address.${field}`}
                        value={formik.values.address[field]}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.touched.address?.[field] &&
                        formik.errors.address?.[field] && (
                          <div className="text-danger">
                            {formik.errors.address[field]}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Miscellaneous */}
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-header bg-warning">
                  <h5 className="card-title">Miscellaneous</h5>
                </div>
                <div className="card-body ">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="allowLogin"
                      checked={formik.values.allowLogin}
                      onChange={() =>
                        formik.setFieldValue(
                          "allowLogin",
                          !formik.values.allowLogin
                        )
                      }
                      className="form-check-input"
                    />
                    <label className="form-check-label">Allow Login</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="activeAccount"
                      checked={formik.values.activeAccount}
                      onChange={() =>
                        formik.setFieldValue(
                          "activeAccount",
                          !formik.values.activeAccount
                        )
                      }
                      className="form-check-input"
                    />
                    <label className="form-check-label">Active Account</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="bannedAccount"
                      checked={formik.values.bannedAccount}
                      onChange={() =>
                        formik.setFieldValue(
                          "bannedAccount",
                          !formik.values.bannedAccount
                        )
                      }
                      className="form-check-input"
                    />
                    <label className="form-check-label">Banned Account</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => console.log("error", formik.errors)}
            type="submit"
            className="btn btn-success btn-lg btn-block"
          >
            Create User
          </button>
        </form>
      </section>
    </div>
  );
};

export default NewUser;
