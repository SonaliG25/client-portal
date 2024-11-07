import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function UpdateUserForm() {
  const [userInfo, setUserInfo] = useState({
    password: "",
    name: "",
    phone: "",
    userType: "",
    businessDetails: {
      clientName: "",
      companyType: "",
      taxId: "",
      employeeSize: "",
      ownerPhone: "",
      ownerEmail: "",
    },
    timeZone: "",
    preferredContactMethod: "",
    notes: "",
    paymentStatus: "",
    allowLogin: true,
    activeAccount: true,
    bannedAccount: false,
    accountManagers: "",
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    purchaseHistory: "",
    subscription: "",
  });

  const [auth] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setUserInfo(res.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    if (auth?.token) {
      fetchUserInfo();
    }
  }, [auth, id]);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    userType: Yup.string().required("User type is required"),
    businessDetails: Yup.object({
      clientName: Yup.string().required("Client name is required"),
      companyType: Yup.string().required("Company type is required"),
      taxId: Yup.string().required("Tax ID is required"),
      employeeSize: Yup.string().required("Employee size is required"),
      ownerPhone: Yup.string().required("Owner phone is required"),
      ownerEmail: Yup.string()
        .email("Invalid email format")
        .required("Owner email is required"),
    }),
    address: Yup.object({
      street1: Yup.string().required("Street 1 is required"),
      street2: Yup.string().required("Street 2 is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string().required("Zip code is required"),
    }),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/user/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      toast.success("User updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating user", error);
      toast.error("Failed to update user.");
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Update User Information</h1>
      </section>
      <section className="content">
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Important to allow form values to update
        >
          {({ setFieldValue, values, handleChange, errors, touched }) => (
            <Form>
              <div className="row">
                {/* Business Details */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-info">Business Details</div>
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
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          <Field
                            type="text"
                            name={`businessDetails.${field}`}
                            className="form-control"
                          />
                          <ErrorMessage
                            name={`businessDetails.${field}`}
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Basic Information */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-primary">Auth Details</div>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Full Name</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <Field
                          type="email"
                          name="email"
                          readOnly // Correct camelCase for the attribute
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <Field
                          type="text"
                          name="phone"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="form-group">
                        <label>User Type</label>
                        <Field
                          as="select"
                          name="userType"
                          className="form-control"
                        >
                          <option value="">Select User Type</option>{" "}
                          {/* Default placeholder */}
                          <option value="lead">Lead</option>
                          <option value="prospect">Prospect</option>
                          <option value="opportunity">Opportunity</option>
                          <option value="customer">Customer</option>
                        </Field>
                        <ErrorMessage
                          name="userType"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Address Information */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-secondary">
                      Address Information
                    </div>
                    <div className="card-body">
                      {["street1", "street2", "city", "state", "zipCode"].map(
                        (field, index) => (
                          <div className="form-group" key={index}>
                            <label>
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <Field
                              type="text"
                              name={`address.${field}`}
                              className="form-control"
                            />
                            <ErrorMessage
                              name={`address.${field}`}
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header bg-warning">Miscellaneous</div>
                    <div className="card-body">
                      {["allowLogin", "activeAccount", "bannedAccount"].map(
                        (field, index) => (
                          <div className="px-2 form-group" key={index}>
                            <Field
                              type="checkbox"
                              name={field}
                              className="form-check-input"
                            />
                            <label>
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-success mt-3">
                Update User
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}

export default UpdateUserForm;
