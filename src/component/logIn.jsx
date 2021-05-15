import React from "react";

import joi from "joi-browser";
import Form from "./common/form";
import { NavLink } from "react-router-dom";

class LogIn extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: { username: "", password: "" },
      error: {},
    };
  }

  schema = {
    username: joi.string().min(10).max(20).required().label("Username"),
    password: joi.string().min(10).max(20).required().label("Password"),
  };

  doSubmit = () => {};

  render() {
    return (
      <div className="mb-3">
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <ul className=" noBu">
            {this.renderInputField(
              "username",
              "email",
              "Email Adderss",
              "example@gmail.com"
            )}
            {this.renderInputField("password", "password", "Password", "12345")}
            <div>
              <h5> Have email address : </h5>
              <NavLink to="/register">back to register page</NavLink>
            </div>
            <li className="mb-3">{this.renderFormButton("Login")}</li>
          </ul>
        </form>
      </div>
    );
  }
}

export default LogIn;
