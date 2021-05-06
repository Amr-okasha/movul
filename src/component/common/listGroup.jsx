import React from "react";

const ListGroup = (props) => {
  const {
    items,
    selectedGenre,
    onSelectItem,
    valueProperty,
    textProperty,
  } = props;

  return (
    <ul className="list-group">
      <li className="list-group-item " aria-current="true">
        All Genres
      </li>

      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onSelectItem(item)}
          style={{ cursor: "pointer" }}
          className={
            item === selectedGenre
              ? "list-group-item active "
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
//this instead of get it as props from parent
ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};
export default ListGroup;
