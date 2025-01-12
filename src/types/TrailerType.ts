export interface TrailerType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ISO date format as a string
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
