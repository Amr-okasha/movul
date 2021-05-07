import React, { Component } from "react";
import LikeComponent from "./LikeComponent";

const styles = { cursor: "pointer" };

class Table extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { movies, onHandleLike, onHandleDelete } = this.props;
    return (
      <table className="table ">
        <thead>
          <tr>
            <th style={styles} onClick={() => this.raiseSort("title")}>
              Tittle
            </th>
            <th style={styles} onClick={() => this.raiseSort("genre.name")}>
              Genre
            </th>
            <th style={styles} onClick={() => this.raiseSort("numberInStock")}>
              Stock
            </th>
            <th
              style={styles}
              onClick={() => this.raiseSort("dailyRentalRate")}
            >
              Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <LikeComponent
                    movie={movie}
                    liked={movie.liked}
                    onClick={() => onHandleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => onHandleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
