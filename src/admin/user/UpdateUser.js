import React, { useEffect, useState } from "react";
import { useEditUserContext } from "../../context/EditUserContext.jsx";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function UpdateForm() {
  // const [UserDetails] = useEditUserContext(); // Get user details from context
  const [UserDetails, setUserDetails] = useState();
  const [auth] = useAuth(); // Get auth context (token)
  const { id } = useParams();
  const navigate = useNavigate();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      userType: "",
      addresses: [
        { city: "", street: "", state: "", zipCode: "", country: "" },
      ],
      subscription: 0,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required."),
      lastName: Yup.string().required("Last name is required."),
      phone: Yup.string().required("Phone number is required."),
      addresses: Yup.array().of(
        Yup.object().shape({
          street: Yup.string().required("Street is required."),
          city: Yup.string().required("City is required."),
          state: Yup.string().required("State is required."),
          zipCode: Yup.string().required("Zip code is required."),
          country: Yup.string().required("Country is required."),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.patch(
          `http://localhost:3000/user/${id}`,
          {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            userType: values.userType,
            addresses: [values.addresses[0]],
            subscription: [], // Update subscription as needed
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        setUserDetails(res.data);
        console.log("Updated User:", res.data);
        toast.success("updated successfully");
        navigate("/admin-dashboard/allusers");
      } catch (error) {
        toast.error("All Field Are Required");
        console.error("Error data:", error.response?.data);
        console.error("Error updating user:", error);
      }
    },
  });
  useEffect(() => {
    if (auth?.token) {
      axios
        .get(`http://localhost:3000/user/${id}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setUserDetails(res.data))
        .catch((error) => console.error(error));
    }
  }, [auth]);

  useEffect(() => {
    if (UserDetails) {
      formik.setValues({
        firstName: UserDetails.firstName || "",
        lastName: UserDetails.lastName || "",
        phone: UserDetails.phone || "",
        userType: UserDetails.userType || "",
        addresses: [
          {
            city: UserDetails?.addresses?.[0]?.city || "",
            street: UserDetails?.addresses?.[0]?.street || "",
            state: UserDetails?.addresses?.[0]?.state || "",
            zipCode: UserDetails?.addresses?.[0]?.zipCode || "",
            country: UserDetails?.addresses?.[0]?.country || "",
          },
        ],
        subscription: UserDetails.subscription?.length || 0,
      });
    }
  }, [UserDetails]);

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
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.firstName && formik.errors.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="invalid-feedback">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.lastName && formik.errors.lastName
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="invalid-feedback">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.phone && formik.errors.phone
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="invalid-feedback">
                        {formik.errors.phone}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputStatus">User Type</label>
                    <select
                      id="inputStatus"
                      name="userType"
                      className="form-control custom-select"
                      value={formik.values.userType}
                      onChange={formik.handleChange}
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      <option value="lead">Lead</option>
                      <option value="prospect">Prospect</option>
                      <option value="opportunity">Opportunity</option>
                      <option value="customer">Customer</option>
                    </select>
                    {formik.touched.userType && formik.errors.userType && (
                      <div className="invalid-feedback">
                        {formik.errors.userType}
                      </div>
                    )}
                  </div>
                </form>
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
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                      type="text"
                      id="street"
                      name="addresses[0].street"
                      value={formik.values.addresses[0].street}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.addresses?.[0]?.street &&
                        formik.errors.addresses?.[0]?.street
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.addresses?.[0]?.street &&
                      formik.errors.addresses?.[0]?.street && (
                        <div className="invalid-feedback">
                          {formik.errors.addresses[0].street}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="addresses[0].city"
                      value={formik.values.addresses[0].city}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.addresses?.[0]?.city &&
                        formik.errors.addresses?.[0]?.city
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.addresses?.[0]?.city &&
                      formik.errors.addresses?.[0]?.city && (
                        <div className="invalid-feedback">
                          {formik.errors.addresses[0].city}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="addresses[0].state"
                      value={formik.values.addresses[0].state}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.addresses?.[0]?.state &&
                        formik.errors.addresses?.[0]?.state
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.addresses?.[0]?.state &&
                      formik.errors.addresses?.[0]?.state && (
                        <div className="invalid-feedback">
                          {formik.errors.addresses[0].state}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="addresses[0].zipCode"
                      value={formik.values.addresses[0].zipCode}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.addresses?.[0]?.zipCode &&
                        formik.errors.addresses?.[0]?.zipCode
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.addresses?.[0]?.zipCode &&
                      formik.errors.addresses?.[0]?.zipCode && (
                        <div className="invalid-feedback">
                          {formik.errors.addresses[0].zipCode}
                        </div>
                      )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="addresses[0].country"
                      value={formik.values.addresses[0].country}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.addresses?.[0]?.country &&
                        formik.errors.addresses?.[0]?.country
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    {formik.touched.addresses?.[0]?.country &&
                      formik.errors.addresses?.[0]?.country && (
                        <div className="invalid-feedback">
                          {formik.errors.addresses[0].country}
                        </div>
                      )}
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpdateForm;
