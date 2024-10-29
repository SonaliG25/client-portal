import React, { useEffect, useState,useRef }  from 'react'
import axios from "axios";
import { useEditUserContext } from '../../context/EditUserContext.jsx';
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react"

function UpdateProposalTemplate() {
    const [proposalTempleteDetails,setPropposalTemplete] = useEditUserContext()
    const editor =useRef(null)
    const [auth] = useAuth(); 
  const navigate = useNavigate();
    const [templete, setTemplete] = useState({
        title: "",
        description: "",
        status: "",
        createdAt: "",
        updatedAt: "",
      });
      useEffect(() => {
        console.log("temp",proposalTempleteDetails)
        if (proposalTempleteDetails) {
          setTemplete({
            title: proposalTempleteDetails.title || "",
            description: proposalTempleteDetails.description || "",
            status: proposalTempleteDetails.status || "",
            createdAt:proposalTempleteDetails.createdAt || "",
            updatedAt:proposalTempleteDetails.updatedAt || ""
          });
        }
      }, [ auth?.token])
      console.log("Id",proposalTempleteDetails?._id)
      const handleUpdate = async () => {
        try {
          const res = await axios.patch(
            `http://localhost:3000/proposalTemplate/templates/${proposalTempleteDetails?._id}`,
            {
              title:templete.title,
              description:templete.description,
              status:templete.status,
              createdAt:templete.createdAt, 
              updatedAt:templete.updatedAt, 
            },
            {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
              },
            }
          );
    
          const updatedUser =
            typeof res.data === "string" ? JSON.parse(res.data) : res.data;
    
          console.log("Updated User:", updatedUser);
          navigate("/admin-dashboard/proposaltemplete");
        } catch (error) {
          console.error("Error data:", error.response?.data);
          console.error("Error updating user:", error);
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTemplete((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
      };

      const handleDescriptionChange = (newContent) => {
        setTemplete((prevForm) => ({
          ...prevForm,
          description: newContent,  // Update description with the new content (HTML)
        }));
    };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="text-dark">Update Proposal Templete</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Update Proposal Templete</li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      {/* Main content */}
      
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Templete Information</h3>
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
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={templete.title}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <JoditEditor
                                ref={editor}
                                value={templete.description}
                                
                                onChange={(newContent) => handleDescriptionChange(newContent)}
                              />
                </div>
               
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </div>
        <div className="row">
          <div className="col-2 m-2">
            <button
              className="btn btn-success btn-block"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      
    </div>
  )
}

export default UpdateProposalTemplate
