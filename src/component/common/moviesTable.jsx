import React, { Component } from "react";
import { Link } from "react-router-dom";
import LikeComponent from "./LikeComponent";
import TableD from "./table";

const styles = { cursor: "pointer" };

class Table extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <LikeComponent
          item={movie}
          liked={movie.liked}
          onClick={() => this.props.onHandleLike(movie)}
        ></LikeComponent>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onHandleDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onHandleLike, onHandleDelete, onSort, sortColumn } =
      this.props;
    return (
      <TableD
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        styles={this.styles}
        items={movies}
        onHandleLike={onHandleLike}
        onHandleDelete={onHandleDelete}
      />
    );
  }
}

export default Table;
