import { createContext, useContext, useState } from "react";

const ProposalViewContext = createContext();

const ProposalViewProvider = ({ children }) => {
  const [proposaldata, setProposalData] = useState(null);
  return (
    <ProposalViewContext.Provider value={[proposaldata, setProposalData]}>
      {children}
    </ProposalViewContext.Provider>
  );
};

//custom hook
const useProposalView = () => useContext(ProposalViewContext);
export { ProposalViewProvider, useProposalView };
