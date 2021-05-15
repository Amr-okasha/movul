import React, { Component } from "react";

const Select = ({ optionsData, name, onChange, value }) => {
  return (
    <div>
      <div>
        <label htmlFor="select">Select Genre</label>
      </div>
      <select name="" id="select" className="badge " onChange={onChange}>
        <option value=""></option>
        {optionsData.map((opt) => (
          <option key={opt[name]} value={value}>
            {opt[name]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
