import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import { NavLink } from "react-router-dom";
import Movies from "./movies";
import { getMovie, saveMovie } from "./../services/movieService";
import { getGenres } from "../services/GereService";
import { toast } from "react-toastify";

class Register extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: "",
      },
      genres: [],
      error: {},
    };
  }

  schema = {
    title: joi.string().required().min(4).label("Title"),
    genreId: joi.string().required().label("Genre"),
    numberInStock: joi.number().required().min(0).label("Number In Stock"),
    dailyRentalRate: joi.number().required().min(0).max(10).label("Rate"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    await saveMovie(data);
    // addNewMovie(data);
    this.props.history.push("/movies");
  };

  componentDidMount = async () => {
    const { data: genres } = await getGenres();
    this.setState({
      genres,
    });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({
        data: {
          title: movie.title,
          genreId: movie.genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate,
        },
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.push("/not-found");
    }

    // if (!movie) return this.props.history.push("/not-found");
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
                value={this.state.data.genreId}
                name="genreId"
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
