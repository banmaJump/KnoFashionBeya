import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, handlePageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map(page => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
