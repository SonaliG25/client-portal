import React, { useState,useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react"

function NewProposalTemplete  ()  {
  // User state

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [content,setContent] =useState('')
  const editor =useRef(null)
  const [auth] = useAuth();
  const navigate = useNavigate()
  const config={
        placeholder:"Start typing...",

    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/proposalTemplate/new`, {
        title,
        description,
        status,
        createdAt,
        updatedAt
      },
      {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        }
        
    });
      console.log(res);
      navigate("/admin-dashboard/proposaltemplete");
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <>
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
                  <li className="breadcrumb-item active">Project Add</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
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
                    <label htmlFor="inputname">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      id="title"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputName">description</label>
           
                                <JoditEditor
                                ref={editor}
                                value={description}
                                
                                onChange={(newContent) => setDescription(newContent)}
                              />

                        
                    {/* <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      id="description"
                      className="form-control"
                    /> */}
                    
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="inputName">Status</label>
                    <input
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      type="text"
                      id="Status"
                      className="form-control"
                    />
                  </div> */}
        
                  {/* <div className="form-group">
                    <label htmlFor="inputName">Created At</label>
                    <input
                      value={createdAt}
                      onChange={(e) => setCreatedAt(e.target.value)}
                      type="text"
                      id="createdAt"
                      className="form-control"
                    />
                  </div> */}
                  {/* <div className="form-group">
                    <label htmlFor="inputName">Updated At</label>
                    <input
                      value={updatedAt}
                      onChange={(e) => setUpdatedAt(e.target.value)}
                      type="text"
                      id="updatedAt"
                      className="form-control"
                    />
                  </div> */}
                 
                 
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            </div>
           
          <div className="row">
            <div className="col-2">
              <button
                onClick={handleSubmit}
                className="btn btn-success btn-block"
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default NewProposalTemplete
