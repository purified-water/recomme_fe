import { MdMenu, MdFavorite, MdBookmark } from "rocketicons/md";

export const ActionButtons = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Add to List Button */}
      <div className="relative group">
        <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full" title="Add to list">
          <MdMenu className="w-6 h-6" />
        </button>
        <div className="absolute px-2 py-1 text-sm text-white transition-opacity transform -translate-x-1/2 bg-black rounded-lg opacity-0 w-fit bottom-12 left-1/2 group-hover:opacity-100 whitespace-nowrap">
          Add to list
        </div>
      </div>

      {/* Add to Favorite Button */}
      <div className="relative group">
        <button className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full" title="Add to favorite">
          <MdFavorite className="w-6 h-6" />
        </button>
        <div className="absolute px-2 py-1 text-sm text-white transition-opacity transform -translate-x-1/2 bg-black rounded-lg opacity-0 w-fit bottom-12 left-1/2 group-hover:opacity-100 whitespace-nowrap">
          Mark as favorite
        </div>
      </div>

      {/* Add to Watchlist Button */}
      <div className="relative group">
        <button
          className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
          title="Add to watchlist"
        >
          <MdBookmark className="w-6 h-6" />
        </button>
        <div className="absolute px-2 py-1 text-sm text-white transition-opacity transform -translate-x-1/2 bg-black rounded-lg opacity-0 w-fit bottom-12 left-1/2 group-hover:opacity-100 whitespace-nowrap">
          Add to watchlist
        </div>
      </div>

      {/* Play Trailer Button */}
      <div className="relative group">
        <button className="px-4 py-2 text-sm text-white rounded-lg bg-gray1" title="Play Trailer">
          ▶ Play Trailer
        </button>
        <div className="absolute px-2 py-1 text-sm text-white transition-opacity transform -translate-x-1/2 bg-black rounded-lg opacity-0 w-fit bottom-12 left-1/2 group-hover:opacity-100 whitespace-nowrap">
          Play the trailer
        </div>
      </div>
    </div>
  );
};
