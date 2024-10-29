import { useState, useContext, useEffect, createContext } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
const EditProposalTempleteContext = createContext();

const EditProposalTempleteProvider = ({ children }) => {
  const [TempleteDetails, setTempleteDetails] = useState([]);

  return (
    <EditProposalTempleteContext.Provider
      value={[TempleteDetails, setTempleteDetails]}
    >
      {children}
    </EditProposalTempleteContext.Provider>
  );
};
//custom Hook
const useEditProposalTempleteContext = () =>
  useContext(EditProposalTempleteContext);
export { useEditProposalTempleteContext, EditProposalTempleteProvider };
