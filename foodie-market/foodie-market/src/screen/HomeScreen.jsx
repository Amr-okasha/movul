import React, { Component } from "react";
import DisplayProduct from "../component/DisplayProduct";
import { data } from "../data";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foods: data,
    };
  }

  render() {
    const display = this.state.foods.map((ele) => (
      <DisplayProduct key={ele._id} ele={ele}  />
    ));
    return (
      <div className="main">
        <div  className="products container ">
            <div className="row g-2">
                {display}
              </div>
              
        </div>
      </div>
    );
  }
}

export default HomeScreen;

