// Import necessary hooks and functions from React, Socket.IO, and the AuthContext
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; // Import Socket.IO client for real-time communication
import { AuthContext } from "./AuthContext"; // Import AuthContext to access current user data

// Create a new context called SocketContext to manage and share the socket instance across components
export const SocketContext = createContext();

// SocketContextProvider component that wraps the app and provides socket connection functionality
export const SocketContextProvider = ({ children }) => {
  // Access the current user from AuthContext using useContext
  const { currentUser } = useContext(AuthContext);

  // State to store the socket instance
  const [socket, setSocket] = useState(null);

  // useEffect to initialize the socket connection when the component mounts
  useEffect(() => {
    // Create a new socket connection to the server (http://localhost:5173)
    setSocket(io("http://localhost:3001"));

    // Cleanup: disconnect the socket when the component unmounts
    return () => {
      socket?.disconnect();
    };
  }, []); // Empty dependency array to run only on component mount

  // useEffect to emit the 'newUser' event when the currentUser is available and socket is ready
  useEffect(() => {
    if (currentUser && socket) {
      socket.emit("newUser", currentUser.id); // Emit the 'newUser' event with the user's ID when they log in
    }
  }, [currentUser, socket]); // This effect runs whenever the currentUser or socket changes

  // Return the SocketContext.Provider component that wraps around all children components,
  // making the socket instance available to any component that consumes the context
  return (
    <SocketContext.Provider value={{ socket }}>
      {children} {/* Render children components that can access the socket */}
    </SocketContext.Provider>
  );
};
