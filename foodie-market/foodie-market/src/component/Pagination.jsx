import React, { Component } from "react";

class Pagination extends Component {
  state = {};
  render() {
    const back = { backgroundColor: "red" };
    const { products, currentPage, itemsPerPage, onClick } = this.props;
    const productsNum = products.length;
    const pages = productsNum / itemsPerPage;
    const ArrayPagesNum = [...Array(Math.ceil(pages)).keys()];

    return (
      <div className="pagination">
        <ul>
          {ArrayPagesNum.length <= 1 ? (
            <div></div>
          ) : (
            ArrayPagesNum.map((ele) => {
              return (
                <li
                  key={ele}
                  className={currentPage === ele ? "active" : ""}
                  onClick={() => onClick(ele)}
                >
                  {ele + 1}
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}

export default Pagination;
// style={back}
