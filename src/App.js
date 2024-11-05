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
import * as RouteNames from "./utils/routeNames";
import UserLayout from "./client/UserLayout";
import GetProposal from "./client/GetProposal";
import ProposalInfo from "./client/ProposalInfo";
import UpdateProduct from "./admin/product/updateProduct";
import Home from "./admin/home/home";
import Category from "./admin/Category/Category";
import NewProposal from "./admin/proposal/NewProposal";

function App() {
  const router = createBrowserRouter([
    { path: RouteNames.LOGIN, element: <Login /> },

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
      path: RouteNames.ADMIN_DASHBOARD,
      element: <AdminLayout />,
      children: [
        { path: RouteNames.HOME, element: <Home /> },
        //Proposal
        { path: RouteNames.PROPOSALS, element: <Proposals /> },
        { path: `${RouteNames.NEW_PROPOSAL}/:id`, element: <NewProposal /> },
        //Category
        { path: RouteNames.CATEGORYS, element: <Category /> },
        //ProposalTemplete
        {
          path: RouteNames.NEW_PROPOSAL_TEMPLATE,
          element: <NewProposalTemplete />,
        },
        { path: RouteNames.PROPOSAL_TEMPLATES, element: <Proposaltemplete /> },
        {
          path: RouteNames.UPDATE_PROPOSAL_TEMPLATE,
          element: <UpdateProposalTemplate />,
        },
        {
          path: RouteNames.VIEW_PROPOSAL_TEMPLATE,
          element: <ViewProposalTemplete />,
        },
        { path: Routes.NEW_USER, element: <Register /> },
        { path: Routes.ALL_USERS, element: <Users /> },
        { path: Routes.VIEW_USER, element: <View /> },
        { path: Routes.UPDATE_USER, element: <UpdateForm /> },
        { path: Routes.NEW_PRODUCT, element: <NewProduct /> },
        { path: Routes.ALL_PRODUCTS, element: <Products /> },
        { path: Routes.ALL_ORDERS, element: <Orders /> },

        { path: "newuser", element: <Register /> },
        { path: "allusers", element: <Users /> },
        { path: "view", element: <View /> },
        { path: "Update", element: <UpdateForm /> },
        { path: "updateproposaltemplete/:id", element: <UpdateProposalTemplate /> },
        { path: "viewproposaltemplete/:id", element: <ViewProposalTemplete /> },
        { path: "product", element: <Products /> },
        { path: "viewproduct/:id", element: <ViewProduct /> },
        { path: "updateproduct/:id", element: <UpdateProduct /> },
      ],
    },
    { path: RouteNames.NOT_FOUND, element: <Login /> }, // Fallback for unmatched RouteNames
  ]);

  return <RouterProvider router={router} />;
}

export default App;
