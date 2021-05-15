import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className=" navbar navbar-expand-lg navbar-light bg-light mb-5 mt-0">
        <div className="container-md ml-4">
          <h3>Vidly</h3>
        </div>
        <div className="container-md ml-4">
          <NavLink to="/movies">Movies</NavLink>
        </div>
        <div className="container-md ml-4">
          <NavLink to="/customers">Customers</NavLink>
        </div>
        <div className="container-md ml-4">
          <NavLink to="/rentals">Rentals</NavLink>
        </div>
        <div className="container-md ml-4">
          <NavLink to="/log-in">Log-in</NavLink>
        </div>
        <div className="container-md ml-4">
          <NavLink to="/register">Register</NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;
