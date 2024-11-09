import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, InputGroup } from 'react-bootstrap';
import { FaPaperclip } from 'react-icons/fa'; // Importing the attachment icon
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'You', text: 'Hello!', timestamp: '12:34 PM' },
    { sender: 'Friend', text: 'Hi!', timestamp: '12:35 PM' },
  ]);
  const [auth] = useAuth();
  const [userChat,setUserChat]= useState([])
  const [selectedUser, setSelectedUser] = useState('Friend'); // Track the selected user for chat
  const [users] = useState([
    { name: 'Friend', lastMessage: 'Hi!', timestamp: '12:35 PM' },
    { name: 'John Doe', lastMessage: 'Hello!', timestamp: '1:00 PM' },
    { name: 'Jane Smith', lastMessage: 'Good morning!', timestamp: '10:00 AM' },
  ]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const messageText = event.target.elements.messageInput.value;
    setMessages([
      ...messages,
      { sender: 'You', text: messageText, timestamp: new Date().toLocaleTimeString() },
    ]);
    event.target.elements.messageInput.value = '';
  };

  const getUser = async () => {
    // setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/user/users`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setUserChat(res.data.data);
      // setTotalPages(res.data.totalPages);
      // setLoading(false);
    } catch (error) {
      console.error(error);
      // setLoading(false);
    }
  }

  const handleUserSelect = (userName) => {
    setSelectedUser(userName);
    getUser()
    // You can fetch the messages for this selected user from an API or state here
    // Example: setMessages(fetchedMessagesForUser);
  };

  return (
    <Container fluid className="chat-container">
      <Row>
        <Col md={3} className="sidebar bg-light p-3">
          <h4>Users</h4>
          <ListGroup>
            {users.map((user, index) => (
              <ListGroup.Item
                key={index}
                action
                active={selectedUser === user.name}
                onClick={() => handleUserSelect(user.name)}
              >
                {user.name}
                <div className="small text-muted">
                  {user.lastMessage} - {user.timestamp}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={9} className="chat-area">
          {/* Chat Header */}
          <div className="chat-header mb-3">
            <h3>Chat with {selectedUser}</h3>
          </div>

          {/* Chat Body */}
          <div className="chat-body" style={{ height: '300px', overflowY: 'scroll' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message p-2 mb-2 rounded d-flex ${
                  message.sender === 'You' ? 'justify-content-end' : 'justify-content-start'
                }`}
                style={{
                  maxWidth: '70%',
                  marginLeft: message.sender === 'You' ? 'auto' : '0',
                }}
              >
                <div
                  className={`message-content ${
                    message.sender === 'You' ? 'bg-primary text-white' : 'bg-light text-dark'
                  } p-2 rounded`}
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{message.sender}</strong>
                      <span className="small ms-2 text-muted">{message.timestamp}</span>
                    </div>
                  </div>
                  <div>{message.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <Form onSubmit={handleSendMessage}>
            <Row>
              <Col xs={10}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaPaperclip />
                  </InputGroup.Text>
                  <Form.Control type="text" placeholder="Type your message..." name="messageInput" />
                </InputGroup>
              </Col>
              <Col xs={2}>
                <Button type="submit" className="w-100">
                  Send
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
