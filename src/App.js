import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./auth/login";
import Dashboard from "./admin/Dashboard";
import Orders from "./admin/Orders";
import Proposals from "./admin/Proposal";
import ClientDashboard from "./client/ClientDashboard";
import Register from "./auth/Register";
import ViewProduct from "./admin/product/ViewProduct";
import Products from "./admin/product/Products";
import Users from "./admin/user/Users";
import UpdateForm from "./admin/user/UpdateUser";
import View from "./admin/user/UserDetails";
import Proposaltemplete from "./admin/proposalTemplate/Proposaltemplete"
import NewProposalTemplete from "./admin/proposalTemplate/NewProposalTemplate";
import UpdateProposalTemplate from "./admin/proposalTemplate/UpdateProposalTemplate";
import ViewProposalTemplete from "./admin/proposalTemplate/ViewProposalTemplete";
import UpdateProduct from "./admin/product/updateProduct";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
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
          path:'newproposaltemplete',
          element:<NewProposalTemplete />
        }
        ,
        {
          path:'proposaltemplete',
          element:<Proposaltemplete />
        }
        ,
        {
          path: "updateproposaltemplete", // Route for Update
          element: <UpdateProposalTemplate />, // Render the Login component
        },
        {
          path: "viewproposaltemplete", // Route for Update
          element: <ViewProposalTemplete />, // Render the Login component
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
        {
          path: "updateproposaltemplete", // Route for Update
          element: <UpdateProposalTemplate />, // Render the Login component
        },
        {
          path: "viewproposaltemplete", // Route for Update
          element: <ViewProposalTemplete />, // Render the Login component
        },
        {
          path: "product", // Route for Update
          element: <Products />, // Render the Login component
        },
        {
          path: "viewproduct", // Route for Update
          element: <ViewProduct />, // Render the Login component
        },
        {
          path: "updateproduct", // Route for Update
          element: <UpdateProduct />, // Render the Login component
        },
       

      ],
    },
  ]);

  // The `RouterProvider` component is responsible for rendering the `router` we defined above.
  return <RouterProvider router={router} />;
}

export default App;
