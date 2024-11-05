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
import * as RoutesNames from "./utils/routeNames";
import UserLayout from "./client/UserLayout";
import GetProposal from "./client/GetProposal";
import ProposalInfo from "./client/ProposalInfo";
import UpdateProduct from "./admin/product/updateProduct";
import Home from "./admin/home/home";
import Category from "./admin/Category/Category";
import NewProposal from "./admin/proposal/NewProposal";

function App() {
  const router = createBrowserRouter([
    { path: RoutesNames.LOGIN, element: <Login /> },

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
      path: RoutesNames.ADMIN_DASHBOARD,
      element: <AdminLayout />,
      children: [
        { path: RoutesNames.HOME, element: <Home /> },
        { path: RoutesNames.PROPOSALS, element: <Proposals /> },
        { path: RoutesNames.NEW_PROPOSAL, element: <NewProposal /> },
        { path: RoutesNames.CATEGORYS, element: <Category /> },
        {
          path: RoutesNames.NEW_PROPOSAL_TEMPLATE,
          element: <NewProposalTemplete />,
        },
        { path: RoutesNames.PROPOSAL_TEMPLATES, element: <Proposaltemplete /> },
        {
          path: RoutesNames.UPDATE_PROPOSAL_TEMPLATE,
          element: <UpdateProposalTemplate />,
        },
        {
          path: RoutesNames.VIEW_PROPOSAL_TEMPLATE,
          element: <ViewProposalTemplete />,
        },
        { path: RoutesNames.NEW_USER, element: <Register /> },
        { path: RoutesNames.ALL_USERS, element: <Users /> },
        { path: RoutesNames.VIEW_USER, element: <View /> },
        { path: RoutesNames.UPDATE_USER, element: <UpdateForm /> },
        { path: RoutesNames.NEW_PRODUCT, element: <NewProduct /> },
        { path: RoutesNames.ALL_PRODUCTS, element: <Products /> },
        { path: RoutesNames.ALL_ORDERS, element: <Orders /> },


        { path: RoutesNames.NEW_USER, element: <Register /> },
        { path: RoutesNames.ALL_USERS, element: <Users /> },
        { path: RoutesNames.VIEW_USER, element: <View /> },
        { path: RoutesNames.UPDATE_USER, element: <UpdateForm /> },
        { path: RoutesNames.UPDATE_PROPOSAL_TEMPLATE, element: <UpdateProposalTemplate /> },
        { path: RoutesNames.VIEW_PROPOSAL_TEMPLATE, element: <ViewProposalTemplete /> },
        { path: RoutesNames.ALL_PRODUCTS, element: <Products /> },
        { path: RoutesNames.VIEW_PRODUCT, element: <ViewProduct /> },
        { path: RoutesNames.UPDATE_PRODUCT, element: <UpdateProduct /> },

      ],
    },
    { path: RoutesNames.NOT_FOUND, element: <Login /> }, // Fallback for unmatched routesNamesRoutesNames
  ]);

  return <RouterProvider router={router} />;
}

export default App;
