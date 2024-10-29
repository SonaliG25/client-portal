<<<<<<< HEAD
// import React from "react";

// function Proposals() {
//   return (
//     <div className="content-wrapper">
//       <section className="content-header">
//         <div className="container-fluid">
//           <div className="row align-items-center justify-content-between my-3">
//             {/* Title */}
//             <div className="col-md-4">
//               <h1 className="text-left">Proposal </h1>
//             </div>

//             {/* Add Button and Search Bar */}
//             <div className="col-md-8 d-flex justify-content-end">
//               {/* Search Bar */}
//               <div className="form-group mb-0 flex-grow-1 mr-3">
//                 {" "}
//                 {/* Add mr-3 here */}
//                 <div className="input-group input-group-md">
//                   <input
//                     type="search"
//                     className="form-control form-control-md"
//                     placeholder="Search by Title, Status"
//                   />
//                   <div className="input-group-append">
//                     <button
//                       className="btn btn-outline-secondary btn-md"
//                       type="button"
//                     >
//                       <i className="fa fa-search" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Add Proposal Button */}
//               <button className="btn btn-success">Add Proposal </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Main content */}
//       <section className="content">
//         {/* Table Content */}
//         <div className="row m-2">
//           <div className="col-12">
//             <div className="card">
//               <div className="card-body">
//                 <>
//                   <table
//                     id="example2"
//                     className="table table-bordered table-hover"
//                   >
//                     <thead>
//                       <tr>
//                         <th>Proposed To</th>
//                         <th>Title</th>
//                         <th>SentOn</th>
//                         <th className="text-center">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td colSpan="3" className="text-center">
//                           No matching Proposal found
//                         </td>

//                         <td>
//                           <div className="d-flex justify-content-center">
//                             <button className="m-1 btn btn-primary">
//                               View
//                             </button>
//                             <button
//                               className="m-1 btn btn-danger"
//                               data-toggle="modal"
//                               data-target="#exampleModalCenter"
//                             >
//                               Delete
//                             </button>
//                             <button className="m-1 btn btn-dark">Edit</button>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>

//                   {/* Pagination Controls */}
//                   <div className="pagination d-flex justify-content-between m-2">
//                     <button className="btn btn-outline-secondary">
//                       Previous
//                     </button>
//                     <span className="align-self-center">Page</span>
//                     <button className="btn btn-outline-secondary">Next</button>
//                   </div>
//                 </>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Proposals;
import React from "react";
=======
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
// import { useEditUserContext } from "../../context/EditUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Routes from "../../utils/routeNames";
>>>>>>> 46be442be8fce190ae251c5bfbdf7bfbe37b1c08

function Proposals() {
  const [proposals, setProposals] = useState([]);
  //Search for Proposal
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProposals = proposals.filter((proposal) =>
    proposal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();
  const handleAddProposal = () => {
    navigate(Routes.NEW_PROPOSAL);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between my-3">
            {/* Title */}
            <div className="col-md-4">
<<<<<<< HEAD
              <h1 className="text-left">Proposals</h1>
=======
              <h1 className="text-left font-weight-bold">Proposals</h1>
>>>>>>> 46be442be8fce190ae251c5bfbdf7bfbe37b1c08
            </div>

            {/* Search Bar and Add Button */}
            <div className="col-md-8 d-flex justify-content-end">
              {/* Search Bar */}
              <div className="form-group mb-0 flex-grow-1 mr-3">
                <div className="input-group input-group-md">
                  <input
                    type="search"
                    className="form-control form-control-md"
                    placeholder="Search by Product Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary btn-md"
                      type="button"
                    >
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              {/* Add Proposal Button */}
              <button className="btn btn-success">Add Proposal</button>
=======
              {/* Add Product Button */}
              <button
                onClick={handleAddProposal}
                className="btn btn-success ml-2"
              >
                <i className="fas fa-plus mr-1"></i> Add Proposal
              </button>
>>>>>>> 46be442be8fce190ae251c5bfbdf7bfbe37b1c08
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="content">
        {/* Table Content */}
        <div className="row m-2">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <table
                  id="example2"
                  className="table table-bordered table-hover"
                >
                  <thead>
                    <tr>
                      <th>Proposed To</th>
                      <th>Title</th>
                      <th>Sent On</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* You can replace this with dynamic data */}
                    <tr>
                      <td colSpan="3" className="text-center">
                        No matching Proposal found
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button className="m-1 btn btn-primary">View</button>
                          <button
                            className="m-1 btn btn-danger"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                          >
                            Delete
                          </button>
                          <button className="m-1 btn btn-dark">Edit</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="pagination d-flex justify-content-between m-2">
                  <button className="btn btn-outline-secondary">
                    Previous
                  </button>
                  <span className="align-self-center">Page</span>
                  <button className="btn btn-outline-secondary">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Proposals;
