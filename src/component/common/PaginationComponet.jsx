import React from "react";
import propTypes from "prop-types";

const PaginationComponent = (props) => {
  const { itemCount, pageSize, onPageChange, currentPage } = props;
  console.log(currentPage);
  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = [...Array(pagesCount).keys()];

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
PaginationComponent.propTypes = {
  itemCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
};
export default PaginationComponent;
