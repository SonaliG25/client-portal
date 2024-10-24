import { useState, useContext, useEffect, createContext } from "react";
const EditUserContext = createContext();

const EditUserProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState(null);
  const [proposalTemplateDetails,setPropposalTempleteDetails] = useState()

  return (
    <EditUserContext.Provider value={[UserDetails, setUserDetails,proposalTemplateDetails,setPropposalTempleteDetails]}>
      {children}
    </EditUserContext.Provider>
  );
};
//custom Hook
const useEditUserContext = () => useContext(EditUserContext);
export { useEditUserContext, EditUserProvider };
