import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEditUserContext } from "../../context/EditUserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Proposaltemplete = () => {
  const [proposalTemplateDetails,setProposalTempleteDetails] = useEditUserContext(); // Destructure setTempleteDetails
  console.log("temple",proposalTemplateDetails)
  const [proposalTemplete, setProposalTemplete] = useState([]);
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleClick = () => {
    navigate("/admin-dashboard/newproposaltemplete");
  };

  const getProposalTemplete = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/proposalTemplate/templates`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // Sending token in Authorization header
        },
      });

      setProposalTemplete(res.data);
      console.log("proposaltemplete:", res.data);
    } catch (error) {
      console.error(error); // Log the error for debugging
    }
  };

  useEffect(() => {
    console.log("auth-test", auth);
    if (auth?.token) {
      getProposalTemplete();
    }
  }, [auth]);

  const handleUpdateForm = (data) => {
     setProposalTempleteDetails(data); // Set the template data in the context
    console.log("templetedataproposal", proposalTemplateDetails);
    navigate("/admin-dashboard/updateproposaltemplete");
  };

  const HandleView = (data) => {
    setProposalTempleteDetails(data)
    navigate("/admin-dashboard/viewproposaltemplete");
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/proposalTemplate/templates/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // Sending token in Authorization header
        },
      });
      console.log("delete Successful:", res);
      getProposalTemplete();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row m-2">
              <button onClick={handleClick} className="btn btn-lg btn-success">
                Add ProposalTemplate
              </button>
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {!proposalTemplete.length ? (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <table id="example2" className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>CreatedAt</th>
                            <th>UpdatedAt</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {proposalTemplete.map((data) => (
                            <tr key={data._id}>
                              <td>{data.title}</td>
                              <td>{data.description}</td>
                              <td>{data.status}</td>
                              <td>{data.createdAt}</td>
                              <td>{data.updatedAt}</td>
                              <td>
                                <div className="d-flex justify-content-center">
                                  <button className="m-1 btn btn-primary"  onClick={()=> HandleView(data)}>
                                    View
                                  </button>
                                  <button className="m-1 btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>handleDelete(data?._id)}>
                                    Delete
                                  </button>
                                  <button
                                    className="m-1 btn btn-dark"
                                    onClick={() => handleUpdateForm(data)} // Set template details and navigate to edit page
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
    </div>
  );
};

export default Proposaltemplete;
