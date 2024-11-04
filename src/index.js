import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import { BrowserRouter } from "react-router-dom";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   // <React.StrictMode>
//   //   <App />
//   // </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

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
