import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className='pageink'>
        {pageNumbers.map(number => (
          <div key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='liink'>
              {number}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;