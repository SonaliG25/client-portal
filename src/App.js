import React from "react";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { UserRoles } from "./constants/roles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import UserCreationForm from "./admin/NewUser";

import { Login } from "./auth/login";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Orders from "./admin/Orders";
import Proposals from "./admin/Proposal";
import { AdminLayout, ClientLayout, Layout } from "./components/Layouts";
import ClientDashboard from "./client/ClientDashboard";

function App() {
  // const { currentUser } = useContext(AuthContext);
  // Ensure currentUser is not null before accessing role
  // const userRole = currentUser ? currentUser.role : null; // Use null or a default role

  // Define routes using `createBrowserRouter`. The `router` object contains all the routes and their associated components.
  // Define routes using `createBrowserRouter`. The `router` object contains all the routes and their associated components.
  const router = createBrowserRouter([
    {
      path: "/", // Route for login
      element: <Login />, // Render the Login component
    },
    {
      path: "/user-dashboard",
      element: <ClientDashboard />,
    },
    {
      path: "/admin-dashboard",
      element: <Dashboard />,
    },

    // Protected routes for authenticated users
    // {
    //   path: "/", // Root path for protected routes

    //   element: <Layout />, // `currentUser.role` is the role of the currently authenticated user
    //   children: [
    //     // Admin routes (protected)
    //     {
    //       path: "/", // Admin base path
    //       element: (
    //         <ProtectedRoute
    //           element={<AdminLayout />}
    //           allowedRoles={[UserRoles.ADMIN]}
    //           userRole={userRole}
    //         />
    //       ), // Only admins can access the admin layout
    //       children: [
    //         {
    //           path: "/dashboard", // Admin dashboard
    //           element: (
    //             <ProtectedRoute
    //               element={<Dashboard />}
    //               allowedRoles={[UserRoles.ADMIN]}
    //               userRole={userRole}
    //             />
    //           ), // Admin dashboard
    //         },
    //         {
    //           path: "/users", // Route for viewing all vendors
    //           element: (
    //             <ProtectedRoute
    //               element={<UserCreationForm />}
    //               allowedRoles={[UserRoles.ADMIN]}
    //               userRole={userRole}
    //             />
    //           ), // Only admins can view vendors
    //         },
    //         {
    //           path: "/orders", // Route for viewing all vendors
    //           element: (
    //             <ProtectedRoute
    //               element={<Orders />}
    //               allowedRoles={[UserRoles.ADMIN]}
    //               userRole={userRole}
    //             />
    //           ), // Only admins can view vendors
    //         },
    //         {
    //           path: "/proposals", // Route for viewing all vendors
    //           element: (
    //             <ProtectedRoute
    //               element={<Proposals />}
    //               allowedRoles={[UserRoles.ADMIN]}
    //               userRole={userRole}
    //             />
    //           ), // Only admins can view vendors
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);

  // The `RouterProvider` component is responsible for rendering the `router` we defined above.
  return <RouterProvider router={router} />;
}

export default App;
