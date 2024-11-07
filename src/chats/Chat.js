import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

function AdminChat() {
  const [auth] = useAuth(); // Authentication context to get the token
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchConversations();
  }, []);

  // Fetch all conversations for the admin
  const fetchConversations = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/chat/admin/${auth.user.userId}/conversations`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  // Fetch messages for the selected client
  const fetchMessages = (client) => {
    setSelectedClient(client);
    setMessages(client.messages);
  };

  // Send a new message
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    try {
      const response = await axios.post(`http://localhost:3000/chat`, {
        sender: auth.user._id,
        receiver: selectedClient.client._id,
        message: newMessage,
      }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <h5>Clients</h5>
          <ListGroup>
            {clients.map((clientData, index) => (
              <ListGroup.Item
                key={clientData.client._id}
                active={selectedClient && selectedClient.client._id === clientData.client._id}
                onClick={() => fetchMessages(clientData)}
                style={{ cursor: "pointer" }}
              >
                {clientData.client.username}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={8}>
          <h5>Chat with {selectedClient ? selectedClient.client.username : "Select a client"}</h5>
          <div className="border rounded p-3 mb-3" style={{ height: "400px", overflowY: "auto" }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.sender._id === auth.user._id ? "text-end" : "text-start"}`}>
                <strong>{msg.sender.username}</strong>: {msg.message}
              </div>
            ))}
          </div>
          {selectedClient && (
            <Form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <Form.Group controlId="newMessage">
                <Form.Control
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="mt-2" onClick={sendMessage}>
                Send
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminChat;
