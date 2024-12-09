import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState(query ? query : "");

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center p-6 mb-4 left-1">
      <input
        type="text"
        placeholder="Search for a movie, TV show, person..."
        className="w-3/4 px-4 py-2 text-black border rounded-l-xl border-gray5"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="p-2 text-white rounded-r-lg w-28 bg-gray1" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
