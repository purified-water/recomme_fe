import { castApi } from "@/lib/api/castApi";
import { Cast } from "@/types/CastType";
import { useEffect, useState } from "react";
import { CastCard } from "./CastCard";

export const RenderFilteredCast = () => {
  const [cast, setCast] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCast = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await castApi.getAllCast(1); // Fetch cast data from API
      const data = response.data.result.results; // Expecting the response to match TmdbCastListResponse
      setCast(data); // Set the fetched cast list to state
    } catch (error) {
      console.error("Error fetching cast:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchCast();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-y-4 gap-x-6">
      {cast.map((castMember, index) => (
        <CastCard cast={castMember} key={index} />
      ))}
    </div>
  );
};
