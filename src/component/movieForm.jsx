import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import { NavLink } from "react-router-dom";
import Movies from "./movies";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Register extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: "",
        genre: "",
        numberInStock: "",
        dailyRentalRate: "",
      },
      genres: [],
      error: {},
    };
  }

  schema = {
    title: joi.string().required().min(4).label("Title"),
    genre: joi.string().required().label("Genre"),
    numberInStock: joi.number().required().min(0).label("Number In Stock"),
    dailyRentalRate: joi.number().required().min(0).max(10).label("Rate"),
  };

  doSubmit = () => {
    const data = { ...this.state.data };
    saveMovie(data);
    // addNewMovie(data);
    this.props.history.push("/movies");
  };

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({
      genres,
    });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.push("/not-found");

    this.setState({
      data: {
        title: movie.title,
        genre: genres._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      },
    });
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h4>Movie Form</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            {this.renderInputField("title", "text", "Title", "Transformers")}

            <div>
              <div>
                <label htmlFor="select">Select Genre</label>
              </div>
              <select
                id="select"
                className="form-label"
                onChange={this.handleChange}
                value={this.state.data.genre}
                name="genre"
              >
                {genres.map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            {this.renderInputField(
              "numberInStock",
              "text",
              "NumberInStock",
              "1"
            )}
            {this.renderInputField("dailyRentalRate", "text", "Rate", "0-10")}
            {this.renderFormButton("save")}
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
