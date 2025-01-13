import React from "react";

interface RenderPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const RenderPagination: React.FC<RenderPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const totalDisplayPages = 5; // Max number of visible pages
    const pages: (number | string)[] = [];

    if (totalPages <= totalDisplayPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1); // Always show the first page

      if (startPage > 2) pages.push("..."); // Ellipsis before startPage

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) pages.push("..."); // Ellipsis after endPage

      pages.push(totalPages); // Always show the last page
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center gap-2 mt-4">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded-full ${
            page === currentPage ? "bg-appPrimary text-white" : "bg-gray5"
          } ${page === "..." ? "cursor-default" : ""}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
