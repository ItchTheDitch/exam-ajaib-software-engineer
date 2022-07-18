import React, { useEffect, useState, useMemo } from 'react';

const PaginationComponent = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      const className =
        i === currentPage
          ? 'py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
          : 'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
      // pages.push(
      //   <Pagination.Item
      //     key={i}
      //     active={i === currentPage}
      //     onClick={() => onPageChange(i)}>
      //     {i}
      //   </Pagination.Item>
      // );
      pages.push(
        <li>
          <a key={i} onClick={() => onPageChange(i)} className={className}>
            {i}
          </a>
        </li>
      );
    }

    return pages;
  }, [totalPages, currentPage]);

  if (totalPages === 0) return null;

  // return (
  //   <Pagination>
  //     <Pagination.Prev
  //       onClick={() => onPageChange(currentPage - 1)}
  //       disabled={currentPage === 1}
  //     />
  //     {paginationItems}
  //     <Pagination.Next
  //       onClick={() => onPageChange(currentPage + 1)}
  //       disabled={currentPage === totalPages}
  //     />
  //   </Pagination>
  // );
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px">
        <li>
          <a
            onClick={() => onPageChange(currentPage - 1)}
            className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Previous
          </a>
        </li>
        {paginationItems}
        <li>
          <a
            onClick={() => onPageChange(currentPage + 1)}
            className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
