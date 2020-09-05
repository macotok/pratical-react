import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
  const { postsPerPage, totalPosts, paginate, currentPage } = props;
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);

  const PrevPage = () => (
    <li className="page-item">
      <a
        href="#"
        onClick={() => paginate(currentPage - 1)}
        className="page-link"
      >
        前へ
      </a>
    </li>
  );

  const NextPage = () => (
    <li className="page-item">
      <a
        href="#"
        onClick={() => paginate(currentPage + 1)}
        className="page-link"
      >
        次へ
      </a>
    </li>
  );

  const isCurentPage = (pageNumber) =>
    pageNumber === currentPage ? 'active' : null;

  return (
    <>
      <nav>
        <ul className="pagination">
          {currentPage !== 1 ? <PrevPage /> : null}
          {_.range(1, pageNumbers + 1).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${isCurentPage(pageNumber)}`}
            >
              <a
                href="#"
                onClick={() => paginate(pageNumber)}
                className="page-link"
              >
                {pageNumber}
              </a>
            </li>
          ))}
          {currentPage !== pageNumbers ? <NextPage /> : null}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
