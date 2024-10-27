import React from "react";

const Orders = () => {
  return (
    <div className="content-wrapper">
   {/* Content Header (Page header) */}
<section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Orders</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active">Orders</li>
        </ol>
      </div>
    </div>
  </div>{/* /.container-fluid */}
</section>

    </div>
  );
};

export default Orders;