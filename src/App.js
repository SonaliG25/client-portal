import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./auth/login";
import AdminLayout from "./admin/particals/AdminLayout";
import Orders from "./admin/orders/Orders";
import Proposals from "./admin/proposal/Proposals";
import ClientDashboard from "./client/ClientDashboard";
import Register from "./admin/user/NewUser";
import ViewProduct from "./admin/product/ViewProduct";
import Products from "./admin/product/Products";
import Users from "./admin/user/Users";
import UpdateForm from "./admin/user/UpdateUser";
import View from "./admin/user/UserDetails";
import Proposaltemplete from "./admin/proposalTemplate/Proposaltemplete";
import NewProposalTemplete from "./admin/proposalTemplate/NewProposalTemplate";
import UpdateProposalTemplate from "./admin/proposalTemplate/UpdateProposalTemplate";
import ViewProposalTemplete from "./admin/proposalTemplate/ViewProposalTemplete";
import NewProduct from "./admin/product/NewProduct";
// Import route names
import * as Routes from "./utils/routeNames";
import UserLayout from "./client/UserLayout";
import GetProposal from "./client/GetProposal";
import ProposalInfo from "./client/ProposalInfo";
import UpdateProduct from "./admin/product/updateProduct";
import Home from "./admin/home/home";
import Category from "./admin/Category/Category";
import NewProposal from "./admin/proposal/NewProposal";

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
        {
          path: "proposal-view",
          element: <ProposalInfo />,
        },
      ],
    },

    {
      path: Routes.ADMIN_DASHBOARD,
      element: <AdminLayout />,
      children: [
        { path: Routes.HOME, element: <Home /> },
        { path: Routes.PROPOSALS, element: <Proposals /> },
        { path: Routes.NEW_PROPOSAL, element: <NewProposal /> },
        { path: Routes.CATEGORYS, element: <Category /> },
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

        { path: Routes.NEW_USER, element: <Register /> },
        { path: Routes.ALL_USERS, element: <Users /> },
        { path: Routes.VIEW_USER, element: <View /> },
        { path: Routes.UPDATE_USER, element: <UpdateForm /> },
        { path: Routes.UPDATE_PROPOSAL_TEMPLATE, element: <UpdateProposalTemplate /> },
        { path: Routes.VIEW_PROPOSAL_TEMPLATE, element: <ViewProposalTemplete /> },
        { path: Routes.ALL_PRODUCTS, element: <Products /> },
        { path: Routes.VIEW_PRODUCT, element: <ViewProduct /> },
        { path: Routes.UPDATE_PRODUCT, element: <UpdateProduct /> },
      ],
    },
    { path: Routes.NOT_FOUND, element: <Login /> }, // Fallback for unmatched routes
  ]);

  return <RouterProvider router={router} />;
}

export default App;
