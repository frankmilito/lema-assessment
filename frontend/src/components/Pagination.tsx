import Button from "./Button";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (val: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-3 py-1 rounded-md ${
              currentPage === i
                ? "bg-purple-100 text-purple-600"
                : "text-gray-600"
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 4) ||
        (i === currentPage + 2 && currentPage < totalPages - 3)
      ) {
        pageNumbers.push(
          <span key={i} className="px-3 py-1 text-gray-400">
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-end space-x-2 mt-4">
      <Button
        label="&larr; Previous"
        onClick={() => onPageChange(currentPage - 1)}
        className="text-gray-600 hover:text-gray-800"
        disabled={currentPage === 1}
      />

      {renderPageNumbers()}
      <Button
        label="Next &rarr;"
        onClick={() => onPageChange(currentPage + 1)}
        className="text-gray-600 hover:text-gray-800"
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
