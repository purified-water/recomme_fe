import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface FilterSectionProps {
  onSearch: (filters: any) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ onSearch }) => {
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [sortByList, setSortByList] = useState([
    { value: "everything", label: "Everything" },
    { value: "movies", label: "Movies" },
    { value: "tv", label: "TV Shows" }
  ]);

  const [releaseDates, setReleaseDates] = useState({ from: "", to: "" });
  const [genres, setGenres] = useState<string[]>([]);
  const [userScore, setUserScore] = useState([0, 10]);

  const genreOptions = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "Thriller",
    "War",
    "Western"
  ];

  const handleGenreToggle = (genre: string) => {
    setGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]));
  };

  const handleSearch = () => {
    onSearch({
      selectedSortBy,
      releaseDates,
      genres,
      userScore
    });
  };

  const genreItem = (genre: string) => {
    return (
      <div
        key={genre}
        onClick={() => handleGenreToggle(genre)}
        className={`w-fit p-2 cursor-pointer rounded-xl text-sm ${
          genres.includes(genre) ? "bg-appSecondary text-white" : "bg-gray6"
        }`}
      >
        {genre}
      </div>
    );
  };

  return (
    <div id="filter-container" className="">
      <div id="sort" className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="font-semibold">Sort</h1>
        <Separator orientation="horizontal" className="my-4" />
        <div className="mb-2 font-light">Sort results by</div>
        <select
          value={selectedSortBy}
          onChange={(e) => setSelectedSortBy(e.target.value)}
          className="w-full h-10 p-2 rounded-lg bg-gray5"
        >
          {sortByList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div id="filter" className="p-4 mt-4 bg-white rounded-lg shadow-md">
        <h1 className="font-semibold">Filter</h1>
        <Separator orientation="horizontal" className="my-4" />
        <div className="mb-2 font-light">Filter by genres</div>
        <div className="flex flex-wrap gap-4">{genreOptions.map(genreItem)}</div>

        <Separator orientation="horizontal" className="my-4" />

        <div className="mb-2 font-light">User score</div>
        <div className="flex gap-2">
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={userScore[0]}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (newValue <= userScore[1]) {
                setUserScore([newValue, userScore[1]]);
              }
            }}
            className="w-full accent-appSecondary"
          />
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={userScore[1]}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (newValue >= userScore[0]) {
                setUserScore([userScore[0], newValue]);
              }
            }}
            className="w-full accent-appSecondary"
          />
        </div>
        <div className="flex justify-between">
          <span>{userScore[0]}</span>
          <span>{userScore[1]}</span>
        </div>

        <Separator orientation="horizontal" className="my-4" />

        <div className="mb-2 font-light">Release date</div>
        <div className="mb-2 text-sm font-light">From</div>
        <input
          type="date"
          value={releaseDates.from}
          onChange={(e) => setReleaseDates({ ...releaseDates, from: e.target.value })}
          className="w-full h-10 p-2 bg-gray-100 rounded-lg"
        />
        <div className="mt-4 mb-2 text-sm font-light">To</div>
        <input
          type="date"
          value={releaseDates.to}
          onChange={(e) => setReleaseDates({ ...releaseDates, to: e.target.value })}
          className="w-full h-10 p-2 bg-gray-100 rounded-lg"
        />

        <Separator orientation="horizontal" className="my-4" />

        <button onClick={handleSearch} className="w-full h-10 text-white rounded-lg bg-appPrimary">
          Search
        </button>
      </div>
    </div>
  );
};
