import { SearchBar } from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import default_poster from "@/assets/Homepage/poster.jpg";
import { MovieCardLong } from "../components/MovieCardLong";

export const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const trendingMoviesList = [
    {
      id: 1,
      title: "Movie 1",
      backdrop_path: default_poster,
      release_date: "2023-01-01",
      popularity: 8.5
    },
    {
      id: 2,
      title: "Movie 2",
      backdrop_path: default_poster,
      release_date: "2023-02-01",
      popularity: 7.3
    },
    {
      id: 3,
      title: "Movie 3",
      backdrop_path: default_poster,
      release_date: "2023-03-01",
      popularity: 9.1
    },
    {
      id: 4,
      title: "Movie 3",
      backdrop_path: default_poster,
      release_date: "2023-03-01",
      popularity: 9.1
    }
  ];

  const RenderSearchMovies = () => {
    return trendingMoviesList.map((movie, index) => {
      return <MovieCardLong key={index} movie={movie} />;
    });
  };
  return (
    <div>
      <SearchBar />
      <div className="mx-6 mb-4 text-2xl font-bold text-appPrimary">Search Result</div>
      <div className="flex flex-col h-screen mx-8 overflow-y-scroll gap-y-4">
        <RenderSearchMovies />
      </div>
    </div>
  );
};
