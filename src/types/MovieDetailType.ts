export type CastInMovieDetail = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type CrewInMovieDetail = {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
};

export type MovieDetailType = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: string | null;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  id: number;
  imdb_id: string | null;
  credits: {
    cast: CastInMovieDetail[];
    crew: CrewInMovieDetail[];
  };
  original_language: string;
  original_title: string;
  overview: string;
  homepage: string | null;
  popularity: number; // Defaults to 0
  poster_path: string | null;
  production_companies: Array<{
    id: number; // Defaults to 0
    logo_path: string | null;
    name: string;
  }>; // Array of production companies
  origin_country: string[];
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>; // Array of production countries
  release_date: string;
  revenue: number; // Defaults to 0
  runtime: number; // Defaults to 0
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>; // Array of spoken languages
  genre_ids: number[];
  status: string;
  tagline: string;
  title: string;
  video: boolean; // Defaults to true
  vote_average: string; // Defaults to 0
  vote_count: number; // Defaults to 0
};
