import { HomeHeader } from "../components/HomeHeader";
import { RenderTrendingMovies } from "../components/RenderTrendingMovies";
import { useState } from "react";

export const HomePage = () => {
  const [timeWindow, setTimeWindow] = useState("Week");

  const renderTrendingMoviesTabButton = (time_window: string) => {
    return (
      <button
        className={`px-3 py-1 text-base font-semibold hover:bg-gray-200 ${timeWindow === time_window ? " text-appSecondary" : "text-appGray1"}`}
        onClick={() => setTimeWindow(time_window)}
      >
        {time_window}
      </button>
    );
  };

  return (
    <div className="w-full">
      <HomeHeader />

      <div className="flex items-center mx-8 mt-4 mb-2 gap-x-4 ">
        <div className="text-2xl font-bold text-appPrimary">Trending Movies</div>
        <div className="flex rounded-lg">
          {renderTrendingMoviesTabButton("Day")}
          {renderTrendingMoviesTabButton("Week")}
        </div>
      </div>

      <div className="flex mx-8 overflow-x-scroll gap-x-4">
        <RenderTrendingMovies time_window={timeWindow} />
      </div>
    </div>
  );
};