// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
// import { useEditUserContext } from "../context/EditUserContext.jsx";
// import { useNavigate } from "react-router-dom";

// const Users = () => {
//   const [auth, setAuth] = useAuth();
//   const [UserDetails, setUserDetails] = useEditUserContext();

//   const [userdata, setUserdata] = useState(null);
//   const [deleteId, setDeleteId] = useState();
//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const itemsPerPage = 5; // Fixed number of items per page
//   const navigate = useNavigate();

//   const getUser = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/user/users`, {
//         headers: {
//           Authorization: `Bearer ${auth?.token}`,
//         },
//       });
//       setUserdata(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const res = await axios.delete(`http://localhost:3000/user/${deleteId}`, {
//         headers: {
//           Authorization: `Bearer ${auth?.token}`,
//         },
//       });
//       console.log("Delete Successful:", res);
//       getUser(); // Refresh the user list after deletion
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) {
//       getUser();
//     }
//   }, [auth]);

//   const handleAddUser = () => {
//     navigate("/admin-dashboard/newuser");
//   };

//   const HandleView = (data) => {
//     setUserDetails(data);
//     navigate("/admin-dashboard/view");
//   };

//   const handleUpdateForm = (data) => {
//     setUserDetails(data);
//     navigate("/admin-dashboard/Update");
//   };

//   const handleDeleteID = (id) => {
//     setDeleteId(id);
//   };

//   // Calculate the current data to display based on pagination
//   const indexOfLastUser = currentPage * itemsPerPage; // Last user index
//   const indexOfFirstUser = indexOfLastUser - itemsPerPage; // First user index
//   const currentUsers = userdata?.slice(indexOfFirstUser, indexOfLastUser); // Users for the current page

//   // Calculate total pages
//   const totalPages = Math.ceil((userdata?.length || 0) / itemsPerPage);

//   return (
//     <>
//       <div className="content-wrapper">
//         <section className="content">
//           <div className="container-fluid">
//             <h1 className="   text-center"> User List</h1>

//             <div className="m-2 d-flex  justify-content-center align-content-center">
//               <form action="enhanced-results.html">
//                 <div className="row">
//                   <div className="col-md-10 offset-md-1">
//                     <div className="form-group">
//                       <div className="input-group input-group-lg">
//                         <input
//                           type="search"
//                           className="form-control form-control-lg"
//                           placeholder="Searching"
//                         />
//                         <div className="input-group-append">
//                           <button className="btn btn-lg btn-default">
//                             <i className="fa fa-search" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//               <button onClick={handleAddUser} className="btn btn- btn-dark ">
//                 Add User
//               </button>
//             </div>

//             <div className="row m-2">
//               <div className="col-12">
//                 <div className="card">
//                   <div className="card-body">
//                     {!userdata ? (
//                       <div className="spinner-border" role="status">
//                         <span className="sr-only">Loading...</span>
//                       </div>
//                     ) : (
//                       <>
//                         <table
//                           id="example2"
//                           className="table table-bordered table-hover"
//                         >
//                           <thead>
//                             <tr>
//                               <th>Last Name</th>
//                               <th>First Name</th>
//                               <th>Phone</th>
//                               <th>Number of Subscriptions</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {currentUsers?.map((data) => (
//                               <tr key={data._id}>
//                                 <td>{data.lastName}</td>
//                                 <td>{data.firstName}</td>
//                                 <td>{data.phone}</td>
//                                 <td>{data.subscription.length}</td>
//                                 <td>
//                                   <div className="d-flex justify-content-center">
//                                     <button
//                                       className="m-1 btn btn-primary"
//                                       onClick={() => HandleView(data)}
//                                     >
//                                       View
//                                     </button>
//                                     <button
//                                       className="m-1 btn btn-danger"
//                                       data-toggle="modal"
//                                       data-target="#exampleModalCenter"
//                                       onClick={() => handleDeleteID(data?._id)}
//                                     >
//                                       Delete
//                                     </button>
//                                     <button
//                                       className="m-1 btn btn-dark"
//                                       onClick={() => handleUpdateForm(data)}
//                                     >
//                                       Edit
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>

//                         {/* Pagination Controls */}
//                         <div className="pagination">
//                           <button
//                             disabled={currentPage === 1}
//                             onClick={() => setCurrentPage(currentPage - 1)}
//                           >
//                             Previous
//                           </button>
//                           {Array.from({ length: totalPages }, (_, index) => (
//                             <button
//                               key={index + 1}
//                               onClick={() => setCurrentPage(index + 1)}
//                               className={
//                                 currentPage === index + 1 ? "active" : ""
//                               }
//                             >
//                               {index + 1}
//                             </button>
//                           ))}
//                           <button
//                             disabled={currentPage === totalPages}
//                             onClick={() => setCurrentPage(currentPage + 1)}
//                           >
//                             Next
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Delete Modal */}
//       <div>
//         <div
//           className="modal fade"
//           id="exampleModalCenter"
//           tabIndex={-1}
//           role="dialog"
//           aria-labelledby="exampleModalCenterTitle"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog modal-dialog-centered" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLongTitle">
//                   Delete
//                 </h5>
//                 <button
//                   type="button"
//                   className="close"
//                   data-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">×</span>
//                 </button>
//               </div>
//               <div className="modal-body">Are you sure?</div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-dismiss="modal"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   data-dismiss="modal"
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Users;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useEditUserContext } from "../context/EditUserContext.jsx";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [auth, setAuth] = useAuth();
  const [UserDetails, setUserDetails] = useEditUserContext();

  const [userdata, setUserdata] = useState(null);
  const [deleteId, setDeleteId] = useState();
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Fixed number of items per page
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/users`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setUserdata(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/user/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log("Delete Successful:", res);
      getUser(); // Refresh the user list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getUser();
    }
  }, [auth]);

  const handleAddUser = () => {
    navigate("/admin-dashboard/newuser");
  };

  const HandleView = (data) => {
    setUserDetails(data);
    navigate("/admin-dashboard/view");
  };

  const handleUpdateForm = (data) => {
    setUserDetails(data);
    navigate("/admin-dashboard/Update");
  };

  const handleDeleteID = (id) => {
    setDeleteId(id);
  };

  // Filter the userdata based on search query
  const filteredUsers = userdata?.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    return fullName.includes(searchLower) || user.phone.includes(searchQuery);
  });

  // Calculate the current data to display based on pagination
  const indexOfLastUser = currentPage * itemsPerPage; // Last user index
  const indexOfFirstUser = indexOfLastUser - itemsPerPage; // First user index
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser); // Users for the current page

  // Calculate total pages
  const totalPages = Math.ceil((filteredUsers?.length || 0) / itemsPerPage);

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <h1 className=" py-2  text-center">User List</h1>

            <div className="m-2 d-flex justify-content-center align-items-center">
              <form className="flex-grow-1 mr-2">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="form-group mb-0">
                      <div className="input-group input-group-lg">
                        <input
                          type="search"
                          className="form-control form-control-lg"
                          placeholder="Search by First Name, Last Name or Phone"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-lg btn-outline-secondary"
                            type="button"
                          >
                            <i className="fa fa-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <button
                onClick={handleAddUser}
                className="font-weight-bold btn btn-secondary px-4 py-2"
              >
                Add User
              </button>
            </div>

            <div className="row m-2">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {!userdata ? (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <>
                        <table
                          id="example2"
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th>Last Name</th>
                              <th>First Name</th>
                              <th>Phone</th>
                              <th>Number of Subscriptions</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentUsers?.map((data) => (
                              <tr key={data._id}>
                                <td>{data.lastName}</td>
                                <td>{data.firstName}</td>
                                <td>{data.phone}</td>
                                <td>{data.subscription.length}</td>
                                <td>
                                  <div className="d-flex justify-content-center">
                                    <button
                                      className="m-1 btn btn-primary"
                                      onClick={() => HandleView(data)}
                                    >
                                      View
                                    </button>
                                    <button
                                      className="m-1 btn btn-danger"
                                      data-toggle="modal"
                                      data-target="#exampleModalCenter"
                                      onClick={() => handleDeleteID(data?._id)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="m-1 btn btn-dark"
                                      onClick={() => handleUpdateForm(data)}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="pagination ">
                          <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalPages }, (_, index) => (
                            <button
                              key={index + 1}
                              onClick={() => setCurrentPage(index + 1)}
                              className={
                                currentPage === index + 1 ? "active" : ""
                              }
                            >
                              {index + 1}
                            </button>
                          ))}
                          <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Next
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Delete Modal */}
      <div>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Delete
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Are you sure?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
