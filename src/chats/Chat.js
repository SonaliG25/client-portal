import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, InputGroup } from 'react-bootstrap';
import { FaPaperclip } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import moment from 'moment';
import { io } from 'socket.io-client';
import { BASE_URL } from '../utils/endPointNames';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [auth] = useAuth();
  const token = auth?.token;
  const [userChat, setUserChat] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [file, setFile] = useState(null);  // New state for file attachment

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      extraHeaders: { "token": auth.token },
    });
    
    newSocket.on("connect", () => {
      console.log("Socket connected with id:", newSocket.id);
    });
    
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
    
    setSocket(newSocket);
    
    return () => {
      newSocket.disconnect();
    };
  }, [auth]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessageNotification", (notification) => {
        alert(`New message from ${notification.sender}: ${notification.message}`);
      });
      return () => socket.off("newMessageNotification");
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log(message);
        
      });
      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = event.target.elements.messageInput.value;
    
    let fileData = null;
  
    if (file) {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        fileData = {
          name: file.name,
          type: file.type,
          content: reader.result,  // base64 content
        };
  
        // Emit the message and file data through the socket
        const messageData = {
          sender: auth.user.userId,
          receiver: selectedUser._id,
          message: messageText,
          file: fileData,
        };
  
        if (socket && socket.connected) {
          socket.emit('sendMessage', messageData);
        }
        
        // Clear input fields
        event.target.elements.messageInput.value = '';
        setFile(null);  // Reset file state after sending
      };
  
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    } else {
      // Send text message without file
      const messageData = {
        sender: auth.user.userId,
        receiver: selectedUser._id,
        message: messageText,
      };
  
      if (socket && socket.connected) {
        socket.emit('sendMessage', messageData);
      }
  
      // Clear input field
      event.target.elements.messageInput.value = '';
    }
}

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/users`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setUserChat(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserSelect = async (userName, userId) => {
    setSelectedUser({ name: userName, _id: userId });

    if (socket) {
      socket.emit('leaveRoom');
      socket.emit('joinRoom', { userId: auth.user.userId, receiverId: userId });
    }

    try {
      const res = await axios.get(`${BASE_URL}/chat/${userId}/${auth.user.userId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (auth?.token) getUser();
  }, [auth]);

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row className="flex-grow-1">
        <Col md={3} className="sidebar bg-light p-3">
          <h4>Users</h4>
          <ListGroup>
            {userChat.map((user) => (
              <ListGroup.Item
                key={user._id}
                action
                active={selectedUser?.name === user.name}
                onClick={() => handleUserSelect(user.name, user._id)}
              >
                {user.name}
                <div className="small text-muted">
                  {user.lastMessage} - {moment(user.timestamp).format('hh:mm')}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={9} className="d-flex flex-column">
          <div className="chat-header mb-3">
            <h3>Chat with {selectedUser?.name}</h3>
          </div>

          <div className="chat-body flex-grow-1 overflow-auto mb-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message p-2 mb-2 rounded d-flex ${
                  message.sender === auth.user.userId ? 'justify-content-end' : 'justify-content-start'
                }`}
                style={{
                  maxWidth: '70%',
                  marginLeft: message.sender === auth.user.userId ? 'auto' : '0',
                }}
              >
                <div
                  className={`message-content ${
                    message.sender === auth.user.userId ? 'bg-primary text-white' : 'bg-light text-dark'
                  } p-2 rounded`}
                >
                  <div>
                    <strong>{message.sender === auth.user.userId ? "You" : selectedUser?.name}</strong>
                    <span className="small ms-2 text-muted">
                      {moment(message.createdAt).format('hh:mm')}
                    </span>
                  </div>
                  <div>{message.message}</div>
                  {message.file && (
                    <div className="attachment">
                      {message.file.type === 'image' ? (
                        <img src={message.file.url} alt="attachment" style={{ maxWidth: '100px' }} />
                      ) : (
                        <a href={message.file.url} download>
                          {message.file.name}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Form onSubmit={handleSendMessage} className="mt-auto">
            <Row>
              <Col xs={9}>
                <InputGroup>
                  <InputGroup.Text as="label" htmlFor="fileInput">
                    <FaPaperclip />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    name="messageInput"
                  />
                  <Form.Control
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </InputGroup>
                {file && (
                  <div className="file-preview mt-2">
                    <strong>Selected File:</strong> {file.name}
                    {file.type.startsWith('image') && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        style={{ maxWidth: '50px', marginLeft: '10px' }}
                      />
                    )}
                  </div>
                )}
              </Col>
              <Col xs={3}>
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
