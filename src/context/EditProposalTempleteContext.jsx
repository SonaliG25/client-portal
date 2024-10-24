import { useState, useContext, useEffect, createContext } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
const EditProposalTempleteContext = createContext();

const EditProposalTempleteProvider = ({ children }) => {
  const [TempleteDetails, setTempleteDetails] = useState([]);
  // const [auth] = useAuth();
  // const getProposalTemplete = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/proposalTemplate/templates`, {
  //       headers: {
  //         Authorization: `Bearer ${auth?.token}`, // Sending token in Authorization header
  //       },
  //     });
  //     // console.log("auth:", auth?.token);
      
  //      setTempleteDetails(res.data);
  //      console.log("proposaltemplete:", TempleteDetails);

  //     // console.log(res);
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   console.log("auth-test", auth);
  //   if (auth?.token) {
  //     getProposalTemplete()
  //   }
  // }, [auth]);

  return (
    <EditProposalTempleteContext.Provider value={[TempleteDetails, setTempleteDetails]}>
      {children}
    </EditProposalTempleteContext.Provider>
  );
};
//custom Hook
const useEditProposalTempleteContext = () => useContext(EditProposalTempleteContext);
export { useEditProposalTempleteContext, EditProposalTempleteProvider };
