import { useAuth } from "../../context/AuthContext"; // Adjust the path according to where your useAuth hook is located
import { BASE_URL } from "../../utils/endPointNames";

// TicketsTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ServiceDesk = () => {
  const [auth] = useAuth(); // Get the logged-in user info (including clientId)
  const [tickets, setTickets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("auth", auth.user.userId, currentPage);

    const fetchTickets = async (page = 1) => {
      try {
        const clientId = auth.user.userId; // Retrieve clientId from auth
        const response = await axios.get(BASE_URL + "/ticket/ticketsByClient", {
          params: {
            clientId, // Assuming clientId is part of the logged-in user info
            page,
            limit: 10,
          },
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        const { tickets, totalPages, currentPage } = response.data;
        setTickets(tickets);
        setTotalPages(totalPages);
        setCurrentPage(currentPage);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [auth.token, auth.userId, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="content-wrapper">
      <h3>My Tickets</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="6">No tickets found</td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>{ticket.assignedTo ? ticket.assignedTo.name : "N/A"}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
          )}
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          {currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default ServiceDesk;
