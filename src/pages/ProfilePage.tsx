import { useEffect, useState } from "react";
import { userAPI } from "@/lib/api/userApi";
import { UserProfile } from "@/types/UserProfileType";
import default_profile from "@/assets/default_profile.jpg";
import { useUserStore } from "@/stores/userStore";

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const displayName = useUserStore((state) => state.displayName);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      alert("User not found");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile(userId);
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
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full h-48 p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-appPrimary">
        <div className="flex items-center">
          <img src={profile.photoUrl || default_profile} alt="Profile" className="w-32 h-32 ml-4 mr-6 rounded-full" />
          <div>
            <p className="text-white">
              <div className="text-3xl font-semibold">{profile.displayName || "N/A"}</div>
            </p>
            <p className="text-white">
              <strong className="font-semibold">UID:</strong> {profile.uid || "N/A"}
            </p>
            <div className="text-base text-white">{profile.email || "N/A"}</div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">Search History</h2>
        <ul className="pl-5 list-disc text-gray3">
          {/* Uncomment and replace with actual search history data */}
          {/* {profile.searchHistory.map((history, index) => (
              <li key={index}>{history}</li>
            ))} */}
          <li>No search history available.</li>
        </ul>
      </div>
    </div>
  );
};
