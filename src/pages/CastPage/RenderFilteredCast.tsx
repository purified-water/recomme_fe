import { castApi } from "@/lib/api/castApi";
import { Cast } from "@/types/CastType";
import { useEffect, useState } from "react";
import { CastCard } from "./CastCard";
import { RenderPagination } from "@/features/Search/components/RenderPagination";

interface RenderFilteredCastProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const RenderFilteredCast = ({ currentPage, onPageChange }: RenderFilteredCastProps) => {
  const [cast, setCast] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCast = async () => {
    setIsLoading(true);
    try {
      const response = await castApi.getAllCast(currentPage);
      const data = response.data.result;
      setCast(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching cast:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCast();
  }, [currentPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-y-4 gap-x-6">
        {cast.map((castMember, index) => (
          <CastCard cast={castMember} key={index} />
        ))}
      </div>
      <div className="mt-4">
        <RenderPagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  );
};
