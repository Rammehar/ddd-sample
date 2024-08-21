"use client";

// Simplified Pagination Component
type PagginationComponentProps = {
  currentPage: number;
  total: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
};

const ClientPagginationComponent: React.FC<PagginationComponentProps> = ({
  currentPage,
  total,
  pageCount,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <button
        style={{ marginRight: 4 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <button
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
export default ClientPagginationComponent;
