import React, { Component } from "react";

const Input = ({ onChange, value, type, name, label, placeholder, error }) => {
  return (
    <li className="mb-3">
      <label htmlFor={type} className="form-label">
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        name={name}
        autoFocus
        // ref={this.username}
        type={type}
        className="form-control"
        id={type}
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </li>
  );
};

export default Input;
