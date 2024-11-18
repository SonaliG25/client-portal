import React, { useEffect, useState, useRef } from 'react';
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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const chatEndRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  console.log("Auth",auth);
  
  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      extraHeaders: { "token": auth?.token },
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
      // Handle incoming messages
      socket.on('receiveMessage', (message) => {
        //setMessages((prevMessages) => [...prevMessages, message]);
        
        // Send a messageRead event if this user is the receiver
        if (message.receiver === auth?.user.userId) {
          socket.emit("messageRead", { messageId: message._id, userId: auth?.user.userId });
          if (message.sender !== selectedUser?._id) {
            setUserChat((prevUserChat) =>
              prevUserChat.map((user) =>
                user._id === message.sender
                  ? { ...user, unreadCount: (user.unreadCount || 0) + 1 }
                  : user
              )
            );
          }
        }
      });
  
      // Update messages when message is marked as read
      socket.on("messageRead", ({ messageId, userId }) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === messageId
              ? { ...msg, readBy: [...msg.readBy, userId] }
              : msg
          )
        );
      });
  
      return () => {
        socket.off("receiveMessage");
        socket.off("messageRead");
      };
    }
  }, [socket]);
  

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const messageText = event.target.elements.messageInput.value;
  
    let fileData = null;
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        fileData = {
          name: file.name,
          type: file.type,
          content: reader.result,
        };
  
        const messageData = {
          sender: auth?.user.userId,
          receiver: selectedUser._id,
          message: messageText,
          file: fileData,
          createdAt: new Date(), // Add timestamp for immediate display
        };
  
        if (socket && socket.connected) {
          socket.emit('sendMessage', messageData);
        }
  
        // Update the UI immediately with the new message
        setMessages((prevMessages) => [...prevMessages, messageData]);
        getUser()
        // Clear input fields
        event.target.elements.messageInput.value = '';
        setFile(null);
      };
  
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    } else {
      const messageData = {
        sender: auth?.user.userId,
        receiver: selectedUser._id,
        message: messageText,
        createdAt: new Date(), // Add timestamp for immediate display
      };
  
      if (socket && socket.connected) {
        socket.emit('sendMessage', messageData);
      }
  
      // Update the UI immediately with the new message
      setMessages((prevMessages) => [...prevMessages, messageData]);
  
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
  
      const sortedUsers = res.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
      // Update each user with unread count
      const updatedUsers = await Promise.all(
        sortedUsers.map(async (user) => {
          const messagesRes = await axios.get(`${BASE_URL}/chat/${user._id}/${auth?.user.userId}`, {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          });
  
          // Count unread messages where user is the receiver and current user hasn't read them
          const unreadCount = messagesRes.data.filter(
            (msg) => msg.receiver === auth?.user.userId && !msg.readBy.includes(auth?.user.userId)
          ).length;
  
          return { ...user, unreadCount };
        })
      );
  
      setUserChat(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleUserSelect = async (userName, userId) => {
    setSelectedUser({ name: userName, _id: userId });
  
    if (socket) {
      socket.emit('leaveRoom');
      socket.emit('joinRoom', { userId: auth?.user.userId, receiverId: userId });
    }
  
    try {
      const res = await axios.get(`${BASE_URL}/chat/${userId}/${auth?.user.userId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
  
      setMessages(res.data);
  
      // Mark messages as read
      res.data.forEach((message) => {
        if (!message.readBy.includes(auth?.user.userId) && message.receiver === auth?.user.userId) {
          socket.emit("messageRead", { messageId: message._id, userId: auth?.user.userId });
        }
      });
  
      // Reset unread count for selected user
      setUserChat((prevUserChat) =>
        prevUserChat.map((user) =>
          user._id === userId ? { ...user, unreadCount: 0 } : user
        )
      );
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

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = userChat.filter((user) =>
        user.name.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(userChat);
    }
  };

  return (
    <div className="content-wrapper">
  <Container fluid className="vh-100 d-flex flex-column">
    {/* Sidebar */}
    <Row className="flex-grow-1">
      <Col md={3} className="bg-light p-3 border-right">
        <div className="card card-primary card-outline">
          <div className="card-header">
            <h4 className="card-title">Users</h4>
          </div>
          <div className="card-body p-2">
            <Form.Control
              type="text"
              placeholder="Search Users"
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-3"
            />
            <ListGroup>
              {filteredUsers.map((user) => (
                <ListGroup.Item
                  key={user._id}
                  action
                  className={`d-flex justify-content-between align-items-center ${
                    selectedUser?.name === user.name ? "active" : ""
                  }`}
                  onClick={() => handleUserSelect(user.name, user._id)}
                >
                  <div>
                    <strong>{user.name}</strong>
                    <div className="small text-muted">
                      {user.lastMessage} - {moment(user.updatedAt).format("hh:mm A")}
                    </div>
                  </div>
                  {user.unreadCount > 0 && (
                    <span className="badge bg-danger rounded-pill">
                      {user.unreadCount}
                    </span>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </Col>

      {/* Chat Section */}
      <Col md={9} className="d-flex flex-column">
        {/* Chat Header */}
        <div className="card card-primary card-outline mb-3">
          <div className="card-header">
            <h3 className="card-title">Chat with {selectedUser?.name}</h3>
          </div>
        </div>

        {/* Chat Body */}
        <div
          className="card flex-grow-1 overflow-auto"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <div className="card-body">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex mb-3 ${
                  message.sender === auth?.user.userId ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded shadow-sm ${
                    message.sender === auth?.user.userId ? "bg-primary text-white" : "bg-light"
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  <div className="mb-1">
                    <strong>
                      {message.sender === auth?.user.userId ? "You" : selectedUser?.name}
                    </strong>
                    <span className="small ms-2 text-muted">
                      {moment(message.createdAt).format("hh:mm A")}
                    </span>
                  </div>
                  <div>{message.message}</div>
                  {message.file && (
                    <div className="attachment mt-2">
                      {message.file.type.startsWith("image") ? (
                        <img
                          src={message.file.url}
                          alt="attachment"
                          style={{ maxWidth: "100px", display: "block" }}
                        />
                      ) : (
                        <a href={message.file.url} download>
                          {message.file.name}
                        </a>
                      )}
                    </div>
                  )}
                  <div className="text-end small text-muted">
                    {message.isRead || message.readBy?.includes(selectedUser?._id)
                      ? "Read"
                      : "Unread"}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="card card-footer">
          <Form onSubmit={handleSendMessage} className="d-flex align-items-center">
            <InputGroup>
              <InputGroup.Text as="label" htmlFor="fileInput">
                <FaPaperclip />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                name="messageInput"
                className="flex-grow-1"
              />
              <Form.Control
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </InputGroup>
            <Button type="submit" className="btn btn-primary ms-2">
              Send
            </Button>
          </Form>
          {file && (
            <div className="file-preview mt-2">
              <strong>Selected File:</strong> {file.name}
              {file.type.startsWith("image") && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  style={{ maxWidth: "50px", marginLeft: "10px" }}
                />
              )}
            </div>
          )}
        </div>
      </Col>
    </Row>
  </Container>
</div>

  );
}

export default Chat;