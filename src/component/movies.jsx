import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeComponent from "./common/LikeComponent";
import PaginationComponent from "./common/PaginationComponet";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import Table from "./common/moviesTable";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      genre: [],
      pageSize: 4,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" },
    };
  }

  deleteHandler = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });
  };
  likeHandler = (movie) => {
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

  selectListHandler = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  sortHandler = (sortColumn) => {
    this.setState({ sortColumn });
  };

  componentDidMount = () => {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genre: genres,
    });
  };

  getData = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: allMovies,

      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { filtered: filtered, movies: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies, genre } = this.state;

    const { filtered, movies } = this.getData();

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
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genre}
              selectedGenre={this.state.selectedGenre}
              onSelectItem={this.selectListHandler}
            />
          </div>
          <div className="col">
            <p>
              Showing{" "}
              <span className={this.handleCountstyles()}>
                {filtered.length}
              </span>{" "}
              movies in the database
            </p>
            <Table
              onHandleDelete={this.deleteHandler}
              onHandleLike={this.likeHandler}
              movies={movies}
              onSort={this.sortHandler}
              sortColumn={this.state.sortColumn}
            />
          </div>
        </div>
        <PaginationComponent
          itemCount={filtered.length}
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
