import type { PaginationProps } from "@/types/interfaces";
import React, { memo } from "react";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };
  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="flex gap-1 flex-wrap">
        <button
          className="hover:opacity-55 mr-1 dark:bg-blue-400/30 bg-amber-950/50 rounded-full w-7 h-7 pb-1 pr-0.5 flex items-center justify-center transition"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {...Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              onClick={() => handlePageClick(page)}
              className={`text-md w-7 h-7 rounded-full transition ${
                page === currentPage
                  ? "dark:bg-blue-300/40 bg-amber-950/30 border-none"
                  : "hover:bg-gray-200 dark:hover:bg-blue-300/25 text-gray-500"
              }`}
              key={index}
            >
              {page}
            </button>
          );
        })}

        <button
          className="hover:opacity-55 ml-1 dark:bg-blue-400/30 bg-amber-950/50 rounded-full w-7 h-7 pb-1 pl-0.5 flex items-center justify-center transition"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>

      <div className="text-md dark:text-gray-100/50">Всего: {totalItems} объявлений</div>
    </div>
  );
};

export default memo(Pagination);
