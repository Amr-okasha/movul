import React, { Component } from "react";

const Button = (props) => {
  const { onClick, ele, name, type } = props;
  return (
    <div className={type} onClick={() => onClick(ele)}>
      {name}
    </div>
  );
};

export default Button;
