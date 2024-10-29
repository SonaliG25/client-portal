import React from "react";

export default function ProposalDetails() {
  return (
    <div className="content-wrapper">
      {/* Proposal Details Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Proposal Details</h3>
        </div>
        <div className="card-body">
          <p>
            <strong>Recipient:</strong> John Doe
          </p>
          <p>
            <strong>Email To:</strong> johndoe@example.com
          </p>
          <p>
            <strong>Title:</strong> Service Proposal
          </p>
          <p>
            <strong>Content:</strong> This proposal outlines the services
            offered and the associated costs.
          </p>
        </div>
      </div>
      {/* Selected Products Card */}
      {/* <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Selected Products</h3>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Total</th>
                <th>Discount Type</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>12345</td>
                <td>2</td>
                <td>5%</td>
                <td>$100</td>
                <td>Percentage</td>
                <td>USD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
      {/* Totals Summary Card */}
      {/* <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Summary</h3>
        </div>
        <div className="card-body">
          <p>
            <strong>Product Total:</strong> $200
          </p>
          <p>
            <strong>Grand Total:</strong> $180
          </p>
          <p>
            <strong>Discount on Grand Total:</strong> $10
          </p>
          <p>
            <strong>Final Amount:</strong> $170
          </p>
        </div>
      </div>  */}
    </div>
  );
}
