import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
  const { postsPerPage, totalPosts, paginate } = props;
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);

  return (
    <nav>
      <ul className="pagination">
        {_.range(1, pageNumbers + 1).map((pageNumber) => (
          <li key={pageNumber} className="page-item">
            <a
              href="#"
              onClick={() => paginate(pageNumber)}
              className="page-link"
            >
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
