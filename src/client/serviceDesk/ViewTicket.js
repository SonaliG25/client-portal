// ViewTicket.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/endPointNames";

const ViewTicket = () => {
  const [auth] = useAuth();
  const { id } = useParams(); // Retrieve ticket ID from the URL
  const [ticketData, setTicketData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/ticket/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setTicketData(response.data);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };

    if (auth?.token) {
      fetchTicket();
    }
  }, [auth, id]);

  if (!ticketData) {
    return <p>Loading ticket details...</p>;
  }

  return (
    <div className="content-wrapper">
      {/* Page Header */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>View Ticket</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Details Section */}
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Ticket Details</h3>
            </div>

            <div className="card-body">
              {/* Title */}
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={ticketData.title}
                  readOnly
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={ticketData.description}
                  readOnly
                />
              </div>

              {/* Priority */}
              <div className="form-group">
                <label>Priority</label>
                <input
                  type="text"
                  className="form-control"
                  name="priority"
                  value={ticketData.priority}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <input
                  type="text"
                  className="form-control"
                  name="priority"
                  value={ticketData.status}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Client name</label>
                <input
                  type="text"
                  className="form-control"
                  name="priority"
                  value={ticketData.client?.name}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label> Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="priority"
                  value={ticketData.client?.email}
                  readOnly
                />
              </div>
              {/* Uploaded Documents Section */}
              <div className="card">
                <div className="card-header bg-primary">
                  <h3 className="card-title">Uploaded Documents</h3>
                </div>
                <div className="card-body table-responsive">
                  <table className="table table-bordered table-striped">
                    <tbody>
                      {ticketData.attachments.map((attachment, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center"></div>
                          </td>
                          {attachment.type.startsWith("image/") && (
                            <td>
                              <img
                                src={URL.createObjectURL(attachment)}
                                alt={attachment.name}
                                style={{ width: "100px", height: "auto" }}
                              />
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button className="btn btn-primary" onClick={() => navigate(-1)}>
                Back to Tickets
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewTicket;
