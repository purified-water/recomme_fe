import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { castApi } from "@/lib/api/castApi";
import { CastProfileType } from "../types/CastProfileType";
import { NormalizeGender } from "@/utils/NormalizeGender";
import { ActingCard } from "../components/ActingCard";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "@/features/Search/components/PageLoading";

const CastProfile: React.FC = () => {
  const navigate = useNavigate();
  const { castId } = useParams<{ castId: string }>();
  const [cast, setCast] = useState<CastProfileType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const fetchCastDetails = async (castId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await castApi.getCastById(castId);
      setCast(response.data.result);
    } catch (err) {
      setError("Error fetching cast details");
      console.log("Error fetching cast details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActingClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    if (castId) {
      fetchCastDetails(castId);
    }
  }, [castId]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cast) {
    return <div>Cast not found</div>;
  }

  const visibleMovies = showAll ? cast.movie_credits.cast : cast.movie_credits.cast.slice(0, 5);

  return (
    <div className="flex w-full px-16 py-8 mx-auto bg-gray-100">
      {/* Top Section */}
      <div className="flex-col w-1/5">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-56 rounded-lg">
          <img
            src={cast ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : "/path/to/default-profile.jpg"}
            alt={cast.name}
            className="object-cover w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex flex-col mt-4">
          {/* Personal Info */}
          <p className="text-xl font-bold text-gray1">Personal Info</p>
          <div className="mt-2 text-base text-gray1">Name</div>
          <p className="text-base text-gray3">{cast.name}</p>
          <div className="mt-2 text-base text-gray1">Known For</div>
          <p className="text-base text-gray3">{cast.known_for_department || "N/A"}</p>
          <div className="mt-2 text-base text-gray1">Gender</div>
          <p className="text-base text-gray3">{NormalizeGender(cast.gender)}</p>
          <div className="mt-2 text-base text-gray1">Popularity</div>
          <p className="text-base text-gray3">{cast.popularity}</p>
          <div className="mt-2 text-base text-gray1">Birthday</div>
          <p className="text-base text-gray3">{cast.birthday}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-col w-4/5">
        <div className="mt-8">
          <h2 className="text-4xl font-bold text-gray1">{cast.name}</h2>

          <h3 className="mt-4 text-base font-semibold text-gray1">Biography</h3>
          <p className="mt-2 text-gray-700 line-clamp-4">{cast.biography || "No biography available."}</p>
        </div>

        {/* Movies Cast Section */}
        {cast.movie_credits.cast.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray1">Acting List</h3>
            <div className="mt-4 space-y-4">
              {visibleMovies.map((movie) => (
                <ActingCard key={movie.credit_id} movie={movie} onClick={handleActingClick} />
              ))}
            </div>

            {/* View More Button */}
            {cast.movie_credits.cast.length > 5 && (
              <button
                className="px-4 py-2 mt-4 text-white rounded-lg bg-gray1 hover:bg-gray1/80"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "View Less" : "View More"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CastProfile;
