import { Movie } from "@/types/MovieType";
import { Link, useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCardLong: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const handleMovieClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <div className="flex items-center w-full bg-white shadow-md h-36 rounded-xl shrink-0 hover:cursor-pointer gap-x-4">
      <div className="relative w-24 h-full overflow-hidden rounded-lg">
        <img
          src={movie.backdrop_path}
          alt={movie.title}
          className="object-cover w-full h-full"
          onClick={handleMovieClick}
        />
      </div>

      <div className="flex flex-col w-full h-full py-2 hover:cursor-default">
        <Link to={`/movie/${movie.id}`}>
          <h2 className="text-base font-semibold">{movie.title}</h2>
        </Link>
        <p className="text-base font-light text-gray-500">{new Date(movie.release_date).toDateString()}</p>
        <div className="self-baseline line-clamp-2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga fugit velit incidunt quaerat. Voluptas minima
          eum blanditiis optio
        </div>
      </div>
    </div>
  );
};