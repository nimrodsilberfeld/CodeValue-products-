import React from "react";
import MyButton from "./MyButton";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onNext: (totalPages: number) => void;
  onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onNext,
  onPrev,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <MyButton onClick={onPrev} disabled={currentPage === 1} text="Prev" />
      <span>
        {currentPage} of {totalPages}
      </span>
      <MyButton
        onClick={() => onNext(totalPages)}
        disabled={currentPage === totalPages}
        text="Next"
      />
    </div>
  );
};

export default Pagination;
