import React from "react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { HomePage } from "@/pages/HomePage/pages/HomePage";
import { Navbar } from "@/components/Navigation/Navbar";
import { LoginPage, SignUpPage, ForgotPasswordPage, ActivateAccountPage } from "./features/Auth/pages";
import { MovieDetail } from "@/features/MovieDetails/pages/MovieDetail";
import { SearchResult } from "@/features/Search/pages/SearchResult";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { MoviesPage } from "@/pages/MoviesPage/pages/MoviesPage";
import Cookies from "js-cookie";
import { ProfilePage } from "./features/Profile/pages/ProfilePage";
import { ProfileRatingList } from "./features/Profile/pages/ProfileRatePage";
import { ProfileWatchList } from "./features/Profile/pages/ProfileWatchListPage";
import { CastPage } from "./pages/CastPage/pages/CastPage";
import CastProfile from "./pages/CastPage/pages/CastProfile";
import { ProfileFavouriteList } from "./features/Profile/pages/ProfileFavouritePage";
import { Toaster } from "@/components/ui/toaster";
import { RecommendPage } from "./pages/RecommendPage/pages/RecommendationPage";

// Layout component to include conditional Navbar
const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup", "/forgot-password"].includes(location.pathname);

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
        path: "/forgot-password",
        element: <ForgotPasswordPage />
      },
      {
        path: "/activate-account",
        element: <ActivateAccountPage />
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: "/profile/ratingList",
        element: (
          <ProtectedRoute>
            <ProfileRatingList />
          </ProtectedRoute>
        )
      },
      {
        path: "/profile/watchList",
        element: (
          <ProtectedRoute>
            <ProfileWatchList />
          </ProtectedRoute>
        )
      },
      {
        path: "/profile/favouriteList",
        element: (
          <ProtectedRoute>
            <ProfileFavouriteList />
          </ProtectedRoute>
        )
      },
      {
        path: "/movies",
        element: <MoviesPage />
      },
      {
        path: "/casts",
        element: <CastPage />
      },
      {
        path: "/casts/:castId",
        element: <CastProfile />
      },
      {
        path: "/movie/:movieId",
        element: <MovieDetail />
      },
      {
        path: "/search",
        element: <SearchResult />
      },
      {
        path: "/recommendation",
        element: <RecommendPage />
      },
      {
        path: "/*",
        element: <NotFoundPage />
      }
    ]
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </React.StrictMode>
  );
}

export default App;
