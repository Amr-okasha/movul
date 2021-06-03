import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import { NavLink, Redirect } from "react-router-dom";
import auth from "../services/authService";

class LogIn extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: { username: "", password: "" },
      error: {},
    };
  }

  schema = {
    username: joi.string().min(10).required().label("Username"),
    password: joi.string().min(4).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { username: email, password } = this.state.data;

      await auth.login(email, password);
      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.errors };
        error.username = ex.response.data;
        this.setState({
          error,
        });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
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
