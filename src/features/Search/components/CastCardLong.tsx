import { Link, useNavigate } from "react-router-dom";
import UNAVAILABLE_IMAGE from "@/assets/unavailable_image.jpg";
import { Cast } from "@/types/CastType.ts";

interface CastCardProps {
  cast: Cast;
}

export const CastCardLong: React.FC<CastCardProps> = ({ cast }) => {
  const navigate = useNavigate();
  const handleMovieClick = () => {
    navigate(`/casts/${cast.id}`);
  };
  return (
    <div className="flex items-center w-full mb-4 bg-white border shadow-md h-36 rounded-xl shrink-0 hover:cursor-pointer gap-x-4">
      <div className="relative w-24 h-full overflow-hidden rounded-lg">
        <img
          src={cast.profile_path || UNAVAILABLE_IMAGE}
          alt={cast.name}
          className="object-cover w-full h-full"
          onClick={handleMovieClick}
        />
      </div>

      <div className="flex flex-col w-full h-full py-2 hover:cursor-default">
        <Link to={`/casts/${cast.id}`}>
          <h2 className="text-base font-semibold">{cast.name}</h2>
        </Link>
        <p className="text-base font-light text-gray-500">{cast.known_for_department}</p>
        <div className="self-baseline line-clamp-2">{cast.biography}</div>
      </div>
    </div>
  );
};
