import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeComponent from "./common/LikeComponent";
import PaginationComponent from "./common/PaginationComponet";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: getMovies(),
      pageSize: 4,
      currentPage: 1,
    };
  }

  deleteHandler = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    console.log(movies);
    this.setState({
      movies,
    });
  };

  pageChangeHandler = (page) => {
    this.setState({
      currentPage: page + 1,
    });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return count === 0 ? (
      <>
        <p>There are not movies in the data base </p>
        <p>
          Total Number :
          <span className={this.handleCountstyles()}>
            {this.handleCountResult()}
          </span>{" "}
        </p>
      </>
    ) : (
      <>
        <p>
          Showing <span className={this.handleCountstyles()}>{count}</span>{" "}
          movies in the database
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Tittle</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
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
                  <td className="LikeComponent">
                    <LikeComponent
                      movie={movie}
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.deleteHandler(movie)}
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
        <PaginationComponent
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.pageChangeHandler}
        />
      </>
    );
  }
  handleCountResult() {
    const { length: count } = this.state.movies;

    return count === 0 ? "Zero" : count;
  }
  handleCountstyles() {
    const { length: count } = this.state.movies;
    let badge = "badge bg-";
    return (badge += count === 0 ? "warning" : "primary");
  }
}

export default Movies;
