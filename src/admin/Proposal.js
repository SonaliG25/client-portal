import React from "react";

function Proposal() {
  return (<div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <h1>Digital Product Details</h1>
    </div>
  </section>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        {/* Product Information Section */}
        {/* (Other sections here...) */}
        {/* Media Section with Image Preview */}
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Media</h3>
            </div>
            <div className="card-body">
              {/* Image Preview */}
              <div className="form-group">
                <label>Current Product Image</label>
                <div>
                  <img id="productImagePreview" src="path/to/current-image.jpg" alt="Product Image" style={{maxWidth: 150, border: '1px solid #ddd', padding: 5}} />
                </div></div></div></div></div></div></div>
                </section></div>


);
}

export default Proposal;
