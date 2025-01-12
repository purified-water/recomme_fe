import { MdFavorite, MdBookmark } from "rocketicons/md";
import { getUserIdFromLocalStorage } from "@/utils/UserLocalStorage";
import { useToast } from "@/hooks/use-toast";
import { movieApi } from "@/lib/api/movieApi";
import { useEffect, useState } from "react";
import { userAPI } from "@/lib/api/userApi";

interface ActionButtonsProps {
  movieId: string;
}

export const ActionButtons = ({ movieId }: ActionButtonsProps) => {
  const userId = getUserIdFromLocalStorage();
  const { toast } = useToast();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  // Fetch user's favorite list and check if the movie is already in it
  const fetchUserFavoritesAndWatchList = async () => {
    try {
      if (!userId) return;

      const response = await userAPI.getMyFavList();
      const favoriteMovies = response.data.result;

      const responseWatchList = await userAPI.getMyWatchList(userId);
      const watchList = responseWatchList.data.result;

      // Check if the movie is already in the favorite list
      const isAlreadyFavorite = favoriteMovies.some((movie: { id: string }) => movie.id == movieId);
      // Check if the movie is already in the watchlist
      const isAlreadyWatchlist = watchList.some((movie: { id: string }) => movie.id == movieId);

      setIsFavorite(isAlreadyFavorite);
      setIsWatchlist(isAlreadyWatchlist);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  useEffect(() => {
    fetchUserFavoritesAndWatchList();
  }, [movieId]);

  // Handle adding or removing from favorites
  const handleToggleFavorite = async () => {
    if (!userId) {
      toast({
        variant: "destructive",
        description: "Please login to manage favorites",
      });
      return;
    }

    try {
      if (isFavorite) {
        await movieApi.removeMovieFromFavorites([movieId]);
        toast({ description: "Removed from favorites" });
      } else {
        await movieApi.addMovieToFavorites([movieId]);
        toast({ description: "Added to favorites" });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error updating favorites",
      });
    }
  };

  const handleAddToWatchList = async () => {
    if (!userId) {
      toast({
        variant: "destructive",
        description: "Please login to add to watchlist",
      });
      return;
    }
    try {
      if (isWatchlist) {
        await movieApi.removeMovieFromWatchlist([movieId]);
        toast({ description: "Removed from watchlist" });
      } else {
        await movieApi.addMovieToWatchlist([movieId]);
        toast({ description: "Added to watchlist" });
      }
      setIsWatchlist(!isWatchlist);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error adding to watchlist",
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Add to Favorite Button */}
      <div className="relative group">
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full ${isFavorite ? "bg-appSecondary text-white" : "bg-gray-200"
            }`}
          title={isFavorite ? "Remove from favorite" : "Add to favorite"}
          onClick={handleToggleFavorite}
        >
          <MdFavorite className={`w-6 h-6 ${isFavorite ? "icon-white" : ""}`} />
        </button>
        <div className="absolute px-2 py-1 text-sm text-white transition-opacity transform -translate-x-1/2 bg-black rounded-lg opacity-0 w-fit bottom-12 left-1/2 group-hover:opacity-100 whitespace-nowrap">
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </div>
      </div>

      {/* Add to Watchlist Button */}
      <div className="relative group">
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full ${isWatchlist ? "bg-appSecondary text-white" : "bg-gray-200"
            }`}
          title="Add to watchlist"
          onClick={handleAddToWatchList}
        >
          <MdBookmark className={`w-6 h-6 ${isWatchlist ? "icon-white" : ""}`} />
        </button>
        <div
          className="absolute px-2 py-1 text-sm text-white transition-opacity transform -translate-x-1/2 bg-black rounded-lg opacity-0 w-fit bottom-12 left-1/2 group-hover:opacity-100 whitespace-nowrap"
        >
          Add to watchlist
        </div>
      </div>
    </div>
  );
};
