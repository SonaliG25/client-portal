import React, { useState, useEffect, useRef } from "react";
import { useEditUserContext } from "../../context/EditUserContext";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";

function ViewProposalTemplate() {
  const [proposalTempleteDetails, setPropposalTemplete] = useEditUserContext();
  const [viewTemplate, setViewTemplate] = useState(null);
  const [auth] = useAuth();
  const { id } = useParams()
  const editor = useRef(null);
  // Fetch templates from the API
  const getProposalTemplete = async () => {
    // setLoader(true); // Show loader while fetching
    try {
      const res = await axios.get(
        `http://localhost:3000/proposalTemplate/templates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setViewTemplate(res.data)
    } catch (error) {
      console.error(error);
      // setLoader(false);
    }
  };

  // Fetch data on component mount and when search or page changes
  useEffect(() => {
    if (auth?.token) {
      getProposalTemplete();
    }
  }, [auth]);

  useEffect(() => {
    if (proposalTempleteDetails) {
      setViewTemplate({
        title: proposalTempleteDetails.title || "",
        description: proposalTempleteDetails.description || "",
        status: proposalTempleteDetails.status || "",
        createdAt: proposalTempleteDetails.createdAt || "",
        updatedAt: proposalTempleteDetails.updatedAt || "",
      });
    }
  }, [proposalTempleteDetails]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-12">
              <h1 className="text-dark">View Proposal Template</h1>
            </div>
          </div>
        </div>
      </section>

      <div className="row">
        <div className="col-12">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Proposal Template Information</h3>
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
              {viewTemplate ? (
                <>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <div className="form-control" style={{ minHeight: '40px' }}>
                      {viewTemplate.title || "No title available"}
                    </div>
                  </div>
                  <div className="form-group">
      <label htmlFor="description">Description</label>
      <JoditEditor
      
        ref={editor}
        value={viewTemplate.description || "No description available"}
       // config={}
       // onBlur={(newContent) => handleDescriptionChange(newContent)} // Update description on blur (or use onChange if preferred)
      />
    </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="form-control" style={{ minHeight: '40px' }}>
                      {viewTemplate.status || "No status available"}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="createdAt">Created At</label>
                    <div className="form-control" style={{ minHeight: '40px' }}>
                      {viewTemplate.createdAt || "No created at information available"}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="updatedAt">Updated At</label>
                    <div className="form-control" style={{ minHeight: '40px' }}>
                      {viewTemplate.updatedAt || "No updated at information available"}
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading template details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProposalTemplate;
