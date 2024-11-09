// import { useAuth } from "../../context/AuthContext"; // Adjust the path according to where your useAuth hook is located
// import { BASE_URL } from "../../utils/endPointNames";

// // TicketsTable.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ServiceDesk = () => {
//   const [auth] = useAuth(); // Get the logged-in user info (including clientId)
//   const [tickets, setTickets] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("auth", auth.user.userId, currentPage);

//     const fetchTickets = async (page = 1) => {
//       try {
//         const clientId = auth.user.userId; // Retrieve clientId from auth
//         const response = await axios.get(BASE_URL + "/ticket/ticketsByClient", {
//           params: {
//             clientId, // Assuming clientId is part of the logged-in user info
//             page,
//             limit: 10,
//           },
//           headers: {
//             Authorization: `Bearer ${auth.token}`,
//           },
//         });

//         const { tickets, totalPages, currentPage } = response.data;
//         setTickets(tickets);
//         setTotalPages(totalPages);
//         setCurrentPage(currentPage);
//       } catch (error) {
//         console.error("Error fetching tickets:", error);
//       }
//     };

//     fetchTickets();
//   }, [auth.token, auth.userId, currentPage]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };
//   const handleAddUser = () => {
//     navigate(`${USER_DASHBOARD}/newTicket`);
//   };

//   return (
//     <div className="content-wrapper">
//       <h3>My Tickets</h3>
//       <button onClick={handleAddUser} className="btn btn-success mt-2 mt-md-0">
//         <i className="fas fa-plus mr-1"></i> Add ticket
//       </button>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Priority</th>
//             <th>Status</th>
//             <th>Assigned To</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tickets.length === 0 ? (
//             <tr>
//               <td colSpan="6">No tickets found</td>
//             </tr>
//           ) : (
//             tickets.map((ticket) => (
//               <tr key={ticket._id}>
//                 <td>{ticket.title}</td>
//                 <td>{ticket.description}</td>
//                 <td>{ticket.priority}</td>
//                 <td>{ticket.status}</td>
//                 <td>{ticket.assignedTo ? ticket.assignedTo.name : "N/A"}</td>
//                 <td>{new Date(ticket.createdAt).toLocaleString()}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <nav>
//         <ul className="pagination">
//           {currentPage > 1 && (
//             <li className="page-item">
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(currentPage - 1)}
//               >
//                 Previous
//               </button>
//             </li>
//           )}
//           {[...Array(totalPages)].map((_, index) => (
//             <li
//               key={index}
//               className={`page-item ${
//                 currentPage === index + 1 ? "active" : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           {currentPage < totalPages && (
//             <li className="page-item">
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(currentPage + 1)}
//               >
//                 Next
//               </button>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default ServiceDesk;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { USER_DASHBOARD } from "../../utils/routeNames";

function ServiceDesk() {
  const [auth] = useAuth();
  const [ticketdata, setTicketData] = useState([]);
  const navigate = useNavigate();

  const fetchTicketData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/ticket/tickets`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setTicketData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddUser = () => {
    navigate(`${USER_DASHBOARD}/newTicket`);
  };
  const handleview = (data) => {
    navigate(`${USER_DASHBOARD}/${data._id}`);
  };
  useEffect(() => {
    if (auth?.token) {
      fetchTicketData();
    }
  }, [auth]);
  return (
    <div className="content-wrapper">
      {/* Content Header */}

      {/* Main Content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row m-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <button
                      className=" m-1 btn btn-success mt-2 mt-md-0"
                      onClick={handleAddUser}
                    >
                      <i className="fas fa-plus mr-1"></i> Add ticket
                    </button>
                    <table className="table s">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Priority</th>
                          <th>Status</th>
                          <th>Assigned To</th>
                          <th>Created At</th>
                          <th> action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ticketdata.length === 0 ? (
                          <tr>
                            <td colSpan="6">No tickets found</td>
                          </tr>
                        ) : (
                          ticketdata.map((ticket) => (
                            <tr key={ticket._id}>
                              <td>{ticket.title}</td>
                              <td>{ticket.description}</td>
                              <td>{ticket.priority}</td>
                              <td>{ticket.status}</td>
                              <td>
                                {ticket.assignedTo
                                  ? ticket.assignedTo.name
                                  : "N/A"}
                              </td>
                              <td>
                                {new Date(ticket.createdAt).toLocaleString()}
                              </td>
                              <td>
                                {" "}
                                <button
                                  className="btn btn-primary"
                                  onClick={() => handleview(ticket)}
                                >
                                  <i className="fas fa-file-alt"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination Controls */}
                  {/* <div className="d-flex ">
                  <button
                    className="btn btn-outline-primary mr-2"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`btn mr-2 ${
                        currentPage === index + 1
                          ? "btn-primary"
                          : "btn-light"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="btn btn-outline-primary"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServiceDesk;
