import React, { Component } from "react";
import DisplayProducts from "../component/DisplayProduct";
import { getProducts, deleteProduct } from "../data";
import Pagination from "../component/Pagination";
import Paginate from "../component/paginate";
import { get_type } from "../data1";
import TypetList from "./typeList";
import _ from "lodash";
import Button from "../component/Button";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: getProducts(),
      type: [{ name: "All Products" }, ...get_type()],
      itemsPerPage: 4,
      currentPage: 0,
      selected: null,
      sortColumn: { path: "price", order: "asc" },
    };
  }
  handleClick = (currentPage) => {
    this.setState({ currentPage });
  };
  handleChange = (type) => {
    console.log(type);
    const selected = type;
    console.log(selected);
    this.setState({ selected, currentPage: 0 });
  };
  handleBack = () => {
    this.setState({
      selected: null,
    });
  };
  handleDelete = (prod) => {
    let products = this.state.products;
    const deleted = products.filter((p) => p._id !== prod._id);
    this.setState({ products: deleted });
  };
  handleOrder = (path) => {
    const sortColumn = this.state.sortColumn;
    console.log(path, "path");
    console.log(sortColumn.path, "sortcolumn.path");
    if (path === sortColumn.path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
    }

    this.setState({ sortColumn });
  };
  render() {
    const { products, itemsPerPage, currentPage, type, selected, sortColumn } =
      this.state;

    let filtered =
      selected && selected !== "All Products"
        ? products.filter((p) => p.type.name === selected)
        : products;
    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const paginate = Paginate(ordered, itemsPerPage, currentPage);

    return (
      <>
        <div className="main">
          {!filtered.length ? (
            <>
              <Button
                type="back-home"
                name="Back to home"
                onClick={this.handleBack}
                ele={null}
              />
              <div className="non-product">There is no products</div>
            </>
          ) : (
            <>
              <TypetList
                onClick={this.handleChange}
                type={type}
                selected={selected}
              />
              <div className="products list">
                <DisplayProducts
                  products={paginate}
                  onClick={this.handleDelete}
                  onOrder={this.handleOrder}
                  sortColumn={this.state.sortColumn}
                />
              </div>
            </>
          )}
        </div>

        <Pagination
          products={filtered}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onClick={this.handleClick}
        />
      </>
    );
  }
}

export default HomeScreen;
