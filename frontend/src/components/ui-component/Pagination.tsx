import React from "react";

const Pagination = ({
  coursesPerPage,
  totalCourses,
  paginate,
  currentPage,
}: {
  coursesPerPage: number;
  totalCourses: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  // Adjust start and end page if there are less than three pages between them
  if (endPage - startPage < 2) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, startPage + 2);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, endPage - 2);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation" className="text-center mt-3 mb-10">
      <ul className="inline-flex -space-x-px text-base h-10">
        <li>
          <a
            onClick={() => paginate(currentPage - 1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-r-0 border-gray-300 ${
              currentPage === 1 ? "pointer-events-none" : ""
            }`}
          >
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border ${
                currentPage === number
                  ? "bg-blue-200"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <a
            onClick={() => paginate(currentPage + 1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-l-0 border-gray-300 ${
              currentPage === totalPages ? "pointer-events-none" : ""
            }`}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
