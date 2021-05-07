import React, { Component } from "react";
import LikeComponent from "./LikeComponent";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  render() {
    const { items, columns } = this.props;
    return (
      <tbody>
        {items.map((item) => {
          return (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={item._id + (column.path || column.key)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;

{
  /* <td>{item.title}</td>
<td>{item.genre.name}</td>
<td>{item.numberInStock}</td>
<td>{item.dailyRentalRate}</td> */
}
{
  /* <td>
  <LikeComponent
    item={item}
    liked={item.liked}
    onClick={() => onHandleLike(item)}
  />
</td>
<td>
  <button
    onClick={() => onHandleDelete(item)}
    className="btn btn-danger btn-sm"
  >
    Delete
  </button>
</td> */
}
