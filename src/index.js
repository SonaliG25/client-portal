import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext.jsx";
import { EditUserProvider } from "./context/EditUserContext.jsx";
import { ProposalViewProvider } from "./context/ProposalViewContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <EditUserProvider>
        <ProposalViewProvider>
          <Toaster></Toaster>
          <App />
        </ProposalViewProvider>
      </EditUserProvider>
    </AuthProvider>
  </React.StrictMode>
);
