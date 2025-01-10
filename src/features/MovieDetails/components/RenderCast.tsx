import UNAVAILABLE_IMAGE from "@/assets/unavailable_image.jpg";
import { CastInMovieDetail } from "@/types/MovieDetailType";
import { normalizeImagePath } from "@/utils/NormalizeMovieImage";

interface RenderCastProps {
  casts: CastInMovieDetail[];
}

export const RenderCast = ({ casts }: RenderCastProps) => {
  // Normalize the image path
  const handleViewAllCast = () => {
    console.log("View all cast members");
  };

  return (
    <div className="px-12 py-6 mt-6 mb-2">
      <h2 className="mb-4 text-2xl font-bold">Series Cast</h2>
      <div className="flex pb-4 space-x-4 overflow-x-auto scrollbar-hide">
        {casts.map((cast, index) => (
          <div key={index} className="min-w-[150px] max-w-[150px] rounded-lg shadow-md bg-white">
            <img
              src={normalizeImagePath(cast.profile_path) || UNAVAILABLE_IMAGE}
              alt={cast.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-sm font-semibold line-clamp-2">{cast.name}</h3>
              <p className="text-xs text-gray4 line-clamp-2">{cast.character}</p>
              <p className="mt-1 text-xs text-gray1">{cast.known_for_department}</p>
            </div>
          </div>
        ))}
      </div>
      <div onClick={handleViewAllCast} className="mt-4 text-lg cursor-pointer hover:text-gray3 w-fit">
        Full cast and crew
      </div>
    </div>
  );
};
