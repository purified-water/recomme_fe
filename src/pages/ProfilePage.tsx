import { useEffect, useState } from 'react';
import { profileAPI } from '@/lib/api/profileApi';
import { UserProfile } from '@/types/UserProfileType';

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert("User not found");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await profileAPI.getProfile(userId);
        const data: UserProfile = await response.data;
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Profile Page</h1>
        <div className="space-y-3">
          <p className="text-gray-700">
            <strong className="font-semibold">Username:</strong> {profile.displayName || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong className="font-semibold">UID:</strong> {profile.uid || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong className="font-semibold">Email:</strong> {profile.email || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong className="font-semibold">Phone:</strong> {profile.phoneNumber || "N/A"}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Search History</h2>
          <ul className="pl-5 text-gray-700 list-disc">
            {/* Uncomment and replace with actual search history data */}
            {/* {profile.searchHistory.map((history, index) => (
              <li key={index}>{history}</li>
            ))} */}
            <li>No search history available.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};