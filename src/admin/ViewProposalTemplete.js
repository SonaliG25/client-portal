import React, { useState,useEffect } from 'react';
import { useEditUserContext } from '../context/EditUserContext';

function ViewProposalTemplete() {

    const [proposalTempleteDetails,setPropposalTemplete] = useEditUserContext()
    const [ViewTemplete,setViewTemplete] = useState()

    useEffect(() => {
        console.log("temp",proposalTempleteDetails)
        if (proposalTempleteDetails) {
          setViewTemplete({
            title: proposalTempleteDetails.title || "",
            description: proposalTempleteDetails.description || "",
            status: proposalTempleteDetails.status || "",
            createdAt:proposalTempleteDetails.createdAt || "",
            updatedAt:proposalTempleteDetails.updatedAt || ""
          });
        }
      }, [proposalTempleteDetails])

  return (
    <>
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="text-dark">View</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">View Proposal Templete</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      
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
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={ViewTemplete?.title || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">description </label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    value={ViewTemplete?.description || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <input
                    type="text"
                    id="status"
                    className="form-control"
                    value={ViewTemplete?.status || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="createdAt">CreatedAt</label>
                  <input
                    type="text"
                    id="createdAt"
                    className="form-control"
                    value={ViewTemplete?.createdAt || ""}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="UpdatedAt">UpdatedAt</label>
                  <input
                    type="text"
                    id="updatedAt"
                    className="form-control"
                    value={ViewTemplete?.updatedAt || ""}
                    readOnly
                  />
                </div>
               
              </div>
            </div>
          </div>

         
        </div>
        <div className="row"></div>
      
    </div>
  </>
  )
}

export default ViewProposalTemplete
