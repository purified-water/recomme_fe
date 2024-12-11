import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-appPrimary">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-appSecondary hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};
