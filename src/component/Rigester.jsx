import React from "react";
import joi from "joi-browser";
import Form from "./common/form";
import { NavLink } from "react-router-dom";

class Register extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        username: "",
        password: "",
        firstname: "",
        lastname: "",
      },
      error: {},
    };
  }

  schema = {
    username: joi.string().required().min(20).max(30).label("Username"),
    password: joi.string().required().min(20).max(30).label("Password"),
    firstname: joi.string().required().min(2).max(10).label("First name"),
    lastname: joi.string().required().min(2).max(10).label("Last name"),
  };

  doHandleSubmit = () => {};

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
            {this.renderInputField("firstname", "text", "First name", "ahmed")}
            {this.renderInputField("lastname", "text", "Last name", "omar")}
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
