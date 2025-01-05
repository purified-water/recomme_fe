import { useState, useEffect } from "react";
import { TrailerType } from "@/types/TrailerType";
import { SmallTrailerCard } from "@/components/Trailers/SmallTrailerCard";

const MOCK_TRAILERS = [
  {
    title: "Mufasa: The Lion King",
    description: "#1 Movie In America",
    image: "https://via.placeholder.com/400x200"
  },
  {
    title: "Sonic the Hedgehog 3",
    description: "Fasten your seat belts!",
    image: "https://via.placeholder.com/400x200"
  },
  {
    title: "Wicked",
    description: "Watch At Home on December 31",
    image: "https://via.placeholder.com/400x200"
  },
  {
    title: "The Lord of the Rings: The War of the Rohirrim",
    description: "Now Playing only in Theaters",
    image: "https://via.placeholder.com/400x200"
  },
  {
    title: "The Lord of the Rings: The War of the Rohirrim",
    description: "Now Playing only in Theaters",
    image: "https://via.placeholder.com/400x200"
  },
  {
    title: "The Lord of the Rings: The War of the Rohirrim",
    description: "Now Playing only in Theaters",
    image: "https://via.placeholder.com/400x200"
  },
  {
    title: "The Lord of the Rings: The War of the Rohirrim",
    description: "Now Playing only in Theaters",
    image: "https://via.placeholder.com/400x200"
  }
];

interface TrailersProps {
  trailerFilter: string;
}

export const RenderLatestTrailers = ({ trailerFilter }: TrailersProps) => {
  const [trailers, setTrailers] = useState<TrailerType[]>([]);

  useEffect(() => {
    // Set the mock trailers when the component mounts
    setTrailers(MOCK_TRAILERS);

    // Optionally, fetch trailers from the API
    const fetchTrailers = async () => {
      console.log("Fetching trailers...");
      // Uncomment below to fetch data dynamically
      /*
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${trailerFilter}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        const data = await response.json();
        setTrailers(data.results);
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
      */
    };

    fetchTrailers();
  }, [trailerFilter]); // Re-run if trailerFilter changes

  const RenderTrailers = () => {
    return trailers.map((trailer, index) => <SmallTrailerCard key={index} trailer={trailer} />);
  };

  return (
    <>
      <RenderTrailers />
    </>
  );
};
