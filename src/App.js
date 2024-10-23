import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import UserCreationForm from "./admin/NewUser";

import { Login } from "./auth/login";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Orders from "./admin/Orders";
import Proposals from "./admin/Proposal";
import ClientDashboard from "./client/ClientDashboard";
import Home from "./components/Home";
import Register from "./auth/Register";
import UpdateForm from "./admin/UpdateForm";
import View from "./admin/View";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/login", // Route for login
      element: <Login />, // Render the Login component
    },

    {
      path: "/user-dashboard",
      element: <ClientDashboard />,
    },
    {
      path: "/admin-dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "proposal",
          element: <Proposals />,
        },
        {
          path: "newuser",
          element: <Register />,
        },
        {
          path: "allusers", // Route for login
          element: <Users />, // Render the Login component
        },
        {
          path: "view", // Route for view
          element: <View />, // Render the Login component
        },
        {
          path: "Update", // Route for Update
          element: <UpdateForm />, // Render the Login component
        },
      ],
    },
  ]);

  // The `RouterProvider` component is responsible for rendering the `router` we defined above.
  return <RouterProvider router={router} />;
}

export default App;
