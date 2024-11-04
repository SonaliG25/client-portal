import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ALL_USERS } from "../../utils/routeNames";

const Register = () => {
  const navigate = useNavigate();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name should be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name should be at least 2 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number should be 10 digits"),
    username: Yup.string()
      .required("Username is required")
      .min(4, "Username should be at least 4 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password should be at least 4 characters"),
    role: Yup.string().required("Role is required"),
    addresses: Yup.object({
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string()
        .required("Zip code is required")
        .matches(/^[0-9]{6}$/, "Zip code should be 6 digits"),
      country: Yup.string().required("Country is required"),
    }),
  });

  // Set up Formik hook with validation schema
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      username: "",
      email: "",
      password: "",
      role: "client",
      addresses: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
    validationSchema, // Pass validation schema to Formik
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:3000/user/register",
          values
        );
        console.log(res);
        if (res.status === 200) {
          toast.success("Registration successful!");
          navigate(ALL_USERS);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
      }
    },
  });

  const { values, handleChange, handleSubmit, touched, errors } = formik;

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="text-dark">Add User</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Add User</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Personal Information</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.firstName && errors.firstName ? (
                      <div className="text-danger">{errors.firstName}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.lastName && errors.lastName ? (
                      <div className="text-danger">{errors.lastName}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Mobile Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.phone && errors.phone ? (
                      <div className="text-danger">{errors.phone}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.username && errors.username ? (
                      <div className="text-danger">{errors.username}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.password && errors.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.email && errors.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      className="form-control custom-select"
                    >
                      <option value="client">Client</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="developer">Developer</option>
                    </select>
                    {touched.role && errors.role ? (
                      <div className="text-danger">{errors.role}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Address</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="addresses.street">Street</label>
                    <input
                      type="text"
                      name="addresses.street"
                      value={values.addresses.street}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.addresses?.street && errors.addresses?.street ? (
                      <div className="text-danger">
                        {errors.addresses.street}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="addresses.city">City</label>
                    <input
                      type="text"
                      name="addresses.city"
                      value={values.addresses.city}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.addresses?.city && errors.addresses?.city ? (
                      <div className="text-danger">{errors.addresses.city}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="addresses.state">State</label>
                    <input
                      type="text"
                      name="addresses.state"
                      value={values.addresses.state}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.addresses?.state && errors.addresses?.state ? (
                      <div className="text-danger">
                        {errors.addresses.state}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="addresses.zipCode">Zip Code</label>
                    <input
                      type="text"
                      name="addresses.zipCode"
                      value={values.addresses.zipCode}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.addresses?.zipCode && errors.addresses?.zipCode ? (
                      <div className="text-danger">
                        {errors.addresses.zipCode}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="addresses.country">Country</label>
                    <input
                      type="text"
                      name="addresses.country"
                      value={values.addresses.country}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.addresses?.country && errors.addresses?.country ? (
                      <div className="text-danger">
                        {errors.addresses.country}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn-block btn-primary">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;
