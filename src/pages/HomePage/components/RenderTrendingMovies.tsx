import default_poster from "@/assets/Homepage/poster.jpg";
import { MovieCard } from "../../../components/Movies/MovieCard";
import { useState, useEffect } from "react";

interface TrendingMoviesProps {
  time_window: string;
}

export const RenderTrendingMovies = ({ time_window }: TrendingMoviesProps) => {
  // const [movies, setMovies] = useState([]);

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

  useEffect(() => {
    console.log(`Fetching trending movies for ${time_window}`);
  }, [time_window]);

  const RenderTrendingMovies = () => {
    return trendingMoviesList.map((movie, index) => {
      return <MovieCard key={index} movie={movie} />;
    });
  };

  return (
    <>
      <RenderTrendingMovies />
    </>
  );
};
