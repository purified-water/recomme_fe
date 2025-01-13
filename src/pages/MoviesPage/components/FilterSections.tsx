import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { genreApi } from "@/lib/api/genreApi";
import { GenreType } from "@/types/GenreType";
import { useToast } from "@/hooks/use-toast";

interface FilterSectionProps {
  onSearch: (filters: any) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ onSearch }) => {
  const [releaseDates, setReleaseDates] = useState({ from: "", to: "" });
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);
  const [userScore, setUserScore] = useState([0, 10]);
  const { toast } = useToast();

  const fetchGenres = async () => {
    try {
      const response = await genreApi.getAllGenres();
      const data = response.data.result;
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreToggle = (genre: GenreType) => {
    setSelectedGenres((prev) =>
      prev.some((g) => g.id === genre.id) ? prev.filter((g) => g.id !== genre.id) : [...prev, genre]
    );
  };

  const inputValidation = () => {
    if (releaseDates.from && releaseDates.to) {
      if (new Date(releaseDates.from) > new Date(releaseDates.to)) {
        toast({
          variant: "destructive",
          description: "From date must be before to date"
        });
        return false;
      }
    } else if (releaseDates.from && !releaseDates.to) {
      toast({
        variant: "destructive",
        description: "Please select a to date"
      });
      return false;
    } else if (!releaseDates.from && releaseDates.to) {
      toast({
        variant: "destructive",
        description: "Please select a from date"
      });
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    if (!inputValidation()) return;
    onSearch({
      releaseDates,
      genres: selectedGenres,
      userScore
    });
  };

  const genreItem = (genre: GenreType) => (
    <div
      key={genre.id}
      onClick={() => handleGenreToggle(genre)}
      className={`w-fit p-2 cursor-pointer rounded-xl text-sm ${
        selectedGenres.some((g) => g.id === genre.id) ? "bg-appSecondary text-white" : "bg-gray6"
      }`}
    >
      {genre.name}
    </div>
  );

  return (
    <div id="filter-container" className="">
      {/* <div id="sort" className="p-4 bg-white rounded-lg shadow-md">
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
      </div> */}

      <div id="filter" className="p-4 mt-4 bg-white rounded-lg shadow-md">
        <h1 className="font-semibold">Filter</h1>
        <Separator orientation="horizontal" className="my-4" />

        {/* Genre Selection */}
        <div className="mb-2 font-light">Filter by genres</div>
        <div className="flex flex-wrap gap-4">{genres.map(genreItem)}</div>

        <Separator orientation="horizontal" className="my-4" />

        {/* User Score Range */}
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

        {/* Release Date */}
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

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full h-10 text-white rounded-lg bg-appPrimary hover:bg-appSecondary"
        >
          Search
        </button>
      </div>
    </div>
  );
};
