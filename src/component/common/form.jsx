import { Component } from "react";
import joi from "joi-browser";
import Input from "./input";
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      error: {},
    };
  }

  validatePrperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const result = joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const error = {};
    for (let item of result.error.details) error[item.path[0]] = item.message;
    return error;
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const error = { ...this.state.error };
    const errorMessage = this.validatePrperty(input);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
    data[input.name] = input.value;
    this.setState({
      data,
      error,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();
    console.log(error);
    this.setState({
      error: error || {},
    });

    this.doSubmit();
  };

  renderFormButton = (Label) => {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {Label}
      </button>
    );
  };

  renderInputField = (name, type, label, placeholder) => {
    const { data } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        value={data[name]}
        type={type}
        name={name}
        label={label}
        placeholder={placeholder}
        error={this.state.error[name]}
      />
    );
  };
}

export default Form;
