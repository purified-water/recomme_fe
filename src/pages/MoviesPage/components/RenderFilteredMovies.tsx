import default_poster from "@/assets/Homepage/poster.jpg";
import { MovieCard } from "@/components/Movies/MovieCard";
import { Movie } from "@/types/MovieType";
import { normalizeImagePath } from "@/utils/NormalizeMovieImage";

interface FilteredMoviesProps {
  movies: Movie[];
}

export const RenderFilteredMovies = ({ movies }: FilteredMoviesProps) => {
  const movieList = movies.map((movie: Movie) => ({
    ...movie,
    poster_path: normalizeImagePath(movie.poster_path) || default_poster,
    backdrop_path: normalizeImagePath(movie.backdrop_path || "") || default_poster
  }));

  return (
    <div className="flex flex-wrap gap-y-4 gap-x-6">
      {movieList.map((movie, index) => (
        <>
          <MovieCard movie={movie} key={index} />
        </>
      ))}
    </div>
  );
};
