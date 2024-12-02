import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { HomePage } from "@/pages/HomePage";
import { Navbar } from "@/components/Navigation/Navbar";
import { LoginPage } from "@/features/Auth/pages/LoginPage";
import { SignUpPage } from "@/features/Auth/pages/SignUpPage";

// Layout component to include conditional Navbar
const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
      }
    ]
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
