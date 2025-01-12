import { Cast } from "../types/CastProfileType";

interface ActingCardProps {
  movie: Cast;
  onClick?: (movieId: number) => void;
}

export const ActingCard = ({ movie, onClick }: ActingCardProps) => {
  return (
    <div
      onClick={onClick ? () => onClick(movie.id) : undefined}
      key={movie.credit_id}
      className="flex items-center p-4 bg-white rounded-lg shadow cursor-pointer"
    >
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "/path/to/default-poster.jpg"}
        alt={movie.title}
        className="object-cover w-20 h-24 mr-4 rounded-md"
      />
      <div>
        <h4 className="text-base font-bold text-gray1">{movie.title}</h4>
        <p className="text-gray3">Character: {movie.character || "N/A"}</p>
        <p className="text-gray3">Release Date: {movie.release_date || "N/A"}</p>
      </div>
    </div>
  );
};
