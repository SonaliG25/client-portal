// // Import necessary hooks and functions from React
// import { createContext, useEffect, useState } from "react";

// // Create a new context called AuthContext, which will be used to store and manage authentication-related data
// export const AuthContext = createContext();

// // AuthContextProvider component that wraps around the app to provide authentication-related state to child components
// export const AuthContextProvider = ({ children }) => {
//   // Initialize state to store the current user. It checks if there is any user data in localStorage and parses it; otherwise, it defaults to null.
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("userInfo")) || null
//   );

//   // Function to update the current user state, used when user logs in, updates their profile, etc.
//   const updateUser = (data) => {
//     setCurrentUser(data);
//   };

//   // useEffect hook to store the current user in localStorage whenever the currentUser state changes.
//   useEffect(() => {
//     localStorage.setItem("userInfo", JSON.stringify(currentUser)); // This ensures that user data persists even after refreshing the page
//   }, [currentUser]);

//   // Return the AuthContext.Provider component that wraps around all children components, making the current user and updateUser function available to any component that consumes the context
//   return (
//     <AuthContext.Provider value={{ currentUser, updateUser }}>
//       {children}{" "}
//       {/* The children components that will have access to AuthContext */}
//     </AuthContext.Provider>
//   );
// };


import { useState, useContext, useEffect, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      if (parseData?.user && parseData?.token) {
        setAuth({ user: parseData.user, token: parseData.token });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
//custom Hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
