import { useState, useContext, useEffect, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    const localToken = localStorage.getItem("token");
    if (localAuth) {
      const parselocalAuth = JSON.parse(localAuth);
      if (parselocalAuth) {
        setAuth({ user: parselocalAuth, token: localToken });
      }
    }
  }, []);
  useEffect(() => {
    console.log("auth-one", auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
//custom Hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
