import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="bg-primary p-2 row pt-3 header">
        <div className="col-7">
          <h1>Foodie Market</h1>
        </div>
        <div className="col-4 features">
          <div>
            <h4>
              <Link to="/sign-up">Sign up</Link>
            </h4>
          </div>
          <div>
            <h4>
              <Link to="/sign-in">Log in</Link>
            </h4>
          </div>
          <div>
            <h4>
              <Link to="/cart-screen">Cart screen</Link>
            </h4>
          </div>
          <div>
            <h4>
              <Link to="/new-product">New product</Link>
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
