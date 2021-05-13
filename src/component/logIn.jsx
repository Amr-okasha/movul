import React, { Component } from "react";
import Input from "./common/input";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acount: { username: "", password: "" },
      error: {},
    };
  }
  validatePrperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "user name is required";
    }
    if (name === "password") {
      if (value.trim() === "") return "password is required";
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const acount = { ...this.state.acount };
    const error = { ...this.state.error };
    const errorMessage = this.validatePrperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
    acount[input.name] = input.value;
    this.setState({
      acount,
      error,
    });
  };

  validate = () => {
    const error = {};
    const { acount } = this.state;
    if (acount.username.trim() === "") error.username = "username is required";
    if (acount.password.trim() === "") error.password = "password is required";
    return Object.keys(error).length ? error : null;
  };

  // username = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault();
    // const username = this.username.current.value;
    const error = this.validate();
    console.log(error);
    this.setState({
      error: error || {},
    });
  };
  //   componentDidMount = () => {
  //     this.username.current.focus();
  //   };
  render() {
    const { acount } = this.state;
    return (
      <div className="mb-3">
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <ul className=" noBu">
            <Input
              onChange={this.handleChange}
              value={acount.username}
              type="email"
              name="username"
              label="Email Address"
              placeholder="example@gmail.com"
              error={this.state.error.username}
            />
            <Input
              onChange={this.handleChange}
              value={acount.password}
              type="password"
              name="password"
              label="Password"
              placeholder="543366479a"
              error={this.state.error.password}
            />
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
