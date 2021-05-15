import React from "react";

const Input = ({ type, label, error, ...rest }) => {
  return (
    <div className="mb-3 nobu">
      <label htmlFor={type} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        // onChange={onChange}
        // placeholder={placeholder}
        // value={value}
        // name={name}
        type={type}
        autoFocus
        className="form-control"
        id={type}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
