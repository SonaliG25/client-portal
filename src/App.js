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

function App() {
  // const { currentUser } = useContext(AuthContext);
  // Ensure currentUser is not null before accessing role
  // const userRole = currentUser ? currentUser.role : null; // Use null or a default role

  // Define routes using `createBrowserRouter`. The `router` object contains all the routes and their associated components.
  // Define routes using `createBrowserRouter`. The `router` object contains all the routes and their associated components.
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
      ],
    },
  ]);

  // The `RouterProvider` component is responsible for rendering the `router` we defined above.
  return <RouterProvider router={router} />;
}

export default App;
