import React, { Component } from "react";
import Input from "./Input";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { email: "", password: "" },
      errors: {},
    };
  }
  validateProperty = (input) => {
    if (input.name === "email") {
      if (input.value === "") return "This field cant be empty";
      if (input.value.length < 5) return "please enter valid email";
    }
    if (input.name === "password") {
      if (input.value === "") return "This field cant be empty";
      if (input.value.length < 5) return "please enter valid password";
    }
  };
  handleInput = ({ target: input }) => {
    const data = this.state.data;
    const errors = this.state.errors;
    const errMessage = this.validateProperty(input);
    errors[input.name] = errMessage;
    data[input.name] = input.value;
    this.setState({
      data,
      errors,
    });
  };
  validate = () => {
    const errors = {};
    const { data } = this.state;
    if (data.email.trim() === "") errors.email = "email shoudnt be empty";
    if (data.password.trim() === "")
      errors.password = "password shoudnt be empty";
    return Object.keys(errors).length ? errors : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("save data");
    const errors = this.validate();
    this.setState({
      errors,
    });
  };
  render() {
    const { email, password } = this.state.data;
    return (
      <div className="form">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <Input
            name="email"
            clas="input"
            onChange={this.handleInput}
            value={email}
            message="errInputMessage"
            Fname="Email"
            errMessage={this.state.errors.email}
          />
          <Input
            name="password"
            clas="input"
            onChange={this.handleInput}
            value={password}
            message="errInputMessage"
            Fname="password"
            errMessage={this.state.errors.password}
          />

          <li>
            <button type="submit" className="submit">
              Submite
            </button>
          </li>
        </form>
      </div>
    );
  }
}

export default SignIn;
