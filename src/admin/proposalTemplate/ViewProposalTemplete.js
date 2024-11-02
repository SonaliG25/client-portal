import React, { useState, useEffect } from "react";
import { useEditUserContext } from "../../context/EditUserContext";

function ViewProposalTemplate() {
  const [proposalTempleteDetails, setPropposalTemplete] = useEditUserContext();
  const [viewTemplate, setViewTemplate] = useState();

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
                    <div
                      id="description"
                      className="form-control"
                      style={{ minHeight: "40px" }}
                      dangerouslySetInnerHTML={{
                        __html: viewTemplate.description || "No description available",
                      }}
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
