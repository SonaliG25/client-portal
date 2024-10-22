import { useState, useContext, useEffect, createContext } from "react";
const EditUserContext = createContext();

const EditUserProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState(null);

  return (
    <EditUserContext.Provider value={[UserDetails, setUserDetails]}>
      {children}
    </EditUserContext.Provider>
  );
};
//custom Hook
const useEditUserContext = () => useContext(EditUserContext);
export { useEditUserContext, EditUserProvider };
