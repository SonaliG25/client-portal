import React, { useEffect, useRef, useState } from "react";

const Proposals = () => {
  const tableRef = useRef(null); // Create a ref for the table


  return (
  <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>DataTables</h1>
        </div>
        
      </div>
    </div>{/* /.container-fluid */}
  </section>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">DataTable with minimal features &amp; hover style</h3>
            </div>
            {/* /.card-header */}
           
            {/* /.card-body */}
          </div>
        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
    </div>
    {/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>

      )
}

export default Proposals;
