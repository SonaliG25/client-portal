import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useEditUserContext } from "../context/EditUserContext.jsx";
import { useNavigate } from "react-router-dom";

function Proposaltemplete() {
    
  const navigate = useNavigate();



  

  const handleClick = () => {
    navigate("/admin-dashboard/newproposaltemplete");
  };


  
  return (
    <div>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
          <div className="row m-2">
              <button onClick={handleClick} className="btn btn-lg  btn-success">
                Add ProposalTemplate
              </button>
              <div className="col-12">
                <div className="card">
                  {/* <div className="card-header"></div> */}
                  <div className="card-body">
                   
                      <table
                        id="example2"
                        className="table table-bordered table-hover"
                      >
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                            {/* <tr >
                              <td>{lastName}</td>
                              <td>{firstName}</td>
                              <td>{phone}</td>
                              <td> {addresses[0].city}</td>

                              <td>
                               
                              </td>
                              <td>
                                <button
                                  className="m-1 btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                //   onClick={() => HandlePopup(data)}
                                >
                                  View
                                </button>{" "}
                                <button className="m-1  btn btn-danger">
                                  Delete
                                </button>
                                <button
                                  className="m-1 btn btn-dark"
                                //   onClick={() => handleUpdateForm(data)}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr> */}
                          
                        </tbody>
                      </table>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Proposaltemplete;
