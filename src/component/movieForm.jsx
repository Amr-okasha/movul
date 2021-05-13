import React, { Component } from "react";

class MovieForm extends Component {
  handleClick = () => {
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <h4>Movie Form:{this.props.match.params.id}</h4>
        <button className="btn btn-primary" onClick={this.handleClick}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
