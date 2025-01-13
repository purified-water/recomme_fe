import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { MdAccountCircle, MdClose, MdMenu, MdOutlinePerson, MdLogout, MdStarRate, MdFavorite, MdBookmark } from "rocketicons/md";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/userStore";

export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileIconRef = useRef<HTMLDivElement>(null);
  const displayName = useUserStore((state) => state.displayName);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Check if the access token exists in cookies
    const token = Cookies.get("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  const isActive = (path: string) => (location.pathname === path ? "text-appSecondary font-bold" : "text-gray3");

  return (
    <>
      <nav className="flex items-center justify-between w-full px-12 py-2 border-b border-gray5">
        <div className="flex items-center">
          <div className="flex items-center justify-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="mr-3 -ml-5 transition text-gray3 mp-2 hover:text-gray1"
            >
              {isMenuOpen ? "" : <MdMenu className="icon-lg icon-gray3" />}
            </button>
          </div>

          <Link to="/">
            <div className="w-24 h-auto mr-4 text-xl font-bold text-appPrimary">RecomMe</div>
          </Link>

          <div
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-white space-y-6 text-gray5 lg:static lg:flex lg:flex-row lg:space-y-0 lg:space-x-6 lg:bg-transparent lg:w-auto ${isMenuOpen ? "flex" : "hidden"
              }`}
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-3 right-3 lg:hidden">
              <MdClose className="icon-lg icon-gray3" />
            </button>
            <Link
              to="/movies"
              className={`text-lg font-semibold transition-colors hover:text-appSecondary ${isActive("/movies")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              to="/casts"
              className={`text-lg font-semibold transition-colors hover:text-appSecondary ${isActive("/casts")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Casts
            </Link>
            <Link
              to="/recommendation"
              className={`text-lg font-semibold transition-colors hover:text-appSecondary ${isActive("/recommendation")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Recommendation
            </Link>
          </div>
        </div>

        <div id="profile" className="relative flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div
                ref={profileIconRef}
                className="p-1 transition text-gray3 hover:text-gray1 hover:cursor-pointer"
                onClick={toggleDropdown}
              >
                <MdAccountCircle className="icon-xl" />
              </div>
              {isDropdownOpen && (
                <div
                  id="dropdown"
                  ref={dropdownRef}
                  className="absolute right-0 z-40 w-56 mt-2 bg-white border rounded-lg shadow-xl top-8"
                >
                  <div className="flex flex-row items-center px-3 py-1 gap-x-2">
                    <MdAccountCircle className="icon-3xl" />
                    <div className="text-lg font-semibold">{displayName ? displayName : "User"}</div>
                  </div>

                  <hr className="border-gray5" />

                  <ul className="py-3 space-y-2">
                    <li className="px-4 py-2 text-gray3 hover:opacity-70">
                      <Link to="/profile">
                        <div className="flex items-center space-x-2">
                          <MdOutlinePerson className="icon-lg icon-gray3" />
                          <span>Profile</span>
                        </div>
                      </Link>
                    </li>

                    <li className="px-4 py-2 text-gray3 hover:opacity-70">
                      <Link to="/profile/favouriteList">
                        <div className="flex items-center space-x-2">
                          <MdFavorite className="icon-lg icon-gray3" />
                          <span>Favourite Lists</span>
                        </div>
                      </Link>
                    </li>

                    <li className="px-4 py-2 text-gray3 hover:opacity-70">
                      <Link to="/profile/ratingList">
                        <div className="flex items-center space-x-2">
                          <MdStarRate className="icon-lg icon-gray3" />
                          <span>Ratings</span>
                        </div>
                      </Link>
                    </li>

                    <li className="px-4 py-2 text-gray3 hover:opacity-70">
                      <Link to="/profile/watchlist">
                        <div className="flex items-center space-x-2">
                          <MdBookmark className="icon-lg icon-gray3" />
                          <span>Watchlist</span>
                        </div>
                      </Link>
                    </li>

                    <li className="px-4 py-2 text-gray3 hover:opacity-70">
                      <div className="flex items-center space-x-2">
                        <MdLogout className="icon-lg icon-gray3" />
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 text-base font-semibold transition border text-appPrimary border-appPrimary rounded-xl hover:opacity-90"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};
