import React from "react";
// import _ from "lodash";

const PaginationComponent = (props) => {
  const { itemCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);
  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = [...Array(pagesCount).keys()];
  // const _pagesArray = _.range(1, itemCount / pageSize + 1);

  return (
    <div>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li
            className={
              page + 1 === currentPage ? "page-item active" : "page-item"
            }
            key={page}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PaginationComponent;
