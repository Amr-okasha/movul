import React, { Component } from "react";

class DisplayProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { ele } = this.props;

    return (
      <div
        className="
           product 
           col-xl-12
           col-md-4
           col-lg-3
           col-xl-2
           bg-light 
           g-2
            "
      >
        <div>{ele.image}</div>
        <div>
          <h4>
            Product Name : <span className="badge bg-primary">{ele.name}</span>
          </h4>
          <p>
            Price : <span> {ele.price}</span>
          </p>
          <p>
            Reviews : <span> {ele.reviewNumber}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default DisplayProduct;
