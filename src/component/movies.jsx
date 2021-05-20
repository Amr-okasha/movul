import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import PaginationComponent from "./common/PaginationComponet";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/GereService";
import Table from "./common/moviesTable";
import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      genre: [],
      pageSize: 4,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" },
      searchQuery: "",
      selectedGenre: null,
    };
  }

  deleteHandler = async (movie) => {
    const useOriginalMovies = this.state.movies;
    console.log(movie, "movie");
    const movies = useOriginalMovies.filter((m) => m._id !== movie._id);
    this.setState({
      movies,
    });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      else {
        toast.error("Un Expected Error");
        this.setState({
          movies: useOriginalMovies,
        });
      }
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  sortHandler = (sortColumn) => {
    this.setState({ sortColumn });
  };

  componentDidMount = async () => {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ name: "All Genres", _id: "" }, ...data];
    this.setState({
      movies,
      genre: genres,
    });
  };
  // addNewMovie = (data) => {
  //   this.setState({ ...this.state.movies, data });
  // };
  getData = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: allMovies,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { filtered: filtered, movies: movies };
  };
  handleQueryChange = (searchQuery) => {
    this.setState({ searchQuery, currentPage: 1, selectedGenre: null });
  };
  handleButton = () => {
    this.props.history.push("/movies/new");
  };
  saveMovie = (data) => {
    this.setState({ movies: [...this.state.movies, ...data] });
  };
  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies, genre } = this.state;
    const { user } = this.props;
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
            {user && (
              <button
                onClick={this.handleButton}
                className="btn btn-primary mb-3"
              >
                New movie
              </button>
            )}
            <p>
              Showing{" "}
              <span className={this.handleCountstyles()}>
                {filtered.length}
              </span>{" "}
              movies in the database
            </p>
            <div>
              <input
                type="text"
                name="query"
                className="form-control"
                placeholder="search ...."
                value={this.state.searchQuery}
                onChange={(e) => this.handleQueryChange(e.target.value)}
              />
            </div>
            <Table
              onHandleDelete={this.deleteHandler}
              onHandleLike={this.likeHandler}
              movies={movies}
              onSort={this.sortHandler}
              sortColumn={this.state.sortColumn}
              user={user}
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
