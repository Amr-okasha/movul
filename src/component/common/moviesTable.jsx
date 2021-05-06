import React from "react";
import LikeComponent from "./LikeComponent";

const styles = { cursor: "pointer" };

const Table = ({ movies, onHandleLike, onHandleDelete, onSort }) => {
  return (
    <table className="table ">
      <thead>
        <tr>
          <th style={styles} onClick={() => onSort("title")}>
            Tittle
          </th>
          <th style={styles} onClick={() => onSort("genre.name")}>
            Genre
          </th>
          <th style={styles} onClick={() => onSort("numberInStock")}>
            Stock
          </th>
          <th style={styles} onClick={() => onSort("dailyRentalRate")}>
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
};

export default Table;
