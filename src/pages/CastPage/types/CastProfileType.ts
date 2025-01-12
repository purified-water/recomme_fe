export interface Cast {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO format date as string
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string; // Role of the cast member
  credit_id: string; // Unique credit identifier
  order: number; // Order in cast listing
}
export interface Crew {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO format date as string
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string; // Unique credit identifier
  department: string; // Department the crew member belongs to
  job: string; // Job role in the movie production
}

export interface CastProfileType {
  adult: boolean;
  biography: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  known_for_department: string;
  movie_credits: {
    cast: Cast[];
    crew: Crew[];
  };
  name: string;
  popularity: number;
  profile_path: string;
  tmdb_id: number;
  birthday: string; // ISO format date as string
}
