import React, { Component } from "react";

class LogIn extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    console.log("submitted");
  };
  render() {
    return (
      <div className="mb-3">
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <ul className=" noBu">
            <li className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
            </li>
            <li className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="name@example.com"
              />
            </li>
            <li className="mb-3">
              <button type="submit" class="btn btn-primary">
                Sign in
              </button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default LogIn;
