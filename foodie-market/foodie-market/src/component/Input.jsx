import React from "react";

const Input = ({ Fname, name, clas, onChange, value, message, errMessage }) => {
  return (
    <li>
      <label htmlFor={name}>{Fname} :</label>
      <div className={clas}>
        <input
          type={name}
          name={name}
          value={value}
          id={name}
          onChange={(e) => onChange(e)}
        />
        <div className={message}>{errMessage} </div>
      </div>
    </li>
  );
};

export default Input;
