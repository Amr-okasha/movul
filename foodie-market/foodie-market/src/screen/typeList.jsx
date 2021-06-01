import React, { Component } from "react";

class TypetList extends Component {
  state = {};
  render() {
    const { type, onClick, selected } = this.props;
    return (
      <div className=" list">
        {type.map((t) => (
          <li
            className={selected === t.name ? "active" : ""}
            onClick={() => onClick(t.name)}
            key={t._id}
          >
            {t.name}
          </li>
        ))}
      </div>
    );
  }
}

export default TypetList;
