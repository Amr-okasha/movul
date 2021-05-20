import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import { NavLink, Redirect } from "react-router-dom";
import { register } from "../services/userService";
import auth from "../services/authService";

class Register extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        username: "",
        password: "",
        name: "",
      },
      error: {},
    };
  }

  schema = {
    username: joi.string().required().min(20).max(30).label("Username"),
    password: joi.string().required().min(4).max(20).label("Password"),
    name: joi.string().required().min(2).max(10).label("First name"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      const jwt = response.headers["x-auth-token"];
      auth.loginWithJWT(jwt);

      window.location = "/";
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            {this.renderInputField(
              "username",
              "email",
              "Email Adderss",
              "asd@example.com"
            )}
            {this.renderInputField(
              "password",
              "password",
              "Password",
              "15678sdsdsdsds"
            )}
            {this.renderInputField("name", "text", "name", "ahmed")}

            <div>
              <h5> Have email address ? </h5>
              <NavLink to="/log-in">back to log-in page</NavLink>
            </div>
            {this.renderFormButton("Register")}
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
