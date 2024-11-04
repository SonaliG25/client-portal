import { useState, useContext, createContext } from "react";

const EditUserContext = createContext();

const EditUserProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState(null);
  const [proposalTemplateDetails, setProposalTemplateDetails] = useState();
  const [productDetails, setProductDetails] = useState([]);

  return (
    <EditUserContext.Provider
      value={[
        UserDetails,
        setUserDetails,
        proposalTemplateDetails,
        setProposalTemplateDetails,
        productDetails,
        setProductDetails,
      ]}
    >
      {children}
    </EditUserContext.Provider>
  );
};

// Custom Hook
const useEditUserContext = () => useContext(EditUserContext);

export { useEditUserContext, EditUserProvider };
