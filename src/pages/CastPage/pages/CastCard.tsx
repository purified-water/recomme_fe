import React from "react";
import { Cast } from "@/types/CastType"; // Cast Type
import UNAVAILABLE_IMAGE from "@/assets/unavailable_image.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface CastCardProps {
  cast: Cast;
}

export const CastCard: React.FC<CastCardProps> = ({ cast }) => {
  const { name, profile_path, gender } = cast;
  const navigate = useNavigate();
  // Gender mapping
  const genderString = gender === 1 ? "Female" : gender === 2 ? "Male" : "Unknown";

  return (
    <div className="relative flex flex-col items-center w-48 p-2 bg-white shadow-md h-72 rounded-xl shrink-0 hover:cursor-pointer">
      <div className="relative w-full overflow-hidden rounded-t-lg h-5/6" onClick={() => navigate(`/casts/${cast.id}`)}>
        <img
          src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : UNAVAILABLE_IMAGE}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col w-full mt-2 h-1/6 hover:cursor-default">
        <Link to={`/casts/${cast.id}`}>
          <h2 className="text-base font-semibold truncate">{name}</h2>
        </Link>
        <p className="text-sm text-gray-500">{genderString}</p>
      </div>
    </div>
  );
};
