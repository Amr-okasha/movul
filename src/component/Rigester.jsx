import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import { NavLink } from "react-router-dom";
import { register } from "../services/userService";

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
    password: joi.string().required().min(20).max(30).label("Password"),
    name: joi.string().required().min(2).max(10).label("First name"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
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
