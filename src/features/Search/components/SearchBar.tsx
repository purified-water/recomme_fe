import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserIdFromLocalStorage } from "@/utils/UserLocalStorage";
import { movieApi } from "@/lib/api/movieApi";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = getUserIdFromLocalStorage();
  const query = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState(query ? query : "");
  const [isAIEnabled, setIsAIEnabled] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery) return;

    // Only save once
    if (userId) {
      const saveSearchResponse = await movieApi.saveSearchHistory(searchQuery);
      console.log(saveSearchResponse);
    }

    if (isAIEnabled) {
      navigate(`/search?isAdvancedSearch=true&query=${searchQuery}`);
    } else {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleAI = () => {
    setIsAIEnabled((prev) => !prev);
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
      <button
        className="p-2 text-white transition-all duration-300 ease-in-out transform w-28 bg-gray1 hover:bg-gray-700 hover:scale-105"
        onClick={handleSearch}
      >
        Search
      </button>
      <button
        className={`p-2 text-white rounded-r-lg w-28 transition-all duration-300 ease-in-out transform hover:scale-105 ${isAIEnabled ? "bg-green-500 hover:bg-green-700" : "bg-gray2 hover:bg-gray-700"}`}
        onClick={toggleAI}
      >
        {isAIEnabled ? "AI Enabled" : "Enable AI"}
      </button>
    </div>
  );
};
