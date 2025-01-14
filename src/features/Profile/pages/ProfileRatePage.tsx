import default_profile from "@/assets/default_profile.jpg";
import { userAPI } from "@/lib/api/userApi";
import { movieApi } from "@/lib/api/movieApi";
import { useUserStore } from "@/stores/userStore";
import { UserProfile } from "@/types/UserProfileType";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieDetailType } from "@/types/MovieDetailType";
import { normalizeMovieImage } from "@/utils/NormalizeMovieImage";
import { Rating } from "@/types/MovieRatingType";

const UNAVAILABLE_IMAGE = "/path/to/unavailable_image.jpg";

export const ProfileRatingList = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const displayName = useUserStore((state) => state.displayName);
  const userId = localStorage.getItem("userId");
  const [movieDetailsList, setMovieDetailsList] = useState<MovieDetailType[]>([]);
  const [ratingList, setRatingList] = useState<Rating[]>([]);
  useEffect(() => {
    const fetchRatingList = async () => {
      try {
        const response = await userAPI.getMyRatingList(localStorage.getItem("userId") || "");
        const ratingList = await response.data.result;
        console.log(ratingList);
        setRatingList(ratingList);
        // Fetch movie details for each movieId
        const movieDetailsPromises = ratingList.map(async (rating: { movieId: number }) => {
          const response = await movieApi.getMovieDetails(rating.movieId);
          console.log(response.data.result);
          return response.data.result;
        });
        const movieDetailsList = await Promise.all(movieDetailsPromises);
        const fixImg = movieDetailsList.map((movie) => {
          return normalizeMovieImage(movie);
        });
        setMovieDetailsList(fixImg);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchRatingList();
  }, []);

  useEffect(() => {
    if (!userId) {
      alert("User not found");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile();
        const data: UserProfile = await response.data;

        if (!data.displayName) {
          data.displayName = displayName;
        }

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      {/* Profile Header */}
      <div className="w-full h-48 p-8 px-20 bg-gradient-to-r from-purple-500 via-pink-500 to-appPrimary">
        <div className="flex items-center">
          <img src={default_profile} alt="Profile" className="w-32 h-32 ml-4 mr-6 rounded-full" />
          <div>
            <p className="text-3xl font-semibold text-white">{profile.displayName || "N/A"}</p>
            <p className="text-white">
              <strong className="font-semibold">UID:</strong> {profile.uid || "N/A"}
            </p>
            <div className="text-base text-white">{profile.email || "N/A"}</div>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-2xl font-bold mb-4">My Ratings</div>
        {movieDetailsList.length > 0 ? (
          <div className="grid gap-4">
            <div className="grid gap-4">
              {ratingList.map((rating) => {
                // Find the movie that matches the movieId in the rating
                const movie = movieDetailsList.find((m) => m.id.toString() === rating.movieId);
                if (!movie) return null; // Skip if movie details are not found

                return (
                  <div
                    key={movie.id}
                    className="flex items-center w-full mb-4 bg-white border shadow-md h-36 rounded-xl shrink-0 hover:cursor-pointer gap-x-4"
                  >
                    <div className="relative w-24 h-full overflow-hidden rounded-lg">
                      <img
                        src={movie.backdrop_path || UNAVAILABLE_IMAGE}
                        alt={movie.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col w-full h-full py-2 hover:cursor-default">
                      <Link to={`/movie/${movie.id}`}>
                        <h2 className="text-base font-semibold">{movie.title}</h2>
                      </Link>
                      <p className="text-base font-light text-gray-500">
                        {new Date(movie.release_date).toDateString()}
                      </p>
                      <div className="self-baseline line-clamp-2">{movie.overview}</div>
                      <div className="text-lg text-gray-700">
                        <strong>Your Rating: {rating.rating || "N/A"}/10</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mb-6">You haven't rated any movies.</div>
        )}
      </div>
    </div>
  );
};
