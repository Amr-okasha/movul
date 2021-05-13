import React, { Component } from "react";
import Input from "./common/input";
import joi from "joi-browser";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acount: { username: "", password: "" },
      error: {},
    };
  }

  validatePrperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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
  schema = {
    username: joi.string().min(10).max(20).required().label("Username"),
    password: joi.string().min(10).max(20).required().label("Password"),
  };
  validate = () => {
    const result = joi.validate(this.state.acount, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const error = {};
    for (let item of result.error.details) error[item.path[0]] = item.message;
    return error;
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
              <button
                disabled={this.validate()}
                type="submit"
                className="btn btn-primary"
              >
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
