import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomeHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="relative flex-col w-full h-56">
      <div className="absolute inset-0 opacity-75 bg-gradient-to-r from-purple-500 via-pink-500 to-appPrimary"></div>

      <div className="relative flex flex-col justify-start h-full px-12 pt-12 text-white">
        <h1 className="text-4xl font-bold text-white">Welcome to RecomMe</h1>
        <p className="text-lg font-semibold text-white">Millions of movies to discover. Explore now.</p>
      </div>

      <div className="absolute bottom-0 right-0 flex justify-center p-6 mb-4 left-1">
        <input
          type="text"
          placeholder="Search for a movie, TV show, person..."
          className="w-3/4 px-4 py-2 text-black rounded-l-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="p-2 text-white rounded-r-lg w-28 bg-gray1" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};
