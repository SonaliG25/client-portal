import React from "react";
import { Card, Col, Row, ProgressBar, Table, Badge } from "react-bootstrap";

const ClientHome = () => {
  // Dummy data
  const userName = "John Doe";
  const activeSubscriptions = 3;
  const recentPayments = [
    { date: "2023-10-01", amount: "$50.00" },
    { date: "2023-09-15", amount: "$75.00" },
    { date: "2023-08-20", amount: "$50.00" },
  ];
  const openTickets = 2;

  return (
    <div className="content-wrapper p-3">
      <Row>
        {/* Welcome Message */}
        <Col md={12} className="mb-3">
          <h3>Welcome, {userName}!</h3>
        </Col>
      </Row>

      <Row>
        {/* Account Overview Cards */}
        <Col md={4}>
          <Card className="bg-success text-white">
            <Card.Body>
              <Card.Title>Active Subscriptions</Card.Title>
              <h4>{activeSubscriptions}</h4>
              <ProgressBar variant="success" now={100} />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="bg-info text-white">
            <Card.Body>
              <Card.Title>Recent Payments</Card.Title>
              <Table hover responsive="sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.date}</td>
                      <td>{payment.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="bg-warning text-dark">
            <Card.Body>
              <Card.Title>Open Tickets</Card.Title>
              <h4>{openTickets}</h4>
              <Badge bg="warning" text="dark">
                Pending
              </Badge>
              <ProgressBar variant="warning" now={openTickets * 10} max={100} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>Subscription Status</Card.Header>
            <Card.Body>
              {/* Replace this div with a chart component */}
              <div
                className="chart"
                style={{ height: "200px", background: "#e0e0e0" }}
              >
                Chart Placeholder
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Payment Trends</Card.Header>
            <Card.Body>
              {/* Replace this div with a chart component */}
              <div
                className="chart"
                style={{ height: "200px", background: "#e0e0e0" }}
              >
                Chart Placeholder
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Links */}
      <Row className="mt-4">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Renew Subscription</Card.Title>
              <button className="btn btn-primary">Renew Now</button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>View Service Requests</Card.Title>
              <button className="btn btn-secondary">View Requests</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ClientHome;
