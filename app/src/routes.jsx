import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LayoutDashboard from "./layouts/LayoutDashboard";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

// Define the router configuration in this file
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Root layout route
    children: [
      {
        path: "",
        element: <LayoutDashboard />, // Default layout route
        children: [
          {
            path: "", // Default path inside the layout (Dashboard)
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "reports",
            element: <Orders />,
            children: [
              {
                path: "", // Default path for reports
                element: <Dashboard />,
              },
              {
                path: "sales",
                element: <Dashboard />, // This can be a sales page component if needed
              },
              {
                path: "traffic",
                element: <Orders />, // Replace with actual traffic report component if needed
              },
             
            ],
          },
          {
            path: "integrations",
            element: <Orders />, // Replace with actual integrations component if needed
          },
          {
            path: "settings",
            element: <Orders />, // Replace with settings page if needed
          },
        ],
      },
    ],
  },
]);
