import { useEffect, useState } from "react";
import { userAPI } from "@/lib/api/userApi";
import { UserProfile } from "@/types/UserProfileType";
import default_profile from "@/assets/default_profile.jpg";
import { useUserStore } from "@/stores/userStore";
import { SearchHistoryType } from "@/types/SearchHistory";
import { formatDateTime } from "@/utils/FormatDateTime";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const displayName = useUserStore((state) => state.displayName);
  const userId = localStorage.getItem("userId");
  const [searchHistory, setSearchHistory] = useState<SearchHistoryType[]>([]);

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

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await userAPI.getMySearchHistory();
        console.log("Search history", response.data.result);
        setSearchHistory(response.data.result);
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };

    fetchSearchHistory();
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full h-48 p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-appPrimary">
        <div className="flex items-center">
          <img
            src={profile.photoUrl || default_profile}
            alt="Profile"
            className="w-32 h-32 ml-4 mr-6 rounded-full shadow-md"
          />
          <div>
            <p className="text-3xl font-semibold text-white">{profile.displayName || "N/A"}</p>
            <p className="mt-2 text-white">
              <strong className="font-semibold">UID:</strong> {profile.uid || "N/A"}
            </p>
            <p className="mt-1 text-base text-white">{profile.email || "N/A"}</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Search History</h2>
        {searchHistory.length > 0 ? (
          <ul className="px-8 py-4 overflow-y-auto text-gray-700 list-disc border rounded-lg h-96">
            {searchHistory.map((history, index) => (
              <li key={index} className="mb-2">
                <span className="font-medium">{history.query}</span>
                <span className="text-gray-500"> at {formatDateTime(history.timestamp)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No search history available.</p>
        )}
      </div>
    </div>
  );
};
