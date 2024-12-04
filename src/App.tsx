import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  Navigate
} from "react-router-dom";
import "./App.css";
import { HomePage } from "@/pages/HomePage";
import { Navbar } from "@/components/Navigation/Navbar";
import { LoginPage } from "@/features/Auth/pages/LoginPage";
import { SignUpPage } from "@/features/Auth/pages/SignUpPage";
import { ProfilePage } from "./pages/ProfilePage";
import Cookies from "js-cookie";

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

// Route guard to check for authentication
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
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
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
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
