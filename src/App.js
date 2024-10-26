import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./auth/login";
import AdminLayout from "./admin/AdminLayout";
import Orders from "./admin/Orders";
import Proposals from "./admin/Proposal";
import ClientDashboard from "./client/ClientDashboard";
import Register from "./admin/user/NewUser";
import Users from "./admin/user/Users";
import UpdateForm from "./admin/user/UpdateUser";
import View from "./admin/user/UserDetails";
import Proposaltemplete from "./admin/proposalTemplate/Proposaltemplete";
import NewProposalTemplete from "./admin/proposalTemplate/NewProposalTemplate";
import UpdateProposalTemplate from "./admin/proposalTemplate/UpdateProposalTemplate";
import ViewProposalTemplete from "./admin/proposalTemplate/ViewProposalTemplete";
import NewProduct from "./admin/product/NewProduct";
import Products from "./admin/product/Products";
import ProtectedRoute from "./auth/ProtectedRoute";

// Import route names
import * as Routes from "./routeNames";
import UserLayout from "./admin/user/UserLayout";
import GetProposal from "./admin/user/GetProposal";

function App() {
  const router = createBrowserRouter([
    { path: Routes.LOGIN, element: <Login /> },
    {
      path: "user-dashboard",
      element: <UserLayout />,
      children: [
        {
          path: "proposal",
          element: <GetProposal />,
        },
      ],
    },
    {
      path: Routes.ADMIN_DASHBOARD,
      element: <AdminLayout />, // Use ProtectedRoute with role-based access
      children: [
        { path: Routes.PROPOSALS, element: <Proposals /> },
        {
          path: Routes.NEW_PROPOSAL_TEMPLATE,
          element: <NewProposalTemplete />,
        },
        { path: Routes.PROPOSAL_TEMPLATES, element: <Proposaltemplete /> },
        {
          path: Routes.UPDATE_PROPOSAL_TEMPLATE,
          element: <UpdateProposalTemplate />,
        },
        {
          path: Routes.VIEW_PROPOSAL_TEMPLATE,
          element: <ViewProposalTemplete />,
        },
        { path: Routes.NEW_USER, element: <Register /> },
        { path: Routes.ALL_USERS, element: <Users /> },
        { path: Routes.VIEW_USER, element: <View /> },
        { path: Routes.UPDATE_USER, element: <UpdateForm /> },
        { path: Routes.NEW_PRODUCT, element: <NewProduct /> },
        { path: Routes.ALL_PRODUCTS, element: <Products /> },
        { path: Routes.ALL_ORDERS, element: <Orders /> },
      ],
    },
    // {
    //   path: Routes.USER_DASHBOARD,
    //   element: <ProtectedRoute role="client" />,
    //   children: [
    //     // Add user-specific routes here if any
    //   ],
    // },
    { path: Routes.NOT_FOUND, element: <Login /> }, // Fallback for unmatched routes
  ]);

  return <RouterProvider router={router} />;
}

export default App;
