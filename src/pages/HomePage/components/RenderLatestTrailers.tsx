import { useState, useEffect } from "react";
import { TrailerType } from "@/types/TrailerType";
import { SmallTrailerCard } from "@/components/Trailers/SmallTrailerCard";
import { movieApi } from "@/lib/api/movieApi";

export const RenderLatestTrailers = () => {
  const [trailers, setTrailers] = useState<TrailerType[]>([]);

  const fetchTrailers = async () => {
    try {
      const response = await movieApi.getMovieTrailers();
      setTrailers(response.data.result.results);
    } catch (error) {
      console.error("Error fetching trailers:", error);
    }
  };
  useEffect(() => {
    fetchTrailers();
  }, []); // Re-run if trailerFilter changes

  const RenderTrailers = () => {
    return trailers.map((trailer, index) => <SmallTrailerCard key={index} trailer={trailer} />);
  };

  return (
    <>
      <RenderTrailers />
    </>
  );
};
