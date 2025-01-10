// src/components/Cast/CastProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { castApi } from '@/lib/api/castApi';  // Assuming the API function is imported here
import { Cast } from '@/types/CastType';

const CastProfile: React.FC = () => {
  const { castId } = useParams<{ castId: string }>();  // Get the ID from the route params
  const [cast, setCast] = useState<Cast | null>(null);  // State to store cast details
  const [isLoading, setIsLoading] = useState<boolean>(false);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  const fetchCastDetails = async (castId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await castApi.getCastById(castId);  // API call to fetch cast details
      setCast(response.data.result);  // Set cast data to state
    } catch (err) {
      setError('Error fetching cast details');  // Handle error
    } finally {
      setIsLoading(false);  // End loading
    }
  };

  useEffect(() => {
    if (castId) {
      fetchCastDetails(castId);  // Fetch cast details when component mounts or ID changes
    }
  }, [castId]);

  if (isLoading) {
    return <div>Loading...</div>;  // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>;  // Show error message
  }

  if (!cast) {
    return <div>Cast not found</div>;  // Show message if no cast found
  }

  const { biography, deathday, gender, homepage, name, popularity, profile_path, birthday } = cast;

  // Gender mapping (assuming 1 is male, 2 is female)
  const genderString = gender === 1 ? 'Male' : gender === 2 ? 'Female' : 'Unknown';

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <div className="flex items-center space-x-6">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img
            src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : '/path/to/default-profile.jpg'}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">Known For: {cast.known_for_department}</p>
          <p className="text-gray-600">Birthday: {birthday}</p>
          {deathday && <p className="text-gray-600">Died: {deathday}</p>}
          <p className="text-gray-600">Gender: {genderString}</p>
          <p className="text-gray-600">Popularity: {popularity}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Biography</h3>
        <p className="text-gray-600 mt-2">{biography || 'No biography available.'}</p>
      </div>

      {homepage && (
        <div className="mt-4">
          <a href={homepage} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            Visit {name}'s Homepage
          </a>
        </div>
      )}
    </div>
  );
};

export default CastProfile;
