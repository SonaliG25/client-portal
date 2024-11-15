import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import moment from "moment";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/endPointNames";

function ChatSidebar() {
  const [messages, setMessages] = useState([]);
  const [auth] = useAuth();
  const token = auth?.token;
  const [userChat, setUserChat] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const chatEndRef = useRef(null);

  console.log("Auth", auth);

  useEffect(() => {
    const newSocket = io(`${BASE_URL}`, {
      extraHeaders: { token: auth?.token },
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
        alert(
          `New message from ${notification.sender}: ${notification.message}`
        );
      });
      return () => socket.off("newMessageNotification");
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        console.log("message", message);

        // Update messages if the message is for this user
        setMessages((prevMessages) => [...prevMessages, message]);

        // Send a messageRead event if this user is the receiver
        if (message.receiver === auth?.user.userId) {
          socket.emit("messageRead", {
            messageId: message._id,
            userId: auth?.user.userId,
          });
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

  useEffect(() => {
    if (auth?.user.role === "client") {
      // If user is a client, get messages for that client
      if (socket) {
        socket.on("getMessages", (messages) => {
          console.log("getnessages", messages);

          setMessages(messages); // Update messages
        });
      }
    } else {
      getUser(); // Fetch user chats for non-client users
    }
  }, [auth, socket]);

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
          createdAt: new Date(),
        };

        if (socket && socket.connected) {
          socket.emit("sendMessage", messageData);
        }

        // Update the UI immediately with the new message
        setMessages((prevMessages) => [...prevMessages, messageData]);
        event.target.elements.messageInput.value = "";
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
        createdAt: new Date(),
      };

      if (socket && socket.connected) {
        socket.emit("sendMessage", messageData);
      }

      setMessages((prevMessages) => [...prevMessages, messageData]);
      event.target.elements.messageInput.value = "";
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/users`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      const sortedUsers = res.data.data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      const updatedUsers = await Promise.all(
        sortedUsers.map(async (user) => {
          const messagesRes = await axios.get(
            `${BASE_URL}/chat/${user._id}/${auth?.user.userId}`,
            {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
              },
            }
          );

          const unreadCount = messagesRes.data.filter(
            (msg) =>
              msg.receiver === auth?.user.userId &&
              !msg.readBy.includes(auth?.user.userId)
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
      socket.emit("leaveRoom");
      socket.emit("joinRoom", {
        userId: auth?.user.userId,
        receiverId: userId,
      });
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/chat/${userId}/${auth?.user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setMessages(res.data);

      res.data.forEach((message) => {
        if (
          !message.readBy.includes(auth?.user.userId) &&
          message.receiver === auth?.user.userId
        ) {
          socket.emit("messageRead", {
            messageId: message._id,
            userId: auth?.user.userId,
          });
        }
      });

      setUserChat((prevUserChat) =>
        prevUserChat.map((user) =>
          user._id === userId ? { ...user, unreadCount: 0 } : user
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

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
        <Row className="flex-grow-1">
          <Col md={3} className="sidebar bg-light p-3">
            <h4>Users</h4>
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
                  active={selectedUser?.name === user.name}
                  onClick={() => handleUserSelect(user.name, user._id)}
                >
                  {user.name}
                  <div className="small text-muted">
                    {user.lastMessage} -{" "}
                    {moment(user.updatedAt).format("hh:mm")}
                  </div>
                  {user.unreadCount > 0 && (
                    <span className="badge bg-danger rounded-pill ms-2">
                      {user.unreadCount}
                    </span>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={9} className="d-flex flex-column">
            <div className="chat-header mb-3">
              <h3>Chat with {selectedUser?.name}</h3>
            </div>

            <div
              className="chat-body flex-grow-1 overflow-auto mb-3"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message p-2 mb-2 rounded d-flex ${
                    message.sender === auth?.user.userId
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                  style={{
                    maxWidth: "70%",
                    marginLeft:
                      message.sender === auth?.user.userId ? "auto" : "0",
                  }}
                >
                  <div
                    className={`message-content ${
                      message.sender === auth?.user.userId
                        ? "bg-primary text-white"
                        : "bg-light text-dark"
                    } p-2 rounded`}
                  >
                    <div>
                      <strong>
                        {message.sender === auth?.user.userId
                          ? "You"
                          : selectedUser?.name}
                      </strong>
                      <span className="small ms-2 text-muted">
                        {moment(message.createdAt).format("hh:mm")}
                      </span>
                    </div>
                    <div>{message.message}</div>
                    {message.file && (
                      <div className="attachment">
                        {message.file.type === "image" ? (
                          <img
                            src={message.file.url}
                            alt="attachment"
                            style={{ maxWidth: "100px" }}
                          />
                        ) : (
                          <a href={message.file.url} download>
                            {message.file.name}
                          </a>
                        )}
                      </div>
                    )}
                    <div className="text-end small text-muted">
                      {message.isRead ||
                      message.readBy?.includes(selectedUser?._id)
                        ? "Read"
                        : "Unread"}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
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
                    {/* <Form.Control
                      type="file"
                      id="fileInput"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    /> */}
                  </InputGroup>
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
    </div>
  );
}

export default ChatSidebar;
