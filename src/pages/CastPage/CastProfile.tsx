import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { castApi } from '@/lib/api/castApi'; // Assuming the API function is imported here
import { Cast } from '@/types/CastType';
import { Movie } from '@/types/MovieType';

const CastProfile: React.FC = () => {
  const { castId } = useParams<{ castId: string }>();
  const [cast, setCast] = useState<Cast | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCastDetails = async (castId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await castApi.getCastById(castId);
      setCast(response.data.result);
    } catch (err) {
      setError('Error fetching cast details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (castId) {
      fetchCastDetails(castId);
    }
  }, [castId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!cast) {
    return <div>Cast not found</div>;
  }
  type credits{
    cast: Movie[];
    crew: Movie[];
  }
  const {
    adult,
    biography,
    deathday,
    gender,
    homepage,
    name,
    popularity,
    profile_path,
    birthday,
    tmdb_id,
    known_for_department,
    movie_credits,
  } = cast;


  const genderString = gender === 1 ? 'Male' : gender === 2 ? 'Female' : 'Unknown';
  const castList = movie_credits.cast;
  const crewList = movie_credits.crew;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      {/* Top Section */}
      <div className="flex">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : '/path/to/default-profile.jpg'}
            alt={name}
            className="w-80 h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section */}
        <div className="ml-6 flex flex-col flex-grow">
          <h2 className="text-4xl font-bold text-gray-800">{name}</h2>
          <p className="text-lg text-gray-600 mt-2">Known For: {known_for_department || 'N/A'}</p>

          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
            <div>
              <p><strong>TMDB ID:</strong> {tmdb_id}</p>
              <p><strong>Adult:</strong> {adult ? 'Yes' : 'No'}</p>
              <p><strong>Gender:</strong> {genderString}</p>
              <p><strong>Birthday:</strong> {birthday || 'Unknown'}</p>
              {deathday && <p><strong>Deathday:</strong> {deathday}</p>}
            </div>
            <div>
              <p><strong>Popularity:</strong> {popularity}</p>
              <p><strong>Known For:</strong> {known_for_department}</p>
              {homepage && (
                <p>
                  <strong>Homepage:</strong>{' '}
                  <a href={homepage} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    Visit
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Biography</h3>
        <p className="text-gray-700 mt-2">{biography || 'No biography available.'}</p>
      </div>

      {/* Movies Cast Section */}
      {castList.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Cast Credits</h3>
          <div className="mt-4 space-y-4">
            {castList.map((movie) => (
              <div key={movie.credit_id} className="flex items-center bg-white p-4 rounded-lg shadow">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/path/to/default-poster.jpg'}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{movie.title}</h4>
                  <p className="text-gray-600">Character: {movie.character || 'N/A'}</p>
                  <p className="text-gray-600">Release Date: {movie.release_date || 'N/A'}</p>
                  <p className="text-gray-600">Overview: {movie.overview || 'No overview available.'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Movies Crew Section */}
      {crewList.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800">Crew Credits</h3>
          <div className="mt-4 space-y-4">
            {crewList.map((movie) => (
              <div key={movie.credit_id} className="flex items-center bg-white p-4 rounded-lg shadow">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/path/to/default-poster.jpg'}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{movie.title}</h4>
                  <p className="text-gray-600">Job: {movie.job}</p>
                  <p className="text-gray-600">Release Date: {movie.release_date || 'N/A'}</p>
                  <p className="text-gray-600">Overview: {movie.overview || 'No overview available.'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CastProfile;
