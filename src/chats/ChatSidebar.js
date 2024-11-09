import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatSidebar = ({ setActiveChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch chat list (dummy data for now)
    const fetchChats = async () => {
      const response = await axios.get('/api/chat-list'); // Replace with your endpoint
      setChats(response.data);
    };
    fetchChats();
  }, []);

  return (
    <div className="bg-light border-end" style={{ width: '300px', overflowY: 'auto' }}>
      <h5 className="p-3">Chats</h5>
      <ul className="list-group list-group-flush">
        {chats.map((chat, index) => (
          <li
            key={index}
            className="list-group-item list-group-item-action"
            onClick={() => setActiveChat(chat)}
          >
            <div className="d-flex justify-content-between">
              <span>{chat.name}</span>
              <small className="text-muted">{chat.lastMessageTime}</small>
            </div>
            <p className="mb-0 text-muted small">{chat.lastMessage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
