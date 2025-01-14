import { Movie } from "@/types/MovieType";
import { Link, useNavigate } from "react-router-dom";
import UNAVAILABLE_IMAGE from "@/assets/unavailable_image.jpg";

interface MovieCardProps {
  movie?: Movie; // Made optional to handle undefined or null cases
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  // If movie doesn't exist, return null or a placeholder
  if (!movie) {
    return <div className="w-48 p-2 bg-gray-200 h-72 rounded-xl">No movie data available</div>;
  }

  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`); // Updated to use `tmdb_id` as per the API response
  };

  return (
    <div className="relative flex flex-col items-center w-48 p-2 bg-white shadow-md h-72 rounded-xl shrink-0 hover:cursor-pointer">
      <div className="relative w-full overflow-hidden rounded-t-lg h-5/6">
        <img
          src={movie.backdrop_path || UNAVAILABLE_IMAGE}
          alt={movie.title}
          className="object-cover w-full h-full"
          onClick={handleMovieClick}
        />
      </div>

      <div className="flex flex-col w-full mt-2 h-1/6 hover:cursor-default">
        <Link to={`/movie/${movie.id}`}>
          <h2 className="text-base font-semibold truncate">{movie.title}</h2>
        </Link>
        <p className="text-sm text-gray-500">{new Date(movie.release_date).toDateString()}</p>
      </div>

      <div className="absolute flex items-center justify-center w-10 h-10 text-xs font-bold text-white bg-black border-2 rounded-full border-appMedium top-2 -bottom-3 left-3">
        {parseFloat(movie.vote_average).toFixed(1)}
      </div>
    </div>
  );
};
