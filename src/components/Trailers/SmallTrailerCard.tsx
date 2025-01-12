import { TrailerType } from "@/types/TrailerType";
import { normalizeImagePath } from "@/utils/NormalizeMovieImage";
import UNAVAILABLE_IMAGE from "@/assets/unavailable_image.jpg";

interface SmallTrailerCardProps {
  trailer: TrailerType;
}

export const SmallTrailerCard = ({ trailer }: SmallTrailerCardProps) => {
  const handleTrailerClick = () => {
    console.log("Trailer clicked:", trailer.title);
  };

  return (
    <div
      className="relative h-48 overflow-hidden transition-all duration-300 transform rounded-lg bg-gray6 w-80 group hover:scale-105 hover:rounded-lg hover:z-10 shrink-0"
      onClick={handleTrailerClick}
    >
      <img
        src={normalizeImagePath(trailer.backdrop_path) || UNAVAILABLE_IMAGE}
        alt={trailer.title}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
        <button className="z-30 flex items-center justify-center w-12 h-12 text-black bg-white rounded-full shadow-lg hover:bg-gray-200">
          ▶
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black to-transparent">
        <h3 className="text-lg font-bold">{trailer.title}</h3>
        <p className="text-sm text-gray-300 line-clamp-1">{trailer.overview}</p>
      </div>
    </div>
  );
};
