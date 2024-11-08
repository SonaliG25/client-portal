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
import GetProposal from "./client/proposals/GetProposal";
import ProposalInfo from "./client/proposals/ProposalInfo";
import UpdateProduct from "./admin/product/updateProduct";
import AdminHome from "./admin/home/home.js";
import Category from "./admin/Category/Category";
import NewProposal from "./admin/proposal/NewProposal";
import ViewOrder from "./admin/orders/ViewOrder";
import UpdateOrder from "./admin/orders/UpdateOrder";
import ServiceDesk from "./client/serviceDesk/ServiceDesk";
import CreateTicket from "./client/serviceDesk/NewTicket";
import ClientHome from "./client/clientHome/ClientHome.js";
import ProposalDetails from "./admin/proposal/ProposalDetails.js";

function App() {
  const router = createBrowserRouter([
    { path: RoutesNames.LOGIN, element: <Login /> },

    {
      path: "user-dashboard",
      element: <UserLayout />,
      children: [
        {
          path: RoutesNames.USER_HOME,
          element: <ClientHome />,
        },
        {
          path: "proposal",
          element: <GetProposal />,
        },
        {
          path: "proposal-view",
          element: <ProposalInfo />,
        },
        //ServiceDesk
        {
          path: RoutesNames.SERVICE_DESK,
          element: <ServiceDesk />,
        },
        {
          path: RoutesNames.NEW_TICKET,
          element: <CreateTicket />,
        },
      ],
    },

    {
      path: RoutesNames.ADMIN_DASHBOARD,
      element: <AdminLayout />,
      children: [
        //home
        { path: RoutesNames.HOME, element: <AdminHome /> },

        //orders
        { path: RoutesNames.ALL_ORDERS, element: <Orders /> },
        { path: RoutesNames.VIEW_ORDER, element: <ViewOrder /> },
        { path: RoutesNames.UPDATE_ORDER, element: <UpdateOrder /> },

        //Proposals
        { path: RoutesNames.PROPOSALS, element: <Proposals /> },
        { path: RoutesNames.NEW_PROPOSAL, element: <NewProposal /> },
        {
          path: RoutesNames.VIEW_PROPOSAL,
          element: <ProposalDetails />,
        },

        //Category
        { path: RoutesNames.CATEGORYS, element: <Category /> },

        // PROPOSAL_TEMPLATE
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

        //Client
        { path: RoutesNames.NEW_USER, element: <Register /> },
        { path: RoutesNames.ALL_USERS, element: <Users /> },
        { path: RoutesNames.VIEW_USER, element: <View /> },
        { path: RoutesNames.UPDATE_USER, element: <UpdateForm /> },

        //Products
        { path: RoutesNames.NEW_PRODUCT, element: <NewProduct /> },
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
