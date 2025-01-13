export type MoviesFilterRequestType = {
  genreIds: string[] | null;
  objectIds: string[] | null;
  fromDate: string | null;
  toDate: string | null;
  fromScore: number | null;
  toScore: number | null;
  pageSize: number;
  page: number;
};