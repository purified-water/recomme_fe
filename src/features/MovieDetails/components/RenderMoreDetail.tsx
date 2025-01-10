import { FaFacebookF, FaTwitter, FaInstagram, FaLink } from "rocketicons/fa";
import { MovieDetailType } from "@/types/MovieDetailType";
import { DecimaliseNumber } from "@/utils/DecimaliseNumber";

interface MovieDetailProps {
  movie: MovieDetailType | undefined;
}
export const RenderMoreDetail = ({ movie }: MovieDetailProps) => {
  console.log("Movie details:", movie);
  return (
    <div className="p-6 my-6">
      {/* Play Button and Streaming Info */}
      <div className="flex items-center mb-6 space-x-4">
        <button className="px-4 py-2 text-white rounded shadow bg-gray1 hover:bg-gray1/80">
          <a href={`${movie ? movie?.homepage : "#"}`} target="_blank" rel="noreferrer">
            Visit page
          </a>
        </button>
        <span className="text-gray-700">{movie?.adult ? "Adult" : "Non-adult"}</span>
      </div>

      {/* Social Media Icons */}
      <div className="flex mb-6 space-x-4">
        <FaFacebookF className="w-6 h-6 text-gray-700 cursor-pointer hover:text-black" />
        <FaTwitter className="w-6 h-6 text-gray-700 cursor-pointer hover:text-black" />
        <FaInstagram className="w-6 h-6 text-gray-700 cursor-pointer hover:text-black" />
        <FaLink className="w-6 h-6 text-gray-700 cursor-pointer hover:text-black" />
      </div>

      {/* Facts Section */}
      <div className="flex flex-col mb-6 space-y-2">
        <h3 className="text-lg font-bold">Facts</h3>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Original Name:</span> {movie?.original_title}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Status:</span> {movie?.status}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Original Language:</span> {movie?.original_language}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Revenue:</span> {DecimaliseNumber(movie!.revenue)}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Budget:</span> {DecimaliseNumber(movie!.budget)}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Average Vote:</span> {movie?.vote_average}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Average Count:</span> {movie?.vote_count}
        </p>
      </div>
    </div>
  );
};
