import React, { useState } from "react";

interface SearchFilterProps {
  updateResult: (filter: string) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ updateResult }) => {
  const [selectedFilter, setSelectedFilter] = useState("movies");
  const [filterList] = useState([
    { value: "movies", label: "Movies" },
    { value: "people", label: "People" }
  ]);

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filterList.find((item) => item.value === filter)?.value || "tvshows");
    updateResult(filter);
  };

  // Render filter items for filterList
  const filterItem = (value: string, label: string) => {
    return (
      <div
        key={value}
        onClick={() => handleSelectFilter(value)}
        className={`w-full h-12 p-2 flex items-center cursor-pointer text-sm ${selectedFilter.includes(value) ? "bg-gray6 font-bold" : "bg-white"}`}
      >
        {label}
      </div>
    );
  };

  const RenderFilterList = () => {
    return filterList.map((item) => filterItem(item.value, item.label));
  };
  return (
    <div id="filter-container">
      <div id="filter-result" className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 font-semibold">View by</h1>
        <RenderFilterList />
      </div>
    </div>
  );
};
