import { HomeHeader } from "../components/HomeHeader";
import { RenderTrendingMovies } from "../components/RenderTrendingMovies";
import { RenderLatestTrailers } from "../components/RenderLatestTrailers";
import { AppFooter } from "@/components/AppFooter";
import { useState } from "react";
import { RenderPopularMovies } from "../components/RenderPopularMovies";

export const HomePage = () => {
  const [timeWindow, setTimeWindow] = useState("day");
  const [trailerFilter, setTrailerFilter] = useState("popular");

  const renderLatestTrailersTabButton = (trailer_filter: string) => {
    const formattedtrailerFilter = trailer_filter === "popular" ? "Popular" : "In Threaters";
    return (
      <button
        className={`px-3 py-1 text-base font-semibold hover:bg-gray-200 ${trailerFilter === trailer_filter ? " text-appSecondary" : "text-appGray1"}`}
        onClick={() => setTrailerFilter(trailer_filter)}
      >
        {formattedtrailerFilter}
      </button>
    );
  };

  const renderTrendingMoviesTabButton = (time_window: string) => {
    const formattedTimeWindow = time_window === "day" ? "Today" : "This Week";
    return (
      <button
        className={`px-3 py-1 text-base font-semibold hover:bg-gray-200 ${timeWindow === time_window ? " text-appSecondary" : "text-appGray1"}`}
        onClick={() => setTimeWindow(time_window)}
      >
        {formattedTimeWindow}
      </button>
    );
  };

  return (
    <div className="w-full">
      <HomeHeader />

      <div className="flex items-center mx-8 mt-4 mb-2 gap-x-4">
        <div className="text-2xl font-bold text-appPrimary">Trending Movies</div>
        <div className="flex rounded-lg">
          {renderTrendingMoviesTabButton("day")}
          {renderTrendingMoviesTabButton("week")}
        </div>
      </div>

      <div className="flex mx-8 overflow-x-scroll h-80 gap-x-4">
        <RenderTrendingMovies time_window={timeWindow} />
      </div>

      <div className="flex items-center mx-8 mt-8 mb-2 gap-x-4">
        <div className="text-2xl font-bold text-appPrimary">Latest Trailers</div>
        <div className="flex rounded-lg">
          {renderLatestTrailersTabButton("popular")}
          {renderLatestTrailersTabButton("in_theaters")}
        </div>
      </div>

      <div className="flex h-56 mx-8 overflow-x-scroll gap-x-4">
        <RenderLatestTrailers trailerFilter={trailerFilter} />
      </div>

      <div className="flex items-center mx-8 mt-8 mb-2 gap-x-4">
        <div className="text-2xl font-bold text-appPrimary">Popular Movies</div>
      </div>

      <div className="flex mx-8 overflow-x-scroll h-80 gap-x-4">
        <RenderPopularMovies />
      </div>

      <AppFooter />
    </div>
  );
};
