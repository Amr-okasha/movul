import React, { Component } from "react";
import Button from "./Button";

class DisplayProducts extends Component {
  column = [
    { path: "image", content: (ele, c) => <div>{ele[c.path]}</div> },
    { path: "name", label: "Product Name :" },
    { path: "price", label: "Price : " },
    { path: "reviewNumber", label: "Review Number :" },
    {
      id: "delete",
      content: (ele) => (
        <Button
          onClick={this.props.onClick}
          ele={ele}
          type="delete"
          name="Delete"
        />
      ),
    },
  ];

  constructor(props) {
    super(props);

    this.state = {};
  }
  rendering = (ele, c) => {
    if (c.content) return c.content(ele, c);
    return `${c.label}${ele[c.path]}`;
  };

  render() {
    const { products, onOrder } = this.props;

    return products.map((ele) => {
      return (
        <div key={ele[ele]} className="sproduct">
          {this.column.map((c) => (
            <div
              key={ele + c.path}
              className="column"
              onClick={() => onOrder(c.path)}
            >
              {this.rendering(ele, c)}
            </div>
          ))}
        </div>
      );
    });
  }
}

export default DisplayProducts;
