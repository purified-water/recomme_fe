import { GenreType } from "@/types/GenreType";

export interface FiltersType {
  releaseDates: { from: string; to: string };
  genres: GenreType[];
  userScore: [number, number];
}
