import default_profile from "@/assets/default_profile.jpg";
import { userAPI } from "@/lib/api/userApi";
import { useUserStore } from "@/stores/userStore";
import { UserProfile } from "@/types/UserProfileType";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieDetailType } from "@/types/MovieDetailType";
import { normalizeMovieImage } from "@/utils/NormalizeMovieImage";

const UNAVAILABLE_IMAGE = "/path/to/unavailable_image.jpg";

export const ProfileWatchList = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const displayName = useUserStore((state) => state.displayName);
    const userId = localStorage.getItem("userId");
    const [watchList, setWatchList] = useState<MovieDetailType[]>([]);

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

        const fetchWatchList = async () => {
            try {
                const response = await userAPI.getMyWatchList(userId || "");
                const watchList = await response.data.result;
                console.log(watchList);
                // Assuming the response already contains the complete movie details
                const fixedMovies = watchList.map((movie: MovieDetailType) => normalizeMovieImage(movie));
                setWatchList(fixedMovies);
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            }
        };

        fetchProfile();
        fetchWatchList();
    }, [userId, displayName]);

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

            {/* Watchlist Section */}
            <div className="container mx-auto px-4 py-6">
                <div className="text-2xl font-bold mb-4">My Watchlist</div>
                {watchList.length > 0 ? (
                    <div className="grid gap-4">
                        {watchList.map((movie) => (
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
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mb-6">You have no movies in your watchlist.</div>
                )}
            </div>
        </div>
    );
};
