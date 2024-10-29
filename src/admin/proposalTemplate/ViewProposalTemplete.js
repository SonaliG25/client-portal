import React, { useState, useEffect } from "react";
import { useEditUserContext } from "../../context/EditUserContext";

function ViewProposalTemplete() {
  const [proposalTempleteDetails, setPropposalTemplete] = useEditUserContext();
  const [ViewTemplete, setViewTemplete] = useState();

  useEffect(() => {
    // console.log("temp", proposalTempleteDetails);
    console.log("tempDetails:", Array.isArray(proposalTempleteDetails));
    if (proposalTempleteDetails) {
      setViewTemplete({
        title: proposalTempleteDetails.title || "",
        description: proposalTempleteDetails.description || "",
        status: proposalTempleteDetails.status || "",
        createdAt: proposalTempleteDetails.createdAt || "",
        updatedAt: proposalTempleteDetails.updatedAt || "",
      });
    }
  }, [proposalTempleteDetails]);

  return (
    <>
  <div className="content-wrapper">
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="text-dark">View Proposal Templete</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">View Proposal Template</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <div className="row">
      <div className="col-md-12">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Proposal Templete Information</h3>
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
              <div className="form-control" style={{ minHeight: '40px' }}>
                {ViewTemplete?.title || "No title available"}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <div
                id="description"
                className="form-control"
                style={{ minHeight: "40px" }}
                dangerouslySetInnerHTML={{
                  __html: ViewTemplete?.description || "No description available",
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <div className="form-control" style={{ minHeight: '40px' }}>
                {ViewTemplete?.status || "No status available"}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="createdAt">Created At</label>
              <div className="form-control" style={{ minHeight: '40px' }}>
                {ViewTemplete?.createdAt || "No created at information available"}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="updatedAt">Updated At</label>
              <div className="form-control" style={{ minHeight: '40px' }}>
                {ViewTemplete?.updatedAt || "No updated at information available"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
}

export default ViewProposalTemplete;
